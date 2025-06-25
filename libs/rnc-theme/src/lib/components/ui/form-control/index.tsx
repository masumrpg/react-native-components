import React, {
  createContext,
  useContext,
  forwardRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';
import { AlertCircle, Check, AlertTriangle } from 'lucide-react-native';

// Types
type FormControlState =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'disabled';
type FormControlSize = 'sm' | 'md' | 'lg';

interface FormControlContextType {
  id: string;
  state: FormControlState;
  size: FormControlSize;
  disabled: boolean;
  required: boolean;
  hasError: boolean;
  hasSuccess: boolean;
  hasWarning: boolean;
  labelId: string;
  helperId: string;
  errorId: string;
  successId: string;
  warningId: string;
  setFieldState: (state: FormControlState) => void;
  clearFieldState: () => void;
}

interface FormControlProps {
  children: React.ReactNode;
  id?: string;
  state?: FormControlState;
  size?: FormControlSize;
  disabled?: boolean;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  spacing?: keyof Theme['spacing'];
  onStateChange?: (state: FormControlState) => void;
}

interface FormControlLabelProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface FormControlLabelTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: keyof Theme['typography'];
}

interface FormControlHelperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface FormControlHelperTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: keyof Theme['typography'];
}

interface FormControlErrorProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showWhen?: boolean;
}

interface FormControlErrorIconProps {
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

interface FormControlErrorTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: keyof Theme['typography'];
}

interface FormControlSuccessProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showWhen?: boolean;
}

interface FormControlSuccessIconProps {
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

interface FormControlSuccessTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: keyof Theme['typography'];
}

interface FormControlWarningProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showWhen?: boolean;
}

interface FormControlWarningIconProps {
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

interface FormControlWarningTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: keyof Theme['typography'];
}

// Context
const FormControlContext = createContext<FormControlContextType | null>(null);

const useFormControl = () => {
  const context = useContext(FormControlContext);
  if (!context) {
    throw new Error('useFormControl must be used within a FormControl');
  }
  return context;
};

const useFormControlOptional = () => {
  return useContext(FormControlContext);
};

// Styles
const createFormControlStyles = (theme: Theme) => ({
  container: {
    width: '100%',
  } as ViewStyle,

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  } as ViewStyle,

  labelText: {
    ...theme.typography.body,
    color: resolveColor(theme, 'text', theme.colors.text),
    fontWeight: '500',
  } as TextStyle,

  labelTextSm: {
    ...theme.typography.small,
    fontWeight: '500',
  } as TextStyle,

  labelTextLg: {
    ...theme.typography.title,
    fontWeight: '600',
  } as TextStyle,

  labelTextDisabled: {
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    opacity: 0.6,
  } as TextStyle,

  requiredIndicator: {
    color: resolveColor(theme, 'error', theme.colors.error),
    marginLeft: theme.spacing.xs / 2,
    fontWeight: 'bold',
  } as TextStyle,

  helperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: theme.spacing.xs,
  } as ViewStyle,

  helperText: {
    ...theme.typography.small,
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    flex: 1,
    lineHeight: theme.typography.small.fontSize
      ? theme.typography.small.fontSize * 1.4
      : 18,
  } as TextStyle,

  helperTextDisabled: {
    opacity: 0.6,
  } as TextStyle,

  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: theme.spacing.xs,
  } as ViewStyle,

  messageIcon: {
    marginRight: theme.spacing.xs,
    marginTop: 1, // Slight adjustment for better alignment
  } as ViewStyle,

  errorText: {
    ...theme.typography.small,
    color: resolveColor(theme, 'error', theme.colors.error),
    flex: 1,
    lineHeight: theme.typography.small.fontSize
      ? theme.typography.small.fontSize * 1.4
      : 18,
    fontWeight: '500',
  } as TextStyle,

  successText: {
    ...theme.typography.small,
    color: resolveColor(theme, 'success', theme.colors.success || '#22c55e'),
    flex: 1,
    lineHeight: theme.typography.small.fontSize
      ? theme.typography.small.fontSize * 1.4
      : 18,
    fontWeight: '500',
  } as TextStyle,

  warningText: {
    ...theme.typography.small,
    color: resolveColor(theme, 'warning', theme.colors.warning || '#f59e0b'),
    flex: 1,
    lineHeight: theme.typography.small.fontSize
      ? theme.typography.small.fontSize * 1.4
      : 18,
    fontWeight: '500',
  } as TextStyle,
});

