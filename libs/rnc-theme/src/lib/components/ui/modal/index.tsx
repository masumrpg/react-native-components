import React, {
  forwardRef,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ViewStyle,
  TextStyle,
  Dimensions,
  useWindowDimensions,
  Platform,
  StatusBar,
  InteractionManager,
  StyleProp,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';
import { ComponentSize, ComponentVariant } from '../../../types/ui';

// Types
type ModalPosition = 'center' | 'top' | 'bottom';
type ModalAnimation = 'slide' | 'fade' | 'scale';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: ComponentSize;
  variant?: ComponentVariant;
  position?: ModalPosition;
  animation?: ModalAnimation;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  backdropOpacity?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  animationDuration?: number;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  elevation?: number;
  shadowOpacity?: number;
  backgroundColor?: string;
}

interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  showCloseButton?: boolean;
  onClose?: () => void;
  padding?: keyof Theme['spacing'];
  titleVariant?: keyof Theme['typography'];
  subtitleVariant?: keyof Theme['typography'];
  borderBottom?: boolean;
}

interface ModalContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  padding?: keyof Theme['spacing'];
}

interface ModalFooterProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  showBorder?: boolean;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

// FIXED: Styles dengan safe area handling yang lebih baik
const createModalStyles = (theme: Theme) => StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    // FIXED: Padding yang lebih konsisten
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    // FIXED: Better Android status bar handling
    ...(Platform.OS === 'android' && {
      paddingTop: Math.max(
        (StatusBar.currentHeight ?? 24) + theme.spacing.lg,
        theme.spacing.xl
      ),
    }),
  } ,
  container: {
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
    backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    overflow: 'hidden',
    // FIXED: Better sizing constraints
    maxWidth: '100%',
    maxHeight: '90%',
    minWidth: 280,
    minHeight: 120,
    alignSelf: 'center',
    ...(Platform.OS === 'android' && {
      elevation: 12,
    }),
  } ,
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
  } ,
  closeButtonText: {
    fontSize: 16,
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    fontWeight: '600',
    lineHeight: 16,
  },
});

// Variant styles - no changes needed
const getVariantStyles = (
  variant: ComponentVariant,
  theme: Theme
): ViewStyle => {
  switch (variant) {
    case 'default':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'border', theme.colors.border),
      };
    case 'primary':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'primary', theme.colors.primary),
        borderWidth: 2,
      };
    case 'secondary':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'secondary', theme.colors.secondary),
        borderWidth: 2,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: resolveColor(theme, 'border', theme.colors.border),
        borderWidth: 2,
      };
    case 'filled':
      return {
        backgroundColor: resolveColor(theme, 'primary', theme.colors.primary),
        borderColor: 'transparent',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      };
    case 'success':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'success', theme.colors.success),
        borderWidth: 2,
      };
    case 'error':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'error', theme.colors.error),
        borderWidth: 2,
      };
    case 'warning':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'warning', theme.colors.warning),
        borderWidth: 2,
      };
    case 'info':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'info', theme.colors.info),
        borderWidth: 2,
      };
    case 'destructive':
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'error', theme.colors.error),
        borderWidth: 2,
        shadowColor: resolveColor(theme, 'error', theme.colors.error),
        shadowOpacity: 0.2,
      };
    default:
      return {
        backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
        borderColor: resolveColor(theme, 'border', theme.colors.border),
      };
  }
};

