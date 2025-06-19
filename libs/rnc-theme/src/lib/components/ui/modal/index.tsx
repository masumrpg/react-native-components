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
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  Dimensions,
  useWindowDimensions,
  Platform,
  StatusBar,
  InteractionManager,
  StyleProp,
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

// Styles
const createModalStyles = (theme: Theme) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    ...(Platform.OS === 'android' && {
      paddingTop: (StatusBar.currentHeight || 0) + theme.spacing.lg,
    }),
  } as ViewStyle,
  container: {
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
    backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
    maxWidth: '100%',
    alignSelf: 'center',
    ...(Platform.OS === 'android' && {
      elevation: 8,
    }),
  } as ViewStyle,
  closeButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  } as ViewStyle,
  closeButtonText: {
    fontSize: 18,
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    fontWeight: '600',
    lineHeight: 18,
  } as TextStyle,
});

// Variant styles
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

// Modal size calculation
const getModalSize = (
  size: ComponentSize,
  screenWidth: number,
  screenHeight: number
) => {
  const safeAreaMultiplier = Platform.OS === 'android' ? 0.85 : 0.9;
  const baseWidth = screenWidth * safeAreaMultiplier;
  const baseHeight = screenHeight * 0.8;

  const minWidth = Platform.OS === 'android' ? 280 : 300;
  const minHeight = Platform.OS === 'android' ? 200 : 250;

  switch (size) {
    case 'xs':
      return {
        width: Math.max(Math.min(baseWidth, 320), minWidth),
        maxHeight: Math.max(baseHeight * 0.5, minHeight),
        minWidth,
      };
    case 'sm':
      return {
        width: Math.max(Math.min(baseWidth, 400), minWidth),
        maxHeight: Math.max(baseHeight * 0.6, minHeight),
        minWidth,
      };
    case 'md':
      return {
        width: Math.max(Math.min(baseWidth, 500), minWidth),
        maxHeight: Math.max(baseHeight * 0.7, minHeight),
        minWidth,
      };
    case 'lg':
      return {
        width: Math.max(Math.min(baseWidth, 600), minWidth),
        maxHeight: Math.max(baseHeight * 0.8, minHeight),
        minWidth,
      };
    case 'xl':
      return {
        width: Math.max(Math.min(baseWidth, 800), minWidth),
        maxHeight: Math.max(baseHeight * 0.9, minHeight),
        minWidth,
      };
    default:
      return {
        width: Math.max(Math.min(baseWidth, 500), minWidth),
        maxHeight: Math.max(baseHeight * 0.7, minHeight),
        minWidth,
      };
  }
};

// Position calculation
const getModalPosition = (position: ModalPosition): ViewStyle => {
  const androidPadding = Platform.OS === 'android' ? 20 : 50;

  switch (position) {
    case 'top':
      return {
        justifyContent: 'flex-start' as const,
        paddingTop: androidPadding,
      };
    case 'bottom':
      return {
        justifyContent: 'flex-end' as const,
        paddingBottom: androidPadding,
      };
    case 'center':
    default:
      return {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      };
  }
};

