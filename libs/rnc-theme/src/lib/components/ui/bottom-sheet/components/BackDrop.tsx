import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { BackDropProps } from '../types';

const BackDrop = ({
  topAnimation,
  openHeight,
  closeHeight,
  backDropColor,
  close,
}: BackDropProps) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.5]
    );
    const pointerEvents = opacity === 0 ? 'none' : 'auto';
    return {
      opacity,
      pointerEvents,
    };
  });

  return (
    <Animated.View
      style={[
        styles.backDrop,
        backDropAnimation,
        { backgroundColor: backDropColor },
      ]}
    >
      <Pressable
        style={StyleSheet.absoluteFillObject}
        onPress={() => {
          close();
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { BackDrop };
