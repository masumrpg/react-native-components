import { Theme } from '../../../../types/theme';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition = 'top' | 'bottom';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
  icon?: React.ReactNode;
}

export interface ToastContextType {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  registerDismissCallback: (id: string, callback: () => void) => void;
  unregisterDismissCallback: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export interface ToastItemProps {
  toast: ToastData;
  index: number;
  theme: Theme;
  onDismiss: (id: string) => void;
}
