import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

// Zod validation schema
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    newsletter: z.boolean(),
    gender: z.string().min(1, 'Please select your gender'),
    age: z
      .number()
      .min(18, 'Must be at least 18 years old')
      .max(100, 'Invalid age'),
    notifications: z.boolean(),
    country: z.string().min(1, 'Please select your country'),
    hobbies: z.array(z.string()),
    skills: z.string(),
    birthDate: z
      .string()
      .min(1, 'Birth date is required')
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        return birthDate <= today;
      }, 'Birth date cannot be in the future'),
    appointmentDate: z.string(),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[+]?[1-9][\d]{0,15}$/.test(val),
        'Please enter a valid phone number'
      ),
    website: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^https?:\/\/.+\..+/.test(val),
        'Please enter a valid website URL (http:// or https://)'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

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

export default function FormControlExample() {
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
    mode: 'onChange',
  });

  // Watch password to trigger confirmPassword validation
  const password = watch('password');
  React.useEffect(() => {
    if (touchedFields.confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, trigger, touchedFields.confirmPassword]);

  // Get form control state for a field
  const getFieldState = (fieldName: keyof FormData) => {
    const hasError = !!errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const isDirty = dirtyFields[fieldName];

    if (hasError) return 'error';

    // Show warning for phone without country code
    if (fieldName === 'phone' && isTouched && isDirty) {
      const phoneValue = watch('phone');
      if (phoneValue && !phoneValue.startsWith('+')) {
        return 'warning';
      }
    }

    // Show warning for password without special characters
    if (fieldName === 'password' && isTouched && isDirty) {
      const passwordValue = watch('password');
      if (passwordValue && !/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
        return 'warning';
      }
    }

    if (isTouched && isDirty && !hasError) return 'success';

    return 'default';
  };

  // Get success message for a field
  const getSuccessMessage = (fieldName: keyof FormData) => {
    const messages: Record<string, string> = {
      email: 'Email looks good!',
      password: 'Strong password!',
      confirmPassword: 'Passwords match!',
      gender: 'Selection confirmed',
      country: 'Country selected',
      birthDate: 'Valid birth date',
      phone: 'Valid phone number',
      website: 'Valid website URL',
    };
    return messages[fieldName] || 'Valid input';
  };

  // Get warning message for a field
  const getWarningMessage = (fieldName: keyof FormData) => {
    if (fieldName === 'phone') {
      return 'Phone number format may not be international';
    }
    if (fieldName === 'password') {
      return 'Consider adding special characters for stronger security';
    }
    return '';
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Form submitted successfully!');
      console.log('Form data:', data);
    } catch (err) {
      Alert.alert('Error', 'Failed to submit form. Please try again.');
      console.error('Form submission error:', err);
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
        Enhanced FormControl with React Hook Form & Zod
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl state={getFieldState('email')} required>
                <FormControlLabel>
                  <FormControlLabelText>Email Address</FormControlLabelText>
                </FormControlLabel>
                <Input
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {!errors.email && !touchedFields.email && (
                  <FormControlHelper>
                    <FormControlHelperText>
                      We'll never share your email with anyone else.
                    </FormControlHelperText>
                  </FormControlHelper>
                )}
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.email?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('email')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl state={getFieldState('password')} required>
                <FormControlLabel>
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                />
                {!errors.password && !touchedFields.password && (
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
                    {errors.password?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlWarning>
                  <FormControlWarningIcon />
                  <FormControlWarningText>
                    {getWarningMessage('password')}
                  </FormControlWarningText>
                </FormControlWarning>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('password')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl state={getFieldState('confirmPassword')} required>
                <FormControlLabel>
                  <FormControlLabelText>Confirm Password</FormControlLabelText>
                </FormControlLabel>
                <Input
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                />
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.confirmPassword?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('confirmPassword')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Phone Field (Optional with Warning) */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl state={getFieldState('phone')}>
                <FormControlLabel>
                  <FormControlLabelText>
                    Phone Number (Optional)
                  </FormControlLabelText>
                </FormControlLabel>
                <Input
                  placeholder="+62 812 3456 7890"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                />
                {!errors.phone && !touchedFields.phone && (
                  <FormControlHelper>
                    <FormControlHelperText>
                      Include country code for international numbers (e.g., +62
                      for Indonesia).
                    </FormControlHelperText>
                  </FormControlHelper>
                )}
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.phone?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlWarning>
                  <FormControlWarningIcon />
                  <FormControlWarningText>
                    {getWarningMessage('phone')}
                  </FormControlWarningText>
                </FormControlWarning>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('phone')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Website Field (Optional) */}
          <Controller
            control={control}
            name="website"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl state={getFieldState('website')}>
                <FormControlLabel>
                  <FormControlLabelText>
                    Website (Optional)
                  </FormControlLabelText>
                </FormControlLabel>
                <Input
                  placeholder="https://example.com"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="url"
                  autoCapitalize="none"
                />
                {!errors.website && !touchedFields.website && (
                  <FormControlHelper>
                    <FormControlHelperText>
                      Enter your personal or professional website URL.
                    </FormControlHelperText>
                  </FormControlHelper>
                )}
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.website?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('website')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Gender Selection */}
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <FormControl state={getFieldState('gender')} required>
                <FormControlLabel>
                  <FormControlLabelText>Gender</FormControlLabelText>
                </FormControlLabel>
                <RadioGroup value={value} onValueChange={onChange}>
                  <Radio value="male">
                    <RadioLabel>Male</RadioLabel>
                  </Radio>
                  <Radio value="female">
                    <RadioLabel>Female</RadioLabel>
                  </Radio>
                  <Radio value="other">
                    <RadioLabel>Other</RadioLabel>
                  </Radio>
                </RadioGroup>
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.gender?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('gender')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Country Selection */}
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <FormControl state={getFieldState('country')} required>
                <FormControlLabel>
                  <FormControlLabelText>Country</FormControlLabelText>
                </FormControlLabel>
                <Combobox
                  placeholder="Select your country"
                  options={countryOptions}
                  value={value}
                  onValueChange={onChange}
                />
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.country?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('country')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Birth Date */}
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <FormControl state={getFieldState('birthDate')} required>
                <FormControlLabel>
                  <FormControlLabelText>Birth Date</FormControlLabelText>
                </FormControlLabel>
                <DatePicker
                  value={value}
                  onChange={onChange}
                  placeholder="Select your birth date"
                />
                <FormControlError>
                  <FormControlErrorIcon />
                  <FormControlErrorText>
                    {errors.birthDate?.message}
                  </FormControlErrorText>
                </FormControlError>
                <FormControlSuccess>
                  <FormControlSuccessIcon />
                  <FormControlSuccessText>
                    {getSuccessMessage('birthDate')}
                  </FormControlSuccessText>
                </FormControlSuccess>
              </FormControl>
            )}
          />

          {/* Age Slider */}
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Age: {value}</FormControlLabelText>
                </FormControlLabel>
                <Slider
                  initialValue={value}
                  onValueChange={onChange}
                  min={18}
                  max={100}
                  step={1}
                />
                <FormControlHelper>
                  <FormControlHelperText>
                    Slide to select your age (18-100 years).
                  </FormControlHelperText>
                </FormControlHelper>
              </FormControl>
            )}
          />

          {/* Newsletter Checkbox */}
          <Controller
            control={control}
            name="newsletter"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <Checkbox
                  value="newsletter"
                  checked={value}
                  onCheckedChange={onChange}
                >
                  <CheckboxLabel>Subscribe to our newsletter</CheckboxLabel>
                </Checkbox>
              </FormControl>
            )}
          />

          {/* Notifications Switch */}
          <Controller
            control={control}
            name="notifications"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormControlLabel>
                    <FormControlLabelText>
                      Enable Notifications
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Switcher value={value} onValueChange={onChange} />
                </View>
                <FormControlHelper>
                  <FormControlHelperText>
                    Receive push notifications for important updates.
                  </FormControlHelperText>
                </FormControlHelper>
              </FormControl>
            )}
          />

          {/* Submit Button */}
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={{
              marginTop: theme.spacing.lg,
            }}
          >
            <ButtonText>
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </ButtonText>
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
