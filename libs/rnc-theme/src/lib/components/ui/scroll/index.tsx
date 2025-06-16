import React, { forwardRef } from 'react';
import {
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';
import {
  HideDirectionType,
  useHideOnScroll as onScrolling,
  ScrollDirectionType,
  HideOnScrollResult,
} from '../../../hooks/useHideOnScroll';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  threshold?: number;
}

interface ScrollProps extends ScrollViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
  hideOnScroll?: {
    height: number;
    duration?: number;
    threshold?: number;
    scrollDirection?: ScrollDirectionType;
    hideDirection?: HideDirectionType;
    result: (value: HideOnScrollResult | null) => void;
  };
}

interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
  hideOnScroll?: {
    height: number;
    duration?: number;
    threshold?: number;
    scrollDirection?: ScrollDirectionType;
    hideDirection?: HideDirectionType;
    result: (value: HideOnScrollResult | null) => void;
  };
  infiniteScroll?: InfiniteScrollProps;
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
      hideOnScroll,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createVStyles);

    const hideOnScrollProps = hideOnScroll
      ? onScrolling({
          height: hideOnScroll.height,
          duration: hideOnScroll.duration || 300,
          threshold: hideOnScroll.threshold || 10,
          scrollDirection: hideOnScroll.scrollDirection,
          hideDirection: hideOnScroll.hideDirection,
        })
      : null;

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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    };

    return (
      <ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...props}
      >
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
      hideOnScroll,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createHStyles);

    const hideOnScrollProps = hideOnScroll
      ? onScrolling({
          height: hideOnScroll.height,
          duration: hideOnScroll.duration || 300,
          threshold: hideOnScroll.threshold || 10,
          scrollDirection: hideOnScroll.scrollDirection,
          hideDirection: hideOnScroll.hideDirection,
        })
      : null;

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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    };

    return (
      <ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

HScroll.displayName = 'HScroll';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VFlatList = <T = any,>(
  {
    data,
    renderItem,
    keyExtractor,
    style,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    hideOnScroll,
    themed = false,
    infiniteScroll,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createVStyles);

  const hideOnScrollProps = hideOnScroll
    ? onScrolling({
        height: hideOnScroll.height,
        duration: hideOnScroll.duration || 300,
        threshold: hideOnScroll.threshold || 10,
        scrollDirection: hideOnScroll.scrollDirection,
        hideDirection: hideOnScroll.hideDirection,
      })
    : null;

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    hideOnScrollProps?.onScroll(event);
    hideOnScroll?.result(hideOnScrollProps ?? null);
  };

  const handleEndReached = () => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  };

  return (
    <FlatList<T>
      ref={ref}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[flatListStyle, style]}
      onScroll={handleScroll}
      onEndReached={infiniteScroll ? handleEndReached : undefined}
      onEndReachedThreshold={infiniteScroll?.threshold || 0.1}
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
    hideOnScroll,
    themed = false,
    infiniteScroll,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createHStyles);

  const hideOnScrollProps = hideOnScroll
    ? onScrolling({
        height: hideOnScroll.height,
        duration: hideOnScroll.duration || 300,
        threshold: hideOnScroll.threshold || 10,
        scrollDirection: hideOnScroll.scrollDirection,
        hideDirection: hideOnScroll.hideDirection,
      })
    : null;

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    hideOnScrollProps?.onScroll(event);
    hideOnScroll?.result(hideOnScrollProps ?? null);
  };

  const handleEndReached = () => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  };

  return (
    <FlatList<T>
      ref={ref}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      style={[flatListStyle, style]}
      onScroll={handleScroll}
      onEndReached={infiniteScroll ? handleEndReached : undefined}
      onEndReachedThreshold={infiniteScroll?.threshold || 0.1}
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
export type { ScrollProps, ListProps, InfiniteScrollProps };
