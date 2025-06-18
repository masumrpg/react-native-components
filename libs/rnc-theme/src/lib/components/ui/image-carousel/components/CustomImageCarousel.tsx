import { useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { CustomImage } from './CustomImage';
import { Pagination } from './Pagination';
import { CustomImageCarouselProps } from '../types';

const ImageCarousel = ({
  data,
  autoPlay,
  pagination,
}: CustomImageCarouselProps) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData, setNewData] = useState([
    { key: 'spacer-left' },
    ...data,
    { key: 'spacer-right' },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
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
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: targetX.value, y: 0 });
        }
      }, 2000);
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

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={() => {
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
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
            />
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

export { ImageCarousel };
