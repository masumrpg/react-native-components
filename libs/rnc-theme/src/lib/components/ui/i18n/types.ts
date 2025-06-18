export interface I18nOptions {
  resources?: Record<string, Record<string, any>>;
  fallbackLng?: string;
  debug?: boolean;
}

export interface SupportedLanguage {
  code: string;
  label: string;
  flag?: string;
}

export interface I18nHookReturn {
  t: (key: string, options?: any) => string;
  changeLanguage: (lng: string) => Promise<void>;
  currentLanguage: string;
  isReady: boolean;
  supportedLanguages: SupportedLanguage[];
}

export interface TranslationResource {
  [key: string]: string | TranslationResource;
}

export interface I18nContextType {
  isInitialized: boolean;
  currentLanguage: string;
  supportedLanguages: SupportedLanguage[];
  changeLanguage: (lng: string) => Promise<void>;
  t: (key: string, options?: any) => string;
  isReady: boolean;
}