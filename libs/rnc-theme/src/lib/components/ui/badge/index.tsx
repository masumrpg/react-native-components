import React, { forwardRef, useMemo } from 'react';
import {
  ViewStyle,
  TextStyle,
  View,
  StyleProp,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline'
  | 'filled'
  | 'ghost'
  | 'info'
  | 'destructive';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BaseBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
  rounded?: boolean;
}

interface BadgeProps extends BaseBadgeProps {
  children?: React.ReactNode;
}

interface BadgeTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface BadgeIconProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
}

interface AnimatedBadgeProps extends BadgeProps {
  animated?: boolean;
  scale?: number;
  fadeIn?: boolean;
}

const Badge = forwardRef<
  React.ComponentRef<typeof Animated.View>,
  AnimatedBadgeProps
>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      style,
      rounded = true,
      animated = true,
      scale = 1,
      fadeIn = true,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createBadgeStyles);

    const animatedStyle = useAnimatedStyle(() => {
      if (!animated) return {};

      return {
        transform: [
          {
            scale: withSpring(scale, {
              damping: 10,
              stiffness: 100,
            }),
          },
        ],
        opacity: fadeIn ? withTiming(1, { duration: 300 }) : 1,
      };
    });

    const containerStyle = useMemo(() => {
      const baseStyles = [
        styles.base,
        styles[variant],
        styles[size],
        rounded && styles.rounded,
        style,
      ];

      return baseStyles;
    }, [styles, variant, size, rounded, style]);

    return (
      <Animated.View
        ref={ref}
        style={[containerStyle, animatedStyle]}
        {...props}
      >
        {children}
      </Animated.View>
    );
  }
);

const BadgeText = forwardRef<
  React.ComponentRef<typeof Animated.View>,
  BadgeTextProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createBadgeTextStyles);

  const textStyle = useMemo(() => {
    const baseStyles = [styles.text];
    if (style) baseStyles.push(style);
    return baseStyles;
  }, [styles, style]);

  return (
    <Animated.Text ref={ref} style={textStyle} {...props}>
      {children}
    </Animated.Text>
  );
});

const BadgeIcon = forwardRef<React.ComponentRef<typeof View>, BadgeIconProps>(
  ({ children, position = 'left', style, ...props }, ref) => {
    const styles = useThemedStyles(createBadgeIconStyles);

    const iconStyle = useMemo(() => {
      const baseStyles = [styles.icon, styles[position], style];
      return baseStyles;
    }, [styles, position, style]);

    return (
      <View ref={ref} style={iconStyle} {...props}>
        {children}
      </View>
    );
  }
);

const createBadgeStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderWidth: 1,
    },
    rounded: {
      borderRadius: theme.components.borderRadius.xl,
    },
    // Variants
    default: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    primary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.secondary,
    },
    success: {
      backgroundColor: '#10B981',
      borderColor: '#10B981',
    },
    warning: {
      backgroundColor: '#F59E0B',
      borderColor: '#F59E0B',
    },
    error: {
      backgroundColor: '#EF4444',
      borderColor: '#EF4444',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    filled: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    info: {
      backgroundColor: theme.colors.info || '#3B82F6',
      borderColor: theme.colors.info || '#3B82F6',
    },
    destructive: {
      backgroundColor: theme.colors.destructive || '#DC2626',
      borderColor: theme.colors.destructive || '#DC2626',
    },
    // Sizes
    xs: {
      paddingHorizontal: theme.spacing.xs / 2,
      paddingVertical: 1,
    },
    sm: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
    },
    md: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    lg: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
  });

const createBadgeTextStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
      fontWeight: '600',
      color: theme.colors.text,
    } as TextStyle,
  });

const createBadgeIconStyles = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    left: {
      marginRight: theme.spacing.xs,
    },
    right: {
      marginLeft: theme.spacing.xs,
    },
  });

// Display names
Badge.displayName = 'Badge';
BadgeText.displayName = 'BadgeText';
BadgeIcon.displayName = 'BadgeIcon';

export {
  Badge,
  BadgeText,
  BadgeIcon,
  type BadgeProps,
  type BadgeTextProps,
  type BadgeIconProps,
  type BadgeVariant,
  type BadgeSize,
};
