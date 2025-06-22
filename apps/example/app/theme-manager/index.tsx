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
    <ThemeManager
      themePresets={themePresets}
      initialTheme="default"
      onThemeApplied={handleThemeApplied}
      onThemePreview={handleThemePreview}
    >
      {/* Additional demo content */}
      <Card style={styles.demoCard}>
        <CardHeader title="🚀 Demo Content" />
        <CardContent>
          <Typography variant="body" style={styles.demoText}>
            This content demonstrates how the theme changes affect the entire UI.
            The ThemeManager component above handles all the theme logic internally,
            while accepting custom theme configurations from outside.
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
            <View style={[styles.colorBox, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.secondary }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.accent }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.success }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.warning }]} />
            <View style={[styles.colorBox, { backgroundColor: theme.colors.error }]} />
          </View>
        </CardContent>
      </Card>
    </ThemeManager>
  );
};

const createStyles = (theme: Theme) => ({
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