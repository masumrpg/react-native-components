import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
  VScroll,
} from 'rnc-theme';
import {
  Settings,
  User,
  HelpCircle,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Music,
  Image as ImageIcon,
  Smartphone,
  Laptop,
  Headphones,
} from 'lucide-react-native';

const AccordionScreen = () => {
  const { theme } = useTheme();
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const [faqValue, setFaqValue] = useState<string>('');
  const [orderValue, setOrderValue] = useState<string>('');
  const [profileValue, setProfileValue] = useState<string>('');
  const [deviceValue, setDeviceValue] = useState<string[]>([]);
  const [supportValue, setSupportValue] = useState<string>('');
  const [billingValue, setBillingValue] = useState<string>('');
  const [mediaValue, setMediaValue] = useState<string[]>([]);

  const handleMultipleValueChange = (value: string | string[]) => {
    setMultipleValue(Array.isArray(value) ? value : []);
  };

  const handleFaqValueChange = (value: string | string[]) => {
    setFaqValue(typeof value === 'string' ? value : '');
  };

  const handleOrderValueChange = (value: string | string[]) => {
    setOrderValue(typeof value === 'string' ? value : '');
  };

  const handleProfileValueChange = (value: string | string[]) => {
    setProfileValue(typeof value === 'string' ? value : '');
  };

  const handleDeviceValueChange = (value: string | string[]) => {
    setDeviceValue(Array.isArray(value) ? value : []);
  };

  const handleSupportValueChange = (value: string | string[]) => {
    setSupportValue(typeof value === 'string' ? value : '');
  };

  const handleBillingValueChange = (value: string | string[]) => {
    setBillingValue(typeof value === 'string' ? value : '');
  };

  const handleMediaValueChange = (value: string | string[]) => {
    setMediaValue(Array.isArray(value) ? value : []);
  };

  return (
    <VScroll
      style={[styles.container]}
      contentContainerStyle={styles.content}
      themed
    >
      {/* Multiple Selection with Outline Variant */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          📋 Multiple Selection - Outline Style
        </Typography>
        <Accordion
          type="multiple"
          value={multipleValue}
          onValueChange={handleMultipleValueChange}
        >
          <AccordionItem value="feature-1" variant="outline">
            <AccordionTrigger>Premium Features</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography>
                  Unlock advanced features with our premium subscription:
                </Typography>
                <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                  <Typography>• Unlimited cloud storage</Typography>
                  <Typography>• Advanced analytics dashboard</Typography>
                  <Typography>• Priority customer support</Typography>
                  <Typography>• Custom integrations</Typography>
                  <Typography>• Team collaboration tools</Typography>
                </VStack>
                <Button variant="primary" fullWidth>
                  <ButtonText>Upgrade to Premium</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="feature-2" variant="outline">
            <AccordionTrigger>Security & Privacy</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography>Your data security is our top priority:</Typography>
                <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                  <Typography>• End-to-end encryption</Typography>
                  <Typography>• Two-factor authentication</Typography>
                  <Typography>• Regular security audits</Typography>
                  <Typography>• GDPR compliant</Typography>
                  <Typography>• Zero-knowledge architecture</Typography>
                </VStack>
                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Learn More</ButtonText>
                  </Button>
                  <Button variant="success" style={{ flex: 1 }}>
                    <ButtonText>Enable 2FA</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="feature-3" variant="outline">
            <AccordionTrigger>Global Accessibility</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography>
                  Access your data from anywhere in the world:
                </Typography>
                <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                  <Typography>• 99.9% uptime guarantee</Typography>
                  <Typography>• Global CDN network</Typography>
                  <Typography>• Multi-language support</Typography>
                  <Typography>• Mobile & desktop apps</Typography>
                  <Typography>• Offline sync capabilities</Typography>
                </VStack>
                <Typography variant="subtitle" style={{ marginTop: 8 }}>
                  Available in 25+ countries
                </Typography>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* E-commerce Order Tracking */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          🛒 Order Tracking
        </Typography>
        <Accordion
          type="single"
          value={orderValue}
          onValueChange={handleOrderValueChange}
          collapsible
        >
          <AccordionItem value="order-123" variant="primary">
            <AccordionTrigger
              icon={<Package size={20} color={theme.colors.primary} />}
            >
              Order #ORD-2024-001 - iPhone 15 Pro
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Status:</Typography>
                  <HStack spacing="xs" align="center">
                    <CheckCircle size={16} color={theme.colors.success} />
                    <Typography color={theme.colors.success}>
                      Delivered
                    </Typography>
                  </HStack>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Order Date:</Typography>
                  <Typography>March 15, 2024</Typography>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Delivery Date:</Typography>
                  <Typography>March 18, 2024</Typography>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Total Amount:</Typography>
                  <Typography variant="h4" color={theme.colors.primary}>
                    $1,199.00
                  </Typography>
                </HStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Tracking Timeline:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>
                        Order Confirmed - Mar 15, 10:30 AM
                      </Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Processing - Mar 15, 2:15 PM</Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Shipped - Mar 16, 9:00 AM</Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>
                        Out for Delivery - Mar 18, 8:30 AM
                      </Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Delivered - Mar 18, 2:45 PM</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Track Package</ButtonText>
                  </Button>
                  <Button variant="primary" style={{ flex: 1 }}>
                    <ButtonText>Reorder</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="order-124" variant="warning">
            <AccordionTrigger
              icon={<Truck size={20} color={theme.colors.warning} />}
            >
              Order #ORD-2024-002 - MacBook Air M3
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Status:</Typography>
                  <HStack spacing="xs" align="center">
                    <Clock size={16} color={theme.colors.warning} />
                    <Typography color={theme.colors.warning}>
                      In Transit
                    </Typography>
                  </HStack>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Expected Delivery:</Typography>
                  <Typography>March 22, 2024</Typography>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Total Amount:</Typography>
                  <Typography variant="h4" color={theme.colors.primary}>
                    $1,299.00
                  </Typography>
                </HStack>

                <Typography variant="subtitle">Current Location:</Typography>
                <HStack spacing="sm" align="center" style={{ paddingLeft: 16 }}>
                  <MapPin size={14} color={theme.colors.info} />
                  <Typography>Distribution Center - Los Angeles, CA</Typography>
                </HStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>View Live Tracking</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Customer Support FAQ */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          ❓ Frequently Asked Questions
        </Typography>
        <Accordion
          type="single"
          value={faqValue}
          onValueChange={handleFaqValueChange}
          collapsible
        >
          <AccordionItem value="shipping" variant="info">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography>
                  Shipping times vary depending on your location and the
                  shipping method selected:
                </Typography>
                <VStack spacing="sm" style={{ paddingLeft: 16 }}>
                  <Typography>
                    • Standard Shipping: 5-7 business days
                  </Typography>
                  <Typography>• Express Shipping: 2-3 business days</Typography>
                  <Typography>• Overnight Shipping: 1 business day</Typography>
                  <Typography>• International: 7-14 business days</Typography>
                </VStack>
                <Typography>
                  Orders placed before 2 PM EST on weekdays are typically
                  processed the same day. Weekend orders are processed on the
                  next business day.
                </Typography>
                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Track Order</ButtonText>
                  </Button>
                  <Button variant="primary" style={{ flex: 1 }}>
                    <ButtonText>Contact Support</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns" variant="success">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography variant="subtitle">30-Day Return Policy</Typography>
                <Typography>
                  We offer a hassle-free 30-day return policy for most items.
                  Here's what you need to know:
                </Typography>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Eligible Items:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>
                      • Unopened items in original packaging
                    </Typography>
                    <Typography>
                      • Items with all original accessories
                    </Typography>
                    <Typography>• Items without damage or wear</Typography>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Return Process:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>1. Initiate return request online</Typography>
                    <Typography>2. Print prepaid return label</Typography>
                    <Typography>3. Package item securely</Typography>
                    <Typography>
                      4. Drop off at any authorized location
                    </Typography>
                    <Typography>
                      5. Receive refund within 5-7 business days
                    </Typography>
                  </VStack>
                </VStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>Start Return Process</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="warranty" variant="secondary">
            <AccordionTrigger>
              Do you offer warranty on products?
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <Typography>
                  Yes! We provide comprehensive warranty coverage for all our
                  products:
                </Typography>

                <VStack spacing="md">
                  <VStack spacing="sm">
                    <Typography variant="subtitle">
                      Electronics (1-2 Years):
                    </Typography>
                    <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                      <Typography>
                        • Smartphones: 1 year manufacturer warranty
                      </Typography>
                      <Typography>• Laptops & Computers: 1-2 years</Typography>
                      <Typography>• Audio Equipment: 1 year</Typography>
                      <Typography>• Gaming Consoles: 1 year</Typography>
                    </VStack>
                  </VStack>

                  <VStack spacing="sm">
                    <Typography variant="subtitle">
                      Home Appliances (2-5 Years):
                    </Typography>
                    <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                      <Typography>• Kitchen Appliances: 2-3 years</Typography>
                      <Typography>• Washing Machines: 5 years</Typography>
                      <Typography>• Refrigerators: 5 years</Typography>
                    </VStack>
                  </VStack>

                  <VStack spacing="sm">
                    <Typography variant="subtitle">
                      Extended Warranty Available:
                    </Typography>
                    <Typography style={{ paddingLeft: 16 }}>
                      Purchase extended warranty for additional coverage up to 3
                      years.
                    </Typography>
                  </VStack>
                </VStack>

                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Check Warranty</ButtonText>
                  </Button>
                  <Button variant="secondary" style={{ flex: 1 }}>
                    <ButtonText>Buy Extended</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* User Profile Management */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          👤 Profile Management
        </Typography>
        <Accordion
          type="single"
          value={profileValue}
          onValueChange={handleProfileValueChange}
          collapsible
        >
          <AccordionItem value="personal-info" variant="primary">
            <AccordionTrigger
              icon={<User size={20} color={theme.colors.primary} />}
            >
              Personal Information
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <VStack spacing="xs">
                    <Typography variant="subtitle">Full Name</Typography>
                    <Typography>John Doe</Typography>
                  </VStack>
                  <Button size="sm" variant="outline">
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </HStack>

                <HStack justify="space-between" align="center">
                  <VStack spacing="xs">
                    <Typography variant="subtitle">Email Address</Typography>
                    <Typography>john.doe@example.com</Typography>
                  </VStack>
                  <Button size="sm" variant="outline">
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </HStack>

                <HStack justify="space-between" align="center">
                  <VStack spacing="xs">
                    <Typography variant="subtitle">Phone Number</Typography>
                    <Typography>+1 (555) 123-4567</Typography>
                  </VStack>
                  <Button size="sm" variant="outline">
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </HStack>

                <HStack justify="space-between" align="center">
                  <VStack spacing="xs">
                    <Typography variant="subtitle">Date of Birth</Typography>
                    <Typography>January 15, 1990</Typography>
                  </VStack>
                  <Button size="sm" variant="outline">
                    <ButtonText>Edit</ButtonText>
                  </Button>
                </HStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>Save All Changes</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="address" variant="info">
            <AccordionTrigger
              icon={<MapPin size={20} color={theme.colors.info} />}
            >
              Address Book
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <Typography variant="subtitle">
                      Home Address (Default)
                    </Typography>
                    <Button size="sm" variant="outline">
                      <ButtonText>Edit</ButtonText>
                    </Button>
                  </HStack>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>123 Main Street</Typography>
                    <Typography>Apartment 4B</Typography>
                    <Typography>New York, NY 10001</Typography>
                    <Typography>United States</Typography>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <Typography variant="subtitle">Work Address</Typography>
                    <Button size="sm" variant="outline">
                      <ButtonText>Edit</ButtonText>
                    </Button>
                  </HStack>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>456 Business Ave</Typography>
                    <Typography>Suite 200</Typography>
                    <Typography>New York, NY 10002</Typography>
                    <Typography>United States</Typography>
                  </VStack>
                </VStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>Add New Address</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="preferences" variant="secondary">
            <AccordionTrigger
              icon={<Settings size={20} color={theme.colors.secondary} />}
            >
              Preferences & Settings
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <Typography variant="subtitle">Language & Region</Typography>
                  <HStack justify="space-between" align="center">
                    <Typography>Language</Typography>
                    <Typography>English (US)</Typography>
                  </HStack>
                  <HStack justify="space-between" align="center">
                    <Typography>Currency</Typography>
                    <Typography>USD ($)</Typography>
                  </HStack>
                  <HStack justify="space-between" align="center">
                    <Typography>Time Zone</Typography>
                    <Typography>EST (UTC-5)</Typography>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Communication</Typography>
                  <HStack justify="space-between" align="center">
                    <Typography>Email Notifications</Typography>
                    <Button size="sm" variant="success">
                      <ButtonText>Enabled</ButtonText>
                    </Button>
                  </HStack>
                  <HStack justify="space-between" align="center">
                    <Typography>SMS Notifications</Typography>
                    <Button size="sm" variant="outline">
                      <ButtonText>Disabled</ButtonText>
                    </Button>
                  </HStack>
                  <HStack justify="space-between" align="center">
                    <Typography>Marketing Emails</Typography>
                    <Button size="sm" variant="outline">
                      <ButtonText>Disabled</ButtonText>
                    </Button>
                  </HStack>
                </VStack>

                <Button variant="secondary" fullWidth>
                  <ButtonText>Update Preferences</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Device Management */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          📱 Device Management
        </Typography>
        <Accordion
          type="multiple"
          value={deviceValue}
          onValueChange={handleDeviceValueChange}
        >
          <AccordionItem value="mobile-devices" variant="primary">
            <AccordionTrigger
              icon={<Smartphone size={20} color={theme.colors.primary} />}
            >
              Mobile Devices (3)
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">iPhone 15 Pro</Typography>
                      <Typography>
                        iOS 17.3.1 • Last seen: 2 minutes ago
                      </Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Locate</ButtonText>
                      </Button>
                      <Button size="sm" variant="error">
                        <ButtonText>Remove</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        Samsung Galaxy S24
                      </Typography>
                      <Typography>
                        Android 14 • Last seen: 1 hour ago
                      </Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Locate</ButtonText>
                      </Button>
                      <Button size="sm" variant="error">
                        <ButtonText>Remove</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">iPad Air</Typography>
                      <Typography>
                        iPadOS 17.3 • Last seen: 3 days ago
                      </Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Locate</ButtonText>
                      </Button>
                      <Button size="sm" variant="error">
                        <ButtonText>Remove</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>Add New Device</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="computers" variant="info">
            <AccordionTrigger
              icon={<Laptop size={20} color={theme.colors.info} />}
            >
              Computers (2)
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        MacBook Pro 16"
                      </Typography>
                      <Typography>macOS Sonoma 14.3 • Active now</Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="success">
                        <ButtonText>Active</ButtonText>
                      </Button>
                      <Button size="sm" variant="outline">
                        <ButtonText>Manage</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        Windows Desktop
                      </Typography>
                      <Typography>
                        Windows 11 • Last seen: 2 hours ago
                      </Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Wake Up</ButtonText>
                      </Button>
                      <Button size="sm" variant="outline">
                        <ButtonText>Manage</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <Button variant="info" fullWidth>
                  <ButtonText>Add Computer</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accessories" variant="secondary">
            <AccordionTrigger
              icon={<Headphones size={20} color={theme.colors.secondary} />}
            >
              Accessories (4)
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        AirPods Pro (2nd Gen)
                      </Typography>
                      <Typography>Connected • Battery: 85%</Typography>
                    </VStack>
                    <Button size="sm" variant="success">
                      <ButtonText>Connected</ButtonText>
                    </Button>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        Apple Watch Series 9
                      </Typography>
                      <Typography>Connected • Battery: 67%</Typography>
                    </VStack>
                    <Button size="sm" variant="success">
                      <ButtonText>Connected</ButtonText>
                    </Button>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">Magic Keyboard</Typography>
                      <Typography>Connected • Battery: 45%</Typography>
                    </VStack>
                    <Button size="sm" variant="warning">
                      <ButtonText>Low Battery</ButtonText>
                    </Button>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">Magic Mouse</Typography>
                      <Typography>
                        Disconnected • Last seen: 1 day ago
                      </Typography>
                    </VStack>
                    <Button size="sm" variant="outline">
                      <ButtonText>Connect</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Billing & Payments */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          💳 Billing & Payments
        </Typography>
        <Accordion
          type="single"
          value={billingValue}
          onValueChange={handleBillingValueChange}
          collapsible
        >
          <AccordionItem value="payment-methods" variant="primary">
            <AccordionTrigger
              icon={<CreditCard size={20} color={theme.colors.primary} />}
            >
              Payment Methods
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        Visa •••• 4242 (Default)
                      </Typography>
                      <Typography>Expires 12/2027</Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Edit</ButtonText>
                      </Button>
                      <Button size="sm" variant="error">
                        <ButtonText>Remove</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        Mastercard •••• 8888
                      </Typography>
                      <Typography>Expires 08/2026</Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Edit</ButtonText>
                      </Button>
                      <Button size="sm" variant="error">
                        <ButtonText>Remove</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">PayPal Account</Typography>
                      <Typography>john.doe@example.com</Typography>
                    </VStack>
                    <HStack spacing="xs">
                      <Button size="sm" variant="outline">
                        <ButtonText>Edit</ButtonText>
                      </Button>
                      <Button size="sm" variant="error">
                        <ButtonText>Remove</ButtonText>
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>Add Payment Method</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="billing-history" variant="info">
            <AccordionTrigger
              icon={<FileText size={20} color={theme.colors.info} />}
            >
              Billing History
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        March 2024 - Premium Plan
                      </Typography>
                      <Typography>Paid on Mar 1, 2024</Typography>
                    </VStack>
                    <VStack spacing="xs">
                      <Typography variant="h4">$29.99</Typography>
                      <Button size="sm" variant="outline">
                        <ButtonText>Download</ButtonText>
                      </Button>
                    </VStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        February 2024 - Premium Plan
                      </Typography>
                      <Typography>Paid on Feb 1, 2024</Typography>
                    </VStack>
                    <VStack spacing="xs">
                      <Typography variant="h4">$29.99</Typography>
                      <Button size="sm" variant="outline">
                        <ButtonText>Download</ButtonText>
                      </Button>
                    </VStack>
                  </HStack>
                </VStack>

                <VStack spacing="sm">
                  <HStack justify="space-between" align="center">
                    <VStack spacing="xs">
                      <Typography variant="subtitle">
                        January 2024 - Premium Plan
                      </Typography>
                      <Typography>Paid on Jan 1, 2024</Typography>
                    </VStack>
                    <VStack spacing="xs">
                      <Typography variant="h4">$29.99</Typography>
                      <Button size="sm" variant="outline">
                        <ButtonText>Download</ButtonText>
                      </Button>
                    </VStack>
                  </HStack>
                </VStack>

                <Button variant="info" fullWidth>
                  <ButtonText>View All Invoices</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="subscription" variant="success">
            <AccordionTrigger
              icon={<Star size={20} color={theme.colors.success} />}
            >
              Current Subscription
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <Typography variant="h4" color={theme.colors.success}>
                    Premium Plan
                  </Typography>
                  <Typography>$29.99/month • Billed monthly</Typography>
                  <Typography>Next billing date: April 1, 2024</Typography>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Plan Features:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Unlimited storage</Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Priority customer support</Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Advanced analytics</Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>Team collaboration tools</Typography>
                    </HStack>
                    <HStack spacing="sm" align="center">
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Typography>API access</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Change Plan</ButtonText>
                  </Button>
                  <Button variant="error" style={{ flex: 1 }}>
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Media Library */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          🎵 Media Library
        </Typography>
        <Accordion
          type="multiple"
          value={mediaValue}
          onValueChange={handleMediaValueChange}
        >
          <AccordionItem value="photos" variant="primary">
            <AccordionTrigger
              icon={<ImageIcon size={20} color={theme.colors.primary} />}
            >
              Photos (1,247)
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Storage Used</Typography>
                  <Typography>2.3 GB of 15 GB</Typography>
                </HStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Recent Albums:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack justify="space-between" align="center">
                      <Typography>Vacation 2024</Typography>
                      <Typography>156 photos</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Family Events</Typography>
                      <Typography>89 photos</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Work Projects</Typography>
                      <Typography>234 photos</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Upload Photos</ButtonText>
                  </Button>
                  <Button variant="primary" style={{ flex: 1 }}>
                    <ButtonText>Manage Albums</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="videos" variant="info">
            <AccordionTrigger
              icon={<Video size={20} color={theme.colors.info} />}
            >
              Videos (89)
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Storage Used</Typography>
                  <Typography>8.7 GB of 15 GB</Typography>
                </HStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Video Categories:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack justify="space-between" align="center">
                      <Typography>Personal</Typography>
                      <Typography>45 videos</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Work Presentations</Typography>
                      <Typography>23 videos</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Tutorials</Typography>
                      <Typography>21 videos</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Quality Settings:</Typography>
                  <HStack justify="space-between" align="center">
                    <Typography>Auto-backup quality</Typography>
                    <Typography>High (1080p)</Typography>
                  </HStack>
                </VStack>

                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Upload Video</ButtonText>
                  </Button>
                  <Button variant="info" style={{ flex: 1 }}>
                    <ButtonText>Settings</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="music" variant="secondary">
            <AccordionTrigger
              icon={<Music size={20} color={theme.colors.secondary} />}
            >
              Music (2,456 songs)
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <HStack justify="space-between" align="center">
                  <Typography variant="subtitle">Storage Used</Typography>
                  <Typography>12.1 GB of 15 GB</Typography>
                </HStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Recently Played:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack justify="space-between" align="center">
                      <VStack spacing="xs">
                        <Typography>Bohemian Rhapsody</Typography>
                        <Typography style={{ opacity: 0.7 }}>Queen</Typography>
                      </VStack>
                      <Typography>5:55</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <VStack spacing="xs">
                        <Typography>Hotel California</Typography>
                        <Typography style={{ opacity: 0.7 }}>Eagles</Typography>
                      </VStack>
                      <Typography>6:30</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <VStack spacing="xs">
                        <Typography>Imagine</Typography>
                        <Typography style={{ opacity: 0.7 }}>
                          John Lennon
                        </Typography>
                      </VStack>
                      <Typography>3:07</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Playlists:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack justify="space-between" align="center">
                      <Typography>Favorites</Typography>
                      <Typography>127 songs</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Workout Mix</Typography>
                      <Typography>89 songs</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Chill Vibes</Typography>
                      <Typography>156 songs</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <HStack spacing="sm">
                  <Button variant="outline" style={{ flex: 1 }}>
                    <ButtonText>Add Music</ButtonText>
                  </Button>
                  <Button variant="secondary" style={{ flex: 1 }}>
                    <ButtonText>Create Playlist</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Technical Support */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          🛠️ Technical Support
        </Typography>
        <Accordion
          type="single"
          value={supportValue}
          onValueChange={handleSupportValueChange}
          collapsible
        >
          <AccordionItem value="troubleshooting" variant="warning">
            <AccordionTrigger
              icon={<AlertCircle size={20} color={theme.colors.warning} />}
            >
              Common Issues & Troubleshooting
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <Typography variant="subtitle">App Won't Start</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>1. Force close and restart the app</Typography>
                    <Typography>2. Restart your device</Typography>
                    <Typography>3. Check for app updates</Typography>
                    <Typography>4. Clear app cache (Android only)</Typography>
                    <Typography>5. Reinstall the app if needed</Typography>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Sync Issues</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>1. Check internet connection</Typography>
                    <Typography>2. Sign out and sign back in</Typography>
                    <Typography>3. Enable background app refresh</Typography>
                    <Typography>4. Check storage space</Typography>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Performance Issues</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>1. Close other running apps</Typography>
                    <Typography>2. Free up device storage</Typography>
                    <Typography>3. Update to latest OS version</Typography>
                    <Typography>4. Reset app preferences</Typography>
                  </VStack>
                </VStack>

                <Button variant="warning" fullWidth>
                  <ButtonText>Contact Technical Support</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="system-status" variant="success">
            <AccordionTrigger
              icon={<CheckCircle size={20} color={theme.colors.success} />}
            >
              System Status
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <Typography variant="subtitle">
                    All Systems Operational
                  </Typography>
                  <Typography>
                    Last updated: March 20, 2024 at 2:30 PM EST
                  </Typography>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">Service Status:</Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack justify="space-between" align="center">
                      <Typography>API Services</Typography>
                      <HStack spacing="xs" align="center">
                        <CheckCircle size={14} color={theme.colors.success} />
                        <Typography color={theme.colors.success}>
                          Operational
                        </Typography>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Database</Typography>
                      <HStack spacing="xs" align="center">
                        <CheckCircle size={14} color={theme.colors.success} />
                        <Typography color={theme.colors.success}>
                          Operational
                        </Typography>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>File Storage</Typography>
                      <HStack spacing="xs" align="center">
                        <CheckCircle size={14} color={theme.colors.success} />
                        <Typography color={theme.colors.success}>
                          Operational
                        </Typography>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Authentication</Typography>
                      <HStack spacing="xs" align="center">
                        <CheckCircle size={14} color={theme.colors.success} />
                        <Typography color={theme.colors.success}>
                          Operational
                        </Typography>
                      </HStack>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">
                    Performance Metrics:
                  </Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <HStack justify="space-between" align="center">
                      <Typography>Response Time</Typography>
                      <Typography>127ms (Excellent)</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Uptime (30 days)</Typography>
                      <Typography>99.98%</Typography>
                    </HStack>
                    <HStack justify="space-between" align="center">
                      <Typography>Error Rate</Typography>
                      <Typography>0.02%</Typography>
                    </HStack>
                  </VStack>
                </VStack>

                <Button variant="success" fullWidth>
                  <ButtonText>View Detailed Status</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact-support" variant="info">
            <AccordionTrigger
              icon={<HelpCircle size={20} color={theme.colors.info} />}
            >
              Contact Support
            </AccordionTrigger>
            <AccordionContent>
              <VStack spacing="md">
                <VStack spacing="sm">
                  <Typography variant="subtitle">Support Channels:</Typography>

                  <VStack spacing="md">
                    <HStack justify="space-between" align="center">
                      <HStack spacing="sm" align="center">
                        <Mail size={16} color={theme.colors.info} />
                        <VStack spacing="xs">
                          <Typography>Email Support</Typography>
                          <Typography style={{ opacity: 0.7 }}>
                            Response within 24 hours
                          </Typography>
                        </VStack>
                      </HStack>
                      <Button size="sm" variant="info">
                        <ButtonText>Send Email</ButtonText>
                      </Button>
                    </HStack>

                    <HStack justify="space-between" align="center">
                      <HStack spacing="sm" align="center">
                        <Phone size={16} color={theme.colors.success} />
                        <VStack spacing="xs">
                          <Typography>Phone Support</Typography>
                          <Typography style={{ opacity: 0.7 }}>
                            Mon-Fri 9AM-6PM EST
                          </Typography>
                        </VStack>
                      </HStack>
                      <Button size="sm" variant="success">
                        <ButtonText>Call Now</ButtonText>
                      </Button>
                    </HStack>

                    <HStack justify="space-between" align="center">
                      <HStack spacing="sm" align="center">
                        <HelpCircle size={16} color={theme.colors.primary} />
                        <VStack spacing="xs">
                          <Typography>Live Chat</Typography>
                          <Typography style={{ opacity: 0.7 }}>
                            Available 24/7
                          </Typography>
                        </VStack>
                      </HStack>
                      <Button size="sm" variant="primary">
                        <ButtonText>Start Chat</ButtonText>
                      </Button>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="subtitle">
                    Before Contacting Support:
                  </Typography>
                  <VStack spacing="xs" style={{ paddingLeft: 16 }}>
                    <Typography>• Check our FAQ section above</Typography>
                    <Typography>• Try basic troubleshooting steps</Typography>
                    <Typography>
                      • Have your account information ready
                    </Typography>
                    <Typography>
                      • Note any error messages you've seen
                    </Typography>
                  </VStack>
                </VStack>

                <Button variant="primary" fullWidth>
                  <ButtonText>Submit Support Ticket</ButtonText>
                </Button>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      {/* Original Examples for Reference */}
      <Card margin="md">
        <Typography variant="h3" style={styles.sectionTitle}>
          📚 Component Examples
        </Typography>

        {/* Size Variants */}
        <VStack spacing="md">
          <Typography variant="h4">Size Variants</Typography>
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
                      This accordion uses the {size} size variant with
                      appropriate padding and text sizing.
                    </Typography>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </View>
          ))}
        </VStack>

        {/* Variant Styles */}
        <VStack spacing="md" style={{ marginTop: 24 }}>
          <Typography variant="h4">Variant Styles</Typography>
          {(
            [
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
            ] as const
          ).map((variant) => (
            <View key={variant}>
              <Typography variant="subtitle" style={styles.variantLabel}>
                Variant: {variant}
              </Typography>
              <Accordion type="single" collapsible>
                <AccordionItem value={`variant-${variant}`} variant={variant}>
                  <AccordionTrigger>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}{' '}
                    Accordion
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
    </VScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
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