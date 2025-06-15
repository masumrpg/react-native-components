import { ReactNode } from "react";
import { FlatListProps, ListRenderItem, ViewStyle } from 'react-native';
import { AnimatedScrollViewProps, SharedValue } from 'react-native-reanimated';

type BackDropProps = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  backDropColor: string;
  close: () => void;
};

interface BottomSheetScrollViewProps extends AnimatedScrollViewProps {
  snapTo: string;
  maxSnapTo?: string;
  backgroundColor?: ViewStyle['backgroundColor'];
  backDropColor: string;
  lineBackgroundColor?: ViewStyle['backgroundColor'];
  borderTopLeftRadius: ViewStyle['borderTopLeftRadius'];
  borderTopRightRadius: ViewStyle['borderTopRightRadius'];
  children: ReactNode;
  onStateChange?: (state: boolean) => void;
}

interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
  isOpen?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BottomSheetContextType<T = any> {
  isOpen: boolean;
  isLoading: boolean;
  expand: (
    snapToValue?:
      | '10%'
      | '20%'
      | '30%'
      | '40%'
      | '50%'
      | '60%'
      | '70%'
      | '80%'
      | '90%'
  ) => void;
  close: () => void;
  toggle: (snapToValue?: string) => void;
  setContent: (content: ReactNode) => void;
  setSheetTitle: (title: ReactNode) => void;
  setMaxTo: (value: string) => void;
  variant?: 'scroll' | 'flatlist';
  setVariant: (variant: 'scroll' | 'flatlist') => void;
  setListData: (data: T[]) => void;
  setRenderItem: (renderer: ListRenderItem<T>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BottomSheetProviderProps<T = any> {
  children: ReactNode;
  defaultSnapTo?: string;
  maxSnapTo?: string;
  backgroundColor?: ViewStyle['backgroundColor'];
  backDropColor?: string;
  lineBackgroundColor?: ViewStyle['backgroundColor'];
  borderTopLeftRadius?: ViewStyle['borderTopLeftRadius'];
  borderTopRightRadius?: ViewStyle['borderTopRightRadius'];
  isBorderBottomTitleVisible?: boolean;
  onStateChange?: (state: boolean) => void;
  variant?: 'scroll' | 'flatlist';
  flatListProps?: Omit<FlatListProps<T>, 'ref'>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BottomSheetFlatListProps<T = any>
  extends Omit<FlatListProps<T>, 'ref'> {
  snapTo: string;
  maxSnapTo?: string;
  backgroundColor?: ViewStyle['backgroundColor'];
  lineBackgroundColor?: ViewStyle['backgroundColor'];
  borderTopLeftRadius: ViewStyle['borderTopLeftRadius'];
  borderTopRightRadius: ViewStyle['borderTopRightRadius'];
  backDropColor: string;
  onStateChange?: (state: boolean) => void;
}

export type {
  BackDropProps,
  BottomSheetScrollViewProps,
  BottomSheetMethods,
  BottomSheetContextType,
  BottomSheetProviderProps,
  BottomSheetFlatListProps,
};