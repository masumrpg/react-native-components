import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Checkbox,
  CheckboxGroup,
  VStack,
  HStack,
  Typography,
  Card,
} from 'rnc-theme';

export default function CheckboxScreen() {
  // Individual checkbox states
  const [singleChecked, setSingleChecked] = useState(false);
  const [primaryChecked, setPrimaryChecked] = useState(true);
  const [successChecked, setSuccessChecked] = useState(false);
  const [warningChecked, setWarningChecked] = useState(true);
  const [errorChecked, setErrorChecked] = useState(false);

  // Group checkbox states
  const [selectedValues, setSelectedValues] = useState<string[]>(['option2']);
  const [sizeValues, setSizeValues] = useState<string[]>(['medium']);
  const [shapeValues, setShapeValues] = useState<string[]>(['round']);
  const [settingsValues, setSettingsValues] = useState<string[]>(['notifications', 'location']);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <VStack spacing="lg" style={{ padding: 16 }}>
        <Typography variant="title" style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
          Checkbox Examples
        </Typography>

        {/* Basic Individual Checkboxes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
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

              <Checkbox
                value="disabled"
                checked={false}
                disabled
              >
                Disabled Checkbox
              </Checkbox>

              <Checkbox
                value="disabled-checked"
                checked={true}
                disabled
              >
                Disabled Checked
              </Checkbox>
            </VStack>
          </VStack>
        </Card>

        {/* Variants */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Variants
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
            </VStack>
          </VStack>
        </Card>

        {/* Shapes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Shapes
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
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
                  <Checkbox value="square-warning" shape="square" variant="warning">
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

        {/* Sizes */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Sizes
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {sizeValues.join(', ') || 'None'}
            </Typography>

            <CheckboxGroup value={sizeValues} onValueChange={setSizeValues}>
              <VStack spacing="sm">
                <Checkbox value="small" size="sm" variant="primary">
                  Small Checkbox
                </Checkbox>

                <Checkbox value="medium" size="md" variant="primary">
                  Medium Checkbox
                </Checkbox>

                <Checkbox value="large" size="lg" variant="primary">
                  Large Checkbox
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>

        {/* Size & Shape Combinations */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Size & Shape Combinations
            </Typography>

            <VStack spacing="sm">
              <HStack spacing="lg">
                <Checkbox value="sm-square" size="sm" shape="square" variant="primary" checked>
                  Small Square
                </Checkbox>

                <Checkbox value="sm-round" size="sm" shape="round" variant="success" checked>
                  Small Round
                </Checkbox>
              </HStack>

              <HStack spacing="lg">
                <Checkbox value="md-square" size="md" shape="square" variant="warning" checked>
                  Medium Square
                </Checkbox>

                <Checkbox value="md-round" size="md" shape="round" variant="error" checked>
                  Medium Round
                </Checkbox>
              </HStack>

              <HStack spacing="lg">
                <Checkbox value="lg-square" size="lg" shape="square" variant="primary" checked>
                  Large Square
                </Checkbox>

                <Checkbox value="lg-round" size="lg" shape="round" variant="success" checked>
                  Large Round
                </Checkbox>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* Group Example */}
        <Card style={{ padding: 16 }}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Checkbox Group
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Selected: {selectedValues.join(', ') || 'None'}
            </Typography>

            <CheckboxGroup value={selectedValues} onValueChange={setSelectedValues}>
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
            <Typography variant="subtitle" style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
              Settings Example
            </Typography>
            <Typography variant="body" style={{ color: '#666', marginBottom: 12 }}>
              Configure your app preferences
            </Typography>

            <CheckboxGroup value={settingsValues} onValueChange={setSettingsValues}>
              <VStack spacing="sm">
                <Checkbox value="notifications" variant="primary" shape="round">
                  Push Notifications
                </Checkbox>

                <Checkbox value="email" variant="primary" shape="square">
                  Email Updates
                </Checkbox>

                <Checkbox value="location" variant="warning" shape="round">
                  Location Services
                </Checkbox>

                <Checkbox value="analytics" variant="error" shape="square">
                  Analytics & Tracking
                </Checkbox>
              </VStack>
            </CheckboxGroup>
          </VStack>
        </Card>
      </VStack>
    </ScrollView>
  );
}