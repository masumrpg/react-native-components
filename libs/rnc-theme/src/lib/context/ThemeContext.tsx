import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode, ThemeConfig } from '../types/theme';
import { lightTheme, darkTheme } from '../themes/defaultThemes';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  updateCustomTheme: (customTheme: Partial<Theme>) => void;
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
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Load theme from storage on mount
  useEffect(() => {
    loadThemeFromStorage();

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const storedConfig = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedConfig) {
        const config: ThemeConfig = JSON.parse(storedConfig);
        setThemeModeState(config.mode);
        setCustomTheme(config.customTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
  };

  const saveThemeToStorage = async (
    mode: ThemeMode,
    customTheme?: Partial<Theme>
  ) => {
    try {
      const config: ThemeConfig = { mode, customTheme };
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    saveThemeToStorage(mode, customTheme);
  };

  const updateCustomTheme = (newCustomTheme: Partial<Theme>) => {
    const updatedCustomTheme = { ...customTheme, ...newCustomTheme };
    setCustomTheme(updatedCustomTheme);
    saveThemeToStorage(themeMode, updatedCustomTheme);
  };

  const resetTheme = () => {
    setCustomTheme(undefined);
    saveThemeToStorage(themeMode, undefined);
  };

  // Determine if dark mode should be active
  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' && systemColorScheme === 'dark');

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
