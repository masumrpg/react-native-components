import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils/color';
import { Theme } from '../../../types/theme';

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  borderRadius?: keyof Theme['borderRadius'];
  elevation?: number;
  shadowOpacity?: number;
  backgroundColor?: string;
}

interface CardContentProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
}

interface CardFooterProps {
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

interface CardHeaderProps {
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

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'sm',
  margin,
  borderRadius = 'lg',
  elevation = 3,
  shadowOpacity = 0.1,
  backgroundColor,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createCardStyles);

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: resolveColor(
            theme,
            backgroundColor,
            theme.colors.surface
          ),
          borderRadius: theme.borderRadius[borderRadius],
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
};

const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
  padding = 'sm',
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createCardContentStyles);

  return (
    <View
      style={[
        styles.base,
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
};

const createCardStyles = (theme: Theme) => ({
  base: {
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

const createCardContentStyles = (_: Theme) => ({
  base: {},
});

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  style,
  padding = 'sm',
  showBorder = false,
  justifyContent = 'flex-end',
  ...props
}) => {
  const { theme } = useTheme();

  const footerStyle: ViewStyle = {
    padding: theme.spacing[padding],
    borderTopWidth: showBorder ? 1 : 0,
    borderTopColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent,
    alignItems: 'center',
  };

  return (
    <View style={[footerStyle, style]} {...props}>
      {children}
    </View>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({
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
}) => {
  const { theme } = useTheme();

  const headerStyle: ViewStyle = {
    padding: theme.spacing[padding],
    borderBottomWidth: borderBottom ? 1 : 0,
    borderBottomColor: theme.colors.border,
  };

  const defaultTitleStyle: TextStyle = {
    fontSize: theme.typography[titleVariant].fontSize,
    lineHeight: theme.typography[titleVariant].lineHeight,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: subtitle ? theme.spacing.xs : 0,
  };

  const defaultSubtitleStyle: TextStyle = {
    fontSize: theme.typography[subtitleVariant].fontSize,
    lineHeight: theme.typography[subtitleVariant].lineHeight,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  };

  return (
    <View style={[headerStyle, style]} {...props}>
      {title && <Text style={[defaultTitleStyle, titleStyle]}>{title}</Text>}
      {subtitle && (
        <Text style={[defaultSubtitleStyle, subtitleStyle]}>{subtitle}</Text>
      )}
      {children}
    </View>
  );
};

export {
  Card, CardContent, CardFooter, CardHeader
};
export type {
  CardProps, CardContentProps, CardFooterProps, CardHeaderProps
};