import React, { forwardRef, createContext, useContext } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import {
  ComponentState,
  BaseComponentProps,
  ComponentVariant,
} from '../../../types/ui';
import { getBackgroundColor, getSizeStyles } from '../../../utils';

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
  padding?: keyof Theme['spacing'];
};

type CardFooterProps = React.ComponentPropsWithoutRef<typeof View> & {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  showBorder?: boolean;
  justifyContent?: ViewStyle['justifyContent'];
};

type CardHeaderProps = React.ComponentPropsWithoutRef<typeof View> & {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  padding?: keyof Theme['spacing'];
  titleVariant?: keyof Theme['typography'];
  subtitleVariant?: keyof Theme['typography'];
  borderBottom?: boolean;
};

// Styles
type StateStylesType = {
  [K in ComponentState as `state${Capitalize<K>}`]: ViewStyle;
};

const createStyles = (theme: Theme) =>
  ({
    container: {
      marginBottom: 0,
    } as ViewStyle,
    base: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      position: 'relative',
    } as ViewStyle,
    // Updated Variants
    default: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    primary: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    } as ViewStyle,
    secondary: {
      borderWidth: 1.5,
      borderColor: theme.colors.secondary,
      backgroundColor: `${theme.colors.secondary}10`,
    } as ViewStyle,
    outline: {
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: 'transparent',
    } as ViewStyle,
    ghost: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    } as ViewStyle,
    filled: {
      borderWidth: 0,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    success: {
      borderWidth: 1.5,
      borderColor: theme.colors.success,
      backgroundColor: `${theme.colors.success}10`,
    } as ViewStyle,
    error: {
      borderWidth: 1.5,
      borderColor: theme.colors.error,
      backgroundColor: `${theme.colors.error}10`,
    } as ViewStyle,
    warning: {
      borderWidth: 1.5,
      borderColor: theme.colors.warning,
      backgroundColor: `${theme.colors.warning}10`,
    } as ViewStyle,
    info: {
      borderWidth: 1.5,
      borderColor: theme.colors.info,
      backgroundColor: `${theme.colors.info}10`,
    } as ViewStyle,
    destructive: {
      borderWidth: 1.5,
      borderColor: theme.colors.destructive,
      backgroundColor: `${theme.colors.destructive}10`,
    } as ViewStyle,
    // Sizes
    sizeXs: {
      padding: theme.spacing.xs,
      minHeight: 32,
    } as ViewStyle,
    sizeSm: {
      padding: theme.spacing.sm,
      minHeight: 36,
    } as ViewStyle,
    sizeMd: {
      padding: theme.spacing.md,
      minHeight: 42,
    } as ViewStyle,
    sizeLg: {
      padding: theme.spacing.lg,
      minHeight: 48,
    } as ViewStyle,
    sizeXl: {
      padding: theme.spacing.xl,
      minHeight: 56,
    } as ViewStyle,
    // States
    stateDefault: {} as ViewStyle,
    stateFocus: {
      borderWidth: 2,
    } as ViewStyle,
    stateActive: {
      borderWidth: 2,
      opacity: 0.9,
    } as ViewStyle,
    stateDisabled: {
      opacity: 0.6,
      pointerEvents: 'none',
    } as ViewStyle,
    stateLoading: {
      opacity: 0.8,
    } as ViewStyle,
    stateError: {
      borderColor: theme.colors.error,
    } as ViewStyle,
    stateSuccess: {
      borderColor: theme.colors.success,
    } as ViewStyle,
    stateWarning: {
      borderColor: theme.colors.warning,
    } as ViewStyle,
  } as const satisfies Record<string, ViewStyle> &
    StateStylesType &
    Record<ComponentVariant, ViewStyle>);

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
        shadowOpacity,
        elevation: disabled ? 0 : elevation,
      },
      style,
    ];

    if (disabled) {
      cardStyles.push(styles.stateDisabled);
    }

    return (
      <CardContext.Provider value={{ variant }}>
        <View ref={ref} style={cardStyles} {...props}>
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
          padding: theme.spacing[padding],
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
      justifyContent = 'flex-end',
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
            padding: theme.spacing[padding],
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
            padding: theme.spacing[padding],
            borderBottomWidth: borderBottom ? 1 : 0,
            borderBottomColor: theme.colors.border,
          },
          style,
        ]}
        {...props}
      >
        {title && (
          <Text
            style={[
              {
                fontSize: theme.typography[titleVariant].fontSize,
                lineHeight: theme.typography[titleVariant].lineHeight,
                color: textColors.title,
                fontWeight: '600',
                marginBottom: subtitle ? theme.spacing.xs : 0,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={[
              {
                fontSize: theme.typography[subtitleVariant].fontSize,
                lineHeight: theme.typography[subtitleVariant].lineHeight,
                color: textColors.subtitle,
                fontWeight: '400',
              },
              subtitleStyle,
            ]}
          >
            {subtitle}
          </Text>
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
