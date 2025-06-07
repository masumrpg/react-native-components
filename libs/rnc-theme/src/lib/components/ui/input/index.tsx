import React, { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Eye, EyeOff, Search } from 'lucide-react-native';

type InputVariant = 'default' | 'outline' | 'filled' | 'underline';
type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'success' | 'warning' | 'disabled';

interface BaseInputProps {
  label?: string;
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  state?: InputState;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  borderRadius?: keyof Theme['borderRadius'];
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperTextStyle?: TextStyle;
}

type InputProps = BaseInputProps & Omit<TextInputProps, 'style'>;

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      placeholder,
      variant = 'outline',
      size = 'md',
      state = 'default',
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      required = false,
      disabled = false,
      multiline = false,
      numberOfLines = 1,
      maxLength,
      showCharacterCount = false,
      borderRadius = 'md',
      style,
      inputStyle,
      labelStyle,
      helperTextStyle,
      value,
      onChangeText,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');

    const handleChangeText = (text: string) => {
      setInputValue(text);
      onChangeText?.(text);
    };

    const getStateColor = () => {
      if (disabled) return theme.colors.textSecondary;
      if (state === 'error' || errorText) return theme.colors.error;
      if (state === 'success') return theme.colors.success;
      if (state === 'warning') return theme.colors.warning;
      if (isFocused) return theme.colors.primary;
      return theme.colors.border;
    };

    const getBackgroundColor = () => {
      if (disabled) return theme.colors.background;
      if (variant === 'filled') return theme.colors.background;
      return theme.colors.surface;
    };

    const getLabelStyles = () => {
      const baseStyle = [styles.label, labelStyle];
      switch (size) {
        case 'sm':
          return [...baseStyle, styles.labelSm];
        case 'lg':
          return [...baseStyle, styles.labelLg];
        default:
          return [...baseStyle, styles.labelMd];
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return styles.sizeSm;
        case 'lg':
          return styles.sizeLg;
        default:
          return styles.sizeMd;
      }
    };

    const getTextInputStyles = () => {
      const baseStyle = [
        styles.textInput,
        {
          color: disabled ? theme.colors.textSecondary : theme.colors.text,
        },
        multiline && { textAlignVertical: 'top' as const },
        inputStyle,
      ];

      switch (size) {
        case 'sm':
          return [...baseStyle, styles.textInputSm];
        case 'lg':
          return [...baseStyle, styles.textInputLg];
        default:
          return [...baseStyle, styles.textInputMd];
      }
    };

    const renderLabel = () => {
      if (!label) return null;

      return (
        <Text style={getLabelStyles()}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      );
    };

    const renderHelperText = () => {
      const text = errorText || helperText;
      if (!text && !showCharacterCount) return null;

      return (
        <View style={styles.helperContainer}>
          {text && (
            <Text
              style={[
                styles.helperText,
                errorText && styles.errorText,
                helperTextStyle,
              ]}
            >
              {text}
            </Text>
          )}
          {showCharacterCount && maxLength && (
            <Text style={styles.characterCount}>
              {inputValue.length}/{maxLength}
            </Text>
          )}
        </View>
      );
    };

    const inputContainerStyle = [
      styles.inputContainer,
      styles[variant],
      getSizeStyles(),
      {
        borderColor: getStateColor(),
        backgroundColor: getBackgroundColor(),
        borderRadius: theme.borderRadius[borderRadius],
      },
      isFocused && styles.focused,
      disabled && styles.disabled,
      (state === 'error' || errorText) && styles.errorState,
      state === 'success' && styles.successState,
      state === 'warning' && styles.warningState,
      style,
    ];

    return (
      <View style={styles.container}>
        {renderLabel()}
        <View style={inputContainerStyle}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={getTextInputStyles()}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={inputValue}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={!disabled}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            maxLength={maxLength}
            {...props}
          />
          {rightIcon && (
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
        {renderHelperText()}
      </View>
    );
  }
);

const createStyles = (theme: Theme) => ({
  container: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
    fontWeight: '500' as const,
  },
  labelSm: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
  },
  labelMd: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  },
  labelLg: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
  },
  required: {
    color: theme.colors.error,
  },
  inputContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
  },
  // Variants
  default: {
    borderWidth: 0,
    backgroundColor: theme.colors.background,
  },
  outline: {
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  filled: {
    borderWidth: 0,
    backgroundColor: theme.colors.background,
  },
  underline: {
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  // Sizes
  sizeSm: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minHeight: 36,
  },
  sizeMd: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 44,
  },
  sizeLg: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 52,
  },
  // States
  focused: {
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.6,
  },
  errorState: {
    borderColor: theme.colors.error,
  },
  successState: {
    borderColor: theme.colors.success,
  },
  warningState: {
    borderColor: theme.colors.warning,
  },
  // Text Input
  textInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center' as const,
  },
  textInputSm: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.fontSize * 1.2, // Reduced line height
  },
  textInputMd: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.fontSize * 1.2, // Reduced line height
  },
  textInputLg: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.fontSize * 1.2, // Reduced line height
  },
  // Icons
  leftIcon: {
    marginRight: theme.spacing.xs,
  },
  rightIcon: {
    marginLeft: theme.spacing.xs,
  },
  // Helper Text
  helperContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginTop: theme.spacing.xs,
  },
  helperText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  errorText: {
    color: theme.colors.error,
  },
  characterCount: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
});

// Shortcut components
interface InputPasswordProps
  extends Omit<InputProps, 'rightIcon' | 'onRightIconPress'> {
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
}

const InputPassword = forwardRef<TextInput, InputPasswordProps>(
  ({ showPasswordIcon, hidePasswordIcon, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { theme } = useTheme();

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const iconSize = props.size === 'sm' ? 16 : props.size === 'lg' ? 24 : 20;

    const defaultShowIcon = showPasswordIcon || (
      <Eye size={iconSize} color={theme.colors.textSecondary} />
    );
    const defaultHideIcon = hidePasswordIcon || (
      <EyeOff size={iconSize} color={theme.colors.textSecondary} />
    );

    return (
      <Input
        ref={ref}
        {...props}
        secureTextEntry={!isPasswordVisible}
        rightIcon={isPasswordVisible ? defaultHideIcon : defaultShowIcon}
        onRightIconPress={togglePasswordVisibility}
      />
    );
  }
);

const InputSearch = forwardRef<TextInput, InputProps>((props, ref) => {
  const { theme } = useTheme();
  const iconSize = props.size === 'sm' ? 16 : props.size === 'lg' ? 24 : 20;

  return (
    <Input
      ref={ref}
      {...props}
      leftIcon={<Search size={iconSize} color={theme.colors.textSecondary} />}
      placeholder={props.placeholder || 'Search...'}
    />
  );
});

const InputTextArea = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      multiline
      numberOfLines={props.numberOfLines || 4}
      variant={props.variant || 'outline'}
    />
  );
});

Input.displayName = 'Input';
InputPassword.displayName = 'InputPassword';
InputSearch.displayName = 'InputSearch';
InputTextArea.displayName = 'InputTextArea';

export {
  Input,
  InputPassword,
  InputSearch,
  InputTextArea,
  type InputProps,
  type InputPasswordProps,
  type InputVariant,
  type InputSize,
  type InputState,
};
