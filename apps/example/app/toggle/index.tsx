import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  ToggleMode,
  VStack,
  HStack,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
} from 'rnc-theme';

const ToggleScreen = () => {
  const { isDark } = useTheme();

  return (
    <ScrollView style={styles.container}>
      <VStack spacing="lg" padding="md">
        {/* Current Theme Info */}
        <Card>
          <CardHeader title="Current Theme" />
          <CardContent>
            <Typography variant="body">
              Current Mode: {isDark ? 'Dark' : 'Light'}
            </Typography>
          </CardContent>
        </Card>

        {/* Basic Toggle Examples */}
        <Card>
          <CardHeader title="Basic Toggle Mode" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Default Toggle</Typography>
                <ToggleMode />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Small Size</Typography>
                <ToggleMode size="sm" />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Large Size</Typography>
                <ToggleMode size="lg" />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Variant Examples */}
        <Card>
          <CardHeader title="Toggle Variants" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Rounded (Default)</Typography>
                <ToggleMode variant="rounded" />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Square</Typography>
                <ToggleMode variant="square" />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Style Examples */}
        <Card>
          <CardHeader title="Toggle Styles" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Filled (Default)</Typography>
                <ToggleMode styleType="filled" />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Outlined</Typography>
                <ToggleMode styleType="outlined" />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Ghost</Typography>
                <ToggleMode styleType="ghost" />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Custom Examples */}
        <Card>
          <CardHeader title="Custom Toggle" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Custom Icon Size</Typography>
                <ToggleMode iconSize={32} />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Custom Padding</Typography>
                <ToggleMode padding={20} />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>No Animation</Typography>
                <ToggleMode animated={false} />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Disabled State */}
        <Card>
          <CardHeader title="Disabled State" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Disabled Toggle</Typography>
                <ToggleMode disabled />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* System Mode Examples */}
        <Card>
          <CardHeader title="System Mode Support" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>With System Mode</Typography>
                <ToggleMode enableSystemMode />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Without System Mode (Default)</Typography>
                <ToggleMode enableSystemMode={false} />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Combined Examples */}
        <Card>
          <CardHeader title="Combined Styles" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Large + Square + Outlined</Typography>
                <ToggleMode size="lg" variant="square" styleType="outlined" />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Small + Rounded + Ghost</Typography>
                <ToggleMode size="sm" variant="rounded" styleType="ghost" />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Custom Everything</Typography>
                <ToggleMode
                  size="md"
                  variant="square"
                  styleType="filled"
                  iconSize={28}
                  padding={16}
                  enableSystemMode
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </HStack>
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ToggleScreen;