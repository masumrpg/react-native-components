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
import { BottomSheetProvider } from '../components/ui/bottom-sheet/contexts/BottomSheetContext';
import { BottomSheetProviderProps } from '../components/ui/bottom-sheet/types';
import { ToastProvider } from '../components/ui/toast/context/ToastContext';
import { ToastPosition } from '../components/ui/toast/types';
import { Toast } from '../components/ui/toast/components/ToastContainer';
import { PortalProvider } from '../components/ui/portal/context/PortalContext';
import { I18nConfig, LanguageProvider } from '../i18n/context/LanguageProvider';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  activePreset?: string;
  setThemeMode: (mode: ThemeMode) => void;
  updateCustomTheme: (
    customTheme: Partial<Theme>,
    preset?: string,
    presetConfig?: (isDark: boolean) => Partial<Theme>
  ) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'RNC_THEME';

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
  bottomSheetProps?: BottomSheetProviderProps;
  toast?: {
    position?: ToastPosition;
    maxToasts?: number | undefined;
  };
  i18nConfig?: I18nConfig;
}

export const RNCProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  customLightTheme,
  customDarkTheme,
  bottomSheetProps,
  toast,
  i18nConfig,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultTheme);
  const [customTheme, setCustomTheme] = useState<{
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
  }>({});
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
      // Update the appropriate theme variant
      setCustomTheme((prev) => ({
        ...prev,
        [isDark ? 'dark' : 'light']: newCustomTheme,
      }));
      // Update storage with new generated theme
      saveThemeToStorage(
        themeMode,
        {
          ...customTheme,
          [isDark ? 'dark' : 'light']: newCustomTheme,
        },
        activePreset
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark, themeMode, activePreset, presetConfig]);

  // Load theme from storage on mount and when system color scheme changes
  useEffect(() => {
    loadThemeFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Separate effect for system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  // Reload theme when system color scheme changes (for system mode)
  useEffect(() => {
    if (themeMode === 'system') {
      loadThemeFromStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemColorScheme]);

  const loadThemeFromStorage = async () => {
    try {
      const storedConfig = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedConfig) {
        const config: ThemeConfig = JSON.parse(storedConfig);
        setThemeModeState(config.mode);

        // Set custom theme with both variants if available
        if (config.customTheme) {
          setCustomTheme(config.customTheme);
        }

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
          // Only regenerate if we don't have the theme variant stored
          if (restoredPresetConfig) {
            const currentSystemScheme = Appearance.getColorScheme();
            const loadedIsDark =
              config.mode === 'dark' ||
              (config.mode === 'system' && currentSystemScheme === 'dark');

            // Check if we already have the theme variant stored
            const hasStoredVariant =
              config.customTheme &&
              config.customTheme[loadedIsDark ? 'dark' : 'light'];

            if (!hasStoredVariant) {
              // Generate missing theme variant
              const newCustomTheme = restoredPresetConfig(loadedIsDark);
              const updatedCustomTheme = {
                ...config.customTheme,
                [loadedIsDark ? 'dark' : 'light']: newCustomTheme,
              };
              setCustomTheme(updatedCustomTheme);
              // Save the generated variant
              saveThemeToStorage(
                config.mode,
                updatedCustomTheme,
                config.activePreset
              );
              console.info(
                'Generated missing theme variant:',
                loadedIsDark ? 'dark' : 'light'
              );
            }
          }
        }
      } else {
        console.info('No stored theme config found, using defaults');
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
  };

  const saveThemeToStorage = async (
    mode: ThemeMode,
    customTheme?: {
      light?: Partial<Theme>;
      dark?: Partial<Theme>;
    },
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
    // Save theme mode to storage immediately
    saveThemeToStorage(mode, customTheme, activePreset);
  };

  const updateCustomTheme = useCallback(
    (
      newCustomTheme: Partial<Theme>,
      preset?: string,
      newPresetConfig?: (isDark: boolean) => Partial<Theme>
    ) => {
      // Update the appropriate theme variant based on current mode
      const updatedCustomTheme = {
        ...customTheme,
        [isDark ? 'dark' : 'light']: newCustomTheme,
      };

      setCustomTheme(updatedCustomTheme);
      setActivePreset(preset);
      if (newPresetConfig) {
        setPresetConfig(() => newPresetConfig);
      }
      saveThemeToStorage(themeMode, updatedCustomTheme, preset);
    },
    [themeMode, customTheme, isDark]
  );

  const resetTheme = () => {
    setCustomTheme({});
    setActivePreset(undefined);
    setPresetConfig(undefined);
    saveThemeToStorage(themeMode, {}, undefined);
  };

  // Get base theme
  const baseTheme = isDark ? darkTheme : lightTheme;

  // Apply custom theme overrides - now using the appropriate variant
  const providedCustomTheme = isDark ? customDarkTheme : customLightTheme;
  const currentCustomTheme = isDark ? customTheme.dark : customTheme.light;
  const finalCustomTheme = { ...providedCustomTheme, ...currentCustomTheme };

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
    <ThemeContext.Provider value={value}>
      <LanguageProvider i18nConfig={i18nConfig}>
        <ToastProvider maxToasts={toast?.maxToasts ?? 5}>
          <PortalProvider>
            <BottomSheetProvider
              backgroundColor={theme.colors.surface}
              lineBackgroundColor={theme.colors.text}
              borderTopLeftRadius={
                bottomSheetProps?.borderTopLeftRadius ??
                theme.components.borderRadius.md < 5
                  ? theme.components.borderRadius.md
                  : theme.components.borderRadius.md + 10
              }
              borderTopRightRadius={
                bottomSheetProps?.borderTopRightRadius ??
                theme.components.borderRadius.md < 5
                  ? theme.components.borderRadius.md
                  : theme.components.borderRadius.md + 10
              }
              {...bottomSheetProps}
            >
              {children}
            </BottomSheetProvider>
          </PortalProvider>
          <Toast
            theme={theme}
            position={toast?.position ?? 'top'}
            maxToasts={toast?.maxToasts ?? 5}
          />
        </ToastProvider>
      </LanguageProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};