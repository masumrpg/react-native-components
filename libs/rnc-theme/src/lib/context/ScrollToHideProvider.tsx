import React, { createContext, useContext } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

const DEFAULT_HEADER_HEIGHT = 100;
const DEFAULT_TABBAR_HEIGHT = 60;

interface ScrollContextType {
  scrollY: ReturnType<typeof useSharedValue<number>>;
  clampedScrollY: ReturnType<typeof useDerivedValue<number>>;
  headerTranslateY: ReturnType<typeof useDerivedValue<number>>;
  tabBarTranslateY: ReturnType<typeof useDerivedValue<number>>;
  headerHeight: number;
  tabBarHeight: number;
  width: number;
  onScroll: ReturnType<typeof useAnimatedScrollHandler>;
  onScrollRegular: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export type ScrollToHideProviderProps = {
  children: React.ReactNode;
  headerHeight?: number;
  tabBarHeight?: number;
}

export const ScrollToHideProvider = ({
  children,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  tabBarHeight = DEFAULT_TABBAR_HEIGHT,
}: ScrollToHideProviderProps) => {
  const { width } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const clampedOffset = useSharedValue(0);

  // Derived value untuk clamped scroll position
  const clampedScrollY = useDerivedValue(() => {
    const diff = scrollY.value - lastScrollY.value;
    lastScrollY.value = scrollY.value;

    clampedOffset.value = Math.min(
      Math.max(clampedOffset.value + diff, 0),
      headerHeight
    );

    return clampedOffset.value;
  });

  // Header translate animation menggunakan interpolasi yang smooth
  const headerTranslateY = useDerivedValue(() => {
    return interpolate(
      clampedScrollY.value,
      [0, headerHeight],
      [0, -headerHeight],
      Extrapolation.CLAMP
    );
  });

  // TabBar translate animation
  const tabBarTranslateY = useDerivedValue(() => {
    return interpolate(
      clampedScrollY.value,
      [0, headerHeight],
      [0, tabBarHeight],
      Extrapolation.CLAMP
    );
  });

  // Animated scroll handler untuk react-native-reanimated
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Regular scroll handler untuk ScrollView biasa
  const onScrollRegular = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    'worklet';
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const contextValue: ScrollContextType = {
    scrollY,
    clampedScrollY,
    headerTranslateY,
    tabBarTranslateY,
    headerHeight,
    tabBarHeight,
    width,
    onScroll,
    onScrollRegular,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook untuk menggunakan ScrollContext
export const useScrollToHide = () => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error(
      'useScrollToHide must be used within a ScrollToHideProvider'
    );
  }

  return context;
};

// Hook untuk mendapatkan nilai scroll saja
export const useScrollValues = () => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error(
      'useScrollValues must be used within a ScrollToHideProvider'
    );
  }

  const { scrollY, clampedScrollY } = context;

  return {
    scrollValue: scrollY.value,
    clampedValue: clampedScrollY.value,
  };
};
