import React, { useEffect, forwardRef } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { BaseComponentProps } from '../../../types/ui';

type SwitcherProps = BaseComponentProps & {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: string;
  animated?: boolean;
};

interface SwitcherLabelProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Switcher = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  SwitcherProps
>(
  (
    {
      value,
      onValueChange,
      size = 'md',
      variant = 'primary',
      disabled = false,
      style,
      trackColor,
      thumbColor,
      animated = true,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSwitcherStyles);

    // Shared values for animations
    const switchValue = useSharedValue(value ? 1 : 0);
    const pressScale = useSharedValue(1);
    const thumbScale = useSharedValue(1);

    // Update animation when value prop changes
    useEffect(() => {
      if (animated) {
        switchValue.value = withSpring(value ? 1 : 0, {
          damping: 15,
          stiffness: 150,
          mass: 1,
        });
      } else {
        switchValue.value = value ? 1 : 0;
      }
    }, [value, animated, switchValue]);

    // Get colors based on variant and state
    const getVariantColors = () => {
      const offColor = trackColor?.false ?? theme.colors.border;
      let onColor = trackColor?.true;

      if (!onColor) {
        switch (variant) {
          case 'primary':
            onColor = theme.colors.primary;
            break;
          case 'secondary':
            onColor = theme.colors.secondary;
            break;
          case 'outline':
            onColor = theme.colors.primary;
            break;
          case 'filled':
            onColor = theme.colors.primary;
            break;
          case 'ghost':
            onColor = theme.colors.primary;
            break;
          case 'success':
            onColor = theme.colors.success;
            break;
          case 'error':
            onColor = theme.colors.error;
            break;
          case 'warning':
            onColor = theme.colors.warning;
            break;
          case 'info':
            onColor = theme.colors.info;
            break;
          case 'destructive':
            onColor = theme.colors.error;
            break;
          default:
            onColor = '#34C759'; // iOS green
        }
      }

      return { offColor, onColor };
    };

    const { offColor, onColor } = getVariantColors();
    const thumbColorValue = thumbColor ?? '#FFFFFF';

    // Get size-specific dimensions
    const getSizeDimensions = () => {
      switch (size) {
        case 'xs':
          return { width: 24, height: 14, thumbSize: 10, thumbOffset: 2 };
        case 'sm':
          return { width: 28, height: 16, thumbSize: 12, thumbOffset: 2 };
        case 'md':
          return { width: 44, height: 26, thumbSize: 22, thumbOffset: 2 };
        case 'lg':
          return { width: 52, height: 32, thumbSize: 28, thumbOffset: 2 };
        case 'xl':
          return { width: 60, height: 36, thumbSize: 32, thumbOffset: 2 };
        default:
          return { width: 44, height: 26, thumbSize: 22, thumbOffset: 2 };
      }
    };

    const { width, height, thumbSize, thumbOffset } = getSizeDimensions();

    // Animated styles
    const trackAnimatedStyle = useAnimatedStyle(() => {
      const backgroundColor = disabled
        ? theme.colors.border
        : interpolateColor(switchValue.value, [0, 1], [offColor, onColor]);

      return {
        backgroundColor,
        opacity: disabled ? 0.5 : 1,
        transform: [{ scale: pressScale.value }],
        width,
        height,
      };
    });

    const thumbAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        switchValue.value,
        [0, 1],
        [thumbOffset, width - thumbSize - thumbOffset]
      );

      return {
        transform: [{ translateX }, { scale: thumbScale.value }],
        backgroundColor: disabled
          ? theme.colors.textSecondary
          : thumbColorValue,
        width: thumbSize,
        height: thumbSize,
        top: thumbOffset,
      };
    });

    // Handle press with haptic-like feedback
    const handlePress = () => {
      if (disabled || !onValueChange) return;

      // Micro-interactions for better feel
      thumbScale.value = withSpring(
        0.9,
        { damping: 20, stiffness: 300 },
        () => {
          thumbScale.value = withSpring(1, { damping: 20, stiffness: 300 });
        }
      );

      pressScale.value = withSpring(
        0.95,
        { damping: 20, stiffness: 300 },
        () => {
          pressScale.value = withSpring(1, { damping: 20, stiffness: 300 });
        }
      );

      // Trigger callback
      runOnJS(onValueChange)(!value);
    };

    const handlePressIn = () => {
      if (disabled) return;
      pressScale.value = withSpring(0.95, { damping: 20, stiffness: 300 });
    };

    const handlePressOut = () => {
      if (disabled) return;
      pressScale.value = withSpring(1, { damping: 20, stiffness: 300 });
    };

    const trackStyle = [styles.track, style];
    const thumbStyle = [styles.thumb];

    return (
      <AnimatedTouchableOpacity
        ref={ref}
        style={[trackStyle, trackAnimatedStyle]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
      >
        <Animated.View style={[thumbStyle, thumbAnimatedStyle]} />
      </AnimatedTouchableOpacity>
    );
  }
);

Switcher.displayName = 'Switcher';

const SwitcherLabel = forwardRef<
  React.ComponentRef<typeof Animated.View>,
  SwitcherLabelProps
>(({ children, position = 'right', style, ...props }, ref) => {
  const styles = useThemedStyles(createSwitcherLabelStyles);

  return (
    <Animated.View
      ref={ref}
      style={[styles.label, styles[position], style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
});

SwitcherLabel.displayName = 'SwitcherLabel';

const createSwitcherStyles = (theme: Theme) => ({
  track: {
    borderRadius: theme.components.borderRadius.full,
    justifyContent: 'center' as const,
    position: 'relative' as const,
    // iOS-like styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  thumb: {
    borderRadius: theme.components.borderRadius.full,
    position: 'absolute' as const,
    // Enhanced iOS-like shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
});

const createSwitcherLabelStyles = (theme: Theme) => ({
  label: {
    justifyContent: 'center' as const,
  },
  left: {
    marginRight: theme.spacing.sm,
  },
  right: {
    marginLeft: theme.spacing.sm,
  },
});

export { Switcher, SwitcherLabel, type SwitcherProps, type SwitcherLabelProps };
