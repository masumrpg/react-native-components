import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { Appearance, ColorSchemeName, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode, ThemeConfig, FontConfig, FontLoadingState } from '../types/theme';
import { lightTheme, darkTheme } from '../themes/defaultThemes';
import { themeRegistry } from '../registry/ThemeRegistry';
import { BottomSheetProvider } from '../components/ui/bottom-sheet/contexts/BottomSheetContext';
import { BottomSheetProviderProps } from '../components/ui/bottom-sheet/types';
import { ToastProvider } from '../components/ui/toast/context/ToastContext';
import { ToastPosition } from '../components/ui/toast/types';
import { Toast } from '../components/ui/toast/components/ToastContainer';
import { PortalProvider } from '../components/ui/portal/context/PortalContext';
import { I18nConfig, LanguageProvider } from '../i18n/context/LanguageProvider';
import {
  ScrollToHideProvider,
  ScrollToHideProviderProps,
} from './ScrollToHideProvider';

type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  activePreset?: string;
  fontLoadingState: FontLoadingState;
  setThemeMode: (mode: ThemeMode) => void;
  updateCustomTheme: (
    customTheme: Partial<Theme>,
    preset?: string,
    presetConfig?: (isDark: boolean) => Partial<Theme>
  ) => void;
  resetTheme: () => void;
};

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

// Cache untuk mengurangi AsyncStorage reads
let themeCache: ThemeConfig | null = null;
let isCacheLoaded = false;

// Pre-load theme saat app start (dipanggil sebelum render)
const preloadTheme = async (themeStorageKey: string): Promise<ThemeConfig | null> => {
  if (isCacheLoaded && themeCache) {
    return themeCache;
  }

  try {
    const storedConfig = await AsyncStorage.getItem(themeStorageKey);
    if (storedConfig) {
      themeCache = JSON.parse(storedConfig) as ThemeConfig;
    } else {
      themeCache = null;
    }
    isCacheLoaded = true;
    return themeCache;
  } catch (error) {
    console.warn('⚠️ Failed to preload theme:', error);
    isCacheLoaded = true;
    themeCache = null;
    return null;
  }
};

// Optimized save dengan debounce untuk mengurangi I/O
let saveTimeout: NodeJS.Timeout | null = null;

const saveThemeToStorage = (
  themeStorageKey: string,
  config: ThemeConfig,
  immediate = false
) => {
  // Update cache immediately untuk konsistensi
  themeCache = config;

  const performSave = async () => {
    try {
      await AsyncStorage.setItem(themeStorageKey, JSON.stringify(config));
    } catch (error) {
      console.warn('⚠️ Failed to save theme:', error);
    }
  };

  if (immediate) {
    // Save immediately untuk perubahan penting
    performSave();
  } else {
    // Debounce untuk perubahan yang bisa di-batch
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(performSave, 100);
  }
};

type BottomSheetProps = Omit<BottomSheetProviderProps, 'children'>;
type ScrollToHideProps = Omit<ScrollToHideProviderProps, 'children'>;

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  customLightTheme?: Partial<Theme>;
  customDarkTheme?: Partial<Theme>;
  bottomSheetProps?: BottomSheetProps;
  toast?: {
    position?: ToastPosition;
    maxToasts?: number | undefined;
  };
  i18nConfig?: I18nConfig;
  scrollToHideProps?: ScrollToHideProps;
  themeStorageKeyName?: string;
  showLoadingSplash?: boolean; // Control loading behavior
  loadingComponent?: ReactNode; // Custom loading component
  splashDuration?: number; // Minimum splash duration (ms)
  fallbackTheme?: 'light' | 'dark'; // Fallback if system unavailable
  fontConfig?: FontConfig; // Custom font configuration
  fontsLoaded?: boolean; // External font loading state
  onFontLoadError?: (error: string) => void; // Font loading error callback
}

