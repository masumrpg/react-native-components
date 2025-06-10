import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import {
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

type SliderSize = 'sm' | 'md' | 'lg';
type SliderVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

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
    const { theme } = useTheme();
    const styles = useThemedStyles(createSliderStyles);

    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const currentValue = controlledValue ?? internalValue;
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);

    // Calculate percentage and position
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Update position when value changes
    useEffect(() => {
      if (sliderWidth > 0) {
        const newPosition = (percentage / 100) * (sliderWidth - styles[`${size}Thumb`].width);
        if (animated && !isDragging) {
          translateX.value = withSpring(newPosition, {
            damping: 15,
            stiffness: 150,
          });
        } else {
          translateX.value = newPosition;
        }
      }
    }, [percentage, sliderWidth, animated, isDragging, size, styles, translateX]);

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

    const panGesture = Gesture.Pan()
      .onStart(() => {
        if (disabled) return;

        scale.value = withSpring(1.2, {
          damping: 15,
          stiffness: 200,
        });

        runOnJS(setIsDragging)(true);
        if (onSlidingStart) {
          runOnJS(onSlidingStart)(currentValue);
        }
      })
      .onUpdate((event) => {
        if (disabled) return;

        const newX = translateX.value + event.translationX;
        const maxX = sliderWidth - styles[`${size}Thumb`].width;
        const clampedX = Math.min(Math.max(newX, 0), maxX);

        translateX.value = clampedX;

        const newPercentage = (clampedX / maxX) * 100;
        const newValue = min + (newPercentage / 100) * (max - min);

        runOnJS(updateValue)(newValue);
      })
      .onEnd(() => {
        if (disabled) return;

        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 200,
        });

        runOnJS(setIsDragging)(false);
        if (onSlidingComplete) {
          runOnJS(onSlidingComplete)(currentValue);
        }
      });

    const thumbAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { scale: scale.value },
        ],
      };
    });

    const handleLayout = (event: any) => {
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
                <GestureDetector gesture={panGesture}>
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
                </GestureDetector>
              );
            }
          }
          return child;
        })}
      </View>
    );
  }
);

Slider.displayName = 'Slider';

const SliderTrack = forwardRef<React.ComponentRef<typeof View>, SliderTrackProps>(
  ({ children, style, ...props }, ref) => {
    const styles = useThemedStyles(createSliderTrackStyles);

    return (
      <View ref={ref} style={[styles.track, style]} {...props}>
        {children}
      </View>
    );
  }
);

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
        return (theme.colors as any)[color] || color;
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
            width: `${percentage}%`,
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
        return (theme.colors as any)[color] || color;
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
            borderColor: getVariantColor(),
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

// Styles
const createSliderStyles = (theme: Theme) => ({
  container: {
    width: '100%' as const,
    justifyContent: 'center' as const,
    position: 'relative' as const,
  },
  sm: {
    height: 32,
  },
  md: {
    height: 40,
  },
  lg: {
    height: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  smThumb: {
    width: 16,
    height: 16,
  },
  mdThumb: {
    width: 20,
    height: 20,
  },
  lgThumb: {
    width: 24,
    height: 24,
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // Positioning thumb di tengah track
    top: '50%' as const,
    marginTop: -10, // Setengah dari tinggi thumb (20px / 2 = 10px untuk md)
  },
  sm: {
    width: 16,
    height: 16,
    marginTop: -8, // 16px / 2 = 8px
  },
  md: {
    width: 20,
    height: 20,
    marginTop: -10, // 20px / 2 = 10px
  },
  lg: {
    width: 24,
    height: 24,
    marginTop: -12, // 24px / 2 = 12px
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