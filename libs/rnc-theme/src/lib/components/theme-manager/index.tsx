import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CustomThemeConfigFactory, Theme } from '../../types/theme';
import { useTheme } from '../../context/RNCProvider';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { themeRegistry } from '../../registry/ThemeRegistry';
import { Typography } from '../ui/typography';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Switcher } from '../ui/switcher';
import { Button, ButtonText } from '../ui/button';
import { VStack } from '../ui/layout';

/**
 * Configuration object for a theme preset
 *
 * @example
 * ```tsx
 * const preset: ThemePresetConfig = {
 *   key: 'ocean',
 *   label: 'Ocean Blue',
 *   config: () => ({ primary: '#0066cc', secondary: '#004080' })
 * };
 * ```
 *
 * @public
 */
export interface ThemePresetConfig {
  /**
   * Unique identifier for the theme preset
   * Used internally to track and apply the theme
   */
  key: string;

  /**
   * Human-readable display name for the theme preset
   * Shown in the theme selector UI
   */
  label: string;

  /**
   * Factory function that generates the theme configuration
   * Should return a complete theme object when called
   */
  config: CustomThemeConfigFactory;
}

/**
 * Customization options for ThemeManager UI text and labels
 * Allows localization and custom branding of the theme manager interface
 *
 * @example
 * ```tsx
 * const customization: ThemeManagerCustomization = {
 *   controlsTitle: 'Pengaturan Tema',
 *   presetsTitle: 'Preset Tema',
 *   darkModeLabel: 'Mode Gelap',
 *   applyButtonText: 'Terapkan',
 *   successMessage: 'Tema berhasil diterapkan!'
 * };
 * ```
 *
 * @public
 */
export interface ThemeManagerCustomization {
  /**
   * Custom title for theme controls section
   * @defaultValue 'Theme Controls'
   */
  controlsTitle?: string;

  /**
   * Custom title for theme presets section
   * @defaultValue 'Theme Presets'
   */
  presetsTitle?: string;

  /**
   * Custom label for dark mode toggle
   * @defaultValue 'Dark Mode'
   */
  darkModeLabel?: string;

  /**
   * Custom label for disabled dark mode
   * @defaultValue 'Dark Mode (Disabled)'
   */
  darkModeDisabledLabel?: string;

  /**
   * Custom text for apply button
   * @defaultValue 'Apply'
   */
  applyButtonText?: string;

  /**
   * Custom text for cancel preview button
   * @defaultValue 'Cancel Preview'
   */
  cancelPreviewText?: string;

  /**
   * Custom text for reset button
   * @defaultValue 'Reset'
   */
  resetButtonText?: string;

  /**
   * Custom text for default theme button
   * @defaultValue 'Default Theme'
   */
  defaultThemeText?: string;

  /**
   * Custom success message when theme is applied
   * @defaultValue 'Theme applied successfully!'
   */
  successMessage?: string;

  /**
   * Custom error message
   * @defaultValue 'An error occurred'
   */
  errorMessage?: string;

  /**
   * Custom warning message
   * @defaultValue 'Warning'
   */
  warningMessage?: string;

  /**
   * Custom info message
   * @defaultValue 'Information'
   */
  infoMessage?: string;
}

/**
 * Props interface for the ThemeManager component
 * Provides a complete theme management interface with presets, controls, and customization options
 *
 * @example
 * ```tsx
 * <ThemeManager
 *   themePresets={[
 *     { key: 'light', label: 'Light Theme', config: lightThemeFactory },
 *     { key: 'dark', label: 'Dark Theme', config: darkThemeFactory }
 *   ]}
 *   initialTheme="light"
 *   showControls={true}
 *   showPresets={true}
 *   showCards={true}
 *   onThemeApplied={(theme) => console.log('Applied:', theme)}
 *   customization={{
 *     controlsTitle: 'Theme Settings',
 *     applyButtonText: 'Apply Theme'
 *   }}
 * />
 * ```
 *
 * @public
 */
export interface ThemeManagerProps {
  /**
   * Custom styles for the main theme manager container
   * Uses React Native's StyleProp<ViewStyle> for styling flexibility
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom content styles for the inner content area of theme manager
   * Allows styling of the content wrapper independently from the container
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Array of theme preset configurations available for selection
   * Each preset contains a key, label, and config factory function
   */
  themePresets: ThemePresetConfig[];

  /**
   * Initial theme preset key to apply when component mounts
   * Should match one of the keys in the themePresets array
   */
  initialTheme?: string;

  /**
   * Whether to show the theme controls section
   * Controls include dark mode toggle and other theme settings
   * @defaultValue true
   */
  showControls?: boolean;

  /**
   * Whether to show the theme presets section
   * Displays the available theme presets for selection
   * @defaultValue true
   */
  showPresets?: boolean;

  /**
   * Additional content to render below the theme manager
   * Useful for adding custom controls or information
   */
  children?: React.ReactNode;

  /**
   * Callback function triggered when a theme is successfully applied
   * Receives the theme key as parameter
   *
   * @param theme - The key of the applied theme
   */
  onThemeApplied?: (theme: string) => void;

