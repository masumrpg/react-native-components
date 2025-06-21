import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import {
  Dropdown,
  Card,
  Button,
  ButtonText,
  DropdownOption,
  Body,
  Subtitle,
  Title,
} from 'rnc-theme';
import { User, Globe, Star, Heart } from 'lucide-react-native';


const basicOptions: DropdownOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const countryOptions: DropdownOption[] = [
  {
    label: 'United States',
    value: 'us',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'North America'
  },
  {
    label: 'United Kingdom',
    value: 'uk',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'Europe'
  },
  {
    label: 'Canada',
    value: 'ca',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'North America'
  },
  {
    label: 'Australia',
    value: 'au',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'Oceania'
  },
  {
    label: 'Germany',
    value: 'de',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'Europe'
  },
  {
    label: 'France',
    value: 'fr',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'Europe'
  },
  {
    label: 'Japan',
    value: 'jp',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'Asia'
  },
  {
    label: 'South Korea',
    value: 'kr',
    icon: <Globe size={16} color="#3B82F6" />,
    description: 'Asia'
  },
];

const userOptions: DropdownOption[] = [
  {
    label: 'John Doe',
    value: 'john',
    icon: <User size={16} color="#10B981" />,
    description: 'Administrator'
  },
  {
    label: 'Jane Smith',
    value: 'jane',
    icon: <User size={16} color="#F59E0B" />,
    description: 'Editor'
  },
  {
    label: 'Bob Johnson',
    value: 'bob',
    icon: <User size={16} color="#EF4444" />,
    description: 'Viewer'
  },
  {
    label: 'Alice Brown',
    value: 'alice',
    icon: <User size={16} color="#8B5CF6" />,
    description: 'Moderator'
  },
];

const priorityOptions: DropdownOption[] = [
  {
    label: 'High Priority',
    value: 'high',
    icon: <Star size={16} color="#EF4444" />
  },
  {
    label: 'Medium Priority',
    value: 'medium',
    icon: <Star size={16} color="#F59E0B" />
  },
  {
    label: 'Low Priority',
    value: 'low',
    icon: <Star size={16} color="#10B981" />
  },
  {
    label: 'Critical',
    value: 'critical',
    icon: <Heart size={16} color="#DC2626" />
  },
];

