import { useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

type VerticalHideDirectionType = 'up' | 'down';
type HorizontalHideDirectionType = 'left' | 'right';
type HideDirectionType =
  | VerticalHideDirectionType
  | HorizontalHideDirectionType;

type VerticalScrollDirectionType = 'up' | 'down';
type HorizontalScrollDirectionType = 'left' | 'right';
type ScrollDirectionType =
  | VerticalScrollDirectionType
  | HorizontalScrollDirectionType;

interface HideOnScrollOptions {
  /**
   * Height of the component to be hidden (in pixels)
   * This is required to calculate the correct translation distance
   */
  height: number;

  /**
   * Animation duration (in milliseconds)
   * Controls how quickly the component appears/disappears
   * @default 300
   */
  duration?: number;

  /**
   * Minimum scroll distance before animation starts (in pixels)
   * Helps prevent accidental triggers from small scroll movements
   * @default 10
   */
  threshold?: number;

  /**
   * Direction of scroll that triggers hiding the component
   * Vertical: 'up' | 'down' - hide component when scrolling up/down
   * Horizontal: 'left' | 'right' - hide component when scrolling left/right
   * @default 'down'
   */
  scrollDirection?: ScrollDirectionType;

  /**
   * Direction in which the component will be hidden
   * Vertical: 'up' | 'down' - component will slide up/down
   * Horizontal: 'left' | 'right' - component will slide left/right
   * @default 'down'
   */
  hideDirection?: HideDirectionType;

  /**
   * Orientation of the scroll
   * 'vertical' | 'horizontal'
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
}

type TranslateY = {
  translateY: number;
};

type TranslateX = {
  translateX: number;
};

type ScrollTransform = TranslateX | TranslateY;

interface HideOnScrollResult {
  /**
   * Animated style for the component to be hidden
   * Apply this to your component using style={[yourStyles, animatedStyle]}
   */
  animatedStyle: {
    transform: ScrollTransform[];
    opacity: number;
  };

  /**
   * Handler for onScroll event
   * Pass this to your ScrollView or FlatList component's onScroll prop
   */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

  /**
   * Shared value for vertical scroll position
   * Use this for creating derived animations in worklet functions
   */
  sharedScrollVertical: SharedValue<number>;

  /**
   * Shared value for horizontal scroll position
   * Use this for creating derived animations in worklet functions
   */
  sharedScrollHorizontal: SharedValue<number>;

  /**
   * Function to force show the component
   * Useful for programmatic control regardless of scroll position
   */
  forceShow: () => void;

  /**
   * Function to force hide the component
   * Useful for programmatic control regardless of scroll position
   */
  forceHide: () => void;
}

/**
 * Hook to create hide/show effect on components based on scroll direction.
 *
 * This hook is particularly useful for creating UI experiences where headers,
 * footers, or other UI elements appear and disappear based on how the user
 * scrolls through content. It includes bounce detection to prevent unwanted
 * hiding/showing when scrolling at the edges of the content.
 *
 * @param options - Configuration options for animation
 * @returns Object containing animatedStyle, onScroll handler, and additional controls
 *
 * @example
 * ```tsx
 * // Basic usage for header (hidden upward) using enum
 * const { animatedStyle, onScroll } = useHideOnScroll({
 *   height: 60,
 *   hideDirection: HideDirection.UP
 * });
 *
 * // Basic usage for header using string literal
 * const { animatedStyle, onScroll } = useHideOnScroll({
 *   height: 60,
 *   hideDirection: 'up'
 * });
 *
 * // For tabbar (hidden downward) using enum
 * const { animatedStyle, onScroll } = useHideOnScroll({
 *   height: 60,
 *   hideDirection: HideDirection.DOWN
 * });
 *
 * // For tabbar using string literal
 * const { animatedStyle, onScroll } = useHideOnScroll({
 *   height: 60,
 *   hideDirection: 'down'
 * });
 *
 * // Advanced usage with custom threshold and duration
 * const { animatedStyle, onScroll, forceShow, forceHide } = useHideOnScroll({
 *   height: 80,
 *   threshold: 20,        // More scroll needed to trigger
 *   duration: 200,        // Faster animation
 *   scrollDirection: 'up', // Hide when scrolling up
 *   hideDirection: 'up'
 * });
 *
 * // Advanced usage with visibility control and enum values
 * const { animatedStyle, onScroll, forceShow } = useHideOnScroll({
 *   height: 60,
 *   hideDirection: HideDirection.UP,
 *   scrollDirection: ScrollDirection.DOWN
 * });
 *
 * // Force show header when a specific tab is selected
 * useEffect(() => {
 *   if (activeTab === 'home') {
 *     forceShow();
 *   }
 * }, [activeTab, forceShow]);
 *
 * return (
 *   <>
 *     <Animated.View style={[styles.header, animatedStyle]}>
 *       <Text>Header</Text>
 *     </Animated.View>
 *     <ScrollView
 *       onScroll={onScroll}
 *       scrollEventThrottle={16} // Important for smooth animation
 *     >
 *       {content}
 *     </ScrollView>
 *   </>
 * );
 * ```
 *
 * @remarks
 * - Use `scrollEventThrottle={16}` on ScrollView/FlatList for 60fps smoothness
 * - The hook handles bounce effects at the top/bottom of scroll containers
 * - For complex layouts, you may need to adjust the threshold parameter
 * - Works with both ScrollView and FlatList components
 * - Supports both enum values (HideDirection.UP/DOWN, ScrollDirection.UP/DOWN)
 *   and string literals ('up'/'down') for direction props
 */
const useHideOnScroll = (options: HideOnScrollOptions): HideOnScrollResult => {
  const {
    height,
    duration = 300,
    threshold = 10,
    scrollDirection = 'down',
    hideDirection = 'down',
    orientation = 'vertical',
  } = options;

  // Renamed shared values
  const sharedScrollX = useSharedValue(0);
  const sharedScrollY = useSharedValue(0);
  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);
  const isVisible = useSharedValue(1);

  // Flag to track if currently in bouncing state
  const isBouncingRef = useRef(false);
  // To track if scrollView is at the very top or bottom
  const isAtEdgeRef = useRef(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const currentScrollY = contentOffset.y;
    const currentScrollX = contentOffset.x;

    // Update shared values
    sharedScrollX.value = currentScrollX;
    sharedScrollY.value = currentScrollY;

    // Detect edge based on orientation
    const isAtEdge =
      orientation === 'vertical'
        ? currentScrollY <= 0 ||
          currentScrollY + layoutMeasurement.height >= contentSize.height
        : currentScrollX <= 0 ||
          currentScrollX + layoutMeasurement.width >= contentSize.width;

    // Bounce handling
    if (isAtEdge) {
      if (!isAtEdgeRef.current) {
        isAtEdgeRef.current = true;
        isBouncingRef.current = true;
      }
    } else {
      if (isAtEdgeRef.current) {
        isAtEdgeRef.current = false;
        isBouncingRef.current = false;
      }
    }

    if (isBouncingRef.current) return;

    const diffY = currentScrollY - lastScrollY.current;
    const diffX = currentScrollX - lastScrollX.current;

    // Use appropriate diff based on orientation
    const diff = orientation === 'vertical' ? diffY : diffX;

    if (Math.abs(diff) < threshold) return;

    // Determine scroll direction based on orientation
    const isScrollingForward = diff > 0;
    const shouldHide =
      orientation === 'vertical'
        ? (scrollDirection === 'down' && isScrollingForward) ||
          (scrollDirection === 'up' && !isScrollingForward)
        : (scrollDirection === 'right' && isScrollingForward) ||
          (scrollDirection === 'left' && !isScrollingForward);

    isVisible.value = withTiming(shouldHide ? 0 : 1, { duration });

    // Update last positions
    lastScrollY.current = currentScrollY;
    lastScrollX.current = currentScrollX;
  };

  const forceShow = () => {
    isVisible.value = withTiming(1, { duration });
  };

  const forceHide = () => {
    isVisible.value = withTiming(0, { duration });
  };

  const animatedStyle = useAnimatedStyle(() => {
    // Determine if we're doing vertical or horizontal translation
    const isVertical = ['up', 'down'].includes(hideDirection);

    // Calculate translation direction
    const translationDirection = isVertical
      ? hideDirection === 'down'
        ? 1
        : -1
      : hideDirection === 'right'
      ? 1
      : -1;

    // Create transform based on orientation
    const transform = isVertical
      ? [
          {
            translateY: interpolate(
              isVisible.value,
              [0, 1],
              [height * translationDirection, 0],
              Extrapolation.CLAMP
            ),
          },
        ]
      : [
          {
            translateX: interpolate(
              isVisible.value,
              [0, 1],
              [height * translationDirection, 0],
              Extrapolation.CLAMP
            ),
          },
        ];

    const opacity = interpolate(
      isVisible.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform,
      opacity,
    };
  });

  return {
    animatedStyle,
    onScroll,
    sharedScrollVertical: sharedScrollY,
    sharedScrollHorizontal: sharedScrollX,
    forceShow,
    forceHide,
  };
};

export { useHideOnScroll };
export type {
  HideOnScrollOptions,
  HideOnScrollResult,
  HideDirectionType,
  ScrollDirectionType,
  VerticalHideDirectionType,
  HorizontalHideDirectionType,
  VerticalScrollDirectionType,
  HorizontalScrollDirectionType,
};