import React, { createContext, useContext, forwardRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Typography } from '../typography';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';
import { ChevronDown } from 'lucide-react-native';

// Types
interface AccordionContextType {
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  disabled: boolean;
  collapsible: boolean;
}

interface AccordionItemContext {
  itemValue: string;
  variant: ComponentVariant;
  size: ComponentSize;
  disabled: boolean;
}

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  collapsible?: boolean;
  style?: StyleProp<ViewStyle>;
}

type AccordionItemProps = BaseComponentProps & {
  value: string;
  children: React.ReactNode;
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

interface AccordionContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: ComponentSize;
}

// Context
const AccordionContext = createContext<AccordionContextType | null>(null);
// eslint-disable-next-line no-redeclare
const AccordionItemContext = createContext<AccordionItemContext | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion');
  }
  return context;
};

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItem must be used within an AccordionItem');
  }
  return context;
};

// Styles
const createAccordionStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },

    // Item styles
    item: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      overflow: 'hidden',
    },

    itemLast: {
      borderBottomWidth: 0,
    },

    // Trigger styles
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      borderWidth: 0,
    },

    triggerText: {
      flex: 1,
      color: theme.colors.text,
      fontWeight: '500',
    },

    triggerIcon: {
      marginLeft: theme.spacing.sm,
    },

    // Content styles
    content: {
      overflow: 'hidden',
    },

    contentInner: {
      backgroundColor: theme.colors.surface,
    },

    // Variants
    default: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },

    primary: {
      backgroundColor: `${theme.colors.primary}05`,
      borderColor: theme.colors.primary,
    },

    secondary: {
      backgroundColor: `${theme.colors.secondary}05`,
      borderColor: theme.colors.secondary,
    },

    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
      borderWidth: 1,
    },

    filled: {
      backgroundColor: theme.colors.background,
      borderColor: 'transparent',
    },

    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },

    success: {
      backgroundColor: `${theme.colors.success}05`,
      borderColor: theme.colors.success,
    },

    error: {
      backgroundColor: `${theme.colors.error}05`,
      borderColor: theme.colors.error,
    },

    warning: {
      backgroundColor: `${theme.colors.warning}05`,
      borderColor: theme.colors.warning,
    },

    info: {
      backgroundColor: `${theme.colors.info}05`,
      borderColor: theme.colors.info,
    },

    destructive: {
      backgroundColor: `${theme.colors.error}05`,
      borderColor: theme.colors.error,
    },

    // Sizes
    xs: {
      minHeight: 32,
    },

    sm: {
      minHeight: 36,
    },

    md: {
      minHeight: 44,
    },

    lg: {
      minHeight: 52,
    },

    xl: {
      minHeight: 60,
    },

    // Size-specific trigger padding
    triggerXs: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },

    triggerSm: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },

    triggerMd: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },

    triggerLg: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },

    triggerXl: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
    },

    // Size-specific content padding
    contentPaddingXs: {
      padding: theme.spacing.xs,
    },

    contentPaddingSm: {
      padding: theme.spacing.sm,
    },

    contentPaddingMd: {
      padding: theme.spacing.md,
    },

    contentPaddingLg: {
      padding: theme.spacing.lg,
    },

    contentPaddingXl: {
      padding: theme.spacing.xl,
    },

    // Size-specific text
    textXs: {
      fontSize: 12,
      lineHeight: 16,
    } as TextStyle,

    textSm: {
      fontSize: 14,
      lineHeight: 18,
    } as TextStyle,

    textMd: {
      fontSize: 16,
      lineHeight: 20,
    } as TextStyle,

    textLg: {
      fontSize: 18,
      lineHeight: 24,
    } as TextStyle,

    textXl: {
      fontSize: 20,
      lineHeight: 28,
    } as TextStyle,

    // Disabled state
    disabled: {
      opacity: 0.6,
    },
  });

// Components
const Accordion = forwardRef<React.ComponentRef<typeof View>, AccordionProps>(
  (
    {
      children,
      type = 'single',
      value,
      onValueChange,
      disabled = false,
      collapsible = true,
      style,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createAccordionStyles);

    const [internalValue, setInternalValue] = useState<string | string[]>(
      type === 'single' ? '' : []
    );

    const currentValue = value ?? internalValue;

    const handleValueChange = (newValue: string | string[]) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    };

    const contextValue: AccordionContextType = {
      type,
      value: currentValue,
      onValueChange: handleValueChange,
      disabled,
      collapsible,
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.container, style]} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

const AccordionItem = forwardRef<
  React.ComponentRef<typeof View>,
  AccordionItemProps
