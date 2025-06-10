import React, { useState } from 'react';
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
  useTheme,
} from 'rnc-theme';


// Simulasi react-hook-form untuk demo
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  gender: string;
  age: number;
  notifications: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  newsletter?: string;
  gender?: string;
  age?: string;
  notifications?: string;
}

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
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return undefined;
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string | undefined => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return undefined;
  };

  const validateGender = (gender: string): string | undefined => {
    if (!gender) return 'Please select your gender';
    return undefined;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      ),
      gender: validateGender(formData.gender),
    };

    // Remove undefined errors
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors];
      }
    });

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        Alert.alert('Success', 'Form submitted successfully!');
        setIsSubmitting(false);
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: theme.spacing.lg,
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
        FormControl Examples
      </Text>

      {/* Basic Form */}
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
        <CardContent style={{ gap: theme.spacing.md }}>
          {/* Email Field */}
          <FormControl state={errors.email ? 'error' : 'default'} required>
            <FormControlLabel>
              <FormControlLabelText>Email Address</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, email: text }));
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormControlHelper>
              <FormControlHelperText>
                We'll never share your email with anyone else.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>{errors.email}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Password Field */}
          <FormControl state={errors.password ? 'error' : 'default'} required>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, password: text }));
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              secureTextEntry
            />
            <FormControlHelper>
              <FormControlHelperText>
                Password must be at least 8 characters long.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>{errors.password}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Confirm Password Field */}
          <FormControl
            state={errors.confirmPassword ? 'error' : 'default'}
            required
          >
            <FormControlLabel>
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, confirmPassword: text }));
                if (errors.confirmPassword) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }
              }}
              secureTextEntry
            />
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                {errors.confirmPassword}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Newsletter Checkbox */}
          <FormControl>
            <Checkbox
              value="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => {
                setFormData((prev) => ({ ...prev, newsletter: checked }));
              }}
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
          {/* Gender Radio Group */}
          <FormControl state={errors.gender ? 'error' : 'default'} required>
            <FormControlLabel>
              <FormControlLabelText>Gender</FormControlLabelText>
            </FormControlLabel>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, gender: value }));
                if (errors.gender) {
                  setErrors((prev) => ({ ...prev, gender: undefined }));
                }
              }}
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
              <FormControlErrorText>{errors.gender}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Age Slider */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Age: {formData.age}</FormControlLabelText>
            </FormControlLabel>
            <Slider
              initialValue={formData.age}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, age: value }));
              }}
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
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, notifications: value }));
                }}
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

      {/* Different Sizes Example */}
      <Card>
        <CardHeader>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
            }}
          >
            Different Sizes
          </Text>
        </CardHeader>
        <CardContent style={{ gap: theme.spacing.lg }}>
          <FormControl size="sm">
            <FormControlLabel>
              <FormControlLabelText>Small Size</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Small input" />
            <FormControlHelper>
              <FormControlHelperText>
                This is a small form control.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          <FormControl size="md">
            <FormControlLabel>
              <FormControlLabelText>Medium Size (Default)</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Medium input" />
            <FormControlHelper>
              <FormControlHelperText>
                This is a medium form control.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          <FormControl size="lg">
            <FormControlLabel>
              <FormControlLabelText>Large Size</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Large input" />
            <FormControlHelper>
              <FormControlHelperText>
                This is a large form control.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
        </CardContent>
      </Card>

      {/* Different States Example */}
      <Card>
        <CardHeader>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
            }}
          >
            Different States
          </Text>
        </CardHeader>
        <CardContent style={{ gap: theme.spacing.lg }}>
          <FormControl state="default">
            <FormControlLabel>
              <FormControlLabelText>Default State</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Default input" />
            <FormControlHelper>
              <FormControlHelperText>
                This is the default state.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          <FormControl state="error">
            <FormControlLabel>
              <FormControlLabelText>Error State</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Error input" />
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                This field has an error.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl state="success">
            <FormControlLabel>
              <FormControlLabelText>Success State</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Success input" />
            <FormControlHelper>
              <FormControlHelperText>
                This field is valid.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          <FormControl state="disabled" disabled>
            <FormControlLabel>
              <FormControlLabelText>Disabled State</FormControlLabelText>
            </FormControlLabel>
            <Input placeholder="Disabled input" disabled />
            <FormControlHelper>
              <FormControlHelperText>
                This field is disabled.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
        </CardContent>
      </Card>
    </ScrollView>
  );
}