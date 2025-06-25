import { FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from "react-native";
import { Theme } from "../../../types/theme";
import {
  HideDirectionType,
  HideOnScrollResult,
  ScrollDirectionType,
  useHideOnScroll as onScrolling,
} from '../../../hooks/useHideOnScroll';
import { forwardRef } from "react";
import { useTheme } from "../../../context/RNCProvider";
import { useThemedStyles } from "../../../hooks/useThemedStyles";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  threshold?: number;
}

interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: keyof Theme['colors'];
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
        duration: hideOnScroll.duration ?? 300,
        threshold: hideOnScroll.threshold ?? 10,
        scrollDirection: hideOnScroll.scrollDirection,
        hideDirection: hideOnScroll.hideDirection,
      })
    : null;

  const flatListStyle: ViewStyle = {
    ...styles.base,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: backgroundColor ?? theme.colors.background,
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
      onEndReachedThreshold={infiniteScroll?.threshold ?? 0.1}
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
        duration: hideOnScroll.duration ?? 300,
        threshold: hideOnScroll.threshold ?? 10,
        scrollDirection: hideOnScroll.scrollDirection,
        hideDirection: hideOnScroll.hideDirection,
      })
    : null;

  const flatListStyle: ViewStyle = {
    ...styles.base,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: backgroundColor ?? theme.colors.background,
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
      onEndReachedThreshold={infiniteScroll?.threshold ?? 0.1}
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

export { VList, HList };
export type { ListProps, InfiniteScrollProps };