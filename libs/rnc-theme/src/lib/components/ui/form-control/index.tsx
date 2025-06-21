import React, { createContext, useContext, forwardRef, useMemo } from 'react';
import { View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils';
import { Theme } from '../../../types/theme';
import { AlertCircle } from 'lucide-react-native';

// Types
type FormControlState = 'default' | 'error' | 'success' | 'warning' | 'disabled';
type FormControlSize = 'sm' | 'md' | 'lg';

interface FormControlContextType {
  id?: string;
  state: FormControlState;
  size: FormControlSize;
  disabled: boolean;
  hasError: boolean;
  hasHelper: boolean;
  labelId?: string;
  helperId?: string;
  errorId?: string;
}

interface FormFieldContextType {
  required: boolean;
}

interface FormControlProps {
  children: React.ReactNode;
  id?: string;
  state?: FormControlState;
  size?: FormControlSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  spacing?: keyof Theme['spacing'];
}

interface FormControlLabelProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  htmlFor?: string;
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

interface FormContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  spacing?: keyof Theme['spacing'];
}

interface FormFieldProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  spacing?: keyof Theme['spacing'];
}

// Context
const FormControlContext = createContext<FormControlContextType | null>(null);
const FormFieldContext = createContext<FormFieldContextType | null>(null);

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

const useFormField = () => {
  return useContext(FormFieldContext);
};

// Styles
const createFormControlStyles = (theme: Theme) => ({
  container: {
    width: '100%',
  } as ViewStyle,
  contentContainer: {
    width: '100%',
  } as ViewStyle,
  fieldContainer: {
    width: '100%',
  } as ViewStyle,
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs / 2, // Reduced from xs to xs/2
  } as ViewStyle,
  labelText: {
    ...theme.typography.body,
    color: resolveColor(theme, 'text', theme.colors.text),
    fontWeight: '500',
  } as TextStyle,
  labelTextSm: {
    ...theme.typography.small,
  } as TextStyle,
  labelTextLg: {
    ...theme.typography.heading,
  } as TextStyle,
  labelTextRequired: {
    color: resolveColor(theme, 'error', theme.colors.error),
  } as TextStyle,
  labelTextDisabled: {
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    opacity: 0.6,
  } as TextStyle,
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  } as ViewStyle,
  helperText: {
    ...theme.typography.small,
    color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
    flex: 1,
    lineHeight: theme.typography.small?.fontSize
      ? theme.typography.small.fontSize * 1.3
      : 16,
  } as TextStyle,
  helperTextDisabled: {
    opacity: 0.6,
  } as TextStyle,
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: theme.spacing.xs,
  } as ViewStyle,
  errorIcon: {
    marginRight: theme.spacing.xs / 2, // Reduced spacing
  } as ViewStyle,
  errorText: {
    ...theme.typography.small,
    color: resolveColor(theme, 'error', theme.colors.error),
    flex: 1,
    lineHeight: theme.typography.small?.fontSize
      ? theme.typography.small.fontSize * 1.3
      : 16,
  } as TextStyle,
  requiredIndicator: {
    color: resolveColor(theme, 'error', theme.colors.error),
    marginLeft: theme.spacing.xs / 2, // Reduced spacing
  } as TextStyle,
});

