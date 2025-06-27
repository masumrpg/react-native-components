import React, { useEffect, forwardRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';
import { ComponentSize, ComponentVariant } from '../../../types/ui';

interface SpinnerProps {
  size?: ComponentSize | number;
  variant?: ComponentVariant;
  color?: keyof Theme['colors'];
  style?: StyleProp<ViewStyle>;
  thickness?: number;
  duration?: number;
  animating?: boolean;
}

// Variant styling function
const getVariantColor = (variant: ComponentVariant, theme: Theme): string => {
  switch (variant) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.error;
    case 'warning':
      return theme.colors.warning;
    case 'info':
      return theme.colors.info;
    case 'destructive':
      return theme.colors.destructive;
    case 'outline':
      return theme.colors.border;
    case 'filled':
      return theme.colors.primary;
    case 'ghost':
      return `${theme.colors.primary}60`;
    case 'default':
    default:
      return theme.colors.primary;
  }
};

// Size function
const getSpinnerSize = (size: ComponentSize | number): number => {
  if (typeof size === 'number') return size;
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 16;
    case 'md':
      return 24;
    case 'lg':
      return 32;
    case 'xl':
      return 40;
    default:
      return 24;
  }
};

const Spinner = forwardRef<React.ComponentRef<typeof View>, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'default',
      color,
      style,
      thickness = 2,
      duration = 1000,
      animating = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSpinnerStyles);
    const rotation = useSharedValue(0);

    useEffect(() => {
      if (animating) {
        // Reset rotation to 0 before starting animation
        rotation.value = 0;

        // Start infinite rotation animation
        rotation.value = withRepeat(
          withTiming(360, {
            duration,
          }),
          -1, // infinite repeat
          false // don't reverse
        );
      } else {
        // Cancel animation when not animating
        cancelAnimation(rotation);
      }

      // Cleanup function to cancel animation on unmount
      return () => {
        cancelAnimation(rotation);
      };
    }, [animating, duration, rotation]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            rotate: `${rotation.value}deg`,
          },
        ],
      };
    }, []);

    const spinnerSize = getSpinnerSize(size);
    const variantColor = getVariantColor(variant, theme);
    const spinnerColor = color
      ? resolveColor(theme, color, variantColor)
      : variantColor;
    const borderRadius = spinnerSize / 2;

    // Create gradient effect for better visual appeal
    const gradientColors = {
      transparent: `${spinnerColor}00`,
      light: `${spinnerColor}40`,
      medium: `${spinnerColor}80`,
      full: spinnerColor,
    };

    if (!animating) {
      return null;
    }

    return (
      <View ref={ref} style={[styles.container, style]} {...props}>
        <Animated.View
          style={[
            styles.spinner,
            {
              width: spinnerSize,
              height: spinnerSize,
              borderRadius,
              borderWidth: thickness,
              borderTopColor: gradientColors.full,
              borderRightColor: gradientColors.medium,
              borderBottomColor: gradientColors.light,
              borderLeftColor: gradientColors.transparent,
            },
            animatedStyle,
          ]}
        />
      </View>
    );
  }
);

Spinner.displayName = 'Spinner';

const createSpinnerStyles = (_: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    spinner: {
      borderStyle: 'solid',
    },
  });

export { Spinner, type SpinnerProps };