// FIXED: Modal size calculation dengan bounds yang lebih aman
const getModalSize = (
  size: ComponentSize,
  screenWidth: number,
  screenHeight: number
) => {
  // FIXED: Better safe area calculation
  const horizontalPadding = 32; // Total padding horizontal (16 * 2)
  const verticalPadding =
    Platform.OS === 'android'
      ? Math.max((StatusBar.currentHeight ?? 24) + 32, 64)
      : 64;

  const availableWidth = Math.max(screenWidth - horizontalPadding, 280);
  const availableHeight = Math.max(screenHeight - verticalPadding, 400);

  const minWidth = 300;
  const minHeight = 150;

  switch (size) {
    case 'xs':
      return {
        width: Math.min(availableWidth * 0.7, 350),
        maxHeight: Math.min(availableHeight * 0.4, 300),
        minWidth: Math.min(minWidth, availableWidth),
        minHeight,
      };
    case 'sm':
      return {
        width: Math.min(availableWidth * 0.8, 450),
        maxHeight: Math.min(availableHeight * 0.5, 400),
        minWidth: Math.min(minWidth, availableWidth),
        minHeight,
      };
    case 'md':
      return {
        width: Math.min(availableWidth * 0.85, 550),
        maxHeight: Math.min(availableHeight * 0.6, 500),
        minWidth: Math.min(minWidth, availableWidth),
        minHeight,
      };
    case 'lg':
      return {
        width: Math.min(availableWidth * 0.9, 650),
        maxHeight: Math.min(availableHeight * 0.7, 600),
        minWidth: Math.min(minWidth, availableWidth),
        minHeight,
      };
    case 'xl':
      return {
        width: Math.min(availableWidth * 0.95, 800),
        maxHeight: Math.min(availableHeight * 0.8, 700),
        minWidth: Math.min(minWidth, availableWidth),
        minHeight,
      };
    default:
      return {
        width: Math.min(availableWidth * 0.85, 550),
        maxHeight: Math.min(availableHeight * 0.6, 500),
        minWidth: Math.min(minWidth, availableWidth),
        minHeight,
      };
  }
};

// FIXED: Position calculation dengan safe padding
const getModalPosition = (position: ModalPosition): ViewStyle => {
  switch (position) {
    case 'top':
      return {
        justifyContent: 'flex-start',
        alignItems: 'center',
      };
    case 'bottom':
      return {
        justifyContent: 'flex-end',
        alignItems: 'center',
      };
    case 'center':
    default:
      return {
        justifyContent: 'center',
        alignItems: 'center',
      };
  }
};

