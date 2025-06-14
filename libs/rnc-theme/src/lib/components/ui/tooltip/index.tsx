import React, {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  Dimensions,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';

// Types
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipTrigger = 'longPress' | 'press' | 'hover';

interface TooltipProps extends BaseComponentProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  delay?: number;
  duration?: number;
  offset?: number;
  arrow?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
  arrowStyle?: ViewStyle;
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  maxWidth?: number;
  placement?: 'auto' | 'manual';
}

interface TooltipContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TooltipTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface TooltipArrowProps {
  position: TooltipPosition;
  size: ComponentSize;
  variant: ComponentVariant;
  style?: ViewStyle;
}

// Styles
const createTooltipStyles = (theme: Theme) => ({
  container: {
    position: 'relative',
  } as ViewStyle,

  overlay: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 10,
  } as ViewStyle,

  tooltip: {
    borderRadius: theme.components.borderRadius.md,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    ...(Platform.OS === 'android' && {
      elevation: 8,
    }),
  } as ViewStyle,

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  text: {
    color: theme.colors.background,
    fontSize: theme.typography.small.fontSize,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: theme.typography.small.lineHeight,
  } as TextStyle,

  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
  } as ViewStyle,

  // Variants
  default: {
    backgroundColor: theme.colors.text,
    borderColor: theme.colors.border,
  } as ViewStyle,

  primary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  } as ViewStyle,

  secondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  } as ViewStyle,

  outline: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
  } as ViewStyle,

  filled: {
    backgroundColor: theme.colors.surface,
    borderColor: 'transparent',
  } as ViewStyle,

  ghost: {
    backgroundColor: `${theme.colors.text}90`,
    borderColor: 'transparent',
  } as ViewStyle,

  success: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  } as ViewStyle,

  error: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  } as ViewStyle,

  warning: {
    backgroundColor: theme.colors.warning,
    borderColor: theme.colors.warning,
  } as ViewStyle,

  info: {
    backgroundColor: theme.colors.info,
    borderColor: theme.colors.info,
  } as ViewStyle,

  destructive: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  } as ViewStyle,

  // Sizes
  xs: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs / 2,
    minHeight: 20,
  } as ViewStyle,

  sm: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minHeight: 24,
  } as ViewStyle,

  md: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 28,
  } as ViewStyle,

  lg: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 32,
  } as ViewStyle,

  xl: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: 36,
  } as ViewStyle,

  // Text sizes
  textXs: {
    fontSize: 10,
    lineHeight: 14,
  } as TextStyle,

  textSm: {
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,

  textMd: {
    fontSize: 14,
    lineHeight: 18,
  } as TextStyle,

  textLg: {
    fontSize: 16,
    lineHeight: 20,
  } as TextStyle,

  textXl: {
    fontSize: 18,
    lineHeight: 22,
  } as TextStyle,
});

// Helper functions
const getArrowSize = (size: ComponentSize): number => {
  switch (size) {
    case 'xs':
      return 4;
    case 'sm':
      return 5;
    case 'md':
      return 6;
    case 'lg':
      return 7;
    case 'xl':
      return 8;
    default:
      return 6;
  }
};

const getTextColor = (
  variant: ComponentVariant,
  theme: Theme
): string => {
  switch (variant) {
    case 'outline':
    case 'filled':
      return theme.colors.text;
    case 'ghost':
      return theme.colors.background;
    default:
      return theme.colors.background;
  }
};

// Fix line 627 - replace 'any' with proper type
const calculatePosition = (
  triggerLayout: { x: number; y: number; width: number; height: number },
  tooltipLayout: { width: number; height: number },
  position: TooltipPosition,
  offset: number,
  screenDimensions: { width: number; height: number }
): {
  tooltipX: number;
  tooltipY: number;
  arrowX: number;
  arrowY: number;
} => {
  const { x, y, width, height } = triggerLayout;
  const { width: tooltipWidth, height: tooltipHeight } = tooltipLayout;
  const { width: screenWidth, height: screenHeight } = screenDimensions;

  let tooltipX = 0;
  let tooltipY = 0;
  let arrowX = 0;
  let arrowY = 0;

  switch (position) {
    case 'top':
      tooltipX = x + width / 2 - tooltipWidth / 2;
      tooltipY = y - tooltipHeight - offset;
      arrowX = tooltipWidth / 2;
      arrowY = tooltipHeight;
      break;
    case 'bottom':
      tooltipX = x + width / 2 - tooltipWidth / 2;
      tooltipY = y + height + offset;
      arrowX = tooltipWidth / 2;
      arrowY = -offset;
      break;
    case 'left':
      tooltipX = x - tooltipWidth - offset;
      tooltipY = y + height / 2 - tooltipHeight / 2;
      arrowX = tooltipWidth;
      arrowY = tooltipHeight / 2;
      break;
    case 'right':
      tooltipX = x + width + offset;
      tooltipY = y + height / 2 - tooltipHeight / 2;
      arrowX = -offset;
      arrowY = tooltipHeight / 2;
      break;
  }

  // Boundary checks
  if (tooltipX < 0) tooltipX = 8;
  if (tooltipX + tooltipWidth > screenWidth) {
    tooltipX = screenWidth - tooltipWidth - 8;
  }
  if (tooltipY < 0) tooltipY = 8;
  if (tooltipY + tooltipHeight > screenHeight) {
    tooltipY = screenHeight - tooltipHeight - 8;
  }

  return { tooltipX, tooltipY, arrowX, arrowY };
};

