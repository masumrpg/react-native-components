import { ImageSourcePropType } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface CarouselItem {
  key?: string;
  image?: ImageSourcePropType;
  title?: string;
  description?: string;
}

export interface CustomImageCarouselProps {
  data: CarouselItem[];
  autoPlay?: boolean;
  pagination?: boolean;
}

export interface CustomImageProps {
  item: CarouselItem;
  x: SharedValue<number>;
  index: number;
  size: number;
  spacer: number;
}

export interface DotProps {
  x: SharedValue<number>;
  index: number;
  size: number;
}

export interface PaginationProps {
  data: CarouselItem[];
  x: SharedValue<number>;
  size: number;
}