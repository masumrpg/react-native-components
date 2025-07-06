import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Theme } from '../../../types/theme';
import {
  HideDirectionType,
  HideOnScrollResult,
  ScrollDirectionType,
  useHideOnScroll as onScrolling,
} from '../../../hooks/useHideOnScroll';
import { forwardRef, useCallback, useMemo } from 'react';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  threshold?: number;
}

interface BaseListProps {
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

// FlatList Props
interface ListProps<T>
  extends Omit<FlatListProps<T>, 'renderItem'>,
    BaseListProps {
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
}

// FlashList Props
interface FlashListPropsExtended<T>
  extends Omit<FlashListProps<T>, 'renderItem'>,
    BaseListProps {
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
  estimatedItemSize?: number;
  estimatedListSize?: { height: number; width: number };
  drawDistance?: number;
  disableAutoLayout?: boolean;
}

// ============= FLATLIST COMPONENTS =============

// VFlatList with generics
const VFlatList = <T,>(
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

  const hideOnScrollProps = useMemo(
    () =>
      hideOnScroll
        ? onScrolling({
            height: hideOnScroll.height,
            duration: hideOnScroll.duration ?? 300,
            threshold: hideOnScroll.threshold ?? 10,
            scrollDirection: hideOnScroll.scrollDirection,
            hideDirection: hideOnScroll.hideDirection,
          })
        : null,
    [hideOnScroll]
  );

  const flatListStyle: ViewStyle = useMemo(
    () => ({
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: backgroundColor ?? theme.colors.background,
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    }),
    [styles.base, padding, margin, backgroundColor, borderRadius, theme]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    },
    [hideOnScrollProps, hideOnScroll]
  );

  const handleEndReached = useCallback(() => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  }, [infiniteScroll]);

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
      // Performance optimizations for FlatList
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      legacyImplementation={false}
      {...props}
    />
  );
};

// HFlatList with generics
const HFlatList = <T,>(
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

  const hideOnScrollProps = useMemo(
    () =>
      hideOnScroll
        ? onScrolling({
            height: hideOnScroll.height,
            duration: hideOnScroll.duration ?? 300,
            threshold: hideOnScroll.threshold ?? 10,
            scrollDirection: hideOnScroll.scrollDirection,
            hideDirection: hideOnScroll.hideDirection,
          })
        : null,
    [hideOnScroll]
  );

  const flatListStyle: ViewStyle = useMemo(
    () => ({
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: backgroundColor ?? theme.colors.background,
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    }),
    [styles.base, padding, margin, backgroundColor, borderRadius, theme]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    },
    [hideOnScrollProps, hideOnScroll]
  );

  const handleEndReached = useCallback(() => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  }, [infiniteScroll]);

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
      // Performance optimizations for FlatList
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      legacyImplementation={false}
      {...props}
    />
  );
};

// ============= FLASHLIST COMPONENTS =============

// VFlashList with generics - Maximum Performance
const VFlashList = <T,>(
  {
    data,
    renderItem,
    keyExtractor,
    contentContainerStyle,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    hideOnScroll,
    themed = false,
    infiniteScroll,
    estimatedItemSize = 50,
    estimatedListSize,
    drawDistance = 250,
    disableAutoLayout = false,
    ...props
  }: FlashListPropsExtended<T>,
  ref: React.ForwardedRef<FlashList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createVStyles);

  const hideOnScrollProps = useMemo(
    () =>
      hideOnScroll
        ? onScrolling({
            height: hideOnScroll.height,
            duration: hideOnScroll.duration ?? 300,
            threshold: hideOnScroll.threshold ?? 10,
            scrollDirection: hideOnScroll.scrollDirection,
            hideDirection: hideOnScroll.hideDirection,
          })
        : null,
    [hideOnScroll]
  );

  const flashListStyle: ViewStyle = useMemo(
    () => ({
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: backgroundColor ?? theme.colors.background,
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    }),
    [styles.base, padding, margin, backgroundColor, borderRadius, theme]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    },
    [hideOnScrollProps, hideOnScroll]
  );

  const handleEndReached = useCallback(() => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  }, [infiniteScroll]);

  // Memoize renderItem for better performance
  const memoizedRenderItem = useCallback(
    (item: { item: T; index: number }) => renderItem(item),
    [renderItem]
  );

  return (
    <FlashList<T>
      ref={ref}
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      estimatedListSize={estimatedListSize}
      drawDistance={drawDistance}
      disableAutoLayout={disableAutoLayout}
      contentContainerStyle={contentContainerStyle ?? flashListStyle}
      onScroll={handleScroll}
      onEndReached={infiniteScroll ? handleEndReached : undefined}
      onEndReachedThreshold={infiniteScroll?.threshold ?? 0.1}
      {...props}
    />
  );
};

