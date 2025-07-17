import { FlatList, FlatListProps, StyleSheet, ViewStyle } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Theme } from '../../../types/theme';
import { forwardRef, useCallback, useMemo } from 'react';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import Animated from 'react-native-reanimated';

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

// Animated FlatList Props - more restrictive to match Reanimated requirements
interface AnimatedListProps<T>
  extends Omit<FlatListProps<T>, 'renderItem' | 'CellRendererComponent'>,
    BaseListProps {
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
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
    themed = false,
    infiniteScroll,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createVStyles);

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
    themed = false,
    infiniteScroll,
    ...props
  }: ListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createHStyles);

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

// ============= ANIMATED FLATLIST COMPONENTS =============

// AnimatedVFlatList with generics
const AnimatedVFlatList = <T,>(
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
    infiniteScroll,
    ...props
  }: AnimatedListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createVStyles);

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

  const handleEndReached = useCallback(() => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  }, [infiniteScroll]);

  return (
    <Animated.FlatList<T>
      ref={ref}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[flatListStyle, style]}
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

// AnimatedHFlatList with generics
const AnimatedHFlatList = <T,>(
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
    infiniteScroll,
    ...props
  }: AnimatedListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createHStyles);

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

  const handleEndReached = useCallback(() => {
    if (infiniteScroll && infiniteScroll.hasMore && !infiniteScroll.loading) {
      infiniteScroll.onLoadMore();
    }
  }, [infiniteScroll]);

  return (
    <Animated.FlatList<T>
      ref={ref}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      style={[flatListStyle, style]}
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

const AnimatedVList = forwardRef(AnimatedVFlatList) as <T>(
  props: AnimatedListProps<T> & {
    ref?: React.ForwardedRef<Animated.FlatList<T>>;
  }
) => React.ReactElement;

const AnimatedHList = forwardRef(AnimatedHFlatList) as <T>(
  props: AnimatedListProps<T> & {
    ref?: React.ForwardedRef<Animated.FlatList<T>>;
  }
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
  AnimatedVList,
  AnimatedHList,
  VFlashListComponent as VFlashList,
  HFlashListComponent as HFlashList,
};

export type {
  ListProps,
  FlashListPropsExtended,
  AnimatedListProps,
  InfiniteScrollProps,
};
