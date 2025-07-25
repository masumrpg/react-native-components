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
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
} from 'react-native';
import { Typography } from '../typography';
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
import { useTheme } from '../../../context/RNCProvider';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { ComponentState, BaseFormComponentProps } from '../../../types/ui';
import { Eye, EyeOff, Search } from 'lucide-react-native';
import { ANIMATION_CONSTANTS } from '../../../constants/ui';
import { getBackgroundColor, getSizeStyles } from '../../../utils';

interface BaseInputProps
  extends Omit<BaseFormComponentProps, 'onFocus' | 'onBlur'> {
  label?: string;
  state?: ComponentState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  borderRadius?: keyof Theme['components']['borderRadius'];
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  floatingLabel?: boolean;

  // Add new type flags
  isPasswordInput?: boolean;
  isSearchInput?: boolean;
  isTextAreaInput?: boolean;

  // Password specific props
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;

  // Override base props with correct types for React Native TextInput
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

type InputProps = BaseInputProps &
  Omit<TextInputProps, 'style' | 'onFocus' | 'onBlur'>;

const Input = forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  (
    {
      label,
      placeholder,
      variant = 'default',
      size = 'md',
      state = 'default',
      helperText,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      required = false,
      disabled = false,
      readOnly = false,
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
      defaultValue,
      onChange,
      animated = true,
      floatingLabel = false,
      autoFocus = false,
      onFocus,
      onBlur,
      isPasswordInput = false,
      isSearchInput = false,
      isTextAreaInput = false,
      showPasswordIcon,
      hidePasswordIcon,
      testID,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value ?? defaultValue ?? '');

    // Animation values
    const focusAnimation = useSharedValue(0);
    const errorAnimation = useSharedValue(0);
    const borderAnimation = useSharedValue(0);
    const labelAnimation = useSharedValue(value || defaultValue ? 1 : 0);
    const scaleAnimation = useSharedValue(1);

    const hasError = useMemo(
      () => state === 'error' || Boolean(error),
      [state, error]
    );
    const hasValue = useMemo(() => inputValue.length > 0, [inputValue]);
    const isFloatingVariant = useMemo(() => floatingLabel, [floatingLabel]);

    // UI thread safe functions
    const setFocusedJS = useCallback((focused: boolean) => {
      setIsFocused(focused);
    }, []);

    const handleChangeText = useCallback(
      (text: string) => {
        setInputValue(text);
        onChange?.(text);

        if (animated && isFloatingVariant) {
          labelAnimation.value = withSpring(
            text.length > 0 ? 1 : 0,
            ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
          );
        }
      },
      [onChange, animated, isFloatingVariant, labelAnimation]
    );

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        runOnJS(setFocusedJS)(true);
        onFocus?.(event);

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

          if (isFloatingVariant) {
            labelAnimation.value = withSpring(
              1,
              ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
            );
          }
        }
      },
      [
        onFocus,
        animated,
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

        if (animated) {
          focusAnimation.value = withTiming(0, {
            duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
          });
          borderAnimation.value = withSpring(
            0,
            ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
          );
          scaleAnimation.value = withSpring(
            1,
            ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
          );

          if (isFloatingVariant && !hasValue) {
            labelAnimation.value = withSpring(
              0,
              ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
            );
          }
        }
      },
      [
        onBlur,
        animated,
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
      if (animated) {
        errorAnimation.value = withTiming(hasError ? 1 : 0, {
          duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
          easing: Easing.out(Easing.cubic),
        });
      }
    }, [hasError, animated, errorAnimation]);

    // Update input value when prop changes
    useEffect(() => {
      if (value !== undefined && value !== inputValue) {
        setInputValue(value);
        if (animated && isFloatingVariant) {
          labelAnimation.value = withSpring(
            value.length > 0 ? 1 : 0,
            ANIMATION_CONSTANTS.SPRING_CONFIG.DEFAULT
          );
        }
      }
    }, [value, inputValue, animated, isFloatingVariant, labelAnimation]);

    // Animated styles with proper typing
    const animatedContainerStyle = useAnimatedStyle(() => {
      if (!animated) return {};

      const currentStateColor = (() => {
        if (disabled) return theme.colors.textSecondary;
        if (hasError) return theme.colors.error;
        if (state === 'success') return theme.colors.success;
        if (state === 'warning') return theme.colors.warning;
        switch (variant) {
          case 'default':
            return theme.colors.primary;
          case 'primary':
            return theme.colors.primary;
          case 'secondary':
            return theme.colors.secondary;
          case 'success':
            return theme.colors.success;
          case 'error':
            return theme.colors.error;
          case 'warning':
            return theme.colors.warning;
          case 'info':
            return theme.colors.info;
          case 'destructive':
            return theme.colors.destructive;
        }
        return theme.colors.primary;
      })();

      const borderColor = hasError
        ? currentStateColor
        : interpolateColor(
            focusAnimation.value,
            [0, 1],
            [theme.colors.border, currentStateColor]
          );

      const shadowOpacity = interpolate(focusAnimation.value, [0, 1], [0, 0.1]);
      const shadowRadius = interpolate(focusAnimation.value, [0, 1], [0, 8]);
      const elevation = interpolate(focusAnimation.value, [0, 1], [0, 3]);
      const semiTransparentVariant: (typeof variant)[] = [
        'info',
        'destructive',
        'error',
        'success',
        'warning',
        'secondary',
        'primary',
      ];

      return {
        borderColor,
        transform: [{ scale: scaleAnimation.value }],
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity,
              shadowRadius,
            }
          : {
              elevation: semiTransparentVariant.includes(variant)
                ? 0
                : elevation,
            }),
      };
    }, [animated, theme.colors, disabled, hasError, state]);

    const animatedLabelStyle = useAnimatedStyle(() => {
      if (!animated || !isFloatingVariant) return {};

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
    }, [animated, isFloatingVariant, theme.colors]);

    const animatedErrorStyle = useAnimatedStyle(() => {
      if (!animated) return {};

      const opacity = errorAnimation.value;
      const translateY = interpolate(errorAnimation.value, [0, 1], [10, 0]);

      return {
        opacity,
        transform: [{ translateY }],
      };
    }, [animated]);

    const getTextInputStyles = useCallback((): TextStyle[] => {
      const baseStyle: TextStyle[] = [
        styles.textInput,
        {
          color: disabled ? theme.colors.textSecondary : theme.colors.text,
        },
      ];

      // FIX: Handle textAlignVertical properly for textarea vs normal input
      if (isTextAreaInput || multiline) {
        baseStyle.push({
          textAlignVertical: 'top',
          paddingTop: theme.spacing.sm, // Add top padding for better text positioning
        });
      } else {
        baseStyle.push({ textAlignVertical: 'center' });
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
    }, [
      size,
      styles,
      disabled,
      theme.colors,
      multiline,
      inputStyle,
      isTextAreaInput,
      theme.spacing.sm,
    ]);

    const getLabelStyles = useCallback((): TextStyle[] => {
      const baseStyle: TextStyle[] = [styles.label];

      if (labelStyle) {
        baseStyle.push(labelStyle);
      }

      if (hasError) {
        baseStyle.push({ color: theme.colors.error });
      } else if (isFocused) {
        switch (variant) {
          case 'primary':
            baseStyle.push({ color: theme.colors.primary });
            break;
          case 'secondary':
            baseStyle.push({ color: theme.colors.secondary });
            break;
          case 'success':
            baseStyle.push({ color: theme.colors.success });
            break;
          case 'error':
            baseStyle.push({ color: theme.colors.error });
            break;
          case 'warning':
            baseStyle.push({ color: theme.colors.warning });
            break;
          case 'info':
            baseStyle.push({ color: theme.colors.info });
            break;
          case 'destructive':
            baseStyle.push({ color: theme.colors.destructive });
            break;
          default:
            baseStyle.push({ color: theme.colors.primary });
        }
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
    }, [
      styles.label,
      styles.labelSm,
      styles.labelLg,
      styles.labelMd,
      labelStyle,
      hasError,
      isFocused,
      size,
      theme.colors.error,
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.success,
      theme.colors.warning,
      theme.colors.info,
      theme.colors.destructive,
      variant,
    ]);

    const renderLabel = useCallback(() => {
      if (!label) return null;

      if (isFloatingVariant) {
        return (
          <Animated.View style={animatedLabelStyle}>
            <Typography variant="body" style={getLabelStyles()}>
              {label}
              {required && (
                <Typography variant="body" style={styles.required}>
                  {' '}
                  *
                </Typography>
              )}
            </Typography>
          </Animated.View>
        );
      }

      return (
        <Typography variant="label" style={getLabelStyles()}>
          {label}
          {required && (
            <Typography variant="body" style={styles.required}>
              {' '}
              *
            </Typography>
          )}
        </Typography>
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
      const text = error ?? helperText;
      if (!text && !showCharacterCount) return null;

      const HelperContainer = animated ? Animated.View : View;
      const helperAnimatedStyle = animated ? animatedErrorStyle : {};

      return (
        <HelperContainer style={[styles.helperContainer, helperAnimatedStyle]}>
          {text && (
            <Typography
              variant="small"
              style={[styles.helperText, error && styles.errorText, helperTextStyle].filter(
                Boolean
              )}
            >
              {text}
            </Typography>
          )}
          {showCharacterCount && maxLength && (
            <Typography variant="small" style={styles.characterCount}>
              {inputValue.length}/{maxLength}
            </Typography>
          )}
        </HelperContainer>
      );
    }, [
      error,
      helperText,
      showCharacterCount,
      maxLength,
      inputValue.length,
      animated,
      animatedErrorStyle,
      styles,
      helperTextStyle,
    ]);

    const inputContainerStyle = useMemo(() => {
      const baseStyles = [
        styles.inputContainer,
        styles[variant],
        getSizeStyles(size, styles),
        {
          backgroundColor: getBackgroundColor(variant, theme.colors, disabled),
          borderRadius: theme.components.borderRadius[borderRadius],
        },
        style,
      ];

      // FIX: Add specific styling for textarea
      if (isTextAreaInput) {
        baseStyles.push(styles.textAreaContainer);
      }

      // Update state styles handling with type safety
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (state) {
        const stateKey = `state${state.charAt(0).toUpperCase()}${state.slice(
          1
        )}` as keyof StateStylesType;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (styles[stateKey]) {
          baseStyles.push(styles[stateKey]);
        }
      }

      return baseStyles;
    }, [
      styles,
      variant,
      size,
      theme.colors,
      theme.components.borderRadius,
      disabled,
      borderRadius,
      isTextAreaInput,
      state,
      style,
    ]);

    // Add password visibility state
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Handle specialized input types
    const getSpecializedInputProps = useCallback(() => {
      const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
      const iconColor = theme.colors.textSecondary;

      if (isPasswordInput) {
        return {
          secureTextEntry: !isPasswordVisible,
          rightIcon:
            showPasswordIcon || hidePasswordIcon ? (
              isPasswordVisible ? (
                hidePasswordIcon
              ) : (
                showPasswordIcon
              )
            ) : (
              <View style={styles.rightIcon}>
                {isPasswordVisible ? (
                  <EyeOff size={iconSize} color={iconColor} />
                ) : (
                  <Eye size={iconSize} color={iconColor} />
                )}
              </View>
            ),
          onRightIconPress: () => setIsPasswordVisible(!isPasswordVisible),
        };
      }

      if (isSearchInput) {
        return {
          leftIcon: <Search size={iconSize} color={iconColor} />,
          variant: variant,
          placeholder: placeholder ?? 'Search...',
        };
      }

      if (isTextAreaInput) {
        return {
          multiline: true,
          numberOfLines: numberOfLines || 4,
          // Remove the textAlignVertical from here as it's handled in getTextInputStyles
        };
      }

      return {};
    }, [
      styles.rightIcon,
      isPasswordInput,
      isSearchInput,
      isTextAreaInput,
      isPasswordVisible,
      size,
      theme.colors.textSecondary,
      showPasswordIcon,
      hidePasswordIcon,
      variant,
      placeholder,
      numberOfLines,
    ]);

    // Merge specialized props with base props
    const specializedProps = useMemo(
      () => ({
        ...getSpecializedInputProps(),
      }),
      [getSpecializedInputProps]
    );

    const ContainerComponent = animated ? Animated.View : View;
    const containerAnimatedStyle = animated ? animatedContainerStyle : null;

    return (
      <View style={styles.container} testID={testID}>
        {!isFloatingVariant && renderLabel()}
        <ContainerComponent
          style={[inputContainerStyle, containerAnimatedStyle]}
        >
          {isFloatingVariant && (
            <View style={styles.floatingLabelContainer}>{renderLabel()}</View>
          )}
          {(leftIcon ?? specializedProps.leftIcon) && (
            <View style={styles.leftIcon}>
              {specializedProps.leftIcon ?? leftIcon}
            </View>
          )}
          <TextInput
            ref={ref}
            style={getTextInputStyles()}
            placeholder={isFloatingVariant ? undefined : placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={inputValue}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled && !readOnly}
            autoFocus={autoFocus}
            {...specializedProps}
            {...props}
          />
          {(rightIcon ?? specializedProps.rightIcon) && (
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={specializedProps.onRightIconPress ?? onRightIconPress}
              disabled={!specializedProps.onRightIconPress && !onRightIconPress}
              activeOpacity={0.7}
            >
              {specializedProps.rightIcon ?? rightIcon}
            </TouchableOpacity>
          )}
        </ContainerComponent>
        {renderHelperText()}
      </View>
    );
  }
);

type StateStylesType = {
  [K in ComponentState as `state${Capitalize<K>}`]: ViewStyle;
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 0,
    },
    label: {
      marginBottom: theme.spacing.xs,
      color: theme.colors.text,
      fontWeight: '600',
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
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
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      position: 'relative',
    },
    // FIX: Add specific style for textarea container
    textAreaContainer: {
      alignItems: 'flex-start', // Change from center to flex-start for textarea
      paddingTop: theme.spacing.sm, // Add consistent top padding
    },
    floatingLabelContainer: {
      position: 'absolute',
      left: theme.spacing.md,
      top: 0,
      zIndex: 1,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.xs,
    },
    // Updated Variants
    default: {
      borderWidth: 1,
    },
    primary: {
      borderWidth: 1.5,
    },
    secondary: {
      borderWidth: 1.5,
    },
    outline: {
      borderWidth: 1.5,
    },
    filled: {
      borderWidth: 0,
    },
    ghost: {
      borderWidth: 0,
    },
    success: {
      borderWidth: 1.5,
    },
    error: {
      borderWidth: 1.5,
    },
    warning: {
      borderWidth: 1.5,
    },
    info: {
      borderWidth: 1.5,
    },
    destructive: {
      borderWidth: 1.5,
    },
    // Updated Sizes
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
    // Updated States
    stateDefault: {},
    stateFocus: {
      borderWidth: 2,
    },
    stateActive: {
      borderWidth: 2,
      opacity: 0.9,
    },
    stateDisabled: {
      opacity: 0.6,
    },
    stateLoading: {
      opacity: 0.8,
    },
    stateError: {
      borderColor: theme.colors.error,
    },
    stateSuccess: {
      borderColor: theme.colors.success,
    },
    stateWarning: {
      borderColor: theme.colors.warning,
    },
    // Text Input
    textInput: {
      flex: 1,
      padding: 0,
      margin: 0,
      fontWeight: '400',
    },
    textInputSm: {
      fontSize: theme.typography.small.fontSize ?? 14,
      lineHeight: (theme.typography.small.fontSize ?? 14) * 1.3,
    },
    textInputMd: {
      fontSize: theme.typography.body.fontSize ?? 16,
      lineHeight: (theme.typography.body.fontSize ?? 16) * 1.3,
    },
    textInputLg: {
      fontSize: theme.typography.subtitle.fontSize ?? 18,
      lineHeight: (theme.typography.subtitle.fontSize ?? 18) * 1.3,
    },
    // Icons
    leftIcon: {
      marginRight: theme.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightIcon: {
      marginLeft: theme.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Helper Text
    helperContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: theme.spacing.xs,
      minHeight: 20,
    },
    helperText: {
      fontSize: theme.typography.small.fontSize,
      color: theme.colors.textSecondary,
      flex: 1,
      lineHeight: theme.typography.small.lineHeight,
    },
    errorText: {
      color: theme.colors.error,
      fontWeight: '500',
    },
    characterCount: {
      fontSize: theme.typography.small.fontSize,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
      fontWeight: '500',
    },
  });

// Display names
Input.displayName = 'Input';

export { Input, type InputProps };
