import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { View, ViewStyle, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

type SliderSize = 'sm' | 'md' | 'lg';
type SliderVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

interface SliderProps {
  children?: React.ReactNode;
  value?: number; // 0-100
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  variant?: SliderVariant;
  disabled?: boolean;
  style?: ViewStyle;
  trackColor?: string | keyof Theme['colors'];
  onValueChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  animated?: boolean;
}

interface SliderTrackProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface SliderFilledTrackProps {
  style?: ViewStyle;
  color?: string | keyof Theme['colors'];
}

interface SliderThumbProps {
  style?: ViewStyle;
  color?: string | keyof Theme['colors'];
}

const Slider = forwardRef<React.ComponentRef<typeof View>, SliderProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      size = 'md',
      variant = 'default',
      disabled = false,
      style,
      trackColor,
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      animated = true,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createSliderStyles);

    const [internalValue, setInternalValue] = useState(
      controlledValue ?? defaultValue
    );
    const [sliderWidth, setSliderWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);

    const currentValue = controlledValue ?? internalValue;

    // Shared values
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);

    // Get thumb dimensions
    const thumbSize = getThumbSize(size);
    const trackHeight = getTrackHeight(size);

    // Calculate percentage and position
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Update position when value changes
    useEffect(() => {
      if (sliderWidth > 0 && !isDragging) {
        const maxTranslateX = sliderWidth - thumbSize.width;
        const newPosition = (percentage / 100) * maxTranslateX;

        if (animated) {
          translateX.value = withSpring(
            Math.max(0, Math.min(newPosition, maxTranslateX)),
            {
              damping: 20,
              stiffness: 200,
              mass: 0.8,
            }
          );
        } else {
          translateX.value = Math.max(0, Math.min(newPosition, maxTranslateX));
        }
      }
    }, [
      percentage,
      sliderWidth,
      animated,
      isDragging,
      thumbSize.width,
      translateX,
    ]);

    const updateValue = useCallback(
      (newValue: number) => {
        const clampedValue = Math.min(Math.max(newValue, min), max);
        const steppedValue = Math.round(clampedValue / step) * step;

        if (controlledValue === undefined) {
          setInternalValue(steppedValue);
        }
        onValueChange?.(steppedValue);
      },
      [min, max, step, controlledValue, onValueChange]
    );

    // Enhanced pan gesture with better accuracy
    const panGesture = Gesture.Pan()
      .onStart((event) => {
        if (disabled) return;

        // Enhanced scale animation
        scale.value = withSpring(1.15, {
          damping: 12,
          stiffness: 250,
          mass: 0.5,
        });

        runOnJS(setIsDragging)(true);
        runOnJS(setStartPosition)(translateX.value);

        if (onSlidingStart) {
          runOnJS(onSlidingStart)(currentValue);
        }
      })
      .onUpdate((event) => {
        if (disabled || sliderWidth === 0) return;

        const maxTranslateX = sliderWidth - thumbSize.width;

        // Improved position calculation with better sensitivity
        const newTranslateX = Math.max(
          0,
          Math.min(startPosition + event.translationX, maxTranslateX)
        );

        translateX.value = newTranslateX;

        // More accurate value calculation
        const newPercentage =
          maxTranslateX > 0 ? (newTranslateX / maxTranslateX) * 100 : 0;
        const rawValue = min + (newPercentage / 100) * (max - min);

        // Apply step with better rounding
        const steppedValue = Math.round(rawValue / step) * step;
        const finalValue = Math.min(Math.max(steppedValue, min), max);

        runOnJS(updateValue)(finalValue);
      })
      .onEnd(() => {
        if (disabled) return;

        // Smooth scale return animation
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 200,
          mass: 0.8,
        });

        runOnJS(setIsDragging)(false);

        if (onSlidingComplete) {
          runOnJS(onSlidingComplete)(currentValue);
        }

        // Snap to final position with smooth animation
        const maxTranslateX = sliderWidth - thumbSize.width;
        const finalPercentage = ((currentValue - min) / (max - min)) * 100;
        const finalPosition = (finalPercentage / 100) * maxTranslateX;

        translateX.value = withSpring(
          Math.max(0, Math.min(finalPosition, maxTranslateX)),
          {
            damping: 18,
            stiffness: 180,
            mass: 0.7,
          }
        );
      });

    // Enhanced tap gesture for direct positioning
    const tapGesture = Gesture.Tap().onStart((event) => {
      if (disabled || sliderWidth === 0) return;

      const maxTranslateX = sliderWidth - thumbSize.width;
      const tapX = event.x - thumbSize.width / 2; // Center the thumb on tap position
      const clampedX = Math.max(0, Math.min(tapX, maxTranslateX));

      // Calculate new value based on tap position
      const newPercentage =
        maxTranslateX > 0 ? (clampedX / maxTranslateX) * 100 : 0;
      const rawValue = min + (newPercentage / 100) * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const finalValue = Math.min(Math.max(steppedValue, min), max);

      // Animate to new position
      if (animated) {
        translateX.value = withSpring(clampedX, {
          damping: 18,
          stiffness: 200,
          mass: 0.8,
        });

        // Brief scale animation for feedback
        scale.value = withSpring(1.1, {
          damping: 15,
          stiffness: 300,
        });

        setTimeout(() => {
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 200,
          });
        }, 100);
      } else {
        translateX.value = clampedX;
      }

      runOnJS(updateValue)(finalValue);
    });

    // Combined gesture
    const combinedGesture = Gesture.Race(panGesture, tapGesture);

    // Enhanced animated styles
    const thumbAnimatedStyle = useAnimatedStyle(() => {
      const maxTranslateX = sliderWidth - thumbSize.width;
      return {
        transform: [
          {
            translateX: Math.max(
              0,
              Math.min(translateX.value, maxTranslateX || 0)
            ),
          },
          { scale: scale.value },
        ],
      };
    });

    const handleLayout = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setSliderWidth(width);
    };

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          styles[size],
          disabled && styles.disabled,
          style,
        ]}
        onLayout={handleLayout}
        {...props}
      >
        <GestureDetector gesture={combinedGesture}>
          <View style={{ flex: 1 }}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                if (child.type === SliderTrack) {
                  return React.cloneElement(
                    child as React.ReactElement<
                      SliderTrackProps & {
                        percentage?: number;
                        variant?: SliderVariant;
                        size?: SliderSize;
                        trackColor?: string | keyof Theme['colors'];
                      }
                    >,
                    {
                      percentage,
                      variant,
                      size,
                      trackColor,
                    }
                  );
                }
                if (child.type === SliderThumb) {
                  return (
                    <Animated.View style={thumbAnimatedStyle}>
                      {React.cloneElement(
                        child as React.ReactElement<
                          SliderThumbProps & {
                            variant?: SliderVariant;
                            size?: SliderSize;
                            disabled?: boolean;
                          }
                        >,
                        {
                          variant,
                          size,
                          disabled,
                        }
                      )}
                    </Animated.View>
                  );
                }
              }
              return child;
            })}
          </View>
        </GestureDetector>
      </View>
    );
  }
);