export const RNCProvider: React.FC<ThemeProviderProps> = ({
                                                            children,
                                                            defaultTheme = 'system',
                                                            customLightTheme,
                                                            customDarkTheme,
                                                            bottomSheetProps,
                                                            toast,
                                                            i18nConfig,
                                                            scrollToHideProps,
                                                            themeStorageKeyName,
                                                            showLoadingSplash = true,
                                                            loadingComponent,
                                                            splashDuration = 150, // Minimum 150ms to prevent flash
                                                            fallbackTheme = 'light',
                                                            fontConfig,
                                                            fontsLoaded = true,
                                                            onFontLoadError,
                                                          }) => {
  const themeStorageKey = themeStorageKeyName ?? THEME_STORAGE_KEY;

  // States
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultTheme);
  const [customTheme, setCustomTheme] = useState<{
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
  }>({});
  const [activePreset, setActivePreset] = useState<string | undefined>();
  const [presetConfig, setPresetConfig] = useState<
    ((isDark: boolean) => Partial<Theme>) | undefined
  >();
  const [fontLoadingState, setFontLoadingState] = useState<FontLoadingState>({
    loaded: fontsLoaded,
    error: undefined,
  });

  // System color scheme dengan fallback
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(() => {
    const scheme = Appearance.getColorScheme();
    return scheme ?? fallbackTheme;
  });

  // Determine dark mode
  const isDark = useMemo(() => {
    return themeMode === 'dark' ||
      (themeMode === 'system' && systemColorScheme === 'dark');
  }, [themeMode, systemColorScheme]);

  // OPTIMIZED: Load theme dengan minimum delay
  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const initializeTheme = async () => {
      try {
        // Preload theme (bisa dari cache)
        const storedConfig = await preloadTheme(themeStorageKey);

        if (!isMounted) return;

        if (storedConfig) {
          // Apply stored configuration
          setThemeModeState(storedConfig.mode);

          if (storedConfig.customTheme) {
            setCustomTheme(storedConfig.customTheme);
          }

          setActivePreset(storedConfig.activePreset);

          // Restore preset config from registry
          if (storedConfig.activePreset && themeRegistry.hasPreset(storedConfig.activePreset)) {
            const restoredPresetConfig = themeRegistry.getPreset(storedConfig.activePreset);
            setPresetConfig(() => restoredPresetConfig);

            // Check dan generate missing theme variant jika perlu
            if (restoredPresetConfig) {
              const loadedIsDark =
                storedConfig.mode === 'dark' ||
                (storedConfig.mode === 'system' && systemColorScheme === 'dark');

              const hasStoredVariant =
                storedConfig.customTheme?.[loadedIsDark ? 'dark' : 'light'];

              if (!hasStoredVariant) {
                const newCustomTheme = restoredPresetConfig(loadedIsDark);
                const updatedCustomTheme = {
                  ...storedConfig.customTheme,
                  [loadedIsDark ? 'dark' : 'light']: newCustomTheme,
                };
                setCustomTheme(updatedCustomTheme);

                // Save updated config
                saveThemeToStorage(themeStorageKey, {
                  mode: storedConfig.mode,
                  customTheme: updatedCustomTheme,
                  activePreset: storedConfig.activePreset
                }, false);
              }
            }
          }
        }

        // Ensure minimum splash duration untuk smooth UX
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, splashDuration - elapsedTime);

        if (remainingTime > 0 && showLoadingSplash) {
          setTimeout(() => {
            if (isMounted) {
              setIsThemeReady(true);
            }
          }, remainingTime);
        } else {
          setIsThemeReady(true);
        }

      } catch (error) {
        console.warn('⚠️ Failed to initialize theme:', error);
        // Fallback ke ready state
        if (isMounted) {
          setIsThemeReady(true);
        }
      }
    };

    initializeTheme();

    return () => {
      isMounted = false;
    };
  }, [themeStorageKey, systemColorScheme, splashDuration, showLoadingSplash]);

  // System color scheme listener
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newScheme = colorScheme ?? fallbackTheme;
      setSystemColorScheme(newScheme);
    });

    return () => subscription.remove();
  }, [fallbackTheme]);

  // Font loading state listener
  useEffect(() => {
    setFontLoadingState({
      loaded: fontsLoaded,
      error: undefined,
    });
  }, [fontsLoaded]);

  // Font error handling
  useEffect(() => {
    if (!fontsLoaded && onFontLoadError) {
      const timer = setTimeout(() => {
        const errorMessage = 'Font loading timeout - using fallback fonts';
        setFontLoadingState({
          loaded: false,
          error: errorMessage,
        });
        onFontLoadError(errorMessage);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timer);
    }
    // Return undefined explicitly for the else case
    return undefined;
  }, [fontsLoaded, onFontLoadError]);

  // Auto-regenerate theme ketika mode berubah dan ada active preset
  useEffect(() => {
    if (!isThemeReady) return; // Tunggu sampai theme ready

    if (activePreset && presetConfig) {
      const currentVariant = isDark ? 'dark' : 'light';
      const hasCurrentVariant = isDark ? customTheme.dark : customTheme.light;

      if (!hasCurrentVariant) {
        const newCustomTheme = presetConfig(isDark);
        const updatedCustomTheme = {
          ...customTheme,
          [currentVariant]: newCustomTheme,
        };

        setCustomTheme(updatedCustomTheme);

        saveThemeToStorage(themeStorageKey, {
          mode: themeMode,
          customTheme: updatedCustomTheme,
          activePreset: activePreset
        }, false);
      }
    }
  }, [isDark, themeMode, activePreset, presetConfig, isThemeReady, customTheme, themeStorageKey]);

  // Theme management functions
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    saveThemeToStorage(themeStorageKey, {
      mode,
      customTheme,
      activePreset
    }, true); // Immediate save untuk mode changes
  }, [customTheme, activePreset, themeStorageKey]);

  const updateCustomTheme = useCallback(
    (
      newCustomTheme: Partial<Theme>,
      preset?: string,
      newPresetConfig?: (isDark: boolean) => Partial<Theme>
    ) => {
      const updatedCustomTheme = {
        ...customTheme,
        [isDark ? 'dark' : 'light']: newCustomTheme,
      };

      setCustomTheme(updatedCustomTheme);
      setActivePreset(preset);

      if (newPresetConfig) {
        setPresetConfig(() => newPresetConfig);
      }


      saveThemeToStorage(themeStorageKey, {
        mode: themeMode,
        customTheme: updatedCustomTheme,
        activePreset: preset
      }, true); // Immediate save untuk theme updates
    },
    [themeMode, customTheme, isDark, themeStorageKey]
  );

  const resetTheme = useCallback(() => {
    setCustomTheme({});
    setActivePreset(undefined);
    setPresetConfig(undefined);

    saveThemeToStorage(themeStorageKey, {
      mode: themeMode,
      customTheme: {},
      activePreset: undefined
    }, true); // Immediate save untuk reset
  }, [themeMode, themeStorageKey]);

  // Apply font configuration to theme
  const applyFontConfig = useCallback((theme: Theme): Theme => {
    if (!fontConfig || !fontLoadingState.loaded) {
      return theme;
    }

    const getFontFamily = (weight: string): string => {
      const fallbackFont = theme.typography.body.fontFamily ?? 'System';
      
      switch (weight) {
        case '400':
        case 'normal':
          return fontConfig.regular ?? fallbackFont;
        case '500':
          return fontConfig.medium ?? fontConfig.regular ?? fallbackFont;
        case '600':
          return fontConfig.semiBold ?? fontConfig.medium ?? fontConfig.regular ?? fallbackFont;
        case '700':
        case 'bold':
          return fontConfig.bold ?? fontConfig.semiBold ?? fontConfig.medium ?? fontConfig.regular ?? fallbackFont;
        default:
          return fontConfig.regular ?? fallbackFont;
      }
    };

    return {
      ...theme,
      typography: {
        caption: {
          ...theme.typography.caption,
          fontFamily: getFontFamily(theme.typography.caption.fontWeight?.toString() ?? '400'),
        },
        small: {
          ...theme.typography.small,
          fontFamily: getFontFamily(theme.typography.small.fontWeight?.toString() ?? '400'),
        },
        body: {
          ...theme.typography.body,
          fontFamily: getFontFamily(theme.typography.body.fontWeight?.toString() ?? '400'),
        },
        subtitle: {
          ...theme.typography.subtitle,
          fontFamily: getFontFamily(theme.typography.subtitle.fontWeight?.toString() ?? '500'),
        },
        title: {
          ...theme.typography.title,
          fontFamily: getFontFamily(theme.typography.title.fontWeight?.toString() ?? '600'),
        },
        heading: {
          ...theme.typography.heading,
          fontFamily: getFontFamily(theme.typography.heading.fontWeight?.toString() ?? '700'),
        },
      },
    };
  }, [fontConfig, fontLoadingState.loaded]);

  // Calculate final theme
  const theme = useMemo(() => {
    const baseTheme = isDark ? darkTheme : lightTheme;
    const providedCustomTheme = isDark ? customDarkTheme : customLightTheme;
    const currentCustomTheme = isDark ? customTheme.dark : customTheme.light;
    const finalCustomTheme = { ...providedCustomTheme, ...currentCustomTheme };
    const mergedTheme = mergeThemes(baseTheme, finalCustomTheme);

    return applyFontConfig(mergedTheme);
  }, [isDark, customDarkTheme, customLightTheme, customTheme, applyFontConfig]);

  const contextValue: ThemeContextType = useMemo(() => ({
    theme,
    themeMode,
    isDark,
    activePreset,
    fontLoadingState,
    setThemeMode,
    updateCustomTheme,
    resetTheme,
  }), [theme, themeMode, isDark, activePreset, fontLoadingState, setThemeMode, updateCustomTheme, resetTheme]);

  // Show loading splash sementara theme atau font belum ready
  const shouldShowLoading = showLoadingSplash && (!isThemeReady || (fontConfig && !fontLoadingState.loaded && !fontLoadingState.error));

  if (shouldShowLoading) {
    if (loadingComponent) {
      return loadingComponent;
    }

    // Default loading screen dengan base theme
    const baseTheme = isDark ? darkTheme : lightTheme;
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
        <ActivityIndicator
          size="large"
          color={baseTheme.colors.primary}
        />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <LanguageProvider i18nConfig={i18nConfig}>
        <ToastProvider maxToasts={toast?.maxToasts ?? 5}>
          <PortalProvider>
            <BottomSheetProvider
              backgroundColor={theme.colors.surface}
              lineBackgroundColor={theme.colors.text}
              borderTopLeftRadius={
                bottomSheetProps?.borderTopLeftRadius ??
                (theme.components.borderRadius.md < 5
                  ? theme.components.borderRadius.md
                  : theme.components.borderRadius.md + 10)
              }
              borderTopRightRadius={
                bottomSheetProps?.borderTopRightRadius ??
                (theme.components.borderRadius.md < 5
                  ? theme.components.borderRadius.md
                  : theme.components.borderRadius.md + 10)
              }
              {...bottomSheetProps}
            >
              <ScrollToHideProvider {...scrollToHideProps}>
                {children}
              </ScrollToHideProvider>
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

// Export helper untuk preload theme di App.tsx
export const preloadAppTheme = (storageKey: string = THEME_STORAGE_KEY) => {
  return preloadTheme(storageKey);
};