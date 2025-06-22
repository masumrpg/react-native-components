import React, { forwardRef } from 'react';
import { View, ViewStyle, DimensionValue, StyleProp } from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  length?: DimensionValue;
  margin?: keyof Theme['spacing'];
  marginHorizontal?: keyof Theme['spacing'];
  marginVertical?: keyof Theme['spacing'];
  marginLeft?: keyof Theme['spacing'];
  marginRight?: keyof Theme['spacing'];
  marginTop?: keyof Theme['spacing'];
  marginBottom?: keyof Theme['spacing'];
  style?: StyleProp<ViewStyle>;
}

const Divider = forwardRef<React.ComponentRef<typeof View>, DividerProps>(
  (
    {
      orientation = 'horizontal',
      thickness = 1,
      color,
      length,
      margin,
      marginHorizontal,
      marginVertical,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createDividerStyles);

    const dividerStyle: ViewStyle = {
      backgroundColor: resolveColor(theme, color, theme.colors.border),
      margin: margin ? theme.spacing[margin] : undefined,
      marginHorizontal: marginHorizontal
        ? theme.spacing[marginHorizontal]
        : orientation === 'horizontal'
        ? theme.spacing.md
        : undefined,
      marginVertical: marginVertical
        ? theme.spacing[marginVertical]
        : orientation === 'vertical'
        ? theme.spacing.md
        : undefined,
      marginLeft: marginLeft ? theme.spacing[marginLeft] : undefined,
      marginRight: marginRight ? theme.spacing[marginRight] : undefined,
      marginTop: marginTop ? theme.spacing[marginTop] : undefined,
      marginBottom: marginBottom ? theme.spacing[marginBottom] : undefined,
    };

    if (orientation === 'horizontal') {
      dividerStyle.height = thickness;
      dividerStyle.width = length || '100%';
    } else {
      dividerStyle.width = thickness;
      dividerStyle.height = length || '100%';
    }

    return (
      <View ref={ref} style={[styles.base, dividerStyle, style]} {...props} />
    );
  }
);

Divider.displayName = 'Divider';

const createDividerStyles = (_: Theme) => ({
  base: {},
});

// Shortcut components dengan margin default yang lebih baik
const HDivider = forwardRef<
  React.ComponentRef<typeof View>,
  Omit<DividerProps, 'orientation'>
>((props, ref) => (
  <Divider
    ref={ref}
    orientation="horizontal"
    marginVertical={props.marginVertical || 'sm'}
    {...props}
  />
));

HDivider.displayName = 'HDivider';

const VDivider = forwardRef<
  React.ComponentRef<typeof View>,
  Omit<DividerProps, 'orientation'>
>((props, ref) => (
  <Divider
    ref={ref}
    orientation="vertical"
    marginHorizontal={props.marginHorizontal || 'sm'}
    {...props}
  />
));

VDivider.displayName = 'VDivider';

export { Divider, HDivider, VDivider, type DividerProps };
