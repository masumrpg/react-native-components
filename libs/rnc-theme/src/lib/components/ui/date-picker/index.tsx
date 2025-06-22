import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Dimensions,
  Platform,
} from 'react-native';
import { Calendar, CalendarProps } from '../calendar';
import { Portal } from '../portal';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';
import { ComponentSize, ComponentVariant, ComponentState } from '../../../types/ui';
import { DateData } from 'react-native-calendars';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { ANIMATION_CONSTANTS } from '../../../constants/ui';

// Types
export interface DatePickerProps {
  value?: string;
  onDateSelect?: (date: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  size?: ComponentSize;
  variant?: ComponentVariant;
  state?: ComponentState;
  dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'DD MMM YYYY';
  minDate?: string;
  maxDate?: string;
  markedDates?: CalendarProps['markedDates'];
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  calendarStyle?: ViewStyle;
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
  customIcon?: React.ReactNode;
  closeOnSelect?: boolean;
  animationDuration?: number;
  backdropOpacity?: number;
  borderRadius?: keyof Theme['components']['borderRadius'];
  helperText?: string;
  error?: string;
  required?: boolean;
  animated?: boolean;
  onChange?: (date: string) => void;
}

// Helper function to format date
const formatDate = (
  dateString: string,
  format: DatePickerProps['dateFormat'] = 'DD/MM/YYYY'
): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD MMM YYYY':
      return `${day} ${monthNames[date.getMonth()]} ${year}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onDateSelect,
  placeholder = 'Pilih tanggal',
  label,
  disabled = false,
  size = 'md',
  variant = 'default',
  state = 'default',
  dateFormat = 'DD/MM/YYYY',
  minDate,
  maxDate,
  markedDates,
  style,
  inputStyle,
  labelStyle,
  placeholderStyle,
  calendarStyle,
  showIcon = true,
  iconPosition = 'right',
  customIcon,
  closeOnSelect = true,
  animationDuration = 300,
  backdropOpacity = 0.5,
  borderRadius = 'md',
  helperText,
  error,
  required = false,
  animated = true,
  onChange,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(value);
  const [isFocused, setIsFocused] = useState(false);

  // Animation values - similar to Input component
  const focusAnimation = useSharedValue(0);
  const errorAnimation = useSharedValue(0);
  const borderAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);
  const backdropOpacityValue = useSharedValue(0);
  const calendarScaleValue = useSharedValue(0.8);
  const calendarOpacityValue = useSharedValue(0);

  // Computed values - similar to Input component
  const hasError = useMemo(
    () => state === 'error' || Boolean(error),
    [state, error]
  );

  // UI thread safe functions
  const setFocusedJS = useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  // Update selectedDate when value prop changes
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  // Update error animation when error state changes
  useEffect(() => {
    if (animated) {
      errorAnimation.value = withTiming(
        hasError ? 1 : 0,
        {
          duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
        }
      );
    }
  }, [hasError, animated, errorAnimation]);

  const styles = useThemedStyles((theme: Theme) =>
    createStyles(theme, size, variant, borderRadius)
  );

  const displayValue = useMemo(() => {
    if (selectedDate) {
      return formatDate(selectedDate, dateFormat);
    }
    return '';
  }, [selectedDate, dateFormat]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    
    runOnJS(setFocusedJS)(true);
    setIsOpen(true);

    if (animated) {
      focusAnimation.value = withTiming(1, {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
      borderAnimation.value = withSpring(
        1,
        ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
      );
      scaleAnimation.value = withSpring(1.02, {
        ...ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT,
        stiffness: 200,
      });
    }

    backdropOpacityValue.value = withTiming(backdropOpacity, {
      duration: animationDuration,
    });
    calendarScaleValue.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    calendarOpacityValue.value = withTiming(1, {
      duration: animationDuration,
    });
  }, [
    disabled,
    animated,
    backdropOpacity,
    animationDuration,
    focusAnimation,
    borderAnimation,
    scaleAnimation,
    backdropOpacityValue,
    calendarScaleValue,
    calendarOpacityValue,
    setFocusedJS,
  ]);

  const handleClose = useCallback(() => {
    runOnJS(setFocusedJS)(false);

    if (animated) {
      focusAnimation.value = withTiming(0, {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
      borderAnimation.value = withTiming(0, {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      });
      scaleAnimation.value = withSpring(1, {
        ...ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT,
        stiffness: 200,
      });
    }

    backdropOpacityValue.value = withTiming(0, {
      duration: animationDuration,
    });
    calendarScaleValue.value = withTiming(0.8, {
      duration: animationDuration,
    });
    calendarOpacityValue.value = withTiming(0, {
      duration: animationDuration,
    });

    setTimeout(() => {
      setIsOpen(false);
    }, animationDuration);
  }, [
    animated,
    animationDuration,
    focusAnimation,
    borderAnimation,
    scaleAnimation,
    backdropOpacityValue,
    calendarScaleValue,
    calendarOpacityValue,
    setFocusedJS,
  ]);

  const handleDateSelect = useCallback(
    (day: DateData) => {
      setSelectedDate(day.dateString);
      onDateSelect?.(day.dateString);
      onChange?.(day.dateString);

      if (closeOnSelect) {
        handleClose();
      }
    },
    [onDateSelect, onChange, closeOnSelect, handleClose]
  );

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacityValue.value,
    };
  });

  const calendarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: calendarScaleValue.value }],
      opacity: calendarOpacityValue.value,
    };
  });

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnimation.value }],
    };
  });

  const borderAnimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderAnimation.value,
      [0, 1],
      [
        hasError
          ? theme.colors.error
          : state === 'success'
          ? theme.colors.success
          : theme.colors.border,
        theme.colors.primary,
      ]
    );

    return {
      borderColor,
      shadowOpacity: borderAnimation.value * 0.1,
      shadowRadius: borderAnimation.value * 4,
      shadowColor: theme.colors.primary,
      ...(Platform.OS === 'android' && {
        elevation: borderAnimation.value * 2,
      }),
    };
  });

  const renderIcon = () => {
    if (!showIcon) return null;

    if (customIcon) {
      return customIcon;
    }

    const IconComponent = iconPosition === 'left' ? CalendarIcon : ChevronDown;
    const iconSize = getSizeStyles(size, theme).iconSize;
    return (
      <IconComponent
        size={iconSize}
        color={
          disabled ? theme.colors.muted : theme.colors.textSecondary
        }
      />
    );
  };

  // Get size styles similar to Combobox
  const getSizeStyles = (size: ComponentSize, theme: Theme) => {
    const sizeMap = {
      xs: {
        padding: { horizontal: theme.spacing.xs, vertical: theme.spacing.xs },
        fontSize: theme.typography.caption?.fontSize || 12,
        minHeight: 32,
        iconSize: 16,
      },
      sm: {
        padding: { horizontal: theme.spacing.sm, vertical: theme.spacing.xs },
        fontSize: theme.typography.body?.fontSize || 14,
        minHeight: 36,
        iconSize: 18,
      },
      md: {
        padding: {
          horizontal: theme.spacing.md,
          vertical: theme.spacing.sm,
        },
        fontSize: theme.typography.body?.fontSize || 16,
        minHeight: 42,
        iconSize: 20,
      },
      lg: {
        padding: { horizontal: theme.spacing.lg, vertical: theme.spacing.md },
        fontSize: theme.typography.subtitle?.fontSize || 18,
        minHeight: 48,
        iconSize: 24,
      },
      xl: {
        padding: { horizontal: theme.spacing.xl, vertical: theme.spacing.lg },
        fontSize: theme.typography.title?.fontSize || 20,
        minHeight: 56,
        iconSize: 28,
      },
    };
    return sizeMap[size];
  };

  // Get size-specific styles using the same pattern as Input component
  const getSizeStyleKey = (size: ComponentSize) => {
    switch (size) {
      case 'xs':
        return 'sizeXs';
      case 'sm':
        return 'sizeSm';
      case 'lg':
        return 'sizeLg';
      case 'xl':
        return 'sizeXl';
      default:
        return 'sizeMd';
    }
  };

  const getTextSizeKey = (size: ComponentSize) => {
    switch (size) {
      case 'xs':
        return 'textXs';
      case 'sm':
        return 'textSm';
      case 'lg':
        return 'textLg';
      case 'xl':
        return 'textXl';
      default:
        return 'textMd';
    }
  };

  const inputContainerStyle = [
    styles.inputContainer,
    styles.variant,
    disabled && styles.disabled,
    hasError && styles.error,
    state === 'success' && styles.success,
    isFocused && styles.focused,
    inputStyle,
  ];

  const touchableContainerStyle = [
    styles.touchableContainer,
    styles[getSizeStyleKey(size)],
  ];

  const textStyle = [
    styles.inputText,
    styles[getTextSizeKey(size)],
    !displayValue && styles.placeholder,
    disabled && styles.disabledText,
    hasError && styles.errorText,
    !displayValue && placeholderStyle,
  ];

  // Render DatePicker
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <Animated.View style={inputAnimatedStyle}>
        <Animated.View style={[inputContainerStyle, borderAnimatedStyle]}>
          <TouchableOpacity
            style={touchableContainerStyle}
            onPress={handleOpen}
            disabled={disabled}
            activeOpacity={0.8}
          >
            {showIcon && iconPosition === 'left' && (
              <View style={styles.leftIcon}>{renderIcon()}</View>
            )}

            <Text style={textStyle}>{displayValue || placeholder}</Text>

            {showIcon && iconPosition === 'right' && (
              <View style={styles.rightIcon}>{renderIcon()}</View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {(helperText || error) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}

      {isOpen && (
        <Portal name="date-picker-portal">
          <View style={styles.overlay}>
            <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
              <TouchableWithoutFeedback onPress={handleClose}>
                <View style={StyleSheet.absoluteFill} />
              </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View
              style={[
                styles.calendarContainer,
                calendarAnimatedStyle,
                calendarStyle,
              ]}
            >
              <Calendar
                onDayPress={handleDateSelect}
                selectedDate={
                  selectedDate
                    ? {
                        dateString: selectedDate,
                        day: new Date(selectedDate).getDate(),
                        month: new Date(selectedDate).getMonth() + 1,
                        year: new Date(selectedDate).getFullYear(),
                        timestamp: new Date(selectedDate).getTime(),
                      }
                    : undefined
                }
                markedDates={markedDates}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Animated.View>
          </View>
        </Portal>
      )}
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const createStyles = (
  theme: Theme,
  size: ComponentSize,
  variant: ComponentVariant,
  borderRadius: keyof Theme['components']['borderRadius']
) => {
  const variantStyles = {
    default: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    primary: {
      backgroundColor: theme.colors.primary + '10',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    secondary: {
      backgroundColor: theme.colors.secondary + '10',
      borderColor: theme.colors.secondary,
      borderWidth: 1,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
      borderWidth: 2,
    },
    filled: {
      backgroundColor: theme.colors.muted + '20',
      borderColor: 'transparent',
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
    },
    success: {
      backgroundColor: theme.colors.success + '10',
      borderColor: theme.colors.success,
      borderWidth: 1,
    },
    error: {
      backgroundColor: theme.colors.error + '10',
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
    warning: {
      backgroundColor: theme.colors.warning + '10',
      borderColor: theme.colors.warning,
      borderWidth: 1,
    },
    info: {
      backgroundColor: theme.colors.info + '10',
      borderColor: theme.colors.info,
      borderWidth: 1,
    },
    destructive: {
      backgroundColor: theme.colors.error + '10',
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
  };

  return StyleSheet.create({
    container: {},
    label: {
      fontSize: theme.fontSizes?.sm || 14,
      fontWeight: theme.typography.subtitle?.fontWeight || '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    required: {
      color: theme.colors.error,
    },
    inputContainer: {
      borderRadius: theme.components.borderRadius[borderRadius],
      shadowColor: resolveColor(theme, 'text', theme.colors.text),
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      ...(Platform.OS === 'android' && {
        elevation: 1,
      }),
    },
    variant: {
      ...variantStyles[variant],
    },
    touchableContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    // Size styles - consistent with Input and Combobox
    sizeXs: {
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      minHeight: 32,
    },
    sizeSm: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      minHeight: 36,
    },
    sizeMd: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 42,
    },
    sizeLg: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      minHeight: 48,
    },
    sizeXl: {
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
      minHeight: 56,
    },
    inputText: {
      flex: 1,
      color: theme.colors.text,
      fontWeight: theme.typography.body?.fontWeight || '400',
      letterSpacing: 0.1,
    },
    // Text size styles
    textXs: {
      fontSize: theme.typography.caption?.fontSize || 12,
    },
    textSm: {
      fontSize: theme.typography.body?.fontSize || 14,
    },
    textMd: {
      fontSize: theme.typography.body?.fontSize || 16,
    },
    textLg: {
      fontSize: theme.typography.subtitle?.fontSize || 18,
    },
    textXl: {
      fontSize: theme.typography.title?.fontSize || 20,
    },
    placeholder: {
      color: theme.colors.textSecondary,
    },
    leftIcon: {
      marginRight: theme.spacing.sm,
    },
    rightIcon: {
      marginLeft: theme.spacing.sm,
    },
    disabled: {
      opacity: 0.6,
      backgroundColor: resolveColor(
        theme,
        'background',
        theme.colors.background
      ),
    },
    disabledText: {
      color: theme.colors.muted,
    },
    focused: {
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      ...(Platform.OS === 'android' && {
        elevation: 2,
      }),
    },
    error: {
      borderColor: theme.colors.error,
    },
    success: {
      borderColor: theme.colors.success,
    },
    errorText: {
      color: theme.colors.error,
    },
    helperText: {
      fontSize: theme.fontSizes?.xs || 12,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.text,
    },
    calendarContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.lg,
      margin: theme.spacing.lg,
      width: Math.min(screenWidth - 32, 380),
      maxWidth: 380,
      elevation: 8,
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },
  });
};

export { DatePicker };