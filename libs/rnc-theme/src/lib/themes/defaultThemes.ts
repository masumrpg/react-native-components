import { Theme } from "../types/theme";

export const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#3C3C43',
    border: '#C6C6C8',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
    info: '#5AC8FA',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 40,
  },
  typography: {
    small: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
    subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '500' },
    title: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
    heading: { fontSize: 24, lineHeight: 32, fontWeight: '700' },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
    info: '#5AC8FA',
  },
};
