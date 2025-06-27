import { StyleSheet, Platform, StatusBar } from 'react-native';
import React, { useState } from 'react';
import {
  Rating,
  SwipeRating,
  useTheme,
  Card,
  CardContent,
  CardHeader,
  Typography,
  VScroll,
} from 'rnc-theme';
import { Heart, ThumbsUp, Smile } from 'lucide-react-native';

const RatingScreen = () => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(3);
  const [swipeRating, setSwipeRating] = useState(2.5);
  const [heartRating, setHeartRating] = useState(4);
  const [customRating, setCustomRating] = useState(3.5);

  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
  };

  return (
    <VScroll themed contentContainerStyle={styles.scrollContent}>
      {/* Basic Rating */}
      <Card margin="md">
        <CardHeader title="Basic Rating" />
        <CardContent>
          <Rating defaultRating={rating} onRatingChange={setRating} />
        </CardContent>
      </Card>

      {/* Custom Rating */}
      <Card margin="md">
        <CardHeader title="Custom Rating" subtitle="With custom reviews" />
        <CardContent>
          <Rating
            count={9}
            reviews={[
              'Terrible',
              'Bad',
              'Meh',
              'OK',
              'Good',
              'Hmm...',
              'Very Good',
              'Amazing',
              'Allahuakbar...',
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
        <CardHeader
          title="Gradient Color Rating"
          subtitle="Colors change based on rating"
        />
        <CardContent>
          <Rating
            defaultRating={3}
            enableDynamicColors={true}
            customColors={[
              '#e74c3c',
              '#f39c12',
              '#f1c40f',
              '#2ecc71',
              '#27ae60',
            ]}
            reviews={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
            onRatingChange={ratingCompleted}
            size="lg"
          />
          <Typography
            style={{
              textAlign: 'center',
              marginTop: 8,
              fontSize: 12,
              color: theme.colors.textSecondary,
            }}
          >
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
        <CardHeader
          title="Custom Rating with Fractions"
          subtitle="Rocket rating with decimal values"
        />
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
        <CardHeader
          title="Readonly Rating"
          subtitle="Non-interactive rating display"
        />
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
        <CardHeader
          title="Large Size Rating"
          subtitle="Extra large star size"
        />
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

      {/* Custom Icon Examples */}
      <Card margin="md">
        <CardHeader
          title="Custom Icon Examples"
          subtitle="Heart, Thumbs Up, and Smile ratings"
        />
        <CardContent>
          <Typography
            style={{
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Heart Icon Rating
          </Typography>
          <Rating
            count={5}
            defaultRating={3}
            size="md"
            customIcon={Heart}
            selectedColor="#e74c3c"
            unSelectedColor="#bdc3c7"
            reviews={['Hate it', 'Dislike', 'Neutral', 'Like', 'Love it']}
            onRatingChange={(rating) => console.log('Heart Rating:', rating)}
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Thumbs Up Rating
          </Typography>
          <Rating
            count={5}
            defaultRating={4}
            size="md"
            customIcon={ThumbsUp}
            selectedColor="#3498db"
            unSelectedColor="#95a5a6"
            reviews={['Very Bad', 'Bad', 'Average', 'Good', 'Excellent']}
            onRatingChange={(rating) => console.log('Thumbs Rating:', rating)}
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Smile Rating with Dynamic Colors
          </Typography>
          <Rating
            count={5}
            defaultRating={5}
            size="md"
            customIcon={Smile}
            enableDynamicColors={true}
            customColors={[
              '#e74c3c',
              '#f39c12',
              '#f1c40f',
              '#2ecc71',
              '#9b59b6',
            ]}
            reviews={['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy']}
            onRatingChange={(rating) => console.log('Smile Rating:', rating)}
          />
        </CardContent>
      </Card>

      {/* Star Size and Gap Customization */}
      <Card margin="md">
        <CardHeader
          title="Star Size & Gap Customization"
          subtitle="Full control over star appearance and spacing"
        />
        <CardContent>
          <Typography
            style={{
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Small Stars with Tight Gap
          </Typography>
          <Rating
            count={5}
            defaultRating={4}
            size="sm"
            starGap={2}
            selectedColor={theme.colors.primary}
            unSelectedColor={theme.colors.border}
            reviews={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
            onRatingChange={(rating) => console.log('Small Rating:', rating)}
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Medium Stars with Normal Gap
          </Typography>
          <Rating
            count={5}
            defaultRating={3.5}
            size="md"
            starGap={8}
            selectedColor={theme.colors.warning}
            unSelectedColor={theme.colors.border}
            reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
            onRatingChange={(rating) => console.log('Medium Rating:', rating)}
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Large Stars with Wide Gap
          </Typography>
          <Rating
            count={5}
            defaultRating={5}
            size="lg"
            starGap={16}
            selectedColor={theme.colors.success}
            unSelectedColor={theme.colors.border}
            reviews={['Awful', 'Poor', 'Average', 'Great', 'Perfect']}
            onRatingChange={(rating) => console.log('Large Rating:', rating)}
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Custom Summary Styling
          </Typography>
          <Rating
            count={5}
            defaultRating={4.2}
            size="md"
            starGap={6}
            readonly={true}
            showRatingSummary={true}
            totalRating={4.2}
            totalReviewers={1250}
            ratingLabel="Quality"
            reviewersLabel="reviews"
            selectedColor={theme.colors.info}
            unSelectedColor={theme.colors.border}
            summaryStyle={{
              backgroundColor: theme.colors.surface,
            }}
            summaryTextStyle={{
              color: theme.colors.primary,
              fontWeight: '700',
            }}
          />
        </CardContent>
      </Card>

      {/* Rating Summary Examples */}
      <Card margin="md">
        <CardHeader
          title="Rating Summary Display"
          subtitle="Non-interactive rating with summary information"
        />
        <CardContent>
          <Typography
            style={{
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Product Rating Summary
          </Typography>
          <Rating
            count={5}
            defaultRating={4.5}
            size="md"
            readonly={true}
            showRatingSummary={true}
            totalRating={4.5}
            totalReviewers={10000}
            ratingLabel="Rating"
            reviewersLabel="reviews"
            selectedColor="#f39c12"
            unSelectedColor="#bdc3c7"
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            Service Rating with Custom Labels
          </Typography>
          <Rating
            count={5}
            defaultRating={3.8}
            size="md"
            readonly={true}
            showRatingSummary={true}
            totalRating={3.8}
            totalReviewers={2547}
            ratingLabel="Service Quality"
            reviewersLabel="customers"
            enableDynamicColors={true}
            customColors={[
              '#e74c3c',
              '#f39c12',
              '#f1c40f',
              '#2ecc71',
              '#27ae60',
            ]}
          />

          <Typography
            style={{
              marginTop: 24,
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            App Store Style Rating
          </Typography>
          <Rating
            count={5}
            defaultRating={4.7}
            size="lg"
            readonly={true}
            showRatingSummary={true}
            totalRating={4.7}
            totalReviewers={156789}
            ratingLabel="App Rating"
            reviewersLabel="ratings"
            selectedColor="#007AFF"
            unSelectedColor="#E5E5EA"
          />
        </CardContent>
      </Card>
    </VScroll>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
});
