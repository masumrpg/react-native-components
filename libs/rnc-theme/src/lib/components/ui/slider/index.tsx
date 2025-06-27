import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { Theme } from '../../../types/theme';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';

// Type definitions
type SliderRef = {
  setValue: (value: number) => void;
  getValue: () => number;
};

type RangeSliderRef = {
  setValues: (min: number, max: number) => void;
  getValues: () => { min: number; max: number };
};

type BaseSliderProps = BaseComponentProps & {
  width?: number;
  height?: number;
  min?: number;
  max?: number;
  step?: number;
  trackColor?: string;
  activeTrackColor?: string;
  thumbColor?: string;
  thumbSize?: number;
  showLabel?: boolean;
  showLabels?: boolean;
  labelFormatter?: (value: number) => string;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle;
};

interface SliderProps extends BaseSliderProps {
  initialValue?: number;
  onValueChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

interface RangeSliderProps extends BaseSliderProps {
  initialMinValue?: number;
  initialMaxValue?: number;
  onValueChange?: (values: { min: number; max: number }) => void;
  onSlidingStart?: (values: { min: number; max: number }) => void;
  onSlidingComplete?: (values: { min: number; max: number }) => void;
  minDistance?: number;
}

// Helper functions
const clamp = (value: number, min: number, max: number): number => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const snapToStep = (value: number, step: number, min: number): number => {
  'worklet';
  const snapped = Math.round((value - min) / step) * step + min;
  return snapped;
};

const valueToPosition = (
  value: number,
  min: number,
  max: number,
  width: number
): number => {
  'worklet';
  return ((value - min) / (max - min)) * width;
};

const positionToValue = (
  position: number,
  min: number,
  max: number,
  width: number
): number => {
  'worklet';
  return (position / width) * (max - min) + min;
};

// Variant styling function
const getVariantStyles = (
  variant: ComponentVariant,
  theme: Theme
): { trackColor: string; activeTrackColor: string; thumbColor: string } => {
  switch (variant) {
    case 'primary':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.primary,
        thumbColor: theme.colors.background,
      };
    case 'secondary':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.secondary,
        thumbColor: theme.colors.background,
      };
    case 'success':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.success,
        thumbColor: theme.colors.background,
      };
    case 'error':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.error,
        thumbColor: theme.colors.background,
      };
    case 'warning':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.warning,
        thumbColor: theme.colors.background,
      };
    case 'info':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.info,
        thumbColor: theme.colors.background,
      };
    case 'destructive':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.destructive,
        thumbColor: theme.colors.background,
      };
    case 'outline':
      return {
        trackColor: theme.colors.border,
        activeTrackColor: 'transparent',
        thumbColor: theme.colors.primary,
      };
    case 'filled':
      return {
        trackColor: `${theme.colors.primary}20`,
        activeTrackColor: theme.colors.primary,
        thumbColor: theme.colors.primary,
      };
    case 'ghost':
      return {
        trackColor: 'transparent',
        activeTrackColor: `${theme.colors.primary}40`,
        thumbColor: theme.colors.primary,
      };
    case 'default':
    default:
      return {
        trackColor: theme.colors.border,
        activeTrackColor: theme.colors.primary,
        thumbColor: theme.colors.background,
      };
  }
};

// Size styling function
const getSizeStyles = (
  size: ComponentSize
): { trackHeight: number; thumbSize: number; containerHeight: number } => {
  switch (size) {
    case 'xs':
      return { trackHeight: 2, thumbSize: 14, containerHeight: 32 };
    case 'sm':
      return { trackHeight: 3, thumbSize: 16, containerHeight: 36 };
    case 'md':
      return { trackHeight: 4, thumbSize: 20, containerHeight: 40 };
    case 'lg':
      return { trackHeight: 5, thumbSize: 24, containerHeight: 44 };
    case 'xl':
      return { trackHeight: 6, thumbSize: 28, containerHeight: 48 };
    default:
      return { trackHeight: 4, thumbSize: 20, containerHeight: 40 };
  }
};

