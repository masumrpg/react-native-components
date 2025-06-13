import { TextStyle } from "react-native";

type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  muted: string;
  accent: string;
  destructive: string;
};

type ThemeFontSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type ThemeSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type ThemeComponentSizes = {
  height: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  padding: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
};

type Theme = {
  colors: ThemeColors;
  fontSizes: ThemeFontSizes;
  spacing: ThemeSpacing;
  components: ThemeComponentSizes;
  typography: {
    caption: {
      fontSize: TextStyle['fontSize'];
      lineHeight: TextStyle['lineHeight'];
      fontWeight: TextStyle['fontWeight'];
    };
    small: {
      fontSize: TextStyle['fontSize'];
      lineHeight: TextStyle['lineHeight'];
      fontWeight: TextStyle['fontWeight'];
    };
    body: {
      fontSize: TextStyle['fontSize'];
      lineHeight: TextStyle['lineHeight'];
      fontWeight: TextStyle['fontWeight'];
    };
    subtitle: {
      fontSize: TextStyle['fontSize'];
      lineHeight: TextStyle['lineHeight'];
      fontWeight: TextStyle['fontWeight'];
    };
    title: {
      fontSize: TextStyle['fontSize'];
      lineHeight: TextStyle['lineHeight'];
      fontWeight: TextStyle['fontWeight'];
    };
    heading: {
      fontSize: TextStyle['fontSize'];
      lineHeight: TextStyle['lineHeight'];
      fontWeight: TextStyle['fontWeight'];
    };
  };
};

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeConfig = {
  mode: ThemeMode;
  customTheme?: Partial<Theme>;
  activePreset?: string;
  // Hapus presetConfig karena function tidak bisa disimpan
};

export type {
  ThemeColors,
  ThemeFontSizes,
  ThemeSpacing,
  ThemeComponentSizes,
  Theme,
  ThemeMode,
  ThemeConfig,
};