import React, { createContext, useContext, forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

type RadioSize = 'sm' | 'md' | 'lg';
type RadioVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface RadioProps {
  value: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: RadioSize;
  variant?: RadioVariant;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface RadioIndicatorProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface RadioIconProps {
  icon?: React.ReactNode;
  style?: ViewStyle;
}

interface RadioLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

// Context untuk RadioGroup
interface RadioGroupContextType {
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

const useRadioGroup = () => {
  return useContext(RadioGroupContext);
};

const Radio = forwardRef<React.ComponentRef<typeof TouchableOpacity>, RadioProps>(
  (
    {
      value,
      checked: controlledChecked,
      onCheckedChange,
      size = 'md',
      variant = 'default',
      disabled: radioDisabled = false,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createRadioStyles);
    const groupContext = useRadioGroup();

    // Animation values - Improved spring configuration
    const scale = useSharedValue(1);
    const dotProgress = useSharedValue(0);
    const backgroundProgress = useSharedValue(0);
    const borderProgress = useSharedValue(0);

    // Determine if radio is checked
    const isChecked = groupContext
      ? groupContext.value === value
      : controlledChecked || false;

    // Determine if radio is disabled
    const isDisabled = groupContext ? groupContext.disabled : radioDisabled;

    // Update animations when checked state changes - Much smoother config
    React.useEffect(() => {
      // Super smooth spring animation untuk dot
      dotProgress.value = withSpring(isChecked ? 1 : 0, {
        damping: 20,
        stiffness: 300,
        mass: 0.8,
      });

      // Faster background transition
      backgroundProgress.value = withTiming(isChecked ? 1 : 0, {
        duration: 150,
      });

      // Border animation
      borderProgress.value = withTiming(isChecked ? 1 : 0, {
        duration: 120,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked]);

    const handlePress = () => {
      if (isDisabled) return;

      // Instant feedback dengan scale animation yang lebih halus
      scale.value = withSpring(
        0.92,
        {
          damping: 25,
          stiffness: 400,
          mass: 0.5,
        },
        () => {
          scale.value = withSpring(1, {
            damping: 20,
            stiffness: 300,
            mass: 0.7,
          });
        }
      );

      if (groupContext) {
        // Radio hanya bisa select satu, jadi langsung set value
        groupContext.onValueChange(value);
      } else if (onCheckedChange) {
        onCheckedChange(!isChecked);
      }
    };

    // Animated styles - Optimized interpolations
    const animatedContainerStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const animatedRadioStyle = useAnimatedStyle(() => {
      const bgProgress = interpolate(
        backgroundProgress.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      );

      // Get the variant colors
      const variantBackgroundColors = {
        default: styles.primaryBackground.backgroundColor as string,
        primary: styles.primaryBackground.backgroundColor as string,
        success: styles.successBackground.backgroundColor as string,
        warning: styles.warningBackground.backgroundColor as string,
        error: styles.errorBackground.backgroundColor as string,
      };

      const variantBorderColors = {
        default: styles.default.borderColor as string,
        primary: styles.primary.borderColor as string,
        success: styles.success.borderColor as string,
        warning: styles.warning.borderColor as string,
        error: styles.error.borderColor as string,
      };

      return {
        backgroundColor:
          bgProgress > 0.1 ? variantBackgroundColors[variant] : 'transparent',
        borderColor:
          bgProgress > 0.5
            ? variantBackgroundColors[variant]
            : variantBorderColors[variant],
        borderWidth: 2,
      };
    });

    const animatedDotStyle = useAnimatedStyle(() => {
      const dotScale = interpolate(
        dotProgress.value,
        [0, 0.5, 1],
        [0, 0.8, 1],
        Extrapolation.CLAMP
      );

      const dotOpacity = interpolate(
        dotProgress.value,
        [0, 0.3, 1],
        [0, 0.7, 1],
        Extrapolation.CLAMP
      );

      return {
        transform: [{ scale: dotScale }],
        opacity: dotOpacity,
      };
    });

    return (
      <Animated.View style={[animatedContainerStyle]}>
        <TouchableOpacity
          ref={ref}
          style={[
            styles.container,
            styles[`${size}Container`],
            isDisabled && styles.disabled,
            style,
          ]}
          onPress={handlePress}
          disabled={isDisabled}
          activeOpacity={0.7}
          {...props}
        >
          <Animated.View
            style={[
              styles.radio,
              styles[size],
              styles[variant],
              animatedRadioStyle,
            ]}
          >
            {React.Children.map(children, (child) => {
              if (
                React.isValidElement(child) &&
                child.type === RadioIndicator
              ) {
                return React.cloneElement(
                  child as React.ReactElement<
                    RadioIndicatorProps & {
                      size?: RadioSize;
                      variant?: RadioVariant;
                      animatedStyle?: Animated.AnimateStyle<ViewStyle>;
                    }
                  >,
                  {
                    size,
                    variant,
                    animatedStyle: animatedDotStyle,
                  }
                );
              }
              if (
                React.isValidElement(child) &&
                child.type === RadioLabel
              ) {
                return React.cloneElement(
                  child as React.ReactElement<
                    RadioLabelProps & {
                      size?: RadioSize;
                      disabled?: boolean;
                    }
                  >,
                  {
                    size,
                    disabled: isDisabled,
                  }
                );
              }
              return child;
            })}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

Radio.displayName = 'Radio';

const RadioGroup = forwardRef<React.ComponentRef<typeof View>, RadioGroupProps>(
  ({ children, value = '', onValueChange, disabled = false, style }, ref) => {
    const contextValue: RadioGroupContextType = {
      value,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange: onValueChange || (() => {}),
      disabled,
    };

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <View ref={ref} style={style}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

const RadioIndicator: React.FC<
  RadioIndicatorProps & {
    size?: RadioSize;
    variant?: RadioVariant;
    animatedStyle?: Animated.AnimateStyle<ViewStyle>;
  }
> = ({ children, style, size = 'md', variant = 'default', animatedStyle }) => {
  const styles = useThemedStyles(createRadioIndicatorStyles);

  return (
    <Animated.View
      style={[
        styles.indicator,
        styles[size],
        styles[variant],
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const RadioIcon: React.FC<
  RadioIconProps & {
    size?: RadioSize;
    variant?: RadioVariant;
  }
> = ({ icon, style, size = 'md', variant = 'default', ...props }) => {
  const dotSize = size === 'sm' ? 6 : size === 'md' ? 8 : 10;

  return (
    <View
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
      {...props}
    >
      {icon || (
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: 'white',
          }}
        />
      )}
    </View>
  );
};

const RadioLabel: React.FC<
  RadioLabelProps & {
    size?: RadioSize;
    disabled?: boolean;
  }
> = ({ children, style, size = 'md', disabled = false, ...props }) => {
  const styles = useThemedStyles(createRadioLabelStyles);

  return (
    <Text
      style={[
        styles.label,
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// Styles
const createRadioStyles = (theme: Theme) => ({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  radio: {
    borderWidth: 2,
    borderRadius: 50, // Always circular for radio
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    position: 'relative' as const,
  },
  indicator: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  // Variants
  default: {
    borderColor: theme.colors.border,
  },
  primary: {
    borderColor: theme.colors.primary,
  },
  success: {
    borderColor: theme.colors.success,
  },
  warning: {
    borderColor: '#F59E0B',
  },
  error: {
    borderColor: theme.colors.error,
  },
  // Background variants
  defaultBackground: {
    backgroundColor: theme.colors.primary,
  },
  primaryBackground: {
    backgroundColor: theme.colors.primary,
  },
  successBackground: {
    backgroundColor: theme.colors.success,
  },
  warningBackground: {
    backgroundColor: '#F59E0B',
  },
  errorBackground: {
    backgroundColor: theme.colors.error,
  },
  // Sizes - Perfect circles
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 22,
    height: 22,
  },
  lg: {
    width: 26,
    height: 26,
  },
  // Container sizes - Proper alignment
  smContainer: {
    minHeight: 32,
    paddingVertical: 4,
  },
  mdContainer: {
    minHeight: 36,
    paddingVertical: 6,
  },
  lgContainer: {
    minHeight: 40,
    paddingVertical: 8,
  },
});

const createRadioIndicatorStyles = (theme: Theme) => ({
  indicator: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 50, // Always circular
  },
  // Variants
  default: {
    backgroundColor: theme.colors.primary,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  warning: {
    backgroundColor: '#F59E0B',
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  // Sizes
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 22,
    height: 22,
  },
  lg: {
    width: 26,
    height: 26,
  },
});

const createRadioLabelStyles = (theme: Theme) => ({
  label: {
    fontWeight: '400' as const,
    flex: 1,
    textAlignVertical: 'center' as const,
  },
  disabled: {
    opacity: 0.5,
  },
  // Sizes
  sm: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
  },
  md: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  },
  lg: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
  },
});

export {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
};

export type {
  RadioGroupProps,
  RadioProps,
  RadioIndicatorProps,
  RadioIconProps,
  RadioLabelProps,
  RadioSize,
  RadioVariant,
};