// Slider Component
const Slider = forwardRef<SliderRef, SliderProps>(
  (
    {
      width = 300,
      height,
      min = 0,
      max = 100,
      step = 1,
      initialValue = min,
      disabled = false,
      variant = 'default',
      size = 'md',
      trackColor,
      activeTrackColor,
      thumbColor,
      thumbSize,
      showLabel = false,
      labelFormatter = (value) => value.toString(),
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      style,
      trackStyle,
      thumbStyle,
      labelStyle,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSliderStyles);

    // Get variant and size styles
    const variantStyles = useMemo(
      () => getVariantStyles(variant, theme),
      [variant, theme]
    );
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    // Use provided values or fallback to variant/size defaults
    const finalTrackColor = trackColor ?? variantStyles.trackColor;
    const finalActiveTrackColor =
      activeTrackColor ?? variantStyles.activeTrackColor;
    const finalThumbColor = thumbColor ?? variantStyles.thumbColor;
    const finalThumbSize = thumbSize ?? sizeStyles.thumbSize;
    const finalHeight = height ?? sizeStyles.containerHeight;

    // Shared values
    const sliderWidth = useSharedValue(width);
    const value = useSharedValue(clamp(initialValue, min, max));
    const isDragging = useSharedValue(false);

    // State for label value
    const [labelValue, setLabelValue] = useState(clamp(initialValue, min, max));

    // Sync shared value to state
    useAnimatedReaction(
      () => value.value,
      (current) => {
        runOnJS(setLabelValue)(current);
      }
    );

    // Update on initialValue change
    useEffect(() => {
      value.value = clamp(initialValue, min, max);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue, min, max]);

    // Layout handler
    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        sliderWidth.value = event.nativeEvent.layout.width;
      },
      [sliderWidth]
    );

    // Callbacks
    const handleValueChange = useCallback(
      (newValue: number) => {
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    const handleSlidingStart = useCallback(
      (newValue: number) => {
        onSlidingStart?.(newValue);
      },
      [onSlidingStart]
    );

    const handleSlidingComplete = useCallback(
      (newValue: number) => {
        onSlidingComplete?.(newValue);
      },
      [onSlidingComplete]
    );

    // Pan gesture
    const panGesture = useMemo(
      () =>
        Gesture.Pan()
          .enabled(!disabled)
          .onStart(() => {
            isDragging.value = true;
            runOnJS(handleSlidingStart)(value.value);
          })
          .onUpdate((event) => {
            const newPosition = clamp(event.x, 0, sliderWidth.value);
            const newValue = positionToValue(
              newPosition,
              min,
              max,
              sliderWidth.value
            );
            const snappedValue = snapToStep(newValue, step, min);
            const clampedValue = clamp(snappedValue, min, max);

            value.value = clampedValue;
            runOnJS(handleValueChange)(clampedValue);
          })
          .onEnd(() => {
            isDragging.value = false;
            runOnJS(handleSlidingComplete)(value.value);
          }),
      [
        disabled,
        min,
        max,
        step,
        sliderWidth,
        value,
        isDragging,
        handleValueChange,
        handleSlidingStart,
        handleSlidingComplete,
      ]
    );

    // Animated styles
    const thumbAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        value.value,
        min,
        max,
        sliderWidth.value
      );
      const scale = isDragging.value ? 1.2 : 1;

      return {
        transform: [
          { translateX: position - finalThumbSize / 2 },
          { scale: withSpring(scale) },
        ],
      };
    });

    const activeTrackAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        value.value,
        min,
        max,
        sliderWidth.value
      );

      return {
        width: position,
      };
    });

    const labelAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        value.value,
        min,
        max,
        sliderWidth.value
      );
      const opacity = isDragging.value ? 1 : 0;

      return {
        transform: [{ translateX: position - 150 }],
        opacity: withSpring(opacity),
      };
    });

    // Imperative handle
    useImperativeHandle(
      ref,
      () => ({
        setValue: (newValue: number) => {
          const clampedValue = clamp(newValue, min, max);
          value.value = clampedValue;
          handleValueChange(clampedValue);
        },
        getValue: () => value.value,
      }),
      [value, min, max, handleValueChange]
    );

    // Resolved colors
    // const resolvedTrackColor = useMemo(
    //   () => resolveColor(theme, finalTrackColor, theme.colors.border),
    //   [finalTrackColor, theme]
    // );

    // const resolvedActiveTrackColor = useMemo(
    //   () => resolveColor(theme, finalActiveTrackColor, theme.colors.primary),
    //   [finalActiveTrackColor, theme]
    // );

    // const resolvedThumbColor = useMemo(
    //   () => resolveColor(theme, finalThumbColor, theme.colors.background),
    //   [finalThumbColor, theme]
    // );

    return (
      <View style={[styles.container, { height: finalHeight }, style]}>
        {showLabel && (
          <Animated.View style={[styles.labelContainer, labelAnimatedStyle]}>
            <Text style={[styles.label, labelStyle]}>
              {labelFormatter(labelValue)}
            </Text>
          </Animated.View>
        )}

        <GestureDetector gesture={panGesture}>
          <View
            style={[styles.sliderContainer, { width }]}
            onLayout={handleLayout}
          >
            {/* Track */}
            <View
              style={[
                styles.track,
                {
                  backgroundColor: finalTrackColor,
                  height: sizeStyles.trackHeight,
                },
                trackStyle,
              ]}
            />

            {/* Active Track */}
            <Animated.View
              style={[
                styles.activeTrack,
                {
                  backgroundColor: finalActiveTrackColor,
                  height: sizeStyles.trackHeight,
                },
                activeTrackAnimatedStyle,
              ]}
            />

            {/* Thumb */}
            <Animated.View
              style={[
                styles.thumb,
                {
                  backgroundColor: finalThumbColor,
                  width: finalThumbSize,
                  height: finalThumbSize,
                  borderRadius: finalThumbSize / 2,
                  borderWidth: 2,
                  borderColor: finalActiveTrackColor,
                },
                thumbStyle,
                thumbAnimatedStyle,
              ]}
            />
          </View>
        </GestureDetector>
      </View>
    );
  }
);

