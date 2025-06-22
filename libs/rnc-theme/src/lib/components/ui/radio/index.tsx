import React, { createContext, useContext, forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Text,
  StyleProp,
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
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

type RadioProps = BaseComponentProps & {
  value: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

interface RadioIndicatorProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface RadioIconProps {
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
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

const Radio = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  RadioProps
>(
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

    // Animation values - Simplified, removed excessive animations
    const dotProgress = useSharedValue(0);
    const borderProgress = useSharedValue(0);

    // Determine if radio is checked
    const isChecked = groupContext
      ? groupContext.value === value
      : controlledChecked || false;

    // Determine if radio is disabled
    const isDisabled = groupContext ? groupContext.disabled : radioDisabled;

    // Update animations when checked state changes - Simplified
    React.useEffect(() => {
      dotProgress.value = withSpring(isChecked ? 1 : 0, {
        damping: 15,
        stiffness: 200,
        mass: 0.5,
      });

      borderProgress.value = withTiming(isChecked ? 1 : 0, {
        duration: 200,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked]);

    const handlePress = () => {
      if (isDisabled) return;

      // Removed scale animation - no more bouncing
      if (groupContext) {
        groupContext.onValueChange(value);
      } else if (onCheckedChange) {
        onCheckedChange(!isChecked);
      }
    };

    // Animated styles - Simplified, removed container scale animation
    const animatedRadioStyle = useAnimatedStyle(() => {
      const bgProgress = interpolate(
        borderProgress.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      );

      const variantBorderColors = {
        default: styles.default.borderColor as string,
        primary: styles.primary.borderColor as string,
        secondary: styles.secondary.borderColor as string,
        outline: styles.outline.borderColor as string,
        filled: styles.filled.borderColor as string,
        ghost: styles.ghost.borderColor as string,
        success: styles.success.borderColor as string,
        error: styles.error.borderColor as string,
        warning: styles.warning.borderColor as string,
        info: styles.info.borderColor as string,
        destructive: styles.destructive.borderColor as string,
      };

      return {
        borderColor: variantBorderColors[variant],
        borderWidth: bgProgress > 0.5 ? 2 : 1.5,
      };
    });

    const animatedDotStyle = useAnimatedStyle(() => {
      const dotScale = interpolate(
        dotProgress.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      );

      const variantColors = {
        default: styles.defaultBackground.backgroundColor as string,
        primary: styles.primaryBackground.backgroundColor as string,
        secondary: styles.secondaryBackground.backgroundColor as string,
        outline: styles.outlineBackground.backgroundColor as string,
        filled: styles.filledBackground.backgroundColor as string,
        ghost: styles.ghostBackground.backgroundColor as string,
        success: styles.successBackground.backgroundColor as string,
        error: styles.errorBackground.backgroundColor as string,
        warning: styles.warningBackground.backgroundColor as string,
        info: styles.infoBackground.backgroundColor as string,
        destructive: styles.destructiveBackground.backgroundColor as string,
      };

      return {
        transform: [{ scale: dotScale }],
        backgroundColor: variantColors[variant],
      };
    });

    const containerStyle = [
      styles.container,
      styles[`${size}Container`],
      isDisabled && styles.disabled,
      style,
    ];

    const radioStyle = [
      styles.radio,
      styles[size],
      styles[variant],
      isDisabled && styles.disabled,
    ];

    const dotStyle = [styles.dot, styles[`${size}Dot`]];

    return (
      <TouchableOpacity
        ref={ref}
        style={containerStyle}
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        <Animated.View style={[radioStyle, animatedRadioStyle]}>
          <Animated.View style={[dotStyle, animatedDotStyle]} />
        </Animated.View>
        {children && <View style={styles.labelContainer}>{children}</View>}
      </TouchableOpacity>
    );
  }
);

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onValueChange = () => {},
  disabled = false,
  style,
  ...props
}) => {
  const styles = useThemedStyles(createRadioGroupStyles);

  const contextValue: RadioGroupContextType = {
    value,
    onValueChange,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View style={[styles.group, style]} {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
};

const RadioIndicator: React.FC<
  RadioIndicatorProps & {
    size?: ComponentSize;
    variant?: ComponentVariant;
  }
> = ({ children, style, size = 'md', variant = 'default', ...props }) => {
  const styles = useThemedStyles(createRadioIndicatorStyles);

  return (
    <View
      style={[styles.indicator, styles[size], styles[variant], style]}
      {...props}
    >
      {children}
    </View>
  );
};

const RadioIcon: React.FC<
  RadioIconProps & {
    size?: ComponentSize;
    variant?: ComponentVariant;
  }
> = ({ icon, style, size = 'md', variant = 'default', ...props }) => {
  const dotSize =
    size === 'xs' ? 4 :
    size === 'sm' ? 6 :
    size === 'md' ? 8 :
    size === 'lg' ? 10 : 12;
  const iconColor = 'white';

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
            backgroundColor: iconColor,
          }}
        />
      )}
    </View>
  );
};

