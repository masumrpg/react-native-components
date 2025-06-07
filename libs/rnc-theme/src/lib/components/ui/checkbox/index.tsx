import React, { createContext, useContext } from 'react';
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
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { Check } from 'lucide-react-native';

type CheckboxSize = 'sm' | 'md' | 'lg';
type CheckboxVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type CheckboxShape = 'square' | 'round';

interface CheckboxGroupProps {
  children: React.ReactNode;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface CheckboxProps {
  value: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  shape?: CheckboxShape;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface CheckboxIndicatorProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface CheckboxIconProps {
  icon?: React.ReactNode;
  style?: ViewStyle;
}

interface CheckboxLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

// Context untuk CheckboxGroup
interface CheckboxGroupContextType {
  value: string[];
  onValueChange: (value: string[]) => void;
  disabled: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(
  null
);

const useCheckboxGroup = () => {
  return useContext(CheckboxGroupContext);
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  value = [],
  onValueChange,
  disabled = false,
  style,
  ...props
}) => {
  const styles = useThemedStyles(createCheckboxGroupStyles);

  const contextValue: CheckboxGroupContextType = {
    value,
    onValueChange:
      onValueChange ||
      (() => {
        /* no-op */
      }),
    disabled,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <View style={[styles.group, style]} {...props}>
        {children}
      </View>
    </CheckboxGroupContext.Provider>
  );
};

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  checked: controlledChecked,
  onCheckedChange,
  size = 'md',
  variant = 'default',
  shape = 'square',
  disabled: checkboxDisabled = false,
  style,
  children,
  ...props
}) => {
  const styles = useThemedStyles(createCheckboxStyles);
  const groupContext = useCheckboxGroup();

  // Animation values - Improved spring configuration
  const scale = useSharedValue(1);
  const checkProgress = useSharedValue(0);
  const backgroundProgress = useSharedValue(0);
  const borderProgress = useSharedValue(0);

  // Determine if checkbox is checked
  const isChecked = groupContext
    ? groupContext.value.includes(value)
    : controlledChecked || false;

  // Determine if checkbox is disabled
  const isDisabled = groupContext ? groupContext.disabled : checkboxDisabled;

  // Update animations when checked state changes - Much smoother config
  React.useEffect(() => {
    // Super smooth spring animation untuk check mark
    checkProgress.value = withSpring(isChecked ? 1 : 0, {
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
      const newValue = isChecked
        ? groupContext.value.filter((v) => v !== value)
        : [...groupContext.value, value];
      groupContext.onValueChange(newValue);
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

  const animatedCheckboxStyle = useAnimatedStyle(() => {
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

  const animatedCheckStyle = useAnimatedStyle(() => {
    // Bouncy scale animation untuk check mark
    const checkScale = interpolate(
      checkProgress.value,
      [0, 0.3, 0.7, 1],
      [0, 0.2, 1.1, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      checkProgress.value,
      [0, 0.2, 1],
      [0, 0.8, 1],
      Extrapolation.CLAMP
    );

    // Rotation effect untuk lebih dynamic
    const rotation = interpolate(
      checkProgress.value,
      [0, 0.5, 1],
      [0, -5, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: checkScale }, { rotate: `${rotation}deg` }],
      opacity,
    };
  });

  const checkboxStyle = [
    styles.checkbox,
    styles[size],
    styles[variant],
    styles[shape],
    isDisabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={[styles.container, styles[`${size}Container`]]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      <Animated.View style={[animatedContainerStyle]}>
        <Animated.View style={[checkboxStyle, animatedCheckboxStyle]}>
          {/* Animated check icon with improved animation */}
          <Animated.View style={[styles.iconContainer, animatedCheckStyle]}>
            <CheckboxIcon size={size} variant={variant} />
          </Animated.View>
        </Animated.View>
      </Animated.View>

      {children && (
        <CheckboxLabel disabled={isDisabled} size={size}>
          {children}
        </CheckboxLabel>
      )}
    </TouchableOpacity>
  );
};

const CheckboxIndicator: React.FC<
  CheckboxIndicatorProps & {
    checked?: boolean;
    size?: CheckboxSize;
    variant?: CheckboxVariant;
  }
> = ({
  children,
  style,
  checked = false,
  size = 'md',
  variant = 'default',
  ...props
}) => {
  const styles = useThemedStyles(createCheckboxIndicatorStyles);

  if (!checked) return null;

  return (
    <View
      style={[styles.indicator, styles[size], styles[variant], style]}
      {...props}
    >
      {children || (
        <Check
          size={size === 'sm' ? 12 : size === 'md' ? 16 : 20}
          color="white"
        />
      )}
    </View>
  );
};

const CheckboxIcon: React.FC<
  CheckboxIconProps & {
    size?: CheckboxSize;
    variant?: CheckboxVariant;
  }
> = ({ icon, style, size = 'md', variant = 'default', ...props }) => {
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  const iconColor = 'white';

  return (
    <View
      style={[{ alignItems: 'center', justifyContent: 'center' }, style]}
      {...props}
    >
      {icon || <Check size={iconSize} color={iconColor} strokeWidth={2.5} />}
    </View>
  );
};

const CheckboxLabel: React.FC<
  CheckboxLabelProps & {
    disabled?: boolean;
    size?: CheckboxSize;
  }
> = ({ children, style, disabled = false, size = 'md', ...props }) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createCheckboxLabelStyles);

  return (
    <Text
      style={[
        styles.label,
        styles[size],
        disabled && styles.disabled,
        {
          color: disabled ? theme.colors.textSecondary : theme.colors.text,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const createCheckboxGroupStyles = (theme: Theme) => ({
  group: {
    gap: theme.spacing.sm,
  },
});

const createCheckboxStyles = (theme: Theme) => ({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  checkbox: {
    borderWidth: 2,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: 'transparent',
    position: 'relative' as const,
    marginRight: theme.spacing.sm,
  },
  background: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
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
  // Shapes
  square: {
    borderRadius: theme.borderRadius.sm,
  },
  round: {
    borderRadius: 50, // Large radius for circular shape
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
  // Sizes - Perfect squares/circles
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

const createCheckboxIndicatorStyles = (theme: Theme) => ({
  indicator: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: theme.borderRadius.sm,
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

const createCheckboxLabelStyles = (theme: Theme) => ({
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
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
};

export type {
  CheckboxGroupProps,
  CheckboxProps,
  CheckboxIndicatorProps,
  CheckboxIconProps,
  CheckboxLabelProps,
  CheckboxSize,
  CheckboxVariant,
  CheckboxShape,
};
