import React, { forwardRef } from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { createShadow } from '../../../utils';

interface BaseLayoutProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: ViewStyle['backgroundColor'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  flex?: number;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  themed?: boolean;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
}

interface StackProps extends BaseLayoutProps {
  spacing?: keyof Theme['spacing'];
  wrap?: boolean;
}

interface GridProps extends BaseLayoutProps {
  columns?: number;
  spacing?: keyof Theme['spacing'];
}

type CenterProps = BaseLayoutProps;

interface BoxProps extends BaseLayoutProps {
  borderWidth?: number;
  borderColor?: ViewStyle['borderColor'];
  shadowOpacity?: number;
  elevation?: number;
  variant?: 'default' | 'card' | 'surface';
}

// HStack - Horizontal Stack
const HStack = forwardRef<React.ComponentRef<typeof View>, StackProps>(
  (
    {
      children,
      style,
      spacing,
      align = 'center',
      justify = 'flex-start',
      wrap = false,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      flex,
      width,
      height,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createHStackStyles);

    const stackStyle: ViewStyle = {
      ...styles.base,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap: spacing ? theme.spacing[spacing] : 0,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor:
        backgroundColor ?? (themed ? theme.colors.background : 'transparent'),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
      flex,
      width,
      height,
    };

    return (
      <View ref={ref} style={[stackStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

HStack.displayName = 'HStack';

// VStack - Vertical Stack
const VStack = forwardRef<React.ComponentRef<typeof View>, StackProps>(
  (
    {
      children,
      style,
      spacing,
      align = 'stretch',
      justify = 'flex-start',
      wrap = false,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      flex,
      width,
      height,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createVStackStyles);

    const stackStyle: ViewStyle = {
      ...styles.base,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap: spacing ? theme.spacing[spacing] : 0,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor:
        backgroundColor ?? (themed ? theme.colors.background : 'transparent'),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
      flex,
      width,
      height,
    };

    return (
      <View ref={ref} style={[stackStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

VStack.displayName = 'VStack';

// ZStack - Absolute positioned stack
const ZStack = forwardRef<React.ComponentRef<typeof View>, BaseLayoutProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      flex,
      width,
      height,
      themed = false,
      align = 'stretch',
      justify = 'flex-start',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createZStackStyles);

    const stackStyle: ViewStyle = {
      ...styles.base,
      alignItems: align,
      justifyContent: justify,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor:
        backgroundColor ?? (themed ? theme.colors.background : 'transparent'),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
      flex,
      width,
      height,
    };

    return (
      <View ref={ref} style={[stackStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

ZStack.displayName = 'ZStack';

// Center - Centers content
const Center = forwardRef<React.ComponentRef<typeof View>, CenterProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      flex,
      width,
      height,
      themed = false,
      align = 'center',
      justify = 'center',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createCenterStyles);

    const centerStyle: ViewStyle = {
      ...styles.base,
      alignItems: align,
      justifyContent: justify,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor:
        backgroundColor ?? (themed ? theme.colors.background : 'transparent'),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
      flex,
      width,
      height,
    };

    return (
      <View ref={ref} style={[centerStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

Center.displayName = 'Center';

// Box - Themed View component
const Box = forwardRef<React.ComponentRef<typeof View>, BoxProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      borderWidth,
      borderColor,
      shadowOpacity,
      elevation,
      flex,
      width,
      height,
      themed = false,
      variant = 'default',
      align = 'stretch',
      justify = 'flex-start',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createBoxStyles);

    const getVariantStyle = () => {
      switch (variant) {
        case 'card':
          return styles.card;
        case 'surface':
          return styles.surface;
        default:
          return styles.default;
      }
    };

    const boxStyle: ViewStyle = {
      ...styles.base,
      ...getVariantStyle(),
      alignItems: align,
      justifyContent: justify,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor:
        backgroundColor ?? (themed ? theme.colors.background : 'transparent'),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
      borderWidth: borderWidth ?? undefined,
      borderColor: borderColor ?? theme.colors.border,
      ...createShadow((elevation ?? 0) | (shadowOpacity ? shadowOpacity * 2 : 0)),
      flex,
      width,
      height,
    };

    return (
      <View ref={ref} style={[boxStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

Box.displayName = 'Box';

const Grid = forwardRef<React.ComponentRef<typeof View>, GridProps>(
  (
    {
      children,
      style,
      columns = 2,
      spacing,
      align = 'stretch',
      justify = 'flex-start',
      padding,
      margin,
      backgroundColor,
      borderRadius,
      flex,
      width,
      height,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createGridStyles);

    const gridStyle: ViewStyle = {
      ...styles.base,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: align,
      justifyContent: justify,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor:
        backgroundColor ?? (themed ? theme.colors.background : 'transparent'),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
      flex,
      width,
      height,
    };

    const childrenArray = React.Children.toArray(children);
    const spacingValue = spacing ? theme.spacing[spacing] : 0;

    const gridChildren = childrenArray.map((child, index) => {
      const isLastRow =
        index >=
        childrenArray.length - (childrenArray.length % columns || columns);

      const childStyle: ViewStyle = {
        flexBasis: `${100 / columns}%`,
        paddingHorizontal: spacingValue / 2,
        paddingVertical: spacingValue / 2,
        marginBottom: isLastRow ? 0 : spacingValue,
      };

      return (
        <View key={index} style={childStyle}>
          {child}
        </View>
      );
    });

    return (
      <View ref={ref} style={[gridStyle, style]} {...props}>
        {gridChildren}
      </View>
    );
  }
);

Grid.displayName = 'Grid';

// Styled functions untuk useThemedStyles
const createHStackStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
    },
  });

const createVStackStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'column',
    },
  });

const createZStackStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      position: 'relative',
    },
  });

const createCenterStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      // Base styles, alignment handled via props
    },
  });

const createGridStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 0,
    },
  });

const createBoxStyles = (theme: Theme) => ({
  base: {
    // Base styles, alignment handled via props
  },
  default: {
    backgroundColor: theme.colors.surface,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.components.borderRadius.lg,
    padding: theme.spacing.md,
    ...createShadow(4)
  },
  surface: {
    backgroundColor: theme.colors.background,
  },
});

export {
  HStack,
  VStack,
  ZStack,
  Center,
  Box,
  Grid,
  type StackProps,
  type CenterProps,
  type BoxProps,
  type BaseLayoutProps,
  type GridProps,
};
