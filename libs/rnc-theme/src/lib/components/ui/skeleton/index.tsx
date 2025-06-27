import React, { useEffect } from 'react';
import {
  View,
  ViewStyle,
  DimensionValue,
  StyleProp,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { BaseComponentProps } from '../../../types/ui';
import { getSizeStyles } from '../../../utils';

type SkeletonProps = BaseComponentProps & {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: keyof Theme['components']['borderRadius'];
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

type SkeletonTextProps = BaseComponentProps & {
  lines?: number;
  lineHeight?: number;
  lastLineWidth?: DimensionValue;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

type SkeletonCircleProps = BaseComponentProps & {
  diameter?: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Styles
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.colors.muted,
      overflow: 'hidden',
    },
    animated: {
      backgroundColor: theme.colors.muted,
    },
    // Sizes
    sizeXs: {
      height: 12,
    },
    sizeSm: {
      height: 16,
    },
    sizeMd: {
      height: 20,
    },
    sizeLg: {
      height: 24,
    },
    sizeXl: {
      height: 32,
    },
    // States
    stateDefault: {},
    stateFocus: {},
    stateActive: {},
    stateDisabled: {
      opacity: 0.5,
    },
    stateLoading: {},
    stateError: {},
    stateSuccess: {},
    stateWarning: {},
  });

const Skeleton = React.forwardRef<
  React.ComponentRef<typeof View>,
  SkeletonProps
>(
  (
    {
      width = '100%',
      height = 20,
      borderRadius = 'md',
      animated = true,
      size = 'md',
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);
    const animatedValue = useSharedValue(0);

    useEffect(() => {
      if (animated && !disabled) {
        animatedValue.value = withRepeat(
          withTiming(1, { duration: 1000 }),
          -1,
          true
        );
      } else {
        animatedValue.value = 0;
      }
    }, [animated, disabled, animatedValue]);

    const animatedStyle = useAnimatedStyle(() => {
      if (!animated) {
        return {
          backgroundColor: theme.colors.muted,
        };
      }

      const backgroundColor = interpolateColor(
        animatedValue.value,
        [0, 1],
        [theme.colors.muted, theme.colors.border]
      );

      return {
        backgroundColor,
      };
    }, [animated, theme.colors.muted, theme.colors.border]);

    const skeletonStyles = [
      styles.base,
      getSizeStyles(size, styles),
      {
        width,
        height,
        borderRadius: theme.components.borderRadius[borderRadius],
      },
      style,
    ];

    if (disabled) {
      skeletonStyles.push(styles.stateDisabled);
    }

    return (
      <Animated.View
        ref={ref}
        style={[skeletonStyles, animatedStyle]}
        {...props}
      />
    );
  }
);

const SkeletonText = React.forwardRef<
  React.ComponentRef<typeof View>,
  SkeletonTextProps
>(
  (
    {
      lines = 3,
      lineHeight = 20,
      lastLineWidth = '60%',
      animated = true,
      size = 'md',
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <View ref={ref} style={style} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            width={index === lines - 1 ? lastLineWidth : '100%'}
            height={lineHeight}
            animated={animated}
            size={size}
            disabled={disabled}
            style={{
              marginBottom: index < lines - 1 ? 8 : 0,
            }}
          />
        ))}
      </View>
    );
  }
);

const SkeletonCircle = React.forwardRef<
  React.ComponentRef<typeof View>,
  SkeletonCircleProps
>(
  (
    {
      diameter = 40,
      animated = true,
      size = 'md',
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <Skeleton
        ref={ref}
        width={diameter}
        height={diameter}
        borderRadius="full"
        animated={animated}
        size={size}
        disabled={disabled}
        style={style}
        {...props}
      />
    );
  }
);

// Display names for debugging
Skeleton.displayName = 'Skeleton';
SkeletonText.displayName = 'SkeletonText';
SkeletonCircle.displayName = 'SkeletonCircle';

export { Skeleton, SkeletonText, SkeletonCircle };
export type { SkeletonProps, SkeletonTextProps, SkeletonCircleProps };
