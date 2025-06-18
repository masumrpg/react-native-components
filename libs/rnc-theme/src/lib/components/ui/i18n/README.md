# @myorg/i18n - React Native Internationalization Library

A modular, reusable, and scalable internationalization (i18n) library for React Native applications, compatible with Expo. This library provides comprehensive multi-language support with JSON structure and advanced features.

## 🎯 Features

- **Dynamic Initialization**: Idempotent initialization with configurable resources and fallback language
- **Translation File Support**: JSON-based translation structure with interpolation support
- **Reusable Hooks**: Custom hooks wrapping react-i18next functionality
- **Language Detection**: Automatic detection using device settings and AsyncStorage caching
- **Language Switcher**: Built-in support for language switching with supported languages list
- **Scalable & Compatible**: Works with React Native CLI and Expo projects
- **TypeScript Support**: Full TypeScript support with type definitions
- **Advanced Features**: Date/time formatting, currency formatting, pluralization, and relative time

## 📦 Installation

```bash
npm install @react-native-components/theme
# or
yarn add @react-native-components/theme
```

### Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install i18next react-i18next @react-native-async-storage/async-storage
# or
yarn add i18next react-i18next @react-native-async-storage/async-storage
```

## 🚀 Quick Start

### 1. Initialize i18n

```typescript
import { initI18n } from '@react-native-components/theme/src/lib/components/ui/i18n';

const resources = {
  en: {
    translation: {
      greeting: 'Hello, {{name}}!',
      welcome: 'Welcome to our app',
      select_date: 'Select date'
    }
  },
  id: {
    translation: {
      greeting: 'Halo, {{name}}!',
      welcome: 'Selamat datang di aplikasi kami',
      select_date: 'Pilih tanggal'
    }
  }
};

// Initialize once in your app
await initI18n({
  resources,
  fallbackLng: 'en',
  debug: __DEV__
});
```

### 2. Use the Hook

```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useI18n } from '@react-native-components/theme/src/lib/components/ui/i18n';

const MyComponent = () => {
  const { t, changeLanguage, currentLanguage } = useI18n();

  return (
    <View>
      <Text>{t('greeting', { name: 'Developer' })}</Text>
      <Text>{t('welcome')}</Text>
      
      <TouchableOpacity onPress={() => changeLanguage('id')}>
        <Text>Switch to Indonesian</Text>
      </TouchableOpacity>
      
      <Text>Current: {currentLanguage}</Text>
    </View>
  );
};
```

## 📚 API Reference

### Core Functions

#### `initI18n(options: I18nOptions)`

Initializes the i18n system with the provided configuration.

```typescript
interface I18nOptions {
  resources: Record<string, Record<string, any>>;
  fallbackLng?: string;
  debug?: boolean;
}
```

### Hooks

#### `useI18n()`

Main hook for translation functionality.

```typescript
interface I18nHookReturn {
  t: (key: string, options?: any) => string;
  changeLanguage: (lng: string) => Promise<void>;
  currentLanguage: string;
  isReady: boolean;
}
```

#### `useSupportedLanguages()`

Returns the list of supported languages.

```typescript
const supportedLanguages = useSupportedLanguages();
// Returns: SupportedLanguage[]
```

#### `useCurrentLanguage()`

Returns current language information.

```typescript
const { code, info } = useCurrentLanguage();
// code: string, info: SupportedLanguage | undefined
```

#### `useI18nStatus()`

Returns initialization and ready status.

```typescript
const { isInitialized, isReady } = useI18nStatus();
```

### Utility Functions

#### Date and Time Formatting

```typescript
import { formatDate, formatTime, formatRelativeTime } from '@react-native-components/theme/src/lib/components/ui/i18n';

// Format date according to current locale
const formattedDate = formatDate(new Date());
// "December 25, 2023" (en) or "25 Desember 2023" (id)

// Format time
const formattedTime = formatTime(new Date());
// "2:30 PM" (en) or "14:30" (24-hour locales)

// Relative time
const relativeTime = formatRelativeTime(new Date(Date.now() - 2 * 60 * 60 * 1000));
// "2 hours ago"
```

#### Number and Currency Formatting

```typescript
import { formatNumber, formatCurrency } from '@react-native-components/theme/src/lib/components/ui/i18n';

// Format numbers
const formattedNumber = formatNumber(1234.56);
// "1,234.56" (en) or "1.234,56" (de)

// Format currency
const formattedCurrency = formatCurrency(1234.56, 'USD');
// "$1,234.56" (en) or "1.234,56 $" (de)
```

#### Pluralization

```typescript
import { pluralize } from '@react-native-components/theme/src/lib/components/ui/i18n';

const itemText = pluralize(5, 'item', 'items');
// "items" (count > 1)

const messageText = pluralize(1, 'message', 'messages');
// "message" (count === 1)
```

### Constants

#### `SUPPORTED_LANGUAGES`

Predefined list of supported languages with flags and labels.

```typescript
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  // ... more languages
];
```

## 🌍 Language Support

The library comes with predefined support for:

- 🇺🇸 English (en)
- 🇮🇩 Bahasa Indonesia (id)
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)
- 🇨🇳 中文 (zh)

## 🔧 Advanced Usage

### Custom Language Detection

The library automatically detects the device language and caches the user's language preference using AsyncStorage.

### Dynamic Translation Loading

You can dynamically add translations after initialization:

```typescript
import { getI18nInstance } from '@react-native-components/theme/src/lib/components/ui/i18n';

const i18n = getI18nInstance();
i18n.addResourceBundle('pt', 'translation', {
  greeting: 'Olá, {{name}}!',
  welcome: 'Bem-vindo ao nosso aplicativo'
});
```

### Context and Gender Support

The library supports i18next's context and gender features:

```typescript
// In your translation files
{
  "friend": "A friend",
  "friend_male": "A boyfriend",
  "friend_female": "A girlfriend"
}

// In your component
const friendText = t('friend', { context: 'male' });
// Returns: "A boyfriend"
```

## 🎨 Example Implementation

Check out the complete example in `/apps/example/app/i18n/index.tsx` which demonstrates:

- Language switcher with flag icons
- Date and time formatting examples
- Currency formatting
- Relative time display
- Pluralization examples
- Real-time language switching

## 🔒 Best Practices

1. **Initialize Early**: Call `initI18n()` as early as possible in your app lifecycle
2. **Error Handling**: Always wrap `initI18n()` and `changeLanguage()` in try-catch blocks
3. **Fallback Language**: Always provide a fallback language (preferably English)
4. **Key Organization**: Use nested keys for better organization:
   ```json
   {
     "auth": {
       "login": "Login",
       "logout": "Logout"
     },
     "navigation": {
       "home": "Home",
       "profile": "Profile"
     }
   }
   ```
5. **Performance**: Use the `isReady` flag to prevent rendering before i18n is ready

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.