import { I18nConfig } from "rnc-theme";

// Custom i18n configuration for the example
export const i18nConfig: I18nConfig = {
  translations: {
    en: {
      title: 'Internationalization Demo',
      subtitle: 'Language switching example',
      currentLanguage: 'Current Language',
      switchLanguage: 'Switch Language',
      greeting: 'Hello, World!',
      description:
        'This is a demonstration of the i18n functionality in the rnc-theme library.',
      features: {
        title: 'Features',
        dynamicSwitching: 'Dynamic language switching',
        persistentStorage: 'Persistent language storage',
        customConfig: 'Custom configuration support',
        autoDetection: 'Auto locale detection',
      },
      buttons: {
        english: 'English',
        indonesian: 'Indonesian',
        french: 'French',
      },
    },
    id: {
      title: 'Demo Internasionalisasi',
      subtitle: 'Contoh pergantian bahasa',
      currentLanguage: 'Bahasa Saat Ini',
      switchLanguage: 'Ganti Bahasa',
      greeting: 'Halo, Dunia!',
      description:
        'Ini adalah demonstrasi fungsionalitas i18n dalam library rnc-theme.',
      features: {
        title: 'Fitur',
        dynamicSwitching: 'Pergantian bahasa dinamis',
        persistentStorage: 'Penyimpanan bahasa persisten',
        customConfig: 'Dukungan konfigurasi kustom',
        autoDetection: 'Deteksi lokal otomatis',
      },
      buttons: {
        english: 'Inggris',
        indonesian: 'Indonesia',
        french: 'Prancis',
      },
    },
    fr: {
      title: "Démo d'Internationalisation",
      subtitle: 'Exemple de changement de langue',
      currentLanguage: 'Langue Actuelle',
      switchLanguage: 'Changer de Langue',
      greeting: 'Bonjour le Monde!',
      description:
        'Ceci est une démonstration de la fonctionnalité i18n dans la bibliothèque rnc-theme.',
      features: {
        title: 'Fonctionnalités',
        dynamicSwitching: 'Changement de langue dynamique',
        persistentStorage: 'Stockage de langue persistant',
        customConfig: 'Support de configuration personnalisée',
        autoDetection: 'Détection automatique des paramètres régionaux',
      },
      buttons: {
        english: 'Anglais',
        indonesian: 'Indonésien',
        french: 'Français',
      },
    },
  },
  supportedLocales: ['en', 'id', 'fr'],
  defaultLocale: 'en',
  autoDetectLocale: true,
};
