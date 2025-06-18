/**
 * Example usage of the i18n library
 * This file contains practical examples for common use cases
 */

import { initI18n, useI18n, formatDate, formatCurrency, pluralize } from './index';

// Example 1: Basic initialization
export const basicInitialization = async () => {
  const resources = {
    en: {
      translation: {
        greeting: 'Hello, {{name}}!',
        welcome: 'Welcome to our app',
        itemCount: 'You have {{count}} item',
        itemCount_plural: 'You have {{count}} items',
      }
    },
    id: {
      translation: {
        greeting: 'Halo, {{name}}!',
        welcome: 'Selamat datang di aplikasi kami',
        itemCount: 'Anda memiliki {{count}} item',
        itemCount_plural: 'Anda memiliki {{count}} item',
      }
    }
  };

  try {
    await initI18n({
      resources,
      fallbackLng: 'en',
      debug: __DEV__
    });
    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
};

// Example 2: React component with i18n
export const ExampleComponent = () => {
  const { t, changeLanguage, currentLanguage, isReady } = useI18n();

  if (!isReady) {
    return null; // or loading component
  }

  const handleLanguageChange = async (lang: string) => {
    try {
      await changeLanguage(lang);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return {
    greeting: t('greeting', { name: 'John' }),
    welcome: t('welcome'),
    currentLang: currentLanguage,
    changeLanguage: handleLanguageChange
  };
};

// Example 3: Date formatting
export const dateFormattingExamples = () => {
  const now = new Date();

  return {
    // Basic date formatting
    basicDate: formatDate(now),

    // Custom date formatting
    customDate: formatDate(now, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),

    // Short date format
    shortDate: formatDate(now, {
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    })
  };
};

// Example 4: Currency formatting
export const currencyFormattingExamples = () => {
  const amount = 1234.56;

  return {
    usd: formatCurrency(amount, 'USD'),
    eur: formatCurrency(amount, 'EUR'),
    idr: formatCurrency(amount, 'IDR'),
    jpy: formatCurrency(amount, 'JPY')
  };
};

// Example 5: Pluralization
export const pluralizationExamples = () => {
  return {
    oneItem: pluralize(1, 'item', 'items'),
    multipleItems: pluralize(5, 'item', 'items'),
    noItems: pluralize(0, 'item', 'items'),
    oneMessage: pluralize(1, 'message', 'messages'),
    multipleMessages: pluralize(10, 'message', 'messages')
  };
};

// Example 6: Advanced translation with context
export const advancedTranslationExamples = () => {
  // This would require additional setup in your translation files
  const resources = {
    en: {
      translation: {
        // Context-based translations
        'button': 'Button',
        'button_primary': 'Primary Button',
        'button_secondary': 'Secondary Button',

        // Nested translations
        'navigation': {
          'home': 'Home',
          'profile': 'Profile',
          'settings': 'Settings'
        },

        // Complex interpolation
        'userInfo': 'User {{name}} has {{count}} {{item}} in {{location}}',

        // Conditional translations
        'status_online': 'Online',
        'status_offline': 'Offline',
        'status_away': 'Away'
      }
    }
  };

  return resources;
};

// Example 7: Error handling patterns
export const errorHandlingExamples = {
  // Safe translation with fallback - custom hook that returns a safe translate function
  useSafeTranslate: () => {
    const { t } = useI18n();
    return (key: string, fallback: string = key) => {
      try {
        const translation = t(key);
        return translation === key ? fallback : translation;
      } catch (error) {
        console.warn(`Translation failed for key: ${key}`, error);
        return fallback;
      }
    };
  },

  // Async language change with error handling - custom hook that returns a safe language change function
  useSafeLanguageChange: () => {
    const { changeLanguage } = useI18n();
    return async (language: string) => {
      try {
        await changeLanguage(language);
        return { success: true, language };
      } catch (error) {
        console.error('Language change failed:', error as Error);
        return { success: false, error: (error as Error).message };
      }
    };
  }
};

// Example 8: Performance optimization patterns
export const performanceOptimizationExamples = {
  // Memoized translations
  useMemoizedTranslations: () => {
    const { t } = useI18n();

    // In a real React component, you would use React.useMemo
    const memoizedTranslations = {
      commonButtons: {
        save: t('common.save'),
        cancel: t('common.cancel'),
        delete: t('common.delete')
      },
      navigation: {
        home: t('navigation.home'),
        profile: t('navigation.profile'),
        settings: t('navigation.settings')
      }
    };

    return memoizedTranslations;
  },

  // Lazy loading translations
  lazyLoadTranslations: async (namespace: string) => {
    try {
      // This would typically load from an API or dynamic import
      const translations = await import(`./translations/${namespace}.json`);
      return translations.default;
    } catch (error) {
      console.error(`Failed to load translations for ${namespace}:`, error);
      return {};
    }
  }
};

// Example 9: Testing utilities
export const testingUtilities = {
  // Mock i18n for testing
  createMockI18n: (translations: Record<string, string> = {}) => {
    return {
      t: (key: string, options?: Record<string, unknown>) => {
        let translation = translations[key] || key;

        // Simple interpolation for testing
        if (options) {
          Object.keys(options).forEach(optionKey => {
            translation = translation.replace(
              new RegExp(`{{${optionKey}}}`, 'g'),
              String(options[optionKey])
            );
          });
        }

        return translation;
      },
      changeLanguage: () => Promise.resolve(),
      currentLanguage: 'en',
      isReady: true
    };
  },

  // Test data
  testTranslations: {
    'greeting': 'Hello, {{name}}!',
    'welcome': 'Welcome',
    'button.save': 'Save',
    'button.cancel': 'Cancel'
  }
};