// Helper function to generate unique IDs
const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Main FormControl Component
const FormControl = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlProps
>(
  (
    {
      children,
      id,
      state: initialState = 'default',
      size = 'md',
      disabled = false,
      required = false,
      style,
      spacing = 'sm',
      onStateChange,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createFormControlStyles);

    // Internal state management for dynamic state changes
    const [internalState, setInternalState] =
      useState<FormControlState>(initialState);
    const currentState =
      initialState !== 'default' ? initialState : internalState;

    const formControlId = useMemo(() => id ?? generateId('form-control'), [id]);
    const labelId = useMemo(() => `${formControlId}-label`, [formControlId]);
    const helperId = useMemo(() => `${formControlId}-helper`, [formControlId]);
    const errorId = useMemo(() => `${formControlId}-error`, [formControlId]);
    const successId = useMemo(
      () => `${formControlId}-success`,
      [formControlId]
    );
    const warningId = useMemo(
      () => `${formControlId}-warning`,
      [formControlId]
    );

    const setFieldState = useCallback(
      (newState: FormControlState) => {
        setInternalState(newState);
        onStateChange?.(newState);
      },
      [onStateChange]
    );

    const clearFieldState = useCallback(() => {
      setInternalState('default');
      onStateChange?.('default');
    }, [onStateChange]);

    const contextValue: FormControlContextType = useMemo(
      () => ({
        id: formControlId,
        state: currentState,
        size,
        disabled,
        required,
        hasError: currentState === 'error',
        hasSuccess: currentState === 'success',
        hasWarning: currentState === 'warning',
        labelId,
        helperId,
        errorId,
        successId,
        warningId,
        setFieldState,
        clearFieldState,
      }),
      [
        formControlId,
        currentState,
        size,
        disabled,
        required,
        labelId,
        helperId,
        errorId,
        successId,
        warningId,
        setFieldState,
        clearFieldState,
      ]
    );

    return (
      <FormControlContext.Provider value={contextValue}>
        <View
          ref={ref}
          style={[
            styles.container,
            {
              gap: theme.spacing[spacing],
            },
            style,
          ]}
          {...props}
        >
          {children}
        </View>
      </FormControlContext.Provider>
    );
  }
);

// Label Components
const FormControlLabel = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlLabelProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { labelId } = useFormControl();

  return (
    <View
      ref={ref}
      style={[styles.labelContainer, style]}
      nativeID={labelId}
      {...props}
    >
      {children}
    </View>
  );
});

const FormControlLabelText = forwardRef<
  React.ComponentRef<typeof Text>,
  FormControlLabelTextProps
>(({ children, style, variant, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { size, disabled, required } = useFormControl();
  const { theme } = useTheme();

  const textStyle = useMemo(() => {
    let baseStyle = styles.labelText;

    if (variant) {
      baseStyle = { ...baseStyle, ...theme.typography[variant] };
    }

    if (size === 'sm') {
      baseStyle = { ...baseStyle, ...styles.labelTextSm };
    } else if (size === 'lg') {
      baseStyle = { ...baseStyle, ...styles.labelTextLg };
    }

    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.labelTextDisabled };
    }

    return baseStyle;
  }, [styles, variant, theme, size, disabled]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text ref={ref} style={[textStyle, style]} {...props}>
        {children}
      </Text>
      {required && (
        <Text
          style={[
            styles.requiredIndicator,
            disabled && styles.labelTextDisabled,
          ]}
        >
          *
        </Text>
      )}
    </View>
  );
});

// Helper Components
const FormControlHelper = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlHelperProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { helperId, hasError, hasSuccess, hasWarning } = useFormControl();

  // Don't render helper if there's any status message
  if (hasError || hasSuccess || hasWarning) {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[styles.helperContainer, style]}
      nativeID={helperId}
      {...props}
    >
      {children}
    </View>
  );
});

const FormControlHelperText = forwardRef<
  React.ComponentRef<typeof Text>,
  FormControlHelperTextProps
>(({ children, style, variant, ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createFormControlStyles);
  const { disabled, hasError, hasSuccess, hasWarning } = useFormControl();

  const textStyle = useMemo(() => {
    let baseStyle = styles.helperText;

    if (variant) {
      baseStyle = { ...baseStyle, ...theme.typography[variant] };
    }

    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.helperTextDisabled };
    }

    return baseStyle;
  }, [styles, variant, theme, disabled]);

  // Don't render helper text if there's any status message
  if (hasError || hasSuccess || hasWarning) {
    return null;
  }

  return (
    <Text ref={ref} style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
});

// Error Components
const FormControlError = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlErrorProps
>(({ children, style, showWhen, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { errorId, hasError } = useFormControl();

  // Control visibility based on showWhen prop or internal error state
  const shouldShow = showWhen ?? hasError;

  if (!shouldShow) {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[styles.messageContainer, style]}
      nativeID={errorId}
      {...props}
    >
      {children}
    </View>
  );
});

