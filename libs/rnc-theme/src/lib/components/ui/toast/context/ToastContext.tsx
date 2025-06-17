import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { ToastContextType, ToastData, ToastProviderProps } from '../types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const dismissCallbacks = useRef<Map<string, () => void>>(new Map());

  const toast = useCallback(
    (data: Omit<ToastData, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastData = {
        id,
        variant: 'default',
        duration: 4000,
        ...data,
      };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });

      // Auto dismiss dengan animasi
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          // Trigger animasi dismiss, bukan langsung hapus dari state
          const dismissCallback = dismissCallbacks.current.get(id);
          if (dismissCallback) {
            dismissCallback(); // Ini akan trigger animasi di ToastItem
          } else {
            // Fallback jika callback belum ready
            dismiss(id);
          }
        }, newToast.duration);
      }

      return id;
    },
    [maxToasts]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Function untuk register dismiss callback dari ToastItem
  const registerDismissCallback = useCallback(
    (id: string, callback: () => void) => {
      dismissCallbacks.current.set(id, callback);
    },
    []
  );

  // Function untuk unregister dismiss callback
  const unregisterDismissCallback = useCallback((id: string) => {
    dismissCallbacks.current.delete(id);
  }, []);

  const value: ToastContextType = {
    toasts,
    toast,
    dismiss,
    dismissAll,
    registerDismissCallback,
    unregisterDismissCallback,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
