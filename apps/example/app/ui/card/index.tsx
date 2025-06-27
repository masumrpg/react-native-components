import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Button,
  Typography,
  ButtonText,
  ButtonIcon,
  useTheme,
  VScroll,
  Box,
  Theme,
  useThemedStyles,
} from 'rnc-theme';
import { MaterialIcons } from '@expo/vector-icons';

const CardScreen = () => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <VScroll style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. Simplest Card */}
      <Card margin="md">
        <CardContent>
          <Typography>Simple card with just content.</Typography>
        </CardContent>
      </Card>

      {/* 2. Basic Card with Header */}
      <Card margin="md">
        <CardHeader title="Basic Card" />
        <CardContent>
          <Typography>A card with header and content.</Typography>
        </CardContent>
      </Card>

      {/* 3. Standard Card */}
      <Card margin="md">
        <CardHeader title="Standard Card" subtitle="With header and footer" />
        <CardContent>
          <Typography>
            This is a standard card layout with all basic features.
          </Typography>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="primary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* 4. Interactive Card */}
      <Card margin="md" style={styles.interactiveCard} elevation={2}>
        <CardHeader title="Interactive Card" subtitle="With multiple actions" />
        <CardContent>
          <Typography style={styles.mb8}>Primary content area with:</Typography>
          <Box style={styles.bulletPoints}>
            <MaterialIcons name="check-circle" size={16} color="green" />
            <Typography style={styles.bulletText}>
              Multiple action buttons
            </Typography>
          </Box>
          <Box style={styles.bulletPoints}>
            <MaterialIcons name="check-circle" size={16} color="green" />
            <Typography style={styles.bulletText}>Custom styling</Typography>
          </Box>
        </CardContent>
        <CardFooter justify="space-between">
          <Button variant="ghost" size="sm">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Box style={styles.footerButtons}>
            <Button variant="outline" size="sm" style={styles.mr8}>
              <ButtonText>Save</ButtonText>
            </Button>
            <Button variant="primary" size="sm">
              <ButtonText>Submit</ButtonText>
            </Button>
          </Box>
        </CardFooter>
      </Card>

      {/* 5. Complex Card */}
      <Card
        margin="md"
        backgroundColor={theme.colors.primary}
        borderRadius="xl"
        elevation={5}
        shadowOpacity={0.2}
      >
        <CardHeader
          title="Complex Card"
          subtitle="Advanced usage example"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent padding="lg">
          <Box style={styles.complexContent}>
            <Box style={styles.statsContainer}>
              <Box style={styles.statItem}>
                <Typography style={styles.statNumber}>128</Typography>
                <Typography style={styles.lightStatLabel}>Views</Typography>
              </Box>
              <Box style={styles.statItem}>
                <Typography style={styles.statNumber}>47</Typography>
                <Typography style={styles.lightStatLabel}>Likes</Typography>
              </Box>
              <Box style={styles.statItem}>
                <Typography style={styles.statNumber}>12</Typography>
                <Typography style={styles.lightStatLabel}>Comments</Typography>
              </Box>
            </Box>
            <Typography style={styles.lightTextWithMargin}>
              Advanced card with custom styling, statistics, and multiple
              interactive elements.
            </Typography>
          </Box>
        </CardContent>
        <CardFooter
          padding="lg"
          style={styles.complexFooter}
          justify="space-between"
        >
          <Button variant="ghost" size="sm" style={styles.lightButton}>
            <ButtonIcon
              icon={<MaterialIcons name="share" size={16} color="#fff" />}
            />
            <ButtonText style={styles.lightText}>Share</ButtonText>
          </Button>
          <Button variant="outline" size="sm" style={styles.lightButton}>
            <ButtonIcon
              icon={<MaterialIcons name="favorite" size={16} color="#fff" />}
            />
            <Typography style={styles.lightText}>Like</Typography>
          </Button>
        </CardFooter>
      </Card>

      {/* Additional Examples Section */}
      <Typography variant="h6" style={styles.sectionTitleWithMargin}>
        Advanced Examples
      </Typography>

      {/* Default */}
      <Card elevation={5} margin="md" borderRadius="xl">
        <CardHeader title="Primary Card" subtitle="High elevation example" />
        <CardContent>
          <Typography>Primary variant with increased elevation</Typography>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="primary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Outline */}
      <Card variant="outline" elevation={5} margin="md" borderRadius="xl">
        <CardHeader title="Outline Card" subtitle="High elevation example" />
        <CardContent>
          <Typography>Outline variant with increased elevation</Typography>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="primary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Primary with High Elevation */}
      <Card variant="primary" elevation={5} margin="md" borderRadius="xl">
        <CardHeader
          title="Primary Card"
          subtitle="High elevation example"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent>
          <Typography style={styles.lightText}>
            Primary variant with increased elevation
          </Typography>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="primary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Secondary with Custom Padding */}
      <Card variant="secondary" margin="md" padding="lg">
        <CardHeader
          title="Secondary Card"
          subtitle="Custom padding"
          padding="lg"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent padding="xl">
          <Typography style={styles.lightText}>
            Secondary variant with larger padding
          </Typography>
        </CardContent>
        <CardFooter padding="lg">
          <Button size="sm" variant="secondary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Ghost Card with Icon */}
      <Card variant="ghost" margin="md">
        <CardHeader title="Ghost Card" subtitle="Transparent styling" />
        <CardContent>
          <Box style={styles.iconContainer}>
            <MaterialIcons name="lightbulb" size={24} color="orange" />
            <Typography style={styles.ml8}>
              Ghost variant with transparent background
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Success Card with Actions */}
      <Card variant="success" margin="md" borderRadius="lg" elevation={2}>
        <CardHeader
          title="Success Status"
          subtitle="Task completed"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent>
          <Box style={styles.iconContainer}>
            <MaterialIcons name="check-circle" size={24} color="green" />
            <Typography style={styles.ml8}>Operation successful!</Typography>
          </Box>
        </CardContent>
        <CardFooter justify="flex-end">
          <Button size="sm" variant="success">
            <ButtonIcon
              icon={
                <MaterialIcons name="arrow-forward" size={18} color="white" />
              }
            />
            <ButtonText>Continue</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Error Card with Actions */}
      <Card variant="error" margin="md" borderRadius="lg" elevation={2}>
        <CardHeader
          title="Error Status"
          subtitle="Action failed"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent>
          <Box style={styles.iconContainer}>
            <MaterialIcons name="error" size={24} color="red" />
            <Typography style={styles.ml8}>Something went wrong!</Typography>
          </Box>
        </CardContent>
        <CardFooter justify="space-between">
          <Button size="sm" variant="ghost">
            <ButtonIcon
              icon={<MaterialIcons name="arrow-back" size={18} color="red" />}
            />
            <ButtonText>Back</ButtonText>
          </Button>
          <Button size="sm" variant="error">
            <ButtonIcon
              icon={<MaterialIcons name="refresh" size={18} color="white" />}
            />
            <ButtonText>Retry</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Info Card with Custom Shadow */}
      <Card variant="info" margin="md" shadowOpacity={0.2} elevation={3}>
        <CardHeader
          title="Information"
          subtitle="With custom shadow"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent>
          <Box style={styles.iconContainer}>
            <MaterialIcons name="info" size={24} color="blue" />
            <Typography style={styles.ml8}>
              Important information here
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Warning Card */}
      <Card variant="warning" margin="md" borderRadius="sm">
        <CardHeader
          title="Warning"
          subtitle="Action required"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent>
          <Box style={styles.iconContainer}>
            <MaterialIcons name="warning" size={24} color="orange" />
            <Typography style={styles.ml8}>
              Please review this information
            </Typography>
          </Box>
        </CardContent>
        <CardFooter justify="flex-end">
          <Button size="sm" variant="warning">
            <ButtonText>Review</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* Filled Card with Stats */}
      <Card
        variant="filled"
        margin="md"
        backgroundColor={theme.colors.secondary}
      >
        <CardHeader
          title="Statistics"
          subtitle="Monthly overview"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
        />
        <CardContent>
          <Box style={styles.statsGrid}>
            <Box style={styles.statsItem}>
              <Typography style={styles.statsLabel}>New Users</Typography>
              <Typography style={styles.statsValue}>1,234</Typography>
            </Box>
            <Box style={styles.statsItem}>
              <Typography style={styles.statsLabel}>Active</Typography>
              <Typography style={styles.statsValue}>891</Typography>
            </Box>
            <Box style={styles.statsItem}>
              <Typography style={styles.statsLabel}>Revenue</Typography>
              <Typography style={styles.statsValue}>$12.4k</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </VScroll>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
      gap: 16,
    },
    lightText: {
      color: '#ffffff',
    },
    interactiveCard: {
      borderColor: '#e2e8f0',
    },
    bulletPoints: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    bulletText: {
      marginLeft: 8,
    },
    footerButtons: {
      flexDirection: 'row',
    },
    mr8: {
      marginRight: 8,
    },
    mb8: {
      marginBottom: 8,
    },
    mt16: {
      marginTop: 16,
    },
    complexContent: {
      paddingVertical: 8,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 8,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    statLabel: {
      fontSize: 12,
      opacity: 0.8,
    },
    // Combined styles untuk menghindari array
    lightStatLabel: {
      color: '#ffffff',
      fontSize: 12,
      opacity: 0.8,
    },
    lightTextWithMargin: {
      color: '#ffffff',
      marginTop: 16,
    },
    complexFooter: {},
    lightButton: {
      borderColor: 'rgba(255,255,255,0.3)',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ml8: {
      marginLeft: 8,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 16,
    },
    statsItem: {
      alignItems: 'center',
    },
    statsLabel: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.7)',
      marginBottom: 4,
    },
    statsValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    sectionTitleWithMargin: {
      marginTop: 32,
      marginBottom: 16,
      fontSize: 20,
      fontWeight: '600',
      color: '#000000',
    },
  });

export default CardScreen;