// Components
const TooltipArrow = forwardRef<
  React.ComponentRef<typeof Animated.View>,
  TooltipArrowProps
>(({ position, size, variant, style }, ref) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createTooltipStyles);
  const arrowSize = getArrowSize(size);

  const arrowStyle = useMemo(() => {
    const baseStyle = {
      borderStyle: 'solid' as const,
    };

    const variantColor = (() => {
      switch (variant) {
        case 'primary':
          return theme.colors.primary;
        case 'secondary':
          return theme.colors.secondary;
        case 'success':
          return theme.colors.success;
        case 'error':
        case 'destructive':
          return theme.colors.error;
        case 'warning':
          return theme.colors.warning;
        case 'info':
          return theme.colors.info;
        case 'outline':
        case 'filled':
          return theme.colors.surface;
        case 'ghost':
          return `${theme.colors.text}90`;
        default:
          return theme.colors.text;
      }
    })();

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: variantColor,
        };
      case 'bottom':
        return {
          ...baseStyle,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: variantColor,
        };
      case 'left':
        return {
          ...baseStyle,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: variantColor,
        };
      case 'right':
        return {
          ...baseStyle,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: variantColor,
        };
      default:
        return baseStyle;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, size, variant, theme, arrowSize]);

  return (
    <Animated.View
      ref={ref}
      style={[styles.arrow, arrowStyle, style]}
    />
  );
});

TooltipArrow.displayName = 'TooltipArrow';

const TooltipContent = forwardRef<
  React.ComponentRef<typeof Animated.View>,
  TooltipContentProps
>(({ children, style }, ref) => {
  const styles = useThemedStyles(createTooltipStyles);

  return (
    <Animated.View ref={ref} style={[styles.content, style]}>
      {children}
    </Animated.View>
  );
});

TooltipContent.displayName = 'TooltipContent';

const TooltipText = forwardRef<
  React.ComponentRef<typeof Text>,
  TooltipTextProps
>(({ children, style }, ref) => {
  const styles = useThemedStyles(createTooltipStyles);

  return (
    <Text ref={ref} style={[styles.text, style]}>
      {children}
    </Text>
  );
});

TooltipText.displayName = 'TooltipText';

const Tooltip = forwardRef<
  React.ComponentRef<typeof View>,
  TooltipProps
