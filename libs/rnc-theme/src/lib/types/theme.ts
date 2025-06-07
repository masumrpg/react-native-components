import { TextStyle } from "react-native";

export interface ThemeColors {
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
}

export interface ThemeSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Theme {
  colors: ThemeColors;
  sizes: ThemeSizes;
  spacing: ThemeSpacing;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  typography: {
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
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  customTheme?: Partial<Theme>;
}
