import { ComponentSize, ComponentVariant } from '../types/ui';
import { Theme, FontConfig } from '../types/theme';
import { Platform, ViewStyle } from 'react-native';

const resolveColor = (
  theme: Theme,
  color: keyof Theme['colors'] | undefined,
  fallback: string
): string => {
  if (!color) return fallback;

  if (typeof color === 'string') {
    if (color.startsWith('#')) return color;

    if (color in theme.colors) {
      return theme.colors[color];
    }

    return color;
  }

  return theme.colors[color];
};

const getVariantColor = (
  variant: ComponentVariant,
  colors: Theme['colors'],
  disabled?: boolean,
  isSolid?: boolean
): string => {
  if (disabled) return colors.background;

  if (isSolid) {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.info;
      case 'destructive':
        return colors.destructive;
      default:
        return colors.surface;
    }
  }

  switch (variant) {
    case 'primary':
      return `${colors.primary}40`;
    case 'secondary':
      return `${colors.secondary}40`;
    case 'success':
      return `${colors.success}40`;
    case 'error':
      return `${colors.error}40`;
    case 'warning':
      return `${colors.warning}40`;
    case 'info':
      return `${colors.info}40`;
    case 'destructive':
      return `${colors.destructive}40`;
    default:
      return colors.surface;
  }
};

const getSizeStyles = (
  size: ComponentSize,
  styles: {
    sizeXs: ViewStyle;
    sizeSm: ViewStyle;
    sizeLg: ViewStyle;
    sizeXl: ViewStyle;
    sizeMd: ViewStyle;
  }
): ViewStyle => {
  switch (size) {
    case 'xs':
      return styles.sizeXs;
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    case 'xl':
      return styles.sizeXl;
    default:
      return styles.sizeMd;
  }
};

const createShadow = (elevation: number): ViewStyle => {
  return {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: elevation / 2 },
        shadowOpacity: 0.25,
        shadowRadius: elevation,
      },
      android: {
        elevation,
      },
      web: {
        boxShadow: `0px ${elevation / 2}px ${elevation}px rgba(0, 0, 0, 0.25)`,
      },
    }),
  };
};

/**
 * Get font family based on weight from font config
 */
const getFontFamily = (fontConfig: FontConfig, weight: string | number): string => {
  const weightStr = weight.toString();

  switch (weightStr) {
    case '400':
    case 'normal':
      return fontConfig.regular ?? 'System';
    case '500':
      return fontConfig.medium ?? fontConfig.regular ?? 'System';
    case '600':
      return fontConfig.semiBold ?? fontConfig.medium ?? fontConfig.regular ?? 'System';
    case '700':
    case 'bold':
      return (
        fontConfig.bold ??
        fontConfig.semiBold ??
        fontConfig.medium ??
        fontConfig.regular ??
        'System'
      );
    default:
      return fontConfig.regular ?? 'System';
  }
};

/**
 * Create font config for Expo Google Fonts
 * Example usage:
 * const fontConfig = createExpoFontConfig({
 *   'Poppins-Regular': Poppins_400Regular,
 *   'Poppins-Medium': Poppins_500Medium,
 *   'Poppins-SemiBold': Poppins_600SemiBold,
 *   'Poppins-Bold': Poppins_700Bold,
 * });
 */
const createExpoFontConfig = (fonts: Record<string, unknown>): FontConfig => {
  const fontNames = Object.keys(fonts);

  return {
    regular: fontNames.find((name) => name.includes('Regular')) ?? fontNames[0],
    medium: fontNames.find((name) => name.includes('Medium')),
    semiBold: fontNames.find((name) => name.includes('SemiBold')),
    bold: fontNames.find((name) => name.includes('Bold')),
  };
};

/**
 * Create font config from font family names
 * Example usage:
 * const fontConfig = createFontConfig('Poppins', {
 *   regular: 'Poppins-Regular',
 *   medium: 'Poppins-Medium',
 *   semiBold: 'Poppins-SemiBold',
 *   bold: 'Poppins-Bold',
 * });
 */
const createFontConfig = (baseName: string, variants?: Partial<FontConfig>): FontConfig => {
  return {
    regular: variants?.regular ?? `${baseName}-Regular`,
    medium: variants?.medium ?? `${baseName}-Medium`,
    semiBold: variants?.semiBold ?? `${baseName}-SemiBold`,
    bold: variants?.bold ?? `${baseName}-Bold`,
    ...variants,
  };
};

export {
  resolveColor,
  getVariantColor as getBackgroundColor,
  getSizeStyles,
  createShadow,
  getFontFamily,
  createExpoFontConfig,
  createFontConfig,
};