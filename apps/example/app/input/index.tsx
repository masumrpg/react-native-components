import { View } from 'react-native'
import React from 'react'
import { Input, InputPassword, InputSearch, InputTextArea, useTheme } from 'rnc-theme';
import { SearchIcon, X } from 'lucide-react-native';

export default function InputScreen() {
  const { theme } = useTheme();
  const [value, setValue] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
        gap: 16,
      }}
    >
      <Input
        label="Email"
        placeholder="Enter your email"
        variant="outline"
        size="md"
      />
      <Input
        label="Password"
        placeholder="Enter password"
        state="error"
        errorText="Password is required"
        required
      />
      <Input
        variant="floating"
        label="Search"
        leftIcon={<SearchIcon />}
        rightIcon={<X />}
        value={value}
        onRightIconPress={() => setValue('')}
      />
      <InputPassword label="Password" placeholder="Enter password" />
      <InputSearch placeholder="Search products..." />
      <InputTextArea
        label="Description"
        numberOfLines={4}
        maxLength={500}
        showCharacterCount
      />
    </View>
  );
}