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

type ThemeTypography = {
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

type Theme = {
  colors: ThemeColors;
  fontSizes: ThemeFontSizes;
  spacing: ThemeSpacing;
  components: ThemeComponentSizes;
  typography: ThemeTypography;
};

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeConfig = {
  mode: ThemeMode;
  customTheme?: {
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
  };
  activePreset?: string;
};

// Type untuk konfigurasi tema dinamis
type ThemeConfigFunction = (isDark: boolean) => Partial<Theme>;

// Interface untuk kontrak tema kustom yang menghasilkan struktur seperti customThemeConfig
interface CustomThemeConfig {
  colors: {
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
  components: {
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
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

// Type untuk factory function yang menghasilkan CustomThemeConfig
type CustomThemeConfigFactory = (isDark: boolean) => CustomThemeConfig;

// Type untuk partial custom theme config (untuk fleksibilitas)
type PartialCustomThemeConfig = {
  colors?: Partial<CustomThemeConfig['colors']>;
  components?: Partial<CustomThemeConfig['components']>;
  spacing?: Partial<CustomThemeConfig['spacing']>;
};

// Type untuk factory function yang menghasilkan PartialCustomThemeConfig
type PartialCustomThemeConfigFactory = (
  isDark: boolean
) => PartialCustomThemeConfig;

export type {
  ThemeColors,
  ThemeFontSizes,
  ThemeSpacing,
  ThemeComponentSizes,
  Theme,
  ThemeMode,
  ThemeConfig,
  ThemeConfigFunction,
  ThemeTypography,
  CustomThemeConfig,
  CustomThemeConfigFactory,
  PartialCustomThemeConfig,
  PartialCustomThemeConfigFactory,
};