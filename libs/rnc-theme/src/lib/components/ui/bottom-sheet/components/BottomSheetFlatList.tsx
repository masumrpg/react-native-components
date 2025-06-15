import { Dimensions, StyleSheet, View } from 'react-native';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { BackDrop } from './BackDrop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetMethods, BottomSheetFlatListProps } from '../types';

// Memoize BackDrop component to prevent unnecessary re-renders
const MemoizedBackDrop = memo(BackDrop);

/**
 * BottomSheetFlatList component that renders a bottom sheet with a FlatList inside
 * This component supports gestures and animations for smooth user interaction
 */
const BottomSheetFlatList = forwardRef<
  BottomSheetMethods,
  BottomSheetFlatListProps
>(
  (
    {
      snapTo,
      maxSnapTo,
      backgroundColor = '#FFFFFF',
      backDropColor,
      onStateChange,
      ListHeaderComponent,
      ListFooterComponent,
      contentContainerStyle,
      renderItem,
      ...rest
    }: BottomSheetFlatListProps,
    ref
  ) => {
    const inset = useSafeAreaInsets();
    const { height } = Dimensions.get('screen');
    const [isOpen, setIsOpen] = useState(false);

    // Parse percentages only once when props change
    const percentage = useCallback(
      () => parseFloat(snapTo.replace('%', '')) / 100,
      [snapTo]
    )();

    const maxPercentage = useCallback(
      () => (maxSnapTo ? parseFloat(maxSnapTo.replace('%', '')) / 100 : 0.8),
      [maxSnapTo]
    )();

    // Calculate heights once when dimensions or percentages change
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const minTopPosition = height - height * maxPercentage;

    // Shared values for animations
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const isDragging = useSharedValue(false);
    const startY = useSharedValue(0);
    const isMinimalMovement = useSharedValue(true);
    const canListScroll = useSharedValue(true);

    // Smooth animation config
    const timingConfig = useMemo(
      () => ({
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth cubic bezier curve
      }),
      []
    );

    // Reset animation values when snapTo changes
    useEffect(() => {
      // Cancel any ongoing animations first
      cancelAnimation(topAnimation);

      // If sheet is open, update to new position
      if (isOpen) {
        const newOpenHeight = height - height * percentage;
        topAnimation.value = withTiming(newOpenHeight, timingConfig);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snapTo, height, percentage, isOpen, topAnimation]);

    // Function to update isOpen state and call onStateChange
    const updateOpenState = useCallback(
      (newState: boolean) => {
        setIsOpen(newState);
        onStateChange?.(newState);
      },
      [onStateChange]
    );

    // Optimized expand function with more reliable animation
    const expand = useCallback(() => {
      // Cancel any ongoing animations
      cancelAnimation(topAnimation);

      // Use withTiming for more predictable results
      topAnimation.value = withTiming(openHeight, timingConfig, () => {
        runOnJS(updateOpenState)(true);
      });
    }, [openHeight, topAnimation, updateOpenState, timingConfig]);

    // Optimized close function with smooth animation
    const close = useCallback(() => {
      // Cancel any ongoing animations
      cancelAnimation(topAnimation);

      topAnimation.value = withTiming(closeHeight, timingConfig, () => {
        runOnJS(updateOpenState)(false);
      });
    }, [closeHeight, topAnimation, updateOpenState, timingConfig]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
        isOpen,
      }),
      [expand, close, isOpen]
    );

    const animationStyle = useAnimatedStyle(() => {
      return {
        top: topAnimation.value,
      };
    }, []);

    // Modified pan gesture with smooth transitions and better small movement handling
    const pan = Gesture.Pan()
      .onBegin((event) => {
        'worklet';
        context.value = topAnimation.value;
        startY.value = event.absoluteY;
        isDragging.value = true;
        isMinimalMovement.value = true;
        canListScroll.value = false; // Disable list scrolling during sheet drag
      })
      .onUpdate((event) => {
        'worklet';
        // Detect if this is a minimal movement or a significant drag
        if (Math.abs(event.translationY) > 10) {
          isMinimalMovement.value = false;
        }

        if (event.translationY < 0) {
          // Swipe up - limit to minTopPosition (maxSnapTo) without bouncing
          // Use direct assignment during dragging for responsive feel
          topAnimation.value = Math.max(
            minTopPosition,
            context.value + event.translationY
          );
        } else {
          // Swipe down
          topAnimation.value = context.value + event.translationY;
        }
      })
      .onEnd((event) => {
        'worklet';
        isDragging.value = false;
        canListScroll.value = true; // Re-enable list scrolling

        // For very small movements, don't change position dramatically
        if (isMinimalMovement.value && Math.abs(event.translationY) < 10) {
          // Stay at current position
          return;
        }

        // Use velocity to determine intention, with a moderate threshold
        const velocityThreshold = 200;

        if (event.velocityY < -velocityThreshold) {
          // Fast swipe up - go to maximum expanded position
          topAnimation.value = withTiming(minTopPosition, timingConfig, () => {
            runOnJS(updateOpenState)(true);
          });
        } else if (event.velocityY > velocityThreshold) {
          // Fast swipe down - close the sheet
          topAnimation.value = withTiming(closeHeight, timingConfig, () => {
            runOnJS(updateOpenState)(false);
          });
        } else {
          // Slower movement - use position to determine target
          // Create a snap point in the middle for better UX
          const midPoint = (openHeight + closeHeight) / 2;

          if (
            topAnimation.value <
            openHeight + (minTopPosition - openHeight) / 2
          ) {
            // Closer to max expansion
            topAnimation.value = withTiming(
              minTopPosition,
              timingConfig,
              () => {
                runOnJS(updateOpenState)(true);
              }
            );
          } else if (topAnimation.value < midPoint) {
            // Closer to open position
            topAnimation.value = withTiming(openHeight, timingConfig, () => {
              runOnJS(updateOpenState)(true);
            });
          } else {
            // Closer to closed position
            topAnimation.value = withTiming(closeHeight, timingConfig, () => {
              runOnJS(updateOpenState)(false);
            });
          }
        }
      });

    // Scroll handler for FlatList
    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
    });

    // Modified flatlist gesture handler
    const flatlistGesture = Gesture.Pan()
      .onBegin(() => {
        'worklet';
        if (!canListScroll.value) return;
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        'worklet';
        if (!canListScroll.value) return;

        // Only allow dragging down when at the top of list content
        if (event.translationY > 0 && scrollY.value <= 0) {
          canListScroll.value = false;

          // Prevent going higher than the max open position
          topAnimation.value = Math.max(
            minTopPosition,
            context.value + event.translationY
          );
        }
      })
      .onEnd((event) => {
        'worklet';
        if (scrollY.value > 0 || !isDragging.value) {
          canListScroll.value = true;
          return;
        }

        canListScroll.value = true;

        // Similar velocity-based logic as the main pan handler
        const velocityThreshold = 200;

        if (event.velocityY > velocityThreshold && scrollY.value <= 0) {
          // Fast swipe down - only if at top of content
          // Determine if we should go to initial open position or close
          if (topAnimation.value > openHeight + 100) {
            // Close sheet if already dragged down significantly
            topAnimation.value = withTiming(closeHeight, timingConfig, () => {
              runOnJS(updateOpenState)(false);
            });
          } else {
            // Go to normal open position
            topAnimation.value = withTiming(openHeight, timingConfig, () => {
              runOnJS(updateOpenState)(true);
            });
          }
        } else {
          // For slower movements, snap to nearest position
          if (topAnimation.value > (openHeight + closeHeight) / 2) {
            topAnimation.value = withTiming(closeHeight, timingConfig, () => {
              runOnJS(updateOpenState)(false);
            });
          } else {
            topAnimation.value = withTiming(openHeight, timingConfig, () => {
              runOnJS(updateOpenState)(true);
            });
          }
        }
      });

    const nativeGesture = Gesture.Native();
    const combinedGesture = Gesture.Simultaneous(
      nativeGesture,
      flatlistGesture
    );

    return (
      <>
        <MemoizedBackDrop
          topAnimation={topAnimation}
          backDropColor={backDropColor}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                backgroundColor: backgroundColor,
                paddingBottom: inset.bottom,
              },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <GestureDetector gesture={combinedGesture}>
              <Animated.FlatList
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(rest as any)}
                scrollEnabled={canListScroll.value}
                bounces={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                ListHeaderComponent={ListHeaderComponent}
                renderItem={renderItem}
                ListFooterComponent={ListFooterComponent}
                contentContainerStyle={[
                  styles.contentContainer,
                  contentContainerStyle,
                ]}
                keyboardShouldPersistTaps="handled"
              />
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

BottomSheetFlatList.displayName = 'BottomSheetFlatList';

export default memo(BottomSheetFlatList);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});
