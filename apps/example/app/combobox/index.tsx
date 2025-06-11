import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Combobox, Typography, useTheme, type ComboboxOption } from 'rnc-theme';

const countries: ComboboxOption[] = [
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

const fruits: ComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Watermelon', value: 'watermelon', disabled: true },
];

const programmingLanguages: ComboboxOption[] = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Dart', value: 'dart' },
];

export default function ComboboxScreen() {
  const { theme } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [searchableValue, setSearchableValue] = useState<string>('');

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: 16,
        gap: 24,
      }}
    >
      {/* Basic Combobox */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Basic Combobox
        </Typography>
        <Combobox
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={selectedCountry}
          onValueChange={(value) => setSelectedCountry(value as string)}
          helperText="Choose your country"
        />
      </View>

      {/* Multiple Selection */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Multiple Selection
        </Typography>
        <Combobox
          label="Favorite Fruits"
          placeholder="Select fruits"
          options={fruits}
          value={selectedFruits}
          onValueChange={(value) => setSelectedFruits(value as string[])}
          multiple
          clearable
          helperText="You can select multiple fruits"
        />
      </View>

      {/* Searchable Combobox */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Searchable Combobox
        </Typography>
        <Combobox
          label="Programming Language"
          placeholder="Search and select a language"
          options={programmingLanguages}
          value={searchableValue}
          onValueChange={(value) => setSearchableValue(value as string)}
          searchable
          clearable
          helperText="Type to search for programming languages"
        />
      </View>

      {/* Different Variants */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Different Variants
        </Typography>

        <Combobox
          label="Outline Variant"
          options={countries.slice(0, 5)}
          placeholder="Outline style"
        />

        <Combobox
          label="Filled Variant"
          options={countries.slice(0, 5)}
          placeholder="Filled style"
        />
      </View>

      {/* Different Sizes */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Different Sizes
        </Typography>

        <Combobox
          label="Small Size"
          size="sm"
          options={fruits.slice(0, 4)}
          placeholder="Small combobox"
        />

        <Combobox
          label="Medium Size (Default)"
          size="md"
          options={fruits.slice(0, 4)}
          placeholder="Medium combobox"
        />

        <Combobox
          label="Large Size"
          size="lg"
          options={fruits.slice(0, 4)}
          placeholder="Large combobox"
        />
      </View>

      {/* States */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Different States
        </Typography>

        <Combobox
          label="Error State"
          state="error"
          options={countries.slice(0, 3)}
          placeholder="Select country"
          errorText="This field is required"
          required
        />

        <Combobox
          label="Success State"
          state="success"
          options={countries.slice(0, 3)}
          placeholder="Select country"
          helperText="Great choice!"
        />

        <Combobox
          label="Disabled State"
          disabled
          options={countries.slice(0, 3)}
          placeholder="Disabled combobox"
          helperText="This combobox is disabled"
        />
      </View>

      {/* Advanced Features */}
      <View style={{ gap: 8 }}>
        <Typography variant="title" weight="semibold">
          Advanced Features
        </Typography>

        <Combobox
          label="Searchable + Multiple + Clearable"
          options={programmingLanguages}
          searchable
          multiple
          clearable
          placeholder="Search and select languages"
          helperText="Combine all features together"
          maxDropdownHeight={450}
        />
      </View>
    </ScrollView>
  );
}