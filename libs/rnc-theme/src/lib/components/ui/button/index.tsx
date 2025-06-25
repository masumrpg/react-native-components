import React, {
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  Pressable,
  TouchableOpacity,
  ViewStyle,
  PressableProps,
  TouchableOpacityProps,
  View,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  withSequence,
  SharedValue,
} from 'react-native-reanimated';
import { Theme } from '../../../types/theme';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Spinner } from '../spinner';
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';

// Animated components
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);


type ButtonComponent = 'pressable' | 'touchable';
type IconPosition = 'left' | 'right' | 'center';
type AnimationType = 'bounce' | 'pulse' | 'shake';

interface ButtonRef {
  focus: () => void;
  blur: () => void;
  animate: (type: AnimationType) => void;
}

interface SpringConfig {
  damping?: number;
  stiffness?: number;
  mass?: number;
}

type BaseButtonProps = BaseComponentProps & {
  children?: React.ReactNode;
  loading?: boolean;
  borderRadius?: keyof Theme['components']['borderRadius'];
  fullWidth?: boolean;
  component?: ButtonComponent;
  animationEnabled?: boolean;
  pressAnimationScale?: number;
  springConfig?: SpringConfig;
};

interface PressableButtonProps
  extends BaseButtonProps,
    Omit<PressableProps, keyof BaseButtonProps | 'style'> {
  component?: 'pressable';
}

interface TouchableButtonProps
  extends BaseButtonProps,
    Omit<TouchableOpacityProps, keyof BaseButtonProps | 'style'> {
  component: 'touchable';
}

type ButtonProps = PressableButtonProps | TouchableButtonProps;

type ButtonIconProps = BaseComponentProps & {
  icon?: React.ReactNode;
  position?: IconPosition;
  marginLeft?: keyof Theme['spacing'];
  marginRight?: keyof Theme['spacing'];
};

type ButtonTextProps = BaseComponentProps & {
  children: React.ReactNode;
  loading?: boolean;
  showLoadingIndicator?: boolean;
};

// Style configurations
const VARIANT_COLORS = {
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

const SIZE_CONFIG = {
  xs: { minHeight: 28, spinnerSize: 14 },
  sm: { minHeight: 32, spinnerSize: 16 },
  md: { minHeight: 40, spinnerSize: 20 },
  lg: { minHeight: 48, spinnerSize: 24 },
  xl: { minHeight: 56, spinnerSize: 28 },
} as const;

const DEFAULT_SPRING_CONFIG: Required<SpringConfig> = {
  damping: 12,
  stiffness: 120,
  mass: 0.8,
} as const;

// Animation configurations with proper typing
interface BounceConfig {
  type: 'bounce';
  scale: readonly number[];
  duration: number;
}

interface PulseConfig {
  type: 'pulse';
  scale: readonly number[];
  duration: number;
}

interface ShakeConfig {
  type: 'shake';
  translateX: readonly number[];
  duration: number;
}

type AnimationConfig = BounceConfig | PulseConfig | ShakeConfig;

const ANIMATION_CONFIGS: Record<AnimationType, AnimationConfig> = {
  bounce: {
    type: 'bounce',
    scale: [1, 1.1, 0.95, 1.02, 1],
    duration: 600,
  },
  pulse: {
    type: 'pulse',
    scale: [1, 1.05, 1],
    duration: 400,
  },
  shake: {
    type: 'shake',
    translateX: [0, -10, 10, -8, 8, -5, 5, 0],
    duration: 500,
  },
} as const;

// Memoized style creators
const createButtonStyles = (theme: Theme) => ({
  base: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
  },
  // Variants
  default: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  primary: {
    backgroundColor: resolveColor(theme, 'primary', theme.colors.primary),
    borderColor: resolveColor(theme, 'primary', theme.colors.primary),
  },
  secondary: {
    backgroundColor: resolveColor(theme, 'secondary', theme.colors.secondary),
    borderColor: resolveColor(theme, 'secondary', theme.colors.secondary),
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: resolveColor(theme, 'primary', theme.colors.primary),
  },
  filled: {
    backgroundColor: theme.colors.surface,
    borderColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  success: {
    backgroundColor: resolveColor(theme, 'success', VARIANT_COLORS.success),
    borderColor: resolveColor(theme, 'success', VARIANT_COLORS.success),
  },
  error: {
    backgroundColor: resolveColor(theme, 'error', theme.colors.error),
    borderColor: resolveColor(theme, 'error', theme.colors.error),
  },
  warning: {
    backgroundColor: resolveColor(theme, 'warning', VARIANT_COLORS.warning),
    borderColor: resolveColor(theme, 'warning', VARIANT_COLORS.warning),
  },
  info: {
    backgroundColor: resolveColor(theme, 'info', VARIANT_COLORS.info),
    borderColor: resolveColor(theme, 'info', VARIANT_COLORS.info),
  },
  destructive: {
    backgroundColor: theme.colors.destructive,
    borderColor: theme.colors.destructive,
  },
  // Sizes
  xs: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs / 2,
    minHeight: SIZE_CONFIG.xs.minHeight,
  },
  sm: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minHeight: SIZE_CONFIG.sm.minHeight,
  },
  md: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: SIZE_CONFIG.md.minHeight,
  },
  lg: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: SIZE_CONFIG.lg.minHeight,
  },
  xl: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: SIZE_CONFIG.xl.minHeight,
  },
});