// Helper function to generate unique IDs
const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Components
const FormControl = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlProps
>(
  (
    {
      children,
      id,
      state = 'default',
      size = 'md',
      disabled = false,
      style,
      spacing = 'sm', // Changed from 'md' to 'sm' for tighter spacing
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createFormControlStyles);

    const formControlId = useMemo(() => id || generateId('form-control'), [id]);
    const labelId = useMemo(() => `${formControlId}-label`, [formControlId]);
    const helperId = useMemo(() => `${formControlId}-helper`, [formControlId]);
    const errorId = useMemo(() => `${formControlId}-error`, [formControlId]);

    // Check if children contain helper or error components
    const hasHelper = useMemo(() => {
      return React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.type === FormControlHelper ||
            child.type === FormControlHelperText)
      );
    }, [children]);

    const hasError = useMemo(() => {
      return state === 'error';
    }, [state]);

    const contextValue: FormControlContextType = useMemo(
      () => ({
        id: formControlId,
        state: state,
        size,
        disabled,
        hasError,
        hasHelper,
        labelId,
        helperId,
        errorId,
      }),
      [
        formControlId,
        state,
        size,
        disabled,
        hasError,
        hasHelper,
        labelId,
        helperId,
        errorId,
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

const FormControlLabel = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlLabelProps
>(({ children, style, htmlFor, ...props }, ref) => {
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
  const { size, disabled } = useFormControl();
  const formField = useFormField();
  const { theme } = useTheme();
  const required = formField?.required || false;

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

const FormControlHelper = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlHelperProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { helperId, hasError } = useFormControl();
  const formField = useFormField();
  const required = formField?.required || false;

  // Don't render helper if there's an error AND the field is required
  if (hasError && required) {
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
  const { disabled, hasError } = useFormControl();
  const formField = useFormField();
  const required = formField?.required || false;

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

  // Don't render helper text if there's an error AND the field is required
  if (hasError && required) {
    return null;
  }

  return (
    <Text ref={ref} style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
});

const FormControlError = forwardRef<
  React.ComponentRef<typeof View>,
  FormControlErrorProps
>(({ children, style, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { errorId, state } = useFormControl();

  // Only render if state is error
  if (state !== 'error') {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[styles.errorContainer, style]}
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
  const { state } = useFormControl();
  const { theme } = useTheme();

  // Only render if state is error
  if (state !== 'error') {
    return null;
  }

  const defaultIcon = (
    <AlertCircle
      size={size}
      color={resolveColor(theme, 'error', theme.colors.error)}
    />
  );

  return (
    <View ref={ref} style={[styles.errorIcon, style]} {...props}>
      {icon || defaultIcon}
    </View>
  );
});

const FormControlErrorText = forwardRef<
  React.ComponentRef<typeof Text>,
  FormControlErrorTextProps
>(({ children, style, variant, ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { state } = useFormControl();
  const { theme } = useTheme();

  const textStyle = useMemo(() => {
    let baseStyle = styles.errorText;

    if (variant) {
      baseStyle = { ...baseStyle, ...theme.typography[variant] };
    }

    return baseStyle;
  }, [styles, variant, theme]);

  // Only render if state is error
  if (state !== 'error') {
    return null;
  }

  return (
    <Text ref={ref} style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
});

const FormContent = forwardRef<
  React.ComponentRef<typeof View>,
  FormContentProps
>(({ children, style, spacing = 'md', ...props }, ref) => {
  const styles = useThemedStyles(createFormControlStyles);
  const { theme } = useTheme();

  return (
    <View
      ref={ref}
      style={[
        styles.contentContainer,
        {
          gap: theme.spacing[spacing],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

const FormField = forwardRef<React.ComponentRef<typeof View>, FormFieldProps>(
  ({ children, style, required = false, spacing = 'sm', ...props }, ref) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createFormControlStyles);

    const fieldContextValue: FormFieldContextType = useMemo(
      () => ({
        required,
      }),
      [required]
    );

    return (
      <FormFieldContext.Provider value={fieldContextValue}>
        <View
          ref={ref}
          style={[
            styles.fieldContainer,
            {
              gap: theme.spacing[spacing],
            },
            style,
          ]}
          {...props}
        >
          {children}
        </View>
      </FormFieldContext.Provider>
    );
  }
);

// Set display names
FormControl.displayName = 'FormControl';
FormContent.displayName = 'FormContent';
FormField.displayName = 'FormField';
FormControlLabel.displayName = 'FormControlLabel';
FormControlLabelText.displayName = 'FormControlLabelText';
FormControlHelper.displayName = 'FormControlHelper';
FormControlHelperText.displayName = 'FormControlHelperText';
FormControlError.displayName = 'FormControlError';
FormControlErrorIcon.displayName = 'FormControlErrorIcon';
FormControlErrorText.displayName = 'FormControlErrorText';

export {
  FormControl,
  FormContent,
  FormField,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  useFormControl,
  useFormControlOptional,
  useFormField,
};

export type {
  FormControlProps,
  FormContentProps,
  FormFieldProps,
  FormControlLabelProps,
  FormControlLabelTextProps,
  FormControlHelperProps,
  FormControlHelperTextProps,
  FormControlErrorProps,
  FormControlErrorIconProps,
  FormControlErrorTextProps,
  FormControlContextType,
  FormFieldContextType,
};