import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { AirbnbRating, SwipeRating, useTheme } from 'rnc-theme';

const RatingScreen = () => {
  const { theme } = useTheme();
  const [airbnbRating, setAirbnbRating] = useState(3);
  const [swipeRating, setSwipeRating] = useState(2.5);
  const [heartRating, setHeartRating] = useState(4);
  const [customRating, setCustomRating] = useState(3.5);

  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Basic Airbnb Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Basic Airbnb Rating
          </Text>
          <AirbnbRating
            defaultRating={airbnbRating}
            onRatingChange={setAirbnbRating}
          />
        </View>

        {/* Custom Airbnb Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Custom Airbnb Rating
          </Text>
          <AirbnbRating
            count={11}
            reviews={[
              'Terrible',
              'Bad',
              'Meh',
              'OK',
              'Good',
              'Hmm...',
              'Very Good',
              'Wow',
              'Amazing',
              'Unbelievable',
              'Jesus',
            ]}
            defaultRating={6}
            size="sm"
            selectedColor={theme.colors.primary}
            reviewColor={theme.colors.primary}
            onRatingChange={ratingCompleted}
          />
        </View>

        {/* Basic Swipe Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Basic Swipe Rating
          </Text>
          <SwipeRating
            showRating
            onFinishRating={ratingCompleted}
            defaultRating={swipeRating}
            onRatingChange={setSwipeRating}
            ratingColor={theme.colors.warning}
            ratingBackgroundColor={theme.colors.border}
          />
        </View>

        {/* Heart Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Heart Rating
          </Text>
          <SwipeRating
            type="heart"
            count={3}
            imageSize={60}
            showRating
            onFinishRating={ratingCompleted}
            defaultRating={heartRating}
            onRatingChange={setHeartRating}
            ratingColor={theme.colors.error}
            ratingBackgroundColor={theme.colors.border}
          />
        </View>

        {/* Custom Swipe Rating with Fractions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Custom Rating with Fractions
          </Text>
          <SwipeRating
            type="rocket"
            count={10}
            imageSize={30}
            fractions={1}
            startingValue={customRating}
            onRatingChange={setCustomRating}
            onFinishRating={ratingCompleted}
            showRating
            ratingColor={theme.colors.info}
            ratingBackgroundColor={theme.colors.border}
            ratingTextColor={theme.colors.text}
          />
        </View>

        {/* Readonly Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Readonly Rating
          </Text>
          <AirbnbRating
            defaultRating={4}
            readonly
            showRating={false}
            selectedColor={theme.colors.success}
          />
        </View>

        {/* Bell Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Bell Rating
          </Text>
          <SwipeRating
            type="bell"
            count={5}
            imageSize={40}
            showRating
            defaultRating={3}
            ratingColor={theme.colors.secondary}
            ratingBackgroundColor={theme.colors.border}
            onFinishRating={ratingCompleted}
          />
        </View>

        {/* Large Size Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Large Size Rating
          </Text>
          <AirbnbRating
            size="lg"
            defaultRating={5}
            selectedColor={theme.colors.primary}
            unSelectedColor={theme.colors.border}
            reviewColor={theme.colors.primary}
            onRatingChange={ratingCompleted}
          />
        </View>

        {/* Jump Value Rating */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Jump Value Rating (0.5 steps)
          </Text>
          <SwipeRating
            jumpValue={0.5}
            showRating
            defaultRating={2.5}
            ratingColor={theme.colors.warning}
            ratingBackgroundColor={theme.colors.border}
            onFinishRating={ratingCompleted}
            fractions={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
});