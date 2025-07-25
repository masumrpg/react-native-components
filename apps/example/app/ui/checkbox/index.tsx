import React, { useState } from 'react';
import {
  Checkbox,
  CheckboxGroup,
  VStack,
  HStack,
  Typography,
  Card,
  VScroll,
  useTheme,
} from 'rnc-theme';

export default function CheckboxScreen() {
  const { theme } = useTheme();
  // Individual checkbox states
  const [singleChecked, setSingleChecked] = useState(false);
  const [primaryChecked, setPrimaryChecked] = useState(true);
  const [successChecked, setSuccessChecked] = useState(false);
  const [warningChecked, setWarningChecked] = useState(true);
  const [errorChecked, setErrorChecked] = useState(false);
  const [infoChecked, setInfoChecked] = useState(false);
  const [destructiveChecked, setDestructiveChecked] = useState(true);

  // Group checkbox states
  const [selectedValues, setSelectedValues] = useState<string[]>(['option2']);
  const [sizeValues, setSizeValues] = useState<string[]>(['medium']);
  const [shapeValues, setShapeValues] = useState<string[]>(['round']);
  const [variantValues, setVariantValues] = useState<string[]>([
    'primary',
    'outline',
  ]);
  const [settingsValues, setSettingsValues] = useState<string[]>([
    'notifications',
    'location',
  ]);

  return (
    <VScroll style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <VStack spacing="lg" style={{ padding: 16 }}>
        {/* Size Comparison */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Size Comparison
            </Typography>

            <VStack spacing="sm">
              <Checkbox value="xs" size="xs" variant="primary" checked>
                Extra Small (xs)
              </Checkbox>

              <Checkbox value="sm" size="sm" variant="primary" checked>
                Small (sm)
              </Checkbox>

              <Checkbox value="md" size="md" variant="primary" checked>
                Medium (md)
              </Checkbox>

              <Checkbox value="lg" size="lg" variant="primary" checked>
                Large (lg)
              </Checkbox>

              <Checkbox value="xl" size="xl" variant="primary" checked>
                Extra Large (xl)
              </Checkbox>
            </VStack>
          </VStack>
        </Card>

        {/* All Variants */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              All Variants
            </Typography>

            <CheckboxGroup
              value={variantValues}
              onValueChange={setVariantValues}
            >
              <VStack spacing="sm">
                <HStack spacing="lg">
                  <Checkbox value="default" variant="default">
                    Default
                  </Checkbox>

                  <Checkbox value="primary" variant="primary">
                    Primary
                  </Checkbox>
                </HStack>

                <HStack spacing="lg">
                  <Checkbox value="secondary" variant="secondary">
                    Secondary
                  </Checkbox>

                  <Checkbox value="outline" variant="outline">
                    Outline
                  </Checkbox>
                </HStack>

                <HStack spacing="lg">
                  <Checkbox value="filled" variant="filled">
                    Filled
                  </Checkbox>

                  <Checkbox value="ghost" variant="ghost">
                    Ghost
                  </Checkbox>
                </HStack>

                <HStack spacing="lg">
                  <Checkbox value="success" variant="success">
                    Success
                  </Checkbox>

                  <Checkbox value="info" variant="info">
                    Info
                  </Checkbox>
                </HStack>

                <HStack spacing="lg">
                  <Checkbox value="warning" variant="warning">
                    Warning
                  </Checkbox>

                  <Checkbox value="error" variant="error">
                    Error
                  </Checkbox>
                </HStack>

                <Checkbox value="destructive" variant="destructive">
                  Destructive
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>

        {/* Basic Individual Checkboxes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Basic Checkboxes
            </Typography>

            <VStack spacing="sm">
              <Checkbox
                value="single"
                checked={singleChecked}
                onCheckedChange={setSingleChecked}
              >
                Single Checkbox
              </Checkbox>

              <Checkbox value="disabled" checked={false} disabled>
                Disabled Checkbox
              </Checkbox>

              <Checkbox value="disabled-checked" checked={true} disabled>
                Disabled Checked
              </Checkbox>
            </VStack>
          </VStack>
        </Card>

        {/* Enhanced Variants */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Enhanced Variants
            </Typography>

            <VStack spacing="sm">
              <Checkbox
                value="primary"
                variant="primary"
                checked={primaryChecked}
                onCheckedChange={setPrimaryChecked}
              >
                Primary Checkbox
              </Checkbox>

              <Checkbox
                value="success"
                variant="success"
                checked={successChecked}
                onCheckedChange={setSuccessChecked}
              >
                Success Checkbox
              </Checkbox>

              <Checkbox
                value="info"
                variant="info"
                checked={infoChecked}
                onCheckedChange={setInfoChecked}
              >
                Info Checkbox
              </Checkbox>

              <Checkbox
                value="warning"
                variant="warning"
                checked={warningChecked}
                onCheckedChange={setWarningChecked}
              >
                Warning Checkbox
              </Checkbox>

              <Checkbox
                value="error"
                variant="error"
                checked={errorChecked}
                onCheckedChange={setErrorChecked}
              >
                Error Checkbox
              </Checkbox>

              <Checkbox
                value="destructive"
                variant="destructive"
                checked={destructiveChecked}
                onCheckedChange={setDestructiveChecked}
              >
                Destructive Checkbox
              </Checkbox>
            </VStack>
          </VStack>
        </Card>

        {/* Shapes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Shapes
            </Typography>
            <Typography
              variant="body"
              style={{ color: '#666', marginBottom: 12 }}
            >
              Selected: {shapeValues.join(', ') || 'None'}
            </Typography>

            <CheckboxGroup value={shapeValues} onValueChange={setShapeValues}>
              <VStack spacing="sm">
                <HStack spacing="lg">
                  <Checkbox value="square" shape="square" variant="primary">
                    Square Shape
                  </Checkbox>

                  <Checkbox value="round" shape="round" variant="success">
                    Round Shape
                  </Checkbox>
                </HStack>

                <HStack spacing="lg">
                  <Checkbox
                    value="square-warning"
                    shape="square"
                    variant="warning"
                  >
                    Square Warning
                  </Checkbox>

                  <Checkbox value="round-error" shape="round" variant="error">
                    Round Error
                  </Checkbox>
                </HStack>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>

        {/* All Sizes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              All Sizes
            </Typography>
            <Typography
              variant="body"
              style={{ color: '#666', marginBottom: 12 }}
            >
              Selected: {sizeValues.join(', ') || 'None'}
            </Typography>

            <CheckboxGroup value={sizeValues} onValueChange={setSizeValues}>
              <VStack spacing="sm">
                <Checkbox value="extra-small" size="xs" variant="primary">
                  Extra Small Checkbox
                </Checkbox>

                <Checkbox value="small" size="sm" variant="primary">
                  Small Checkbox
                </Checkbox>

                <Checkbox value="medium" size="md" variant="primary">
                  Medium Checkbox
                </Checkbox>

                <Checkbox value="large" size="lg" variant="primary">
                  Large Checkbox
                </Checkbox>

                <Checkbox value="extra-large" size="xl" variant="primary">
                  Extra Large Checkbox
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>

        {/* Size & Shape Combinations */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Size & Shape Combinations
            </Typography>

            <VStack spacing="sm">
              <HStack spacing="lg">
                <Checkbox
                  value="xs-square"
                  size="xs"
                  shape="square"
                  variant="primary"
                  checked
                >
                  XS Square
                </Checkbox>

                <Checkbox
                  value="xs-round"
                  size="xs"
                  shape="round"
                  variant="success"
                  checked
                >
                  XS Round
                </Checkbox>
              </HStack>

              <HStack spacing="lg">
                <Checkbox
                  value="sm-square"
                  size="sm"
                  shape="square"
                  variant="primary"
                  checked
                >
                  Small Square
                </Checkbox>

                <Checkbox
                  value="sm-round"
                  size="sm"
                  shape="round"
                  variant="success"
                  checked
                >
                  Small Round
                </Checkbox>
              </HStack>

              <HStack spacing="lg">
                <Checkbox
                  value="md-square"
                  size="md"
                  shape="square"
                  variant="warning"
                  checked
                >
                  Medium Square
                </Checkbox>

                <Checkbox
                  value="md-round"
                  size="md"
                  shape="round"
                  variant="error"
                  checked
                >
                  Medium Round
                </Checkbox>
              </HStack>

              <HStack spacing="lg">
                <Checkbox
                  value="lg-square"
                  size="lg"
                  shape="square"
                  variant="primary"
                  checked
                >
                  Large Square
                </Checkbox>

                <Checkbox
                  value="lg-round"
                  size="lg"
                  shape="round"
                  variant="success"
                  checked
                >
                  Large Round
                </Checkbox>
              </HStack>

              <HStack spacing="lg">
                <Checkbox
                  value="xl-square"
                  size="xl"
                  shape="square"
                  variant="info"
                  checked
                >
                  XL Square
                </Checkbox>

                <Checkbox
                  value="xl-round"
                  size="xl"
                  shape="round"
                  variant="destructive"
                  checked
                >
                  XL Round
                </Checkbox>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* Group Example */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Checkbox Group
            </Typography>
            <Typography
              variant="body"
              style={{ color: '#666', marginBottom: 12 }}
            >
              Selected: {selectedValues.join(', ') || 'None'}
            </Typography>

            <CheckboxGroup
              value={selectedValues}
              onValueChange={setSelectedValues}
            >
              <VStack spacing="sm">
                <Checkbox value="option1" variant="primary">
                  Option 1
                </Checkbox>

                <Checkbox value="option2" variant="primary">
                  Option 2
                </Checkbox>

                <Checkbox value="option3" variant="primary">
                  Option 3
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>

        {/* Real-world Example */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography
              variant="subtitle"
              style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}
            >
              Settings Example
            </Typography>
            <Typography
              variant="body"
              style={{ color: '#666', marginBottom: 12 }}
            >
              Configure your app preferences
            </Typography>

            <CheckboxGroup
              value={settingsValues}
              onValueChange={setSettingsValues}
            >
              <VStack spacing="sm">
                <Checkbox value="notifications" variant="primary" shape="round">
                  Push Notifications
                </Checkbox>

                <Checkbox value="email" variant="outline" shape="square">
                  Email Updates
                </Checkbox>

                <Checkbox value="location" variant="warning" shape="round">
                  Location Services
                </Checkbox>

                <Checkbox
                  value="analytics"
                  variant="destructive"
                  shape="square"
                >
                  Analytics & Tracking
                </Checkbox>

                <Checkbox value="privacy" variant="ghost" shape="round">
                  Privacy Mode
                </Checkbox>

                <Checkbox value="sync" variant="filled" shape="square">
                  Auto Sync
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>
      </VStack>
    </VScroll>
  );
}
