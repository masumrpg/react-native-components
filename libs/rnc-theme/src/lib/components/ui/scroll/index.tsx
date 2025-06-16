import React, { forwardRef } from 'react';
import { FlatList, FlatListProps, ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';

interface ScrollProps extends ScrollViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
}

interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
}

const VScroll = forwardRef<ScrollView, ScrollProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createVStyles);

    const scrollStyle: ViewStyle = {
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: resolveColor(
        theme,
        backgroundColor,
        themed ? theme.colors.background : 'transparent'
      ),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    };

    return (
      <ScrollView ref={ref} style={[scrollStyle, style]} {...props}>
        {children}
      </ScrollView>
    );
  }
);

VScroll.displayName = 'VScroll';

const HScroll = forwardRef<ScrollView, ScrollProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createHStyles);

    const scrollStyle: ViewStyle = {
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: resolveColor(
        theme,
        backgroundColor,
        themed ? theme.colors.background : 'transparent'
      ),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    };

    return (
      <ScrollView horizontal ref={ref} style={[scrollStyle, style]} {...props}>
        {children}
      </ScrollView>
    );
  }
);

HScroll.displayName = 'HScroll';

// VFlatList - Vertical FlatList
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VFlatList = <T = any>(
  {
    data,
    renderItem,
    keyExtractor,
    style,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    themed = false,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createVStyles);

  const flatListStyle: ViewStyle = {
    ...styles.base,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(
      theme,
      backgroundColor,
      themed ? theme.colors.background : 'transparent'
    ),
    borderRadius: borderRadius
      ? theme.components.borderRadius[borderRadius]
      : undefined,
  };

  return (
    <FlatList<T>
      ref={ref}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[flatListStyle, style]}
      {...props}
    />
  );
};

const VList = forwardRef(VFlatList) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> }
) => React.ReactElement;


// HFlatList with generics
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HFlatList = <T = any,>(
  {
    data,
    renderItem,
    keyExtractor,
    style,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    themed = false,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createHStyles);

  const flatListStyle: ViewStyle = {
    ...styles.base,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(
      theme,
      backgroundColor,
      themed ? theme.colors.background : 'transparent'
    ),
    borderRadius: borderRadius
      ? theme.components.borderRadius[borderRadius]
      : undefined,
  };

  return (
    <FlatList<T>
      ref={ref}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      style={[flatListStyle, style]}
      {...props}
    />
  );
};

const HList = forwardRef(HFlatList) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> }
) => React.ReactElement;

const createVStyles = (theme: Theme) => ({
  base: {
    flex: 1,
    flexDirection: 'column' as const,
  },
});

const createHStyles = (theme: Theme) => ({
  base: {
    flex: 1,
    flexDirection: 'row' as const,
  },
});

export { VScroll, HScroll, VList, HList };
export type { ScrollProps, ListProps };