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
    muted: '#8E8E93',
    accent: '#FF2D92',
    destructive: '#FF3B30',
  },
  fontSizes: {
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
  components: {
    height: {
      xs: 32,
      sm: 36,
      md: 40,
      lg: 44,
      xl: 48,
    },
    padding: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
    },
    borderRadius: {
      xs: 4,
      sm: 6,
      md: 8,
      lg: 10,
      xl: 12,
      full: 9999,
    },
  },
  typography: {
    caption: { fontSize: 10, lineHeight: 14, fontWeight: '400', fontFamily: 'System' },
    small: { fontSize: 12, lineHeight: 16, fontWeight: '400', fontFamily: 'System' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '400', fontFamily: 'System' },
    subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '500', fontFamily: 'System' },
    title: { fontSize: 20, lineHeight: 28, fontWeight: '600', fontFamily: 'System' },
    heading: { fontSize: 24, lineHeight: 32, fontWeight: '700', fontFamily: 'System' },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    muted: '#48484A',
  },
};
