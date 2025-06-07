import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Button,
  Typography,
  ButtonText,
  ButtonIcon,
} from 'rnc-theme';
import { MaterialIcons } from '@expo/vector-icons';

const CardScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
        <CardHeader
          title="Standard Card"
          subtitle="With header and footer"
          borderBottom
        />
        <CardContent>
          <Typography>
            This is a standard card layout with all basic features.
          </Typography>
        </CardContent>
        <CardFooter showBorder>
          <Button size="sm" variant="primary">
            <ButtonText>Action</ButtonText>
          </Button>
        </CardFooter>
      </Card>

      {/* 4. Interactive Card */}
      <Card margin="md" style={styles.interactiveCard} elevation={2}>
        <CardHeader
          title="Interactive Card"
          subtitle="With multiple actions"
          borderBottom
        />
        <CardContent>
          <Typography style={styles.mb8}>Primary content area with:</Typography>
          <View style={styles.bulletPoints}>
            <MaterialIcons name="check-circle" size={16} color="green" />
            <Typography style={styles.bulletText}>
              Multiple action buttons
            </Typography>
          </View>
          <View style={styles.bulletPoints}>
            <MaterialIcons name="check-circle" size={16} color="green" />
            <Typography style={styles.bulletText}>Custom styling</Typography>
          </View>
        </CardContent>
        <CardFooter showBorder justifyContent="space-between">
          <Button variant="ghost" size="sm">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <View style={styles.footerButtons}>
            <Button variant="outline" size="sm" style={styles.mr8}>
              <ButtonText>Save</ButtonText>
            </Button>
            <Button variant="primary" size="sm">
              <ButtonText>Submit</ButtonText>
            </Button>
          </View>
        </CardFooter>
      </Card>

      {/* 5. Complex Card */}
      <Card
        margin="md"
        backgroundColor="primary"
        borderRadius="xl"
        elevation={5}
        shadowOpacity={0.2}
      >
        <CardHeader
          title="Complex Card"
          subtitle="Advanced usage example"
          titleStyle={styles.lightText}
          subtitleStyle={styles.lightText}
          borderBottom
        />
        <CardContent padding="lg">
          <View style={styles.complexContent}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Typography style={styles.statNumber}>128</Typography>
                <Typography style={styles.lightStatLabel}>Views</Typography>
              </View>
              <View style={styles.statItem}>
                <Typography style={styles.statNumber}>47</Typography>
                <Typography style={styles.lightStatLabel}>Likes</Typography>
              </View>
              <View style={styles.statItem}>
                <Typography style={styles.statNumber}>12</Typography>
                <Typography style={styles.lightStatLabel}>Comments</Typography>
              </View>
            </View>
            <Typography style={styles.lightTextWithMargin}>
              Advanced card with custom styling, statistics, and multiple
              interactive elements.
            </Typography>
          </View>
        </CardContent>
        <CardFooter
          padding="lg"
          showBorder
          style={styles.complexFooter}
          justifyContent="space-between"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5' as const,
  },
  content: {
    padding: 16,
  },
  lightText: {
    color: '#ffffff' as const,
  },
  interactiveCard: {
    borderColor: '#e2e8f0' as const,
  },
  bulletPoints: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  bulletText: {
    marginLeft: 8,
  },
  footerButtons: {
    flexDirection: 'row' as const,
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
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)' as const,
  },
  statItem: {
    alignItems: 'center' as const,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#ffffff' as const,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  // Combined styles untuk menghindari array
  lightStatLabel: {
    color: '#ffffff' as const,
    fontSize: 12,
    opacity: 0.8,
  },
  lightTextWithMargin: {
    color: '#ffffff' as const,
    marginTop: 16,
  },
  complexFooter: {
    borderTopColor: 'rgba(255,255,255,0.2)' as const,
  },
  lightButton: {
    borderColor: 'rgba(255,255,255,0.3)' as const,
  },
});

export default CardScreen;
