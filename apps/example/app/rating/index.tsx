import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { 
  Rating, 
  SwipeRating, 
  useTheme, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography 
} from 'rnc-theme';

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Basic Airbnb Rating */}
        <Card margin="md">
          <CardHeader title="Basic Airbnb Rating" />
          <CardContent>
            <Rating
              defaultRating={airbnbRating}
              onRatingChange={setAirbnbRating}
            />
          </CardContent>
        </Card>

        {/* Custom Airbnb Rating */}
        <Card margin="md">
          <CardHeader title="Custom Airbnb Rating" subtitle="With custom reviews" />
          <CardContent>
            <Rating
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
          </CardContent>
        </Card>

        {/* Gradient Color Rating */}
        <Card margin="md">
          <CardHeader title="Gradient Color Rating" subtitle="Colors change based on rating" />
          <CardContent>
            <Rating
              defaultRating={3}
              enableDynamicColors={true}
              customColors={['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#27ae60']}
              reviews={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
              onRatingChange={ratingCompleted}
              size="lg"
            />
            <Typography style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: theme.colors.textSecondary }}>
              1★ Red • 2★ Orange • 3★ Yellow • 4★ Light Green • 5★ Green
            </Typography>
          </CardContent>
        </Card>

        {/* Basic Swipe Rating */}
        <Card margin="md">
          <CardHeader title="Basic Swipe Rating" />
          <CardContent>
            <SwipeRating
              showRating
              onFinishRating={ratingCompleted}
              defaultRating={swipeRating}
              onRatingChange={setSwipeRating}
              ratingColor={theme.colors.warning}
              ratingBackgroundColor={theme.colors.border}
            />
          </CardContent>
        </Card>

        {/* Heart Rating */}
        <Card margin="md">
          <CardHeader title="Heart Rating" subtitle="Love rating with hearts" />
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Custom Swipe Rating with Fractions */}
        <Card margin="md">
          <CardHeader title="Custom Rating with Fractions" subtitle="Rocket rating with decimal values" />
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Readonly Rating */}
        <Card margin="md">
          <CardHeader title="Readonly Rating" subtitle="Non-interactive rating display" />
          <CardContent>
            <Rating
              defaultRating={4}
              readonly
              showRating={false}
              selectedColor={theme.colors.success}
            />
          </CardContent>
        </Card>

        {/* Bell Rating */}
        <Card margin="md">
          <CardHeader title="Bell Rating" subtitle="Notification style rating" />
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Large Size Rating */}
        <Card margin="md">
          <CardHeader title="Large Size Rating" subtitle="Extra large star size" />
          <CardContent>
            <Rating
              size="lg"
              defaultRating={5}
              selectedColor={theme.colors.primary}
              unSelectedColor={theme.colors.border}
              reviewColor={theme.colors.primary}
              onRatingChange={ratingCompleted}
            />
          </CardContent>
        </Card>

        {/* Jump Value Rating */}
        <Card margin="md" style={{ marginBottom: 30 }}>
          <CardHeader title="Jump Value Rating" subtitle="0.5 step increments" />
          <CardContent>
            <SwipeRating
              jumpValue={0.5}
              showRating
              defaultRating={2.5}
              ratingColor={theme.colors.warning}
              ratingBackgroundColor={theme.colors.border}
              onFinishRating={ratingCompleted}
              fractions={1}
            />
          </CardContent>
        </Card>
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
});