import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { RadioGroup, Radio, RadioLabel, Typography } from 'rnc-theme';

export default function RadioExample() {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [selectedSize, setSelectedSize] = useState('md');
  const [selectedVariant, setSelectedVariant] = useState('primary');
  const [selectedPayment, setSelectedPayment] = useState('credit');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Typography variant="h2" style={styles.title}>
          Radio Button Examples
        </Typography>
      </View>

      {/* Basic Radio Group */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
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
      </View>

      {/* Different Sizes */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
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
      </View>

      {/* Different Variants */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
          Different Variants
        </Typography>
        <RadioGroup value={selectedVariant} onValueChange={setSelectedVariant}>
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
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
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
      </View>

      {/* Real World Example - Payment Method */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
          Payment Method Selection
        </Typography>
        <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
          <Radio value="credit" variant="primary">
            <View style={styles.paymentOption}>
              <RadioLabel>Credit Card</RadioLabel>
              <Typography variant="body" style={styles.paymentDescription}>
                Pay with your credit or debit card
              </Typography>
            </View>
          </Radio>
          <Radio value="paypal" variant="primary">
            <View style={styles.paymentOption}>
              <RadioLabel>PayPal</RadioLabel>
              <Typography variant="body" style={styles.paymentDescription}>
                Pay with your PayPal account
              </Typography>
            </View>
          </Radio>
          <Radio value="bank" variant="primary">
            <View style={styles.paymentOption}>
              <RadioLabel>Bank Transfer</RadioLabel>
              <Typography variant="body" style={styles.paymentDescription}>
                Direct bank transfer
              </Typography>
            </View>
          </Radio>
          <Radio value="crypto" variant="primary">
            <View style={styles.paymentOption}>
              <RadioLabel>Cryptocurrency</RadioLabel>
              <Typography variant="body" style={styles.paymentDescription}>
                Pay with Bitcoin or Ethereum
              </Typography>
            </View>
          </Radio>
        </RadioGroup>
        <Typography variant="body" style={styles.selectedText}>
          Selected Payment: {selectedPayment}
        </Typography>
      </View>

      {/* Individual Radio (without group) */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#333',
  },
  selectedText: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#666',
  },
  paymentOption: {
    flex: 1,
  },
  paymentDescription: {
    color: '#666',
    marginTop: 2,
  },
});