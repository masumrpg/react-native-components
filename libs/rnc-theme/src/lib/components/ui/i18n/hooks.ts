import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { I18nHookReturn } from './types';
import { getI18nInstance, isI18nInitialized } from './core';
import { SUPPORTED_LANGUAGES } from './constants';

/**
 * Custom hook that wraps useTranslation from react-i18next
 * Provides translation function, language change capability, and current language info
 */
export const useI18n = (): I18nHookReturn => {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isI18nInitialized() && i18n.isInitialized) {
      setIsReady(true);
    }
  }, [i18n.isInitialized]);

  const changeLanguage = useCallback(async (lng: string) => {
    try {
      if (!isI18nInitialized()) {
        throw new Error('i18n is not initialized');
      }

      const instance = getI18nInstance();
      await instance.changeLanguage(lng);
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    }
  }, []);

  return {
    t,
    changeLanguage,
    currentLanguage: i18n.language || 'en',
    isReady,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};

/**
 * Hook to get supported languages list
 */
export const useSupportedLanguages = () => {
  return SUPPORTED_LANGUAGES;
};

/**
 * Hook to get current language info
 */
export const useCurrentLanguage = () => {
  const { currentLanguage } = useI18n();
  const supportedLanguages = useSupportedLanguages();

  const currentLanguageInfo = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  return {
    code: currentLanguage,
    info: currentLanguageInfo,
  };
};

/**
 * Hook for language detection and initialization status
 */
export const useI18nStatus = () => {
  const [isInitialized, setIsInitialized] = useState(isI18nInitialized());
  const { isReady } = useI18n();

  useEffect(() => {
    const checkInitialization = () => {
      setIsInitialized(isI18nInitialized());
    };

    // Check periodically if not initialized
    const interval = !isInitialized ? setInterval(checkInitialization, 100) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInitialized]);

  return {
    isInitialized,
    isReady,
  };
};