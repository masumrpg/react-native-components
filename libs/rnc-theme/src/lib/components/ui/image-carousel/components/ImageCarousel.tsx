import { useEffect, useRef, useState } from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from 'react-native';
import { Typography } from '../../typography';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { CustomImage } from './CustomImage';
import { Pagination } from './Pagination';
import { ImageCarouselProps } from '../types';

const ImageCarousel = ({
  data,
  autoPlay = false,
  pagination = true,
  paginationPosition = 'bottom',
  paginationStyle,
  dotStyle,
  activeDotStyle,
  fullscreen = false,
  autoPlayInterval = 3000,
  imageStyle,
  containerStyle,
  showControls = {
    arrows: false,
    pagination: true,
    counter: false,
  },
  controlsStyle = {
    arrowColor: 'white',
    arrowSize: 24,
    arrowBackground: 'rgba(0, 0, 0, 0.5)',
    arrowBorderRadius: 20,
    counterBackground: 'rgba(0, 0, 0, 0.5)',
    counterTextColor: 'white',
    top: '45%',
  },
  loop = true,
  width: customWidth,
  height: customHeight,
  ...rest
}: ImageCarouselProps) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newData, setNewData] = useState([
    { key: 'spacer-left' },
    ...data,
    { key: 'spacer-right' },
  ]);
  const { width: windowWidth } = useWindowDimensions();
  const SIZE = customWidth
    ? typeof customWidth === 'number'
      ? customWidth
      : windowWidth
    : windowWidth * 0.7;
  const SPACER = customWidth ? 0 : (windowWidth - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);
  const targetX = useSharedValue(0);

  // Update newData if data change
  useEffect(() => {
    setNewData([{ key: 'spacer-left' }, ...data, { key: 'spacer-right' }]);
  }, [data]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offSet.value = e.contentOffset.x;
    },
  });

  useDerivedValue(() => {
    targetX.value =
      offSet.value >= Math.floor(SIZE * (data.length - 1) - 10)
        ? 0
        : Math.floor(offSet.value + SIZE);
  });

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: targetX.value, y: 0 });
        }
      }, autoPlayInterval);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlay, scrollViewRef]);

  const handlePrevious = () => {
    if (scrollViewRef.current && currentIndex > 0) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex - 1) * SIZE,
        animated: true,
      });
    } else if (loop && currentIndex === 0) {
      scrollViewRef.current?.scrollTo({
        x: (data.length - 1) * SIZE,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (scrollViewRef.current && currentIndex < data.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * SIZE,
        animated: true,
      });
    } else if (loop && currentIndex === data.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
    }
  };

  // Create the scroll view style object with proper typing
  const scrollViewStyle: ViewStyle = {};
  if (customHeight !== undefined) {
    scrollViewStyle.height = customHeight;
  }

  // Get safe area adjustments for iOS
  const getIOSAdjustments = () => {
    if (Platform.OS === 'ios') {
      return {
        counterTop: 8 + (Platform.Version >= '11' ? 44 : 20), // Adjust for status bar + notch
        arrowVerticalAdjustment: 0, // iOS handles centering better
      };
    }
    return {
      counterTop: 8,
      arrowVerticalAdjustment: 0,
    };
  };

  const iosAdjustments = getIOSAdjustments();

  return (
    <View style={[styles.container, containerStyle]} {...rest}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / SIZE);
          setCurrentIndex(newIndex);
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={loop}
        showsHorizontalScrollIndicator={false}
        style={scrollViewStyle}
      >
        {newData.map((item, index) => {
          return (
            <CustomImage
              key={index}
              index={index}
              item={item}
              x={x}
              size={SIZE}
              spacer={SPACER}
              imageStyle={imageStyle}
              fullscreen={fullscreen}
            />
          );
        })}
      </Animated.ScrollView>

      {showControls.arrows && (
        <>
          <TouchableOpacity
            style={[
              styles.arrowButton,
              {
                top: controlsStyle.top ?? '45%',
              },
              styles.leftArrow,
              {
                backgroundColor: controlsStyle.arrowBackground,
                borderRadius: controlsStyle.arrowBorderRadius,
                marginTop:
                  Platform.OS === 'ios'
                    ? -20 + iosAdjustments.arrowVerticalAdjustment
                    : -20,
              },
            ]}
            onPress={handlePrevious}
            activeOpacity={0.7}
          >
            <ChevronLeft
              size={controlsStyle.arrowSize}
              color={controlsStyle.arrowColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.arrowButton,
              {
                top: controlsStyle.top ?? '45%',
              },
              styles.rightArrow,
              {
                backgroundColor: controlsStyle.arrowBackground,
                borderRadius: controlsStyle.arrowBorderRadius,
                marginTop:
                  Platform.OS === 'ios'
                    ? -20 + iosAdjustments.arrowVerticalAdjustment
                    : -20,
              },
            ]}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <ChevronRight
              size={controlsStyle.arrowSize}
              color={controlsStyle.arrowColor}
            />
          </TouchableOpacity>
        </>
      )}

      {showControls.pagination && pagination && (
        <Pagination
          data={data}
          x={x}
          size={SIZE}
          position={paginationPosition}
          style={paginationStyle}
          dotStyle={dotStyle}
          activeDotStyle={activeDotStyle}
        />
      )}

      {showControls.counter && (
        <View
          style={[
            styles.counter,
            {
              backgroundColor: controlsStyle.counterBackground,
              top: iosAdjustments.counterTop,
            },
          ]}
        >
          <Typography
            variant="small"
            style={[
              styles.counterText,
              {
                color: controlsStyle.counterTextColor,
              },
            ]}
          >
            {currentIndex + 1}/{data.length}
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  arrowButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  leftArrow: {
    left: 12,
  },
  rightArrow: {
    right: 12,
  },
  counter: {
    position: 'absolute',
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 12,
    fontWeight: '600',
    // iOS specific text rendering
    textAlign: 'center',
  },
});

export { ImageCarousel };
