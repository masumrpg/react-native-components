import React, { useMemo } from 'react';
import { View } from 'react-native';
import {
  ThemeManager,
  ThemePresetConfig,
  CustomThemeConfigFactory,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  ButtonText,
  useTheme,
  useThemedStyles,
  Theme,
  VScroll,
  Heading,
} from 'rnc-theme';

const ThemeManagerExampleScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);

  // Define custom theme configurations
  const customThemeConfig: CustomThemeConfigFactory = useMemo(
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
        muted: isDark ? '#666666' : '#999999',
        accent: isDark ? '#FF6B6B' : '#4ECDC4',
        destructive: '#FF5252',
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
          md: 8,
          lg: 16,
          xl: 24,
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
    }),
    []
  );

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
    }),
    []
  );

  const oceanThemeConfig: CustomThemeConfigFactory = useMemo(
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#00A8CC',
        destructive: '#FF4444',
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
          xs: 8,
          sm: 8,
          md: 12,
          lg: 20,
          xl: 28,
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#F7931E',
        destructive: '#DC143C',
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
          xs: 6,
          sm: 12,
          md: 18,
          lg: 28,
          xl: 36,
        },
        borderRadius: {
          xs: 6,
          sm: 6,
          md: 14,
          lg: 22,
          xl: 30,
          full: 9999,
        },
      },
      spacing: {
        xs: 6,
        sm: 12,
        md: 18,
        lg: 28,
        xl: 36,
        xxl: 52,
      },
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#32CD32',
        destructive: '#B22222',
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
          md: 8,
          lg: 16,
          xl: 24,
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#DA70D6',
        destructive: '#FF1493',
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
          xs: 6,
          sm: 10,
          md: 20,
          lg: 30,
          xl: 40,
        },
        borderRadius: {
          xs: 12,
          sm: 12,
          md: 18,
          lg: 28,
          xl: 40,
          full: 9999,
        },
      },
      spacing: {
        xs: 6,
        sm: 10,
        md: 20,
        lg: 30,
        xl: 40,
        xxl: 60,
      },
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#DEB887',
        destructive: '#B22222',
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
          md: 2,
          lg: 6,
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#FF0080',
        destructive: '#FF073A',
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
          xs: 2,
          sm: 6,
          md: 12,
          lg: 20,
          xl: 28,
        },
        borderRadius: {
          xs: 0,
          sm: 0,
          md: 2,
          lg: 4,
          xl: 8,
          full: 9999,
        },
      },
      spacing: {
        xs: 2,
        sm: 6,
        md: 12,
        lg: 20,
        xl: 28,
        xxl: 40,
      },
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#BAFFC9',
        destructive: '#FFB3B3',
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
          md: 20,
          lg: 28,
          xl: 36,
        },
        borderRadius: {
          xs: 16,
          sm: 16,
          md: 20,
          lg: 28,
          xl: 36,
          full: 9999,
        },
      },
      spacing: {
        xs: 8,
        sm: 12,
        md: 20,
        lg: 28,
        xl: 36,
        xxl: 52,
      },
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
        muted: isDark ? '#666666' : '#999999',
        accent: isDark ? '#CCCCCC' : '#666666',
        destructive: isDark ? '#FF6666' : '#CC0000',
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
          xs: 0,
          sm: 0,
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#CD853F',
        destructive: '#DC143C',
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
          xs: 6,
          sm: 12,
          md: 18,
          lg: 26,
          xl: 34,
        },
        borderRadius: {
          xs: 8,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
          full: 9999,
        },
      },
      spacing: {
        xs: 6,
        sm: 12,
        md: 18,
        lg: 26,
        xl: 34,
        xxl: 50,
      },
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
        muted: isDark ? '#666666' : '#999999',
        accent: '#B0E0E6',
        destructive: '#E74C3C',
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
          xs: 10,
          sm: 10,
          md: 16,
          lg: 24,
          xl: 32,
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
    }),
    []
  );

  // Define theme presets array
  const themePresets: ThemePresetConfig[] = useMemo(
    () => [
      {
        key: 'custom',
        label: 'Custom',
        config: customThemeConfig,
      },
      {
        key: 'material',
        label: 'Material Design',
        config: materialThemeConfig,
      },
      {
        key: 'neon',
        label: 'Neon Glow',
        config: neonThemeConfig,
      },
      {
        key: 'ocean',
        label: 'Ocean Blue',
        config: oceanThemeConfig,
      },
      {
        key: 'sunset',
        label: 'Sunset',
        config: sunsetThemeConfig,
      },
      {
        key: 'forest',
        label: 'Forest',
        config: forestThemeConfig,
      },
      {
        key: 'galaxy',
        label: 'Galaxy',
        config: galaxyThemeConfig,
      },
      {
        key: 'vintage',
        label: 'Vintage',
        config: vintageThemeConfig,
      },
      {
        key: 'cyberpunk',
        label: 'Cyberpunk',
        config: cyberpunkThemeConfig,
      },
      {
        key: 'arctic',
        label: 'Arctic',
        config: arcticThemeConfig,
      },
      {
        key: 'pastel',
        label: 'Pastel',
        config: pastelThemeConfig,
      },
      {
        key: 'monochrome',
        label: 'Monochrome',
        config: monochromeThemeConfig,
      },
      {
        key: 'autumn',
        label: 'Autumn',
        config: autumnThemeConfig,
      },
    ],
    [customThemeConfig, materialThemeConfig, neonThemeConfig, oceanThemeConfig]
  );

  const handleThemeApplied = (theme: string) => {
    console.log(`Theme applied: ${theme}`);
  };

  const handleThemePreview = (theme: string) => {
    console.log(`Theme previewed: ${theme}`);
  };

  return (
    <VScroll>
      <View style={styles.container}>
        {/* Default ThemeManager */}
        <Heading style={{ paddingHorizontal: 16 }}>
          Default Theme Manager
        </Heading>
        <ThemeManager
          themePresets={themePresets}
          initialTheme="default"
          onThemeApplied={handleThemeApplied}
          onThemePreview={handleThemePreview}
        >
          {/* Demo content for default version */}
          <Card style={styles.demoCard}>
            <CardHeader title="Demo Content - Default" />
            <CardContent>
              <Typography variant="body" style={styles.demoText}>
                This is the default ThemeManager with standard labels and
                messages.
              </Typography>

              <View style={styles.buttonContainer}>
                <Button variant="primary" style={styles.demoButton}>
                  <ButtonText>Primary Button</ButtonText>
                </Button>

                <Button variant="secondary" style={styles.demoButton}>
                  <ButtonText>Secondary Button</ButtonText>
                </Button>

                <Button variant="outline" style={styles.demoButton}>
                  <ButtonText>Outline Button</ButtonText>
                </Button>
              </View>

              <View style={styles.colorDemo}>
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.accent },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.success },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.warning },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.error },
                  ]}
                />
              </View>
            </CardContent>
          </Card>
        </ThemeManager>

        {/* Customized ThemeManager */}
        <Heading style={{ paddingHorizontal: 16 }}>
          Customized Caption Theme Manager
        </Heading>
        <ThemeManager
          themePresets={themePresets}
          initialTheme="default"
          onThemeApplied={handleThemeApplied}
          onThemePreview={handleThemePreview}
          customization={{
            controlsTitle: '🎨 Pengaturan Tema',
            presetsTitle: '🌈 Koleksi Tema',
            darkModeLabel: 'Mode Gelap',
            darkModeDisabledLabel: '(Tidak Aktif)',
            applyButtonText: 'Terapkan Tema',
            cancelPreviewText: 'Batal Preview',
            resetButtonText: 'Reset ke Default',
            defaultThemeText: 'Tema Bawaan',
            successMessage: 'Tema berhasil diterapkan! 🎉',
            errorMessage: 'Terjadi kesalahan! ❌',
            warningMessage: 'Peringatan: Silakan periksa input Anda! ⚠️',
            infoMessage: 'Info: Tema telah diperbarui! ℹ️',
          }}
        >
          <Card style={styles.demoCard}>
            <CardHeader title="Demo Content - Customized" />
            <CardContent>
              <Typography variant="body" style={styles.demoText}>
                This is the customized ThemeManager with Indonesian labels and
                custom messages. Notice the difference in titles, button texts,
                and messages compared to the default version above.
              </Typography>

              <View style={styles.buttonContainer}>
                <Button variant="primary" style={styles.demoButton}>
                  <ButtonText>Tombol Utama</ButtonText>
                </Button>

                <Button variant="secondary" style={styles.demoButton}>
                  <ButtonText>Tombol Sekunder</ButtonText>
                </Button>

                <Button variant="outline" style={styles.demoButton}>
                  <ButtonText>Tombol Outline</ButtonText>
                </Button>
              </View>

              <View style={styles.colorDemo}>
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.accent },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.success },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.warning },
                  ]}
                />
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: theme.colors.error },
                  ]}
                />
              </View>
            </CardContent>
          </Card>
        </ThemeManager>
      </View>
    </VScroll>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  demoCard: {
    marginBottom: theme.spacing.lg,
  },
  demoText: {
    marginBottom: theme.spacing.md,
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: theme.spacing.lg,
  },
  demoButton: {
    marginBottom: theme.spacing.sm,
  },
  colorDemo: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: theme.components.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});

export default ThemeManagerExampleScreen;