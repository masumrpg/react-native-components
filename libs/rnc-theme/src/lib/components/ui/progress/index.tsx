import React, { useEffect, forwardRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { ComponentSize, ComponentVariant } from '../../../types/ui';
import { resolveColor } from '../../../utils';

interface ProgressProps {
  children?: React.ReactNode;
  value?: number; // 0-100
  max?: number;
  size?: ComponentSize;
  variant?: ComponentVariant;
  style?: StyleProp<ViewStyle>;
  trackColor?: keyof Theme['colors'];
  animated?: boolean;
}

interface ProgressFilledTrackProps {
  style?: StyleProp<ViewStyle>;
  color?: keyof Theme['colors'];
}

const Progress = forwardRef<React.ComponentRef<typeof View>, ProgressProps>(
  (
    {
      children,
      value = 0,
      max = 100,
      size = 'md',
      variant = 'default',
      style,
      trackColor,
      animated = true,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createProgressStyles);

    const progressValue = Math.min(Math.max(value, 0), max);
    const percentage = (progressValue / max) * 100;

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          styles[size],
          {
            backgroundColor: resolveColor(
              theme,
              trackColor,
              theme.colors.border
            ),
          },
          style,
        ]}
      >
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            child.type === ProgressFilledTrack
          ) {
            return React.cloneElement(
              child as React.ReactElement<
                ProgressFilledTrackProps & {
                  percentage?: number;
                  variant?: ComponentVariant;
                  animated?: boolean;
                }
              >,
              {
                percentage,
                variant,
                animated,
              }
            );
          }
          return child;
        })}
      </View>
    );
  }
);

Progress.displayName = 'Progress';

const ProgressFilledTrack = forwardRef<
  React.ComponentRef<typeof View>,
  ProgressFilledTrackProps & {
    percentage?: number;
    variant?: ComponentVariant;
    animated?: boolean;
  }
>(
  (
    {
      style,
      color,
      percentage = 0,
      variant = 'default',
      animated = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createProgressFilledTrackStyles);

    // Reanimated shared values
    const animatedWidth = useSharedValue(0);

    const getVariantColor = (
      variant: ComponentVariant,
      color: keyof Theme['colors'] | undefined
    ): string => {
      if (color) {
        if (typeof color === 'string' && color.startsWith('#')) return color;
        return theme.colors[color] || color;
      }

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
          return theme.colors.primary;
        case 'filled':
          return theme.colors.primary;
        case 'ghost':
          return theme.colors.primary;
        default:
          return theme.colors.primary;
      }
    };

    // Update animated value when percentage changes
    useEffect(() => {
      if (animated) {
        animatedWidth.value = withTiming(percentage, {
          duration: 500,
          easing: Easing.out(Easing.cubic),
        });
      } else {
        animatedWidth.value = percentage;
      }
    }, [percentage, animated, animatedWidth]);

    // Animated style for width
    const animatedStyle = useAnimatedStyle(() => {
      return {
        width: `${animatedWidth.value}%`,
      };
    });

    if (animated) {
      return (
        <Animated.View
          ref={ref}
          style={[
            styles.filledTrack,
            {
              backgroundColor: getVariantColor(variant, color),
            },
            animatedStyle,
            style,
          ]}
          {...props}
        />
      );
    }

    return (
      <View
        ref={ref}
        style={[
          styles.filledTrack,
          {
            width: `${percentage}%`,
            backgroundColor: getVariantColor(variant, color),
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

ProgressFilledTrack.displayName = 'ProgressFilledTrack';

const createProgressStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: theme.components.borderRadius.full,
      overflow: 'hidden',
    },
    xs: {
      height: 2,
    },
    sm: {
      height: 4,
    },
    md: {
      height: 8,
    },
    lg: {
      height: 12,
    },
    xl: {
      height: 16,
    },
  });

const createProgressFilledTrackStyles = (theme: Theme) => StyleSheet.create({
  filledTrack: {
    height: '100%',
    borderRadius: theme.components.borderRadius.full,
  },
  animated: {
    // Styles for animated version are handled by useAnimatedStyle
  },
});

export {
  Progress,
  ProgressFilledTrack,
  type ProgressProps,
  type ProgressFilledTrackProps,
};