  /**
   * Callback function triggered when a theme is being previewed
   * Receives the theme key as parameter
   * Use this for temporary theme application without persistence
   *
   * @param theme - The key of the previewed theme
   */
  onThemePreview?: (theme: string) => void;

  /**
   * Optional customization object for labels, messages, and UI text
   * Allows localization and custom branding of the interface
   */
  customization?: ThemeManagerCustomization;

  /**
   * Whether to show theme presets as cards with visual previews
   * When false, shows presets as a simple list or buttons
   * @defaultValue true
   */
  showCards?: boolean;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({
  style,
  contentStyle,
  themePresets,
  initialTheme = 'default',
  showControls = true,
  showPresets = true,
  children,
  onThemeApplied,
  onThemePreview,
  customization,
  showCards = true,
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
      return themeConfigsMap.get(preset) ?? null;
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
        success: customization?.successMessage ?? 'Theme applied successfully!',
        error: customization?.errorMessage ?? 'An error occurred!',
        warning:
          customization?.warningMessage ?? 'Warning: Please check your input!',
        info: customization?.infoMessage ?? 'Info: Theme has been updated!',
      };
      Alert.alert('Notification', messages[type]);
    },
    [customization]
  );

  const applySelectedTheme = useCallback(() => {
    applyThemePreset(selectedPreset);
    showAlert('success');
  }, [selectedPreset, applyThemePreset, showAlert]);

  return (
    <VStack style={[styles.container, style]}>
      {/* Theme Controls */}
      {showControls &&
        (showCards ? (
          <Card style={[styles.card, contentStyle]}>
            <CardHeader
              title={customization?.controlsTitle ?? 'Theme Controls'}
            />
            <CardContent>
              <View style={styles.row}>
                <Typography
                  variant="body"
                  style={{
                    opacity: isDarkModeDisabled ? 0.5 : 1,
                  }}
                >
                  {customization?.darkModeLabel ?? 'Dark Mode'}{' '}
                  {isDarkModeDisabled &&
                    (customization?.darkModeDisabledLabel ?? '(Disabled)')}
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
                      {customization?.applyButtonText ??
                        `Apply ${
                          selectedPreset.charAt(0).toUpperCase() +
                          selectedPreset.slice(1)
                        } Theme`}
                    </ButtonText>
                  </Button>

                  <Button
                    variant="outline"
                    onPress={cancelPreview}
                    style={styles.button}
                  >
                    <ButtonText>
                      {customization?.cancelPreviewText ?? 'Cancel Preview'}
                    </ButtonText>
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
                      ? customization?.resetButtonText ??
                        'Reset to Default Theme'
                      : customization?.applyButtonText ??
                        `Apply ${
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
                <ButtonText>
                  {customization?.resetButtonText ?? 'Reset Theme'}
                </ButtonText>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <View style={[styles.simpleContainer, contentStyle]}>
            <Typography variant="h4" style={styles.simpleTitle}>
              {customization?.controlsTitle ?? 'Theme Controls'}
            </Typography>
            <View style={styles.row}>
              <Typography
                variant="body"
                style={{
                  opacity: isDarkModeDisabled ? 0.5 : 1,
                }}
              >
                {customization?.darkModeLabel ?? 'Dark Mode'}{' '}
                {isDarkModeDisabled &&
                  (customization?.darkModeDisabledLabel ?? '(Disabled)')}
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
                    {customization?.applyButtonText ??
                      `Apply ${
                        selectedPreset.charAt(0).toUpperCase() +
                        selectedPreset.slice(1)
                      } Theme`}
                  </ButtonText>
                </Button>

                <Button
                  variant="outline"
                  onPress={cancelPreview}
                  style={styles.button}
                >
                  <ButtonText>
                    {customization?.cancelPreviewText ?? 'Cancel Preview'}
                  </ButtonText>
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
                    ? customization?.resetButtonText ?? 'Reset to Default Theme'
                    : customization?.applyButtonText ??
                      `Apply ${
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
              <ButtonText>
                {customization?.resetButtonText ?? 'Reset Theme'}
              </ButtonText>
            </Button>
          </View>
        ))}

      {/* Theme Presets */}
      {showPresets &&
        (showCards ? (
          <Card style={[styles.card, contentStyle]}>
            <CardHeader
              title={customization?.presetsTitle ?? 'Theme Presets'}
            />
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
                    {customization?.defaultThemeText ?? 'Default'}
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
        ) : (
          <View style={[styles.simpleContainer, contentStyle]}>
            <Typography variant="h4" style={styles.simpleTitle}>
              {customization?.presetsTitle ?? 'Theme Presets'}
            </Typography>
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
                  {customization?.defaultThemeText ?? 'Default'}
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
          </View>
        ))}

      {/* Additional content */}
      {children}
    </VStack>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    button: {
      marginBottom: theme.spacing.sm,
    },
    presetGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    presetButton: {
      width: '32%',
      marginBottom: theme.spacing.sm,
    },
    simpleContainer: {
      marginBottom: theme.spacing.lg,
      padding: theme.spacing.md,
      borderRadius: theme.components.borderRadius.md,
    },
    simpleTitle: {
      marginBottom: theme.spacing.md,
      color: theme.colors.text,
    },
  });

export default ThemeManager;