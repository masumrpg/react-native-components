import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle, DimensionValue } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import {
  BaseComponentProps,
} from '../../../types/ui';
import { getSizeStyles } from '../../../utils';

type SkeletonProps = BaseComponentProps & {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: keyof Theme['components']['borderRadius'];
  animated?: boolean;
  style?: ViewStyle;
};

type SkeletonTextProps = BaseComponentProps & {
  lines?: number;
  lineHeight?: number;
  lastLineWidth?: DimensionValue;
  animated?: boolean;
  style?: ViewStyle;
};

type SkeletonCircleProps = BaseComponentProps & {
  diameter?: number;
  animated?: boolean;
  style?: ViewStyle;
};

// Styles
const createStyles = (theme: Theme) =>
  ({
    base: {
      backgroundColor: theme.colors.muted,
      overflow: 'hidden',
    } as ViewStyle,
    animated: {
      backgroundColor: theme.colors.muted,
    } as ViewStyle,
    // Sizes
    sizeXs: {
      height: 12,
    } as ViewStyle,
    sizeSm: {
      height: 16,
    } as ViewStyle,
    sizeMd: {
      height: 20,
    } as ViewStyle,
    sizeLg: {
      height: 24,
    } as ViewStyle,
    sizeXl: {
      height: 32,
    } as ViewStyle,
    // States
    stateDefault: {} as ViewStyle,
    stateFocus: {} as ViewStyle,
    stateActive: {} as ViewStyle,
    stateDisabled: {
      opacity: 0.5,
    } as ViewStyle,
    stateLoading: {} as ViewStyle,
    stateError: {} as ViewStyle,
    stateSuccess: {} as ViewStyle,
    stateWarning: {} as ViewStyle,
  } as const);

const Skeleton = React.forwardRef<React.ComponentRef<typeof View>, SkeletonProps>(
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
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (animated && !disabled) {
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ])
        );
        animation.start();
        return () => {
          animation.stop();
        };
      }
    }, [animated, disabled, animatedValue]);

    const backgroundColor = animated
      ? animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.colors.muted, theme.colors.border],
        })
      : theme.colors.muted;

    const skeletonStyles: ViewStyle[] = [
      styles.base,
      getSizeStyles(size, styles),
      {
        width,
        height,
        borderRadius: theme.components.borderRadius[borderRadius],
        backgroundColor: animated ? undefined : theme.colors.muted,
      },
    ];

    if (disabled) {
      skeletonStyles.push(styles.stateDisabled);
    }

    if (style) {
      skeletonStyles.push(style);
    }

    if (animated) {
      return (
        <Animated.View
          ref={ref}
          style={[
            ...skeletonStyles,
            {
              backgroundColor,
            },
          ]}
          {...props}
        />
      );
    }

    return <View ref={ref} style={skeletonStyles} {...props} />;
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