import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  VStack,
  HStack,
  Typography,
  Card,
} from 'rnc-theme';
import { Circle } from 'lucide-react-native';

export default function RadioScreen() {
  // Individual radio states
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [selectedNotification, setSelectedNotification] = useState('email');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <VStack spacing="lg" style={{ padding: 16 }}>
        <Typography variant="title" style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
          Radio Button Examples
        </Typography>

        {/* Basic Radio Group */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Basic Radio Group
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {selectedGender}
            </Typography>

            <RadioGroup value={selectedGender} onValueChange={setSelectedGender}>
              <VStack spacing="sm">
                <Radio value="male">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Male</RadioLabel>
                </Radio>

                <Radio value="female">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Female</RadioLabel>
                </Radio>

                <Radio value="other">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Other</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Variants */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Variants
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {selectedTheme}
            </Typography>

            <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
              <VStack spacing="sm">
                <Radio value="light" variant="primary">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Light Theme</RadioLabel>
                </Radio>

                <Radio value="dark" variant="success">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Dark Theme</RadioLabel>
                </Radio>

                <Radio value="auto" variant="warning">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Auto Theme</RadioLabel>
                </Radio>

                <Radio value="custom" variant="error">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Custom Theme</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Sizes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Sizes
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {selectedSize}
            </Typography>

            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              <VStack spacing="sm">
                <Radio value="small" size="sm" variant="primary">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Small Radio</RadioLabel>
                </Radio>

                <Radio value="medium" size="md" variant="primary">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Medium Radio</RadioLabel>
                </Radio>

                <Radio value="large" size="lg" variant="primary">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Large Radio</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Horizontal Layout */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Horizontal Layout
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {selectedPayment}
            </Typography>

            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              <HStack spacing="lg" style={{ flexWrap: 'wrap' }}>
                <Radio value="credit" variant="primary">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Credit Card</RadioLabel>
                </Radio>

                <Radio value="debit" variant="success">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Debit Card</RadioLabel>
                </Radio>

                <Radio value="paypal" variant="warning">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>PayPal</RadioLabel>
                </Radio>

                <Radio value="bank" variant="info">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <RadioLabel>Bank Transfer</RadioLabel>
                </Radio>
              </HStack>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Disabled State */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Disabled State
            </Typography>

            <VStack spacing="sm">
              <Radio value="enabled" variant="primary">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Enabled Radio</RadioLabel>
              </Radio>

              <Radio value="disabled" disabled variant="primary">
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Disabled Radio</RadioLabel>
              </Radio>

              <Radio value="disabled-selected" disabled variant="primary" checked>
                <RadioIndicator>
                  <RadioIcon />
                </RadioIndicator>
                <RadioLabel>Disabled Selected</RadioLabel>
              </Radio>
            </VStack>
          </VStack>
        </Card>

        {/* Custom Icon */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Custom Icon
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {selectedNotification}
            </Typography>

            <RadioGroup value={selectedNotification} onValueChange={setSelectedNotification}>
              <VStack spacing="sm">
                <Radio value="email" variant="primary">
                  <RadioIndicator>
                    <RadioIcon>
                      <Circle size={8} color="white" fill="white" />
                    </RadioIcon>
                  </RadioIndicator>
                  <RadioLabel>Email Notifications</RadioLabel>
                </Radio>

                <Radio value="sms" variant="success">
                  <RadioIndicator>
                    <RadioIcon>
                      <Circle size={8} color="white" fill="white" />
                    </RadioIcon>
                  </RadioIndicator>
                  <RadioLabel>SMS Notifications</RadioLabel>
                </Radio>

                <Radio value="push" variant="warning">
                  <RadioIndicator>
                    <RadioIcon>
                      <Circle size={8} color="white" fill="white" />
                    </RadioIcon>
                  </RadioIndicator>
                  <RadioLabel>Push Notifications</RadioLabel>
                </Radio>

                <Radio value="none" variant="error">
                  <RadioIndicator>
                    <RadioIcon>
                      <Circle size={8} color="white" fill="white" />
                    </RadioIcon>
                  </RadioIndicator>
                  <RadioLabel>No Notifications</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </Card>

        {/* Complex Example */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Complex Example
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Choose your subscription plan
            </Typography>

            <RadioGroup value="pro" onValueChange={() => {}}>
              <VStack spacing="md">
                <Radio value="free" variant="default">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <VStack spacing="xs" style={{ marginLeft: 12, flex: 1 }}>
                    <Typography variant="subtitle" style={{ fontWeight: '600' }}>Free Plan</Typography>
                    <Typography variant="body" style={{ fontSize: 12, color: '#666' }}>Basic features, limited usage</Typography>
                    <Typography variant="body" style={{ fontSize: 14, fontWeight: '600', color: '#2196F3' }}>$0/month</Typography>
                  </VStack>
                </Radio>

                <Radio value="pro" variant="primary">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <VStack spacing="xs" style={{ marginLeft: 12, flex: 1 }}>
                    <Typography variant="subtitle" style={{ fontWeight: '600' }}>Pro Plan</Typography>
                    <Typography variant="body" style={{ fontSize: 12, color: '#666' }}>Advanced features, unlimited usage</Typography>
                    <Typography variant="body" style={{ fontSize: 14, fontWeight: '600', color: '#4CAF50' }}>$19/month</Typography>
                  </VStack>
                </Radio>

                <Radio value="enterprise" variant="warning">
                  <RadioIndicator>
                    <RadioIcon />
                  </RadioIndicator>
                  <VStack spacing="xs" style={{ marginLeft: 12, flex: 1 }}>
                    <Typography variant="subtitle" style={{ fontWeight: '600' }}>Enterprise Plan</Typography>
                    <Typography variant="body" style={{ fontSize: 12, color: '#666' }}>Custom solutions, priority support</Typography>
                    <Typography variant="body" style={{ fontSize: 14, fontWeight: '600', color: '#FF9800' }}>Contact us</Typography>
                  </VStack>
                </Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  );
}