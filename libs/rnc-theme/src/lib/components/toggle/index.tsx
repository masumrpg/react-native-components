import React, { forwardRef } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../../context/RNCProvider';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../types/theme';

/**
 * Size variants for the ToggleMode component
 * @public
 */
type ToggleModeSize = 'sm' | 'md' | 'lg';

/**
 * Shape variants for the ToggleMode component
 * @public
 */
type ToggleModeVariant = 'rounded' | 'square';

/**
 * Style variants for the ToggleMode component appearance
 * @public
 */
type ToggleModeStyle = 'filled' | 'outlined' | 'ghost';

/**
 * Props interface for the ToggleMode component
 *
 * @example
 * ```tsx
 * <ToggleMode
 *   size="md"
 *   variant="rounded"
 *   styleType="filled"
 *   animated={true}
 *   enableSystemMode={true}
 *   onPress={() => toggleTheme()}
 * />
 * ```
 *
 * @public
 */
interface ToggleModeProps {
  /**
   * The size of the toggle component
   * @defaultValue 'md'
   */
  size?: ToggleModeSize;

  /**
   * The shape variant of the toggle component
   * @defaultValue 'rounded'
   */
  variant?: ToggleModeVariant;

  /**
   * The visual style type of the toggle component
   * @defaultValue 'filled'
   */
  styleType?: ToggleModeStyle;

  /**
   * Whether the toggle component is disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Custom style object for the toggle component container
   * Uses React Native's ViewStyle interface
   */
  style?: ViewStyle;

  /**
   * Custom size for the icons within the toggle
   * If not provided, will use default size based on the `size` prop
   */
  iconSize?: number;

  /**
   * Custom padding for the toggle component
   * If not provided, will use default padding based on the `size` prop
   */
  padding?: number;

  /**
   * Whether to enable smooth animations for state transitions
   * @defaultValue true
   */
  animated?: boolean;

  /**
   * Callback function triggered when the toggle is pressed
   * Should handle the logic for switching between light/dark modes
   */
  onPress?: () => void;

  /**
   * Whether to include system/auto mode as a third option
   * When enabled, toggle cycles through: light → dark → system
   * @defaultValue false
   */
  enableSystemMode?: boolean;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ToggleMode = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  ToggleModeProps
>(
  (
    {
      size = 'md',
      variant = 'rounded',
      styleType = 'filled',
      disabled = false,
      style,
      iconSize,
      padding,
      animated = true,
      onPress,
      enableSystemMode = false,
    },
    ref
  ) => {
    const { theme, themeMode, setThemeMode, isDark } = useTheme();
    const styles = useThemedStyles(createToggleModeStyles);

    // Animation values
    const rotationValue = useSharedValue(isDark ? 1 : 0);
    const scaleValue = useSharedValue(1);
    const backgroundValue = useSharedValue(isDark ? 1 : 0);

    // Update animations when theme changes
    React.useEffect(() => {
      if (animated) {
        rotationValue.value = withSpring(isDark ? 1 : 0, {
          damping: 15,
          stiffness: 200,
        });
        backgroundValue.value = withTiming(isDark ? 1 : 0, {
          duration: 300,
        });
      } else {
        rotationValue.value = isDark ? 1 : 0;
        backgroundValue.value = isDark ? 1 : 0;
      }
    }, [isDark, animated, rotationValue, backgroundValue]);

    // Handle press
    const handlePress = () => {
      if (disabled) return;

      if (animated) {
        scaleValue.value = withSpring(
          0.9,
          {
            damping: 15,
            stiffness: 300,
          },
          () => {
            scaleValue.value = withSpring(1, {
              damping: 15,
              stiffness: 300,
            });
          }
        );
      }

      // Toggle theme mode - simplified logic
      const newMode = enableSystemMode && themeMode === 'system'
        ? (isDark ? 'light' : 'dark')
        : (isDark ? 'light' : 'dark');

      setThemeMode(newMode);
      onPress?.();
    };

    // Get size configurations
    const sizeConfig = {
      sm: {
        containerSize: 32,
        iconSize: iconSize ?? 16,
        padding: padding ?? 6,
      },
      md: {
        containerSize: 40,
        iconSize: iconSize ?? 20,
        padding: padding ?? 8,
      },
      lg: {
        containerSize: 48,
        iconSize: iconSize ?? 24,
        padding: padding ?? 10,
      },
    }[size];

    // Animated styles
    const animatedContainerStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        backgroundValue.value,
        [0, 1],
        [
          styleType === 'filled' ? theme.colors.primary : 'transparent',
          styleType === 'filled' ? theme.colors.secondary : 'transparent',
        ]
      );

      const borderColor = interpolateColor(
        backgroundValue.value,
        [0, 1],
        [
          styleType === 'outlined' ? theme.colors.primary : 'transparent',
          styleType === 'outlined' ? theme.colors.secondary : 'transparent',
        ]
      );

      return {
        backgroundColor:
          styleType === 'ghost' ? 'transparent' : backgroundColor,
        borderColor: styleType === 'outlined' ? borderColor : 'transparent',
        transform: [{ scale: scaleValue.value }],
      };
    });

    const animatedIconStyle = useAnimatedStyle(() => {
      const rotation = interpolate(rotationValue.value, [0, 1], [0, 360]);

      return {
        transform: [{ rotate: `${rotation}deg` }],
      };
    });

    // Get container style
    const containerStyle = [
      styles.container,
      {
        width: sizeConfig.containerSize,
        height: sizeConfig.containerSize,
        padding: sizeConfig.padding,
        borderRadius: variant === 'rounded' ? sizeConfig.containerSize / 2 : 8,
        borderWidth: styleType === 'outlined' ? 1 : 0,
      },
      disabled && styles.disabled,
      style,
    ];

    // Get icon color
    const getIconColor = () => {
      if (disabled) return theme.colors.textSecondary;

      switch (styleType) {
        case 'filled':
          return isDark ? theme.colors.background : theme.colors.background;
        case 'outlined':
        case 'ghost':
          return theme.colors.text;
        default:
          return theme.colors.text;
      }
    };

    const IconComponent = isDark ? Moon : Sun;

    return (
      <AnimatedTouchableOpacity
        ref={ref}
        style={[containerStyle, animatedContainerStyle]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <IconComponent
            size={sizeConfig.iconSize}
            color={getIconColor()}
            strokeWidth={2}
          />
        </Animated.View>
      </AnimatedTouchableOpacity>
    );
  }
);

ToggleMode.displayName = 'ToggleMode';

// Styles
const createToggleModeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
  });

export { ToggleMode };
export type { ToggleModeProps };