import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { CustomThemeConfigFactory, Theme } from '../../types/theme';
import { useTheme } from '../../context/RNCProvider';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { themeRegistry } from '../../registry/ThemeRegistry';
import { Typography } from '../ui/typography';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Switcher } from '../ui/switcher';
import { Button, ButtonText } from '../ui/button';

export interface ThemePresetConfig {
  key: string;
  label: string;
  config: CustomThemeConfigFactory;
}

export interface ThemeManagerProps {
  /**
   * Array of theme preset configurations
   */
  themePresets: ThemePresetConfig[];
  /**
   * Initial theme preset to apply
   */
  initialTheme?: string;
  /**
   * Whether to show the theme controls section
   */
  showControls?: boolean;
  /**
   * Whether to show the theme presets section
   */
  showPresets?: boolean;
  /**
   * Additional content to render below the theme manager
   */
  children?: React.ReactNode;
  /**
   * Callback when theme is applied
   */
  onThemeApplied?: (theme: string) => void;
  /**
   * Callback when theme is previewed
   */
  onThemePreview?: (theme: string) => void;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({
  themePresets,
  initialTheme = 'default',
  showControls = true,
  showPresets = true,
  children,
  onThemeApplied,
  onThemePreview,
}) => {
  const { setThemeMode, isDark, updateCustomTheme, resetTheme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [selectedPreset, setSelectedPreset] = useState<string>(initialTheme);
  const [appliedTheme, setAppliedTheme] = useState<string>(initialTheme);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [isDarkModeDisabled, setIsDarkModeDisabled] = useState(false);

  // Create theme configs map for easy lookup
  const themeConfigsMap = useMemo(() => {
    const map = new Map<string, CustomThemeConfigFactory>();
    themePresets.forEach(({ key, config }) => {
      map.set(key, config);
    });
    return map;
  }, [themePresets]);

  useEffect(() => {
    // Register all theme presets to registry
    themePresets.forEach(({ key, config }) => {
      if (key !== 'default') {
        themeRegistry.registerPreset(key, config);
      }
    });
  }, [themePresets]);

  // Dynamic theme creators that respond to theme mode changes
  const createDynamicTheme = useCallback(
    (themeConfig: CustomThemeConfigFactory) => {
      // Generate both light and dark variants
      const lightTheme = themeConfig(false);
      const darkTheme = themeConfig(true);

      // Update with both variants
      updateCustomTheme(
        isDark ? darkTheme : lightTheme,
        undefined,
        themeConfig
      );
    },
    [updateCustomTheme, isDark]
  );

  // Toggle theme mode
  const toggleTheme = useCallback(() => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  }, [isDark, setThemeMode]);

  // Helper function to get theme config by preset
  const getThemeConfig = useCallback(
    (preset: string) => {
      return themeConfigsMap.get(preset) || null;
    },
    [themeConfigsMap]
  );

  // Preview theme function (doesn't change appliedTheme)
  const previewThemePreset = useCallback(
    (preset: string) => {
      setSelectedPreset(preset);
      setPreviewTheme(preset);
      setIsDarkModeDisabled(preset !== 'default');

      if (preset === 'default') {
        resetTheme();
        setPreviewTheme(null);
        setIsDarkModeDisabled(false);
      } else {
        const themeConfig = getThemeConfig(preset);
        if (themeConfig) {
          createDynamicTheme(themeConfig);
        }
      }

      onThemePreview?.(preset);
    },
    [createDynamicTheme, resetTheme, getThemeConfig, onThemePreview]
  );

  // Apply theme function (changes appliedTheme)
  const applyThemePreset = useCallback(
    (preset: string) => {
      setAppliedTheme(preset);
      setPreviewTheme(null);
      setIsDarkModeDisabled(false);

      if (preset === 'default') {
        resetTheme();
      } else {
        const themeConfig = getThemeConfig(preset);
        if (themeConfig) {
          // Generate both light and dark variants when applying
          const lightTheme = themeConfig(false);
          const darkTheme = themeConfig(true);

          // Apply current theme variant and save the config for future mode switches
          updateCustomTheme(
            isDark ? darkTheme : lightTheme,
            preset,
            themeConfig
          );
        }
      }

      onThemeApplied?.(preset);
    },
    [isDark, resetTheme, getThemeConfig, updateCustomTheme, onThemeApplied]
  );

  // Cancel preview function
  const cancelPreview = useCallback(() => {
    if (previewTheme && previewTheme !== appliedTheme) {
      // Return to currently applied theme
      previewThemePreset(appliedTheme);
      setSelectedPreset(appliedTheme);
    }
  }, [previewTheme, appliedTheme, previewThemePreset]);

  const showAlert = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages = {
        success: 'Theme applied successfully!',
        error: 'An error occurred!',
        warning: 'Warning: Please check your input!',
        info: 'Info: Theme has been updated!',
      };
      Alert.alert('Notification', messages[type]);
    },
    []
  );

  const applySelectedTheme = useCallback(() => {
    applyThemePreset(selectedPreset);
    showAlert('success');
  }, [selectedPreset, applyThemePreset, showAlert]);

  return (
    <ScrollView style={styles.container}>
      {/* Theme Controls */}
      {showControls && (
        <Card style={styles.card}>
          <CardHeader title="Theme Controls" />
          <CardContent>
            <View style={styles.row}>
              <Typography
                variant="body"
                style={{
                  opacity: isDarkModeDisabled ? 0.5 : 1,
                }}
              >
                Dark Mode {isDarkModeDisabled && '(Disabled)'}
              </Typography>
              <Switcher
                value={isDark}
                onValueChange={toggleTheme}
                disabled={isDarkModeDisabled}
              />
            </View>

            {previewTheme && previewTheme !== appliedTheme ? (
              <View>
                <Button
                  variant="primary"
                  onPress={applySelectedTheme}
                  style={styles.button}
                >
                  <ButtonText>
                    Apply{' '}
                    {selectedPreset.charAt(0).toUpperCase() +
                      selectedPreset.slice(1)}{' '}
                    Theme
                  </ButtonText>
                </Button>

                <Button
                  variant="outline"
                  onPress={cancelPreview}
                  style={styles.button}
                >
                  <ButtonText>Cancel Preview</ButtonText>
                </Button>
              </View>
            ) : (
              <Button
                variant="primary"
                onPress={applySelectedTheme}
                style={styles.button}
              >
                <ButtonText>
                  {selectedPreset === 'default'
                    ? 'Reset to Default Theme'
                    : `Apply ${
                        selectedPreset.charAt(0).toUpperCase() +
                        selectedPreset.slice(1)
                      } Theme`}
                </ButtonText>
              </Button>
            )}

            <Button
              variant="outline"
              onPress={() => applyThemePreset('default')}
              style={styles.button}
            >
              <ButtonText>Reset Theme</ButtonText>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Theme Presets */}
      {showPresets && (
        <Card style={styles.card}>
          <CardHeader title="Theme Presets" />
          <CardContent>
            <View style={styles.presetGrid}>
              <Button
                key="default"
                variant={
                  selectedPreset === 'default'
                    ? 'primary'
                    : appliedTheme === 'default'
                    ? 'success'
                    : 'outline'
                }
                size="sm"
                onPress={() => previewThemePreset('default')}
                style={styles.presetButton}
              >
                <ButtonText>
                  Default
                  {appliedTheme === 'default' && selectedPreset !== 'default'}
                  {selectedPreset === 'default' &&
                    previewTheme !== appliedTheme}
                </ButtonText>
              </Button>
              {themePresets.map(({ key, label }) => (
                <Button
                  key={key}
                  variant={
                    selectedPreset === key
                      ? 'primary'
                      : appliedTheme === key
                      ? 'success'
                      : 'outline'
                  }
                  size="sm"
                  onPress={() => previewThemePreset(key)}
                  style={styles.presetButton}
                >
                  <ButtonText>
                    {label}
                    {appliedTheme === key && selectedPreset !== key}
                    {selectedPreset === key && previewTheme !== appliedTheme}
                  </ButtonText>
                </Button>
              ))}
            </View>
          </CardContent>
        </Card>
      )}

      {/* Additional content */}
      {children}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.md,
  },
  button: {
    marginBottom: theme.spacing.sm,
  },
  presetGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  presetButton: {
    width: '32%' as const,
    marginBottom: theme.spacing.sm,
  },
});

export default ThemeManager;