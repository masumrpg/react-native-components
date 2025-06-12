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
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';

// Types
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ModalPosition = 'center' | 'top' | 'bottom';
type ModalAnimation = 'slide' | 'fade' | 'scale';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  animation?: ModalAnimation;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  backdropOpacity?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  animationDuration?: number;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  borderRadius?: keyof Theme['borderRadius'];
  elevation?: number;
  shadowOpacity?: number;
  backgroundColor?: string;
}

interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
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
  style?: ViewStyle;
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
// Optimized styles with Android-specific fixes
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
    // Android-specific fixes
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
    // Remove position: 'relative' to fix Android positioning
    alignSelf: 'center',
    // Android-specific optimizations
    ...(Platform.OS === 'android' && {
      elevation: 8, // Higher elevation for better visibility
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

// Optimized modal size calculation with better Android support
const getModalSize = (
  size: ModalSize,
  screenWidth: number,
  screenHeight: number
) => {
  // Use more conservative sizing for Android
  const safeAreaMultiplier = Platform.OS === 'android' ? 0.85 : 0.9;
  const baseWidth = screenWidth * safeAreaMultiplier;
  const baseHeight = screenHeight * 0.8;

  // Ensure minimum dimensions for Android
  const minWidth = Platform.OS === 'android' ? 280 : 300;
  const minHeight = Platform.OS === 'android' ? 200 : 250;

  switch (size) {
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
    case 'full':
      return {
        width: screenWidth,
        height: screenHeight,
      };
    default:
      return {
        width: Math.max(Math.min(baseWidth, 500), minWidth),
        maxHeight: Math.max(baseHeight * 0.7, minHeight),
        minWidth,
      };
  }
};

// Optimized position calculation
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

// FIXED MODAL COMPONENT
const Modal = forwardRef<React.ComponentRef<typeof RNModal>, ModalProps>(
  (
    {
      visible,
      onClose,
      children,
      size = 'md',
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
    // State management untuk race condition fix
    const [isModalReady, setIsModalReady] = useState(false);
    const [shouldShowModal, setShouldShowModal] = useState(false);

    // Refs untuk tracking
    const isAnimatingRef = useRef(false);
    const mountedRef = useRef(true);
    const visibleRef = useRef(visible);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Screen dimensions dengan proper handling
    const windowDimensions = useWindowDimensions();
    const screenDimensions = Dimensions.get('screen');

    const { width: screenWidth, height: screenHeight } = useMemo(() => {
      // Pastikan dimensi selalu valid
      const fallbackWidth = 375;
      const fallbackHeight = 667;

      if (Platform.OS === 'android') {
        return {
          width: screenDimensions.width || fallbackWidth,
          height: screenDimensions.height || fallbackHeight,
        };
      }

      return {
        width: windowDimensions.width || fallbackWidth,
        height: windowDimensions.height || fallbackHeight,
      };
    }, [windowDimensions, screenDimensions]);

    const { theme } = useTheme();
    const styles = useThemedStyles(createModalStyles);

    // Animation values dengan proper initialization
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Initialize animation values berdasarkan position
    const initializeAnimationValues = useCallback(() => {
      'worklet';
      scale.value = animation === 'scale' ? 0.1 : 1; // Prevent 0 scale
      opacity.value = 0;

      if (animation === 'slide') {
        switch (position) {
          case 'bottom':
            translateY.value = screenHeight * 0.5;
            break;
          case 'top':
            translateY.value = -screenHeight * 0.5;
            break;
          default:
            translateY.value = 0;
        }
      } else {
        translateY.value = 0;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation, position, screenHeight]);

    // Memoized calculations
    const modalSize = useMemo(
      () => getModalSize(size, screenWidth, screenHeight),
      [size, screenWidth, screenHeight]
    );

    const modalPosition = useMemo(() => getModalPosition(position), [position]);

    // Safe state updater
    const safeSetState = useCallback((setter: () => void) => {
      if (mountedRef.current) {
        setter();
      }
    }, []);

    // Animation completion handler
    const onAnimationComplete = useCallback(
      (isOpening: boolean) => {
        isAnimatingRef.current = false;

        if (!isOpening && mountedRef.current) {
          // Delay hiding modal untuk memastikan animation selesai
          timeoutRef.current = setTimeout(() => {
            safeSetState(() => setShouldShowModal(false));
          }, 50);
        }
      },
      [safeSetState]
    );

    // Show modal dengan proper sequencing
    const showModal = useCallback(() => {
      if (!mountedRef.current || isAnimatingRef.current) return;

      // Reset state
      isAnimatingRef.current = true;
      setIsModalReady(false);
      setShouldShowModal(true);

      // Initialize animation values
      initializeAnimationValues();

      // Wait for modal to be rendered
      InteractionManager.runAfterInteractions(() => {
        if (!mountedRef.current) return;

        // Additional delay untuk Android
        const readyDelay = Platform.OS === 'android' ? 100 : 50;

        setTimeout(() => {
          if (!mountedRef.current) return;

          safeSetState(() => setIsModalReady(true));

          // Start animations
          const springConfig = {
            damping: Platform.OS === 'android' ? 20 : 15,
            stiffness: Platform.OS === 'android' ? 120 : 150,
            mass: 1,
          };

          // Backdrop animation
          opacity.value = withTiming(1, {
            duration: animationDuration * 0.8,
          });

          // Content animation
          const contentDelay = Platform.OS === 'android' ? 150 : 100;

          setTimeout(() => {
            if (!mountedRef.current) return;

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
              scale.value = withTiming(
                1,
                {
                  duration: animationDuration,
                },
                (finished) => {
                  if (finished) {
                    runOnJS(onAnimationComplete)(true);
                  }
                }
              );
            }
          }, contentDelay);
        }, readyDelay);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      animation,
      animationDuration,
      initializeAnimationValues,
      onAnimationComplete,
      safeSetState,
    ]);

    // Hide modal
    const hideModal = useCallback(() => {
      if (!mountedRef.current || isAnimatingRef.current) return;

      isAnimatingRef.current = true;

      const exitDuration =
        Platform.OS === 'android'
          ? animationDuration * 0.6
          : animationDuration * 0.8;

      // Content animation out
      if (animation === 'scale') {
        scale.value = withTiming(0.1, { duration: exitDuration });
      } else if (animation === 'slide') {
        const exitTranslateY =
          position === 'bottom'
            ? screenHeight * 0.5
            : position === 'top'
            ? -screenHeight * 0.5
            : 0;
        translateY.value = withTiming(exitTranslateY, {
          duration: exitDuration,
        });
      } else {
        scale.value = withTiming(0.1, { duration: exitDuration });
      }

      // Backdrop animation out
      opacity.value = withTiming(
        0,
        {
          duration: exitDuration,
        },
        (finished) => {
          if (finished) {
            runOnJS(onAnimationComplete)(false);
          }
        }
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      animation,
      animationDuration,
      onAnimationComplete,
      position,
      screenHeight,
    ]);

    // Handle visibility changes
    useEffect(() => {
      visibleRef.current = visible;

      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Animated styles
    const animatedOverlayStyle = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );

    const animatedContentStyle = useAnimatedStyle(() => {
      const baseStyle = {
        opacity: Math.max(opacity.value, 0),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transform: [] as any[],
      };

      if (animation === 'scale') {
        // Ensure minimum scale untuk prevent invisible modal
        const scaleValue = Math.max(scale.value, 0.01);
        baseStyle.transform.push({ scale: scaleValue });
      } else if (animation === 'slide') {
        baseStyle.transform.push({ translateY: translateY.value });
      }

      return baseStyle;
    }, [animation]);

    // Event handlers
    const handleBackdropPress = useCallback(() => {
      if (closeOnBackdrop && !isAnimatingRef.current && isModalReady) {
        onClose();
      }
    }, [closeOnBackdrop, onClose, isModalReady]);

    const handleClosePress = useCallback(() => {
      if (!isAnimatingRef.current && isModalReady) {
        onClose();
      }
    }, [onClose, isModalReady]);

    // Don't render until modal should be shown
    if (!shouldShowModal) {
      return null;
    }

    return (
      <RNModal
        ref={ref}
        visible={shouldShowModal}
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
                  {
                    backgroundColor: resolveColor(
                      theme,
                      backgroundColor,
                      theme.colors.surface
                    ),
                    borderRadius: theme.borderRadius[borderRadius],
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
                    disabled={!isModalReady}
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
