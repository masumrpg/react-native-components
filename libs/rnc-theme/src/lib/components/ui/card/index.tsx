import React, { forwardRef } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils/color';
import { Theme } from '../../../types/theme';

// Types
interface CardProps extends React.ComponentPropsWithoutRef<typeof View> {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  elevation?: number;
  shadowOpacity?: number;
  backgroundColor?: string;
}

interface CardContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
}

interface CardFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  showBorder?: boolean;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

interface CardHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
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
}

// Styles
const createCardStyles = (theme: Theme) => ({
  base: {
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

// Components
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
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createCardStyles);

    return (
      <View
        ref={ref}
        style={[
          styles.base,
          {
            backgroundColor: resolveColor(
              theme,
              backgroundColor,
              theme.colors.surface
            ),
            borderRadius: theme.components.borderRadius[borderRadius],
            padding: theme.spacing[padding],
            marginBottom: margin ? theme.spacing[margin] : undefined,
            shadowOpacity,
            elevation,
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
                color: theme.colors.text,
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
                color: theme.colors.textSecondary,
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
