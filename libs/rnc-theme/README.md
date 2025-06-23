# 🎨 RNC Theme

> A powerful and flexible theming system for React Native applications with TypeScript support.

[![npm version](https://badge.fury.io/js/rnc-theme.svg)](https://badge.fury.io/js/rnc-theme)
![npm downloads](https://img.shields.io/npm/dt/rnc-theme)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Optimized-61DAFB.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-Compatible-000020.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Platforms](https://img.shields.io/badge/platforms-android%20%7C%20ios-lightgrey.svg)



## ✨ Features

- 🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🎨 **Dynamic Theme Switching** - Seamless light/dark mode transitions
- 🔧 **Highly Customizable** - Create custom themes with your own design system
- 📱 **React Native Optimized** - Built specifically for React Native performance
- 💾 **Persistent Storage** - Automatically saves theme preferences
- 🎭 **13+ Built-in Presets** - Material, Neon, Ocean, Cyberpunk, and more
- 🔄 **Theme Registry** - Register and manage multiple theme configurations

## 🚀 Installation

```bash
npm install rnc-theme
# or
yarn add rnc-theme
```

## ⚡ Quick Start

### 1. Setup Theme Provider

```tsx
import React from 'react';
import { RNCProvider } from 'rnc-theme';
import App from './App';

export default function Root() {
  return (
    <RNCProvider>
      <App />
    </RNCProvider>
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

## 🎨 Built-in Theme Presets

Choose from 13+ professionally designed theme presets:

| Theme | Description |
|-------|-------------|
| **Default** | Clean and modern design |
| **Material** | Google Material Design inspired |
| **Neon** | Bright cyberpunk-style colors |
| **Ocean** | Blue ocean-inspired palette |
| **Sunset** | Warm orange and red tones |
| **Forest** | Natural green colors |
| **Galaxy** | Purple space-themed colors |
| **Vintage** | Classic brown and beige tones |
| **Cyberpunk** | High-contrast neon colors |
| **Pastel** | Soft and gentle colors |
| **Monochrome** | Black and white theme |
| **Autumn** | Fall-inspired warm colors |
| **Arctic** | Cool blue and white tones |

## 🔧 Custom Theme Creation

Create your own themes with full TypeScript support:

```tsx
import { CustomThemeConfigFactory } from 'rnc-theme';

const customTheme: CustomThemeConfigFactory = (isDark) => ({
  colors: {
    primary: isDark ? '#FF6B6B' : '#4ECDC4',
    secondary: isDark ? '#FFE66D' : '#45B7D1',
    background: isDark ? '#1a1a1a' : '#f8f9fa',
    surface: isDark ? '#2d2d2d' : '#ffffff',
    text: isDark ? '#ffffff' : '#333333',
    // ... more colors
  },
  components: {
    borderRadius: {
      xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 9999
    },
    padding: {
      xs: 8, sm: 12, md: 16, lg: 20, xl: 24
    },
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
  },
});

// Apply custom theme
const { updateCustomTheme } = useTheme();
updateCustomTheme(customTheme(isDark), undefined, customTheme);
```

## 📚 Core API

### Hooks

#### `useTheme()`
Access theme context and controls:

```tsx
const {
  theme,              // Current theme object
  themeMode,          // 'light' | 'dark'
  setThemeMode,       // Function to set theme mode
  isDark,             // Boolean indicating dark mode
  updateCustomTheme,  // Function to update custom theme
  resetTheme,         // Function to reset to default
} = useTheme();
```

#### `useThemedStyles(styleCreator)`
Create responsive styles that auto-update:

```tsx
const styles = useThemedStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.components.borderRadius.md,
  },
}));
```

### Theme Registry

Manage multiple theme presets:

```tsx
import { themeRegistry } from 'rnc-theme';

// Register theme presets
themeRegistry.registerPreset('myTheme', customThemeConfig);

// Apply registered theme
const themeConfig = themeRegistry.getPreset('myTheme');
updateCustomTheme(themeConfig(isDark), undefined, themeConfig);

// Get all presets
const allPresets = themeRegistry.getAllPresets();
```

## 💡 Best Practices

1. **Use TypeScript** - Leverage full type safety for better development experience
2. **Theme Factories** - Create functions that accept `isDark` parameter for dynamic themes
3. **Register Presets** - Use theme registry for organized theme management
4. **Performance** - Always use `useThemedStyles` for automatic style updates
5. **Test Both Modes** - Verify themes work in both light and dark modes

## 🔗 Documentation

For comprehensive guides, examples, and advanced usage:

**📖 [Complete Documentation](https://rnc.masum.cloud)**

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for the React Native community**

[Documentation](https://rnc.masum.cloud) • [GitHub](https://github.com/masumrpg/react-native-components) • [NPM](https://www.npmjs.com/package/rnc-theme)

</div>