import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import {
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
  Input,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Radio,
  RadioGroup,
  RadioLabel,
  Slider,
  Switcher,
  Combobox,
  DatePicker,
  useTheme,
} from 'rnc-theme';

// Form data interface
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  gender: string;
  age: number;
  notifications: boolean;
  country: string;
  hobbies: string[];
  skills: string;
  birthDate: string;
  appointmentDate: string;
  phone: string;
  website: string;
}

// Individual field error states
interface FieldErrors {
  [key: string]: {
    hasError: boolean;
    hasSuccess: boolean;
    hasWarning: boolean;
    message: string;
  };
}

// Base validation rule interface
interface BaseValidationRule {
  required: boolean;
  errorMessage: string;
  successMessage: string;
}

// Extended validation rule interfaces
interface PatternValidationRule extends BaseValidationRule {
  pattern: RegExp;
  warningMessage?: string;
}

interface PasswordValidationRule extends BaseValidationRule {
  minLength: number;
  pattern: RegExp;
  warningMessage: string;
}

interface PhoneValidationRule extends BaseValidationRule {
  pattern: RegExp;
  warningMessage: string;
}

interface WebsiteValidationRule extends BaseValidationRule {
  pattern: RegExp;
}

type SimpleValidationRule = BaseValidationRule

// Union type for all validation rules
type ValidationRule =
  | PatternValidationRule
  | PasswordValidationRule
  | PhoneValidationRule
  | WebsiteValidationRule
  | SimpleValidationRule;

// Validation rules with proper typing
const validationRules: Record<string, ValidationRule> = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Please enter a valid email address',
    successMessage: 'Email looks good!',
  } as PatternValidationRule,
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    errorMessage:
      'Password must be at least 8 characters with uppercase, lowercase, and number',
    warningMessage: 'Consider adding special characters for stronger security',
    successMessage: 'Strong password!',
  } as PasswordValidationRule,
  confirmPassword: {
    required: true,
    errorMessage: 'Passwords do not match',
    successMessage: 'Passwords match!',
  } as SimpleValidationRule,
  gender: {
    required: true,
    errorMessage: 'Please select your gender',
    successMessage: 'Selection confirmed',
  } as SimpleValidationRule,
  country: {
    required: true,
    errorMessage: 'Please select your country',
    successMessage: 'Country selected',
  } as SimpleValidationRule,
  birthDate: {
    required: true,
    errorMessage: 'Birth date is required and cannot be in the future',
    successMessage: 'Valid birth date',
  } as SimpleValidationRule,
  phone: {
    required: false,
    pattern: /^[+]?[1-9][\d]{0,15}$/,
    errorMessage: 'Please enter a valid phone number',
    warningMessage: 'Phone number format may not be international',
    successMessage: 'Valid phone number',
  } as PhoneValidationRule,
  website: {
    required: false,
    pattern: /^https?:\/\/.+\..+/,
    errorMessage: 'Please enter a valid website URL (http:// or https://)',
    successMessage: 'Valid website URL',
  } as WebsiteValidationRule,
};

// Data untuk combobox
const countryOptions = [
  { label: 'Indonesia', value: 'id' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'South Korea', value: 'kr' },
  { label: 'Singapore', value: 'sg' },
];