>(
  (
    {
      children,
      content,
      position = 'top',
      trigger = 'longPress',
      delay = 500,
      duration = 2000,
      offset = 8,
      arrow = true,
      visible: controlledVisible,
      onVisibilityChange,
      size = 'md',
      variant = 'default',
      disabled = false,
      style,
      contentStyle,
      textStyle,
      arrowStyle,
      backgroundColor,
      borderRadius = 'md',
      maxWidth = 250,
      placement = 'auto',
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createTooltipStyles);
    const [internalVisible, setInternalVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    const [tooltipLayout, setTooltipLayout] = useState({
      width: 0,
      height: 0,
    });
    const [screenDimensions] = useState(() => Dimensions.get('window'));

    const triggerRef = useRef<View>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Animation values
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);
    const translateY = useSharedValue(-10);

    const isVisible = controlledVisible ?? internalVisible;

    // Calculate tooltip position
    const tooltipPosition = useMemo(() => {
      if (!triggerLayout.width || !tooltipLayout.width) {
        return { tooltipX: 0, tooltipY: 0, arrowX: 0, arrowY: 0 };
      }

      return calculatePosition(
        triggerLayout,
        tooltipLayout,
        position,
        offset,
        screenDimensions
      );
    }, [triggerLayout, tooltipLayout, position, offset, screenDimensions]);

    // Show tooltip
    const showTooltip = useCallback(() => {
      if (disabled) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setInternalVisible(true);
        onVisibilityChange?.(true);

        opacity.value = withTiming(1, { duration: 200 });
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 300,
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 300,
        });

        // Auto hide after duration
        if (duration > 0) {
          hideTimeoutRef.current = setTimeout(() => {
            hideTooltip();
          }, duration);
        }
      }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled, delay, duration, onVisibilityChange, opacity, scale, translateY]);

    // Hide tooltip
    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.8, { duration: 150 });
      translateY.value = withTiming(-10, { duration: 150 });

      setTimeout(() => {
        setInternalVisible(false);
        onVisibilityChange?.(false);
      }, 150);
    }, [onVisibilityChange, opacity, scale, translateY]);

    // Handle trigger layout
    const handleTriggerLayout = useCallback((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;

      if (triggerRef.current) {
        triggerRef.current.measureInWindow((pageX, pageY) => {
          setTriggerLayout({ x: pageX, y: pageY, width, height });
        });
      }
    }, []);

    // Handle tooltip layout
    const handleTooltipLayout = useCallback((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setTooltipLayout({ width, height });
    }, []);

    // Cleanup timeouts
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      };
    }, []);

    // Handle controlled visibility
    useEffect(() => {
      if (controlledVisible !== undefined) {
        if (controlledVisible) {
          showTooltip();
        } else {
          hideTooltip();
        }
      }
    }, [controlledVisible, showTooltip, hideTooltip]);

    // Animated styles
    const animatedTooltipStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          { scale: scale.value },
          { translateY: translateY.value },
        ],
      };
    });

    // Trigger props
    const triggerProps = useMemo(() => {
      const props: any = {
        onLayout: handleTriggerLayout,
      };

      if (trigger === 'longPress') {
        props.onLongPress = showTooltip;
      } else if (trigger === 'press') {
        props.onPress = showTooltip;
      }

      return props;
    }, [trigger, handleTriggerLayout, showTooltip]);

    // Tooltip styles
    // Fix line 648 - handle undefined backgroundColor
    const tooltipStyles = useMemo(() => {
      return [
        styles.tooltip,
        styles[variant],
        styles[size],
        {
          backgroundColor: backgroundColor
            ? resolveColor(theme, backgroundColor, styles[variant].backgroundColor as string)
            : styles[variant].backgroundColor,
          borderRadius: theme.components.borderRadius[borderRadius],
          maxWidth,
          left: tooltipPosition.tooltipX,
          top: tooltipPosition.tooltipY,
        },
        contentStyle,
      ];
    }, [
      styles,
      variant,
      size,
      backgroundColor,
      theme,
      borderRadius,
      maxWidth,
      tooltipPosition,
      contentStyle,
    ]);

    const textColor = getTextColor(variant, theme);
    // Fix line 697 - flatten array for TextStyle
    const finalTextStyle: TextStyle = {
      ...styles.text,
      ...styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
      color: textColor,
      ...(textStyle as TextStyle),
    };

    return (
      <View ref={ref} style={[styles.container, style]} {...props}>
        {/* Trigger */}
        <View ref={triggerRef} {...triggerProps}>
          {children}
        </View>

        {/* Tooltip */}
        {isVisible && (
          <Animated.View
            style={[
              styles.overlay,
              tooltipStyles,
              animatedTooltipStyle,
              {
                position: 'absolute',
                zIndex: 9999,
              }
            ]}
            onLayout={handleTooltipLayout}
            pointerEvents="none"
          >
            <TooltipContent>
              {typeof content === 'string' ? (
                <TooltipText style={finalTextStyle}>
                  {content}
                </TooltipText>
              ) : (
                content
              )}
            </TooltipContent>

            {/* Arrow - Fix line 711 */}
            {arrow && (
              <TooltipArrow
                position={position}
                size={size}
                variant={variant}
                style={{
                  left: tooltipPosition.arrowX,
                  top: tooltipPosition.arrowY,
                  ...(arrowStyle as ViewStyle),
                }}
              />
            )}
          </Animated.View>
        )}
      </View>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export {
  Tooltip,
  TooltipContent,
  TooltipText,
  TooltipArrow,
  type TooltipProps,
  type TooltipContentProps,
  type TooltipTextProps,
  type TooltipArrowProps,
};