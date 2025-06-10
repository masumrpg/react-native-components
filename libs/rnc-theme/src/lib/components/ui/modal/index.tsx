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
}

interface ModalContentProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
}

interface ModalFooterProps {
  children?: React.ReactNode;
  style?: ViewStyle;
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  container: {
    backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
    borderRadius: theme.borderRadius.lg,
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: resolveColor(theme, 'border', theme.colors.border),
  } as ViewStyle,
  headerContent: {
    flex: 1,
  } as ViewStyle,
  title: {
    ...theme.typography.title,
    color: resolveColor(theme, 'text', theme.colors.text),
    marginBottom: theme.spacing.xs,
  } as TextStyle,
  subtitle: {
    ...theme.typography.small,
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
  } as TextStyle,
  closeButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
  } as ViewStyle,
  closeButtonText: {
    ...theme.typography.body,
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    fontWeight: 'bold',
  } as TextStyle,
  content: {
    padding: theme.spacing.lg,
  } as ViewStyle,
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: resolveColor(theme, 'border', theme.colors.border),
  } as ViewStyle,
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
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createModalStyles);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(position === 'bottom' ? 300 : position === 'top' ? -300 : 0);

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
                  modalSize,
                  contentStyle,
                  animatedContentStyle,
                  style,
                ]}
              >
                {showCloseButton && (
                  <View style={styles.header}>
                    <View style={styles.headerContent} />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
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

const ModalHeader = forwardRef<React.ComponentRef<typeof View>, ModalHeaderProps>(
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
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createModalStyles);

    return (
      <View ref={ref} style={[styles.header, style]} {...props}>
        <View style={styles.headerContent}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
          {children}
        </View>
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

const ModalContent = forwardRef<React.ComponentRef<typeof View>, ModalContentProps>(
  ({ children, style, scrollable = false, ...props }, ref) => {
    const styles = useThemedStyles(createModalStyles);

    if (scrollable) {
      const { ScrollView } = require('react-native');
      return (
        <ScrollView
          ref={ref}
          style={[styles.content, style]}
          showsVerticalScrollIndicator={false}
          {...props}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View ref={ref} style={[styles.content, style]} {...props}>
        {children}
      </View>
    );
  }
);

const ModalFooter = forwardRef<React.ComponentRef<typeof View>, ModalFooterProps>(
  ({ children, style, justifyContent = 'flex-end', ...props }, ref) => {
    const styles = useThemedStyles(createModalStyles);

    return (
      <View
        ref={ref}
        style={[
          styles.footer,
          {
            justifyContent,
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