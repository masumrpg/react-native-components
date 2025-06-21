import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { Calendar, CalendarProps } from '../calendar';
import { Portal } from '../portal';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { ComponentSize, ComponentVariant } from '../../../types/ui';
import { DateData } from 'react-native-calendars';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

// Types
export interface DatePickerProps {
  value?: string;
  onDateSelect?: (date: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  size?: ComponentSize;
  variant?: ComponentVariant;
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
}

// Helper function to format date
const formatDate = (dateString: string, format: DatePickerProps['dateFormat'] = 'DD/MM/YYYY'): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(value);
  
  const backdropOpacityValue = useSharedValue(0);
  const calendarScaleValue = useSharedValue(0.8);
  const calendarOpacityValue = useSharedValue(0);

  const styles = useThemedStyles((theme: Theme) => createStyles(theme, size, variant, borderRadius));

  const displayValue = useMemo(() => {
    if (selectedDate) {
      return formatDate(selectedDate, dateFormat);
    }
    return '';
  }, [selectedDate, dateFormat]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    
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
  }, [disabled, backdropOpacity, animationDuration, backdropOpacityValue, calendarScaleValue, calendarOpacityValue]);

  const handleClose = useCallback(() => {
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
  }, [animationDuration, backdropOpacityValue, calendarScaleValue, calendarOpacityValue]);

  const handleDateSelect = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
    onDateSelect?.(day.dateString);
    
    if (closeOnSelect) {
      handleClose();
    }
  }, [onDateSelect, closeOnSelect, handleClose]);

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

  const renderIcon = () => {
    if (!showIcon) return null;
    
    if (customIcon) {
      return customIcon;
    }
    
    const IconComponent = iconPosition === 'left' ? CalendarIcon : ChevronDown;
    return (
      <IconComponent
        size={theme.fontSizes[size] || 16}
        color={disabled ? theme.colors.muted : theme.colors.textSecondary}
      />
    );
  };

  const inputContainerStyle = [
    styles.inputContainer,
    disabled && styles.disabled,
    error && styles.error,
    inputStyle,
  ];

  const textStyle = [
    styles.inputText,
    !displayValue && styles.placeholder,
    disabled && styles.disabledText,
    error && styles.errorText,
    !displayValue && placeholderStyle,
  ];

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TouchableOpacity
        style={inputContainerStyle}
        onPress={handleOpen}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {showIcon && iconPosition === 'left' && (
          <View style={styles.leftIcon}>
            {renderIcon()}
          </View>
        )}
        
        <Text style={textStyle}>
          {displayValue || placeholder}
        </Text>
        
        {showIcon && iconPosition === 'right' && (
          <View style={styles.rightIcon}>
            {renderIcon()}
          </View>
        )}
      </TouchableOpacity>
      
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
            
            <Animated.View style={[styles.calendarContainer, calendarAnimatedStyle, calendarStyle]}>
              <Calendar
                onDayPress={handleDateSelect}
                selectedDate={selectedDate ? {
                  dateString: selectedDate,
                  day: new Date(selectedDate).getDate(),
                  month: new Date(selectedDate).getMonth() + 1,
                  year: new Date(selectedDate).getFullYear(),
                  timestamp: new Date(selectedDate).getTime(),
                } : undefined}
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
  const sizeStyles = {
    xs: {
      height: 32,
      paddingHorizontal: theme.spacing.xs,
      fontSize: theme.fontSizes.xs,
    },
    sm: {
      height: 36,
      paddingHorizontal: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
    },
    md: {
      height: 44,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.fontSizes.md,
    },
    lg: {
      height: 52,
      paddingHorizontal: theme.spacing.lg,
      fontSize: theme.fontSizes.lg,
    },
    xl: {
      height: 60,
      paddingHorizontal: theme.spacing.xl,
      fontSize: theme.fontSizes.xl,
    },
  };

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
    container: {
      marginBottom: theme.spacing.sm,
    },
    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: theme.typography.subtitle.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    required: {
      color: theme.colors.error,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.components.borderRadius[borderRadius],
      ...sizeStyles[size],
      ...variantStyles[variant],
    },
    inputText: {
      flex: 1,
      fontSize: sizeStyles[size].fontSize,
      color: theme.colors.text,
      fontWeight: theme.typography.body.fontWeight,
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
      backgroundColor: theme.colors.muted + '10',
      borderColor: theme.colors.muted,
    },
    disabledText: {
      color: theme.colors.muted,
    },
    error: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
    },
    helperText: {
      fontSize: theme.fontSizes.xs,
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