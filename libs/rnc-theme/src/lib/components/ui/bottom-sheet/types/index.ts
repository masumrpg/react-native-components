import { ReactNode } from "react";
import { FlatListProps } from 'react-native';
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
  backgroundColor?: string;
  backDropColor: string;
  children: ReactNode;
  onStateChange?: (state: boolean) => void;
}

interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
  isOpen?: boolean;
}

interface BottomSheetContextType {
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
  setSheetTitle: (title: string) => void;
  setSnapTo: (value: string) => void;
  variant?: 'scroll' | 'flatlist';
  setVariant: (variant: 'scroll' | 'flatlist') => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setListData: (data: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRenderItem: (renderer: (info: any) => ReactNode) => void;
}

interface BottomSheetProviderProps {
  children: ReactNode;
  defaultSnapTo?: string;
  maxSnapTo?: string;
  backgroundColor?: string;
  backDropColor?: string;
  onStateChange?: (state: boolean) => void;
  variant?: 'scroll' | 'flatlist';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flatListProps?: Omit<FlatListProps<any>, 'ref'>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BottomSheetFlatListProps extends Omit<FlatListProps<any>, 'ref'> {
  snapTo: string;
  maxSnapTo?: string;
  backgroundColor?: string;
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