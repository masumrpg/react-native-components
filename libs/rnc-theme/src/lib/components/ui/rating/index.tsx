import React, { useState, useRef, forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { Star, Heart, Rocket, Bell } from 'lucide-react-native';
import {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../../types/ui';

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

interface AirbnbRatingProps extends BaseRatingProps {
  reviews?: string[];
  reviewColor?: string;
  reviewSize?: number;
  selectedColor?: string;
  unSelectedColor?: string;
  starContainerStyle?: StyleProp<ViewStyle>;
  ratingContainerStyle?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  starImage?: any;
}

interface SwipeRatingProps extends BaseRatingProps {
  type?: RatingType;
  ratingImage?: any;
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

const AirbnbRating = forwardRef<View, AirbnbRatingProps>(
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
      showRating = true,
      readonly = false,
      onRatingChange,
      starContainerStyle,
      ratingContainerStyle,
      starStyle,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createAirbnbRatingStyles);
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

    const renderStars = () => {
      return Array.from({ length: count }, (_, index) => {
        const starIndex = index + 1;
        const isSelected = starIndex <= rating;
        
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(starIndex)}
            disabled={readonly}
            style={[styles.starContainer, starContainerStyle]}
          >
            <Animated.View style={animatedStyle}>
              <Star
                size={starSize}
                color={isSelected ? selectedColor : unSelectedColor}
                fill={isSelected ? selectedColor : 'transparent'}
                style={starStyle}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      });
    };

    return (
      <View ref={ref} style={[styles.container, ratingContainerStyle, style]} {...props}>
        {showRating && (
          <Text
            style={[
              styles.reviewText,
              {
                color: reviewColor,
                fontSize: reviewSize,
              },
            ]}
          >
            {reviews[rating - 1] || ''}
          </Text>
        )}
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
    const [isGesturing, setIsGesturing] = useState(false);
    const containerRef = useRef<View>(null);
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

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        if (readonly) return;
        runOnJS(setIsGesturing)(true);
        if (onStartRating) {
          runOnJS(onStartRating)();
        }
      },
      onActive: (event) => {
        if (readonly) return;
        gestureX.value = event.x;
        const newRating = (event.x / containerWidth.value) * count;
        const updatedRating = runOnJS(updateRating)(Math.max(0, newRating));
        if (onSwipeRating) {
          runOnJS(onSwipeRating)(updatedRating);
        }
      },
      onEnd: () => {
        if (readonly) return;
        runOnJS(setIsGesturing)(false);
        if (onFinishRating) {
          runOnJS(onFinishRating)(rating);
        }
      },
    });

    const onLayout = (event: any) => {
      containerWidth.value = event.nativeEvent.layout.width;
    };

    const renderIcon = (index: number) => {
      const isActive = index < rating;
      const isFraction = index < rating && index + 1 > rating;
      const fractionWidth = isFraction ? ((rating - index) * 100) + '%' : '100%';
      
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
                  width: fractionWidth as any,
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
          <Text
            style={[
              styles.ratingText,
              {
                color: ratingTextColor || theme.colors.text,
              },
            ]}
          >
            {rating.toFixed(fractions)}
          </Text>
        )}
        <PanGestureHandler onGestureEvent={gestureHandler} enabled={!readonly}>
          <Animated.View
            style={styles.ratingContainer}
            onLayout={onLayout}
          >
            {Array.from({ length: count }, (_, index) => renderIcon(index))}
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
);

const createAirbnbRatingStyles = (theme: Theme) => ({
  container: {
    alignItems: 'center' as const,
    paddingVertical: theme.spacing.md,
  },
  reviewText: {
    marginBottom: theme.spacing.sm,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
  starsContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  starContainer: {
    marginHorizontal: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
});

const createSwipeRatingStyles = (theme: Theme) => ({
  container: {
    alignItems: 'center' as const,
    paddingVertical: theme.spacing.md,
  },
  ratingText: {
    marginBottom: theme.spacing.sm,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
  ratingContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  iconContainer: {
    marginHorizontal: theme.spacing.xs / 2,
    position: 'relative' as const,
  },
  activeIconOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    overflow: 'hidden' as const,
  },
});

AirbnbRating.displayName = 'AirbnbRating';
SwipeRating.displayName = 'SwipeRating';

export { AirbnbRating, SwipeRating };
export type { AirbnbRatingProps, SwipeRatingProps };