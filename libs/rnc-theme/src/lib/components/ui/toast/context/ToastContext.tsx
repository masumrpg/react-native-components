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

      // Auto dismiss dengan animasi (kecuali untuk loading toast)
      if (newToast.duration && newToast.duration > 0 && !newToast.isLoading) {
        setTimeout(() => {
          const dismissCallback = dismissCallbacks.current.get(id);
          if (dismissCallback) {
            dismissCallback();
          } else {
            dismiss(id);
          }
        }, newToast.duration);
      }

      return id;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxToasts]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Fungsi untuk update toast yang sudah ada
  const updateToast = useCallback((id: string, data: Partial<ToastData>) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, ...data } : toast))
    );
  }, []);

  // Fungsi async yang menampilkan loading dan update otomatis
  const toastAsync = useCallback(
    async <T,>(
      data: Omit<ToastData, 'id'>,
      asyncFn: () => Promise<T>
    ): Promise<T> => {
      // Tampilkan loading toast
      const id = toast({
        ...data,
        variant: 'loading',
        isLoading: true,
        duration: 0, // Tidak auto dismiss
        loadingText: data.loadingText ?? 'Loading...',
      });

      try {
        const result = await asyncFn();

        // Update ke success
        updateToast(id, {
          variant: 'success',
          isLoading: false,
          title: data.title ?? 'Success',
          description: data.description ?? 'Operation completed successfully',
          duration: 3000,
        });

        // Auto dismiss setelah success
        setTimeout(() => {
          const dismissCallback = dismissCallbacks.current.get(id);
          if (dismissCallback) {
            dismissCallback();
          } else {
            dismiss(id);
          }
        }, 3000);

        return result;
      } catch (error) {
        // Update ke error
        updateToast(id, {
          variant: 'error',
          isLoading: false,
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'Something went wrong',
          duration: 5000,
        });

        // Auto dismiss setelah error
        setTimeout(() => {
          const dismissCallback = dismissCallbacks.current.get(id);
          if (dismissCallback) {
            dismissCallback();
          } else {
            dismiss(id);
          }
        }, 5000);

        throw error;
      }
    },
    [toast, updateToast, dismiss]
  );

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const registerDismissCallback = useCallback(
    (id: string, callback: () => void) => {
      dismissCallbacks.current.set(id, callback);
    },
    []
  );

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
    updateToast,
    toastAsync,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
