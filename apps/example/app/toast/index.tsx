import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  ButtonText,
  useToast,
  Code,
  H3,
  Body,
  H2,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from 'rnc-theme';
// Import Lucide icons untuk custom toast
import {
  Heart,
  Star,
  Gift,
  Coffee,
  Music,
  Camera,
  Bell,
} from 'lucide-react-native';

export default function ToastExample() {
  const { toast, dismissAll, toastAsync, updateToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const showLoadingToast = () => {
    const toastId = toast({
      variant: 'loading',
      title: 'Loading',
      description: 'Please wait...',
      isLoading: true,
      loadingText: 'Processing your request...',
      duration: 0, // Tidak auto dismiss
    });

    // Simulasi async operation
    setTimeout(() => {
      updateToast(toastId, {
        variant: 'success',
        isLoading: false,
        title: 'Completed!',
        description: 'Your request has been processed successfully.',
        duration: 3000,
      });
    }, 3000);
  };

  const showAsyncToast = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await toastAsync(
        {
          title: 'Uploading File',
          loadingText: 'Uploading your file, please wait...',
        },
        async () => {
          // Simulasi upload file
          await new Promise((resolve) => setTimeout(resolve, 4000));

          // Simulasi kemungkinan error (20% chance)
          if (Math.random() < 0.2) {
            throw new Error('Upload failed due to network error');
          }

          return { fileId: '12345', fileName: 'document.pdf' };
        }
      );
    } catch (error) {
      console.log('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showAsyncWithCustomMessages = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await toastAsync(
        {
          title: 'Syncing Data',
          loadingText: 'Synchronizing with server...',
        },
        async () => {
          // Simulasi sync process
          await new Promise((resolve) => setTimeout(resolve, 2500));
          return { syncedItems: 150 };
        }
      );
    } catch (error) {
      console.log('Sync failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tambahkan fungsi untuk custom icon toasts
  const showCustomIconToast = () => {
    toast({
      variant: 'custom',
      title: 'Custom Heart Icon',
      description: 'This toast uses a custom heart icon from Lucide.',
      icon: <Heart size={20} color="#EF4444" />,
    });
  };

  const showStarToast = () => {
    toast({
      variant: 'custom',
      title: 'Starred!',
      description: 'You have starred this item.',
      icon: <Star size={20} color="#F59E0B" />,
    });
  };

  const showGiftToast = () => {
    toast({
      variant: 'custom',
      title: 'Gift Received!',
      description: 'You have received a special gift.',
      icon: <Gift size={20} color="#8B5CF6" />,
      action: {
        label: 'Open',
        onPress: () => {
          toast({
            variant: 'success',
            title: 'Gift Opened!',
            description: 'You found 100 coins!',
          });
        },
      },
    });
  };

  const showCoffeeToast = () => {
    toast({
      variant: 'custom',
      title: 'Coffee Break',
      description: 'Time for a coffee break!',
      icon: <Coffee size={20} color="#92400E" />,
      duration: 6000,
    });
  };

  const showMusicToast = () => {
    toast({
      variant: 'custom',
      title: 'Now Playing',
      description: 'Your favorite song is now playing.',
      icon: <Music size={20} color="#059669" />,
    });
  };

  const showNotificationToast = () => {
    toast({
      variant: 'custom',
      title: 'New Notification',
      description: 'You have 3 new messages.',
      icon: <Bell size={20} color="#DC2626" />,
      action: {
        label: 'View',
        onPress: () => {
          toast({
            variant: 'info',
            title: 'Messages',
            description: 'Opening your messages...',
          });
        },
      },
    });
  };

  const showCustomAsyncToast = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await toastAsync(
        {
          title: 'Uploading Photo',
          loadingText: 'Uploading your photo to gallery...',
          icon: <Camera size={20} color="#3B82F6" />,
        },
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000));

          if (Math.random() < 0.2) {
            throw new Error('Upload failed due to network error');
          }

          return { photoId: '67890', fileName: 'photo.jpg' };
        }
      );
    } catch (error) {
      console.log('Photo upload failed:', error);
    } finally {
      setIsLoading(false);
    }
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
      <View style={styles.header}>
        <H2>Toast Examples</H2>
        <Body style={styles.description}>
          Stacked toast notifications with different variants, animations, and
          async operations.
        </Body>
      </View>

      {/* Basic Variants Card */}
      <Card variant="default" style={styles.card}>
        <CardHeader
          title="Basic Variants"
          subtitle="Different toast types for various use cases"
          borderBottom
        />
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Custom Icons Card - NEW */}
      <Card variant="secondary" style={styles.card}>
        <CardHeader
          title="Custom Icons"
          subtitle="Toast with custom Lucide icons"
          borderBottom
        />
        <CardContent>
          <View style={styles.buttonGroup}>
            <Button onPress={showCustomIconToast} style={styles.button}>
              <ButtonText>❤️ Heart Toast</ButtonText>
            </Button>
            <Button onPress={showStarToast} style={styles.button}>
              <ButtonText>⭐ Star Toast</ButtonText>
            </Button>
            <Button onPress={showGiftToast} style={styles.button}>
              <ButtonText>🎁 Gift Toast</ButtonText>
            </Button>
            <Button onPress={showCoffeeToast} style={styles.button}>
              <ButtonText>☕ Coffee Toast</ButtonText>
            </Button>
            <Button onPress={showMusicToast} style={styles.button}>
              <ButtonText>🎵 Music Toast</ButtonText>
            </Button>
            <Button onPress={showNotificationToast} style={styles.button}>
              <ButtonText>🔔 Notification Toast</ButtonText>
            </Button>
          </View>
        </CardContent>
        <CardFooter>
          <Body style={styles.cardFooterText}>
            💡 Use any Lucide icon or custom React component as toast icon
          </Body>
        </CardFooter>
      </Card>

      {/* Async Loading Card */}
      <Card variant="primary" style={styles.card}>
        <CardHeader
          title="Async & Loading States"
          subtitle="Toast with loading animations and async operations"
          borderBottom
        />
        <CardContent>
          <View style={styles.buttonGroup}>
            <Button
              onPress={showLoadingToast}
              variant="primary"
              style={styles.button}
            >
              <ButtonText>Manual Loading Toast</ButtonText>
            </Button>
            <Button
              onPress={showAsyncToast}
              variant="primary"
              style={styles.button}
              disabled={isLoading}
            >
              <ButtonText>
                {isLoading ? 'Processing...' : 'Async File Upload'}
              </ButtonText>
            </Button>
            <Button
              onPress={showAsyncWithCustomMessages}
              variant="secondary"
              style={styles.button}
              disabled={isLoading}
            >
              <ButtonText>
                {isLoading ? 'Syncing...' : 'Async Data Sync'}
              </ButtonText>
            </Button>
            <Button
              onPress={showCustomAsyncToast}
              variant="secondary"
              style={styles.button}
              disabled={isLoading}
            >
              <ButtonText>
                {isLoading ? 'Uploading...' : '📷 Custom Async Photo Upload'}
              </ButtonText>
            </Button>
          </View>
        </CardContent>
        <CardFooter>
          <Body style={styles.cardFooterText}>
            💡 Async toasts automatically transition from loading to
            success/error states
          </Body>
        </CardFooter>
      </Card>

      {/* Advanced Features Card */}
      <Card variant="outline" style={styles.card}>
        <CardHeader
          title="Advanced Features"
          subtitle="Special toast behaviors and interactions"
          borderBottom
        />
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Usage Examples Card */}
      <Card variant="ghost" style={styles.card}>
        <CardHeader
          title="Usage Examples"
          subtitle="Code examples for different toast implementations"
          borderBottom
        />
        <CardContent>
          <H3 style={styles.codeTitle}>Basic Usage</H3>
          <Code style={styles.codeBlock}>
            {`import { useToast } from 'rnc-theme';

const { toast } = useToast();

// Basic toast
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

          <H3 style={styles.codeTitle}>Custom Icons</H3>
          <Code style={styles.codeBlock}>
            {`import { Heart, Star, Gift } from 'lucide-react-native';

// Custom icon toast
toast({
  variant: 'custom',
  title: 'Custom Icon',
  description: 'Toast with custom icon.',
  icon: <Heart size={20} color="#EF4444" />
});

// With action
toast({
  variant: 'custom',
  title: 'Gift Received!',
  description: 'You got a special gift.',
  icon: <Gift size={20} color="#8B5CF6" />,
  action: {
    label: 'Open',
    onPress: () => openGift()
  }
});`}
          </Code>

          <H3 style={styles.codeTitle}>Async Operations</H3>
          <Code style={styles.codeBlock}>
            {`// Auto-managed async toast
const { toastAsync } = useToast();

const result = await toastAsync(
  {
    title: 'Uploading',
    loadingText: 'Please wait...',
    icon: <Upload size={20} color="#3B82F6" />
  },
  async () => {
    return await uploadFile(file);
  }
);

// Manual control
const { toast, updateToast } = useToast();

const id = toast({
  variant: 'loading',
  isLoading: true,
  duration: 0
});

try {
  await operation();
  updateToast(id, {
    variant: 'success',
    isLoading: false,
    duration: 3000
  });
} catch (error) {
  updateToast(id, {
    variant: 'error',
    isLoading: false,
    duration: 5000
  });
}`}
          </Code>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
  cardFooterText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  codeTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  codeBlock: {
    marginBottom: 16,
  },
});
