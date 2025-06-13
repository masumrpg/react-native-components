import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  Spinner,
  useThemedStyles,
  Theme,
  VStack,
  Card,
  Typography,
} from 'rnc-theme';

const SpinnerScreen: React.FC = () => {
  const styles = useThemedStyles(createStyles);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    data: false,
    upload: false,
    download: false,
  });

  const simulateLoading = (type: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  const handleFullScreenLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <VStack spacing="lg">
          <Typography variant="title" style={styles.title}>
            Spinner Examples
          </Typography>

          {/* Size Showcase */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Sizes
              </Typography>
              <VStack spacing="sm">
                <View style={styles.spinnerRow}>
                  <Typography variant="body">Extra Small (xs)</Typography>
                  <Spinner size="xs" variant="primary" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Small (sm)</Typography>
                  <Spinner size="sm" variant="primary" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Medium (md)</Typography>
                  <Spinner size="md" variant="primary" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Large (lg)</Typography>
                  <Spinner size="lg" variant="primary" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Extra Large (xl)</Typography>
                  <Spinner size="xl" variant="primary" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Custom Size (48px)</Typography>
                  <Spinner size={48} variant="primary" />
                </View>
              </VStack>
            </VStack>
          </Card>

          {/* Variant Showcase */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Variants
              </Typography>
              <VStack spacing="sm">
                <View style={styles.spinnerRow}>
                  <Typography variant="body">Default</Typography>
                  <Spinner variant="default" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Primary</Typography>
                  <Spinner variant="primary" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Secondary</Typography>
                  <Spinner variant="secondary" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Success</Typography>
                  <Spinner variant="success" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Error</Typography>
                  <Spinner variant="error" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Warning</Typography>
                  <Spinner variant="warning" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Info</Typography>
                  <Spinner variant="info" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Destructive</Typography>
                  <Spinner variant="destructive" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Outline</Typography>
                  <Spinner variant="outline" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Filled</Typography>
                  <Spinner variant="filled" size="md" />
                </View>

                <View style={styles.spinnerRow}>
                  <Typography variant="body">Ghost</Typography>
                  <Spinner variant="ghost" size="md" />
                </View>
              </VStack>
            </VStack>
          </Card>

          {/* Button Loading States */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Button Loading States
              </Typography>

              <TouchableOpacity
                style={[
                  styles.button,
                  loadingStates.data && styles.buttonDisabled,
                ]}
                onPress={() => simulateLoading('data')}
                disabled={loadingStates.data}
              >
                {loadingStates.data ? (
                  <View style={styles.buttonContent}>
                    <Spinner size="sm" variant="primary" color="white" />
                    <Text style={styles.buttonText}>Loading...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Load Data</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.uploadButton,
                  loadingStates.upload && styles.buttonDisabled,
                ]}
                onPress={() => simulateLoading('upload')}
                disabled={loadingStates.upload}
              >
                {loadingStates.upload ? (
                  <View style={styles.buttonContent}>
                    <Spinner
                      size="sm"
                      variant="success"
                      color="white"
                      thickness={3}
                    />
                    <Text style={styles.buttonText}>Uploading...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Upload File</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.downloadButton,
                  loadingStates.download && styles.buttonDisabled,
                ]}
                onPress={() => simulateLoading('download')}
                disabled={loadingStates.download}
              >
                {loadingStates.download ? (
                  <View style={styles.buttonContent}>
                    <Spinner size="sm" variant="secondary" color="white" />
                    <Text style={styles.buttonText}>Downloading...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Download</Text>
                )}
              </TouchableOpacity>
            </VStack>
          </Card>

          {/* Inline Loading Examples */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Inline Loading
              </Typography>

              <View style={styles.inlineItem}>
                <Text style={styles.inlineText}>Fetching user data</Text>
                <Spinner size="sm" variant="primary" />
              </View>

              <View style={styles.inlineItem}>
                <Text style={styles.inlineText}>Processing payment</Text>
                <Spinner size="sm" variant="warning" thickness={2} />
              </View>

              <View style={styles.inlineItem}>
                <Text style={styles.inlineText}>Syncing...</Text>
                <Spinner size={20} variant="success" />
              </View>

              <View style={styles.inlineItem}>
                <Text style={styles.inlineText}>Error occurred</Text>
                <Spinner size="sm" variant="error" />
              </View>

              <View style={styles.inlineItem}>
                <Text style={styles.inlineText}>Getting info</Text>
                <Spinner size="sm" variant="info" />
              </View>
            </VStack>
          </Card>

          {/* Real-world Examples */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Real-world Examples
              </Typography>

              <View style={styles.realWorldItem}>
                <Typography variant="body">File Upload Progress</Typography>
                <Spinner
                  size="lg"
                  variant="success"
                  thickness={3}
                  duration={800}
                />
              </View>

              <View style={styles.realWorldItem}>
                <Typography variant="body">Network Request</Typography>
                <Spinner size="md" variant="info" duration={1200} />
              </View>

              <View style={styles.realWorldItem}>
                <Typography variant="body">Data Processing</Typography>
                <Spinner
                  size="sm"
                  variant="warning"
                  thickness={1}
                  duration={600}
                />
              </View>
            </VStack>
          </Card>

          {/* Full Screen Loading */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Full Screen Loading
              </Typography>

              <TouchableOpacity
                style={[styles.button, styles.fullScreenButton]}
                onPress={handleFullScreenLoading}
              >
                <Text style={styles.buttonText}>Show Full Screen Loading</Text>
              </TouchableOpacity>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>

      {/* Full Screen Overlay */}
      {isLoading && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Spinner size="xl" variant="primary" />
            <Text style={styles.overlayText}>Loading...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
    marginBottom: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: theme.typography.subtitle.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  spinnerRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.components.borderRadius.md,
    alignItems: 'center' as const,
    minHeight: 50,
    justifyContent: 'center' as const,
  },
  uploadButton: {
    backgroundColor: theme.colors.success,
  },
  downloadButton: {
    backgroundColor: theme.colors.secondary,
  },
  fullScreenButton: {
    backgroundColor: theme.colors.warning,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.sm,
  },
  buttonText: {
    color: 'white',
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
  },
  inlineItem: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.components.borderRadius.md,
  },
  inlineText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  realWorldItem: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.components.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  overlayContent: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    borderRadius: theme.components.borderRadius.lg,
    alignItems: 'center' as const,
    gap: theme.spacing.md,
  },
  overlayText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    fontWeight: '600' as const,
  },
});

export default SpinnerScreen;
