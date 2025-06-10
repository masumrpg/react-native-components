import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Slider,
  RangeSlider,
  VStack,
  Card,
  Typography,
  useThemedStyles,
  Theme,
} from 'rnc-theme';

export default function SliderScreen() {
  const styles = useThemedStyles(createStyles);
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValues, setRangeValues] = useState({ min: 20, max: 80 });
  const [customSliderValue, setCustomSliderValue] = useState(25);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <VStack spacing="lg">
          <Typography variant="title" style={styles.title}>
            Slider Examples
          </Typography>

          {/* Basic Slider */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Basic Slider
              </Typography>
              <Typography variant="body" style={styles.valueText}>
                Value: {sliderValue}
              </Typography>
              <Slider
                initialValue={sliderValue}
                min={0}
                max={100}
                step={1}
                onValueChange={setSliderValue}
                showLabel={true}
                width={300}
              />
            </VStack>
          </Card>

          {/* Custom Styled Slider */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Custom Styled Slider
              </Typography>
              <Typography variant="body" style={styles.valueText}>
                Value: {customSliderValue}
              </Typography>
              <Slider
                initialValue={customSliderValue}
                min={0}
                max={50}
                step={5}
                onValueChange={setCustomSliderValue}
                showLabel={true}
                width={300}
                thumbSize={24}
                activeTrackColor="#FF6B6B"
                trackColor="#E0E0E0"
                thumbColor="#FFFFFF"
                labelFormatter={(value) => `${value}%`}
              />
            </VStack>
          </Card>

          {/* Range Slider */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Range Slider
              </Typography>
              <Typography variant="body" style={styles.valueText}>
                Range: {rangeValues.min} - {rangeValues.max}
              </Typography>
              <RangeSlider
                initialMinValue={rangeValues.min}
                initialMaxValue={rangeValues.max}
                min={0}
                max={100}
                step={5}
                minDistance={10}
                onValueChange={setRangeValues}
                showLabels={true}
                width={300}
                labelFormatter={(value) => `${value}`}
              />
            </VStack>
          </Card>

          {/* Disabled Slider */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Disabled Slider
              </Typography>
              <Slider
                initialValue={30}
                min={0}
                max={100}
                disabled={true}
                width={300}
                trackColor="#F0F0F0"
                activeTrackColor="#CCCCCC"
                thumbColor="#DDDDDD"
              />
            </VStack>
          </Card>

          {/* Small Step Slider */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Precision Slider (0.1 step)
              </Typography>
              <Slider
                initialValue={2.5}
                min={0}
                max={5}
                step={0.1}
                onValueChange={(value) =>
                  console.log('Precision value:', value)
                }
                showLabel={true}
                width={300}
                labelFormatter={(value) => value.toFixed(1)}
              />
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
    marginBottom: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.md,
    alignItems: 'center' as const,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: theme.typography.subtitle.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  valueText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    fontFamily: 'monospace',
    textAlign: 'center' as const,
  },
});