const createButtonTextStyles = (theme: Theme) => ({
  base: {
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
  loadingContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  loadingIndicator: {
    marginRight: theme.spacing.xs,
  },
  // Variants
  default: { color: theme.colors.text },
  primary: { color: '#FFFFFF' },
  secondary: { color: '#FFFFFF' },
  outline: { color: resolveColor(theme, 'primary', theme.colors.primary) },
  filled: { color: theme.colors.text },
  ghost: { color: resolveColor(theme, 'text', theme.colors.text) },
  success: { color: '#FFFFFF' },
  error: { color: '#FFFFFF' },
  warning: { color: '#FFFFFF' },
  info: { color: '#FFFFFF' },
  destructive: { color: '#FFFFFF' },
  // Sizes
  xs: {
    fontSize: theme.typography.small.fontSize
      ? theme.typography.small.fontSize * 0.9
      : theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight
      ? theme.typography.small.lineHeight * 0.9
      : theme.typography.small.lineHeight,
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
    fontSize: theme.typography.subtitle.fontSize
      ? theme.typography.subtitle.fontSize * 1.1
      : theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight
      ? theme.typography.subtitle.lineHeight * 1.1
      : theme.typography.subtitle.lineHeight,
  },
});

const createButtonIconStyles = (theme: Theme) => ({
  base: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  xs: { width: 12, height: 12 },
  sm: { width: 16, height: 16 },
  md: { width: 20, height: 20 },
  lg: { width: 24, height: 24 },
  xl: { width: 28, height: 28 },
});

// Helper function to clone children with props
const cloneChildrenWithProps = (
  children: React.ReactNode,
  variant: ComponentVariant,
  size: ComponentSize,
  disabled: boolean,
  loading: boolean
): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === ButtonText) {
      return React.cloneElement(child as React.ReactElement<ButtonTextProps>, {
        variant,
        size,
        disabled,
        loading,
      });
    }

    if (child.type === ButtonIcon) {
      return React.cloneElement(child as React.ReactElement<ButtonIconProps>, {
        variant,
        size,
        disabled,
      });
    }

    return child;
  });
};

// Animation helper functions
const createScaleAnimation = (
  scale: SharedValue<number>,
  config: BounceConfig | PulseConfig
): void => {
  'worklet';
  const { scale: scaleValues, duration } = config;
  const stepDuration = duration / scaleValues.length;

  scale.value = withSequence(
    ...scaleValues.map((value) => withTiming(value, { duration: stepDuration }))
  );
};

const createShakeAnimation = (
  translateX: SharedValue<number>,
  config: ShakeConfig
): void => {
  'worklet';
  const { translateX: translateValues, duration } = config;
  const stepDuration = duration / translateValues.length;

  translateX.value = withSequence(
    ...translateValues.map((value) =>
      withTiming(value, { duration: stepDuration })
    )
  );
};

