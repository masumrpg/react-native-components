import { SupportedLanguage } from './types';

export const DEFAULT_FALLBACK_LANGUAGE = 'en';
export const STORAGE_KEY = '@myorg/i18n/language';
export const DEFAULT_NAMESPACE = 'translation';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'id',
    label: 'Bahasa Indonesia',
    flag: '🇮🇩',
  },
  {
    code: 'es',
    label: 'Español',
    flag: '🇪🇸',
  },
  {
    code: 'fr',
    label: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'de',
    label: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    code: 'ja',
    label: '日本語',
    flag: '🇯🇵',
  },
  {
    code: 'ko',
    label: '한국어',
    flag: '🇰🇷',
  },
  {
    code: 'zh',
    label: '中文',
    flag: '🇨🇳',
  },
];

export const DETECTOR_OPTIONS = {
  order: ['asyncStorage', 'languageDetector'],
  caches: ['asyncStorage'],
  asyncStorage: null, // Will be set during initialization
};