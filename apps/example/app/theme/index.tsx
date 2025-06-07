import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { useTheme, useThemedStyles, Theme } from 'rnc-theme';

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
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const toggleTheme = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  const customizeTheme = () => {
    updateCustomTheme({
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
        full: 9999, // Added missing 'full' property
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48, // Menambahkan xxl yang diperlukan
      },
    });
    setSelectedPreset('custom');
  };

  const applyMaterialTheme = () => {
    updateCustomTheme({
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
        full: 9999, // Added missing 'full' property
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    });
    setSelectedPreset('material');
  };

  const applyCupertinoTheme = () => {
    updateCustomTheme({
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
        full: 9999, // Added missing 'full' property
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    });
    setSelectedPreset('cupertino');
  };

  const applyNeonTheme = () => {
    updateCustomTheme({
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
        full: 9999, // Added missing 'full' property
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
      },
    });
    setSelectedPreset('neon');
  };

  const showAlert = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: 'Operasi berhasil!',
      error: 'Terjadi kesalahan!',
      warning: 'Peringatan: Periksa input Anda!',
      info: 'Informasi: Tema telah diperbarui!',
    };
    Alert.alert('Notifikasi', messages[type]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />

      <Text style={styles.title}>🎨 Theme System Demo</Text>
      <Text style={styles.subtitle}>Mode saat ini: {themeMode}</Text>

      {/* Theme Controls */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎛️ Kontrol Tema</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Mode Gelap</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity style={styles.button} onPress={customizeTheme}>
          <Text style={styles.buttonText}>Terapkan Tema Kustom</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={resetTheme}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Reset Tema
          </Text>
        </TouchableOpacity>
      </View>

      {/* Theme Presets */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎭 Preset Tema</Text>

        <View style={styles.presetGrid}>
          <TouchableOpacity
            style={[
              styles.presetButton,
              selectedPreset === 'material' && styles.selectedPreset,
            ]}
            onPress={applyMaterialTheme}
          >
            <Text style={styles.presetText}>Material</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.presetButton,
              selectedPreset === 'cupertino' && styles.selectedPreset,
            ]}
            onPress={applyCupertinoTheme}
          >
            <Text style={styles.presetText}>Cupertino</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.presetButton,
              selectedPreset === 'neon' && styles.selectedPreset,
            ]}
            onPress={applyNeonTheme}
          >
            <Text style={styles.presetText}>Neon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.presetButton,
              selectedPreset === 'custom' && styles.selectedPreset,
            ]}
            onPress={customizeTheme}
          >
            <Text style={styles.presetText}>Kustom</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Color Palette */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎨 Palet Warna</Text>
        <View style={styles.colorsGrid}>
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, styles.primary]} />
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, styles.secondary]} />
            <Text style={styles.colorLabel}>Secondary</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, styles.success]} />
            <Text style={styles.colorLabel}>Success</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, styles.error]} />
            <Text style={styles.colorLabel}>Error</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, styles.warning]} />
            <Text style={styles.colorLabel}>Warning</Text>
          </View>
          <View style={styles.colorItem}>
            <View style={[styles.colorBox, styles.info]} />
            <Text style={styles.colorLabel}>Info</Text>
          </View>
        </View>
      </View>

      {/* Typography Showcase */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 Tipografi</Text>
        <Text style={styles.headingText}>Heading - Lorem Ipsum</Text>
        <Text style={styles.subtitleText}>Subtitle - Dolor sit amet</Text>
        <Text style={styles.bodyText}>
          Body - Consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
        <Text style={styles.smallText}>Small - Ut enim ad minim veniam</Text>
      </View>

      {/* Interactive Components */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔧 Komponen Interaktif</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Masukkan teks di sini..."
          placeholderTextColor={styles.textInput.color}
          value={inputText}
          onChangeText={setInputText}
        />

        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.actionButton, styles.successButton]}
            onPress={() => showAlert('success')}
          >
            <Text style={styles.actionButtonText}>✅ Success</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.errorButton]}
            onPress={() => showAlert('error')}
          >
            <Text style={styles.actionButtonText}>❌ Error</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.warningButton]}
            onPress={() => showAlert('warning')}
          >
            <Text style={styles.actionButtonText}>⚠️ Warning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.infoButton]}
            onPress={() => showAlert('info')}
          >
            <Text style={styles.actionButtonText}>ℹ️ Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Border Radius Showcase */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📐 Border Radius</Text>
        <View style={styles.radiusGrid}>
          <View style={styles.radiusItem}>
            <View
              style={[
                styles.radiusBox,
                { borderRadius: theme.borderRadius.sm },
              ]}
            />
            <Text style={styles.radiusLabel}>
              Small ({theme.borderRadius.sm}px)
            </Text>
          </View>
          <View style={styles.radiusItem}>
            <View
              style={[
                styles.radiusBox,
                { borderRadius: theme.borderRadius.md },
              ]}
            />
            <Text style={styles.radiusLabel}>
              Medium ({theme.borderRadius.md}px)
            </Text>
          </View>
          <View style={styles.radiusItem}>
            <View
              style={[
                styles.radiusBox,
                { borderRadius: theme.borderRadius.lg },
              ]}
            />
            <Text style={styles.radiusLabel}>
              Large ({theme.borderRadius.lg}px)
            </Text>
          </View>
          <View style={styles.radiusItem}>
            <View
              style={[
                styles.radiusBox,
                { borderRadius: theme.borderRadius.xl },
              ]}
            />
            <Text style={styles.radiusLabel}>
              XLarge ({theme.borderRadius.xl}px)
            </Text>
          </View>
          <View style={styles.radiusItem}>
            <View
              style={[
                styles.radiusBox,
                { borderRadius: theme.borderRadius.full },
              ]}
            />
            <Text style={styles.radiusLabel}>
              Full ({theme.borderRadius.full}px)
            </Text>
          </View>
        </View>
      </View>

      {/* Spacing Showcase */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📏 Spacing</Text>
        <View style={styles.spacingContainer}>
          <View style={[styles.spacingBox, { margin: theme.spacing.xs }]}>
            <Text style={styles.spacingText}>XS ({theme.spacing.xs}px)</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.sm }]}>
            <Text style={styles.spacingText}>SM ({theme.spacing.sm}px)</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.md }]}>
            <Text style={styles.spacingText}>MD ({theme.spacing.md}px)</Text>
          </View>
          <View style={[styles.spacingBox, { margin: theme.spacing.lg }]}>
            <Text style={styles.spacingText}>LG ({theme.spacing.lg}px)</Text>
          </View>
        </View>
      </View>
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
    fontSize: theme.typography.heading.fontSize,
    lineHeight: theme.typography.heading.lineHeight,
    color: theme.colors.text,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.sm,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center' as const,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.text,
    fontWeight: '600' as const,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.text,
  },

  // Preset Styles
  presetGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  presetButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    width: '48%' as const, // Menggunakan const assertion
    alignItems: 'center' as const,
    marginBottom: theme.spacing.sm,
  },
  selectedPreset: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '20',
  },
  presetText: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500' as const,
  },

  // Color Palette Styles
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
  colorLabel: {
    fontSize: theme.typography.small.fontSize, // Menggunakan 'small' bukan 'caption'
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  warning: {
    backgroundColor: theme.colors.warning,
  },
  info: {
    backgroundColor: theme.colors.info,
  },

  // Typography Styles
  headingText: {
    fontSize: theme.typography.heading.fontSize,
    lineHeight: theme.typography.heading.lineHeight,
    color: theme.colors.text,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.sm,
  },
  subtitleText: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
    color: theme.colors.text,
    fontWeight: '600' as const,
    marginBottom: theme.spacing.sm,
  },
  bodyText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  smallText: {
    fontSize: theme.typography.small.fontSize, // Menggunakan 'small' bukan 'caption'
    lineHeight: theme.typography.small.lineHeight,
    color: theme.colors.textSecondary,
    fontStyle: 'italic' as const,
  },

  // Interactive Components
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  buttonGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  actionButton: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    width: '48%' as const,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  successButton: {
    backgroundColor: theme.colors.success,
  },
  errorButton: {
    backgroundColor: theme.colors.error,
  },
  warningButton: {
    backgroundColor: theme.colors.warning,
  },
  infoButton: {
    backgroundColor: theme.colors.info,
  },

  // Border Radius Showcase
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
  radiusLabel: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },

  // Spacing Showcase
  spacingContainer: {
    alignItems: 'center' as const,
  },
  spacingBox: {
    backgroundColor: theme.colors.primary + '30',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  spacingText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
});

export default ThemeScreen;
