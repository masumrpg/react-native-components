import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  DimensionValue,
} from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface CarouselItem {
  key?: string;
  image?: ImageSourcePropType;
  title?: string;
  description?: string;
}

export interface ImageCarouselProps {
  data: CarouselItem[];
  autoPlay?: boolean;
  pagination?: boolean;
  // New props
  paginationPosition?: 'bottom' | 'overlay';
  paginationStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
  fullscreen?: boolean;
  autoPlayInterval?: number;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  // Control visibility of UI elements
  showControls?: {
    arrows?: boolean;
    pagination?: boolean;
    counter?: boolean;
  };
  // Styling for controls
  controlsStyle?: {
    arrowColor?: string;
    arrowSize?: number;
    arrowBackground?: string;
    arrowBorderRadius?: number;
    counterBackground?: string;
    counterTextColor?: string;
    top?: ViewStyle['top'];
  };
  loop?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
}

export interface CustomImageProps {
  item: CarouselItem;
  x: SharedValue<number>;
  index: number;
  size: number;
  spacer: number;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  fullscreen?: boolean;
}

export interface DotProps {
  x: SharedValue<number>;
  index: number;
  size: number;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
}

export interface PaginationProps {
  data: CarouselItem[];
  x: SharedValue<number>;
  size: number;
  position?: 'bottom' | 'overlay';
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
}
