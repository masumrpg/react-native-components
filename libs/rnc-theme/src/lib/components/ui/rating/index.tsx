import { useState, forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
  StyleSheet,
} from 'react-native';
import { Typography } from '../typography';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { Star, Heart, Rocket, Bell } from 'lucide-react-native';
import { BaseComponentProps } from '../../../types/ui';

type RatingType = 'star' | 'heart' | 'rocket' | 'bell' | 'custom';

interface BaseRatingProps extends BaseComponentProps {
  count?: number;
  defaultRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  showRating?: boolean;
  ratingTextColor?: string;
  style?: StyleProp<ViewStyle>;
}

interface RatingProps extends BaseRatingProps {
  reviews?: string[];
  reviewColor?: string;
  reviewSize?: number;
  selectedColor?: string;
  unSelectedColor?: string;
  starContainerStyle?: StyleProp<ViewStyle>;
  ratingContainerStyle?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  starImage?: React.ComponentType<{
    size?: number;
    color?: string;
    fill?: string;
  }>;
  enableDynamicColors?: boolean;
  customColors?: string[];
  customIcon?: React.ComponentType<{
    size?: number;
    color?: string;
    fill?: string;
  }>;
  showRatingSummary?: boolean;
  totalRating?: number;
  totalReviewers?: number;
  ratingLabel?: string;
  reviewersLabel?: string;
  starGap?: number;
  summaryStyle?: StyleProp<ViewStyle>;
  summaryTextStyle?: StyleProp<TextStyle>;
}

interface SwipeRatingProps extends BaseRatingProps {
  type?: RatingType;
  ratingImage?: React.ComponentType<{
    size?: number;
    color?: string;
    fill?: string;
  }>;
  ratingColor?: string;
  ratingBackgroundColor?: string;
  tintColor?: string;
  imageSize?: number;
  startingValue?: number;
  fractions?: number;
  minValue?: number;
  jumpValue?: number;
  onStartRating?: (rating: number) => void;
  onSwipeRating?: (rating: number) => void;
  onFinishRating?: (rating: number) => void;
}

const Rating = forwardRef<View, RatingProps>(
  (
    {
      count = 5,
      defaultRating = 3,
      reviews = ['Terrible', 'Bad', 'Okay', 'Good', 'Great'],
      selectedColor = '#f1c40f',
      unSelectedColor = '#BDC3C7',
      reviewColor = '#f1c40f',
      size = 'md',
      reviewSize = 25,
      showRating = false,
      readonly = false,
      onRatingChange,
      starContainerStyle,
      ratingContainerStyle,
      starStyle,
      style,
      enableDynamicColors = false,
      customColors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#27ae60'],
      customIcon,
      showRatingSummary = false,
      totalRating,
      totalReviewers,
      ratingLabel = 'Rating',
      reviewersLabel = 'reviews',
      starGap = 4,
      summaryStyle,
      summaryTextStyle,
      ...props
    },
    ref
  ) => {
    const styles = useThemedStyles(createRatingStyles);
    const [rating, setRating] = useState(defaultRating);
    const scale = useSharedValue(1);

    const starSize = {
      xs: 20,
      sm: 30,
      md: 40,
      lg: 50,
      xl: 60,
    }[size];

    const handleRating = (newRating: number) => {
      if (readonly) return;

      scale.value = withSpring(0.8, { damping: 15, stiffness: 300 }, () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      });

      setRating(newRating);
      onRatingChange?.(newRating);
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const getStarColor = (isSelected: boolean) => {
      if (!isSelected) return unSelectedColor;

      if (enableDynamicColors && customColors.length > 0) {
        // Use color based on current rating, not individual star
        const colorIndex = Math.min(
          Math.floor(rating) - 1,
          customColors.length - 1
        );
        return customColors[Math.max(0, colorIndex)];
      }

      return selectedColor;
    };

    const getReviewColor = () => {
      if (enableDynamicColors && customColors.length > 0 && rating > 0) {
        // Use same color logic as stars for consistency
        const colorIndex = Math.min(
          Math.floor(rating) - 1,
          customColors.length - 1
        );
        return customColors[Math.max(0, colorIndex)];
      }

      return reviewColor;
    };

    const renderRatingSummary = () => {
      if (!showRatingSummary || !totalRating || !totalReviewers) {
        return null;
      }

      return (
        <View style={[styles.ratingSummaryContainer, summaryStyle]}>
          <Typography variant="title" style={[styles.ratingValue, summaryTextStyle]}>
            {totalRating.toFixed(1)} {ratingLabel}
          </Typography>
          <Typography variant="body" style={[styles.reviewersCount, summaryTextStyle]}>
            {totalReviewers.toLocaleString()} {reviewersLabel}
          </Typography>
        </View>
      );
    };

    const renderShowRating = () => {
      if (!showRating) return null;
      return (
        <Typography
          variant="body"
          style={[
            styles.reviewText,
            {
              color: getReviewColor(),
              fontSize: reviewSize,
            },
          ]}
        >
          {reviews[rating - 1] || ''}
        </Typography>
      );
    };

    const renderStars = () => {
      const IconComponent = customIcon ?? Star;

      return Array.from({ length: count }, (_, index) => {
        const starIndex = index + 1;
        const isSelected = starIndex <= rating;
        const starColor = getStarColor(isSelected);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(starIndex)}
            disabled={readonly}
            style={[
              styles.starContainer,
              { marginHorizontal: starGap / 2 },
              starContainerStyle,
            ]}
          >
            <Animated.View style={animatedStyle}>
              <IconComponent
                size={starSize}
                color={starColor}
                fill={isSelected ? starColor : 'transparent'}
                style={starStyle}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      });
    };

    return (
      <View
        ref={ref}
        style={[styles.container, ratingContainerStyle, style]}
        {...props}
      >
        {renderRatingSummary()}
        {renderShowRating()}
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>
    );
  }
);