export default function DropdownExample() {
  const [basicValue, setBasicValue] = useState<string | number>();
  const [countryValue, setCountryValue] = useState<string | number>();
  const [multipleValues, setMultipleValues] = useState<(string | number)[]>([]);
  const [priorityValue, setPriorityValue] = useState<string | number>();
  const [searchableValue, setSearchableValue] = useState<string | number>();
  const [clearableValue, setClearableValue] = useState<string | number>('2');

  // Wrapper functions to handle type conversion
  const handleBasicValueChange = (value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) return;
    setBasicValue(value);
  };

  const handleCountryValueChange = (value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) return;
    setCountryValue(value);
  };

  const handleMultipleValuesChange = (value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) {
      setMultipleValues(value);
    }
  };

  const handlePriorityValueChange = (value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) return;
    setPriorityValue(value);
  };

  const handleSearchableValueChange = (value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) return;
    setSearchableValue(value);
  };

  const handleClearableValueChange = (value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) return;
    setClearableValue(value);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleOpen = () => {
    console.log('Dropdown opened');
  };

  const handleClose = () => {
    console.log('Dropdown closed');
  };

  const showAlert = (title: string, value: string | number | (string | number)[] | undefined) => {
    Alert.alert(title, `Selected: ${JSON.stringify(value)}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Title>Dropdown Examples</Title>
        <Subtitle>Various dropdown configurations and use cases</Subtitle>
      </View>

      {/* Basic Dropdown */}
      <Card style={styles.section}>
        <Title>Basic Dropdown</Title>
        <Body style={styles.description}>
          Simple dropdown with basic options
        </Body>
        <Dropdown
          options={basicOptions}
          value={basicValue}
          onValueChange={handleBasicValueChange}
          placeholder="Select an option"
          label="Basic Selection"
        />
        <Button
          variant="outline"
          size="sm"
          style={styles.button}
          onPress={() => showAlert('Basic Dropdown', basicValue)}
        >
          <ButtonText>Show Selected Value</ButtonText>
        </Button>
      </Card>

      {/* Dropdown with Icons and Descriptions */}
      <Card style={styles.section}>
        <Title>With Icons & Descriptions</Title>
        <Body style={styles.description}>
          Dropdown with icons and descriptions for each option
        </Body>
        <Dropdown
          options={countryOptions}
          value={countryValue}
          onValueChange={handleCountryValueChange}
          placeholder="Select a country"
          label="Country"
          searchable
          onSearch={handleSearch}
        />
        <Button
          variant="outline"
          size="sm"
          style={styles.button}
          onPress={() => showAlert('Country Dropdown', countryValue)}
        >
          <ButtonText>Show Selected Country</ButtonText>
        </Button>
      </Card>

      {/* Multiple Selection */}
      <Card style={styles.section}>
        <Title>Multiple Selection</Title>
        <Body style={styles.description}>
          Select multiple options from the list
        </Body>
        <Dropdown
          options={userOptions}
          value={multipleValues}
          onValueChange={handleMultipleValuesChange}
          placeholder="Select users"
          label="Team Members"
          multiple
          clearable
          closeOnSelect={false}
        />
        <Button
          variant="outline"
          size="sm"
          style={styles.button}
          onPress={() => showAlert('Multiple Selection', multipleValues)}
        >
          <ButtonText>Show Selected Users</ButtonText>
        </Button>
      </Card>

      {/* Searchable Dropdown */}
      <Card style={styles.section}>
        <Title>Searchable Dropdown</Title>
        <Body style={styles.description}>
          Dropdown with search functionality
        </Body>
        <Dropdown
          options={countryOptions}
          value={searchableValue}
          onValueChange={handleSearchableValueChange}
          placeholder="Search and select"
          label="Searchable Countries"
          searchable
          onSearch={handleSearch}
          onOpen={handleOpen}
          onClose={handleClose}
        />
        <Button
          variant="outline"
          size="sm"
          style={styles.button}
          onPress={() => showAlert('Searchable Dropdown', searchableValue)}
        >
          <ButtonText>Show Selected Value</ButtonText>
        </Button>
      </Card>

      {/* Clearable Dropdown */}
      <Card style={styles.section}>
        <Title>Clearable Dropdown</Title>
        <Body style={styles.description}>
          Dropdown with clear button to reset selection
        </Body>
        <Dropdown
          options={basicOptions}
          value={clearableValue}
          onValueChange={handleClearableValueChange}
          placeholder="Select an option"
          label="Clearable Selection"
          clearable
        />
        <Button
          variant="outline"
          size="sm"
          style={styles.button}
          onPress={() => showAlert('Clearable Dropdown', clearableValue)}
        >
          <ButtonText>Show Selected Value</ButtonText>
        </Button>
      </Card>

      {/* Different Variants */}
      <Card style={styles.section}>
        <Title>Different Variants</Title>
        <Body style={styles.description}>
          Dropdown with different visual variants
        </Body>

        <View style={styles.variantContainer}>
          <Dropdown
            options={priorityOptions}
            value={priorityValue}
            onValueChange={handlePriorityValueChange}
            placeholder="Outline variant"
            label="Outline (Default)"
            variant="outline"
            style={styles.variantItem}
          />

          <Dropdown
            options={priorityOptions}
            value={priorityValue}
            onValueChange={handlePriorityValueChange}
            placeholder="Filled variant"
            label="Filled"
            variant="filled"
            style={styles.variantItem}
          />
        </View>

        <Button
          variant="outline"
          size="sm"
          style={styles.button}
          onPress={() => showAlert('Priority Dropdown', priorityValue)}
        >
          <ButtonText>Show Selected Priority</ButtonText>
        </Button>
      </Card>

      {/* Different Sizes */}
      <Card style={styles.section}>
        <Title>Different Sizes</Title>
        <Body style={styles.description}>
          Dropdown components in various sizes
        </Body>

        <View style={styles.sizeContainer}>
          <Dropdown
            options={basicOptions.slice(0, 3)}
            placeholder="Small"
            label="Small Size"
            size="sm"
            style={styles.sizeItem}
          />

          <Dropdown
            options={basicOptions.slice(0, 3)}
            placeholder="Medium"
            label="Medium Size"
            size="md"
            style={styles.sizeItem}
          />

          <Dropdown
            options={basicOptions.slice(0, 3)}
            placeholder="Large"
            label="Large Size"
            size="lg"
            style={styles.sizeItem}
          />
        </View>
      </Card>

      {/* Error State */}
      <Card style={styles.section}>
        <Title>Error State</Title>
        <Body style={styles.description}>
          Dropdown with error state and validation
        </Body>
        <Dropdown
          options={basicOptions}
          placeholder="Select an option"
          label="Required Field"
          required
          error
          errorMessage="This field is required"
          helperText="Please select one of the available options"
        />
      </Card>

      {/* Disabled State */}
      <Card style={styles.section}>
        <Title>Disabled State</Title>
        <Body style={styles.description}>
          Dropdown in disabled state
        </Body>
        <Dropdown
          options={basicOptions}
          value="2"
          placeholder="Disabled dropdown"
          label="Disabled Selection"
          disabled
          helperText="This dropdown is disabled"
        />
      </Card>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  section: {
    margin: 16,
    padding: 20,
  },
  description: {
    marginBottom: 16,
    opacity: 0.7,
  },
  button: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  variantContainer: {
    gap: 16,
  },
  variantItem: {
    marginBottom: 8,
  },
  sizeContainer: {
    gap: 16,
  },
  sizeItem: {
    marginBottom: 8,
  },
  footer: {
    height: 50,
  },
});