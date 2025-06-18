import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Polyfills required to use Intl with Hermes engine - order matters!
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
// Use polyfill-force for better performance in React Native
import '@formatjs/intl-pluralrules/polyfill-force';
// Add locale data for supported languages
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/id';
import '@formatjs/intl-pluralrules/locale-data/es';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-numberformat/polyfill';
// Add locale data for NumberFormat
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/id';
import '@formatjs/intl-numberformat/locale-data/es';
import '@formatjs/intl-numberformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/polyfill';
// Add locale data for RelativeTimeFormat
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/id';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import { I18nOptions } from './types';
import { SUPPORTED_LANGUAGES, DEFAULT_FALLBACK_LANGUAGE, STORAGE_KEY, DETECTOR_OPTIONS } from './constants';

// Language detector for React Native
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Fallback to device language or default
      const deviceLanguage = require('react-native').NativeModules.SettingsManager?.settings?.AppleLocale ||
                            require('react-native').NativeModules.I18nManager?.localeIdentifier ||
                            DEFAULT_FALLBACK_LANGUAGE;

      const detectedLanguage = deviceLanguage.split('_')[0] || DEFAULT_FALLBACK_LANGUAGE;
      callback(detectedLanguage);
    } catch (error) {
      console.warn('Error detecting language:', error);
      callback(DEFAULT_FALLBACK_LANGUAGE);
    }
  },
  async init() {
    // Custom initialization logic can be added here
    return Promise.resolve();
  },
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lng);
    } catch (error) {
      console.warn('Error caching language:', error);
    }
  },
};

export const initI18n = async (options: I18nOptions = {}): Promise<typeof i18n> => {
  if (isI18nInitialized()) {
    return getI18nInstance();
  }

  try {
    await i18n
      .use(initReactI18next)
      .use(languageDetector)
      .init({
        lng: options.fallbackLng || DEFAULT_FALLBACK_LANGUAGE,
        fallbackLng: DEFAULT_FALLBACK_LANGUAGE,
        debug: options.debug || false,
        compatibilityJSON: 'v3',

        interpolation: {
          escapeValue: false,
        },

        resources: options.resources || {},

        react: {
          useSuspense: false,
        },
      });

    return i18n;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    throw error;
  }
};

/**
 * Get the current i18n instance
 * @returns The i18n instance
 * @throws Error if i18n is not initialized
 */
export const getI18nInstance = (): typeof i18n => {
  if (!i18n.isInitialized) {
    throw new Error('i18n is not initialized. Call initI18n() first.');
  }
  return i18n;
};

/**
 * Check if i18n is initialized
 * @returns True if i18n is initialized, false otherwise
 */
export const isI18nInitialized = (): boolean => {
  return i18n.isInitialized;
};