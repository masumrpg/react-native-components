import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../context/RNCProvider';
import { Theme } from '../types/theme';

// Hook utama yang menggunakan context
export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: Theme) => T
) => {
  const { theme } = useTheme();

  return useMemo(() => {
    return StyleSheet.create(styleFactory(theme));
  }, [theme, styleFactory]);
};

// Hook alternatif yang menerima theme sebagai parameter (untuk menghindari cyclic dependency)
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  theme: Theme,
  styleFactory: (theme: Theme) => T
) => {
  return StyleSheet.create(styleFactory(theme));
};
