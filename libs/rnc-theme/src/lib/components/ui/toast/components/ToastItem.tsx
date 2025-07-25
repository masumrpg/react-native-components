import React, { useEffect, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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
import { useToast } from '../context/ToastContext';
import { createShadow } from '../../../../utils';

const getToastIcon = (
  variant: ToastVariant,
  theme: Theme,
  isLoading?: boolean
) => {
  if (isLoading) {
    return <ActivityIndicator size="small" color={theme.colors.primary} />;
  }

  switch (variant) {
    case 'success':
      return <CheckCircle size={20} color="#10B981" />;
    case 'error':
      return <AlertCircle size={20} color="#EF4444" />;
    case 'warning':
      return <AlertTriangle size={20} color="#F59E0B" />;
    case 'info':
      return <Info size={20} color="#3B82F6" />;
    case 'loading':
      return <ActivityIndicator size="small" color={theme.colors.primary} />;
    case 'custom':
      return null; // Custom icon akan dihandle melalui toast.icon prop
    default:
      return null;
  }
};

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  theme,
  index,
  onDismiss,
  position = 'top',
}) => {
  const { registerDismissCallback, unregisterDismissCallback } = useToast();
  const styles = useMemo(() => createToastItemStyle(theme), [theme]);

  // Animasi berbeda berdasarkan posisi
  const initialTranslateY = position === 'top' ? -100 : 100;
  const translateY = useSharedValue(initialTranslateY);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateX = useSharedValue(0);

  const handleDismiss = useCallback(() => {
    // Jangan dismiss jika masih loading
    if (toast.isLoading) return;

    // Animasi dismiss yang sama untuk manual dan auto
    translateX.value = withTiming(400, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });

    scale.value = withTiming(0.85, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });

    // Animasi translateY berbeda berdasarkan posisi
    const dismissTranslateY = position === 'top' ? -20 : 20;
    translateY.value = withTiming(dismissTranslateY, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });

    opacity.value = withTiming(
      0,
      {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        runOnJS(onDismiss)(toast.id);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id, toast.isLoading, onDismiss, position]);

  useEffect(() => {
    // Enter animation - TANPA BOUNCING, smooth linear motion
    translateY.value = withTiming(0, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    scale.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    // Register dismiss callback untuk auto-dismiss
    registerDismissCallback(toast.id, handleDismiss);

    // Cleanup
    return () => {
      unregisterDismissCallback(toast.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    toast.id,
    handleDismiss,
    registerDismissCallback,
    unregisterDismissCallback,
  ]);

  // iOS-style notification stack - smooth push animation
  const stackedStyle = useAnimatedStyle(() => {
    let stackOffset;

    if (position === 'top') {
      stackOffset = index * 4;
    } else {
      stackOffset = -index * 4;
    }

    const scaleValue = 1 - index * 0.02;
    const opacityValue = 1;

    return {
      transform: [
        {
          translateY: withTiming(stackOffset, {
            duration: 300,
            easing: Easing.out(Easing.cubic),
          }),
        },
        {
          scale: withTiming(scaleValue, {
            duration: 300,
            easing: Easing.out(Easing.cubic),
          }),
        },
      ],
      opacity: opacityValue,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
      zIndex: position === 'top' ? 1000 - index : 1000 + index,
    };
  });

  const icon =
    toast.icon ??
    getToastIcon(toast.variant ?? 'default', theme, toast.isLoading);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor:
            toast.variant && toast.variant === 'default'
              ? theme.colors.primary
              : toast.variant
              ? theme.colors[toast.variant as keyof typeof theme.colors]
              : theme.colors.primary,
        },
        styles[toast.variant ?? 'default'],
        animatedStyle,
        stackedStyle,
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          {toast.title && <Text style={styles.title}>{toast.title}</Text>}
          {toast.description && <Text style={styles.description}>{toast.description}</Text>}
          {toast.isLoading && toast.loadingText && (
            <Text style={styles.loadingText}>{toast.loadingText}</Text>
          )}
        </View>
        {/* Hanya tampilkan close button jika tidak loading */}
        {!toast.isLoading && (
          <TouchableOpacity style={styles.closeButton} onPress={handleDismiss}>
            <X size={16} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
      {toast.action && !toast.isLoading && (
        <TouchableOpacity style={styles.actionButton} onPress={toast.action.onPress}>
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
      borderLeftWidth: 1,
      ...createShadow(5),
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
      fontSize: theme.typography.subtitle.fontSize,
      lineHeight: theme.typography.subtitle.lineHeight,
      fontWeight: theme.typography.subtitle.fontWeight ?? '500',
      fontFamily: theme.typography.subtitle.fontFamily,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs ? theme.spacing.xs : 0,
    },
    description: {
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
      fontWeight: theme.typography.body.fontWeight ?? '400',
      fontFamily: theme.typography.body.fontFamily,
      color: theme.colors.textSecondary,
    },
    loadingText: {
      fontSize: theme.typography.caption.fontSize,
      lineHeight: theme.typography.caption.lineHeight,
      fontWeight: theme.typography.caption.fontWeight ?? '400',
      fontFamily: theme.typography.caption.fontFamily,
      color: theme.colors.primary,
      fontStyle: 'italic',
      marginTop: theme.spacing.xs,
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
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600',
      letterSpacing: 0.25,
      textTransform: 'uppercase',
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
    loading: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    custom: {
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
  });
