# rnc-theme

A powerful and flexible theming system for React Native applications with TypeScript support.

## Features

- 🎨 **Dynamic Theme Switching** - Switch between light and dark modes seamlessly
- 🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🔧 **Customizable** - Create custom themes with your own color palettes and component styles
- 📱 **React Native Optimized** - Built specifically for React Native applications
- 💾 **Persistent Storage** - Automatically saves theme preferences
- 🎭 **Multiple Presets** - Comes with various built-in theme presets
- 🔄 **Theme Registry** - Register and manage multiple theme configurations

## Installation

```bash
npm install rnc-theme
# or
yarn add rnc-theme
```

## Quick Start

### 1. Setup Theme Provider

Wrap your app with the `ThemeProvider`:

```tsx
import React from 'react';
import { ThemeProvider } from 'rnc-theme';
import App from './App';

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

### 2. Using Themes in Components

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, useThemedStyles } from 'rnc-theme';

const MyComponent = () => {
  const { theme, isDark, setThemeMode } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
};

const createStyles = (theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
  },
});
```

## Creating Custom Themes

### Basic Custom Theme

```tsx
import { CustomThemeConfigFactory } from 'rnc-theme';

const customThemeConfig: CustomThemeConfigFactory = (isDark: boolean) => ({
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
});
```

### Applying Custom Themes

```tsx
import React, { useCallback } from 'react';
import { useTheme } from 'rnc-theme';

const ThemeSelector = () => {
  const { updateCustomTheme, isDark } = useTheme();

  const applyCustomTheme = useCallback(() => {
    const themeConfig = customThemeConfig(isDark);
    updateCustomTheme(themeConfig, undefined, customThemeConfig);
  }, [isDark]);

  return (
    <Button onPress={applyCustomTheme} title="Apply Custom Theme" />
  );
};
```

## Theme Registry

Register multiple theme presets for easy switching:

```tsx
import { themeRegistry } from 'rnc-theme';

// Register theme presets
themeRegistry.registerPreset('material', materialThemeConfig);
themeRegistry.registerPreset('neon', neonThemeConfig);
themeRegistry.registerPreset('ocean', oceanThemeConfig);

// Apply registered theme
const applyTheme = (presetName: string) => {
  const themeConfig = themeRegistry.getPreset(presetName);
  if (themeConfig) {
    updateCustomTheme(themeConfig(isDark), undefined, themeConfig);
  }
};
```

## Built-in Theme Presets

The library comes with several built-in theme presets:

- **Default** - Clean and modern design
- **Material** - Google Material Design inspired
- **Neon** - Bright cyberpunk-style colors
- **Ocean** - Blue ocean-inspired palette
- **Sunset** - Warm orange and red tones
- **Forest** - Natural green colors
- **Galaxy** - Purple space-themed colors
- **Vintage** - Classic brown and beige tones
- **Cyberpunk** - High-contrast neon colors
- **Pastel** - Soft and gentle colors
- **Monochrome** - Black and white theme
- **Autumn** - Fall-inspired warm colors
- **Arctic** - Cool blue and white tones

### Example: Material Theme

```tsx
const materialThemeConfig = (isDark: boolean) => ({
  colors: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: isDark ? '#121212' : '#FFFFFF',
    surface: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    // ... more colors
  },
  components: {
    borderRadius: {
      xs: 4,
      sm: 4,
      md: 4,
      lg: 8,
      xl: 12,
      full: 9999,
    },
    // ... more component styles
  },
  // ... spacing and other properties
});
```

## Advanced Usage

### Dynamic Theme Creation

```tsx
const createDynamicTheme = useCallback(
  (themeConfig: (isDark: boolean) => Partial<Theme>) => {
    const lightTheme = themeConfig(false);
    const darkTheme = themeConfig(true);
    
    updateCustomTheme(
      isDark ? darkTheme : lightTheme,
      undefined,
      themeConfig
    );
  },
  [updateCustomTheme, isDark]
);
```

### Theme Mode Toggle

```tsx
const toggleTheme = useCallback(() => {
  const newMode = isDark ? 'light' : 'dark';
  setThemeMode(newMode);
}, [isDark, setThemeMode]);
```

### Theme Preview (without applying)

```tsx
const previewTheme = useCallback(
  (preset: string) => {
    const themeConfig = getThemeConfig(preset);
    if (themeConfig) {
      // Preview without permanently applying
      createDynamicTheme(themeConfig);
    }
  },
  [createDynamicTheme]
);
```

## API Reference

### Hooks

#### `useTheme()`

Returns the current theme context:

```tsx
const {
  theme,           // Current theme object
  themeMode,       // 'light' | 'dark'
  setThemeMode,    // Function to set theme mode
  isDark,          // Boolean indicating dark mode
  updateCustomTheme, // Function to update custom theme
  resetTheme,      // Function to reset to default theme
} = useTheme();
```

#### `useThemedStyles(styleCreator)`

Creates styles that automatically update with theme changes:

```tsx
const styles = useThemedStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));
```

### Types

#### `CustomThemeConfigFactory`

```tsx
type CustomThemeConfigFactory = (isDark: boolean) => Partial<Theme>;
```

#### `Theme`

```tsx
interface Theme {
  colors: ThemeColors;
  fontSizes: ThemeFontSizes;
  spacing: ThemeSpacing;
  components: ThemeComponentSizes;
  typography: ThemeTypography;
}
```

### Theme Registry

#### `themeRegistry.registerPreset(name, config)`

Register a theme preset:

```tsx
themeRegistry.registerPreset('myTheme', myThemeConfig);
```

#### `themeRegistry.getPreset(name)`

Get a registered theme preset:

```tsx
const config = themeRegistry.getPreset('myTheme');
```

#### `themeRegistry.getAllPresets()`

Get all registered presets:

```tsx
const allPresets = themeRegistry.getAllPresets();
```

## Best Practices

1. **Use TypeScript** - Take advantage of full type safety
2. **Create Theme Factories** - Use functions that accept `isDark` parameter for dynamic themes
3. **Register Presets** - Use the theme registry for better organization
4. **Consistent Naming** - Use consistent naming conventions for your theme properties
5. **Test Both Modes** - Always test your themes in both light and dark modes
6. **Performance** - Use `useThemedStyles` for better performance with style updates

## Troubleshooting

### Theme Not Updating

Make sure you're using `useThemedStyles` instead of creating styles directly:

```tsx
// ❌ Wrong - styles won't update
const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.background }
});

// ✅ Correct - styles will update with theme
const styles = useThemedStyles((theme) => ({
  container: { backgroundColor: theme.colors.background }
}));
```

### TypeScript Errors

Ensure you're using the correct types:

```tsx
import { CustomThemeConfigFactory, Theme } from 'rnc-theme';

const myTheme: CustomThemeConfigFactory = (isDark) => ({
  // Your theme configuration
});
```

### Storage Issues

The theme preferences are automatically saved. If you're having issues, check that your app has proper storage permissions.

## Examples

For complete examples, check the `/apps/example` directory in the repository, which demonstrates:

- Multiple theme presets
- Dynamic theme switching
- Custom theme creation
- Theme preview functionality
- Dark/light mode toggle

## Running unit tests

Run `nx test rnc-theme` to execute the unit tests via [Jest](https://jestjs.io).

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details.
