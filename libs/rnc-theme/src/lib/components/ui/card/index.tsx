import React, { forwardRef, createContext, useContext } from 'react';
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Typography } from '../typography';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { BaseComponentProps, ComponentVariant } from '../../../types/ui';
import { createShadow, getBackgroundColor, getSizeStyles } from '../../../utils';

type BaseCardProps = BaseComponentProps & {
  children?: React.ReactNode;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  elevation?: number;
  shadowOpacity?: number;
  backgroundColor?: string;
};

type CardProps = BaseCardProps & React.ComponentPropsWithoutRef<typeof View>;

type CardContentProps = React.ComponentPropsWithoutRef<typeof View> & {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'] | 'none';
};

type CardFooterProps = React.ComponentPropsWithoutRef<typeof View> & {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'] | 'none';
  showBorder?: boolean;
  justify?: ViewStyle['justifyContent'];
};

type CardHeaderProps = React.ComponentPropsWithoutRef<typeof View> & {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  padding?: keyof Theme['spacing'] | 'none';
  titleVariant?: keyof Theme['typography'];
  subtitleVariant?: keyof Theme['typography'];
  borderBottom?: boolean;
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 0,
    },
    base: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      position: 'relative',
    },
    // Updated Variants
    default: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    primary: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    },
    secondary: {
      borderWidth: 1.5,
      borderColor: theme.colors.secondary,
      backgroundColor: `${theme.colors.secondary}10`,
    },
    outline: {
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: 'transparent',
    },
    ghost: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    filled: {
      borderWidth: 0,
      backgroundColor: theme.colors.background,
    },
    success: {
      borderWidth: 1.5,
      borderColor: theme.colors.success,
      backgroundColor: `${theme.colors.success}10`,
    },
    error: {
      borderWidth: 1.5,
      borderColor: theme.colors.error,
      backgroundColor: `${theme.colors.error}10`,
    },
    warning: {
      borderWidth: 1.5,
      borderColor: theme.colors.warning,
      backgroundColor: `${theme.colors.warning}10`,
    },
    info: {
      borderWidth: 1.5,
      borderColor: theme.colors.info,
      backgroundColor: `${theme.colors.info}10`,
    },
    destructive: {
      borderWidth: 1.5,
      borderColor: theme.colors.destructive,
      backgroundColor: `${theme.colors.destructive}10`,
    },
    // Sizes
    sizeXs: {
      padding: theme.spacing.xs,
      minHeight: 32,
    },
    sizeSm: {
      padding: theme.spacing.sm,
      minHeight: 36,
    },
    sizeMd: {
      padding: theme.spacing.md,
      minHeight: 42,
    },
    sizeLg: {
      padding: theme.spacing.lg,
      minHeight: 48,
    },
    sizeXl: {
      padding: theme.spacing.xl,
      minHeight: 56,
    },
    // States
    stateDefault: {},
    stateFocus: {
      borderWidth: 2,
    },
    stateActive: {
      borderWidth: 2,
      opacity: 0.9,
    },
    stateDisabled: {
      opacity: 0.6,
    },
    stateLoading: {
      opacity: 0.8,
    },
    stateError: {
      borderColor: theme.colors.error,
    },
    stateSuccess: {
      borderColor: theme.colors.success,
    },
    stateWarning: {
      borderColor: theme.colors.warning,
    },
  });

// Tambahkan Context untuk Card variant
const CardContext = createContext<{ variant: ComponentVariant }>({
  variant: 'default',
});

const Card = forwardRef<React.ComponentRef<typeof View>, CardProps>(
  (
    {
      children,
      style,
      padding = 'md',
      margin,
      borderRadius = 'lg',
      elevation = 3,
      shadowOpacity = 0.1,
      backgroundColor,
      variant = 'default',
      size = 'md',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);

    const cardStyles = [
      styles.base,
      styles[variant],
      getSizeStyles(size, styles),
      {
        backgroundColor:
          backgroundColor ??
          getBackgroundColor(variant, theme.colors, disabled, true),
        borderRadius: theme.components.borderRadius[borderRadius],
        ...createShadow((elevation !== 0 ? elevation : 0) | (shadowOpacity * 2)),
      },
      style,
    ];

    if (disabled) {
      cardStyles.push(styles.stateDisabled);
    }

    return (
      <CardContext.Provider value={{ variant }}>
        <View ref={ref} style={cardStyles} pointerEvents={disabled ? "none" : "box-none"} {...props}>
          {children}
        </View>
      </CardContext.Provider>
    );
  }
);

const CardContent = forwardRef<
  React.ComponentRef<typeof View>,
  CardContentProps
>(({ children, style, padding = 'sm', ...props }, ref) => {
  const { theme } = useTheme();

  return (
    <View
      ref={ref}
      style={[
        {
          padding: padding === 'none' ? 0 : theme.spacing[padding],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

const CardFooter = forwardRef<React.ComponentRef<typeof View>, CardFooterProps>(
  (
    {
      children,
      style,
      padding = 'sm',
      showBorder = false,
      justify: justifyContent = 'flex-end',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <View
        ref={ref}
        style={[
          {
            padding: padding === 'none' ? 0 : theme.spacing[padding],
            borderTopWidth: showBorder ? 1 : 0,
            borderTopColor: theme.colors.border,
            flexDirection: 'row',
            justifyContent,
            alignItems: 'center',
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

// Helper function untuk menentukan warna teks berdasarkan variant
const getTextColor = (
  variant: ComponentVariant,
  theme: Theme
): { title: string; subtitle: string } => {
  const darkVariants = [
    'primary',
    'secondary',
    'success',
    'error',
    'warning',
    'info',
    'filled',
  ];

  if (darkVariants.includes(variant)) {
    return {
      title: '#ffffff',
      subtitle: 'rgba(255, 255, 255, 0.8)',
    };
  }

  return {
    title: theme.colors.text,
    subtitle: theme.colors.textSecondary,
  };
};

const CardHeader = forwardRef<React.ComponentRef<typeof View>, CardHeaderProps>(
  (
    {
      title,
      subtitle,
      children,
      style,
      titleStyle,
      subtitleStyle,
      padding = 'sm',
      titleVariant = 'subtitle',
      subtitleVariant = 'body',
      borderBottom = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const { variant } = useContext(CardContext);
    const textColors = getTextColor(variant, theme);

    return (
      <View
        ref={ref}
        style={[
          {
            padding: padding === 'none' ? 0 : theme.spacing[padding],
            borderBottomWidth: borderBottom ? 1 : 0,
            borderBottomColor: theme.colors.border,
          },
          style,
        ]}
        {...props}
      >
        {title && (
          <Typography
            variant={titleVariant}
            style={[
              {
                color: textColors.title,
                fontWeight: '600',
                marginBottom: subtitle ? theme.spacing.xs : 0,
              },
              titleStyle,
            ]}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant={subtitleVariant}
            style={[
              {
                color: textColors.subtitle,
                fontWeight: '400',
              },
              subtitleStyle,
            ]}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </View>
    );
  }
);

// Display names for debugging
Card.displayName = 'Card';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardHeader.displayName = 'CardHeader';

export { Card, CardContent, CardFooter, CardHeader };
export type { CardProps, CardContentProps, CardFooterProps, CardHeaderProps };
