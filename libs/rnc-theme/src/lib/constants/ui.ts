// Animation constants - hanya untuk yang butuh
export const ANIMATION_CONSTANTS = {
  DURATION: {
    FAST: 150,
    NORMAL: 200,
    SLOW: 300,
  },
  SPRING_CONFIG: {
    DEFAULT: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    GENTLE: {
      damping: 20,
      stiffness: 100,
      mass: 1,
    },
    BOUNCY: {
      damping: 10,
      stiffness: 200,
      mass: 1,
    },
  },
} as const;

// Size constants untuk consistency
export const SIZE_CONSTANTS = {
  PADDING: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  HEIGHT: {
    xs: 32,
    sm: 36,
    md: 40,
    lg: 44,
    xl: 48,
  },
  BORDER_RADIUS: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    full: 9999,
  },
} as const;
