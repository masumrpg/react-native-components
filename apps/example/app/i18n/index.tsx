import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  initI18n,
  useI18n,
  useSupportedLanguages,
  useCurrentLanguage,
  formatDate,
  formatTime,
  formatCurrency,
  formatRelativeTime,
  pluralize,
} from 'rnc-theme';

// Sample translation resources
const resources = {
  en: {
    translation: {
      greeting: 'Hello, {{name}}!',
      welcome: 'Welcome to our app',
      select_date: 'Select date',
      language_switcher: 'Language Switcher',
      current_language: 'Current Language',
      change_language: 'Change Language',
      date_formatting: 'Date Formatting',
      time_formatting: 'Time Formatting',
      currency_formatting: 'Currency Formatting',
      relative_time: 'Relative Time',
      pluralization: 'Pluralization',
      examples: 'Examples',
      item: 'item',
      items: 'items',
      message: 'message',
      messages: 'messages',
      user_count: 'You have {{count}} {{item}}',
      last_seen: 'Last seen',
      price: 'Price',
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      // Additional sample words
      hello: 'Hello',
      goodbye: 'Goodbye',
      thank_you: 'Thank you',
      please: 'Please',
      yes: 'Yes',
      no: 'No',
      home: 'Home',
      settings: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      start: 'Start',
      stop: 'Stop',
      play: 'Play',
      pause: 'Pause',
      share: 'Share',
      download: 'Download',
      upload: 'Upload',
      refresh: 'Refresh',
      retry: 'Retry',
      close: 'Close',
      open: 'Open',
      new: 'New',
      old: 'Old',
      recent: 'Recent',
      popular: 'Popular',
      featured: 'Featured',
      recommended: 'Recommended'
    },
  },
  id: {
    translation: {
      greeting: 'Halo, {{name}}!',
      welcome: 'Selamat datang di aplikasi kami',
      select_date: 'Pilih tanggal',
      language_switcher: 'Pengalih Bahasa',
      current_language: 'Bahasa Saat Ini',
      change_language: 'Ubah Bahasa',
      date_formatting: 'Format Tanggal',
      time_formatting: 'Format Waktu',
      currency_formatting: 'Format Mata Uang',
      relative_time: 'Waktu Relatif',
      pluralization: 'Pluralisasi',
      examples: 'Contoh',
      item: 'item',
      items: 'item',
      message: 'pesan',
      messages: 'pesan',
      user_count: 'Anda memiliki {{count}} {{item}}',
      last_seen: 'Terakhir dilihat',
      price: 'Harga',
      today: 'Hari ini',
      yesterday: 'Kemarin',
      tomorrow: 'Besok',
      // Additional sample words
      hello: 'Halo',
      goodbye: 'Selamat tinggal',
      thank_you: 'Terima kasih',
      please: 'Tolong',
      yes: 'Ya',
      no: 'Tidak',
      home: 'Beranda',
      settings: 'Pengaturan',
      profile: 'Profil',
      notifications: 'Notifikasi',
      search: 'Cari',
      save: 'Simpan',
      cancel: 'Batal',
      delete: 'Hapus',
      edit: 'Edit',
      add: 'Tambah',
      loading: 'Memuat...',
      error: 'Error',
      success: 'Berhasil',
      warning: 'Peringatan',
      info: 'Informasi',
      confirm: 'Konfirmasi',
      back: 'Kembali',
      next: 'Selanjutnya',
      finish: 'Selesai',
      start: 'Mulai',
      stop: 'Berhenti',
      play: 'Putar',
      pause: 'Jeda',
      share: 'Bagikan',
      download: 'Unduh',
      upload: 'Unggah',
      refresh: 'Segarkan',
      retry: 'Coba lagi',
      close: 'Tutup',
      open: 'Buka',
      new: 'Baru',
      old: 'Lama',
      recent: 'Terbaru',
      popular: 'Populer',
      featured: 'Unggulan',
      recommended: 'Direkomendasikan'
    },
  },
  es: {
    translation: {
      greeting: '¡Hola, {{name}}!',
      welcome: 'Bienvenido a nuestra aplicación',
      select_date: 'Seleccionar fecha',
      language_switcher: 'Selector de Idioma',
      current_language: 'Idioma Actual',
      change_language: 'Cambiar Idioma',
      date_formatting: 'Formato de Fecha',
      time_formatting: 'Formato de Hora',
      currency_formatting: 'Formato de Moneda',
      relative_time: 'Tiempo Relativo',
      pluralization: 'Pluralización',
      examples: 'Ejemplos',
      item: 'artículo',
      items: 'artículos',
      message: 'mensaje',
      messages: 'mensajes',
      user_count: 'Tienes {{count}} {{item}}',
      last_seen: 'Visto por última vez',
      price: 'Precio',
      today: 'Hoy',
      yesterday: 'Ayer',
      tomorrow: 'Mañana',
      // Additional sample words
      hello: 'Hola',
      goodbye: 'Adiós',
      thank_you: 'Gracias',
      please: 'Por favor',
      yes: 'Sí',
      no: 'No',
      home: 'Inicio',
      settings: 'Configuración',
      profile: 'Perfil',
      notifications: 'Notificaciones',
      search: 'Buscar',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Agregar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      info: 'Información',
      confirm: 'Confirmar',
      back: 'Atrás',
      next: 'Siguiente',
      finish: 'Finalizar',
      start: 'Iniciar',
      stop: 'Detener',
      play: 'Reproducir',
      pause: 'Pausar',
      share: 'Compartir',
      download: 'Descargar',
      upload: 'Subir',
      refresh: 'Actualizar',
      retry: 'Reintentar',
      close: 'Cerrar',
      open: 'Abrir',
      new: 'Nuevo',
      old: 'Viejo',
      recent: 'Reciente',
      popular: 'Popular',
      featured: 'Destacado',
      recommended: 'Recomendado'
    },
  },
  fr: {
    translation: {
      greeting: 'Bonjour, {{name}} !',
      welcome: 'Bienvenue dans notre application',
      select_date: 'Sélectionner la date',
      language_switcher: 'Sélecteur de Langue',
      current_language: 'Langue Actuelle',
      change_language: 'Changer de Langue',
      date_formatting: 'Format de Date',
      time_formatting: 'Format d\'Heure',
      currency_formatting: 'Format de Devise',
      relative_time: 'Temps Relatif',
      pluralization: 'Pluralisation',
      examples: 'Exemples',
      item: 'élément',
      items: 'éléments',
      message: 'message',
      messages: 'messages',
      user_count: 'Vous avez {{count}} {{item}}',
      last_seen: 'Vu pour la dernière fois',
      price: 'Prix',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      tomorrow: 'Demain',
      // Additional sample words
      hello: 'Bonjour',
      goodbye: 'Au revoir',
      thank_you: 'Merci',
      please: 'S\'il vous plaît',
      yes: 'Oui',
      no: 'Non',
      home: 'Accueil',
      settings: 'Paramètres',
      profile: 'Profil',
      notifications: 'Notifications',
      search: 'Rechercher',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      warning: 'Avertissement',
      info: 'Information',
      confirm: 'Confirmer',
      back: 'Retour',
      next: 'Suivant',
      finish: 'Terminer',
      start: 'Commencer',
      stop: 'Arrêter',
      play: 'Jouer',
      pause: 'Pause',
      share: 'Partager',
      download: 'Télécharger',
      upload: 'Téléverser',
      refresh: 'Actualiser',
      retry: 'Réessayer',
      close: 'Fermer',
      open: 'Ouvrir',
      new: 'Nouveau',
      old: 'Ancien',
      recent: 'Récent',
      popular: 'Populaire',
      featured: 'En vedette',
      recommended: 'Recommandé'
    },
  },
};

