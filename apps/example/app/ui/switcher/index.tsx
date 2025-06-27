import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Switcher,
  SwitcherLabel,
  VStack,
  HStack,
  Typography,
  Card,
  CardContent,
  CardHeader,
  VScroll,
} from 'rnc-theme';

const SwitcherScreen = () => {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [primarySwitch, setPrimarySwitch] = useState(true);
  const [secondarySwitch, setSecondarySwitch] = useState(false);
  const [outlineSwitch, setOutlineSwitch] = useState(true);
  const [filledSwitch, setFilledSwitch] = useState(false);
  const [ghostSwitch, setGhostSwitch] = useState(true);
  const [successSwitch, setSuccessSwitch] = useState(false);
  const [warningSwitch, setWarningSwitch] = useState(true);
  const [errorSwitch, setErrorSwitch] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(true);
  const [destructiveSwitch, setDestructiveSwitch] = useState(false);
  const [disabledSwitch, setDisabledSwitch] = useState(true);
  const [customColorSwitch, setCustomColorSwitch] = useState(false);
  const [notificationSwitch, setNotificationSwitch] = useState(true);
  const [darkModeSwitch, setDarkModeSwitch] = useState(false);
  const [locationSwitch, setLocationSwitch] = useState(false);
  const [disabledOffSwitch, setDisabledOffSwitch] = useState(false);

  return (
    <VScroll themed style={styles.container}>
      <VStack spacing="lg" padding="md">
        {/* Basic Examples */}
        <Card>
          <CardHeader title="Basic Switcher" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Basic Switch</Typography>
                <Switcher value={basicSwitch} onValueChange={setBasicSwitch} />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>With Label (Left)</Typography>
                <HStack align="center">
                  <SwitcherLabel position="left">
                    <Typography variant="body">Enable</Typography>
                  </SwitcherLabel>
                  <Switcher
                    value={primarySwitch}
                    onValueChange={setPrimarySwitch}
                    variant="primary"
                  />
                </HStack>
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Size Variants */}
        <Card>
          <CardHeader title="Size Variants" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Extra Small (xs)</Typography>
                <Switcher
                  size="xs"
                  value={basicSwitch}
                  onValueChange={setBasicSwitch}
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Small (sm)</Typography>
                <Switcher
                  size="sm"
                  value={primarySwitch}
                  onValueChange={setPrimarySwitch}
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Medium (md) - Default</Typography>
                <Switcher
                  size="md"
                  value={successSwitch}
                  onValueChange={setSuccessSwitch}
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Large (lg)</Typography>
                <Switcher
                  size="lg"
                  value={warningSwitch}
                  onValueChange={setWarningSwitch}
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Extra Large (xl)</Typography>
                <Switcher
                  size="xl"
                  value={errorSwitch}
                  onValueChange={setErrorSwitch}
                  variant="primary"
                />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Variant Showcase */}
        <Card>
          <CardHeader title="All Variants" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Default</Typography>
                <Switcher
                  value={basicSwitch}
                  onValueChange={setBasicSwitch}
                  variant="default"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Primary</Typography>
                <Switcher
                  value={primarySwitch}
                  onValueChange={setPrimarySwitch}
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Secondary</Typography>
                <Switcher
                  value={secondarySwitch}
                  onValueChange={setSecondarySwitch}
                  variant="secondary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Outline</Typography>
                <Switcher
                  value={outlineSwitch}
                  onValueChange={setOutlineSwitch}
                  variant="outline"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Filled</Typography>
                <Switcher
                  value={filledSwitch}
                  onValueChange={setFilledSwitch}
                  variant="filled"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Ghost</Typography>
                <Switcher
                  value={ghostSwitch}
                  onValueChange={setGhostSwitch}
                  variant="ghost"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Success</Typography>
                <Switcher
                  value={successSwitch}
                  onValueChange={setSuccessSwitch}
                  variant="success"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Warning</Typography>
                <Switcher
                  value={warningSwitch}
                  onValueChange={setWarningSwitch}
                  variant="warning"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Error</Typography>
                <Switcher
                  value={errorSwitch}
                  onValueChange={setErrorSwitch}
                  variant="error"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Info</Typography>
                <Switcher
                  value={infoSwitch}
                  onValueChange={setInfoSwitch}
                  variant="info"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Destructive</Typography>
                <Switcher
                  value={destructiveSwitch}
                  onValueChange={setDestructiveSwitch}
                  variant="destructive"
                />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Custom Colors */}
        <Card>
          <CardHeader title="Custom Colors" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Custom Track Colors</Typography>
                <Switcher
                  value={customColorSwitch}
                  onValueChange={setCustomColorSwitch}
                  trackColor={{
                    false: '#FFE4E1',
                    true: '#98FB98',
                  }}
                  thumbColor="#FF6347"
                />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader title="States" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <Typography>Disabled (On)</Typography>
                <Switcher
                  value={disabledSwitch}
                  onValueChange={setDisabledSwitch}
                  disabled
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Disabled (Off)</Typography>
                <Switcher
                  value={disabledOffSwitch}
                  onValueChange={setDisabledOffSwitch}
                  disabled
                  variant="primary"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <Typography>Non-animated</Typography>
                <Switcher
                  value={basicSwitch}
                  onValueChange={setBasicSwitch}
                  animated={false}
                  variant="primary"
                />
              </HStack>
            </VStack>
          </CardContent>
        </Card>

        {/* Real-world Examples */}
        <Card>
          <CardHeader title="Real-world Examples" />
          <CardContent>
            <VStack spacing="md">
              <HStack justify="space-between" align="center">
                <VStack spacing="xs">
                  <Typography weight="600">Push Notifications</Typography>
                  <Typography variant="small" color="textSecondary">
                    Receive notifications about new messages
                  </Typography>
                </VStack>
                <Switcher
                  value={notificationSwitch}
                  onValueChange={setNotificationSwitch}
                  variant="primary"
                  size="md"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <VStack spacing="xs">
                  <Typography weight="600">Dark Mode</Typography>
                  <Typography variant="small" color="textSecondary">
                    Switch to dark theme
                  </Typography>
                </VStack>
                <Switcher
                  value={darkModeSwitch}
                  onValueChange={setDarkModeSwitch}
                  variant="default"
                  size="lg"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <VStack spacing="xs">
                  <Typography weight="600">Location Services</Typography>
                  <Typography variant="small" color="textSecondary">
                    Allow app to access your location
                  </Typography>
                </VStack>
                <Switcher
                  value={locationSwitch}
                  onValueChange={setLocationSwitch}
                  variant="success"
                  size="md"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <VStack spacing="xs">
                  <Typography weight="600">Auto-save</Typography>
                  <Typography variant="small" color="textSecondary">
                    Automatically save your work
                  </Typography>
                </VStack>
                <Switcher
                  value={infoSwitch}
                  onValueChange={setInfoSwitch}
                  variant="info"
                  size="sm"
                />
              </HStack>

              <HStack justify="space-between" align="center">
                <VStack spacing="xs">
                  <Typography weight="600">Delete Account</Typography>
                  <Typography variant="small" color="textSecondary">
                    Permanently delete your account
                  </Typography>
                </VStack>
                <Switcher
                  value={destructiveSwitch}
                  onValueChange={setDestructiveSwitch}
                  variant="destructive"
                  size="md"
                />
              </HStack>
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    </VScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SwitcherScreen;