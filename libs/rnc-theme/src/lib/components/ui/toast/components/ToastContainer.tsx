import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../context/ToastContext';
import { ToastItem } from './ToastItem';
import { ToastPosition } from '../types';
import { useThemedStyles } from '../../../../hooks/useThemedStyles';
import { Theme } from '../../../../types/theme';

interface ToastContainerProps {
  position?: ToastPosition;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top',
}) => {
  const { toasts, dismiss } = useToast();
  const styles = useThemedStyles(createToastContainerStyles);
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) {
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
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          index={index}
          onDismiss={dismiss}
        />
      ))}
    </View>
  );
};

const createToastContainerStyles = (theme: Theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
  } as ViewStyle,
});