const I18nExample: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { t, changeLanguage, currentLanguage, isReady } = useI18n();
  const supportedLanguages = useSupportedLanguages();
  const { info: currentLangInfo } = useCurrentLanguage();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initI18n({
          resources,
          fallbackLng: 'en',
          debug: true,
        });
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        Alert.alert('Error', 'Failed to initialize i18n');
      }
    };

    initialize();
  }, []);

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await changeLanguage(languageCode);
      Alert.alert('Success', `Language changed to ${languageCode}`);
    } catch (error) {
      console.error('Failed to change language:', error);
      Alert.alert('Error', 'Failed to change language');
    }
  };

  if (!isInitialized || !isReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Initializing i18n...</Text>
      </View>
    );
  }

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      <Text style={styles.subtitle}>{t('greeting', { name: 'Developer' })}</Text>

      {/* Language Switcher Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('language_switcher')}</Text>
        <Text style={styles.currentLang}>
          {t('current_language')}: {currentLangInfo?.flag} {currentLangInfo?.label}
        </Text>

        <View style={styles.languageGrid}>
          {supportedLanguages.slice(0, 8).map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageButton,
                currentLanguage === language.code && styles.activeLanguageButton,
              ]}
              onPress={() => handleLanguageChange(language.code)}
            >
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <Text style={styles.languageCode}>{language.code.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Date Formatting Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('date_formatting')}</Text>
        <Text style={styles.exampleText}>
          {t('today')}: {formatDate(now)}
        </Text>
        <Text style={styles.exampleText}>
          {t('yesterday')}: {formatDate(yesterday)}
        </Text>
        <Text style={styles.exampleText}>
          {t('tomorrow')}: {formatDate(tomorrow)}
        </Text>
      </View>

      {/* Time Formatting Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('time_formatting')}</Text>
        <Text style={styles.exampleText}>
          {t('today')}: {formatTime(now)}
        </Text>
      </View>

      {/* Currency Formatting Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('currency_formatting')}</Text>
        <Text style={styles.exampleText}>
          {t('price')}: {formatCurrency(1234.56, 'USD')}
        </Text>
        <Text style={styles.exampleText}>
          {t('price')}: {formatCurrency(1234.56, 'EUR')}
        </Text>
        <Text style={styles.exampleText}>
          {t('price')}: {formatCurrency(1234.56, 'IDR')}
        </Text>
      </View>

      {/* Relative Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('relative_time')}</Text>
        <Text style={styles.exampleText}>
          {t('last_seen')}: {formatRelativeTime(twoHoursAgo)}
        </Text>
        <Text style={styles.exampleText}>
          {t('last_seen')}: {formatRelativeTime(yesterday)}
        </Text>
        <Text style={styles.exampleText}>
          {t('last_seen')}: {formatRelativeTime(tomorrow)}
        </Text>
      </View>

      {/* Pluralization Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('pluralization')}</Text>
        <Text style={styles.exampleText}>
          {t('user_count', {
            count: 1,
            item: pluralize(1, t('message'), t('messages')),
          })}
        </Text>
        <Text style={styles.exampleText}>
          {t('user_count', {
            count: 5,
            item: pluralize(5, t('message'), t('messages')),
          })}
        </Text>
        <Text style={styles.exampleText}>
          {t('user_count', {
            count: 0,
            item: pluralize(0, t('item'), t('items')),
          })}
        </Text>
      </View>

      {/* Sample Translations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sample Translations</Text>
        <View style={styles.translationGrid}>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>hello:</Text>
            <Text style={styles.translationValue}>{t('hello')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>thank_you:</Text>
            <Text style={styles.translationValue}>{t('thank_you')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>home:</Text>
            <Text style={styles.translationValue}>{t('home')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>settings:</Text>
            <Text style={styles.translationValue}>{t('settings')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>save:</Text>
            <Text style={styles.translationValue}>{t('save')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>cancel:</Text>
            <Text style={styles.translationValue}>{t('cancel')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>loading:</Text>
            <Text style={styles.translationValue}>{t('loading')}</Text>
          </View>
          <View style={styles.translationItem}>
            <Text style={styles.translationKey}>success:</Text>
            <Text style={styles.translationValue}>{t('success')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  currentLang: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
    textAlign: 'center',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageButton: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeLanguageButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  languageFlag: {
    fontSize: 24,
    marginBottom: 4,
  },
  languageCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  exampleText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
    paddingVertical: 4,
  },
  translationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  translationItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196f3',
  },
  translationKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  translationValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default I18nExample;