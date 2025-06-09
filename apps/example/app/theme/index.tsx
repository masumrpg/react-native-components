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
  Switcher,
  ButtonText,
  Button,
} from 'rnc-theme';

type ThemePreset =
  | 'default'
  | 'material'
  | 'neon'
  | 'custom'
  | 'ocean'
  | 'sunset'
  | 'forest'
  | 'galaxy'
  | 'vintage'
  | 'cyberpunk'
  | 'pastel'
  | 'monochrome'
  | 'autumn'
  | 'arctic';

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
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>('default');
  const [appliedTheme, setAppliedTheme] = useState<ThemePreset>('default');
  // Tambahkan state baru untuk preview
  const [previewTheme, setPreviewTheme] = useState<ThemePreset | null>(null);
  const [isDarkModeDisabled, setIsDarkModeDisabled] = useState(false);

  // Dynamic theme creators that respond to theme mode changes
  const createDynamicTheme = useCallback(
    (themeConfig: (isDark: boolean) => Partial<Theme>) => {
      const dynamicTheme = themeConfig(isDark);
      updateCustomTheme(dynamicTheme);
    },
    [updateCustomTheme]
  );

  // Improved toggle theme yang memperbarui tema aktif
  const toggleTheme = useCallback(() => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);

    // Jika ada tema yang sedang diterapkan (bukan default), perbarui tema tersebut
    if (appliedTheme !== 'default') {
      // Delay sedikit untuk memastikan themeMode sudah terupdate
      setTimeout(() => {
        applyThemePreset(appliedTheme);
      }, 50);
    }
  }, [isDark, setThemeMode, appliedTheme]);

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

  const oceanThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#0077BE' : '#006BA6',
        secondary: isDark ? '#00A8CC' : '#0091AD',
        background: isDark ? '#001F3F' : '#E6F3FF',
        surface: isDark ? '#003366' : '#FFFFFF',
        text: isDark ? '#E6F3FF' : '#001F3F',
        textSecondary: isDark ? '#B3D9FF' : '#004080',
        border: isDark ? '#0066CC' : '#B3D9FF',
        error: '#FF4444',
        warning: '#FF8800',
        success: '#00CC88',
        info: '#0099FF',
      },
      borderRadius: { sm: 8, md: 12, lg: 20, xl: 28, full: 9999 },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
    }),
    []
  );

  const sunsetThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#FF6B35' : '#FF4500',
        secondary: isDark ? '#F7931E' : '#FF8C00',
        background: isDark ? '#2C1810' : '#FFF8E1',
        surface: isDark ? '#4A2C17' : '#FFFFFF',
        text: isDark ? '#FFE4B5' : '#8B4513',
        textSecondary: isDark ? '#DEB887' : '#A0522D',
        border: isDark ? '#8B4513' : '#DEB887',
        error: '#DC143C',
        warning: '#FF6347',
        success: '#32CD32',
        info: '#4169E1',
      },
      borderRadius: { sm: 6, md: 14, lg: 22, xl: 30, full: 9999 },
      spacing: { xs: 6, sm: 12, md: 18, lg: 28, xl: 36, xxl: 52 },
    }),
    []
  );

  const forestThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#228B22' : '#006400',
        secondary: isDark ? '#32CD32' : '#228B22',
        background: isDark ? '#0F2A0F' : '#F0FFF0',
        surface: isDark ? '#1F4A1F' : '#FFFFFF',
        text: isDark ? '#90EE90' : '#2F4F2F',
        textSecondary: isDark ? '#98FB98' : '#556B2F',
        border: isDark ? '#556B2F' : '#98FB98',
        error: '#B22222',
        warning: '#DAA520',
        success: '#00FF00',
        info: '#4682B4',
      },
      borderRadius: { sm: 4, md: 8, lg: 16, xl: 24, full: 9999 },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
    }),
    []
  );

  const galaxyThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#9932CC' : '#8A2BE2',
        secondary: isDark ? '#DA70D6' : '#BA55D3',
        background: isDark ? '#191970' : '#F8F8FF',
        surface: isDark ? '#2F2F4F' : '#FFFFFF',
        text: isDark ? '#E6E6FA' : '#483D8B',
        textSecondary: isDark ? '#DDA0DD' : '#6A5ACD',
        border: isDark ? '#6A5ACD' : '#DDA0DD',
        error: '#FF1493',
        warning: '#FFD700',
        success: '#00CED1',
        info: '#00BFFF',
      },
      borderRadius: { sm: 12, md: 18, lg: 28, xl: 40, full: 9999 },
      spacing: { xs: 6, sm: 10, md: 20, lg: 30, xl: 40, xxl: 60 },
    }),
    []
  );

  const vintageThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#CD853F' : '#A0522D',
        secondary: isDark ? '#DEB887' : '#D2691E',
        background: isDark ? '#2F1B14' : '#FDF5E6',
        surface: isDark ? '#4A2C17' : '#FFFAF0',
        text: isDark ? '#F5DEB3' : '#8B4513',
        textSecondary: isDark ? '#DEB887' : '#A0522D',
        border: isDark ? '#8B4513' : '#DEB887',
        error: '#B22222',
        warning: '#DAA520',
        success: '#6B8E23',
        info: '#4682B4',
      },
      borderRadius: { sm: 2, md: 6, lg: 12, xl: 18, full: 9999 },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
    }),
    []
  );

  const cyberpunkThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#00FF41' : '#00CC33',
        secondary: isDark ? '#FF0080' : '#CC0066',
        background: isDark ? '#0D0208' : '#F0F0F0',
        surface: isDark ? '#1A0E13' : '#FFFFFF',
        text: isDark ? '#00FF41' : '#0D0208',
        textSecondary: isDark ? '#FF0080' : '#333333',
        border: isDark ? '#00FF41' : '#CCCCCC',
        error: '#FF073A',
        warning: '#FFFF00',
        success: '#39FF14',
        info: '#0080FF',
      },
      borderRadius: { sm: 0, md: 2, lg: 4, xl: 8, full: 9999 },
      spacing: { xs: 2, sm: 6, md: 12, lg: 20, xl: 28, xxl: 40 },
    }),
    []
  );

  const pastelThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#FFB3BA' : '#FF9AA2',
        secondary: isDark ? '#BAFFC9' : '#B5EAD7',
        background: isDark ? '#2D2D2D' : '#FFFBF0',
        surface: isDark ? '#3D3D3D' : '#FFFFFF',
        text: isDark ? '#FFFFFF' : '#5D4E75',
        textSecondary: isDark ? '#E0E0E0' : '#8B7D8B',
        border: isDark ? '#5D5D5D' : '#E8E8E8',
        error: '#FFB3B3',
        warning: '#FFDFBA',
        success: '#C7CEEA',
        info: '#B5EAD7',
      },
      borderRadius: { sm: 16, md: 20, lg: 28, xl: 36, full: 9999 },
      spacing: { xs: 8, sm: 12, md: 20, lg: 28, xl: 36, xxl: 52 },
    }),
    []
  );

  const monochromeThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#FFFFFF' : '#000000',
        secondary: isDark ? '#CCCCCC' : '#666666',
        background: isDark ? '#000000' : '#FFFFFF',
        surface: isDark ? '#1A1A1A' : '#F8F8F8',
        text: isDark ? '#FFFFFF' : '#000000',
        textSecondary: isDark ? '#CCCCCC' : '#666666',
        border: isDark ? '#666666' : '#CCCCCC',
        error: isDark ? '#FF6666' : '#CC0000',
        warning: isDark ? '#FFCC66' : '#FF9900',
        success: isDark ? '#66FF66' : '#00CC00',
        info: isDark ? '#6666FF' : '#0066CC',
      },
      borderRadius: { sm: 0, md: 4, lg: 8, xl: 12, full: 9999 },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
    }),
    []
  );

  const autumnThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#D2691E' : '#B8860B',
        secondary: isDark ? '#CD853F' : '#DAA520',
        background: isDark ? '#2F1B0C' : '#FFF8DC',
        surface: isDark ? '#4A2C17' : '#FFFAF0',
        text: isDark ? '#F4A460' : '#8B4513',
        textSecondary: isDark ? '#DEB887' : '#A0522D',
        border: isDark ? '#8B4513' : '#DEB887',
        error: '#DC143C',
        warning: '#FF8C00',
        success: '#228B22',
        info: '#4682B4',
      },
      borderRadius: { sm: 8, md: 16, lg: 24, xl: 32, full: 9999 },
      spacing: { xs: 6, sm: 12, md: 18, lg: 26, xl: 34, xxl: 50 },
    }),
    []
  );

  const arcticThemeConfig = useMemo(
    () => (isDark: boolean) => ({
      colors: {
        primary: isDark ? '#87CEEB' : '#4682B4',
        secondary: isDark ? '#B0E0E6' : '#5F9EA0',
        background: isDark ? '#1C2833' : '#F0F8FF',
        surface: isDark ? '#2C3E50' : '#FFFFFF',
        text: isDark ? '#E8F4FD' : '#2C3E50',
        textSecondary: isDark ? '#AED6F1' : '#5D6D7E',
        border: isDark ? '#5D6D7E' : '#AED6F1',
        error: '#E74C3C',
        warning: '#F39C12',
        success: '#27AE60',
        info: '#3498DB',
      },
      borderRadius: { sm: 10, md: 16, lg: 24, xl: 32, full: 9999 },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
    }),
    []
  );

  // Helper function untuk mendapatkan theme config berdasarkan preset
  const getThemeConfig = useCallback(
    (preset: ThemePreset) => {
      switch (preset) {
        case 'custom':
          return customThemeConfig;
        case 'material':
          return materialThemeConfig;
        case 'neon':
          return neonThemeConfig;
        case 'ocean':
          return oceanThemeConfig;
        case 'sunset':
          return sunsetThemeConfig;
        case 'forest':
          return forestThemeConfig;
        case 'galaxy':
          return galaxyThemeConfig;
        case 'vintage':
          return vintageThemeConfig;
        case 'cyberpunk':
          return cyberpunkThemeConfig;
        case 'pastel':
          return pastelThemeConfig;
        case 'monochrome':
          return monochromeThemeConfig;
        case 'autumn':
          return autumnThemeConfig;
        case 'arctic':
          return arcticThemeConfig;
        default:
          return null;
      }
    },
    [
      customThemeConfig,
      materialThemeConfig,
      neonThemeConfig,
      oceanThemeConfig,
      sunsetThemeConfig,
      forestThemeConfig,
      galaxyThemeConfig,
      vintageThemeConfig,
      cyberpunkThemeConfig,
      pastelThemeConfig,
      monochromeThemeConfig,
      autumnThemeConfig,
      arcticThemeConfig,
    ]
  );

  // Fungsi preview tema (tidak mengubah appliedTheme)
  const previewThemePreset = useCallback(
    (preset: ThemePreset) => {
      setSelectedPreset(preset);
      setPreviewTheme(preset);
      setIsDarkModeDisabled(preset !== 'default'); // Disable dark mode toggle saat preview

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
    },
    [createDynamicTheme, resetTheme, getThemeConfig]
  );

  // Fungsi apply tema (mengubah appliedTheme)
  const applyThemePreset = useCallback(
    (preset: ThemePreset) => {
      setAppliedTheme(preset);
      setPreviewTheme(null);
      setIsDarkModeDisabled(false); // Re-enable dark mode toggle
      previewThemePreset(preset);
    },
    [previewThemePreset]
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
      Alert.alert('Notifikasi', messages[type]);
    },
    []
  );

  const applySelectedTheme = useCallback(() => {
    applyThemePreset(selectedPreset);
    showAlert('success');
  }, [selectedPreset, applyThemePreset, showAlert]);

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
          <View style={styles.row}>
            <Typography
              variant="body"
              style={{
                opacity: isDarkModeDisabled ? 0.5 : 1,
              }}
            >
              Mode Gelap {isDarkModeDisabled && '(Dinonaktifkan saat preview)'}
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
            </View>
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
          <View style={styles.presetGrid}>
            {[
              { key: 'default', label: 'Default' },
              { key: 'material', label: 'Material' },
              { key: 'neon', label: 'Neon' },
              { key: 'custom', label: 'Kustom' },
              { key: 'ocean', label: 'Ocean' },
              { key: 'sunset', label: 'Sunset' },
              { key: 'forest', label: 'Forest' },
              { key: 'galaxy', label: 'Galaxy' },
              { key: 'vintage', label: 'Vintage' },
              { key: 'cyberpunk', label: 'Cyberpunk' },
              { key: 'pastel', label: 'Pastel' },
              { key: 'monochrome', label: 'Monochrome' },
              { key: 'autumn', label: 'Autumn' },
              { key: 'arctic', label: 'Arctic' },
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
          </View>
        </CardContent>
      </Card>

      {/* ... rest of existing code ... */}
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