const SwipeRating = forwardRef<View, SwipeRatingProps>(
  (
    {
      type = 'star',
      count = 5,
      defaultRating = 2.5,
      ratingColor = '#f1c40f',
      ratingBackgroundColor = '#c8c7c8',
      imageSize = 50,
      readonly = false,
      showRating = false,
      ratingTextColor,
      startingValue,
      fractions = 2,
      minValue = 0,
      jumpValue = 0,
      onStartRating,
      onSwipeRating,
      onFinishRating,
      onRatingChange,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createSwipeRatingStyles);
    const [rating, setRating] = useState(startingValue ?? defaultRating);
    const containerWidth = useSharedValue(0);
    const gestureX = useSharedValue(0);

    const updateRating = (newRating: number) => {
      let finalRating = Math.max(minValue, Math.min(count, newRating));

      if (jumpValue > 0) {
        finalRating = Math.round(finalRating / jumpValue) * jumpValue;
      } else if (fractions > 0) {
        const precision = Math.pow(10, fractions);
        finalRating = Math.round(finalRating * precision) / precision;
      }

      setRating(finalRating);
      onRatingChange?.(finalRating);
      return finalRating;
    };

    const panGesture = Gesture.Pan()
      .onStart(() => {
        'worklet';
        if (readonly) return;
        if (onStartRating) {
          runOnJS(onStartRating)(rating);
        }
      })
      .onUpdate((event) => {
        'worklet';
        if (readonly) return;
        gestureX.value = event.x;
        const newRating = (event.x / containerWidth.value) * count;
        const updatedRating = Math.max(0, newRating);
        runOnJS(updateRating)(updatedRating);
        if (onSwipeRating) {
          runOnJS(onSwipeRating)(updatedRating);
        }
      })
      .onEnd(() => {
        'worklet';
        if (readonly) return;
        if (onFinishRating) {
          runOnJS(onFinishRating)(rating);
        }
      });

    const onLayout = (event: {
      nativeEvent: { layout: { width: number } };
    }) => {
      containerWidth.value = event.nativeEvent.layout.width;
    };

    const renderIcon = (index: number) => {
      const isActive = index < rating;
      const isFraction = index < rating && index + 1 > rating;
      const fractionWidth = isFraction ? (rating - index) * 100 + '%' : '100%';

      const IconComponent = {
        star: Star,
        heart: Heart,
        rocket: Rocket,
        bell: Bell,
        custom: Star, // fallback
      }[type];

      return (
        <View key={index} style={styles.iconContainer}>
          <IconComponent
            size={imageSize}
            color={ratingBackgroundColor}
            fill={ratingBackgroundColor}
          />
          {(isActive || isFraction) && (
            <View
              style={[
                styles.activeIconOverlay,
                {
                  width: fractionWidth as DimensionValue,
                },
              ]}
            >
              <IconComponent
                size={imageSize}
                color={ratingColor}
                fill={ratingColor}
              />
            </View>
          )}
        </View>
      );
    };

    return (
      <View ref={ref} style={[styles.container, style]} {...props}>
        {showRating && (
          <Typography
            variant="body"
            style={[
              styles.ratingText,
              {
                color: ratingTextColor ?? theme.colors.text,
              },
            ]}
          >
            {rating.toFixed(fractions)}
          </Typography>
        )}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={styles.ratingContainer} onLayout={onLayout}>
            {Array.from({ length: count }, (_, index) => renderIcon(index))}
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }
);

const createRatingStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    ratingSummaryContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    ratingValue: {
      fontSize: theme.typography.title.fontSize,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    reviewersCount: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      fontWeight: '400',
      textAlign: 'center',
    },
    reviewText: {
      marginBottom: theme.spacing.sm,
      fontWeight: '600',
      textAlign: 'center',
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starContainer: {
      padding: theme.spacing.xs / 2,
    },
  });

const createSwipeRatingStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
    },
    ratingText: {
      marginBottom: theme.spacing.sm,
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
      textAlign: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginHorizontal: theme.spacing.xs / 2,
      position: 'relative',
    },
    activeIconOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
    },
  });

Rating.displayName = 'Rating';
SwipeRating.displayName = 'SwipeRating';

export { Rating, SwipeRating };
export type { RatingProps, SwipeRatingProps };