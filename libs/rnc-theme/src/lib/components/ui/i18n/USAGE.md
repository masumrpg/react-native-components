# I18n Library Usage Guide

This guide provides comprehensive examples and best practices for using the i18n library in your React Native application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Basic Usage](#basic-usage)
3. [Advanced Features](#advanced-features)
4. [React Context Integration](#react-context-integration)
5. [Utility Functions](#utility-functions)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Quick Start

### 1. Initialize i18n in your app

```typescript
import { initI18n } from '@myorg/rnc-theme';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      greeting: 'Hello, {{name}}!',
      itemCount: 'You have {{count}} item',
      itemCount_plural: 'You have {{count}} items',
    },
  },
  id: {
    translation: {
      welcome: 'Selamat datang',
      greeting: 'Halo, {{name}}!',
      itemCount: 'Anda memiliki {{count}} item',
    },
  },
};

// Initialize in your App.tsx or main entry point
const initializeI18n = async () => {
  try {
    await initI18n({
      resources,
      fallbackLng: 'en',
      debug: __DEV__,
    });
    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
};

initializeI18n();
```

### 2. Use in React Components

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useI18n } from '@myorg/rnc-theme';

const MyComponent = () => {
  const { t, changeLanguage, currentLanguage } = useI18n();

  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('greeting', { name: 'John' })}</Text>
      <Text>Current language: {currentLanguage}</Text>

      <Button
        title="Switch to Indonesian"
        onPress={() => changeLanguage('id')}
      />
      <Button
        title="Switch to English"
        onPress={() => changeLanguage('en')}
      />
    </View>
  );
};
```

## Basic Usage

### Translation with Parameters

```typescript
// In your translation resources
const resources = {
  en: {
    translation: {
      userProfile: 'Welcome back, {{username}}! You have {{messageCount}} new messages.',
      lastLogin: 'Last login: {{date, datetime}}',
      price: 'Price: {{amount, currency}}',
    },
  },
};

// In your component
const ProfileScreen = () => {
  const { t } = useI18n();
  const user = { username: 'John', messageCount: 5 };
  const lastLoginDate = new Date();
  const price = 29.99;

  return (
    <View>
      <Text>{t('userProfile', user)}</Text>
      <Text>{t('lastLogin', { date: lastLoginDate })}</Text>
      <Text>{t('price', { amount: price })}</Text>
    </View>
  );
};
```

### Pluralization

```typescript
// Translation resources with plural forms
const resources = {
  en: {
    translation: {
      notification: 'You have {{count}} notification',
      notification_plural: 'You have {{count}} notifications',
      item: '{{count}} item selected',
      item_plural: '{{count}} items selected',
    },
  },
};

// Usage in component
const NotificationBadge = ({ count }: { count: number }) => {
  const { t } = useI18n();

  return (
    <Text>{t('notification', { count })}</Text>
  );
};
```

### Namespaces (Optional)

```typescript
// Organize translations by namespace
const resources = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      forgotPassword: 'Forgot Password?',
    },
    profile: {
      editProfile: 'Edit Profile',
      changePassword: 'Change Password',
    },
  },
};

// Usage with namespace
const AuthScreen = () => {
  const { t } = useI18n();

  return (
    <View>
      <Button title={t('auth:login')} onPress={handleLogin} />
      <Button title={t('common:cancel')} onPress={handleCancel} />
    </View>
  );
};
```

## Advanced Features

### Conditional Rendering Based on Language

```typescript
import { useCurrentLanguage, LanguageConditional } from '@myorg/rnc-theme';

const LanguageSpecificContent = () => {
  const currentLanguage = useCurrentLanguage();

  return (
    <View>
      {/* Method 1: Using hook */}
      {currentLanguage === 'id' && (
        <Text>Konten khusus untuk Bahasa Indonesia</Text>
      )}

      {/* Method 2: Using component */}
      <LanguageConditional language="en">
        <Text>English-specific content</Text>
      </LanguageConditional>

      <LanguageConditional languages={['id', 'ms']}>
        <Text>Content for Indonesian and Malay</Text>
      </LanguageConditional>
    </View>
  );
};
```

### Loading States

```typescript
import { useI18nStatus, I18nReady } from '@myorg/rnc-theme';

