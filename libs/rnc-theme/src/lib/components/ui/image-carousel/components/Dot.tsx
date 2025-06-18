import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from 'react-native-reanimated';
import { DotProps } from '../types';
import { useTheme } from '../../../../context/ThemeContext';

const Dot = ({ x, index, size, dotStyle, activeDotStyle }: DotProps) => {
  const { theme } = useTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const isActive =
      x.value >= (index - 0.5) * size && x.value < (index + 0.5) * size;
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [8, 16, 8],
      Extrapolation.CLAMP
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
      transform: [
        {
          scale: withSpring(isActive ? 1.2 : 1),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.dots,
        { backgroundColor: theme.colors.primary },
        dotStyle,
        animatedDotStyle,
        activeDotStyle,
      ]}
    />
  );
};

export { Dot };

const styles = StyleSheet.create({
  dots: {
    height: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});
