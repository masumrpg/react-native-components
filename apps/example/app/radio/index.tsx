import React, { useState } from 'react';
import { ScrollView, Switch } from 'react-native';
import {
  RadioGroup,
  Radio,
  RadioLabel,
  Typography,
  Card,
  VStack,
  HStack,
  useTheme,
  useThemedStyles,
  Theme,
} from 'rnc-theme';

export default function RadioExample() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [selectedValue, setSelectedValue] = useState('option1');
  const [selectedSize, setSelectedSize] = useState('md');
  const [selectedVariant, setSelectedVariant] = useState('primary');
  const [selectedPayment, setSelectedPayment] = useState('credit');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ScrollView style={styles.container}>
      <VStack spacing="lg">
        {/* Header */}
        <Card style={styles.headerCard}>
          <VStack spacing="md">
            <Typography variant="title" style={styles.title}>
              Radio Button Examples
            </Typography>

            <HStack justify="space-between" align="center">
              <Typography variant="body">
                Theme: {themeMode === 'light' ? 'Light' : 'Dark'}
              </Typography>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.surface}
              />
            </HStack>
          </VStack>
        </Card>

        {/* Basic Radio Group */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Basic Radio Group
            </Typography>
            <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
              <Radio value="option1">
                <RadioLabel>Option 1</RadioLabel>
              </Radio>
              <Radio value="option2">
                <RadioLabel>Option 2</RadioLabel>
              </Radio>
              <Radio value="option3">
                <RadioLabel>Option 3</RadioLabel>
              </Radio>
            </RadioGroup>
            <Typography variant="body" style={styles.selectedText}>
              Selected: {selectedValue}
            </Typography>
          </VStack>
        </Card>

        {/* Different Sizes */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Different Sizes
            </Typography>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <Radio value="sm" size="sm">
                <RadioLabel size="sm">Small Radio</RadioLabel>
              </Radio>
              <Radio value="md" size="md">
                <RadioLabel size="md">Medium Radio</RadioLabel>
              </Radio>
              <Radio value="lg" size="lg">
                <RadioLabel size="lg">Large Radio</RadioLabel>
              </Radio>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Different Variants */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Different Variants
            </Typography>
            <RadioGroup
              value={selectedVariant}
              onValueChange={setSelectedVariant}
            >
              <Radio value="default" variant="default">
                <RadioLabel>Default</RadioLabel>
              </Radio>
              <Radio value="primary" variant="primary">
                <RadioLabel>Primary</RadioLabel>
              </Radio>
              <Radio value="success" variant="success">
                <RadioLabel>Success</RadioLabel>
              </Radio>
              <Radio value="warning" variant="warning">
                <RadioLabel>Warning</RadioLabel>
              </Radio>
              <Radio value="error" variant="error">
                <RadioLabel>Error</RadioLabel>
              </Radio>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Disabled State */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Disabled State
            </Typography>
            <RadioGroup value="disabled1" disabled>
              <Radio value="disabled1">
                <RadioLabel>Disabled Selected</RadioLabel>
              </Radio>
              <Radio value="disabled2">
                <RadioLabel>Disabled Unselected</RadioLabel>
              </Radio>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Real World Example - Payment Method */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Payment Method Selection
            </Typography>
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
            >
              <Radio value="credit" variant="primary">
                <VStack spacing="xs">
                  <RadioLabel>Credit Card</RadioLabel>
                  <Typography variant="body" style={styles.paymentDescription}>
                    Pay with your credit or debit card
                  </Typography>
                </VStack>
              </Radio>
              <Radio value="paypal" variant="primary">
                <VStack spacing="xs">
                  <RadioLabel>PayPal</RadioLabel>
                  <Typography variant="body" style={styles.paymentDescription}>
                    Pay with your PayPal account
                  </Typography>
                </VStack>
              </Radio>
              <Radio value="bank" variant="primary">
                <VStack spacing="xs">
                  <RadioLabel>Bank Transfer</RadioLabel>
                  <Typography variant="body" style={styles.paymentDescription}>
                    Direct bank transfer
                  </Typography>
                </VStack>
              </Radio>
              <Radio value="crypto" variant="primary">
                <VStack spacing="xs">
                  <RadioLabel>Cryptocurrency</RadioLabel>
                  <Typography variant="body" style={styles.paymentDescription}>
                    Pay with Bitcoin or Ethereum
                  </Typography>
                </VStack>
              </Radio>
            </RadioGroup>
            <Typography variant="body" style={styles.selectedText}>
              Selected Payment: {selectedPayment}
            </Typography>
          </VStack>
        </Card>

        {/* Individual Radio (without group) */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Individual Radio (without group)
            </Typography>
            <Radio
              value="individual"
              checked={true}
              onCheckedChange={(checked) =>
                console.log('Individual radio:', checked)
              }
            >
              <RadioLabel>Standalone Radio</RadioLabel>
            </Radio>
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  headerCard: {
    padding: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: theme.typography.subtitle.fontWeight,
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: '600' as const,
    fontStyle: 'italic' as const,
  },
  paymentDescription: {
    color: theme.colors.textSecondary,
  },
});