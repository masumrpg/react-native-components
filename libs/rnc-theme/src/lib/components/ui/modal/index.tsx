import React, { forwardRef, useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils/color';
import { Theme } from '../../../types/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
const createModalStyles = (theme: Theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
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
    position: 'relative',
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

const getModalSize = (size: ModalSize, position: ModalPosition) => {
  const baseWidth = screenWidth * 0.9;
  const baseHeight = screenHeight * 0.8;

  switch (size) {
    case 'sm':
      return {
        width: Math.min(baseWidth, 400),
        maxHeight: baseHeight * 0.6,
      };
    case 'md':
      return {
        width: Math.min(baseWidth, 500),
        maxHeight: baseHeight * 0.7,
      };
    case 'lg':
      return {
        width: Math.min(baseWidth, 600),
        maxHeight: baseHeight * 0.8,
      };
    case 'xl':
      return {
        width: Math.min(baseWidth, 800),
        maxHeight: baseHeight * 0.9,
      };
    case 'full':
      return {
        width: screenWidth,
        height: screenHeight,
      };
    default:
      return {
        width: Math.min(baseWidth, 500),
        maxHeight: baseHeight * 0.7,
      };
  }
};

const getModalPosition = (position: ModalPosition): ViewStyle => {
  switch (position) {
    case 'top':
      return {
        justifyContent: 'flex-start' as const,
        paddingTop: 50,
      };
    case 'bottom':
      return {
        justifyContent: 'flex-end' as const,
        paddingBottom: 50,
      };
    case 'center':
    default:
      return {
        justifyContent: 'center' as const,
      };
  }
};

// Components
const Modal = forwardRef<React.ComponentRef<typeof RNModal>, ModalProps>(
  (
    {
      visible,
      onClose,
      children,
      size = 'md',
      position = 'center',
      animation = 'scale',
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
    const { theme } = useTheme();
    const styles = useThemedStyles(createModalStyles);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(
      position === 'bottom' ? 300 : position === 'top' ? -300 : 0
    );

    useEffect(() => {
      if (visible) {
        opacity.value = withTiming(1, { duration: animationDuration });

        if (animation === 'scale') {
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 150,
          });
        } else if (animation === 'slide') {
          translateY.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
          });
        } else {
          scale.value = withTiming(1, { duration: animationDuration });
        }
      } else {
        opacity.value = withTiming(0, { duration: animationDuration });

        if (animation === 'scale') {
          scale.value = withTiming(0, { duration: animationDuration });
        } else if (animation === 'slide') {
          translateY.value = withTiming(
            position === 'bottom' ? 300 : position === 'top' ? -300 : 0,
            { duration: animationDuration }
          );
        } else {
          scale.value = withTiming(0, { duration: animationDuration });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, animation, position, animationDuration]);

    const animatedOverlayStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    const animatedContentStyle = useAnimatedStyle(() => {
      const baseStyle = {
        opacity: opacity.value,
      };

      if (animation === 'scale') {
        return {
          ...baseStyle,
          transform: [{ scale: scale.value }],
        };
      } else if (animation === 'slide') {
        return {
          ...baseStyle,
          transform: [{ translateY: translateY.value }],
        };
      }

      return baseStyle;
    });

    const modalSize = getModalSize(size, position);
    const modalPosition = getModalPosition(position);

    const handleBackdropPress = () => {
      if (closeOnBackdrop) {
        onClose();
      }
    };

    return (
      <RNModal
        ref={ref}
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
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
                    shadowOpacity,
                    elevation,
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
                    onPress={onClose}
                    activeOpacity={0.7}
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