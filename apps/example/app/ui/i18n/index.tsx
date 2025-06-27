import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  ButtonText,
  VStack,
  HStack,
  useThemedStyles,
  Theme,
  VScroll,
} from 'rnc-theme';
import { useLanguage } from 'rnc-theme';

// Main component with LanguageProvider
const I18nScreen: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const { locale, setLocale, i18n } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    setIsLoading(true);
    setLocale(newLocale);
    setTimeout(() => setIsLoading(false), 300); // Small delay for smooth transition
  };

  const languages = [
    { code: 'en', name: i18n.t('buttons.english') },
    { code: 'id', name: i18n.t('buttons.indonesian') },
    { code: 'fr', name: i18n.t('buttons.french') },
  ];

  return (
    <VScroll style={styles.container}>
      <VStack spacing="lg" padding="md">
        {/* Header */}
        <Card variant="primary" elevation={3}>
          <CardHeader
            title={i18n.t('title')}
            subtitle={i18n.t('subtitle')}
            titleStyle={styles.headerTitle}
            subtitleStyle={styles.headerSubtitle}
          />
        </Card>

        {/* Current Language Info */}
        <Card>
          <CardContent>
            <VStack spacing="md">
              <Typography variant="subtitle">
                {i18n.t('currentLanguage')}: {locale.toUpperCase()}
              </Typography>
              <Typography variant="body">{i18n.t('greeting')}</Typography>
              <Typography variant="body" style={styles.description}>
                {i18n.t('description')}
              </Typography>
            </VStack>
          </CardContent>
        </Card>

        {/* Language Switcher */}
        <Card>
          <CardHeader title={i18n.t('switchLanguage')} />
          <CardContent>
            <VStack spacing="sm">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant={locale === language.code ? 'primary' : 'outline'}
                  size="md"
                  onPress={() => handleLanguageChange(language.code)}
                  disabled={isLoading}
                  style={styles.languageButton}
                >
                  <ButtonText
                    variant={locale === language.code ? 'primary' : 'outline'}
                  >
                    {language.name}
                  </ButtonText>
                </Button>
              ))}
            </VStack>
          </CardContent>
        </Card>

        {/* Features List */}
        <Card>
          <CardHeader title={i18n.t('features.title')} />
          <CardContent>
            <VStack spacing="sm">
              <HStack spacing="sm" align="flex-start">
                <Typography variant="body" style={styles.bullet}>
                  •
                </Typography>
                <Typography variant="body" style={styles.featureText}>
                  {i18n.t('features.dynamicSwitching')}
                </Typography>
              </HStack>
              <HStack spacing="sm" align="flex-start">
                <Typography variant="body" style={styles.bullet}>
                  •
                </Typography>
                <Typography variant="body" style={styles.featureText}>
                  {i18n.t('features.persistentStorage')}
                </Typography>
              </HStack>
              <HStack spacing="sm" align="flex-start">
                <Typography variant="body" style={styles.bullet}>
                  •
                </Typography>
                <Typography variant="body" style={styles.featureText}>
                  {i18n.t('features.customConfig')}
                </Typography>
              </HStack>
              <HStack spacing="sm" align="flex-start">
                <Typography variant="body" style={styles.bullet}>
                  •
                </Typography>
                <Typography variant="body" style={styles.featureText}>
                  {i18n.t('features.autoDetection')}
                </Typography>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Implementation Info */}
        <Card variant="info">
          <CardContent>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.infoTitle}>
                Implementation Details
              </Typography>
              <Typography variant="body" style={styles.infoText}>
                This example uses a custom i18n configuration with three
                languages (English, Indonesian, French) and demonstrates:
              </Typography>
              <VStack spacing="xs" style={styles.infoList}>
                <Typography variant="small" style={styles.infoItem}>
                  • Custom translation objects
                </Typography>
                <Typography variant="small" style={styles.infoItem}>
                  • Language persistence with AsyncStorage
                </Typography>
                <Typography variant="small" style={styles.infoItem}>
                  • Dynamic UI updates on language change
                </Typography>
                <Typography variant="small" style={styles.infoItem}>
                  • Proper TypeScript integration
                </Typography>
              </VStack>
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    </VScroll>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerTitle: {
      color: theme.colors.surface,
      fontWeight: 'bold',
    },
    headerSubtitle: {
      color: theme.colors.surface,
      opacity: 0.9,
    },
    description: {
      lineHeight: 20,
      color: theme.colors.textSecondary,
    },
    languageButton: {
      width: '100%',
    },
    bullet: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    featureText: {
      flex: 1,
      lineHeight: 20,
    },
    infoTitle: {
      color: theme.colors.info,
      fontWeight: 'bold',
    },
    infoText: {
      lineHeight: 20,
      color: theme.colors.textSecondary,
    },
    infoList: {
      paddingLeft: theme.spacing.sm,
    },
    infoItem: {
      color: theme.colors.textSecondary,
      lineHeight: 16,
    },
  });

export default I18nScreen;