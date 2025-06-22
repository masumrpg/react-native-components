import { StyleProp, ViewStyle } from 'react-native';

type ComponentVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'filled'
  | 'ghost'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'destructive';

type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ComponentState =
  | 'default'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'loading'
  | 'error'
  | 'success'
  | 'warning';

type AnimationConfig = {
  duration?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
};

type BaseComponentProps = {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

type AnimatedComponentProps = BaseComponentProps & {
  animated?: boolean;
  animationConfig?: AnimationConfig;
};

type BaseInteractiveProps = AnimatedComponentProps & {
  onPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  loading?: boolean;
  hapticFeedback?: boolean;
};

type BaseFormComponentProps = AnimatedComponentProps & {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
};

export type {
  ComponentVariant,
  ComponentSize,
  ComponentState,
  AnimationConfig,
  BaseComponentProps,
  AnimatedComponentProps,
  BaseInteractiveProps,
  BaseFormComponentProps,
};
