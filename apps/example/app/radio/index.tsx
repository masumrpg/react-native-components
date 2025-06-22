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
              Radio Button Showcase
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

        {/* Size Comparison */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Size Comparison
            </Typography>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <Radio value="xs" size="xs" variant="primary">
                <RadioLabel size="xs">Extra Small (xs)</RadioLabel>
              </Radio>
              <Radio value="sm" size="sm" variant="primary">
                <RadioLabel size="sm">Small (sm)</RadioLabel>
              </Radio>
              <Radio value="md" size="md" variant="primary">
                <RadioLabel size="md">Medium (md)</RadioLabel>
              </Radio>
              <Radio value="lg" size="lg" variant="primary">
                <RadioLabel size="lg">Large (lg)</RadioLabel>
              </Radio>
              <Radio value="xl" size="xl" variant="primary">
                <RadioLabel size="xl">Extra Large (xl)</RadioLabel>
              </Radio>
            </RadioGroup>
            <Typography variant="body" style={styles.selectedText}>
              Selected Size: {selectedSize}
            </Typography>
          </VStack>
        </Card>

        {/* All Variants */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              All Variants
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
              <Radio value="secondary" variant="secondary">
                <RadioLabel>Secondary</RadioLabel>
              </Radio>
              <Radio value="outline" variant="outline">
                <RadioLabel>Outline</RadioLabel>
              </Radio>
              <Radio value="filled" variant="filled">
                <RadioLabel>Filled</RadioLabel>
              </Radio>
              <Radio value="ghost" variant="ghost">
                <RadioLabel>Ghost</RadioLabel>
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
              <Radio value="info" variant="info">
                <RadioLabel>Info</RadioLabel>
              </Radio>
              <Radio value="destructive" variant="destructive">
                <RadioLabel>Destructive</RadioLabel>
              </Radio>
            </RadioGroup>
            <Typography variant="body" style={styles.selectedText}>
              Selected Variant: {selectedVariant}
            </Typography>
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
              <Radio value="paypal" variant="info">
                <VStack spacing="xs">
                  <RadioLabel>PayPal</RadioLabel>
                  <Typography variant="body" style={styles.paymentDescription}>
                    Pay with your PayPal account
                  </Typography>
                </VStack>
              </Radio>
              <Radio value="bank" variant="secondary">
                <VStack spacing="xs">
                  <RadioLabel>Bank Transfer</RadioLabel>
                  <Typography variant="body" style={styles.paymentDescription}>
                    Direct bank transfer
                  </Typography>
                </VStack>
              </Radio>
              <Radio value="crypto" variant="warning">
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

        {/* Size & Variant Combinations */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Size & Variant Combinations
            </Typography>
            <VStack spacing="lg">
              <VStack spacing="sm">
                <Typography variant="body" style={styles.subSectionTitle}>
                  Small Success
                </Typography>
                <RadioGroup value="small-success">
                  <Radio value="small-success" size="sm" variant="success">
                    <RadioLabel size="sm">Small Success Radio</RadioLabel>
                  </Radio>
                </RadioGroup>
              </VStack>

              <VStack spacing="sm">
                <Typography variant="body" style={styles.subSectionTitle}>
                  Large Error
                </Typography>
                <RadioGroup value="large-error">
                  <Radio value="large-error" size="lg" variant="error">
                    <RadioLabel size="lg">Large Error Radio</RadioLabel>
                  </Radio>
                </RadioGroup>
              </VStack>

              <VStack spacing="sm">
                <Typography variant="body" style={styles.subSectionTitle}>
                  Extra Large Info
                </Typography>
                <RadioGroup value="xl-info">
                  <Radio value="xl-info" size="xl" variant="info">
                    <RadioLabel size="xl">Extra Large Info Radio</RadioLabel>
                  </Radio>
                </RadioGroup>
              </VStack>
            </VStack>
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
              variant="destructive"
              size="lg"
              onCheckedChange={(checked) =>
                console.log('Individual radio:', checked)
              }
            >
              <RadioLabel size="lg">Standalone Radio</RadioLabel>
            </Radio>
          </VStack>
        </Card>

        {/* Real-world Examples */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Real-world Examples
            </Typography>

            <VStack spacing="lg">
              {/* Notification Settings */}
              <VStack spacing="sm">
                <Typography variant="body" style={styles.subSectionTitle}>
                  Notification Preferences
                </Typography>
                <RadioGroup value="email">
                  <Radio value="email" variant="info" size="sm">
                    <RadioLabel size="sm">Email notifications only</RadioLabel>
                  </Radio>
                  <Radio value="push" variant="info" size="sm">
                    <RadioLabel size="sm">Push notifications only</RadioLabel>
                  </Radio>
                  <Radio value="both" variant="success" size="sm">
                    <RadioLabel size="sm">Both email and push</RadioLabel>
                  </Radio>
                  <Radio value="none" variant="ghost" size="sm">
                    <RadioLabel size="sm">No notifications</RadioLabel>
                  </Radio>
                </RadioGroup>
              </VStack>

              {/* Priority Level */}
              <VStack spacing="sm">
                <Typography variant="body" style={styles.subSectionTitle}>
                  Task Priority
                </Typography>
                <RadioGroup value="high">
                  <Radio value="low" variant="success" size="md">
                    <RadioLabel>Low Priority</RadioLabel>
                  </Radio>
                  <Radio value="medium" variant="warning" size="md">
                    <RadioLabel>Medium Priority</RadioLabel>
                  </Radio>
                  <Radio value="high" variant="error" size="md">
                    <RadioLabel>High Priority</RadioLabel>
                  </Radio>
                  <Radio value="urgent" variant="destructive" size="md">
                    <RadioLabel>Urgent</RadioLabel>
                  </Radio>
                </RadioGroup>
              </VStack>
            </VStack>
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
  subSectionTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
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