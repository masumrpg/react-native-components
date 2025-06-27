import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  useTheme,
  useThemedStyles,
  Theme,
  CardHeader,
  CardContent,
  Card,
  Typography,
  ButtonText,
  Button,
  themeRegistry,
  CustomThemeConfigFactory,
  VScroll,
  Box,
  useToast,
} from 'rnc-theme';

type ThemePreset = 'default' | 'material' | 'neon';

const ThemeScreen: React.FC = () => {
  const { toast } = useToast();
  const { theme, themeMode, isDark, updateCustomTheme, resetTheme } =
    useTheme();
  const styles = useThemedStyles(createStyles);
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>('default');
  const [appliedTheme, setAppliedTheme] = useState<ThemePreset>('default');
  // Tambahkan state baru untuk preview
  const [previewTheme, setPreviewTheme] = useState<ThemePreset | null>(null);

  useEffect(() => {
    // Register semua theme presets ke registry
    themeRegistry.registerPreset('material', materialThemeConfig);
    themeRegistry.registerPreset('neon', neonThemeConfig);
  }, []);

  // Dynamic theme creators that respond to theme mode changes
  const createDynamicTheme = useCallback(
    (themeConfig: (isDark: boolean) => Partial<Theme>) => {
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

  // Define custom theme configurations

  const materialThemeConfig: CustomThemeConfigFactory = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: isDark ? '#121212' : '#FFFFFF',
        surface: isDark ? '#1E1E1E' : '#FFFFFF',
        text: isDark ? '#FFFFFF' : '#000000',
        textSecondary: isDark ? '#B3B3B3' : '#757575',
        border: isDark ? '#2C2C2C' : '#E0E0E0',
        error: '#B00020',
        warning: '#FF6F00',
        success: '#00C853',
        info: '#2962FF',
        muted: isDark ? '#666666' : '#999999',
        accent: '#6200EE',
        destructive: '#B00020',
      },
      components: {
        height: {
          xs: 32,
          sm: 36,
          md: 40,
          lg: 44,
          xl: 48,
        },
        padding: {
          xs: 8,
          sm: 12,
          md: 16,
          lg: 20,
          xl: 24,
        },
        borderRadius: {
          xs: 4,
          sm: 4,
          md: 4,
          lg: 8,
          xl: 12,
          full: 9999,
        },
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
      typography: {
        caption: { fontSize: 10, lineHeight: 14, fontWeight: '400' },
        small: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
        body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
        subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '500' },
        title: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
        heading: { fontSize: 24, lineHeight: 32, fontWeight: '700' },
      },
      fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
      },
    }),
    []
  );

  const neonThemeConfig: CustomThemeConfigFactory = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: '#00FFFF',
        secondary: '#FF00FF',
        background: isDark ? '#0a0a0a' : '#f0f0f0',
        surface: isDark ? '#1a1a1a' : '#ffffff',
        text: isDark ? '#00FFFF' : '#333333',
        textSecondary: isDark ? '#FF00FF' : '#666666',
        border: isDark ? '#00FFFF' : '#e0e0e0',
        error: '#FF0040',
        warning: '#FFFF00',
        success: '#00FF40',
        info: '#4080FF',
        muted: isDark ? '#666666' : '#999999',
        accent: '#FF00FF',
        destructive: '#FF0040',
      },
      components: {
        height: {
          xs: 32,
          sm: 36,
          md: 40,
          lg: 44,
          xl: 48,
        },
        padding: {
          xs: 8,
          sm: 12,
          md: 16,
          lg: 20,
          xl: 24,
        },
        borderRadius: {
          xs: 2,
          sm: 2,
          md: 4,
          lg: 8,
          xl: 16,
          full: 9999,
        },
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
      typography: {
        caption: { fontSize: 10, lineHeight: 14, fontWeight: '400' },
        small: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
        body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
        subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '500' },
        title: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
        heading: { fontSize: 24, lineHeight: 32, fontWeight: '700' },
      },
      fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
      },
    }),
    []
  );

  // Helper function untuk mendapatkan theme config berdasarkan preset
  const getThemeConfig = useCallback(
    (preset: ThemePreset) => {
      switch (preset) {
        case 'material':
          return materialThemeConfig;
        case 'neon':
          return neonThemeConfig;
        default:
          return null;
      }
    },
    [materialThemeConfig, neonThemeConfig]
  );

  // Fungsi preview tema (tidak mengubah appliedTheme)
  const previewThemePreset = useCallback(
    (preset: ThemePreset) => {
      setSelectedPreset(preset);
      setPreviewTheme(preset);

      if (preset === 'default') {
        resetTheme();
        setPreviewTheme(null);
      } else {
        const themeConfig = getThemeConfig(preset);
        if (themeConfig) {
          createDynamicTheme(themeConfig);
        }
      }
    },
    [createDynamicTheme, resetTheme, getThemeConfig]
  );

  // Fungsi apply tema (mengubah appliedTheme)
  const applyThemePreset = useCallback(
    (preset: ThemePreset) => {
      setAppliedTheme(preset);
      setPreviewTheme(null);

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
    },
    [isDark, resetTheme, getThemeConfig, updateCustomTheme]
  );

  // Fungsi cancel preview
  const cancelPreview = useCallback(() => {
    if (previewTheme && previewTheme !== appliedTheme) {
      // Kembali ke tema yang sedang diterapkan
      previewThemePreset(appliedTheme);
      setSelectedPreset(appliedTheme);
    }
  }, [previewTheme, appliedTheme, previewThemePreset]);

  const showAlert = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages = {
        success: 'Operasi berhasil!',
        error: 'Terjadi kesalahan!',
        warning: 'Peringatan: Periksa input Anda!',
        info: 'Informasi: Tema telah diperbarui!',
      };
      toast({
        title: 'Notification',
        description: messages[type],
      });
    },
    []
  );

  const applySelectedTheme = useCallback(() => {
    applyThemePreset(selectedPreset);
    showAlert('success');
  }, [selectedPreset, applyThemePreset, showAlert]);

  return (
    <VScroll style={styles.container}>
      <Typography variant="heading" align="center" style={styles.title}>
        🎨 Theme System Demo
      </Typography>
      <Typography variant="subtitle" align="center" style={styles.subtitle}>
        Mode saat ini: {themeMode} | Tema aktif: {appliedTheme}
        {previewTheme && previewTheme !== appliedTheme && (
          <Typography variant="small" style={{ color: theme.colors.warning }}>
            {' '}
            | Preview: {previewTheme}
          </Typography>
        )}
      </Typography>

      {/* Theme Controls */}
      <Card style={styles.card}>
        <CardHeader title="🎛️ Kontrol Tema" />
        <CardContent>
          {previewTheme && previewTheme !== appliedTheme ? (
            <Box>
              <Button
                variant="primary"
                onPress={applySelectedTheme}
                style={styles.button}
              >
                <ButtonText>
                  ✅ Terapkan Tema{' '}
                  {selectedPreset.charAt(0).toUpperCase() +
                    selectedPreset.slice(1)}
                </ButtonText>
              </Button>

              <Button
                variant="outline"
                onPress={cancelPreview}
                style={styles.button}
              >
                <ButtonText>❌ Batal Preview</ButtonText>
              </Button>
            </Box>
          ) : (
            <Button
              variant="primary"
              onPress={applySelectedTheme}
              style={styles.button}
            >
              <ButtonText>
                {selectedPreset === 'default'
                  ? 'Reset ke Tema Default'
                  : `Terapkan Tema ${
                      selectedPreset.charAt(0).toUpperCase() +
                      selectedPreset.slice(1)
                    }`}
              </ButtonText>
            </Button>
          )}

          <Button
            variant="outline"
            onPress={() => applyThemePreset('default')}
            style={styles.button}
          >
            <ButtonText>Reset Tema</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Theme Presets */}
      <Card style={styles.card}>
        <CardHeader title="🎭 Preset Tema" />
        <CardContent>
          <Box style={styles.presetGrid}>
            {[
              { key: 'default', label: 'Default' },
              { key: 'material', label: 'Material' },
              { key: 'neon', label: 'Neon' },
            ].map(({ key, label }) => (
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
                onPress={() => previewThemePreset(key as ThemePreset)}
                style={styles.presetButton}
              >
                <ButtonText>
                  {label}
                  {appliedTheme === key && selectedPreset !== key && ' ✓'}
                  {selectedPreset === key &&
                    previewTheme !== appliedTheme &&
                    ' 👁️'}
                </ButtonText>
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
    </VScroll>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
    colorsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    colorItem: {
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      width: '30%',
    },
    colorBox: {
      width: 50,
      height: 50,
      borderRadius: theme.components.borderRadius.md,
      marginBottom: theme.spacing.xs,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    marginBottom: {
      marginBottom: theme.spacing.sm,
    },
    buttonGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    actionButton: {
      width: '48%',
      marginBottom: theme.spacing.sm,
    },
    radiusGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    radiusItem: {
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      width: '48%',
    },
    radiusBox: {
      width: 60,
      height: 60,
      backgroundColor: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    spacingContainer: {
      alignItems: 'center',
    },
    spacingBox: {
      marginBottom: theme.spacing.sm,
    },
  });

export default ThemeScreen;
