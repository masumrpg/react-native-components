import React, { useState, useCallback, useMemo } from 'react';
import { ScrollView, Alert, StatusBar, View } from 'react-native';
import {
  useTheme,
  useThemedStyles,
  Theme,
  CardHeader,
  CardContent,
  Card,
  Typography,
  Input,
  Switcher,
  Badge,
  ButtonText,
  Button,
  BadgeText,
} from 'rnc-theme';

type ThemePreset = 'default' | 'material' | 'cupertino' | 'neon' | 'custom';

const ThemeScreen: React.FC = () => {
  const {
    theme,
    themeMode,
    setThemeMode,
    isDark,
    updateCustomTheme,
    resetTheme,
  } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [inputText, setInputText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>('default');

  // Dynamic theme creators that respond to theme mode changes
  const createDynamicTheme = useCallback(
    (themeConfig: (isDark: boolean) => Partial<Theme>) => {
      const dynamicTheme = themeConfig(isDark);
      updateCustomTheme(dynamicTheme);
    },
    [isDark, updateCustomTheme]
  );

  const toggleTheme = useCallback(() => {
    setThemeMode(isDark ? 'light' : 'dark');
  }, [isDark, setThemeMode]);

  const customThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#FF6B6B' : '#4ECDC4',
        secondary: isDark ? '#FFE66D' : '#45B7D1',
        background: isDark ? '#1a1a1a' : '#f8f9fa',
        surface: isDark ? '#2d2d2d' : '#ffffff',
        text: isDark ? '#ffffff' : '#333333',
        textSecondary: isDark ? '#b0b0b0' : '#666666',
        border: isDark ? '#404040' : '#e0e0e0',
        error: '#FF5252',
        warning: '#FF9800',
        success: '#4CAF50',
        info: '#2196F3',
      },
      borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
        xl: 24,
        full: 9999,
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    }),
    []
  );

  const materialThemeConfig = useMemo(
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
      },
      borderRadius: {
        sm: 4,
        md: 4,
        lg: 8,
        xl: 12,
        full: 9999,
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    }),
    []
  );

  const cupertinoThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        background: isDark ? '#000000' : '#F2F2F7',
        surface: isDark ? '#1C1C1E' : '#FFFFFF',
        text: isDark ? '#FFFFFF' : '#000000',
        textSecondary: isDark ? '#8E8E93' : '#3C3C43',
        border: isDark ? '#38383A' : '#C6C6C8',
        error: '#FF3B30',
        warning: '#FF9500',
        success: '#34C759',
        info: '#5AC8FA',
      },
      borderRadius: {
        sm: 6,
        md: 10,
        lg: 14,
        xl: 20,
        full: 9999,
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    }),
    []
  );

  const neonThemeConfig = useMemo(
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
      },
      borderRadius: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 16,
        full: 9999,
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    }),
    []
  );

  const applyThemePreset = useCallback(
    (preset: ThemePreset) => {
      setSelectedPreset(preset);
      switch (preset) {
        case 'custom':
          createDynamicTheme(customThemeConfig);
          break;
        case 'material':
          createDynamicTheme(materialThemeConfig);
          break;
        case 'cupertino':
          createDynamicTheme(cupertinoThemeConfig);
          break;
        case 'neon':
          createDynamicTheme(neonThemeConfig);
          break;
        case 'default':
          resetTheme();
          break;
      }
    },
    [
      createDynamicTheme,
      customThemeConfig,
      materialThemeConfig,
      cupertinoThemeConfig,
      neonThemeConfig,
      resetTheme,
    ]
  );

  const showAlert = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages = {
        success: 'Operasi berhasil!',
        error: 'Terjadi kesalahan!',
        warning: 'Peringatan: Periksa input Anda!',
        info: 'Informasi: Tema telah diperbarui!',
      };
      Alert.alert('Notifikasi', messages[type]);
    },
    []
  );

  // Remove this problematic useEffect that causes infinite loop
  // React.useEffect(() => {
  //   if (selectedPreset !== 'default') {
  //     applyThemePreset(selectedPreset);
  //   }
  // }, [isDark, selectedPreset, applyThemePreset]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <Typography variant="heading" align="center" style={styles.title}>
        🎨 Theme System Demo
      </Typography>
      <Typography variant="subtitle" align="center" style={styles.subtitle}>
        Mode saat ini: {themeMode}
      </Typography>

      {/* Theme Controls */}
      <Card style={styles.card}>
        <CardHeader title="🎛️ Kontrol Tema" />
        <CardContent>
          <View style={styles.row}>
            <Typography variant="body">Mode Gelap</Typography>
            <Switcher value={isDark} onValueChange={toggleTheme} />
          </View>

          <Button
            variant="primary"
            onPress={() => applyThemePreset('custom')}
            style={styles.button}
          >
            <ButtonText>Terapkan Tema Kustom</ButtonText>
          </Button>

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
          <View style={styles.presetGrid}>
            {[
              { key: 'default', label: 'Default' },
              { key: 'material', label: 'Material' },
              { key: 'cupertino', label: 'Cupertino' },
              { key: 'neon', label: 'Neon' },
              { key: 'custom', label: 'Kustom' },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={selectedPreset === key ? 'primary' : 'outline'}
                size="sm"
                onPress={() => applyThemePreset(key as ThemePreset)}
                style={styles.presetButton}
              >
                <ButtonText>{label}</ButtonText>
              </Button>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card style={styles.card}>
        <CardHeader title="🎨 Palet Warna" />
        <CardContent>
          <View style={styles.colorsGrid}>
            {[
              { key: 'primary', label: 'Primary', color: theme.colors.primary },
              {
                key: 'secondary',
                label: 'Secondary',
                color: theme.colors.secondary,
              },
              { key: 'success', label: 'Success', color: theme.colors.success },
              { key: 'error', label: 'Error', color: theme.colors.error },
              { key: 'warning', label: 'Warning', color: theme.colors.warning },
              { key: 'info', label: 'Info', color: theme.colors.info },
            ].map(({ key, label, color }) => (
              <View key={key} style={styles.colorItem}>
                <View style={[styles.colorBox, { backgroundColor: color }]} />
                <Typography variant="small" align="center">
                  {label}
                </Typography>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Typography Showcase */}
      <Card style={styles.card}>
        <CardHeader title="📝 Tipografi" />
        <CardContent>
          <Typography variant="heading" style={styles.marginBottom}>
            Heading - Lorem Ipsum
          </Typography>
          <Typography variant="subtitle" style={styles.marginBottom}>
            Subtitle - Dolor sit amet
          </Typography>
          <Typography variant="body" style={styles.marginBottom}>
            Body - Consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="small">
            Small - Ut enim ad minim veniam
          </Typography>
        </CardContent>
      </Card>

      {/* Interactive Components */}
      <Card style={styles.card}>
        <CardHeader title="🔧 Komponen Interaktif" />
        <CardContent>
          <Input
            placeholder="Masukkan teks di sini..."
            value={inputText}
            onChangeText={setInputText}
            style={styles.marginBottom}
          />

          <View style={styles.buttonGrid}>
            <Button
              variant="success"
              size="sm"
              onPress={() => showAlert('success')}
              style={styles.actionButton}
            >
              <ButtonText>✅ Success</ButtonText>
            </Button>

            <Button
              variant="error"
              size="sm"
              onPress={() => showAlert('error')}
              style={styles.actionButton}
            >
              <ButtonText>❌ Error</ButtonText>
            </Button>

            <Button
              variant="warning"
              size="sm"
              onPress={() => showAlert('warning')}
              style={styles.actionButton}
            >
              <ButtonText>
                ⚠️ Warning
              </ButtonText>
            </Button>

            <Button
              variant="info"
              size="sm"
              onPress={() => showAlert('info')}
              style={styles.actionButton}
            >
              <ButtonText>ℹ️ Info</ButtonText>
            </Button>
          </View>
        </CardContent>
      </Card>

      {/* Border Radius Showcase */}
      <Card style={styles.card}>
        <CardHeader title="📐 Border Radius" />
        <CardContent>
          <View style={styles.radiusGrid}>
            {[
              { key: 'sm', value: theme.borderRadius.sm },
              { key: 'md', value: theme.borderRadius.md },
              { key: 'lg', value: theme.borderRadius.lg },
              { key: 'xl', value: theme.borderRadius.xl },
              { key: 'full', value: theme.borderRadius.full },
            ].map(({ key, value }) => (
              <View key={key} style={styles.radiusItem}>
                <View
                  style={[
                    styles.radiusBox,
                    { borderRadius: value === 9999 ? 30 : value },
                  ]}
                />
                <Typography variant="small" align="center">
                  {key.toUpperCase()} ({value}px)
                </Typography>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Spacing Showcase */}
      <Card style={styles.card}>
        <CardHeader title="📏 Spacing" />
        <CardContent>
          <View style={styles.spacingContainer}>
            {[
              { key: 'xs', value: theme.spacing.xs },
              { key: 'sm', value: theme.spacing.sm },
              { key: 'md', value: theme.spacing.md },
              { key: 'lg', value: theme.spacing.lg },
            ].map(({ key, value }) => (
              <Badge
                key={key}
                variant="default"
                style={{
                  ...styles.spacingBox,
                  margin: value,
                }}
              >
                <BadgeText>
                  {key.toUpperCase()} ({value}px)
                </BadgeText>
              </Badge>
            ))}
          </View>
        </CardContent>
      </Card>
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
    width: '48%' as const,
    marginBottom: theme.spacing.sm,
  },
  colorsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  colorItem: {
    alignItems: 'center' as const,
    marginBottom: theme.spacing.md,
    width: '30%' as const,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  marginBottom: {
    marginBottom: theme.spacing.sm,
  },
  buttonGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  actionButton: {
    width: '48%' as const,
    marginBottom: theme.spacing.sm,
  },
  radiusGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  radiusItem: {
    alignItems: 'center' as const,
    marginBottom: theme.spacing.md,
    width: '48%' as const,
  },
  radiusBox: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  spacingContainer: {
    alignItems: 'center' as const,
  },
  spacingBox: {
    marginBottom: theme.spacing.sm,
  },
});

export default ThemeScreen;
