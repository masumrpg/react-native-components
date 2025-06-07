import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils/color';
import { Theme } from '../../../types/theme';

type TypographyVariant =
  | 'small'
  | 'body'
  | 'subtitle'
  | 'title'
  | 'heading'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

type TypographyWeight = TextStyle['fontWeight'];
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: string;
  align?: TypographyAlign;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  onPress?: () => void;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight,
  color,
  align = 'left',
  style,
  numberOfLines,
  ellipsizeMode,
  selectable = false,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createTypographyStyles);

  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        {
          fontWeight: weight || styles[variant].fontWeight || '400',
          color: resolveColor(theme, color, theme.colors.text),
          textAlign: align,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
      onPress={onPress}
      {...props}
    >
      {children}
    </Text>
  );
};

const createTypographyStyles = (theme: Theme) => ({
  base: {} as TextStyle,
  small: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
    fontWeight: (theme.typography.small.fontWeight ||
      '400') as TextStyle['fontWeight'],
  } as TextStyle,
  body: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    fontWeight: (theme.typography.body.fontWeight ||
      '400') as TextStyle['fontWeight'],
  } as TextStyle,
  subtitle: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
    fontWeight: (theme.typography.subtitle.fontWeight ||
      '500') as TextStyle['fontWeight'],
  } as TextStyle,
  title: {
    fontSize: theme.typography.title.fontSize,
    lineHeight: theme.typography.title.lineHeight,
    fontWeight: (theme.typography.title.fontWeight ||
      '600') as TextStyle['fontWeight'],
  } as TextStyle,
  heading: {
    fontSize: theme.typography.heading.fontSize,
    lineHeight: theme.typography.heading.lineHeight,
    fontWeight: (theme.typography.heading.fontWeight ||
      '700') as TextStyle['fontWeight'],
  } as TextStyle,
  // Heading variants H1-H6
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as TextStyle['fontWeight'],
  } as TextStyle,
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as TextStyle['fontWeight'],
  } as TextStyle,
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as TextStyle['fontWeight'],
  } as TextStyle,
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as TextStyle['fontWeight'],
  } as TextStyle,
  h5: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500' as TextStyle['fontWeight'],
  } as TextStyle,
  h6: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500' as TextStyle['fontWeight'],
  } as TextStyle,
});

// Komponen khusus untuk setiap variant
const Heading: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="heading" weight="700" {...props} />
);

const Title: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="title" weight="600" {...props} />
);

const Subtitle: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="subtitle" weight="500" {...props} />
);

const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

const Small: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="small" {...props} />
);

// Komponen H1-H6 yang diinginkan
const H1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

const H2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

const H3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

const H4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

const H5: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h5" {...props} />
);

const H6: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h6" {...props} />
);

// Komponen untuk teks dengan warna semantik
const TextPrimary: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return (
    <Typography
      color={resolveColor(theme, 'primary', theme.colors.primary)}
      {...props}
    />
  );
};

const TextSecondary: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return (
    <Typography
      color={resolveColor(theme, 'textSecondary', theme.colors.textSecondary)}
      {...props}
    />
  );
};

const TextError: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return (
    <Typography
      color={resolveColor(theme, 'error', theme.colors.error)}
      {...props}
    />
  );
};

const TextSuccess: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.success} {...props} />;
};

const TextWarning: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.warning} {...props} />;
};

const TextInfo: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.info} {...props} />;
};

export {
  Typography,
  Heading,
  Title,
  Subtitle,
  Body,
  Small,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  TextPrimary,
  TextSecondary,
  TextError,
  TextSuccess,
  TextWarning,
  TextInfo,
};

export type {
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
  TypographyAlign,
};