// Custom hook for button animations - FIXED VERSION
const useButtonAnimation = (
  animationEnabled: boolean,
  pressAnimationScale: number,
  springConfig: Required<SpringConfig>,
  disabled: boolean,
  loading: boolean
) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Smooth animation for disabled state
  React.useEffect(() => {
    opacity.value = withTiming(disabled || loading ? 0.6 : 1, {
      duration: 200,
    });
  }, [disabled, loading, opacity]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }, { translateX: translateX.value }],
      opacity: opacity.value,
    }),
    []
  );

  const handlePressIn = useCallback(() => {
    'worklet';
    if (animationEnabled && !disabled && !loading) {
      scale.value = withSpring(pressAnimationScale, springConfig);
    }
  }, [
    animationEnabled,
    pressAnimationScale,
    springConfig,
    scale,
    disabled,
    loading,
  ]);

  const handlePressOut = useCallback(() => {
    'worklet';
    if (animationEnabled && !disabled && !loading) {
      scale.value = withSpring(1, springConfig);
    }
  }, [animationEnabled, springConfig, scale, disabled, loading]);

  const animate = useCallback(
    (type: AnimationType) => {
      'worklet';
      if (disabled || loading) return;

      const config = ANIMATION_CONFIGS[type];

      switch (config.type) {
        case 'bounce':
        case 'pulse':
          createScaleAnimation(scale, config);
          break;
        case 'shake':
          createShakeAnimation(translateX, config);
          break;
      }
    },
    [scale, translateX, disabled, loading]
  );

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
    animate,
  };
};

// Main Button Component - FIXED VERSION
const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      style,
      borderRadius = 'md',
      fullWidth = false,
      component = 'pressable',
      animationEnabled = true,
      pressAnimationScale = 0.95,
      springConfig = DEFAULT_SPRING_CONFIG,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createButtonStyles);
    const buttonRef = useRef<View>(null);

    const mergedSpringConfig: Required<SpringConfig> = useMemo(
      () => ({
        ...DEFAULT_SPRING_CONFIG,
        ...springConfig,
      }),
      [springConfig]
    );

    const { animatedStyle, handlePressIn, handlePressOut, animate } =
      useButtonAnimation(
        animationEnabled,
        pressAnimationScale,
        mergedSpringConfig,
        disabled,
        loading
      );

    // FIXED: Removed opacity from baseStyle
    const baseStyle = useMemo(
      (): ViewStyle => ({
        ...styles.base,
        ...styles[variant],
        ...styles[size],
        borderRadius: theme.components.borderRadius[borderRadius],
        ...(fullWidth && { width: '100%' }),
        ...(style as ViewStyle),
      }),
      [
        styles,
        variant,
        size,
        theme.components.borderRadius,
        borderRadius,
        fullWidth,
        style,
      ]
    );

    const isDisabled = disabled || loading;

    const childrenWithProps = useMemo(
      () => cloneChildrenWithProps(children, variant, size, disabled, loading),
      [children, variant, size, disabled, loading]
    );

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          const focusableRef = buttonRef.current as unknown as {
            focus?: () => void;
          };
          focusableRef.focus?.();
        },
        blur: () => {
          const blurableRef = buttonRef.current as unknown as {
            blur?: () => void;
          };
          blurableRef.blur?.();
        },
        animate: (type: AnimationType) => {
          runOnJS(animate)(type);
        },
      }),
      [animate]
    );

    const handlePressInWrapper = useCallback(
      (event: GestureResponderEvent) => {
        handlePressIn();
        onPressIn?.(event);
      },
      [handlePressIn, onPressIn]
    );

    const handlePressOutWrapper = useCallback(
      (event: GestureResponderEvent) => {
        handlePressOut();
        onPressOut?.(event);
      },
      [handlePressOut, onPressOut]
    );

    const combinedStyle = useMemo(
      () => [baseStyle, animatedStyle],
      [baseStyle, animatedStyle]
    );

    if (component === 'touchable') {
      const touchableProps = props as Omit<
        TouchableOpacityProps,
        keyof BaseButtonProps | 'style'
      >;
      return (
        <AnimatedTouchableOpacity
          ref={buttonRef}
          style={combinedStyle}
          disabled={isDisabled}
          onPressIn={handlePressInWrapper}
          onPressOut={handlePressOutWrapper}
          {...touchableProps}
        >
          {childrenWithProps}
        </AnimatedTouchableOpacity>
      );
    }

    const pressableProps = props as Omit<
      PressableProps,
      keyof BaseButtonProps | 'style'
    >;
    return (
      <AnimatedPressable
        ref={buttonRef}
        style={combinedStyle}
        disabled={isDisabled}
        onPressIn={handlePressInWrapper}
        onPressOut={handlePressOutWrapper}
        {...pressableProps}
      >
        {childrenWithProps}
      </AnimatedPressable>
    );
  }
);