const App = () => {
  const { isReady, isLoading, error } = useI18nStatus();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <I18nReady fallback={<LoadingSpinner />}>
      <MainApp />
    </I18nReady>
  );
};
```

### Dynamic Language Loading

```typescript
import { getI18nInstance } from '@myorg/rnc-theme';

const loadLanguageResources = async (language: string) => {
  try {
    // Load resources from API or local files
    const resources = await fetch(`/api/translations/${language}`);
    const translations = await resources.json();

    const i18n = getI18nInstance();
    i18n.addResourceBundle(language, 'translation', translations);

    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Failed to load language resources:', error);
  }
};

const LanguageSwitcher = () => {
  const { changeLanguage } = useI18n();
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (language: string) => {
    setLoading(true);
    try {
      await loadLanguageResources(language);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <Button
          key={lang.code}
          title={`${lang.flag} ${lang.label}`}
          onPress={() => handleLanguageChange(lang.code)}
          disabled={loading}
        />
      ))}
    </View>
  );
};
```

## React Context Integration

### Using I18nProvider

```typescript
import { I18nProvider } from '@myorg/rnc-theme';

const App = () => {
  return (
    <I18nProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </I18nProvider>
  );
};

// In any child component
const ChildComponent = () => {
  const { t, changeLanguage, currentLanguage, isReady } = useI18nContext();

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>Language: {currentLanguage}</Text>
    </View>
  );
};
```

### Debug Mode

```typescript
import { I18nDebug } from '@myorg/rnc-theme';

const DebugScreen = () => {
  return (
    <ScrollView>
      <I18nDebug />
      {/* Your other content */}
    </ScrollView>
  );
};
```

## Utility Functions

### Date and Time Formatting

```typescript
import {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
} from '@myorg/rnc-theme';

const DateTimeExample = () => {
  const now = new Date();
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago

  return (
    <View>
      <Text>Date: {formatDate(now)}</Text>
      <Text>Time: {formatTime(now)}</Text>
      <Text>DateTime: {formatDateTime(now)}</Text>
      <Text>Relative: {formatRelativeTime(pastDate)}</Text>
    </View>
  );
};
```

### Number and Currency Formatting

```typescript
import { formatNumber, formatCurrency } from '@myorg/rnc-theme';

const PriceDisplay = ({ price, currency = 'USD' }) => {
  return (
    <View>
      <Text>Price: {formatCurrency(price, currency)}</Text>
      <Text>Quantity: {formatNumber(1234567)}</Text>
    </View>
  );
};
```

### Language Information

```typescript
import {
  getLanguageInfo,
  isLanguageSupported,
  getSupportedLanguages,
  getDeviceLocale,
} from '@myorg/rnc-theme';

const LanguageInfo = () => {
  const deviceLocale = getDeviceLocale();
  const supportedLanguages = getSupportedLanguages();
  const currentLangInfo = getLanguageInfo('en');

  return (
    <View>
      <Text>Device Locale: {deviceLocale}</Text>
      <Text>Supported Languages: {supportedLanguages.length}</Text>
      {currentLangInfo && (
        <Text>
          Current: {currentLangInfo.flag} {currentLangInfo.label}
        </Text>
      )}
    </View>
  );
};
```

## Best Practices

### 1. Resource Organization

```typescript
// ✅ Good: Organized by feature/screen
const resources = {
  en: {
    translation: {
      // Common/shared translations
      common: {
        save: 'Save',
        cancel: 'Cancel',
        loading: 'Loading...',
      },
      // Screen-specific translations
      auth: {
        login: 'Login',
        register: 'Register',
        forgotPassword: 'Forgot Password?',
      },
      profile: {
        editProfile: 'Edit Profile',
        changePassword: 'Change Password',
      },
    },
  },
};

