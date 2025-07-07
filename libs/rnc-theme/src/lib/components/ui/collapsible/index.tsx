import { ChevronRight } from 'lucide-react-native';
import { PropsWithChildren, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';


type CollapsibleProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
} & PropsWithChildren;


export function Collapsible({ children, title, containerStyle, titleStyle }: CollapsibleProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyle);
  const [isOpen, setIsOpen] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);
  const animatedRotation = useSharedValue(0);

  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${animatedRotation.value}deg` }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: animatedOpacity.value,
      overflow: 'hidden',
    };
  });

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      animatedHeight.value = withTiming(
        measuredHeight > 0 ? measuredHeight : 150,
        { duration: 300 }
      );
      animatedOpacity.value = withTiming(1, { duration: 300 });
      animatedRotation.value = withTiming(90, { duration: 300 });
    } else {
      animatedHeight.value = withTiming(0, { duration: 300 });
      animatedOpacity.value = withTiming(0, { duration: 300 });
      animatedRotation.value = withTiming(0, { duration: 300 });
    }
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      setMeasuredHeight(height);
    }
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.heading}
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        <Animated.View style={chevronAnimatedStyle}>
          <ChevronRight size={18} color={theme.colors.text} />
        </Animated.View>

        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </TouchableOpacity>

      <Animated.View style={contentAnimatedStyle}>
        <View style={styles.content}>{children}</View>
      </Animated.View>

      {/* Hidden content untuk mengukur tinggi - hanya render sekali */}
      {measuredHeight === 0 && (
        <View style={styles.hiddenContent} onLayout={handleLayout}>
          <View style={styles.content}>{children}</View>
        </View>
      )}
    </View>
  );
}

const createStyle = (theme: Theme) => StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  hiddenContent: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});