Button.displayName = 'Button';

// ButtonText Component - FIXED VERSION
const ButtonText: React.FC<ButtonTextProps> = React.memo(
  ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    showLoadingIndicator = true,
    ...props
  }) => {
    const styles = useThemedStyles(createButtonTextStyles);
    const textOpacity = useSharedValue(1);

    const textStyle = useMemo(
      () => [styles.base, styles[variant], styles[size], style],
      [styles, variant, size, style]
    );

    // FIXED: Smooth animation for text opacity
    React.useEffect(() => {
      textOpacity.value = withTiming(loading ? 0.7 : 1, { duration: 200 });
    }, [loading, textOpacity]);

    const animatedTextStyle = useAnimatedStyle(
      () => ({
        opacity: textOpacity.value,
      }),
      []
    );

    if (loading && showLoadingIndicator) {
      return (
        <Animated.View style={[styles.loadingContainer, animatedTextStyle]}>
          <Spinner
            size={SIZE_CONFIG[size].spinnerSize}
            color={styles[variant].color}
            style={styles.loadingIndicator}
          />
          <Animated.Text style={textStyle} {...props}>
            {children}
          </Animated.Text>
        </Animated.View>
      );
    }

    return (
      <Animated.Text style={[textStyle, animatedTextStyle]} {...props}>
        {children}
      </Animated.Text>
    );
  }
);

ButtonText.displayName = 'ButtonText';

// ButtonIcon Component - FIXED VERSION
const ButtonIcon: React.FC<ButtonIconProps> = React.memo(
  ({
    icon,
    variant = 'primary',
    size = 'md',
    disabled = false,
    style,
    position = 'left',
    marginLeft,
    marginRight,
    ...props
  }) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createButtonIconStyles);
    const iconScale = useSharedValue(1);
    const iconOpacity = useSharedValue(1);

    const iconStyle = useMemo(
      () => ({
        marginLeft: marginLeft
          ? theme.spacing[marginLeft]
          : position === 'right'
          ? theme.spacing.xs
          : 0,
        marginRight: marginRight
          ? theme.spacing[marginRight]
          : position === 'left'
          ? theme.spacing.xs
          : 0,
      }),
      [marginLeft, marginRight, position, theme.spacing]
    );

    const combinedStyle = useMemo(
      () => [styles.base, styles[size], iconStyle, style],
      [styles, size, iconStyle, style]
    );

    // FIXED: Smooth animation for disabled state
    React.useEffect(() => {
      iconScale.value = withTiming(disabled ? 0.8 : 1, { duration: 200 });
      iconOpacity.value = withTiming(disabled ? 0.6 : 1, { duration: 200 });
    }, [disabled, iconScale, iconOpacity]);

    const animatedIconStyle = useAnimatedStyle(
      () => ({
        transform: [{ scale: iconScale.value }],
        opacity: iconOpacity.value,
      }),
      []
    );

    return (
      <Animated.View style={[combinedStyle, animatedIconStyle]} {...props}>
        {icon}
      </Animated.View>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';

export { Button, ButtonIcon, ButtonText };
export type {
  ButtonProps,
  ButtonIconProps,
  ButtonTextProps,
  ButtonRef,
  AnimationType,
  SpringConfig,
};
