import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Typography,
  VStack,
  Card,
  CardContent,
} from 'rnc-theme';

export default function SliderExample() {
  const [basicValue, setBasicValue] = useState(30);
  const [primaryValue, setPrimaryValue] = useState(50);
  const [successValue, setSuccessValue] = useState(70);
  const [warningValue, setWarningValue] = useState(40);
  const [errorValue, setErrorValue] = useState(60);
  const [infoValue, setInfoValue] = useState(80);
  const [disabledValue, setDisabledValue] = useState(25);
  const [customRangeValue, setCustomRangeValue] = useState(150);
  const [stepValue, setStepValue] = useState(50);

  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <VStack spacing="lg" padding="md">
          <Typography variant="heading" align="center">
            Slider Component Examples
          </Typography>

          {/* Basic Slider */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Basic Slider</Typography>
                <Typography variant="body" color="#666">
                  Value: {basicValue}
                </Typography>
                <Slider
                  value={basicValue}
                  onValueChange={setBasicValue}
                  onSlidingStart={(value) => console.log('Start:', value)}
                  onSlidingComplete={(value) => console.log('Complete:', value)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </VStack>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Variants</Typography>

                <VStack spacing="sm">
                  <Typography variant="body">
                    Primary ({primaryValue})
                  </Typography>
                  <Slider
                    variant="primary"
                    value={primaryValue}
                    onValueChange={setPrimaryValue}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="body">
                    Success ({successValue})
                  </Typography>
                  <Slider
                    variant="success"
                    value={successValue}
                    onValueChange={setSuccessValue}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="body">
                    Warning ({warningValue})
                  </Typography>
                  <Slider
                    variant="warning"
                    value={warningValue}
                    onValueChange={setWarningValue}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="body">Error ({errorValue})</Typography>
                  <Slider
                    variant="error"
                    value={errorValue}
                    onValueChange={setErrorValue}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="body">Info ({infoValue})</Typography>
                  <Slider
                    variant="info"
                    value={infoValue}
                    onValueChange={setInfoValue}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Sizes</Typography>

                <VStack spacing="sm">
                  <Typography variant="body">Small</Typography>
                  <Slider size="sm" variant="primary" defaultValue={30}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="body">Medium (Default)</Typography>
                  <Slider size="md" variant="primary" defaultValue={50}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>

                <VStack spacing="sm">
                  <Typography variant="body">Large</Typography>
                  <Slider size="lg" variant="primary" defaultValue={70}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              </VStack>
            </CardContent>
          </Card>

          {/* Disabled State */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Disabled State</Typography>
                <Typography variant="body" color="#666">
                  Value: {disabledValue}
                </Typography>
                <Slider
                  disabled
                  value={disabledValue}
                  onValueChange={setDisabledValue}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </VStack>
            </CardContent>
          </Card>

          {/* Custom Range */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Custom Range (0-200)</Typography>
                <Typography variant="body" color="#666">
                  Value: {customRangeValue}
                </Typography>
                <Slider
                  min={0}
                  max={200}
                  value={customRangeValue}
                  onValueChange={setCustomRangeValue}
                  variant="success"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </VStack>
            </CardContent>
          </Card>

          {/* Step Value */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Step Value (10)</Typography>
                <Typography variant="body" color="#666">
                  Value: {stepValue}
                </Typography>
                <Slider
                  step={10}
                  value={stepValue}
                  onValueChange={setStepValue}
                  variant="warning"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </VStack>
            </CardContent>
          </Card>

          {/* Custom Colors */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Custom Colors</Typography>
                <Slider defaultValue={60}>
                  <SliderTrack>
                    <SliderFilledTrack color="#9333EA" />
                  </SliderTrack>
                  <SliderThumb color="#9333EA" />
                </Slider>
              </VStack>
            </CardContent>
          </Card>

          {/* Without Animation */}
          <Card>
            <CardContent>
              <VStack spacing="md">
                <Typography variant="subtitle">Without Animation</Typography>
                <Slider animated={false} defaultValue={40} variant="error">
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </VStack>
            </CardContent>
          </Card>
        </VStack>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});