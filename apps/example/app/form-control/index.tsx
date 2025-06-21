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
  Combobox,
  DatePicker,
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
  country: string;
  hobbies: string[];
  skills: string;
  birthDate: string;
  appointmentDate: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  newsletter?: string;
  gender?: string;
  age?: string;
  notifications?: string;
  country?: string;
  hobbies?: string;
  skills?: string;
  birthDate?: string;
  appointmentDate?: string;
}

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

const skillOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'React', value: 'react' },
  { label: 'React Native', value: 'react-native' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Flutter', value: 'flutter' },
];

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

  const validateCountry = (country: string): string | undefined => {
    if (!country) return 'Please select your country';
    return undefined;
  };

  const validateBirthDate = (birthDate: string): string | undefined => {
    if (!birthDate) return 'Birth date is required';
    const today = new Date();
    const birth = new Date(birthDate);
    if (birth > today) return 'Birth date cannot be in the future';
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
      country: validateCountry(formData.country),
      birthDate: validateBirthDate(formData.birthDate),
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
              state={errors.email ? 'error' : 'default'}
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
          {/* Country Combobox */}
          <FormControl state={errors.country ? 'error' : 'default'} required>
            <FormControlLabel>
              <FormControlLabelText>Country</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select your country"
              options={countryOptions}
              value={formData.country}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, country: value as string }));
                if (errors.country) {
                  setErrors((prev) => ({ ...prev, country: undefined }));
                }
              }}
              searchable
              clearable
            />
            <FormControlHelper>
              <FormControlHelperText>
                Select the country where you currently reside.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>{errors.country}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Hobbies Multiple Combobox */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>
                Hobbies (Multiple Selection)
              </FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select your hobbies"
              options={hobbyOptions}
              value={formData.hobbies}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  hobbies: value as string[],
                }));
              }}
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
          {/* Skills Combobox with Search */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Primary Skill</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Search and select your primary skill"
              options={skillOptions}
              value={formData.skills}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, skills: value as string }));
              }}
              searchable
              clearable
            />
            <FormControlHelper>
              <FormControlHelperText>
                Choose your strongest technical skill.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
          {/* Birth Date DatePicker */}
          <FormControl state={errors.birthDate ? 'error' : 'default'} required>
            <FormControlLabel>
              <FormControlLabelText>Birth Date</FormControlLabelText>
            </FormControlLabel>
            <DatePicker
              state={errors.birthDate ? 'error' : 'default'}
              placeholder="Select your birth date"
              value={formData.birthDate}
              onDateSelect={(date) => {
                setFormData((prev) => ({ ...prev, birthDate: date }));
                if (errors.birthDate) {
                  setErrors((prev) => ({ ...prev, birthDate: undefined }));
                }
              }}
              dateFormat="DD/MM/YYYY"
              maxDate={new Date().toISOString().split('T')[0]} // Cannot select future dates
            />
            <FormControlHelper>
              <FormControlHelperText>
                Select your date of birth for age verification.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>{errors.birthDate}</FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Appointment Date DatePicker */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>
                Preferred Appointment Date
              </FormControlLabelText>
            </FormControlLabel>
            <DatePicker
              // useFormControl={true}
              placeholder="Select appointment date"
              value={formData.appointmentDate}
              onDateSelect={(date) => {
                setFormData((prev) => ({ ...prev, appointmentDate: date }));
              }}
              dateFormat="DD MMM YYYY"
              minDate={new Date().toISOString().split('T')[0]} // Cannot select past dates
              variant="filled"
              size="lg"
            />
            <FormControlHelper>
              <FormControlHelperText>
                Choose your preferred appointment date (optional).
              </FormControlHelperText>
            </FormControlHelper>
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

      {/* Combobox Examples */}
      <Card>
        <CardHeader>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
            }}
          >
            Combobox Examples
          </Text>
        </CardHeader>
        <CardContent style={{ gap: theme.spacing.lg }}>
          {/* Basic Combobox */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Basic Combobox</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select an option"
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
            />
            <FormControlHelper>
              <FormControlHelperText>
                Basic single selection combobox.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Searchable Combobox */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Searchable Combobox</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Search countries..."
              options={countryOptions}
              searchable
              clearable
            />
            <FormControlHelper>
              <FormControlHelperText>
                Type to search through options.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Multiple Selection */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Multiple Selection</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select multiple skills"
              options={skillOptions}
              multiple
              searchable
              clearable
            />
            <FormControlHelper>
              <FormControlHelperText>
                Select multiple options at once.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Different Variants */}
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Filled Variant</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Filled combobox"
              options={hobbyOptions}
              searchable
            />
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Default Variant</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Default combobox"
              options={hobbyOptions}
              searchable
            />
          </FormControl>

          {/* Different Sizes */}
          <FormControl size="sm">
            <FormControlLabel>
              <FormControlLabelText>Small Size</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Small combobox"
              options={countryOptions.slice(0, 5)}
              size="sm"
            />
          </FormControl>

          <FormControl size="lg">
            <FormControlLabel>
              <FormControlLabelText>Large Size</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Large combobox"
              options={countryOptions.slice(0, 5)}
              size="lg"
            />
          </FormControl>

          {/* Error State */}
          <FormControl state="error">
            <FormControlLabel>
              <FormControlLabelText>Error State</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Select an option"
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
              ]}
              state="error"
            />
            <FormControlError>
              <FormControlErrorIcon />
              <FormControlErrorText>
                This field is required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Disabled State */}
          <FormControl state="disabled">
            <FormControlLabel>
              <FormControlLabelText>Disabled State</FormControlLabelText>
            </FormControlLabel>
            <Combobox
              placeholder="Disabled combobox"
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
              ]}
              disabled
            />
            <FormControlHelper>
              <FormControlHelperText>
                This combobox is disabled.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>
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