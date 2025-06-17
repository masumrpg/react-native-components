import React, { useEffect, useMemo } from 'react'; // Tambahkan missing imports
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from 'lucide-react-native';
import { ToastItemProps, ToastVariant } from '../types';
import { Theme } from '../../../../types/theme';

const getToastIcon = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return <CheckCircle size={20} color="#10B981" />;
    case 'error':
      return <AlertCircle size={20} color="#EF4444" />;
    case 'warning':
      return <AlertTriangle size={20} color="#F59E0B" />;
    case 'info':
      return <Info size={20} color="#3B82F6" />;
    default:
      return null;
  }
};

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  theme,
  index,
  onDismiss,
}) => {
  const styles = useMemo(() => createToastItemStyle(theme), [theme]);
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateX = useSharedValue(0); // Pindahkan ke top level

  useEffect(() => {
    // Enter animation
    translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
  }, []);

  const handleDismiss = () => {
    // Animasi dismiss yang lebih smooth dengan multiple effects

    // 1. Slide ke kanan dengan spring yang lebih smooth
    translateX.value = withSpring(400, {
      damping: 25,
      stiffness: 200,
      mass: 1,
    });

    // 2. Scale down dengan timing yang berbeda untuk efek yang lebih natural
    scale.value = withSpring(0.85, {
      damping: 30,
      stiffness: 400,
      mass: 0.8,
    });

    // 3. Slide up sedikit untuk efek "lift and dismiss"
    translateY.value = withSpring(-20, {
      damping: 25,
      stiffness: 300,
      mass: 0.9,
    });

    // 4. Fade out dengan easing yang lebih smooth
    opacity.value = withTiming(
      0,
      {
        duration: 400, // Lebih lama untuk smooth
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Easing curve yang lebih natural
      },
      () => {
        runOnJS(onDismiss)(toast.id);
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value }, // Tambahkan translateX
        { scale: scale.value },
      ],
      opacity: opacity.value,
      zIndex: 1000 - index,
    };
  });

  // iOS-style notification stack - sangat subtle!
  const stackedStyle = useAnimatedStyle(() => {
    const maxVisibleNotifications = 3;

    if (index >= maxVisibleNotifications) {
      return {
        transform: [{ translateY: 0 }, { scale: 0 }],
        opacity: 0,
      };
    }

    // iOS style: sangat minimal offset dan scale
    const stackOffset = index * 4; // Sangat kecil, hanya 4px per notification
    const scaleValue = 1 - index * 0.02; // Hampir tidak terlihat perbedaannya (2%)
    const opacityValue = 1; // Semua notification full opacity seperti iOS

    return {
      transform: [
        { translateY: stackOffset }, // Bergerak ke bawah sedikit
        { scale: scaleValue }, // Scale hampir tidak berubah
      ],
      opacity: opacityValue,
    };
  });

  const icon = toast.icon || getToastIcon(toast.variant || 'default');

  return (
    <Animated.View
      style={[
        styles.container,
        styles[toast.variant || 'default'],
        animatedStyle,
        stackedStyle,
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          {toast.title && <Text style={styles.title}>{toast.title}</Text>}
          {toast.description && (
            <Text style={styles.description}>{toast.description}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleDismiss}>
          <X size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
      {toast.action && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={toast.action.onPress}
        >
          <Text style={styles.actionText}>{toast.action.label}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const createToastItemStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.components.borderRadius.md,
      marginHorizontal: theme.spacing.md,
      marginVertical: theme.spacing.xs,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: theme.spacing.md,
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
      marginTop: 2,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs ? theme.spacing.xs : 0,
    },
    description: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.textSecondary,
      lineHeight: theme.typography.caption.lineHeight,
    },
    closeButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.sm,
    },
    actionButton: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    actionText: {
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    // Variants
    default: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.border,
    },
    success: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.success,
    },
    error: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.error,
    },
    warning: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.warning,
    },
    info: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.info,
    },
  });