>(
  (
    {
      value,
      children,
      variant = 'default',
      size = 'md',
      disabled: itemDisabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createAccordionStyles);
    const accordion = useAccordion();

    const isDisabled = accordion.disabled || itemDisabled;

    const itemContextValue: AccordionItemContext = {
      itemValue: value,
      variant,
      size,
      disabled: isDisabled,
    };

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <View
          ref={ref}
          style={[
            styles.item,
            styles[variant],
            styles[size],
            isDisabled && styles.disabled,
            style,
          ]}
          pointerEvents={isDisabled ? "none" : "box-none"}
          {...props}
        >
          {children}
        </View>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  AccordionTriggerProps
>(({ children, style, textStyle, showIcon = true, icon, ...props }, ref) => {
  const styles = useThemedStyles(createAccordionStyles);
  const accordion = useAccordion();
  const item = useAccordionItem();

  const { itemValue, size, disabled } = item;

  const isExpanded =
    accordion.type === 'single'
      ? accordion.value === itemValue
      : Array.isArray(accordion.value) && accordion.value.includes(itemValue);

  const iconRotation = useSharedValue(isExpanded ? (icon ? 360 : 180) : 0);

  React.useEffect(() => {
    iconRotation.value = withSpring(isExpanded ? (icon ? 360 : 180) : 0, {
      damping: 15,
      stiffness: 200,
    });
  }, [isExpanded, iconRotation, icon]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotation.value}deg` }],
    };
  });

  const handlePress = () => {
    if (disabled) return;

    if (accordion.type === 'single') {
      const newValue = isExpanded && accordion.collapsible ? '' : itemValue;
      accordion.onValueChange(newValue);
    } else {
      const currentValues = Array.isArray(accordion.value)
        ? accordion.value
        : [];
      const newValues = isExpanded
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];
      accordion.onValueChange(newValues);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={[
        styles.trigger,
        styles[
          `trigger${
            size.charAt(0).toUpperCase() + size.slice(1)
          }` as keyof typeof styles
        ],
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <Typography
        variant="body"
        style={[
          styles.triggerText,
          styles[
            `text${
              size.charAt(0).toUpperCase() + size.slice(1)
            }` as keyof typeof styles
          ],
          textStyle,
        ]}
      >
        {children}
      </Typography>
      {showIcon && (
        <Animated.View style={[styles.triggerIcon, animatedIconStyle]}>
          {icon ?? (
            <ChevronDown
              size={
                size === 'xs'
                  ? 16
                  : size === 'sm'
                  ? 18
                  : size === 'lg'
                  ? 22
                  : size === 'xl'
                  ? 24
                  : 20
              }
            />
          )}
        </Animated.View>
      )}
    </TouchableOpacity>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = forwardRef<
  React.ComponentRef<typeof View>,
  AccordionContentProps
>(({ children, style, padding = 'md', ...props }, ref) => {
  const styles = useThemedStyles(createAccordionStyles);
  const accordion = useAccordion();
  const item = useAccordionItem();

  const { itemValue } = item;

  const isExpanded =
    accordion.type === 'single'
      ? accordion.value === itemValue
      : Array.isArray(accordion.value) && accordion.value.includes(itemValue);

  const animatedRef = useAnimatedRef<Animated.View>();
  const height = useSharedValue(0);
  const opacity = useSharedValue(isExpanded ? 1 : 0);
  const [contentHeight, setContentHeight] = useState(0);

  // Initialize height based on initial expanded state
  React.useEffect(() => {
    if (contentHeight > 0) {
      height.value = isExpanded ? contentHeight : 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHeight]);

  React.useEffect(() => {
    if (contentHeight > 0) {
      if (isExpanded) {
        height.value = withSpring(contentHeight, {
          damping: 20,
          stiffness: 150,
        });
        opacity.value = withTiming(1, { duration: 200 });
      } else {
        height.value = withSpring(0, {
          damping: 25,
          stiffness: 120,
        });
        opacity.value = withTiming(0, { duration: 150 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, contentHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
    };
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout;
    if (layoutHeight > 0 && layoutHeight !== contentHeight) {
      setContentHeight(layoutHeight);
    }
  };

  // Get padding style based on size
  const paddingStyle =
    styles[
      `contentPadding${
        padding.charAt(0).toUpperCase() + padding.slice(1)
      }` as keyof typeof styles
    ];

  // Render content in a hidden container first to measure height
  if (contentHeight === 0) {
    return (
      <View
        style={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <View
          style={[styles.contentInner, paddingStyle, style]}
          onLayout={handleLayout}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <Animated.View ref={animatedRef} style={[styles.content, animatedStyle]}>
      <View
        ref={ref}
        style={[styles.contentInner, paddingStyle, style]}
        {...props}
      >
        {children}
      </View>
    </Animated.View>
  );
});

AccordionContent.displayName = 'AccordionContent';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
};
