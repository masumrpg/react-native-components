# 🎨 RNC Theme

> A powerful and flexible theming system for React Native applications with TypeScript support.

[![npm version](https://badge.fury.io/js/rnc-theme.svg)](https://badge.fury.io/js/rnc-theme)
![npm downloads](https://img.shields.io/npm/dt/rnc-theme)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Optimized-61DAFB.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-Compatible-000020.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Platforms](https://img.shields.io/badge/platforms-android%20%7C%20ios-lightgrey.svg)

## 📦 Peer Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| ⚛️ [`react`](https://www.npmjs.com/package/react) | `>=19.0.0` | React library |
| 📱 [`react-native`](https://www.npmjs.com/package/react-native) | `>=0.79.3` | React Native framework |
| 🎭 [`react-native-reanimated`](https://www.npmjs.com/package/react-native-reanimated) | `>=3` | Advanced animations |
| 👆 [`react-native-gesture-handler`](https://www.npmjs.com/package/react-native-gesture-handler) | `>=2` | Gesture interactions |
| 💾 [`@react-native-async-storage/async-storage`](https://www.npmjs.com/package/@react-native-async-storage/async-storage) | `>=2` | Local storage |
| 🎨 [`lucide-react-native`](https://www.npmjs.com/package/lucide-react-native) | `>=0.513.0` | Icon library |
| 📅 [`react-native-calendars`](https://www.npmjs.com/package/react-native-calendars) | `>=1.1286.0` | Calendar components |
| 🧭 [`@react-navigation/native`](https://www.npmjs.com/package/@react-navigation/native) | `>=6` | Navigation |
| 🛡️ [`react-native-safe-area-context`](https://www.npmjs.com/package/react-native-safe-area-context) | `>=4` | Safe area handling |
| 🌍 [`expo-localization`](https://www.npmjs.com/package/expo-localization) | `>=16.1.5` | Locale detection |
| 🗣️ [`i18n-js`](https://www.npmjs.com/package/i18n-js) | `>=4.5.1` | Internationalization |

## ✨ Features

- 🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🎨 **Dynamic Theme Switching** - Seamless light/dark mode transitions
- 📱 **React Native Optimized** - Built specifically for React Native performance
- 💾 **Persistent Storage** - Automatically saves theme preferences
- 🎭 **8+ Built-in Presets** - Material, Neon, Ocean, Cyberpunk, and more
- 🔄 **Theme Registry** - Register and manage multiple theme configurations

## 🚀 Installation

```bash
npm install rnc-theme
# or
yarn add rnc-theme
# or
pnpm add rnc-theme
# or
bun add rnc-theme
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
import { View, Text, StyleSheet } from 'react-native';
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

const createStyles = (theme) => StyleSheet.create({
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

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for the React Native community**

[Documentation](https://rnc.masum.cloud) • [GitHub](https://github.com/masumrpg/react-native-components) • [NPM](https://www.npmjs.com/package/rnc-theme)

</div>