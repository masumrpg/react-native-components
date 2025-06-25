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
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { Check } from 'lucide-react-native';
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';

type CheckboxShape = 'square' | 'round';

interface CheckboxGroupProps {
  children: React.ReactNode;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

type CheckboxProps = BaseComponentProps & {
  value: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  shape?: CheckboxShape;
  children?: React.ReactNode;
};

interface CheckboxIndicatorProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CheckboxIconProps {
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
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

const Checkbox = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  CheckboxProps
>(
  (
    {
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
    },
    ref
  ) => {
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
      : controlledChecked ?? false;

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

      // Get the variant colors - Fixed to include all variants
      const variantBackgroundColors = {
        default: styles.primaryBackground.backgroundColor,
        primary: styles.primaryBackground.backgroundColor,
        secondary: styles.secondaryBackground.backgroundColor,
        outline: styles.outlineBackground.backgroundColor,
        filled: styles.filledBackground.backgroundColor,
        ghost: styles.ghostBackground.backgroundColor,
        success: styles.successBackground.backgroundColor,
        warning: styles.warningBackground.backgroundColor,
        error: styles.errorBackground.backgroundColor,
        info: styles.infoBackground.backgroundColor,
        destructive: styles.destructiveBackground.backgroundColor,
      };

      const variantBorderColors = {
        default: styles.default.borderColor,
        primary: styles.primary.borderColor,
        secondary: styles.secondary.borderColor,
        outline: styles.outline.borderColor,
        filled: styles.filled.borderColor,
        ghost: styles.ghost.borderColor,
        success: styles.success.borderColor,
        warning: styles.warning.borderColor,
        error: styles.error.borderColor,
        info: styles.info.borderColor,
        destructive: styles.destructive.borderColor,
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
        ref={ref}
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

        {children ?? (
          <CheckboxLabel disabled={isDisabled} size={size}>
            {children}
          </CheckboxLabel>
        )}
      </TouchableOpacity>
    );
  }
);

Checkbox.displayName = 'Checkbox';

const CheckboxGroup = forwardRef<
  React.ComponentRef<typeof View>,
  CheckboxGroupProps
>(
  (
    { children, value = [], onValueChange, disabled = false, style, ...props },
    ref
  ) => {
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
        <View ref={ref} style={[styles.group, style]} {...props}>
          {children}
        </View>
      </CheckboxGroupContext.Provider>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

const CheckboxIndicator = forwardRef<
  React.ComponentRef<typeof View>,
  CheckboxIndicatorProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createCheckboxIndicatorStyles);

  return (
    <View ref={ref} style={[styles.indicator, style]} {...props}>
      {children}
    </View>
  );
});

CheckboxIndicator.displayName = 'CheckboxIndicator';

const CheckboxIcon: React.FC<
  CheckboxIconProps & {
    size?: ComponentSize;
    variant?: ComponentVariant;
  }
> = ({ icon, style, size = 'md', variant = 'default', ...props }) => {
  const iconSize =
    size === 'xs'
      ? 10
      : size === 'sm'
      ? 12
      : size === 'md'
      ? 16
      : size === 'lg'
      ? 20
      : 24;
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

const CheckboxLabel = forwardRef<
  Text,
  CheckboxLabelProps & {
    disabled?: boolean;
    size?: ComponentSize;
  }
>(({ children, style, disabled = false, size = 'md', ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createCheckboxLabelStyles);

  return (
    <Text
      ref={ref}
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
});

CheckboxLabel.displayName = 'CheckboxLabel';

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
    borderRadius: theme.components.borderRadius.sm,
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
  secondary: {
    borderColor: theme.colors.secondary,
  },
  outline: {
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
  },
  filled: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  ghost: {
    borderColor: 'transparent',
    backgroundColor: theme.colors.primary + '05',
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
    borderColor: '#EF4444',
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
  infoBackground: {
    backgroundColor: '#3B82F6',
  },
  destructiveBackground: {
    backgroundColor: '#EF4444',
  },
  // Sizes - Perfect squares/circles
  xs: {
    width: 14,
    height: 14,
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
  // Container sizes - Consistent with Input component
  xsContainer: {
    minHeight: 32,
    paddingVertical: theme.spacing.xs,
  },
  smContainer: {
    minHeight: 36,
    paddingVertical: theme.spacing.xs,
  },
  mdContainer: {
    minHeight: 42,
    paddingVertical: theme.spacing.sm,
  },
  lgContainer: {
    minHeight: 48,
    paddingVertical: theme.spacing.md,
  },
  xlContainer: {
    minHeight: 56,
    paddingVertical: theme.spacing.lg,
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
    borderRadius: theme.components.borderRadius.sm,
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
  info: {
    backgroundColor: '#3B82F6',
  },
  destructive: {
    backgroundColor: '#EF4444',
  },
  // Sizes
  xs: {
    width: 14,
    height: 14,
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
  CheckboxShape,
};
