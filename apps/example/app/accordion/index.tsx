import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  Typography,
  VStack,
  HStack,
  Button,
  ButtonText,
  useTheme,
} from 'rnc-theme';
import { Settings, User, Bell, Shield, HelpCircle } from 'lucide-react-native';

const AccordionScreen = () => {
  const { theme } = useTheme();
  const [singleValue, setSingleValue] = useState<string>('');
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const [settingsValue, setSettingsValue] = useState<string>('');

  // Type-safe handlers
  const handleSingleValueChange = (value: string | string[]) => {
    setSingleValue(typeof value === 'string' ? value : '');
  };

  const handleMultipleValueChange = (value: string | string[]) => {
    setMultipleValue(Array.isArray(value) ? value : []);
  };

  const handleSettingsValueChange = (value: string | string[]) => {
    setSettingsValue(typeof value === 'string' ? value : '');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Basic Single Accordion */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Basic Single Accordion
        </Typography>
        <Accordion
          type="single"
          value={singleValue}
          onValueChange={handleSingleValueChange}
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is React Native?</AccordionTrigger>
            <AccordionContent>
              <Typography>
                React Native is a framework for building mobile applications using React.
                It allows you to create native mobile apps using JavaScript and React.
              </Typography>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              <Typography>
                React Native uses a bridge to communicate between JavaScript and native code,
                allowing you to access platform-specific APIs and components.
              </Typography>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What are the benefits?</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="sm">
                <Typography>• Cross-platform development</Typography>
                <Typography>• Code reusability</Typography>
                <Typography>• Native performance</Typography>
                <Typography>• Large community support</Typography>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Multiple Accordion */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Multiple Selection Accordion
        </Typography>
        <Accordion
          type="multiple"
          value={multipleValue}
          onValueChange={handleMultipleValueChange}
        >
          <AccordionItem value="feature-1">
            <AccordionTrigger>Performance Features</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="sm">
                <Typography>• Hermes JavaScript Engine</Typography>
                <Typography>• Flipper debugging tools</Typography>
                <Typography>• Fast Refresh for development</Typography>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="feature-2">
            <AccordionTrigger>UI Components</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="sm">
                <Typography>• Native components (View, Text, etc.)</Typography>
                <Typography>• Platform-specific styling</Typography>
                <Typography>• Gesture handling</Typography>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="feature-3">
            <AccordionTrigger>Development Tools</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="sm">
                <Typography>• Metro bundler</Typography>
                <Typography>• React DevTools</Typography>
                <Typography>• ESLint and Prettier integration</Typography>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Size Variants */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Size Variants
        </Typography>
        <VStack spacing="md">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <View key={size}>
              <Typography variant="subtitle" style={styles.variantLabel}>
                Size: {size.toUpperCase()}
              </Typography>
              <Accordion type="single" collapsible>
                <AccordionItem value={`size-${size}`} size={size}>
                  <AccordionTrigger>
                    Accordion with {size} size
                  </AccordionTrigger>
                  <AccordionContent>
                    <Typography>
                      This accordion uses the {size} size variant with appropriate
                      padding and text sizing.
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          ))}
        </VStack>
      </Card>

      {/* Variant Styles */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Variant Styles
        </Typography>
        <VStack spacing="md">
          {([
            'default',
            'primary',
            'secondary',
            'outline',
            'filled',
            'ghost',
            'success',
            'error',
            'warning',
            'info',
            'destructive',
          ] as const).map((variant) => (
            <View key={variant}>
              <Typography variant="subtitle" style={styles.variantLabel}>
                Variant: {variant}
              </Typography>
              <Accordion type="single" collapsible>
                <AccordionItem value={`variant-${variant}`} variant={variant}>
                  <AccordionTrigger>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} Accordion
                  </AccordionTrigger>
                  <AccordionContent>
                    <Typography>
                      This accordion demonstrates the {variant} variant styling
                      with appropriate colors and borders.
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          ))}
        </VStack>
      </Card>

      {/* Settings Example */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Settings Panel Example
        </Typography>
        <Accordion
          type="single"
          value={settingsValue}
          onValueChange={handleSettingsValueChange}
          collapsible
        >
          <AccordionItem value="account" variant="primary">
            <AccordionTrigger
              icon={<User size={20} color={theme.colors.primary} />}
            >
              Account Settings
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography>Profile Information</Typography>
                  <Button size="sm" variant="outline">
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </HStack>
                <HStack justify="space-between" align="center">
                  <Typography>Change Password</Typography>
                  <Button size="sm" variant="outline">
                    <ButtonText>Update</ButtonText>
                  </Button>
                </HStack>
                <HStack justify="space-between" align="center">
                  <Typography>Two-Factor Authentication</Typography>
                  <Button size="sm" variant="primary">
                    <ButtonText>Enable</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notifications" variant="info">
            <AccordionTrigger
              icon={<Bell size={20} color={theme.colors.info} />}
            >
              Notification Settings
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography>Push Notifications</Typography>
                  <Button size="sm" variant="success">
                    <ButtonText>Enabled</ButtonText>
                  </Button>
                </HStack>
                <HStack justify="space-between" align="center">
                  <Typography>Email Notifications</Typography>
                  <Button size="sm" variant="outline">
                    <ButtonText>Disabled</ButtonText>
                  </Button>
                </HStack>
                <HStack justify="space-between" align="center">
                  <Typography>SMS Notifications</Typography>
                  <Button size="sm" variant="outline">
                    <ButtonText>Disabled</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy" variant="warning">
            <AccordionTrigger
              icon={<Shield size={20} color={theme.colors.warning} />}
            >
              Privacy & Security
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography>Data Sharing</Typography>
                  <Button size="sm" variant="error">
                    <ButtonText>Restricted</ButtonText>
                  </Button>
                </HStack>
                <HStack justify="space-between" align="center">
                  <Typography>Location Services</Typography>
                  <Button size="sm" variant="success">
                    <ButtonText>Enabled</ButtonText>
                  </Button>
                </HStack>
                <HStack justify="space-between" align="center">
                  <Typography>Analytics</Typography>
                  <Button size="sm" variant="outline">
                    <ButtonText>Disabled</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="help" variant="success">
            <AccordionTrigger
              icon={<HelpCircle size={20} color={theme.colors.success} />}
            >
              Help & Support
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography>Need help? Check out these resources:</Typography>
                <Button variant="outline" fullWidth>
                  <ButtonText>Documentation</ButtonText>
                </Button>
                <Button variant="outline" fullWidth>
                  <ButtonText>Contact Support</ButtonText>
                </Button>
                <Button variant="outline" fullWidth>
                  <ButtonText>Community Forum</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Disabled State */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Disabled State
        </Typography>
        <Accordion type="single" disabled>
          <AccordionItem value="disabled-1">
            <AccordionTrigger>Disabled Accordion Item</AccordionTrigger>
            <AccordionContent>
              <Typography>
                This content won't be accessible because the accordion is disabled.
              </Typography>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="disabled-2">
            <AccordionTrigger>Another Disabled Item</AccordionTrigger>
            <AccordionContent>
              <Typography>
                This content is also not accessible.
              </Typography>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Custom Icons */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          Custom Icons
        </Typography>
        <Accordion type="single" collapsible>
          <AccordionItem value="custom-1" variant="ghost">
            <AccordionTrigger
              icon={<Settings size={20} color={theme.colors.primary} />}
            >
              Custom Icon Example
            </AccordionTrigger>
            <AccordionContent>
              <Typography>
                This accordion item uses a custom Settings icon instead of the default chevron.
              </Typography>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="custom-2" variant="ghost">
            <AccordionTrigger showIcon={false}>
              No Icon Example
            </AccordionTrigger>
            <AccordionContent>
              <Typography>
                This accordion item has no icon at all.
              </Typography>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  variantLabel: {
    marginBottom: 8,
    fontWeight: '500',
    opacity: 0.8,
  },
});

export default AccordionScreen;