import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { I18nContextType, I18nOptions } from './types';
import { initI18n, getI18nInstance, isI18nInitialized } from './core';
import { useI18n } from './hooks';
import { SUPPORTED_LANGUAGES } from './constants';

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  options: I18nOptions;
  fallbackComponent?: ReactNode;
  loadingComponent?: ReactNode;
}

/**
 * I18n Provider Component
 * Provides i18n context to the entire application
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  options,
  fallbackComponent = null,
  loadingComponent = null,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        setInitError(null);

        if (!isI18nInitialized()) {
          await initI18n(options);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setInitError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [options]);

  // Show loading component while initializing
  if (isLoading) {
    return loadingComponent || null;
  }

  // Show fallback component if initialization failed
  if (initError || !isInitialized) {
    console.error('I18n initialization failed:', initError);
    return fallbackComponent || null;
  }

  return (
    <I18nContext.Provider value={{
      isInitialized,
      currentLanguage: getI18nInstance().language || 'en',
      supportedLanguages: SUPPORTED_LANGUAGES,
      changeLanguage: async (lng: string) => {
        try {
          await getI18nInstance().changeLanguage(lng);
        } catch (error) {
          console.error('Failed to change language:', error);
          throw error;
        }
      },
      t: (key: string, options?: Record<string, unknown>) => {
        try {
          return getI18nInstance().t(key, options);
        } catch (error) {
          console.warn('Translation failed for key:', key, error);
          return key;
        }
      },
      isReady: true,
    }}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * Hook to use I18n Context
 * Alternative to useI18n hook that uses React Context
 */
export const useI18nContext = (): I18nContextType => {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }

  return context;
};

/**
 * Higher-Order Component for I18n
 * Wraps a component with I18n context
 */
export const withI18n = <P extends object>(
  Component: React.ComponentType<P>,
  options: I18nOptions,
  fallbackComponent?: ReactNode,
  loadingComponent?: ReactNode
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <I18nProvider
      options={options}
      fallbackComponent={fallbackComponent}
      loadingComponent={loadingComponent}
    >
      <Component {...props} />
    </I18nProvider>
  );

  WrappedComponent.displayName = `withI18n(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

/**
 * Hook for conditional rendering based on i18n status
 */
export const useI18nReady = () => {
  const [isReady, setIsReady] = useState(false);
  const { isReady: hookReady } = useI18n();

  useEffect(() => {
    setIsReady(hookReady && isI18nInitialized());
  }, [hookReady]);

  return isReady;
};

/**
 * Component that renders children only when i18n is ready
 */
interface I18nReadyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const I18nReady: React.FC<I18nReadyProps> = ({ children, fallback = null }) => {
  const isReady = useI18nReady();

  return isReady ? children : fallback;
};

/**
 * Hook for language-specific conditional rendering
 */
export const useLanguageConditional = () => {
  const { currentLanguage } = useI18n();

  return {
    currentLanguage,
    isLanguage: (lang: string) => currentLanguage === lang,
    isOneOfLanguages: (langs: string[]) => langs.includes(currentLanguage),
    renderForLanguage: (lang: string, component: ReactNode) =>
      currentLanguage === lang ? component : null,
    renderForLanguages: (langs: string[], component: ReactNode) =>
      langs.includes(currentLanguage) ? component : null,
  };
};

/**
 * Component for language-specific rendering
 */
interface LanguageConditionalProps {
  language?: string;
  languages?: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export const LanguageConditional: React.FC<LanguageConditionalProps> = ({
  language,
  languages,
  children,
  fallback = null,
}) => {
  const { currentLanguage } = useI18n();

  const shouldRender = language
    ? currentLanguage === language
    : languages
    ? languages.includes(currentLanguage)
    : false;

  return shouldRender ? <>{children}</> : <>{fallback}</>;
};

/**
 * Debug component for i18n development
 */
interface I18nDebugProps {
  showCurrentLanguage?: boolean;
  showSupportedLanguages?: boolean;
  showTranslationKeys?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const I18nDebug: React.FC<I18nDebugProps> = ({
  showCurrentLanguage = true,
  showSupportedLanguages = false,
  showTranslationKeys = false,
  position = 'top-right',
}) => {
  const { currentLanguage, supportedLanguages, isReady } = useI18n();

  if (!__DEV__ || !isReady) {
    return null;
  }

  const debugInfo = {
    currentLanguage: showCurrentLanguage ? currentLanguage : undefined,
    supportedLanguages: showSupportedLanguages ? supportedLanguages.map((l: { code: string }) => l.code) : undefined,
    isReady,
    timestamp: new Date().toISOString(),
  };

  const positionStyles = {
    'top-left': { top: 50, left: 10 },
    'top-right': { top: 50, right: 10 },
    'bottom-left': { bottom: 50, left: 10 },
    'bottom-right': { bottom: 50, right: 10 },
  };

  return (
    <View
      style={{
        position: 'absolute',
        ...positionStyles[position],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 8,
        borderRadius: 4,
        zIndex: 9999,
        maxWidth: 200,
      }}
    >
      <Text style={{
        color: 'white',
        fontSize: 12,
        fontFamily: 'monospace',
      }}>
        {JSON.stringify(debugInfo, null, 2)}
      </Text>
    </View>
  );
};