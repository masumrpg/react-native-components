import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils/color';

interface BadgeProps {
  children?: React.ReactNode;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  rounded?: boolean;
}

interface BadgeTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface BadgeIconProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  style,
  rounded = true,
  ...props
}) => {
  const styles = useThemedStyles(createBadgeStyles);

  return (
    <View
      style={[
        styles.base,
        styles[variant],
        styles[size],
        rounded && styles.rounded,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const BadgeText: React.FC<BadgeTextProps> = ({ children, style, ...props }) => {
  const styles = useThemedStyles(createBadgeTextStyles);

  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const BadgeIcon: React.FC<BadgeIconProps> = ({
  children,
  position = 'left',
  style,
  ...props
}) => {
  const styles = useThemedStyles(createBadgeIconStyles);

  return (
    <View style={[styles.icon, styles[position], style]} {...props}>
      {children}
    </View>
  );
};

const createBadgeStyles = (theme: Theme) => ({
  base: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
  },
  rounded: {
    borderRadius: theme.borderRadius.xl,
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
  // Sizes
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

const createBadgeTextStyles = (theme: Theme) => ({
  text: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    fontWeight: '600' as const,
    color: resolveColor(theme, theme.colors.text, theme.colors.primary),
  },
});

const createBadgeIconStyles = (theme: Theme) => ({
  icon: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  left: {
    marginRight: theme.spacing.xs,
  },
  right: {
    marginLeft: theme.spacing.xs,
  },
});

export {
  Badge,
  BadgeText,
  BadgeIcon,
  type BadgeProps,
  type BadgeTextProps,
  type BadgeIconProps,
};