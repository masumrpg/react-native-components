import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../context/ToastContext';
import { ToastItem } from './ToastItem';
import { ToastPosition } from '../types';
import { Theme } from '../../../../types/theme';

interface ToastContainerProps {
  maxToasts: number;
  theme: Theme;
  position?: ToastPosition;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  maxToasts,
  theme,
  position = 'top',
}) => {
  const { toasts, dismiss } = useToast();
  const insets = useSafeAreaInsets();
  const visibleToasts = toasts.slice(0, maxToasts);

  if (visibleToasts.length === 0) {
    return null;
  }

  const containerStyle = [
    styles.container,
    position === 'top'
      ? { top: insets.top + 10 }
      : { bottom: insets.bottom + 10 },
  ];

  return (
    <View style={containerStyle} pointerEvents="box-none">
      {visibleToasts.map((toast, index) => (
        <ToastItem
          theme={theme}
          key={toast.id}
          toast={toast}
          index={index}
          position={position}
          onDismiss={dismiss}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});

export { ToastContainer as Toast };