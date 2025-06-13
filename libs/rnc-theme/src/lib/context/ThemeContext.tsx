import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode, ThemeConfig } from '../types/theme';
import { lightTheme, darkTheme } from '../themes/defaultThemes';
import { themeRegistry } from '../registry/ThemeRegistry';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  activePreset?: string;
  setThemeMode: (mode: ThemeMode) => void;
  updateCustomTheme: (customTheme: Partial<Theme>, preset?: string, presetConfig?: (isDark: boolean) => Partial<Theme>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_config';

const mergeThemes = (baseTheme: Theme, customTheme?: Partial<Theme>): Theme => {
  if (!customTheme) return baseTheme;

  return {
    colors: { ...baseTheme.colors, ...customTheme.colors },
    fontSizes: { ...baseTheme.fontSizes, ...customTheme.fontSizes },
    spacing: { ...baseTheme.spacing, ...customTheme.spacing },
    components: { ...baseTheme.components, ...customTheme.components },
    typography: { ...baseTheme.typography, ...customTheme.typography },
  };
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  customLightTheme?: Partial<Theme>;
  customDarkTheme?: Partial<Theme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  customLightTheme,
  customDarkTheme,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultTheme);
  const [customTheme, setCustomTheme] = useState<Partial<Theme> | undefined>();
  const [activePreset, setActivePreset] = useState<string | undefined>();
  const [presetConfig, setPresetConfig] = useState<
    ((isDark: boolean) => Partial<Theme>) | undefined
  >();
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Determine if dark mode should be active
  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' && systemColorScheme === 'dark');

  // Auto-regenerate theme when mode changes and there's an active preset
  useEffect(() => {
    if (activePreset && presetConfig) {
      const newCustomTheme = presetConfig(isDark);
      setCustomTheme(newCustomTheme);
      // Update storage with new generated theme
      saveThemeToStorage(themeMode, newCustomTheme, activePreset);
    }
  }, [isDark, themeMode, activePreset, presetConfig]);

  // Load theme from storage on mount
  useEffect(() => {
    loadThemeFromStorage();

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  // Di dalam ThemeProvider component, update loadThemeFromStorage:
  const loadThemeFromStorage = async () => {
    try {
      const storedConfig = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedConfig) {
        const config: ThemeConfig = JSON.parse(storedConfig);
        setThemeModeState(config.mode);
        setCustomTheme(config.customTheme);
        setActivePreset(config.activePreset);

        // Restore presetConfig from registry
        if (
          config.activePreset &&
          themeRegistry.hasPreset(config.activePreset)
        ) {
          const restoredPresetConfig = themeRegistry.getPreset(
            config.activePreset
          );
          setPresetConfig(() => restoredPresetConfig);

          // Regenerate theme with current mode
          if (restoredPresetConfig) {
            const newCustomTheme = restoredPresetConfig(isDark);
            setCustomTheme(newCustomTheme);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
  };

  const saveThemeToStorage = async (
    mode: ThemeMode,
    customTheme?: Partial<Theme>,
    preset?: string
  ) => {
    try {
      const config: ThemeConfig = { mode, customTheme, activePreset: preset };
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    // Jangan save di sini, biarkan useEffect yang handle regeneration
  };

  const updateCustomTheme = useCallback(
    (
      newCustomTheme: Partial<Theme>,
      preset?: string,
      newPresetConfig?: (isDark: boolean) => Partial<Theme>
    ) => {
      setCustomTheme(newCustomTheme);
      setActivePreset(preset);
      if (newPresetConfig) {
        setPresetConfig(() => newPresetConfig); // Wrap in function to avoid stale closure
      }
      saveThemeToStorage(themeMode, newCustomTheme, preset);
    },
    [themeMode]
  );

  const resetTheme = () => {
    setCustomTheme(undefined);
    setActivePreset(undefined);
    setPresetConfig(undefined);
    saveThemeToStorage(themeMode, undefined, undefined);
  };

  // Get base theme
  const baseTheme = isDark ? darkTheme : lightTheme;

  // Apply custom theme overrides
  const providedCustomTheme = isDark ? customDarkTheme : customLightTheme;
  const finalCustomTheme = { ...providedCustomTheme, ...customTheme };

  // Merge themes
  const theme = mergeThemes(baseTheme, finalCustomTheme);

  const value: ThemeContextType = {
    theme,
    themeMode,
    isDark,
    activePreset,
    setThemeMode,
    updateCustomTheme,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
