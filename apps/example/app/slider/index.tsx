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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <VStack spacing="lg">
          <Typography variant="title" style={styles.title}>
            Slider Examples
          </Typography>

          {/* Size Showcase */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Sizes
              </Typography>
              <VStack spacing="sm">
                <Typography variant="subtitle">Extra Small (xs)</Typography>
                <Slider
                  size="xs"
                  initialValue={30}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Small (sm)</Typography>
                <Slider
                  size="sm"
                  initialValue={40}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Medium (md)</Typography>
                <Slider
                  size="md"
                  initialValue={50}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Large (lg)</Typography>
                <Slider
                  size="lg"
                  initialValue={60}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Extra Large (xl)</Typography>
                <Slider
                  size="xl"
                  initialValue={70}
                  min={0}
                  max={100}
                  width={280}
                />
              </VStack>
            </VStack>
          </Card>

          {/* Variant Showcase */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Variants
              </Typography>
              <VStack spacing="sm">
                <Typography variant="subtitle">Default</Typography>
                <Slider
                  variant="default"
                  initialValue={50}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Primary</Typography>
                <Slider
                  variant="primary"
                  initialValue={60}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Secondary</Typography>
                <Slider
                  variant="secondary"
                  initialValue={40}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Success</Typography>
                <Slider
                  variant="success"
                  initialValue={75}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Error</Typography>
                <Slider
                  variant="error"
                  initialValue={25}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Warning</Typography>
                <Slider
                  variant="warning"
                  initialValue={80}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Info</Typography>
                <Slider
                  variant="info"
                  initialValue={65}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Destructive</Typography>
                <Slider
                  variant="destructive"
                  initialValue={30}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Outline</Typography>
                <Slider
                  variant="outline"
                  initialValue={45}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Filled</Typography>
                <Slider
                  variant="filled"
                  initialValue={55}
                  min={0}
                  max={100}
                  width={280}
                />

                <Typography variant="subtitle">Ghost</Typography>
                <Slider
                  variant="ghost"
                  initialValue={35}
                  min={0}
                  max={100}
                  width={280}
                />
              </VStack>
            </VStack>
          </Card>

          {/* Interactive Examples */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Interactive Slider
              </Typography>
              <Typography variant="body" style={styles.valueText}>
                Value: {sliderValue}
              </Typography>
              <Slider
                variant="primary"
                size="lg"
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

          {/* Range Slider Examples */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Range Slider
              </Typography>
              <Typography variant="body" style={styles.valueText}>
                Range: {rangeValues.min} - {rangeValues.max}
              </Typography>
              <RangeSlider
                variant="success"
                size="md"
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

          {/* Real-world Examples */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Volume Control
              </Typography>
              <Slider
                variant="info"
                size="md"
                initialValue={75}
                min={0}
                max={100}
                step={5}
                showLabel={true}
                width={300}
                labelFormatter={(value) => `${value}%`}
              />
            </VStack>
          </Card>

          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Price Range Filter
              </Typography>
              <RangeSlider
                variant="secondary"
                size="sm"
                initialMinValue={100}
                initialMaxValue={500}
                min={0}
                max={1000}
                step={10}
                minDistance={50}
                showLabels={true}
                width={300}
                labelFormatter={(value) => `$${value}`}
              />
            </VStack>
          </Card>

          {/* Disabled State */}
          <Card style={styles.card}>
            <VStack spacing="md">
              <Typography variant="subtitle" style={styles.sectionTitle}>
                Disabled Slider
              </Typography>
              <Slider
                variant="default"
                size="md"
                initialValue={30}
                min={0}
                max={100}
                disabled={true}
                width={300}
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