// RangeSlider Component - Similar updates applied
const RangeSlider = forwardRef<RangeSliderRef, RangeSliderProps>(
  (
    {
      width = 300,
      height,
      min = 0,
      max = 100,
      step = 1,
      initialMinValue = min,
      initialMaxValue = max,
      minDistance = 0,
      disabled = false,
      variant = 'default',
      size = 'md',
      trackColor,
      activeTrackColor,
      thumbColor,
      thumbSize,
      showLabels = false,
      labelFormatter = (value) => value.toString(),
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      style,
      trackStyle,
      thumbStyle,
      labelStyle,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSliderStyles);

    // Get variant and size styles
    const variantStyles = useMemo(
      () => getVariantStyles(variant, theme),
      [variant, theme]
    );
    const sizeStyles = useMemo(() => getSizeStyles(size), [size]);

    // Use provided values or fallback to variant/size defaults
    const finalTrackColor = trackColor ?? variantStyles.trackColor;
    const finalActiveTrackColor =
      activeTrackColor ?? variantStyles.activeTrackColor;
    const finalThumbColor = thumbColor ?? variantStyles.thumbColor;
    const finalThumbSize = thumbSize ?? sizeStyles.thumbSize;
    const finalHeight = height ?? sizeStyles.containerHeight;

    // Shared values
    const sliderWidth = useSharedValue(width);
    const minValue = useSharedValue(clamp(initialMinValue, min, max));
    const maxValue = useSharedValue(clamp(initialMaxValue, min, max));
    const isDraggingMin = useSharedValue(false);
    const isDraggingMax = useSharedValue(false);
    const activeThumb = useSharedValue<'min' | 'max' | null>(null);

    // State for label values
    const [minLabelValue, setMinLabelValue] = useState(
      clamp(initialMinValue, min, max)
    );
    const [maxLabelValue, setMaxLabelValue] = useState(
      clamp(initialMaxValue, min, max)
    );

    // Sync shared values to state
    useAnimatedReaction(
      () => minValue.value,
      (current) => {
        runOnJS(setMinLabelValue)(current);
      }
    );

    useAnimatedReaction(
      () => maxValue.value,
      (current) => {
        runOnJS(setMaxLabelValue)(current);
      }
    );

    // Update on initial values change
    useEffect(() => {
      minValue.value = clamp(initialMinValue, min, max);
      maxValue.value = clamp(initialMaxValue, min, max);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialMinValue, initialMaxValue, min, max]);

    // Layout handler
    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        sliderWidth.value = event.nativeEvent.layout.width;
      },
      [sliderWidth]
    );

    // Callbacks
    const handleValueChange = useCallback(
      (newMinValue: number, newMaxValue: number) => {
        onValueChange?.({ min: newMinValue, max: newMaxValue });
      },
      [onValueChange]
    );

    const handleSlidingStart = useCallback(
      (newMinValue: number, newMaxValue: number) => {
        onSlidingStart?.({ min: newMinValue, max: newMaxValue });
      },
      [onSlidingStart]
    );

    const handleSlidingComplete = useCallback(
      (newMinValue: number, newMaxValue: number) => {
        onSlidingComplete?.({ min: newMinValue, max: newMaxValue });
      },
      [onSlidingComplete]
    );

    // Pan gesture
    const panGesture = useMemo(
      () =>
        Gesture.Pan()
          .enabled(!disabled)
          .onStart((event) => {
            const minPosition = valueToPosition(
              minValue.value,
              min,
              max,
              sliderWidth.value
            );
            const maxPosition = valueToPosition(
              maxValue.value,
              min,
              max,
              sliderWidth.value
            );

            const distanceToMin = Math.abs(event.x - minPosition);
            const distanceToMax = Math.abs(event.x - maxPosition);

            if (distanceToMin < distanceToMax) {
              activeThumb.value = 'min';
              isDraggingMin.value = true;
            } else {
              activeThumb.value = 'max';
              isDraggingMax.value = true;
            }

            runOnJS(handleSlidingStart)(minValue.value, maxValue.value);
          })
          .onUpdate((event) => {
            const newPosition = clamp(event.x, 0, sliderWidth.value);
            const newValue = positionToValue(
              newPosition,
              min,
              max,
              sliderWidth.value
            );
            const snappedValue = snapToStep(newValue, step, min);
            const clampedValue = clamp(snappedValue, min, max);

            if (activeThumb.value === 'min') {
              const maxAllowed = maxValue.value - minDistance;
              minValue.value = clamp(clampedValue, min, maxAllowed);
            } else if (activeThumb.value === 'max') {
              const minAllowed = minValue.value + minDistance;
              maxValue.value = clamp(clampedValue, minAllowed, max);
            }

            runOnJS(handleValueChange)(minValue.value, maxValue.value);
          })
          .onEnd(() => {
            isDraggingMin.value = false;
            isDraggingMax.value = false;
            activeThumb.value = null;
            runOnJS(handleSlidingComplete)(minValue.value, maxValue.value);
          }),
      [
        disabled,
        min,
        max,
        step,
        minDistance,
        sliderWidth,
        minValue,
        maxValue,
        isDraggingMin,
        isDraggingMax,
        activeThumb,
        handleValueChange,
        handleSlidingStart,
        handleSlidingComplete,
      ]
    );

    // Animated styles
    const minThumbAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        minValue.value,
        min,
        max,
        sliderWidth.value
      );
      const scale = isDraggingMin.value ? 1.2 : 1;

      return {
        transform: [
          { translateX: position - finalThumbSize / 2 },
          { scale: withSpring(scale) },
        ],
      };
    });

    const maxThumbAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        maxValue.value,
        min,
        max,
        sliderWidth.value
      );
      const scale = isDraggingMax.value ? 1.2 : 1;

      return {
        transform: [
          { translateX: position - finalThumbSize / 2 },
          { scale: withSpring(scale) },
        ],
      };
    });

    const activeTrackAnimatedStyle = useAnimatedStyle(() => {
      const minPosition = valueToPosition(
        minValue.value,
        min,
        max,
        sliderWidth.value
      );
      const maxPosition = valueToPosition(
        maxValue.value,
        min,
        max,
        sliderWidth.value
      );

      return {
        left: minPosition,
        width: maxPosition - minPosition,
      };
    });

    const minLabelAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        minValue.value,
        min,
        max,
        sliderWidth.value
      );
      const opacity = isDraggingMin.value ? 1 : 0;

      return {
        transform: [{ translateX: position - 150 }],
        opacity: withSpring(opacity),
      };
    });

    const maxLabelAnimatedStyle = useAnimatedStyle(() => {
      const position = valueToPosition(
        maxValue.value,
        min,
        max,
        sliderWidth.value
      );
      const opacity = isDraggingMax.value ? 1 : 0;

      return {
        transform: [{ translateX: position - 150 }],
        opacity: withSpring(opacity),
      };
    });

    // Imperative handle
    useImperativeHandle(
      ref,
      () => ({
        setValues: (newMinValue: number, newMaxValue: number) => {
          const clampedMin = clamp(newMinValue, min, max);
          const clampedMax = clamp(newMaxValue, min, max);
          minValue.value = clampedMin;
          maxValue.value = clampedMax;
          handleValueChange(clampedMin, clampedMax);
        },
        getValues: () => ({ min: minValue.value, max: maxValue.value }),
      }),
      [minValue, maxValue, min, max, handleValueChange]
    );

    return (
      <View style={[styles.container, { height: finalHeight }, style]}>
        {showLabels && (
          <>
            <Animated.View
              style={[styles.labelContainer, minLabelAnimatedStyle]}
            >
              <Text style={[styles.label, labelStyle]}>
                {labelFormatter(minLabelValue)}
              </Text>
            </Animated.View>
            <Animated.View
              style={[styles.labelContainer, maxLabelAnimatedStyle]}
            >
              <Text style={[styles.label, labelStyle]}>
                {labelFormatter(maxLabelValue)}
              </Text>
            </Animated.View>
          </>
        )}

        <GestureDetector gesture={panGesture}>
          <View
            style={[styles.sliderContainer, { width }]}
            onLayout={handleLayout}
          >
            {/* Track */}
            <View
              style={[
                styles.track,
                {
                  backgroundColor: finalTrackColor,
                  height: sizeStyles.trackHeight,
                },
                trackStyle,
              ]}
            />

            {/* Active Track */}
            <Animated.View
              style={[
                styles.activeTrack,
                {
                  backgroundColor: finalActiveTrackColor,
                  height: sizeStyles.trackHeight,
                },
                activeTrackAnimatedStyle,
              ]}
            />

            {/* Min Thumb */}
            <Animated.View
              style={[
                styles.thumb,
                {
                  backgroundColor: finalThumbColor,
                  width: finalThumbSize,
                  height: finalThumbSize,
                  borderRadius: finalThumbSize / 2,
                  borderWidth: 2,
                  borderColor: finalActiveTrackColor,
                },
                thumbStyle,
                minThumbAnimatedStyle,
              ]}
            />

            {/* Max Thumb */}
            <Animated.View
              style={[
                styles.thumb,
                {
                  backgroundColor: finalThumbColor,
                  width: finalThumbSize,
                  height: finalThumbSize,
                  borderRadius: finalThumbSize / 2,
                  borderWidth: 2,
                  borderColor: finalActiveTrackColor,
                },
                thumbStyle,
                maxThumbAnimatedStyle,
              ]}
            />
          </View>
        </GestureDetector>
      </View>
    );
  }
);

// Styles
const createSliderStyles = (theme: Theme) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  } ,
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  } ,
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 2,
  } ,
  activeTrack: {
    position: 'absolute',
    borderRadius: 2,
  } ,
  thumb: {
    position: 'absolute',
    // shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } ,
  labelContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: 50,
    alignItems: 'center',
  } ,
  label: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '500',
  },
});

// Set display names
Slider.displayName = 'Slider';
RangeSlider.displayName = 'RangeSlider';

export {
  Slider,
  RangeSlider,
  type SliderProps,
  type RangeSliderProps,
  type RangeSliderRef,
  type SliderRef,
};
