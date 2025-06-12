import React, { useEffect, forwardRef } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string | keyof Theme['colors'];
  style?: ViewStyle;
  thickness?: number;
  duration?: number;
  animating?: boolean;
}

const Spinner = forwardRef<React.ComponentRef<typeof View>, SpinnerProps>(
  (
    {
      size = 'md',
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

    const getSize = (): number => {
      if (typeof size === 'number') return size;
      switch (size) {
        case 'sm':
          return 16;
        case 'md':
          return 24;
        case 'lg':
          return 32;
        default:
          return 24;
      }
    };

    const spinnerSize = getSize();
    const spinnerColor = resolveColor(theme, color, theme.colors.primary);
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

const createSpinnerStyles = (_: Theme) => ({
  container: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  spinner: {
    borderStyle: 'solid' as const,
  },
});

export { Spinner, type SpinnerProps };
