import { Theme } from '../types/theme';

export const resolveColor = (
  theme: Theme,
  color: string | keyof Theme['colors'] | undefined,
  fallback: string
): string => {
  if (!color) return fallback;

  if (typeof color === 'string') {
    if (color.startsWith('#')) return color;

    if (color in theme.colors) {
      return theme.colors[color as keyof Theme['colors']];
    }

    return color;
  }

  return theme.colors[color];
};