// ❌ Avoid: Flat structure for large apps
const badResources = {
  en: {
    translation: {
      loginButton: 'Login',
      registerButton: 'Register',
      profileEditButton: 'Edit Profile',
      // ... hundreds of keys
    },
  },
};
```

### 2. Key Naming Conventions

```typescript
// ✅ Good: Descriptive and consistent
const goodKeys = {
  'auth.login.button': 'Login',
  'auth.login.title': 'Welcome Back',
  'auth.login.subtitle': 'Please sign in to continue',
  'profile.settings.title': 'Settings',
  'profile.settings.language': 'Language',
};

// ❌ Avoid: Unclear or inconsistent
const badKeys = {
  btn1: 'Login',
  title: 'Welcome Back', // Too generic
  loginSubtitle: 'Please sign in', // Inconsistent naming
};
```

### 3. Performance Optimization

```typescript
// ✅ Good: Memoize expensive operations
const OptimizedComponent = React.memo(() => {
  const { t } = useI18n();

  const expensiveTranslation = useMemo(() => {
    return t('complex.key.with.interpolation', {
      data: complexData,
    });
  }, [t, complexData]);

  return <Text>{expensiveTranslation}</Text>;
});

// ✅ Good: Use callbacks for language changes
const LanguageSwitcher = () => {
  const { changeLanguage } = useI18n();

  const handleLanguageChange = useCallback((language: string) => {
    changeLanguage(language);
  }, [changeLanguage]);

  return (
    <Button
      title="Switch Language"
      onPress={() => handleLanguageChange('id')}
    />
  );
};
```

### 4. Error Handling

```typescript
// ✅ Good: Graceful error handling
const SafeTranslation = ({ translationKey, fallback, ...props }) => {
  const { t } = useI18n();

  try {
    const translation = t(translationKey, props);
    // Check if translation is missing (i18next returns the key if missing)
    if (translation === translationKey && fallback) {
      return <Text>{fallback}</Text>;
    }
    return <Text>{translation}</Text>;
  } catch (error) {
    console.warn('Translation error:', error);
    return <Text>{fallback || translationKey}</Text>;
  }
};
```

### 5. Testing

```typescript
// Mock for testing
jest.mock('@myorg/rnc-theme', () => ({
  useI18n: () => ({
    t: (key: string, params?: any) => {
      if (params) {
        return `${key}_with_params`;
      }
      return key;
    },
    changeLanguage: jest.fn(),
    currentLanguage: 'en',
  }),
}));

// Test component
test('renders translated text', () => {
  render(<MyComponent />);
  expect(screen.getByText('welcome')).toBeInTheDocument();
});
```

## Troubleshooting

### Common Issues

1. **Translation not updating after language change**
   ```typescript
   // Make sure you're using the hook correctly
   const { t } = useI18n(); // ✅ Correct
   const t = useTranslation().t; // ❌ May not update
   ```

2. **Missing translations showing as keys**
   ```typescript
   // Check if the key exists in your resources
   const { t } = useI18n();
   console.log(t('missing.key')); // Will log 'missing.key' if not found
   ```

3. **AsyncStorage errors**
   ```typescript
   // Make sure AsyncStorage is properly installed
   import AsyncStorage from '@react-native-async-storage/async-storage';
   ```

4. **Language not persisting**
   ```typescript
   // Check if AsyncStorage permissions are granted
   // and the storage key is not conflicting
   ```

### Debug Mode

Enable debug mode to see detailed logs:

```typescript
await initI18n({
  resources,
  fallbackLng: 'en',
  debug: true, // Enable debug logs
});
```

### Performance Monitoring

```typescript
import { getI18nInstance } from '@myorg/rnc-theme';

// Monitor translation performance
const monitorTranslations = () => {
  const i18n = getI18nInstance();

  i18n.on('languageChanged', (lng) => {
    console.log('Language changed to:', lng);
  });

  i18n.on('loaded', (loaded) => {
    console.log('Resources loaded:', loaded);
  });

  i18n.on('failedLoading', (lng, ns, msg) => {
    console.error('Failed loading:', lng, ns, msg);
  });
};
```

This guide covers the most common use cases and patterns for the i18n library. For more advanced usage or specific requirements, refer to the [i18next documentation](https://www.i18next.com/) and the library's API reference.