// MAIN MODAL COMPONENT - FIXED
const Modal = forwardRef<React.ComponentRef<typeof RNModal>, ModalProps>(
  (
    {
      visible,
      onClose,
      children,
      size = 'md',
      variant = 'default',
      position = 'center',
      animation = 'fade',
      closeOnBackdrop = true,
      showCloseButton = true,
      backdropOpacity = 0.5,
      style,
      contentStyle,
      animationDuration = 250,
      padding = 'lg',
      margin,
      borderRadius = 'lg',
      elevation = 8,
      shadowOpacity = 0.15,
      backgroundColor,
      ...props
    },
    ref
  ) => {
    // State management
    const [modalState, setModalState] = useState({
      shouldRender: false,
      isReady: false,
      isAnimating: false,
    });

    const mountedRef = useRef(true);
    const visibleRef = useRef(visible);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // FIXED: Better screen dimensions handling
    const windowDimensions = useWindowDimensions();
    const screenDimensions = Dimensions.get('screen');

    const { width: screenWidth, height: screenHeight } = useMemo(() => {
      // Use the larger of window/screen dimensions for better compatibility
      const width = Math.max(
        windowDimensions.width || 375,
        screenDimensions.width || 375
      );
      const height = Math.max(
        windowDimensions.height || 667,
        screenDimensions.height || 667
      );

      return { width, height };
    }, [windowDimensions, screenDimensions]);

    const { theme } = useTheme();
    const styles = useThemedStyles(createModalStyles);

    // Animation values
    const scale = useSharedValue(animation === 'scale' ? 0.5 : 1);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Calculations
    const modalSize = useMemo(
      () => getModalSize(size, screenWidth, screenHeight),
      [size, screenWidth, screenHeight]
    );

    const modalPosition = useMemo(() => getModalPosition(position), [position]);
    const variantStyles = useMemo(
      () => getVariantStyles(variant, theme),
      [variant, theme]
    );

    // Safe state updater
    const updateModalState = useCallback(
      (updates: Partial<typeof modalState>) => {
        if (mountedRef.current) {
          setModalState((prev) => ({ ...prev, ...updates }));
        }
      },
      []
    );

    // FIXED: Initialize animation values
    const initializeAnimationValues = useCallback(() => {
      'worklet';

      opacity.value = 0;

      if (animation === 'scale') {
        scale.value = 0.5;
      } else {
        scale.value = 1;
      }

      if (animation === 'slide') {
        switch (position) {
          case 'bottom':
            translateY.value = screenHeight * 0.25;
            break;
          case 'top':
            translateY.value = -screenHeight * 0.25;
            break;
          default:
            translateY.value = 0;
        }
      } else {
        translateY.value = 0;
      }
    }, [animation, position, screenHeight, opacity, scale, translateY]);

    // Animation completion handler
    const onAnimationComplete = useCallback(
      (isOpening: boolean) => {
        if (!mountedRef.current) return;

        if (isOpening) {
          updateModalState({ isAnimating: false, isReady: true });
        } else {
          updateModalState({ isAnimating: false });
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              updateModalState({ shouldRender: false, isReady: false });
            }
          }, 50);
        }
      },
      [updateModalState]
    );

    // FIXED: Show modal
    const showModal = useCallback(() => {
      if (!mountedRef.current || modalState.isAnimating) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      updateModalState({
        shouldRender: true,
        isAnimating: true,
        isReady: false,
      });

      initializeAnimationValues();

      InteractionManager.runAfterInteractions(() => {
        if (!mountedRef.current) return;

        timeoutRef.current = setTimeout(() => {
          if (!mountedRef.current) return;

          const springConfig = {
            damping: 20,
            stiffness: 200,
            mass: 1,
          };

          const timingConfig = {
            duration: animationDuration,
          };

          // Backdrop
          opacity.value = withTiming(1, timingConfig);

          // Content
          if (animation === 'scale') {
            scale.value = withSpring(1, springConfig, (finished) => {
              if (finished) runOnJS(onAnimationComplete)(true);
            });
          } else if (animation === 'slide') {
            translateY.value = withSpring(0, springConfig, (finished) => {
              if (finished) runOnJS(onAnimationComplete)(true);
            });
          } else {
            // fade
            runOnJS(onAnimationComplete)(true);
          }
        }, 100);
      });
    }, [
      modalState.isAnimating,
      updateModalState,
      initializeAnimationValues,
      animationDuration,
      animation,
      onAnimationComplete,
      opacity,
      scale,
      translateY,
    ]);

    // FIXED: Hide modal
    const hideModal = useCallback(() => {
      if (!mountedRef.current || modalState.isAnimating) return;

      updateModalState({ isAnimating: true, isReady: false });

      const exitDuration = animationDuration * 0.8;
      const timingConfig = { duration: exitDuration };

      if (animation === 'scale') {
        scale.value = withTiming(0.5, timingConfig);
      } else if (animation === 'slide') {
        const exitTranslateY =
          position === 'bottom'
            ? screenHeight * 0.25
            : position === 'top'
            ? -screenHeight * 0.25
            : 0;
        translateY.value = withTiming(exitTranslateY, timingConfig);
      }

      opacity.value = withTiming(0, timingConfig, (finished) => {
        if (finished) runOnJS(onAnimationComplete)(false);
      });
    }, [
      modalState.isAnimating,
      updateModalState,
      animationDuration,
      animation,
      position,
      screenHeight,
      scale,
      translateY,
      opacity,
      onAnimationComplete,
    ]);

    // Handle visibility changes
    useEffect(() => {
      if (visibleRef.current === visible) return;
      visibleRef.current = visible;

      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }, [visible, showModal, hideModal]);

    // Cleanup
    useEffect(() => {
      return () => {
        mountedRef.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        cancelAnimation(scale);
        cancelAnimation(opacity);
        cancelAnimation(translateY);
      };
    }, [scale, opacity, translateY]);

    // Animated styles
    const animatedOverlayStyle = useAnimatedStyle(
      () => ({
        opacity: Math.max(0, Math.min(1, opacity.value)),
      }),
      []
    );

    const animatedContentStyle = useAnimatedStyle(() => {
      const baseStyle = {
        opacity: Math.max(0, Math.min(1, opacity.value)),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transform: [] as any[],
      };

      if (animation === 'scale') {
        const scaleValue = Math.max(0.1, Math.min(2, scale.value));
        baseStyle.transform.push({ scale: scaleValue });
      } else if (animation === 'slide') {
        const translateValue = Math.max(
          -screenHeight,
          Math.min(screenHeight, translateY.value)
        );
        baseStyle.transform.push({ translateY: translateValue });
      }

      return baseStyle;
    }, [animation, screenHeight]);

    // Event handlers
    const handleBackdropPress = useCallback(() => {
      if (closeOnBackdrop && modalState.isReady && !modalState.isAnimating) {
        onClose();
      }
    }, [closeOnBackdrop, modalState.isReady, modalState.isAnimating, onClose]);

    const handleClosePress = useCallback(() => {
      if (modalState.isReady && !modalState.isAnimating) {
        onClose();
      }
    }, [modalState.isReady, modalState.isAnimating, onClose]);

    if (!modalState.shouldRender) {
      return null;
    }

    return (
      <RNModal
        ref={ref}
        visible={modalState.shouldRender}
        transparent
        animationType="none"
        statusBarTranslucent={Platform.OS === 'android'}
        hardwareAccelerated={Platform.OS === 'android'}
        onRequestClose={handleClosePress}
        {...props}
      >
        <Pressable style={{ flex: 1 }} onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.overlay,
              modalPosition,
              { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` },
              animatedOverlayStyle,
            ]}
          >
            <Pressable>
              <Animated.View
                style={[
                  styles.container,
                  variantStyles,
                  {
                    backgroundColor:
                      backgroundColor ?? variantStyles.backgroundColor,
                    borderRadius: theme.components.borderRadius[borderRadius],
                    padding: theme.spacing[padding],
                    marginBottom: margin ? theme.spacing[margin] : undefined,
                    shadowOpacity: Platform.OS === 'ios' ? shadowOpacity : 0,
                    elevation: Platform.OS === 'android' ? elevation : 0,
                  },
                  modalSize,
                  contentStyle,
                  animatedContentStyle,
                  style,
                ]}
              >
                {showCloseButton && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClosePress}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    disabled={!modalState.isReady}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
                {children}
              </Animated.View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </RNModal>
    );
  }
);

// Header, Content, Footer components - no changes needed
const ModalHeader = forwardRef<
  React.ComponentRef<typeof View>,
  ModalHeaderProps
>(
  (
    {
      title,
      subtitle,
      children,
      style,
      titleStyle,
      subtitleStyle,
      showCloseButton = false,
      onClose,
      padding = 'md',
      titleVariant = 'subtitle',
      subtitleVariant = 'body',
      borderBottom = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <View
        ref={ref}
        style={[
          {
            padding: theme.spacing[padding],
            borderBottomWidth: borderBottom ? 1 : 0,
            borderBottomColor: theme.colors.border,
          },
          style,
        ]}
        {...props}
      >
        {title && (
          <Text
            style={[
              {
                fontSize: theme.typography[titleVariant].fontSize,
                lineHeight: theme.typography[titleVariant].lineHeight,
                color: theme.colors.text,
                fontWeight: '600',
                marginBottom: subtitle ? theme.spacing.xs : 0,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={[
              {
                fontSize: theme.typography[subtitleVariant].fontSize,
                lineHeight: theme.typography[subtitleVariant].lineHeight,
                color: theme.colors.textSecondary,
                fontWeight: '400',
              },
              subtitleStyle,
            ]}
          >
            {subtitle}
          </Text>
        )}
        {children}
        {showCloseButton && onClose && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: theme.spacing.md,
              right: theme.spacing.md,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: theme.colors.background,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const ModalContent = forwardRef<
  React.ComponentRef<typeof View> | React.ComponentRef<typeof ScrollView>,
  ModalContentProps
>(({ children, style, scrollable = false, padding = 'md', ...props }, ref) => {
  const { theme } = useTheme();

  if (scrollable) {
    return (
      <ScrollView
        ref={ref as React.Ref<ScrollView>}
        style={[
          {
            padding: theme.spacing[padding],
          },
          style,
        ]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      ref={ref as React.Ref<View>}
      style={[
        {
          padding: theme.spacing[padding],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

const ModalFooter = forwardRef<
  React.ComponentRef<typeof View>,
  ModalFooterProps
>(
  (
    {
      children,
      style,
      padding = 'md',
      showBorder = false,
      justifyContent = 'flex-end',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <View
        ref={ref}
        style={[
          {
            padding: theme.spacing[padding],
            borderTopWidth: showBorder ? 1 : 0,
            borderTopColor: theme.colors.border,
            flexDirection: 'row',
            justifyContent,
            alignItems: 'center',
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

// Set display names
Modal.displayName = 'Modal';
ModalHeader.displayName = 'ModalHeader';
ModalContent.displayName = 'ModalContent';
ModalFooter.displayName = 'ModalFooter';

export { Modal, ModalHeader, ModalContent, ModalFooter };
export type {
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
};
