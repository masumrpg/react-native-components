import React, { forwardRef } from 'react';
import {
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
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

interface DragItem {
  id: string;
  [key: string]: unknown;
}

interface DraggableListProps<T extends DragItem> {
  data: T[];
  renderItem: (item: { item: T; index: number; isDragging: boolean }) => React.ReactElement;
  onDragEnd: (data: T[]) => void;
  keyExtractor: (item: T) => string;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
  itemHeight?: number;
  style?: ViewStyle;
}

interface ScrollProps extends ScrollViewProps {
  children?: React.ReactNode;
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

// Draggable List Item Component
const DraggableItem = <T extends DragItem>({
  item,
  index,
  renderItem,
  onDragEnd,
  itemHeight = 60,
  data,
  draggedIndex,
}: {
  item: T;
  index: number;
  renderItem: (props: { item: T; index: number; isDragging: boolean }) => React.ReactElement;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  itemHeight: number;
  data: T[];
  draggedIndex: Animated.SharedValue<number>;
}) => {
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      draggedIndex.value = index;
      scale.value = withSpring(1.02, { damping: 20, stiffness: 300 });
      zIndex.value = 1000;
    })
    .onUpdate((event) => {
      translateY.value = event.translationY;
      const newIndex = Math.round(index + event.translationY / itemHeight);
      const clampedIndex = Math.max(0, Math.min(data.length - 1, newIndex));
      draggedIndex.value = clampedIndex;
    })
    .onEnd(() => {
      const moveY = translateY.value;
      const newIndex = Math.round(index + moveY / itemHeight);
      const clampedIndex = Math.max(0, Math.min(data.length - 1, newIndex));

      if (clampedIndex !== index) {
        runOnJS(onDragEnd)(index, clampedIndex);
      }

      translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      isDragging.value = false;
      scale.value = withSpring(1, { damping: 20, stiffness: 300 });
      zIndex.value = 0;
      draggedIndex.value = -1;
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentDraggedIndex = draggedIndex.value;
    const shouldOffset =
      currentDraggedIndex !== -1 && currentDraggedIndex !== index;

    if (shouldOffset) {
      if (currentDraggedIndex < index) {
        offsetY.value = withSpring(-itemHeight * 0.1, {
          damping: 15,
          stiffness: 200,
        });
      } else if (currentDraggedIndex > index) {
        offsetY.value = withSpring(itemHeight * 0.1, {
          damping: 15,
          stiffness: 200,
        });
      }
    } else {
      offsetY.value = withSpring(0, { damping: 15, stiffness: 200 });
    }

    return {
      transform: [
        { translateY: translateY.value + offsetY.value },
        { scale: scale.value },
      ],
      zIndex: zIndex.value,
      elevation: isDragging.value ? 3 : 0,
      shadowOpacity: isDragging.value ? 0.15 : 0,
      shadowRadius: isDragging.value ? 6 : 0,
      shadowOffset: {
        width: 0,
        height: isDragging.value ? 3 : 0,
      },
    };
  });

  const isDraggingDerived = useDerivedValue(() => isDragging.value);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[{ height: itemHeight, marginBottom: 20 }, animatedStyle]}
      >
        {renderItem({ item, index, isDragging: isDraggingDerived.value })}
      </Animated.View>
    </GestureDetector>
  );
};

// Draggable List Component
const DraggableList = <T extends DragItem>({
  data,
  renderItem,
  onDragEnd,
  keyExtractor,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  themed = false,
  itemHeight = 60,
  style,
}: DraggableListProps<T>) => {
  const { theme } = useTheme();
  const [listData, setListData] = React.useState(data);
  const draggedIndex = useSharedValue(-1);

  React.useEffect(() => {
    setListData(data);
  }, [data]);

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    const newData = [...listData];
    const [movedItem] = newData.splice(fromIndex, 1);
    newData.splice(toIndex, 0, movedItem);
    setListData(newData);
    onDragEnd(newData);
  };

  const containerStyle: ViewStyle = {
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
    <View style={[containerStyle, style]}>
      {listData.map((item, index) => (
        <DraggableItem
          key={keyExtractor(item)}
          item={item}
          index={index}
          renderItem={renderItem}
          onDragEnd={handleDragEnd}
          itemHeight={itemHeight}
          data={listData}
          draggedIndex={draggedIndex}
        />
      ))}
    </View>
  );
};

export { VScroll, HScroll, VList, HList, DraggableList };
export type { ScrollProps, ListProps, InfiniteScrollProps, DraggableListProps, DragItem };
