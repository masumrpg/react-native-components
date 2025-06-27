import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  Spinner,
  useThemedStyles,
  Theme,
  VStack,
  Card,
  Typography,
  Box,
  VScroll,
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
    <Box style={styles.container}>
      <VScroll contentContainerStyle={styles.content}>
        <VStack spacing="lg">
          {/* Size Showcase */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Sizes
              </Typography>
              <VStack spacing="sm">
                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Extra Small (xs)</Typography>
                  <Spinner size="xs" variant="primary" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Small (sm)</Typography>
                  <Spinner size="sm" variant="primary" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Medium (md)</Typography>
                  <Spinner size="md" variant="primary" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Large (lg)</Typography>
                  <Spinner size="lg" variant="primary" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Extra Large (xl)</Typography>
                  <Spinner size="xl" variant="primary" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Custom Size (48px)</Typography>
                  <Spinner size={48} variant="primary" />
                </Box>
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
                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Default</Typography>
                  <Spinner variant="default" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Primary</Typography>
                  <Spinner variant="primary" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Secondary</Typography>
                  <Spinner variant="secondary" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Success</Typography>
                  <Spinner variant="success" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Error</Typography>
                  <Spinner variant="error" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Warning</Typography>
                  <Spinner variant="warning" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Info</Typography>
                  <Spinner variant="info" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Destructive</Typography>
                  <Spinner variant="destructive" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Outline</Typography>
                  <Spinner variant="outline" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Filled</Typography>
                  <Spinner variant="filled" size="md" />
                </Box>

                <Box style={styles.spinnerRow}>
                  <Typography variant="body">Ghost</Typography>
                  <Spinner variant="ghost" size="md" />
                </Box>
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
                  <Box style={styles.buttonContent}>
                    <Spinner size="sm" variant="primary" color="surface" />
                    <Typography style={styles.buttonText}>
                      Loading...
                    </Typography>
                  </Box>
                ) : (
                  <Typography style={styles.buttonText}>Load Data</Typography>
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
                  <Box style={styles.buttonContent}>
                    <Spinner
                      size="sm"
                      variant="success"
                      color="surface"
                      thickness={3}
                    />
                    <Typography style={styles.buttonText}>
                      Uploading...
                    </Typography>
                  </Box>
                ) : (
                  <Typography style={styles.buttonText}>Upload File</Typography>
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
                  <Box style={styles.buttonContent}>
                    <Spinner size="sm" variant="secondary" color="surface" />
                    <Typography style={styles.buttonText}>
                      Downloading...
                    </Typography>
                  </Box>
                ) : (
                  <Typography style={styles.buttonText}>Download</Typography>
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

              <Box style={styles.inlineItem}>
                <Typography style={styles.inlineText}>
                  Fetching user data
                </Typography>
                <Spinner size="sm" variant="primary" />
              </Box>

              <Box style={styles.inlineItem}>
                <Typography style={styles.inlineText}>
                  Processing payment
                </Typography>
                <Spinner size="sm" variant="warning" thickness={2} />
              </Box>

              <Box style={styles.inlineItem}>
                <Typography style={styles.inlineText}>Syncing...</Typography>
                <Spinner size={20} variant="success" />
              </Box>

              <Box style={styles.inlineItem}>
                <Typography style={styles.inlineText}>
                  Error occurred
                </Typography>
                <Spinner size="sm" variant="error" />
              </Box>

              <Box style={styles.inlineItem}>
                <Typography style={styles.inlineText}>Getting info</Typography>
                <Spinner size="sm" variant="info" />
              </Box>
            </VStack>
          </Card>

          {/* Real-world Examples */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Real-world Examples
              </Typography>

              <Box style={styles.realWorldItem}>
                <Typography variant="body">File Upload Progress</Typography>
                <Spinner
                  size="lg"
                  variant="success"
                  thickness={3}
                  duration={800}
                />
              </Box>

              <Box style={styles.realWorldItem}>
                <Typography variant="body">Network Request</Typography>
                <Spinner size="md" variant="info" duration={1200} />
              </Box>

              <Box style={styles.realWorldItem}>
                <Typography variant="body">Data Processing</Typography>
                <Spinner
                  size="sm"
                  variant="warning"
                  thickness={1}
                  duration={600}
                />
              </Box>
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
                <Typography style={styles.buttonText}>
                  Show Full Screen Loading
                </Typography>
              </TouchableOpacity>
            </VStack>
          </Card>
        </VStack>
      </VScroll>

      {/* Full Screen Overlay */}
      {isLoading && (
        <Box style={styles.overlay}>
          <Box style={styles.overlayContent}>
            <Spinner size="xl" variant="primary" />
            <Typography style={styles.overlayText}>Loading...</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    card: {
      padding: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.subtitle.fontSize,
      fontWeight: theme.typography.subtitle.fontWeight,
      color: theme.colors.text,
      textAlign: 'center',
    },
    spinnerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.xs,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.components.borderRadius.md,
      alignItems: 'center',
      minHeight: 50,
      justifyContent: 'center',
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
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    buttonText: {
      color: 'white',
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
    },
    inlineItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.md,
    },
    inlineText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
    realWorldItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlayContent: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.components.borderRadius.lg,
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    overlayText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      fontWeight: '600',
    },
  });

export default SpinnerScreen;