// HFlashList with generics - Maximum Performance
const HFlashList = <T,>(
  {
    data,
    renderItem,
    keyExtractor,
    contentContainerStyle,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    hideOnScroll,
    themed = false,
    infiniteScroll,
    estimatedItemSize = 100,
    estimatedListSize,
    drawDistance = 250,
    disableAutoLayout = false,
    ...props
  }: FlashListPropsExtended<T>,
  ref: React.ForwardedRef<FlashList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createHStyles);

  const hideOnScrollProps = useMemo(
    () =>
      hideOnScroll
        ? onScrolling({
            height: hideOnScroll.height,
            duration: hideOnScroll.duration ?? 300,
            threshold: hideOnScroll.threshold ?? 10,
            scrollDirection: hideOnScroll.scrollDirection,
            hideDirection: hideOnScroll.hideDirection,
          })
        : null,
    [hideOnScroll]
  );

  const flashListStyle: ViewStyle = useMemo(
    () => ({
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: backgroundColor ?? theme.colors.background,
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    }),
    [styles.base, padding, margin, backgroundColor, borderRadius, theme]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    },
    [hideOnScrollProps, hideOnScroll]
  );

  const handleEndReached = useCallback(() => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  }, [infiniteScroll]);

  // Memoize renderItem for better performance
  const memoizedRenderItem = useCallback(
    (item: { item: T; index: number }) => renderItem(item),
    [renderItem]
  );

  return (
    <FlashList<T>
      ref={ref}
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
      horizontal
      estimatedItemSize={estimatedItemSize}
      estimatedListSize={estimatedListSize}
      drawDistance={drawDistance}
      disableAutoLayout={disableAutoLayout}
      contentContainerStyle={contentContainerStyle ?? flashListStyle}
      onScroll={handleScroll}
      onEndReached={infiniteScroll ? handleEndReached : undefined}
      onEndReachedThreshold={infiniteScroll?.threshold ?? 0.1}
      {...props}
    />
  );
};

// ============= FORWARDREF COMPONENTS =============

const VList = forwardRef(VFlatList) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> }
) => React.ReactElement;

const HList = forwardRef(HFlatList) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> }
) => React.ReactElement;

const VFlashListComponent = forwardRef(VFlashList) as <T>(
  props: FlashListPropsExtended<T> & { ref?: React.ForwardedRef<FlashList<T>> }
) => React.ReactElement;

const HFlashListComponent = forwardRef(HFlashList) as <T>(
  props: FlashListPropsExtended<T> & { ref?: React.ForwardedRef<FlashList<T>> }
) => React.ReactElement;

// ============= STYLES =============

const createVStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flex: 1,
      flexDirection: 'column',
    },
  });

const createHStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flex: 1,
      flexDirection: 'row',
    },
  });

// ============= EXPORTS =============

export {
  VList,
  HList,
  VFlashListComponent as VFlashList,
  HFlashListComponent as HFlashList,
};

export type { ListProps, FlashListPropsExtended, InfiniteScrollProps };