// FIXED MODAL COMPONENT - Race Condition Fixes Applied
const Modal = forwardRef<React.ComponentRef<typeof RNModal>, ModalProps>(
  (
    {
      visible,
      onClose,
      children,
      size = 'md',
      variant = 'default',
      position = 'center',
      animation = 'slide',
      closeOnBackdrop = true,
      showCloseButton = true,
      backdropOpacity = 0.5,
      style,
      contentStyle,
      animationDuration = 300,
      padding = 'md',
      margin,
      borderRadius = 'lg',
      elevation = 3,
      shadowOpacity = 0.1,
      backgroundColor,
      ...props
    },
    ref
  ) => {
    // FIXED: Better state management dengan atomic updates
    const [modalState, setModalState] = useState({
      shouldRender: false,
      isReady: false,
      isAnimating: false,
    });

    // Refs untuk tracking lifecycle
    const mountedRef = useRef(true);
    const visibleRef = useRef(visible);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const readyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Screen dimensions dengan better error handling
    const windowDimensions = useWindowDimensions();
    const screenDimensions = Dimensions.get('screen');

    const { width: screenWidth, height: screenHeight } = useMemo(() => {
      const fallbackWidth = 375;
      const fallbackHeight = 667;

      // Gunakan screen dimensions untuk Android, window untuk iOS
      if (Platform.OS === 'android') {
        return {
          width: Math.max(screenDimensions.width || fallbackWidth, 280),
          height: Math.max(screenDimensions.height || fallbackHeight, 500),
        };
      }

      return {
        width: Math.max(windowDimensions.width || fallbackWidth, 280),
        height: Math.max(windowDimensions.height || fallbackHeight, 500),
      };
    }, [windowDimensions, screenDimensions]);

    const { theme } = useTheme();
    const styles = useThemedStyles(createModalStyles);

    // FIXED: Animation values dengan safe initialization
    const scale = useSharedValue(animation === 'scale' ? 0.3 : 1);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(0);

    // FIXED: Memoized calculations dengan dependency yang tepat
    const modalSize = useMemo(
      () => getModalSize(size, screenWidth, screenHeight),
      [size, screenWidth, screenHeight]
    );

    const modalPosition = useMemo(() => getModalPosition(position), [position]);

    const variantStyles = useMemo(
      () => getVariantStyles(variant, theme),
      [variant, theme]
    );

    // FIXED: Safe state updater dengan atomic operations
    const updateModalState = useCallback(
      (updates: Partial<typeof modalState>) => {
        if (mountedRef.current) {
          setModalState((prev) => ({ ...prev, ...updates }));
        }
      },
      []
    );

    // FIXED: Initialize animation values dengan proper sequencing
    const initializeAnimationValues = useCallback(() => {
      'worklet'

      // Reset ke initial state yang aman
      opacity.value = 0;

      if (animation === 'scale') {
        scale.value = 0.3; // Tidak terlalu kecil untuk menghindari visual glitch
      } else {
        scale.value = 1;
      }

      if (animation === 'slide') {
        switch (position) {
          case 'bottom':
            translateY.value = screenHeight * 0.3; // Lebih kecil untuk smooth animation
            break;
          case 'top':
            translateY.value = -screenHeight * 0.3;
            break;
          default:
            translateY.value = 0;
        }
      } else {
        translateY.value = 0;
      }
    }, [animation, position, screenHeight, opacity, scale, translateY]);

    // FIXED: Animation completion handler
    const onAnimationComplete = useCallback(
      (isOpening: boolean) => {
        if (!mountedRef.current) return;

        if (isOpening) {
          updateModalState({ isAnimating: false, isReady: true });
        } else {
          updateModalState({ isAnimating: false });

          // Delay untuk memastikan animation selesai sebelum unmount
          animationTimeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              updateModalState({ shouldRender: false, isReady: false });
            }
          }, 100);
        }
      },
      [updateModalState]
    );

    // FIXED: Show modal dengan proper timing dan sequencing
    const showModal = useCallback(() => {
      if (!mountedRef.current || modalState.isAnimating) return;

      // Clear any pending timeouts
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
        readyTimeoutRef.current = null;
      }

      // Step 1: Update state dan initialize animations
      updateModalState({
        shouldRender: true,
        isAnimating: true,
        isReady: false,
      });

      // Step 2: Initialize animation values IMMEDIATELY
      initializeAnimationValues();

      // Step 3: Wait for render cycle
      InteractionManager.runAfterInteractions(() => {
        if (!mountedRef.current) return;

        // Step 4: Start animations dengan delay yang cukup
        readyTimeoutRef.current = setTimeout(
          () => {
            if (!mountedRef.current) return;

            const springConfig = {
              damping: Platform.OS === 'android' ? 25 : 20,
              stiffness: Platform.OS === 'android' ? 300 : 250,
              mass: 1,
            };

            const timingConfig = {
              duration: animationDuration,
            };

            // Backdrop fade in
            opacity.value = withTiming(1, timingConfig);

            // Content animation
            if (animation === 'scale') {
              scale.value = withSpring(1, springConfig, (finished) => {
                if (finished) {
                  runOnJS(onAnimationComplete)(true);
                }
              });
            } else if (animation === 'slide') {
              translateY.value = withSpring(0, springConfig, (finished) => {
                if (finished) {
                  runOnJS(onAnimationComplete)(true);
                }
              });
            } else {
              // fade animation
              scale.value = withTiming(1, timingConfig, (finished) => {
                if (finished) {
                  runOnJS(onAnimationComplete)(true);
                }
              });
            }
          },
          Platform.OS === 'android' ? 150 : 100
        );
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

    // FIXED: Hide modal dengan proper cleanup
    const hideModal = useCallback(() => {
      if (!mountedRef.current || modalState.isAnimating) return;

      updateModalState({ isAnimating: true, isReady: false });

      const exitDuration =
        Platform.OS === 'android'
          ? animationDuration * 0.7
          : animationDuration * 0.8;

      const timingConfig = { duration: exitDuration };

      // Content animation out
      if (animation === 'scale') {
        scale.value = withTiming(0.3, timingConfig);
      } else if (animation === 'slide') {
        const exitTranslateY =
          position === 'bottom'
            ? screenHeight * 0.3
            : position === 'top'
            ? -screenHeight * 0.3
            : 0;
        translateY.value = withTiming(exitTranslateY, timingConfig);
      } else {
        scale.value = withTiming(0.3, timingConfig);
      }

      // Backdrop fade out
      opacity.value = withTiming(0, timingConfig, (finished) => {
        if (finished) {
          runOnJS(onAnimationComplete)(false);
        }
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

    // FIXED: Handle visibility changes dengan debouncing
    useEffect(() => {
      // Prevent rapid toggle
      if (visibleRef.current === visible) return;
      visibleRef.current = visible;

      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }, [visible, showModal, hideModal]);

    // FIXED: Cleanup dengan proper cancellation
    useEffect(() => {
      return () => {
        mountedRef.current = false;

        // Clear timeouts
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
        if (readyTimeoutRef.current) {
          clearTimeout(readyTimeoutRef.current);
        }

        // Cancel animations
        cancelAnimation(scale);
        cancelAnimation(opacity);
        cancelAnimation(translateY);
      };
    }, [scale, opacity, translateY]);

    // FIXED: Animated styles dengan safe values
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
        // Ensure safe scale values
        const scaleValue = Math.max(0.1, Math.min(2, scale.value));
        baseStyle.transform.push({ scale: scaleValue });
      } else if (animation === 'slide') {
        // Clamp translate values
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

    // FIXED: Don't render until state is properly set
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
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.overlay,
              modalPosition,
              { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` },
              animatedOverlayStyle,
            ]}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.container,
                  variantStyles,
                  {
                    backgroundColor: backgroundColor
                      ? resolveColor(theme, backgroundColor, backgroundColor)
                      : variantStyles.backgroundColor,
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
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  }
);

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
      padding = 'sm',
      titleVariant = 'subtitle',
      subtitleVariant = 'body',
      borderBottom = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createModalStyles);

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
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const ModalContent = forwardRef<
  React.ComponentRef<typeof View>,
  ModalContentProps
>(({ children, style, scrollable = false, padding = 'sm', ...props }, ref) => {
  const { theme } = useTheme();

  if (scrollable) {
    const { ScrollView } = require('react-native');
    return (
      <ScrollView
        ref={ref}
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
      ref={ref}
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
      padding = 'sm',
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
