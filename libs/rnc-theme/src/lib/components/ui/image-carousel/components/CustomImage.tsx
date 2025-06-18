import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useLayoutEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import { CustomImageProps } from '../types';
import { useTheme } from '../../../../context/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomImage = ({
  item,
  x,
  index,
  size,
  spacer,
  imageStyle,
  onPress,
  fullscreen,
}: CustomImageProps) => {
  const { theme } = useTheme();
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get Image Width and Height to Calculate AspectRatio
  useLayoutEffect(() => {
    if (item.image) {
      if (typeof item.image === 'number') {
        // Handle local images (require)
        const { width, height } = Image.resolveAssetSource(item.image);
        setAspectRatio(width / height);
      } else if (typeof item.image === 'object' && 'uri' in item.image) {
        // Handle remote images (URI)
        const uri = (item.image as { uri: string }).uri;
        Image.getSize(
          uri,
          (width, height) => {
            setAspectRatio(width / height);
          },
          (error) => {
            console.error('Error loading image:', error);
            setAspectRatio(1); // Fallback to square if there's an error
          }
        );
      }
    }
  }, [item.image]);

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * size, (index - 1) * size, index * size],
      [0.8, 1, 0.8]
    );
    return {
      transform: [{ scale }],
    };
  });

  if (!item.image) {
    return <View style={{ width: spacer }} key={index} />;
  }

  const handleImagePress = () => {
    if (fullscreen) {
      setIsFullscreen(true);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <>
      <View style={{ width: size }} key={index}>
        <TouchableOpacity activeOpacity={0.9} onPress={handleImagePress}>
          <Animated.View
            style={[
              styles.imageContainer,
              { borderRadius: theme.components.borderRadius.md },
              style,
            ]}
          >
            <Image
              source={item.image}
              style={[styles.image, { aspectRatio: aspectRatio }, imageStyle]}
              resizeMode="cover"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isFullscreen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFullscreen(false)}
      >
        <StatusBar hidden />
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsFullscreen(false)}
          >
            <View style={styles.closeIcon}>
              <View
                style={[styles.closeLine, { transform: [{ rotate: '45deg' }] }]}
              />
              <View
                style={[
                  styles.closeLine,
                  { transform: [{ rotate: '-45deg' }] },
                ]}
              />
            </View>
          </TouchableOpacity>
          <Image
            source={item.image}
            style={[styles.fullscreenImage, { aspectRatio: aspectRatio }]}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </>
  );
};

export { CustomImage };

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: SCREEN_WIDTH,
    height: undefined,
    maxHeight: SCREEN_HEIGHT,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  closeIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: 'white',
  },
});