Slider.displayName = 'Slider';

const SliderTrack = forwardRef<
  React.ComponentRef<typeof View>,
  SliderTrackProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createSliderTrackStyles);

  return (
    <View ref={ref} style={[styles.track, style]} {...props}>
      {children}
    </View>
  );
});

SliderTrack.displayName = 'SliderTrack';

const SliderFilledTrack = forwardRef<
  React.ComponentRef<typeof View>,
  SliderFilledTrackProps & {
    percentage?: number;
    variant?: SliderVariant;
    size?: SliderSize;
  }
>(
  (
    {
      style,
      color,
      percentage = 0,
      variant = 'default',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSliderFilledTrackStyles);

    const getVariantColor = (): string => {
      if (color) {
        if (typeof color === 'string' && color.startsWith('#')) return color;
        return (theme.colors as Record<string, string>)[color] || color;
      }

      switch (variant) {
        case 'primary':
          return theme.colors.primary;
        case 'success':
          return '#10B981';
        case 'warning':
          return '#F59E0B';
        case 'error':
          return '#EF4444';
        case 'info':
          return '#3B82F6';
        default:
          return theme.colors.primary;
      }
    };

    return (
      <View
        ref={ref}
        style={[
          styles.filledTrack,
          styles[size],
          {
            width: `${Math.max(0, Math.min(percentage, 100))}%`,
            backgroundColor: getVariantColor(),
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

SliderFilledTrack.displayName = 'SliderFilledTrack';

const SliderThumb = forwardRef<
  React.ComponentRef<typeof View>,
  SliderThumbProps & {
    variant?: SliderVariant;
    size?: SliderSize;
    disabled?: boolean;
  }
>(
  (
    {
      style,
      color,
      variant = 'default',
      size = 'md',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSliderThumbStyles);

    const getVariantColor = (): string => {
      if (color) {
        if (typeof color === 'string' && color.startsWith('#')) return color;
        return (theme.colors as Record<string, string>)[color] || color;
      }

      if (disabled) {
        return theme.colors.border;
      }

      switch (variant) {
        case 'primary':
          return theme.colors.primary;
        case 'success':
          return '#10B981';
        case 'warning':
          return '#F59E0B';
        case 'error':
          return '#EF4444';
        case 'info':
          return '#3B82F6';
        default:
          return theme.colors.primary;
      }
    };

    return (
      <View
        ref={ref}
        style={[
          styles.thumb,
          styles[size],
          {
            backgroundColor: getVariantColor(),
            borderColor: '#FFFFFF',
          },
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      />
    );
  }
);

SliderThumb.displayName = 'SliderThumb';

// Helper functions
const getThumbSize = (size: SliderSize) => {
  switch (size) {
    case 'sm':
      return { width: 16, height: 16 };
    case 'md':
      return { width: 20, height: 20 };
    case 'lg':
      return { width: 24, height: 24 };
    default:
      return { width: 20, height: 20 };
  }
};

const getTrackHeight = (size: SliderSize) => {
  switch (size) {
    case 'sm':
      return 2;
    case 'md':
      return 4;
    case 'lg':
      return 6;
    default:
      return 4;
  }
};

// Enhanced styles
const createSliderStyles = (_: Theme) => ({
  container: {
    width: '100%' as const,
    justifyContent: 'center' as const,
    position: 'relative' as const,
  },
  sm: {
    height: 32,
    paddingHorizontal: 8, // Add padding for better touch area
  },
  md: {
    height: 40,
    paddingHorizontal: 10,
  },
  lg: {
    height: 48,
    paddingHorizontal: 12,
  },
  disabled: {
    opacity: 0.5,
  },
});

const createSliderTrackStyles = (theme: Theme) => ({
  track: {
    position: 'absolute' as const,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    top: '50%' as const,
    marginTop: -2,
  },
});

const createSliderFilledTrackStyles = (theme: Theme) => ({
  filledTrack: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: theme.borderRadius.full,
  },
  sm: {
    height: 2,
  },
  md: {
    height: 4,
  },
  lg: {
    height: 6,
  },
});

const createSliderThumbStyles = (theme: Theme) => ({
  thumb: {
    position: 'absolute' as const,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    top: '50%' as const,
  },
  sm: {
    width: 16,
    height: 16,
    marginTop: 4,
  },
  md: {
    width: 20,
    height: 20,
    marginTop: 6,
  },
  lg: {
    width: 24,
    height: 24,
    marginTop: 8,
  },
  disabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  type SliderProps,
  type SliderTrackProps,
  type SliderFilledTrackProps,
  type SliderThumbProps,
};
