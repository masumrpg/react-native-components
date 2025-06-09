import React, {
  useState,
  forwardRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  interpolateColor,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Eye, EyeOff, Search } from 'lucide-react-native';

// Animation constants
const ANIMATION_DURATION = 200;
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 1,
} as const;

type InputVariant = 'default' | 'outline' | 'filled' | 'underline' | 'floating';
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
  animationEnabled?: boolean;
  floatingLabel?: boolean;
}

type InputProps = BaseInputProps & Omit<TextInputProps, 'style'>;

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
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
      animationEnabled = true,
      floatingLabel = false,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value ?? '');

    // Animation values
    const focusAnimation = useSharedValue(0);
    const errorAnimation = useSharedValue(0);
    const borderAnimation = useSharedValue(0);
    const labelAnimation = useSharedValue(value ? 1 : 0);
    const scaleAnimation = useSharedValue(1);

    const hasError = useMemo(
      () => state === 'error' || Boolean(errorText),
      [state, errorText]
    );
    const hasValue = useMemo(() => inputValue.length > 0, [inputValue]);
    const isFloatingVariant = useMemo(
      () => variant === 'floating' || floatingLabel,
      [variant, floatingLabel]
    );

    // UI thread safe functions
    const setFocusedJS = useCallback((focused: boolean) => {
      setIsFocused(focused);
    }, []);

    const handleChangeText = useCallback(
      (text: string) => {
        setInputValue(text);
        onChangeText?.(text);

        if (animationEnabled && isFloatingVariant) {
          labelAnimation.value = withSpring(
            text.length > 0 ? 1 : 0,
            SPRING_CONFIG
          );
        }
      },
      [onChangeText, animationEnabled, isFloatingVariant, labelAnimation]
    );

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        runOnJS(setFocusedJS)(true);
        onFocus?.(event);

        if (animationEnabled) {
          focusAnimation.value = withTiming(1, {
            duration: ANIMATION_DURATION,
          });
          borderAnimation.value = withSpring(1, SPRING_CONFIG);
          scaleAnimation.value = withSpring(1.02, {
            ...SPRING_CONFIG,
            stiffness: 200,
          });

          if (isFloatingVariant) {
            labelAnimation.value = withSpring(1, SPRING_CONFIG);
          }
        }
      },
      [
        onFocus,
        animationEnabled,
        focusAnimation,
        borderAnimation,
        scaleAnimation,
        labelAnimation,
        isFloatingVariant,
        setFocusedJS,
      ]
    );

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        runOnJS(setFocusedJS)(false);
        onBlur?.(event);

        if (animationEnabled) {
          focusAnimation.value = withTiming(0, {
            duration: ANIMATION_DURATION,
          });
          borderAnimation.value = withSpring(0, SPRING_CONFIG);
          scaleAnimation.value = withSpring(1, SPRING_CONFIG);

          if (isFloatingVariant && !hasValue) {
            labelAnimation.value = withSpring(0, SPRING_CONFIG);
          }
        }
      },
      [
        onBlur,
        animationEnabled,
        focusAnimation,
        borderAnimation,
        scaleAnimation,
        labelAnimation,
        isFloatingVariant,
        hasValue,
        setFocusedJS,
      ]
    );

    // Update error animation when error state changes
    useEffect(() => {
      if (animationEnabled) {
        errorAnimation.value = withTiming(hasError ? 1 : 0, {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
        });
      }
    }, [hasError, animationEnabled, errorAnimation]);

    // Update input value when prop changes
    useEffect(() => {
      if (value !== undefined && value !== inputValue) {
        setInputValue(value);
        if (animationEnabled && isFloatingVariant) {
          labelAnimation.value = withSpring(
            value.length > 0 ? 1 : 0,
            SPRING_CONFIG
          );
        }
      }
    }, [
      value,
      inputValue,
      animationEnabled,
      isFloatingVariant,
      labelAnimation,
    ]);

    const getStateColor = useCallback((): string => {
      if (disabled) return theme.colors.textSecondary;
      if (hasError) return theme.colors.error;
      if (state === 'success') return theme.colors.success;
      if (state === 'warning') return theme.colors.warning;
      if (isFocused) return theme.colors.primary;
      return theme.colors.border;
    }, [disabled, hasError, state, isFocused, theme.colors]);

    const getBackgroundColor = useCallback((): string => {
      if (disabled) return theme.colors.background;
      if (variant === 'filled') return theme.colors.surface;
      return theme.colors.surface;
    }, [disabled, variant, theme.colors]);

    // Animated styles with proper typing
    const animatedContainerStyle = useAnimatedStyle(() => {
      if (!animationEnabled) return {};

      const currentStateColor = (() => {
        if (disabled) return theme.colors.textSecondary;
        if (hasError) return theme.colors.error;
        if (state === 'success') return theme.colors.success;
        if (state === 'warning') return theme.colors.warning;
        return theme.colors.primary;
      })();

      const borderColor = interpolateColor(
        focusAnimation.value,
        [0, 1],
        [theme.colors.border, currentStateColor]
      );

      const shadowOpacity = interpolate(focusAnimation.value, [0, 1], [0, 0.1]);
      const shadowRadius = interpolate(focusAnimation.value, [0, 1], [0, 8]);
      const elevation = interpolate(focusAnimation.value, [0, 1], [0, 3]);

      return {
        borderColor,
        transform: [{ scale: scaleAnimation.value }],
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity,
        shadowRadius,
        elevation: Platform.OS === 'android' ? elevation : 0,
      };
    }, [animationEnabled, theme.colors, disabled, hasError, state]);

    const animatedLabelStyle = useAnimatedStyle(() => {
      if (!animationEnabled || !isFloatingVariant) return {};

      const translateY = interpolate(labelAnimation.value, [0, 1], [0, -28]);
      const scale = interpolate(labelAnimation.value, [0, 1], [1, 0.8]);
      const color = interpolateColor(
        focusAnimation.value,
        [0, 1],
        [theme.colors.textSecondary, theme.colors.primary]
      );

      return {
        transform: [{ translateY }, { scale }],
        color,
      };
    }, [animationEnabled, isFloatingVariant, theme.colors]);

    const animatedErrorStyle = useAnimatedStyle(() => {
      if (!animationEnabled) return {};

      const opacity = errorAnimation.value;
      const translateY = interpolate(errorAnimation.value, [0, 1], [10, 0]);

      return {
        opacity,
        transform: [{ translateY }],
      };
    }, [animationEnabled]);

    const getSizeStyles = useCallback((): ViewStyle => {
      switch (size) {
        case 'sm':
          return styles.sizeSm;
        case 'lg':
          return styles.sizeLg;
        default:
          return styles.sizeMd;
      }
    }, [size, styles]);

    const getTextInputStyles = useCallback((): TextStyle[] => {
      const baseStyle: TextStyle[] = [
        styles.textInput,
        {
          color: disabled ? theme.colors.textSecondary : theme.colors.text,
        },
      ];

      if (multiline) {
        baseStyle.push({ textAlignVertical: 'top' });
      }

      if (inputStyle) {
        baseStyle.push(inputStyle);
      }

      switch (size) {
        case 'sm':
          baseStyle.push(styles.textInputSm);
          break;
        case 'lg':
          baseStyle.push(styles.textInputLg);
          break;
        default:
          baseStyle.push(styles.textInputMd);
          break;
      }

      return baseStyle;
    }, [size, styles, disabled, theme.colors, multiline, inputStyle]);

    const getLabelStyles = useCallback((): TextStyle[] => {
      const baseStyle: TextStyle[] = [styles.label];

      if (labelStyle) {
        baseStyle.push(labelStyle);
      }

      if (hasError) {
        baseStyle.push({ color: theme.colors.error });
      } else if (isFocused) {
        baseStyle.push({ color: theme.colors.primary });
      }

      switch (size) {
        case 'sm':
          baseStyle.push(styles.labelSm);
          break;
        case 'lg':
          baseStyle.push(styles.labelLg);
          break;
        default:
          baseStyle.push(styles.labelMd);
          break;
      }

      return baseStyle;
    }, [styles, labelStyle, hasError, isFocused, theme.colors, size]);

    const renderLabel = useCallback(() => {
      if (!label) return null;

      if (isFloatingVariant) {
        return (
          <Animated.Text style={[getLabelStyles(), animatedLabelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Animated.Text>
        );
      }

      return (
        <Text style={getLabelStyles()}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      );
    }, [
      label,
      isFloatingVariant,
      getLabelStyles,
      animatedLabelStyle,
      required,
      styles.required,
    ]);

    const renderHelperText = useCallback(() => {
      const text = errorText || helperText;
      if (!text && !showCharacterCount) return null;

      const HelperContainer = animationEnabled ? Animated.View : View;
      const helperAnimatedStyle = animationEnabled ? animatedErrorStyle : {};

      return (
        <HelperContainer style={[styles.helperContainer, helperAnimatedStyle]}>
          {text && (
            <Text
              style={[
                styles.helperText,
                errorText && styles.errorText,
                helperTextStyle,
              ].filter(Boolean)}
            >
              {text}
            </Text>
          )}
          {showCharacterCount && maxLength && (
            <Text style={styles.characterCount}>
              {inputValue.length}/{maxLength}
            </Text>
          )}
        </HelperContainer>
      );
    }, [
      errorText,
      helperText,
      showCharacterCount,
      maxLength,
      inputValue.length,
      animationEnabled,
      animatedErrorStyle,
      styles,
      helperTextStyle,
    ]);

    const inputContainerStyle: ViewStyle[] = useMemo(() => {
      const baseStyles: ViewStyle[] = [
        styles.inputContainer,
        styles[variant],
        getSizeStyles(),
        {
          borderColor: getStateColor(),
          backgroundColor: getBackgroundColor(),
          borderRadius: theme.borderRadius[borderRadius],
        },
      ];

      if (isFocused) baseStyles.push(styles.focused);
      if (disabled) baseStyles.push(styles.disabled);
      if (hasError) baseStyles.push(styles.errorState);
      if (state === 'success') baseStyles.push(styles.successState);
      if (state === 'warning') baseStyles.push(styles.warningState);
      if (style) baseStyles.push(style);

      return baseStyles;
    }, [
      styles,
      variant,
      getSizeStyles,
      getStateColor,
      getBackgroundColor,
      theme.borderRadius,
      borderRadius,
      isFocused,
      disabled,
      hasError,
      state,
      style,
    ]);

    const ContainerComponent = animationEnabled ? Animated.View : View;
    const containerAnimatedStyle = animationEnabled
      ? animatedContainerStyle
      : {};

    return (
      <View style={styles.container}>
        {!isFloatingVariant && renderLabel()}
        <ContainerComponent
          style={[inputContainerStyle, containerAnimatedStyle]}
        >
          {isFloatingVariant && (
            <View style={styles.floatingLabelContainer}>{renderLabel()}</View>
          )}
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={getTextInputStyles()}
            placeholder={isFloatingVariant ? undefined : placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={inputValue}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </ContainerComponent>
        {renderHelperText()}
      </View>
    );
  }
);

const createStyles = (theme: Theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  } as ViewStyle,
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
    fontWeight: '600' as const,
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  } as TextStyle,
  labelSm: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
  } as TextStyle,
  labelMd: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  } as TextStyle,
  labelLg: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
  } as TextStyle,
  required: {
    color: theme.colors.error,
  } as TextStyle,
  inputContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    position: 'relative' as const,
  } as ViewStyle,
  floatingLabelContainer: {
    position: 'absolute' as const,
    left: theme.spacing.md,
    top: 0,
    zIndex: 1,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
  } as ViewStyle,
  // Variants
  default: {
    borderWidth: 0,
    backgroundColor: theme.colors.background,
  } as ViewStyle,
  outline: {
    borderWidth: 1.5,
    backgroundColor: theme.colors.surface,
  } as ViewStyle,
  filled: {
    borderWidth: 0,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 2,
  } as ViewStyle,
  underline: {
    borderWidth: 0,
    borderBottomWidth: 1.5,
    backgroundColor: 'transparent',
    borderRadius: 0,
  } as ViewStyle,
  floating: {
    borderWidth: 1.5,
    backgroundColor: theme.colors.surface,
    paddingTop: theme.spacing.lg,
  } as ViewStyle,
  // Sizes
  sizeSm: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minHeight: 40,
  } as ViewStyle,
  sizeMd: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 48,
  } as ViewStyle,
  sizeLg: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
  } as ViewStyle,
  // States
  focused: {
    borderWidth: 2,
  } as ViewStyle,
  disabled: {
    opacity: 0.6,
  } as ViewStyle,
  errorState: {
    borderColor: theme.colors.error,
  } as ViewStyle,
  successState: {
    borderColor: theme.colors.success,
  } as ViewStyle,
  warningState: {
    borderColor: theme.colors.warning,
  } as ViewStyle,
  // Text Input
  textInput: {
    flex: 1,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center' as const,
    fontWeight: '400' as const,
  } as TextStyle,
  textInputSm: {
    fontSize: theme.typography.small?.fontSize ?? 14,
    lineHeight: (theme.typography.small?.fontSize ?? 14) * 1.3,
  } as TextStyle,
  textInputMd: {
    fontSize: theme.typography.body?.fontSize ?? 16,
    lineHeight: (theme.typography.body?.fontSize ?? 16) * 1.3,
  } as TextStyle,
  textInputLg: {
    fontSize: theme.typography.subtitle?.fontSize ?? 18,
    lineHeight: (theme.typography.subtitle?.fontSize ?? 18) * 1.3,
  } as TextStyle,
  // Icons
  leftIcon: {
    marginRight: theme.spacing.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  rightIcon: {
    marginLeft: theme.spacing.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.xs,
  } as ViewStyle,
  // Helper Text
  helperContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginTop: theme.spacing.xs,
    minHeight: 20,
  } as ViewStyle,
  helperText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    flex: 1,
    lineHeight: theme.typography.small.lineHeight,
  } as TextStyle,
  errorText: {
    color: theme.colors.error,
    fontWeight: '500' as const,
  } as TextStyle,
  characterCount: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    fontWeight: '500' as const,
  } as TextStyle,
});

