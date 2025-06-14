import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Tooltip,
  Button,
  ButtonText,
  Card,
  CardContent,
  CardHeader,
  Typography,
  VStack,
  HStack,
  Badge,
  Avatar,
  useTheme,
} from 'rnc-theme';
import { Info, Heart, Star, Settings, User } from 'lucide-react-native';

export default function TooltipExample() {
  const { theme } = useTheme();
  const [controlledVisible, setControlledVisible] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: theme.spacing.lg }}
    >
      <VStack spacing="lg">
        {/* Header */}
        <Card>
          <CardHeader>
            <Typography variant="h2" weight="bold">
              Tooltip Component
            </Typography>
            <Typography variant="body" color={theme.colors.textSecondary}>
              Interactive tooltips dengan onLongPress trigger dan berbagai konfigurasi
            </Typography>
          </CardHeader>
        </Card>

        {/* Basic Tooltips */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Basic Tooltips
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" justify="space-around">
                <Tooltip content="Tooltip di atas" position="top">
                  <Button variant="outline" size="sm">
                    <ButtonText>Long Press (Top)</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Tooltip di bawah" position="bottom">
                  <Button variant="outline" size="sm">
                    <ButtonText>Long Press (Bottom)</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>

              <HStack spacing="md" justify="space-around">
                <Tooltip content="Tooltip di kiri" position="left">
                  <Button variant="outline" size="sm">
                    <ButtonText>Long Press (Left)</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Tooltip di kanan" position="right">
                  <Button variant="outline" size="sm">
                    <ButtonText>Long Press (Right)</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* All Sizes */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Semua Ukuran
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="sm" justify="space-around" wrap>
                <Tooltip content="Extra Small" size="xs">
                  <Button variant="primary" size="xs">
                    <ButtonText>XS</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Small tooltip" size="sm">
                  <Button variant="primary" size="sm">
                    <ButtonText>SM</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Medium tooltip" size="md">
                  <Button variant="primary" size="md">
                    <ButtonText>MD</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Large tooltip" size="lg">
                  <Button variant="primary" size="lg">
                    <ButtonText>LG</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Extra Large tooltip" size="xl">
                  <Button variant="primary" size="xl">
                    <ButtonText>XL</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* All Variants */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Semua Varian
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="sm" justify="space-around" wrap>
                <Tooltip content="Default tooltip" variant="default">
                  <Button variant="default" size="sm">
                    <ButtonText>Default</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Primary tooltip" variant="primary">
                  <Button variant="primary" size="sm">
                    <ButtonText>Primary</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Secondary tooltip" variant="secondary">
                  <Button variant="secondary" size="sm">
                    <ButtonText>Secondary</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Success tooltip" variant="success">
                  <Button variant="success" size="sm">
                    <ButtonText>Success</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>

              <HStack spacing="sm" justify="space-around" wrap>
                <Tooltip content="Error tooltip" variant="error">
                  <Button variant="error" size="sm">
                    <ButtonText>Error</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Warning tooltip" variant="warning">
                  <Button variant="warning" size="sm">
                    <ButtonText>Warning</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Info tooltip" variant="info">
                  <Button variant="info" size="sm">
                    <ButtonText>Info</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Outline tooltip" variant="outline">
                  <Button variant="outline" size="sm">
                    <ButtonText>Outline</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>

              <HStack spacing="sm" justify="space-around" wrap>
                <Tooltip content="Filled tooltip" variant="filled">
                  <Button variant="filled" size="sm">
                    <ButtonText>Filled</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Ghost tooltip" variant="ghost">
                  <Button variant="ghost" size="sm">
                    <ButtonText>Ghost</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip content="Destructive tooltip" variant="destructive">
                  <Button variant="destructive" size="sm">
                    <ButtonText>Destructive</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Custom Content */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Custom Content
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" justify="space-around">
                <Tooltip
                  content={
                    <HStack spacing="xs">
                      <Info size={16} color={theme.colors.background} />
                      <Typography
                        variant="small"
                        color={theme.colors.background}
                        weight="500"
                      >
                        Info dengan icon
                      </Typography>
                    </HStack>
                  }
                  variant="info"
                >
                  <Button variant="outline" size="sm">
                    <ButtonText>Custom Content</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip
                  content="Tooltip tanpa arrow"
                  arrow={false}
                  variant="primary"
                >
                  <Button variant="outline" size="sm">
                    <ButtonText>No Arrow</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Controlled Tooltip */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Controlled Tooltip
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" justify="center">
                <Button
                  variant="primary"
                  onPress={() => setControlledVisible(!controlledVisible)}
                >
                  <ButtonText>
                    {controlledVisible ? 'Hide' : 'Show'} Tooltip
                  </ButtonText>
                </Button>
              </HStack>

              <HStack spacing="md" justify="center">
                <Tooltip
                  content="Controlled tooltip visibility"
                  visible={controlledVisible}
                  variant="success"
                >
                  <Badge variant="success">
                    <Typography variant="small" color={theme.colors.background}>
                      Controlled Target
                    </Typography>
                  </Badge>
                </Tooltip>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Real-world Examples */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Real-world Examples
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="lg">
              {/* User Profile */}
              <VStack spacing="sm">
                <Typography variant="subtitle" weight="600">
                  User Profile
                </Typography>
                <HStack spacing="md" align="center">
                  <Tooltip
                    content="John Doe - Senior Developer"
                    position="top"
                    variant="primary"
                  >
                    <Avatar
                      size="md"
                      fallbackText="JD"
                      variant="primary"
                    />
                  </Tooltip>

                  <VStack spacing="xs">
                    <Typography variant="body" weight="600">
                      John Doe
                    </Typography>
                    <Typography variant="small" color={theme.colors.textSecondary}>
                      Long press avatar untuk info
                    </Typography>
                  </VStack>
                </HStack>
              </VStack>

              {/* Action Buttons */}
              <VStack spacing="sm">
                <Typography variant="subtitle" weight="600">
                  Action Buttons
                </Typography>
                <HStack spacing="md" justify="center">
                  <Tooltip content="Add to favorites" variant="error">
                    <Button variant="ghost" size="sm">
                      <Heart size={20} color={theme.colors.error} />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Rate this item" variant="warning">
                    <Button variant="ghost" size="sm">
                      <Star size={20} color={theme.colors.warning} />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Open settings" variant="info">
                    <Button variant="ghost" size="sm">
                      <Settings size={20} color={theme.colors.info} />
                    </Button>
                  </Tooltip>

                  <Tooltip content="View profile" variant="success">
                    <Button variant="ghost" size="sm">
                      <User size={20} color={theme.colors.success} />
                    </Button>
                  </Tooltip>
                </HStack>
              </VStack>

              {/* Status Indicators */}
              <VStack spacing="sm">
                <Typography variant="subtitle" weight="600">
                  Status Indicators
                </Typography>
                <HStack spacing="md" justify="center">
                  <Tooltip
                    content="System is running normally"
                    variant="success"
                    position="top"
                  >
                    <Badge variant="success">
                      <Typography variant="small" color={theme.colors.background}>
                        Online
                      </Typography>
                    </Badge>
                  </Tooltip>

                  <Tooltip
                    content="Maintenance in progress"
                    variant="warning"
                    position="top"
                  >
                    <Badge variant="warning">
                      <Typography variant="small" color={theme.colors.background}>
                        Maintenance
                      </Typography>
                    </Badge>
                  </Tooltip>

                  <Tooltip
                    content="Service unavailable"
                    variant="error"
                    position="top"
                  >
                    <Badge variant="error">
                      <Typography variant="small" color={theme.colors.background}>
                        Offline
                      </Typography>
                    </Badge>
                  </Tooltip>
                </HStack>
              </VStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Configuration Options */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Configuration Options
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" justify="space-around">
                <Tooltip
                  content="Tooltip dengan delay 1 detik"
                  delay={1000}
                  variant="info"
                >
                  <Button variant="outline" size="sm">
                    <ButtonText>Delay 1s</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip
                  content="Tooltip dengan durasi 5 detik"
                  duration={5000}
                  variant="warning"
                >
                  <Button variant="outline" size="sm">
                    <ButtonText>Duration 5s</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>

              <HStack spacing="md" justify="space-around">
                <Tooltip
                  content="Tooltip dengan offset besar"
                  offset={20}
                  variant="primary"
                >
                  <Button variant="outline" size="sm">
                    <ButtonText>Large Offset</ButtonText>
                  </Button>
                </Tooltip>

                <Tooltip
                  content="Tooltip dengan max width kecil"
                  maxWidth={150}
                  variant="secondary"
                >
                  <Button variant="outline" size="sm">
                    <ButtonText>Small Max Width</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Disabled State */}
        <Card>
          <CardHeader>
            <Typography variant="h4" weight="600">
              Disabled State
            </Typography>
          </CardHeader>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" justify="center">
                <Tooltip content="Tooltip ini disabled" disabled>
                  <Button variant="outline" size="sm" disabled>
                    <ButtonText>Disabled Tooltip</ButtonText>
                  </Button>
                </Tooltip>
              </HStack>
              <Typography
                variant="small"
                color={theme.colors.textSecondary}
                align="center"
              >
                Tooltip tidak akan muncul saat disabled
              </Typography>
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    </ScrollView>
  );
}