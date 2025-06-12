import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Spinner, useThemedStyles, Theme } from 'rnc-theme';

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
      {/* Button Loading States */}
      <TouchableOpacity
        style={[styles.button, loadingStates.data && styles.buttonDisabled]}
        onPress={() => simulateLoading('data')}
        disabled={loadingStates.data}
      >
        {loadingStates.data ? (
          <View style={styles.buttonContent}>
            <Spinner size="sm" color="white" />
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
            <Spinner size="sm" color="white" thickness={3} />
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
            <Spinner size="sm" color="white" />
            <Text style={styles.buttonText}>Downloading...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Download</Text>
        )}
      </TouchableOpacity>

      {/* Full Screen Loading */}
      <TouchableOpacity
        style={[styles.button, styles.fullScreenButton]}
        onPress={handleFullScreenLoading}
      >
        <Text style={styles.buttonText}>Show Full Screen Loading</Text>
      </TouchableOpacity>

      {/* Inline Loading Examples */}
      <View style={styles.inlineSection}>
        <Text style={styles.sectionTitle}>Inline Loading</Text>

        <View style={styles.inlineItem}>
          <Text style={styles.inlineText}>Fetching user data</Text>
          <Spinner size="sm" color="primary" />
        </View>

        <View style={styles.inlineItem}>
          <Text style={styles.inlineText}>Processing payment</Text>
          <Spinner size="sm" color="warning" thickness={2} />
        </View>

        <View style={styles.inlineItem}>
          <Text style={styles.inlineText}>Syncing...</Text>
          <Spinner size={20} color="success" />
        </View>
      </View>

      {/* Full Screen Overlay */}
      {isLoading && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Spinner size="lg" color="primary" />
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
    padding: theme.spacing.md,
    gap: theme.spacing.md,
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
  inlineSection: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600' as const,
    color: theme.colors.text,
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
