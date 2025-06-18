import { getI18nInstance } from './core';
import { SupportedLanguage } from './types';
import { SUPPORTED_LANGUAGES } from './constants';

/**
 * Format date according to current locale
 */
export const formatDate = (
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string => {
  try {
    const i18n = getI18nInstance();
    const currentLocale = locale || i18n.language || 'en';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const formatOptions = { ...defaultOptions, ...options };

    return new Intl.DateTimeFormat(currentLocale, formatOptions).format(new Date(date));
  } catch (error) {
    console.warn('Error formatting date:', error);
    return new Date(date).toLocaleDateString();
  }
};

/**
 * Format time according to current locale
 */
export const formatTime = (
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string => {
  try {
    const i18n = getI18nInstance();
    const currentLocale = locale || i18n.language || 'en';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };

    const formatOptions = { ...defaultOptions, ...options };

    return new Intl.DateTimeFormat(currentLocale, formatOptions).format(new Date(date));
  } catch (error) {
    console.warn('Error formatting time:', error);
    return new Date(date).toLocaleTimeString();
  }
};

/**
 * Format number according to current locale
 */
export const formatNumber = (
  number: number,
  options?: Intl.NumberFormatOptions,
  locale?: string
): string => {
  try {
    const i18n = getI18nInstance();
    const currentLocale = locale || i18n.language || 'en';

    return new Intl.NumberFormat(currentLocale, options).format(number);
  } catch (error) {
    console.warn('Error formatting number:', error);
    return number.toString();
  }
};

/**
 * Format currency according to current locale
 */
export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale?: string
): string => {
  try {
    const i18n = getI18nInstance();
    const currentLocale = locale || i18n.language || 'en';

    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.warn('Error formatting currency:', error);
    return `${currency} ${amount}`;
  }
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale?: string
): string => {
  try {
    const i18n = getI18nInstance();
    const currentLocale = locale || i18n.language || 'en';

    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(currentLocale, { numeric: 'auto' });

    const intervals = [
      { unit: 'year' as const, seconds: 31536000 },
      { unit: 'month' as const, seconds: 2592000 },
      { unit: 'day' as const, seconds: 86400 },
      { unit: 'hour' as const, seconds: 3600 },
      { unit: 'minute' as const, seconds: 60 },
      { unit: 'second' as const, seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
      if (count >= 1) {
        return rtf.format(diffInSeconds < 0 ? -count : count, interval.unit);
      }
    }

    return rtf.format(0, 'second');
  } catch (error) {
    console.warn('Error formatting relative time:', error);
    return new Date(date).toLocaleDateString();
  }
};

/**
 * Get language info by code
 */
export const getLanguageInfo = (code: string): SupportedLanguage | undefined => {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
};

/**
 * Check if language is supported
 */
export const isLanguageSupported = (code: string): boolean => {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
};

/**
 * Get browser/device timezone
 */
export const getDeviceTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn('Error getting device timezone:', error);
    return 'UTC';
  }
};

/**
 * Get device locale
 */
export const getDeviceLocale = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale;
  } catch (error) {
    console.warn('Error getting device locale:', error);
    return 'en';
  }
};

/**
 * Pluralization helper
 */
export const pluralize = (
  count: number,
  singular: string,
  plural?: string,
  locale?: string
): string => {
  try {
    const i18n = getI18nInstance();
    const currentLocale = locale || i18n.language || 'en';

    const pr = new Intl.PluralRules(currentLocale);
    const rule = pr.select(count);

    if (rule === 'one') {
      return singular;
    }

    return plural || `${singular}s`;
  } catch (error) {
    console.warn('Error in pluralization:', error);
    return count === 1 ? singular : (plural || `${singular}s`);
  }
};