const FormControlErrorIcon = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlErrorIconProps
>(({ icon, style, size = 16, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { hasError } = useFormControl();
  const { theme } = useTheme();

  if (!hasError) {
    return null;
  }

  const defaultIcon = (
    <AlertCircle
      size={size}
      color={resolveColor(theme, 'error', theme.colors.error)}
    />
  );

  return (
    <View ref={ref} style={[styles.messageIcon, style]} {...props}>
      {icon ?? defaultIcon}
    </View>
  );
});

const FormControlErrorText = forwardRef<
  React.ComponentRef<typeof Text>,
  FormControlErrorTextProps
>(({ children, style, variant, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { hasError } = useFormControl();
  const { theme } = useTheme();

  const textStyle = useMemo(() => {
    let baseStyle = styles.errorText;

    if (variant) {
      baseStyle = { ...baseStyle, ...theme.typography[variant] };
    }

    return baseStyle;
  }, [styles, variant, theme]);

  if (!hasError) {
    return null;
  }

  return (
    <Text ref={ref} style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
});

// Success Components
const FormControlSuccess = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlSuccessProps
>(({ children, style, showWhen, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { successId, hasSuccess } = useFormControl();

  const shouldShow = showWhen ?? hasSuccess;

  if (!shouldShow) {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[styles.messageContainer, style]}
      nativeID={successId}
      {...props}
    >
      {children}
    </View>
  );
});

const FormControlSuccessIcon = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlSuccessIconProps
>(({ icon, style, size = 16, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { hasSuccess } = useFormControl();
  const { theme } = useTheme();

  if (!hasSuccess) {
    return null;
  }

  const defaultIcon = (
    <Check
      size={size}
      color={resolveColor(theme, 'success', theme.colors.success || '#22c55e')}
    />
  );

  return (
    <View ref={ref} style={[styles.messageIcon, style]} {...props}>
      {icon ?? defaultIcon}
    </View>
  );
});

const FormControlSuccessText = forwardRef<
  React.ComponentRef<typeof Text>,
  FormControlSuccessTextProps
>(({ children, style, variant, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { hasSuccess } = useFormControl();
  const { theme } = useTheme();

  const textStyle = useMemo(() => {
    let baseStyle = styles.successText;

    if (variant) {
      baseStyle = { ...baseStyle, ...theme.typography[variant] };
    }

    return baseStyle;
  }, [styles, variant, theme]);

  if (!hasSuccess) {
    return null;
  }

  return (
    <Text ref={ref} style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
});

// Warning Components
const FormControlWarning = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlWarningProps
>(({ children, style, showWhen, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { warningId, hasWarning } = useFormControl();

  const shouldShow = showWhen ?? hasWarning;

  if (!shouldShow) {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[styles.messageContainer, style]}
      nativeID={warningId}
      {...props}
    >
      {children}
    </View>
  );
});

const FormControlWarningIcon = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlWarningIconProps
>(({ icon, style, size = 16, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { hasWarning } = useFormControl();
  const { theme } = useTheme();

  if (!hasWarning) {
    return null;
  }

  const defaultIcon = (
    <AlertTriangle
      size={size}
      color={resolveColor(theme, 'warning', theme.colors.warning || '#f59e0b')}
    />
  );

  return (
    <View ref={ref} style={[styles.messageIcon, style]} {...props}>
      {icon ?? defaultIcon}
    </View>
  );
});

const FormControlWarningText = forwardRef<
  React.ComponentRef<typeof Text>,
  FormControlWarningTextProps
>(({ children, style, variant, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { hasWarning } = useFormControl();
  const { theme } = useTheme();

  const textStyle = useMemo(() => {
    let baseStyle = styles.warningText;

    if (variant) {
      baseStyle = { ...baseStyle, ...theme.typography[variant] };
    }

    return baseStyle;
  }, [styles, variant, theme]);

  if (!hasWarning) {
    return null;
  }

  return (
    <Text ref={ref} style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
});

// Set display names
FormControl.displayName = 'FormControl';
FormControlLabel.displayName = 'FormControlLabel';
FormControlLabelText.displayName = 'FormControlLabelText';
FormControlHelper.displayName = 'FormControlHelper';
FormControlHelperText.displayName = 'FormControlHelperText';
FormControlError.displayName = 'FormControlError';
FormControlErrorIcon.displayName = 'FormControlErrorIcon';
FormControlErrorText.displayName = 'FormControlErrorText';
FormControlSuccess.displayName = 'FormControlSuccess';
FormControlSuccessIcon.displayName = 'FormControlSuccessIcon';
FormControlSuccessText.displayName = 'FormControlSuccessText';
FormControlWarning.displayName = 'FormControlWarning';
FormControlWarningIcon.displayName = 'FormControlWarningIcon';
FormControlWarningText.displayName = 'FormControlWarningText';

export {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlSuccess,
  FormControlSuccessIcon,
  FormControlSuccessText,
  FormControlWarning,
  FormControlWarningIcon,
  FormControlWarningText,
  useFormControl,
  useFormControlOptional,
};

export type {
  FormControlProps,
  FormControlLabelProps,
  FormControlLabelTextProps,
  FormControlHelperProps,
  FormControlHelperTextProps,
  FormControlErrorProps,
  FormControlErrorIconProps,
  FormControlErrorTextProps,
  FormControlSuccessProps,
  FormControlSuccessIconProps,
  FormControlSuccessTextProps,
  FormControlWarningProps,
  FormControlWarningIconProps,
  FormControlWarningTextProps,
  FormControlContextType,
};
