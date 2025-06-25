import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

export interface I18nConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations?: Record<string, any>;
  supportedLocales?: string[];
  defaultLocale?: string;
  autoDetectLocale?: boolean;
}

const defaultTransaltions = {
  translations: {
    en: {
      selectMonthYear: 'Select month and year',
    },
    id: {
      selectMonthYear: 'Pilih bulan dan tahun',
    },
  },
  supportedLocales: ['en', 'id'],
  defaultLocale: 'en',
  autoDetectLocale: true,
};

export const createI18nInstance = (config?: I18nConfig) => {
  const {
    translations = defaultTransaltions.translations,
    supportedLocales = defaultTransaltions.supportedLocales,
    defaultLocale = defaultTransaltions.defaultLocale,
    autoDetectLocale = defaultTransaltions.defaultLocale,
  } = config ?? {};

  const i18n = new I18n(translations);

  if (autoDetectLocale) {
    const fullTag = getLocales()[0]?.languageTag ?? 'en-US';
    const languageCode = fullTag.split('-')[0];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const locale = languageCode ?? defaultLocale;
    i18n.locale = supportedLocales.includes(locale) ? locale : defaultLocale;
  } else {
    i18n.locale = defaultLocale;
  }

  return i18n;
};

// Default instance for backward compatibility
const i18n = createI18nInstance();

export default i18n;
