import { ScrollView, Text } from 'react-native';
import React from 'react';
import { Input, useTheme } from 'rnc-theme';
import {
  X,
  Info,
  AlertCircle,
  Check,
  AlertTriangle,
} from 'lucide-react-native';

export default function InputScreen() {
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      {/* Section Title */}
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        Basic Variants
      </Text>

      {/* Default Variant */}
      <Input
        label="Default Input"
        placeholder="Default variant"
        variant="default"
      />

      {/* Outline Variant */}
      <Input
        label="Outline Input"
        placeholder="Outline variant"
        variant="outline"
      />

      {/* Filled Variant */}
      <Input
        label="Filled Input"
        placeholder="Filled variant"
        variant="filled"
      />

      {/* Ghost Variant */}
      <Input label="Ghost Input" placeholder="Ghost variant" variant="ghost" />

      {/* Section Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        Color Variants
      </Text>

      {/* Primary Variant */}
      <Input
        label="Primary Input"
        placeholder="Primary variant"
        variant="primary"
        leftIcon={<Check size={20} color={theme.colors.primary} />}
      />

      {/* Secondary Variant */}
      <Input
        label="Secondary Input"
        placeholder="Secondary variant"
        variant="secondary"
      />

      {/* Success Variant */}
      <Input
        label="Success Input"
        placeholder="Success variant"
        variant="success"
        leftIcon={<Check size={20} color={theme.colors.success} />}
      />

      {/* Error Variant */}
      <Input
        label="Error Input"
        placeholder="Error variant"
        variant="error"
        leftIcon={<AlertCircle size={20} color={theme.colors.error} />}
      />

      {/* Warning Variant */}
      <Input
        label="Warning Input"
        placeholder="Warning variant"
        variant="warning"
        leftIcon={<AlertTriangle size={20} color={theme.colors.warning} />}
      />

      {/* Info Variant */}
      <Input
        label="Info Input"
        placeholder="Info variant"
        variant="info"
        leftIcon={<Info size={20} color={theme.colors.info} />}
      />

      {/* Destructive Variant */}
      <Input
        label="Destructive Input"
        placeholder="Destructive variant"
        variant="destructive"
        leftIcon={<X size={20} color={theme.colors.destructive} />}
      />

      {/* Section Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        Special Input Types
      </Text>

      {/* Password Input */}
      <Input
        label="Password Input"
        placeholder="Enter your password"
        isPasswordInput
        helperText="Must be at least 8 characters"
      />

      {/* Search Input */}
      <Input
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder="Search..."
        isSearchInput
        rightIcon={
          searchValue ? (
            <X size={20} color={theme.colors.textSecondary} />
          ) : undefined
        }
        onRightIconPress={() => setSearchValue('')}
      />

      {/* TextArea Input */}
      <Input
        label="TextArea Input"
        placeholder="Write your description here..."
        isTextAreaInput
        numberOfLines={4}
        maxLength={500}
        showCharacterCount
      />

      {/* Section Title */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        States
      </Text>

      {/* Disabled State */}
      <Input
        label="Disabled Input"
        placeholder="This input is disabled"
        disabled
      />

      {/* Error State */}
      <Input
        label="Error State"
        placeholder="This input has an error"
        state="error"
        error="This field is required"
      />

      {/* Success State */}
      <Input
        label="Success State"
        placeholder="This input is valid"
        state="success"
        helperText="Everything looks good!"
      />
    </ScrollView>
  );
}
