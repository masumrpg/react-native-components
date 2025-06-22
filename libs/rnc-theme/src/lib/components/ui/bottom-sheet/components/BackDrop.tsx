import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        close();
      }}
    >
      <Animated.View
        style={[
          styles.backDrop,
          backDropAnimation,
          { backgroundColor: backDropColor },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    display: 'none',
  },
});

export {BackDrop};