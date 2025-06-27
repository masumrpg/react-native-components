import React, { forwardRef } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
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
  | 'h6'
  // Tambahan variant baru
  | 'display'
  | 'lead'
  | 'caption'
  | 'overline'
  | 'button'
  | 'label'
  | 'code'
  | 'quote';

type TypographyWeight = TextStyle['fontWeight'];
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: string | undefined;
  align?: TypographyAlign;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  onPress?: () => void;
}

const Typography = forwardRef<React.ComponentRef<typeof Text>, TypographyProps>(
  (
    {
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
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createTypographyStyles);

    return (
      <Text
        ref={ref}
        style={[
          styles.base,
          styles[variant],
          {
            fontWeight: weight ?? styles[variant].fontWeight,
            color: color ?? theme.colors.text,
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
  }
);

Typography.displayName = 'Typography';

const createTypographyStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {},
    small: {
      fontSize: theme.typography.small.fontSize,
      lineHeight: theme.typography.small.lineHeight,
      fontWeight: theme.typography.small.fontWeight ?? '400',
    },
    body: {
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
      fontWeight: theme.typography.body.fontWeight ?? '400',
    },
    subtitle: {
      fontSize: theme.typography.subtitle.fontSize,
      lineHeight: theme.typography.subtitle.lineHeight,
      fontWeight: theme.typography.subtitle.fontWeight ?? '500',
    },
    title: {
      fontSize: theme.typography.title.fontSize,
      lineHeight: theme.typography.title.lineHeight,
      fontWeight: theme.typography.title.fontWeight ?? '600',
    },
    heading: {
      fontSize: theme.typography.heading.fontSize,
      lineHeight: theme.typography.heading.lineHeight,
      fontWeight: theme.typography.heading.fontWeight ?? '700',
    },
    // Heading variants H1-H6
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700',
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '700',
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
    },
    h5: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '500',
    },
    h6: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '500',
    },
    // Variant baru yang ditambahkan
    display: {
      fontSize: 48,
      lineHeight: 56,
      fontWeight: '800',
      letterSpacing: -1,
    },
    lead: {
      fontSize: 20,
      lineHeight: 30,
      fontWeight: '400',
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
      letterSpacing: 0.4,
    },
    overline: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '600',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600',
      letterSpacing: 0.25,
      textTransform: 'uppercase',
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
    code: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      fontFamily: 'monospace',
      letterSpacing: 0,
    },
    quote: {
      fontSize: 18,
      lineHeight: 28,
      fontWeight: '400',
      fontStyle: 'italic',
      letterSpacing: 0.25,
    },
  });

// Komponen khusus untuk setiap variant
const Heading = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref} variant="heading" weight="700" {...props} />
));

Heading.displayName = 'Heading';

const Title = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref} variant="title" weight="600" {...props} />
));

Title.displayName = 'Title';

const Subtitle = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref} variant="subtitle" weight="500" {...props} />
));

Subtitle.displayName = 'Subtitle';

const Body = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="body" {...props} />);

Body.displayName = 'Body';

const Small = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="small" {...props} />);

Small.displayName = 'Small';

// Komponen P (paragraph) yang diminta
const P = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="body" {...props} />);

P.displayName = 'P';

// Komponen H1-H6 yang diinginkan
const H1 = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="h1" {...props} />);

H1.displayName = 'H1';

const H2 = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="h2" {...props} />);

H2.displayName = 'H2';

const H3 = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="h3" {...props} />);

H3.displayName = 'H3';

const H4 = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="h4" {...props} />);

H4.displayName = 'H4';

const H5 = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="h5" {...props} />);

H5.displayName = 'H5';

const H6 = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="h6" {...props} />);

H6.displayName = 'H6';

// Komponen untuk teks dengan warna semantik
const TextPrimary = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'color'>
>((props, ref) => {
  const { theme } = useTheme();
  return <Typography ref={ref} color={theme.colors.primary} {...props} />;
});

TextPrimary.displayName = 'TextPrimary';

const TextSecondary = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'color'>
>((props, ref) => {
  const { theme } = useTheme();
  return (
    <Typography
      ref={ref}
      color={resolveColor(theme, 'textSecondary', theme.colors.textSecondary)}
      {...props}
    />
  );
});

TextSecondary.displayName = 'TextSecondary';

const TextError = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'color'>
>((props, ref) => {
  const { theme } = useTheme();
  return (
    <Typography
      ref={ref}
      color={resolveColor(theme, 'error', theme.colors.error)}
      {...props}
    />
  );
});

TextError.displayName = 'TextError';

const TextSuccess = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'color'>
>((props, ref) => {
  const { theme } = useTheme();
  return <Typography ref={ref} color={theme.colors.success} {...props} />;
});

TextSuccess.displayName = 'TextSuccess';

const TextWarning = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'color'>
>((props, ref) => {
  const { theme } = useTheme();
  return <Typography ref={ref} color={theme.colors.warning} {...props} />;
});

TextWarning.displayName = 'TextWarning';

const TextInfo = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'color'>
>((props, ref) => {
  const { theme } = useTheme();
  return <Typography ref={ref} color={theme.colors.info} {...props} />;
});

TextInfo.displayName = 'TextInfo';

const Display = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref} variant="display" weight="800" {...props} />
));

Display.displayName = 'Display';

const Lead = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="lead" {...props} />);

Lead.displayName = 'Lead';

const Caption = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="caption" {...props} />);

Caption.displayName = 'Caption';

const Overline = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="overline" {...props} />);

Overline.displayName = 'Overline';

const Label = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="label" {...props} />);

Label.displayName = 'Label';

const Code = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="code" {...props} />);

Code.displayName = 'Code';

const Quote = forwardRef<
  React.ComponentRef<typeof Text>,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography ref={ref} variant="quote" {...props} />);

Quote.displayName = 'Quote';

export {
  Typography,
  Heading,
  Title,
  Subtitle,
  Body,
  Small,
  P,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  // Komponen baru
  Display,
  Lead,
  Caption,
  Overline,
  Label,
  Code,
  Quote,
  // Semantic colors
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
