import React from 'react';
import {
  Pressable,
  TouchableOpacity,
  ViewStyle,
  PressableProps,
  TouchableOpacityProps,
  View,
  TextStyle,
  Text,
} from 'react-native';
import { Theme } from '../../../types/theme';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils/color';
import { Spinner } from '../spinner';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonComponent = 'pressable' | 'touchable';

interface BaseButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  borderRadius?: keyof Theme['borderRadius'];
  fullWidth?: boolean;
  component?: ButtonComponent;
}

// Separate interfaces for cleaner type definitions
interface PressableButtonProps
  extends BaseButtonProps,
    Omit<PressableProps, keyof BaseButtonProps> {
  component?: 'pressable';
}

interface TouchableButtonProps
  extends BaseButtonProps,
    Omit<TouchableOpacityProps, keyof BaseButtonProps> {
  component: 'touchable';
}

type ButtonProps = PressableButtonProps | TouchableButtonProps;

type IconPosition = 'left' | 'right' | 'center';

interface ButtonIconProps {
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  position?: IconPosition;
  marginLeft?: keyof Theme['spacing'];
  marginRight?: keyof Theme['spacing'];
}

interface ButtonTextProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: TextStyle;
  showLoadingIndicator?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  borderRadius = 'md',
  fullWidth = false,
  component = 'pressable',
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createButtonStyles);

  const baseStyle: ViewStyle = {
    ...styles.base,
    ...styles[variant],
    ...styles[size],
    borderRadius: theme.borderRadius[borderRadius],
    ...(fullWidth && { width: '100%' as const }),
    opacity: disabled ? 0.6 : 1,
    ...(style as ViewStyle),
  };

  const isDisabled = disabled || loading;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === ButtonText) {
        return React.cloneElement(
          child as React.ReactElement<ButtonTextProps>,
          {
            variant,
            size,
            disabled,
            loading,
          }
        );
      }
      if (child.type === ButtonIcon) {
        return React.cloneElement(
          child as React.ReactElement<ButtonIconProps>,
          {
            variant,
            size,
            disabled,
          }
        );
      }
    }
    return child;
  });

  if (component === 'touchable') {
    // Type assertion for TouchableOpacity props
    const touchableProps = props as Omit<
      TouchableOpacityProps,
      keyof BaseButtonProps
    >;
    return (
      <TouchableOpacity
        style={baseStyle}
        disabled={isDisabled}
        {...touchableProps}
      >
        {childrenWithProps}
      </TouchableOpacity>
    );
  }

  // Default to Pressable
  const pressableProps = props as Omit<PressableProps, keyof BaseButtonProps>;
  return (
    <Pressable style={baseStyle} disabled={isDisabled} {...pressableProps}>
      {childrenWithProps}
    </Pressable>
  );
};

const ButtonText: React.FC<ButtonTextProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  showLoadingIndicator = true,
  ...props
}) => {
  const styles = useThemedStyles(createButtonTextStyles);

  if (loading && showLoadingIndicator) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner
          size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
          color={styles[variant].color}
          style={styles.loadingIndicator}
        />
        <Text
          style={[styles.base, styles[variant], styles[size], style]}
          {...props}
        >
          {children}
        </Text>
      </View>
    );
  }

  return (
    <Text
      style={[styles.base, styles[variant], styles[size], style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  position = 'left',
  marginLeft,
  marginRight,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createButtonIconStyles);

  const iconStyle = {
    marginLeft: marginLeft
      ? theme.spacing[marginLeft]
      : position === 'right'
      ? theme.spacing.xs
      : 0,
    marginRight: marginRight
      ? theme.spacing[marginRight]
      : position === 'left'
      ? theme.spacing.xs
      : 0,
  };

  return (
    <View style={[styles.base, styles[size], iconStyle, style]} {...props}>
      {icon}
    </View>
  );
};

const createButtonStyles = (theme: Theme) => ({
  base: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
  },
  // Variants
  primary: {
    backgroundColor: resolveColor(theme, 'primary', theme.colors.primary),
    borderColor: resolveColor(theme, 'primary', theme.colors.primary),
  },
  secondary: {
    backgroundColor: resolveColor(theme, 'secondary', theme.colors.secondary),
    borderColor: resolveColor(theme, 'secondary', theme.colors.secondary),
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: resolveColor(theme, 'primary', theme.colors.primary),
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  success: {
    backgroundColor: resolveColor(theme, 'success', '#10B981'),
    borderColor: resolveColor(theme, 'success', '#10B981'),
  },
  error: {
    backgroundColor: resolveColor(theme, 'error', theme.colors.error),
    borderColor: resolveColor(theme, 'error', theme.colors.error),
  },
  warning: {
    backgroundColor: resolveColor(theme, 'warning', '#F59E0B'),
    borderColor: resolveColor(theme, 'warning', '#F59E0B'),
  },
  info: {
    backgroundColor: resolveColor(theme, 'info', '#3B82F6'),
    borderColor: resolveColor(theme, 'info', '#3B82F6'),
  },
  // Sizes
  sm: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minHeight: 32,
  },
  md: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 40,
  },
  lg: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 48,
  },
});

const createButtonTextStyles = (theme: Theme) => ({
  base: {
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
  loadingContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  loadingIndicator: {
    marginRight: theme.spacing.xs,
  },
  // Variants
  primary: {
    color: '#FFFFFF',
  },
  secondary: {
    color: '#FFFFFF',
  },
  outline: {
    color: resolveColor(theme, 'primary', theme.colors.primary),
  },
  ghost: {
    color: resolveColor(theme, 'text', theme.colors.text),
  },
  success: {
    color: '#FFFFFF',
  },
  error: {
    color: '#FFFFFF',
  },
  warning: {
    color: '#FFFFFF',
  },
  info: {
    color: '#FFFFFF',
  },
  // Sizes
  sm: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
  },
  md: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  },
  lg: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
  },
});

const createButtonIconStyles = (theme: Theme) => ({
  base: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 24,
    height: 24,
  },
});

export { Button, ButtonIcon, ButtonText };

export type { ButtonProps, ButtonIconProps, ButtonTextProps };
