import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, ButtonText, useToast, Code, H3, Body, H2 } from 'rnc-theme';

export default function ToastExample() {
  const { toast, dismissAll } = useToast();

  const showDefaultToast = () => {
    toast({
      title: 'Default Toast',
      description: 'This is a default toast message.',
    });
  };

  const showSuccessToast = () => {
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Your action was completed successfully.',
    });
  };

  const showErrorToast = () => {
    toast({
      variant: 'error',
      title: 'Error occurred',
      description: 'Something went wrong. Please try again.',
    });
  };

  const showWarningToast = () => {
    toast({
      variant: 'warning',
      title: 'Warning',
      description: 'Please check your input and try again.',
    });
  };

  const showInfoToast = () => {
    toast({
      variant: 'info',
      title: 'Information',
      description: 'Here is some useful information for you.',
    });
  };

  const showToastWithAction = () => {
    toast({
      variant: 'info',
      title: 'Update Available',
      description: 'A new version of the app is available.',
      action: {
        label: 'Update',
        onPress: () => {
          toast({
            variant: 'success',
            title: 'Updating...',
            description: 'App update started.',
          });
        },
      },
    });
  };

  const showPersistentToast = () => {
    toast({
      variant: 'warning',
      title: 'Persistent Toast',
      description: 'This toast will not auto-dismiss.',
      duration: 0, // Won't auto-dismiss
    });
  };

  const showStackedToasts = () => {
    // Show multiple toasts to demonstrate stacking
    setTimeout(() => showSuccessToast(), 0);
    setTimeout(() => showWarningToast(), 200);
    setTimeout(() => showErrorToast(), 400);
    setTimeout(() => showInfoToast(), 600);
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <H2>Toast Examples</H2>
          <Body style={styles.description}>
            Stacked toast notifications with different variants and animations.
          </Body>
        </View>

        <View style={styles.section}>
          <H3>Basic Variants</H3>
          <View style={styles.buttonGroup}>
            <Button onPress={showDefaultToast} style={styles.button}>
              <ButtonText>Default Toast</ButtonText>
            </Button>
            <Button
              onPress={showSuccessToast}
              variant="success"
              style={styles.button}
            >
              <ButtonText>Success Toast</ButtonText>
            </Button>
            <Button
              onPress={showErrorToast}
              variant="error"
              style={styles.button}
            >
              <ButtonText>Error Toast</ButtonText>
            </Button>
            <Button
              onPress={showWarningToast}
              variant="warning"
              style={styles.button}
            >
              <ButtonText>Warning Toast</ButtonText>
            </Button>
            <Button
              onPress={showInfoToast}
              variant="info"
              style={styles.button}
            >
              <ButtonText>Info Toast</ButtonText>
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <H3>Advanced Features</H3>
          <View style={styles.buttonGroup}>
            <Button onPress={showToastWithAction} style={styles.button}>
              <ButtonText>Toast with Action</ButtonText>
            </Button>
            <Button onPress={showPersistentToast} style={styles.button}>
              <ButtonText>Persistent Toast</ButtonText>
            </Button>
            <Button onPress={showStackedToasts} style={styles.button}>
              <ButtonText>Show Stacked Toasts</ButtonText>
            </Button>
            <Button
              onPress={dismissAll}
              variant="outline"
              style={styles.button}
            >
              <ButtonText>Dismiss All</ButtonText>
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <H3>Usage</H3>
          <Code>
            {`import { useToast } from 'rnc-theme';

const { toast } = useToast();

// Basic usage
toast({
  title: 'Success!',
  description: 'Operation completed.',
  variant: 'success'
});

// With action
toast({
  title: 'Update Available',
  description: 'New version ready.',
  action: {
    label: 'Update',
    onPress: () => handleUpdate()
  }
});`}
          </Code>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
  },
  buttonGroup: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
  },
});