const RadioLabel: React.FC<
  RadioLabelProps & {
    size?: ComponentSize;
  }
> = ({ children, style, size = 'md', ...props }) => {
  const styles = useThemedStyles(createRadioLabelStyles);
  const groupContext = useRadioGroup();

  const labelStyle = [
    styles.label,
    styles[size],
    groupContext?.disabled && styles.disabled,
    style,
  ];

  return (
    <Text style={labelStyle} {...props}>
      {children}
    </Text>
  );
};

// Styles
const createRadioGroupStyles = (theme: Theme) => ({
  group: {
    gap: theme.spacing.sm,
  },
});

const createRadioStyles = (theme: Theme) => ({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.sm,
  },
  radio: {
    borderWidth: 1.5,
    borderRadius: 50, // Always circular for radio
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: 'transparent',
  },
  dot: {
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center' as const,
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
  secondary: {
    borderColor: theme.colors.secondary,
  },
  outline: {
    borderColor: theme.colors.primary,
  },
  filled: {
    borderColor: theme.colors.primary,
  },
  ghost: {
    borderColor: theme.colors.border,
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
  info: {
    borderColor: '#3B82F6',
  },
  destructive: {
    borderColor: '#DC2626',
  },
  // Background variants
  defaultBackground: {
    backgroundColor: theme.colors.primary,
  },
  primaryBackground: {
    backgroundColor: theme.colors.primary,
  },
  secondaryBackground: {
    backgroundColor: theme.colors.secondary,
  },
  outlineBackground: {
    backgroundColor: theme.colors.primary,
  },
  filledBackground: {
    backgroundColor: theme.colors.primary,
  },
  ghostBackground: {
    backgroundColor: theme.colors.border,
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
  infoBackground: {
    backgroundColor: '#3B82F6',
  },
  destructiveBackground: {
    backgroundColor: '#DC2626',
  },
  // Sizes
  xs: {
    width: 16,
    height: 16,
  },
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
  xl: {
    width: 30,
    height: 30,
  },
  // Dot sizes
  xsDot: {
    width: 6,
    height: 6,
  },
  smDot: {
    width: 8,
    height: 8,
  },
  mdDot: {
    width: 10,
    height: 10,
  },
  lgDot: {
    width: 12,
    height: 12,
  },
  xlDot: {
    width: 14,
    height: 14,
  },
  // Container sizes
  xsContainer: {
    minHeight: 28,
    paddingVertical: 2,
  },
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
  xlContainer: {
    minHeight: 44,
    paddingVertical: 10,
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
    borderRadius: 50,
  },
  // Variants
  default: {
    backgroundColor: theme.colors.primary,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: theme.colors.primary,
  },
  filled: {
    backgroundColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: theme.colors.border,
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
  info: {
    backgroundColor: '#3B82F6',
  },
  destructive: {
    backgroundColor: '#DC2626',
  },
  // Sizes
  xs: {
    width: 16,
    height: 16,
  },
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
  xl: {
    width: 30,
    height: 30,
  },
});

const createRadioLabelStyles = (theme: Theme) => ({
  label: {
    fontWeight: '400' as const,
    flex: 1,
    textAlignVertical: 'center' as const,
    color: theme.colors.text,
  },
  disabled: {
    opacity: 0.5,
  },
  // Sizes
  xs: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
  },
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
  xl: {
    fontSize: theme.typography.title.fontSize,
    lineHeight: theme.typography.title.lineHeight,
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
};