// Enhanced shortcut components
interface InputPasswordProps
  extends Omit<InputProps, 'rightIcon' | 'onRightIconPress'> {
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
}

const InputPassword = forwardRef<TextInput, InputPasswordProps>(
  ({ showPasswordIcon, hidePasswordIcon, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { theme } = useTheme();
    const iconAnimation = useSharedValue(0);

    const togglePasswordVisibility = useCallback(() => {
      const newVisibility = !isPasswordVisible;
      setIsPasswordVisible(newVisibility);
      iconAnimation.value = withSpring(newVisibility ? 1 : 0, SPRING_CONFIG);
    }, [isPasswordVisible, iconAnimation]);

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotateY: `${interpolate(iconAnimation.value, [0, 1], [0, 180])}deg`,
        },
      ],
    }));

    const iconSize = props.size === 'sm' ? 16 : props.size === 'lg' ? 24 : 20;

    const defaultShowIcon = showPasswordIcon ?? (
      <Eye size={iconSize} color={theme.colors.textSecondary} />
    );
    const defaultHideIcon = hidePasswordIcon ?? (
      <EyeOff size={iconSize} color={theme.colors.textSecondary} />
    );

    const IconComponent =
      props.animationEnabled !== false ? Animated.View : View;

    return (
      <Input
        ref={ref}
        {...props}
        secureTextEntry={!isPasswordVisible}
        rightIcon={
          <IconComponent
            style={props.animationEnabled !== false ? animatedIconStyle : {}}
          >
            {isPasswordVisible ? defaultHideIcon : defaultShowIcon}
          </IconComponent>
        }
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
      placeholder={props.placeholder ?? 'Search...'}
      variant={props.variant ?? 'filled'}
    />
  );
});

const InputTextArea = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      multiline
      numberOfLines={props.numberOfLines ?? 4}
      variant={props.variant ?? 'outline'}
      animationEnabled={props.animationEnabled ?? false}
    />
  );
});

// Display names
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