const hobbyOptions = [
  { label: 'Reading', value: 'reading' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Sports', value: 'sports' },
  { label: 'Music', value: 'music' },
  { label: 'Cooking', value: 'cooking' },
  { label: 'Traveling', value: 'traveling' },
  { label: 'Photography', value: 'photography' },
  { label: 'Art', value: 'art' },
  { label: 'Writing', value: 'writing' },
  { label: 'Dancing', value: 'dancing' },
];

// Type guard functions
const hasPattern = (
  rule: ValidationRule
): rule is
  | PatternValidationRule
  | PasswordValidationRule
  | PhoneValidationRule
  | WebsiteValidationRule => {
  return 'pattern' in rule;
};

const hasMinLength = (rule: ValidationRule): rule is PasswordValidationRule => {
  return 'minLength' in rule;
};

const hasWarningMessage = (
  rule: ValidationRule
): rule is PasswordValidationRule | PhoneValidationRule => {
  return 'warningMessage' in rule;
};

export default function FormControlExample() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    gender: '',
    age: 25,
    notifications: false,
    country: '',
    hobbies: [],
    skills: '',
    birthDate: '',
    appointmentDate: '',
    phone: '',
    website: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateField = useCallback(
    (
      fieldName: string,
      value: string | number | boolean | string[],
      currentFormData?: FormData
    ): {
      hasError: boolean;
      hasSuccess: boolean;
      hasWarning: boolean;
      message: string;
    } => {
      const rule = validationRules[fieldName];
      if (!rule)
        return {
          hasError: false,
          hasSuccess: false,
          hasWarning: false,
          message: '',
        };

      // Handle special cases
      if (fieldName === 'confirmPassword') {
        if (!value && rule.required) {
          return {
            hasError: true,
            hasSuccess: false,
            hasWarning: false,
            message: 'Please confirm your password',
          };
        }
        if (value && currentFormData && value !== currentFormData.password) {
          return {
            hasError: true,
            hasSuccess: false,
            hasWarning: false,
            message: rule.errorMessage,
          };
        }
        if (
          value &&
          currentFormData &&
          value === currentFormData.password &&
          currentFormData.password
        ) {
          return {
            hasError: false,
            hasSuccess: true,
            hasWarning: false,
            message: rule.successMessage,
          };
        }
        return {
          hasError: false,
          hasSuccess: false,
          hasWarning: false,
          message: '',
        };
      }

      if (fieldName === 'birthDate') {
        if (!value && rule.required) {
          return {
            hasError: true,
            hasSuccess: false,
            hasWarning: false,
            message: 'Birth date is required',
          };
        }
        if (value) {
          const birthDate = new Date(value as string);
          const today = new Date();
          if (birthDate > today) {
            return {
              hasError: true,
              hasSuccess: false,
              hasWarning: false,
              message: 'Birth date cannot be in the future',
            };
          }
          return {
            hasError: false,
            hasSuccess: true,
            hasWarning: false,
            message: rule.successMessage,
          };
        }
        return {
          hasError: false,
          hasSuccess: false,
          hasWarning: false,
          message: '',
        };
      }

      if (fieldName === 'password') {
        if (!value && rule.required) {
          return {
            hasError: true,
            hasSuccess: false,
            hasWarning: false,
            message: 'Password is required',
          };
        }
        if (value) {
          const stringValue = value as string;
          if (hasMinLength(rule) && stringValue.length < rule.minLength) {
            return {
              hasError: true,
              hasSuccess: false,
              hasWarning: false,
              message: `Password must be at least ${rule.minLength} characters`,
            };
          }
          if (hasPattern(rule) && !rule.pattern.test(stringValue)) {
            return {
              hasError: true,
              hasSuccess: false,
              hasWarning: false,
              message: rule.errorMessage,
            };
          }
          // Check for warning condition (no special characters)
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(stringValue)) {
            return {
              hasError: false,
              hasSuccess: false,
              hasWarning: true,
              message: hasWarningMessage(rule) ? rule.warningMessage : '',
            };
          }
          return {
            hasError: false,
            hasSuccess: true,
            hasWarning: false,
            message: rule.successMessage,
          };
        }
        return {
          hasError: false,
          hasSuccess: false,
          hasWarning: false,
          message: '',
        };
      }

      if (fieldName === 'phone') {
        if (!value) {
          return {
            hasError: false,
            hasSuccess: false,
            hasWarning: false,
            message: '',
          }; // Optional field
        }
        const stringValue = value as string;
        if (hasPattern(rule) && !rule.pattern.test(stringValue)) {
          return {
            hasError: true,
            hasSuccess: false,
            hasWarning: false,
            message: rule.errorMessage,
          };
        }
        // Warning for potentially non-international format
        if (stringValue && !stringValue.startsWith('+')) {
          return {
            hasError: false,
            hasSuccess: false,
            hasWarning: true,
            message: hasWarningMessage(rule) ? rule.warningMessage : '',
          };
        }
        return {
          hasError: false,
          hasSuccess: true,
          hasWarning: false,
          message: rule.successMessage,
        };
      }

      // General validation
      if (
        rule.required &&
        (!value || (Array.isArray(value) && value.length === 0))
      ) {
        return {
          hasError: true,
          hasSuccess: false,
          hasWarning: false,
          message: `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`,
        };
      }

      if (value && hasPattern(rule) && !rule.pattern.test(value as string)) {
        return {
          hasError: true,
          hasSuccess: false,
          hasWarning: false,
          message: rule.errorMessage,
        };
      }

      if (value) {
        return {
          hasError: false,
          hasSuccess: true,
          hasWarning: false,
          message: rule.successMessage,
        };
      }

      return {
        hasError: false,
        hasSuccess: false,
        hasWarning: false,
        message: '',
      };
    },
    []
  );

  // Handle field change with validation
  const handleFieldChange = useCallback(
    (fieldName: string, value: string | number | boolean | string[]) => {
      const newFormData = { ...formData, [fieldName]: value };
      setFormData(newFormData);

      // Validate field
      const validation = validateField(fieldName, value, newFormData);
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: validation,
      }));

      // Re-validate confirm password if password changes
      if (fieldName === 'password' && newFormData.confirmPassword) {
        const confirmValidation = validateField(
          'confirmPassword',
          newFormData.confirmPassword,
          newFormData
        );
        setFieldErrors((prev) => ({
          ...prev,
          confirmPassword: confirmValidation,
        }));
      }
    },
    [formData, validateField]
  );

  // Get form control state for a field
  const getFieldState = (fieldName: string) => {
    const fieldError = fieldErrors[fieldName];
    if (!fieldError) return 'default';
    if (fieldError.hasError) return 'error';
    if (fieldError.hasWarning) return 'warning';
    if (fieldError.hasSuccess) return 'success';
    return 'default';
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all required fields
    const newFieldErrors: FieldErrors = {};
    Object.keys(validationRules).forEach((fieldName) => {
      const validation = validateField(
        fieldName,
        formData[fieldName as keyof FormData],
        formData
      );
      if (
        validation.hasError ||
        validation.hasWarning ||
        validation.hasSuccess
      ) {
        newFieldErrors[fieldName] = validation;
      }
    });

    setFieldErrors(newFieldErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newFieldErrors).some(
      (error) => error.hasError
    );

    if (!hasErrors) {
      // Simulate API call
      setTimeout(() => {
        Alert.alert('Success', 'Form submitted successfully!');
        setIsSubmitting(false);
      }, 2000);
    } else {
      setIsSubmitting(false);
      Alert.alert(
        'Error',
        'Please fix the errors in the form before submitting.'
      );
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: theme.spacing.md,
        gap: theme.spacing.lg,
      }}
    >
      <Text
        style={{
          ...theme.typography.heading,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Enhanced FormControl Example
      </Text>

      {/* Main Registration Form */}
      <Card>
        <CardHeader>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
            }}
          >
            User Registration Form
          </Text>
        </CardHeader>
        <CardContent style={{ gap: theme.spacing.lg }}>
          {/* Email Field */}
          <FormControl state={getFieldState('email')} required>
            <FormControlLabel>
              <FormControlLabelText>Email Address</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleFieldChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {!fieldErrors.email && (
              <FormControlHelper>
                <FormControlHelperText>
                  We'll never share your email with anyone else.
                </FormControlHelperText>
              </FormControlHelper>
            )}
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.email?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.email?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Password Field */}
          <FormControl state={getFieldState('password')} required>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleFieldChange('password', text)}
              secureTextEntry
            />
            {!fieldErrors.password && (
              <FormControlHelper>
                <FormControlHelperText>
                  Password must be at least 8 characters with uppercase,
                  lowercase, and number.
                </FormControlHelperText>
              </FormControlHelper>
            )}
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.password?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlWarning>
              <FormControlWarningIcon />
              <FormControlWarningText>
                {fieldErrors.password?.message}
              </FormControlWarningText>
            </FormControlWarning>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.password?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Confirm Password Field */}
          <FormControl state={getFieldState('confirmPassword')} required>
            <FormControlLabel>
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                handleFieldChange('confirmPassword', text)
              }
              secureTextEntry
            />
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.confirmPassword?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.confirmPassword?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Phone Field (Optional with Warning) */}
          <FormControl state={getFieldState('phone')}>
            <FormControlLabel>
              <FormControlLabelText>
                Phone Number (Optional)
              </FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="+62 812 3456 7890"
              value={formData.phone}
              onChangeText={(text) => handleFieldChange('phone', text)}
              keyboardType="phone-pad"
            />
            {!fieldErrors.phone && (
              <FormControlHelper>
                <FormControlHelperText>
                  Include country code for international numbers (e.g., +62 for
                  Indonesia).
                </FormControlHelperText>
              </FormControlHelper>
            )}
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.phone?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlWarning>
              <FormControlWarningIcon />
              <FormControlWarningText>
                {fieldErrors.phone?.message}
              </FormControlWarningText>
            </FormControlWarning>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.phone?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Website Field (Optional) */}
          <FormControl state={getFieldState('website')}>
            <FormControlLabel>
              <FormControlLabelText>Website (Optional)</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="https://example.com"
              value={formData.website}
              onChangeText={(text) => handleFieldChange('website', text)}
              keyboardType="url"
              autoCapitalize="none"
            />
            {!fieldErrors.website && (
              <FormControlHelper>
                <FormControlHelperText>
                  Enter your personal or professional website URL.
                </FormControlHelperText>
              </FormControlHelper>
            )}
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.website?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.website?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Country Combobox */}
          <FormControl state={getFieldState('country')} required>
            <FormControlLabel>
              <FormControlLabelText>Country</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select your country"
              options={countryOptions}
              value={formData.country}
              onValueChange={(value) => handleFieldChange('country', value)}
              searchable
              clearable
            />
            {!fieldErrors.country && (
              <FormControlHelper>
                <FormControlHelperText>
                  Select the country where you currently reside.
                </FormControlHelperText>
              </FormControlHelper>
            )}
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.country?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.country?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Birth Date DatePicker */}
          <FormControl state={getFieldState('birthDate')} required>
            <FormControlLabel>
              <FormControlLabelText>Birth Date</FormControlLabelText>
            </FormControlLabel>
            <DatePicker
              placeholder="Select your birth date"
              value={formData.birthDate}
              onDateSelect={(date) => handleFieldChange('birthDate', date)}
              dateFormat="DD/MM/YYYY"
              maxDate={new Date().toISOString().split('T')[0]}
            />
            {!fieldErrors.birthDate && (
              <FormControlHelper>
                <FormControlHelperText>
                  Select your date of birth for age verification.
                </FormControlHelperText>
              </FormControlHelper>
            )}
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.birthDate?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.birthDate?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Gender Radio Group */}
          <FormControl state={getFieldState('gender')} required>
            <FormControlLabel>
              <FormControlLabelText>Gender</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleFieldChange('gender', value)}
            >
              <View style={{ gap: theme.spacing.sm }}>
                <Radio value="male">
                  <RadioLabel>
                    <Text
                      style={{
                        ...theme.typography.body,
                        color: theme.colors.text,
                      }}
                    >
                      Male
                    </Text>
                  </RadioLabel>
                </Radio>
                <Radio value="female">
                  <RadioLabel>
                    <Text
                      style={{
                        ...theme.typography.body,
                        color: theme.colors.text,
                      }}
                    >
                      Female
                    </Text>
                  </RadioLabel>
                </Radio>
                <Radio value="other">
                  <RadioLabel>
                    <Text
                      style={{
                        ...theme.typography.body,
                        color: theme.colors.text,
                      }}
                    >
                      Other
                    </Text>
                  </RadioLabel>
                </Radio>
              </View>
            </RadioGroup>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {fieldErrors.gender?.message}
              </FormControlErrorText>
            </FormControlError>
            <FormControlSuccess>
              <FormControlSuccessIcon />
              <FormControlSuccessText>
                {fieldErrors.gender?.message}
              </FormControlSuccessText>
            </FormControlSuccess>
          </FormControl>

          {/* Hobbies Multiple Selection */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Hobbies (Optional)</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select your hobbies"
              options={hobbyOptions}
              value={formData.hobbies}
              onValueChange={(value) => handleFieldChange('hobbies', value)}
              multiple
              searchable
              clearable
            />
            <FormControlHelper>
              <FormControlHelperText>
                You can select multiple hobbies that interest you.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Age Slider */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Age: {formData.age}</FormControlLabelText>
            </FormControlLabel>
            <Slider
              initialValue={formData.age}
              onValueChange={(value) => handleFieldChange('age', value)}
              min={18}
              max={100}
              step={1}
            />
            <FormControlHelper>
              <FormControlHelperText>
                Select your age (18-100 years).
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Newsletter Checkbox */}
          <FormControl>
            <Checkbox
              value="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                handleFieldChange('newsletter', checked)
              }
            >
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
              <CheckboxLabel>
                <FormControlLabelText>
                  Subscribe to our newsletter
                </FormControlLabelText>
              </CheckboxLabel>
            </Checkbox>
            <FormControlHelper>
              <FormControlHelperText>
                Get updates about new features and promotions.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Notifications Switcher */}
          <FormControl>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <FormControlLabel>
                  <FormControlLabelText>
                    Push Notifications
                  </FormControlLabelText>
                </FormControlLabel>
                <FormControlHelper>
                  <FormControlHelperText>
                    Receive notifications about important updates.
                  </FormControlHelperText>
                </FormControlHelper>
              </View>
              <Switcher
                value={formData.notifications}
                onValueChange={(value) =>
                  handleFieldChange('notifications', value)
                }
              />
            </View>
          </FormControl>

          {/* Submit Button */}
          <Button
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={{ marginTop: theme.spacing.md }}
          >
            <ButtonText>
              {isSubmitting ? 'Submitting...' : 'Create Account'}
            </ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Form State Summary */}
      <Card>
        <CardHeader>
          <Text style={{ ...theme.typography.title, color: theme.colors.text }}>
            Form Validation Summary
          </Text>
        </CardHeader>
        <CardContent>
          <View style={{ gap: theme.spacing.sm }}>
            {Object.entries(fieldErrors).map(([fieldName, error]) => (
              <View
                key={fieldName}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: error.hasError
                      ? theme.colors.error
                      : error.hasWarning
                      ? theme.colors.warning || '#f59e0b'
                      : error.hasSuccess
                      ? theme.colors.success || '#22c55e'
                      : theme.colors.textSecondary,
                  }}
                />
                <Text
                  style={{
                    ...theme.typography.small,
                    color: theme.colors.text,
                    flex: 1,
                  }}
                >
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:{' '}
                  {error.message}
                </Text>
              </View>
            ))}
            {Object.keys(fieldErrors).length === 0 && (
              <Text
                style={{
                  ...theme.typography.small,
                  color: theme.colors.textSecondary,
                  fontStyle: 'italic',
                }}
              >
                No validation messages yet. Start filling the form!
              </Text>
            )}
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
