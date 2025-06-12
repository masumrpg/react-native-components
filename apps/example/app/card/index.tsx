import React from 'react';
import { ScrollView, StyleSheet, TextStyle } from 'react-native';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Typography,
  Button,
  ButtonText,
} from 'rnc-theme';

const CardScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Section Titles */}
      <Typography variant="h6" style={styles.sectionTitle}>
        Variants
      </Typography>

      {/* Basic Variants */}
      <Card variant="default" margin="md">
        <CardHeader
          title="Default"
          subtitle="With header and footer"
          borderBottom
        />
        <CardContent>
          <Typography>Default variant with surface background</Typography>
        </CardContent>
        <CardFooter showBorder>
          <Button size="sm" variant="ghost">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" variant="primary">
            <ButtonText>Submit</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card variant="filled" margin="md">
        <CardHeader title="Filled" subtitle="No border style" borderBottom />
        <CardContent>
          <Typography>Filled variant with no border</Typography>
        </CardContent>
        <CardFooter showBorder>
          <Button size="sm" variant="outline">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card variant="outline" margin="md">
        <CardHeader
          title="Outline"
          subtitle="Transparent background"
          borderBottom
        />
        <CardContent>
          <Typography>Outline variant with transparent background</Typography>
        </CardContent>
        <CardFooter showBorder justifyContent="flex-end">
          <Button size="sm" variant="primary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card variant="ghost" margin="md">
        <CardHeader title="Ghost" />
        <CardContent>
          <Typography>
            Ghost variant with no border and transparent bg
          </Typography>
        </CardContent>
      </Card>

      {/* Color Variants */}
      <Card variant="primary" margin="md">
        <CardHeader
          title="Primary"
          subtitle="With themed colors"
          borderBottom
        />
        <CardContent>
          <Typography>Primary variant with theme color</Typography>
        </CardContent>
        <CardFooter showBorder>
          <Button size="sm" variant="outline">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" variant="primary">
            <ButtonText>Confirm</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card variant="secondary" margin="md">
        <CardHeader title="Secondary" />
        <CardContent>
          <Typography>Secondary variant with theme color</Typography>
        </CardContent>
      </Card>

      {/* State Variants */}
      <Card variant="success" margin="md">
        <CardHeader
          title="Success State"
          subtitle="Operation completed"
          borderBottom
        />
        <CardContent>
          <Typography>Success state with positive message</Typography>
        </CardContent>
        <CardFooter showBorder justifyContent="flex-end">
          <Button size="sm" variant="success">
            <ButtonText>Continue</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card variant="error" margin="md">
        <CardHeader
          title="Error State"
          subtitle="Something went wrong"
          borderBottom
        />
        <CardContent>
          <Typography>Error state with error message</Typography>
        </CardContent>
        <CardFooter showBorder justifyContent="space-between">
          <Button size="sm" variant="ghost">
            <ButtonText>Back</ButtonText>
          </Button>
          <Button size="sm" variant="error">
            <ButtonText>Retry</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card variant="warning" margin="md">
        <CardHeader title="Warning" />
        <CardContent>
          <Typography>Warning variant</Typography>
        </CardContent>
      </Card>

      <Card variant="info" margin="md">
        <CardHeader title="Info" />
        <CardContent>
          <Typography>Info variant</Typography>
        </CardContent>
      </Card>

      <Card variant="destructive" margin="md">
        <CardHeader title="Destructive" />
        <CardContent>
          <Typography>Destructive variant</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" style={styles.sectionTitleWithMargin}>
        Sizes
      </Typography>
      <Card size="xs" margin="md">
        <CardHeader title="Extra Small" subtitle="Compact size" />
        <CardContent>
          <Typography>Minimal content for XS size</Typography>
        </CardContent>
        <CardFooter showBorder justifyContent="flex-end">
          <Button size="xs">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Card size="sm" margin="md">
        <CardHeader title="Small" />
        <CardContent>
          <Typography>Small size card</Typography>
        </CardContent>
      </Card>

      <Card size="md" margin="md">
        <CardHeader title="Medium" />
        <CardContent>
          <Typography>Medium size card (default)</Typography>
        </CardContent>
      </Card>

      <Card size="lg" margin="md">
        <CardHeader title="Large" />
        <CardContent>
          <Typography>Large size card</Typography>
        </CardContent>
      </Card>

      <Card size="xl" margin="md">
        <CardHeader
          title="Extra Large"
          subtitle="Maximum size option"
          borderBottom
        />
        <CardContent>
          <Typography>Spacious content area for XL size</Typography>
        </CardContent>
        <CardFooter showBorder justifyContent="space-between">
          <Button size="xl" variant="ghost">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="xl" variant="primary">
            <ButtonText>Confirm</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      <Typography variant="h6" style={styles.sectionTitleWithMargin}>
        States
      </Typography>
      <Card disabled margin="md">
        <CardHeader title="Disabled State" />
        <CardContent>
          <Typography>Disabled card state</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" style={styles.sectionTitleWithMargin}>
        Border Radius
      </Typography>
      <Card borderRadius="xs" margin="md">
        <CardHeader title="No Border Radius" />
        <CardContent>
          <Typography>Card with no border radius</Typography>
        </CardContent>
      </Card>

      <Card borderRadius="sm" margin="md">
        <CardHeader title="Small Border Radius" />
        <CardContent>
          <Typography>Card with small border radius</Typography>
        </CardContent>
      </Card>

      <Card borderRadius="md" margin="md">
        <CardHeader title="Medium Border Radius" />
        <CardContent>
          <Typography>Card with medium border radius</Typography>
        </CardContent>
      </Card>

      <Card borderRadius="lg" margin="md">
        <CardHeader title="Large Border Radius" />
        <CardContent>
          <Typography>Card with large border radius</Typography>
        </CardContent>
      </Card>

      <Card borderRadius="xl" margin="md">
        <CardHeader title="Extra Large Border Radius" />
        <CardContent>
          <Typography>Card with extra large border radius</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" style={styles.sectionTitleWithMargin}>
        Elevation
      </Typography>
      <Card elevation={0} margin="md">
        <CardHeader title="No Elevation" />
        <CardContent>
          <Typography>Card with no elevation</Typography>
        </CardContent>
      </Card>

      <Card elevation={1} margin="md">
        <CardHeader title="Low Elevation" />
        <CardContent>
          <Typography>Card with low elevation</Typography>
        </CardContent>
      </Card>

      <Card elevation={3} margin="md">
        <CardHeader title="Medium Elevation" />
        <CardContent>
          <Typography>Card with medium elevation</Typography>
        </CardContent>
      </Card>

      <Card elevation={5} margin="md">
        <CardHeader title="High Elevation" />
        <CardContent>
          <Typography>Card with high elevation</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" style={styles.sectionTitleWithMargin}>
        Custom Background
      </Typography>
      <Card backgroundColor="primary" margin="md">
        <CardHeader title="Custom Background" titleStyle={styles.lightText} />
        <CardContent>
          <Typography style={styles.lightText}>
            Card with custom background color
          </Typography>
        </CardContent>
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
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  } as TextStyle,
  sectionTitleWithMargin: {
    marginTop: 24,
    marginBottom: 16,
    fontWeight: '600',
  } as TextStyle,
  lightText: {
    color: '#ffffff',
  } as TextStyle,
});

export default CardScreen;
