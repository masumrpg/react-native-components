import React, { forwardRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';
import { User } from 'lucide-react-native';
import { BaseComponentProps, ComponentSize } from '../../../types/ui';

type AvatarShape = 'circle' | 'square';

type AvatarProps = BaseComponentProps & {
  children?: React.ReactNode;
  shape?: AvatarShape;
  source?: { uri: string } | number;
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  borderWidth?: number;
  borderColor?: keyof Theme['colors'];
  showBadge?: boolean;
  badgeColor?: keyof Theme['colors'];
  badgeSize?: number;
  animated?: boolean;
};

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: ComponentSize;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
  showMore?: boolean;
  moreText?: string;
  onMorePress?: () => void;
}

interface AvatarBadgeProps {
  color?: keyof Theme['colors'];
  size?: number;
  style?: StyleProp<ViewStyle>;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

// Size configurations
const AVATAR_SIZES = {
  xs: { size: 24, fontSize: 10, iconSize: 12, badgeSize: 6 },
  sm: { size: 32, fontSize: 12, iconSize: 16, badgeSize: 8 },
  md: { size: 40, fontSize: 14, iconSize: 20, badgeSize: 10 },
  lg: { size: 56, fontSize: 18, iconSize: 28, badgeSize: 12 },
  xl: { size: 72, fontSize: 24, iconSize: 36, badgeSize: 16 },
} as const;

// Avatar Component
const Avatar = forwardRef<React.ComponentRef<typeof View>, AvatarProps>(
  (
    {
      children,
      size = 'md',
      variant = 'default',
      shape = 'circle',
      source,
      fallbackText,
      fallbackIcon,
      style,
      imageStyle,
      textStyle,
      onPress,
      disabled = false,
      borderWidth = 0,
      borderColor,
      showBadge = false,
      badgeColor,
      badgeSize,
      animated = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createAvatarStyles);
    const [imageError, setImageError] = useState(false);
    // Remove unused imageLoading state
    // const [imageLoading, setImageLoading] = useState(true);

    // Animation values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
      if (animated) {
        opacity.value = withTiming(1, { duration: 300 });
      } else {
        opacity.value = 1;
      }
    }, [animated, opacity]);

    const sizeConfig = AVATAR_SIZES[size];

    // Handle press animation
    const handlePressIn = () => {
      if (animated && !disabled) {
        scale.value = withSpring(0.95, {
          damping: 15,
          stiffness: 300,
        });
      }
    };

    const handlePressOut = () => {
      if (animated && !disabled) {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 300,
        });
      }
    };

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    });

    // Get initials from fallback text
    const getInitials = (text: string): string => {
      return text
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
    };

    // Container style
    const containerStyle = useMemo(() => {
      const baseStyle = {
        width: sizeConfig.size,
        height: sizeConfig.size,
        borderRadius:
          shape === 'circle'
            ? sizeConfig.size / 2
            : theme.components.borderRadius.md,
        borderWidth,
        borderColor: resolveColor(theme, borderColor, theme.colors.border),
      };

      return [
        styles.container,
        styles[variant],
        baseStyle,
        disabled && styles.disabled,
        style,
      ];
    }, [
      styles,
      variant,
      sizeConfig,
      shape,
      theme,
      borderWidth,
      borderColor,
      disabled,
      style,
    ]);

    // Render content
    const renderContent = () => {
      // Custom children
      if (children) {
        return children;
      }

      // Image
      if (source && !imageError) {
        return (
          <Image
            source={source}
            style={[
              styles.image,
              {
                width: sizeConfig.size,
                height: sizeConfig.size,
                borderRadius:
                  shape === 'circle'
                    ? sizeConfig.size / 2
                    : theme.components.borderRadius.md,
              },
              imageStyle,
            ]}
            onError={() => setImageError(true)}
            // Remove unused onLoadStart and onLoadEnd handlers
            // onLoadStart={() => setImageLoading(true)}
            // onLoadEnd={() => setImageLoading(false)}
          />
        );
      }

      // Fallback text (initials)
      if (fallbackText) {
        return (
          <Text
            style={[
              styles.text,
              {
                fontSize: sizeConfig.fontSize,
              },
              textStyle,
            ]}
          >
            {getInitials(fallbackText)}
          </Text>
        );
      }

      // Fallback icon - Fix React.cloneElement typing
      if (fallbackIcon) {
        return React.cloneElement(
          fallbackIcon as React.ReactElement<{
            size?: number;
            color?: string;
            width?: number;
            height?: number;
            fill?: string;
            stroke?: string;
          }>,
          {
            size: sizeConfig.iconSize,
            color: theme.colors.text,
          }
        );
      }

      // Default icon
      return <User size={sizeConfig.iconSize} color={theme.colors.text} />;
    };

    const content = (
      <Animated.View
        ref={ref}
        style={[containerStyle, animatedStyle]}
        {...props}
      >
        {renderContent()}
        {showBadge && (
          <AvatarBadge
            color={badgeColor}
            size={badgeSize ?? sizeConfig.badgeSize}
          />
        )}
      </Animated.View>
    );

    if (onPress && !disabled) {
      return (
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={1}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  }
);

Avatar.displayName = 'Avatar';

// Avatar Badge Component
const AvatarBadge = forwardRef<
  React.ComponentRef<typeof View>,
  AvatarBadgeProps
>(({ color, size = 10, style, position = 'top-right', ...props }, ref) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createAvatarBadgeStyles);

  const positionStyle = useMemo(() => {
    const offset = size / 2;
    switch (position) {
      case 'top-left':
        return { top: -offset, left: -offset };
      case 'top-right':
        return { top: -offset, right: -offset };
      case 'bottom-left':
        return { bottom: -offset, left: -offset };
      case 'bottom-right':
        return { bottom: -offset, right: -offset };
      default:
        return { top: -offset, right: -offset };
    }
  }, [position, size]);

  return (
    <View
      ref={ref}
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: resolveColor(theme, color, theme.colors.success),
        },
        positionStyle,
        style,
      ]}
      {...props}
    />
  );
});

AvatarBadge.displayName = 'AvatarBadge';

// Avatar Group Component
const AvatarGroup = forwardRef<
  React.ComponentRef<typeof View>,
  AvatarGroupProps
>(
  (
    {
      children,
      max = 3,
      size = 'md',
      spacing = -8,
      style,
      showMore = true,
      moreText,
      onMorePress,
      ...props
    },
    ref
  ) => {
    // Remove unused theme destructuring
    const styles = useThemedStyles(createAvatarGroupStyles);

    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    return (
      <View ref={ref} style={[styles.group, style]} {...props}>
        {visibleChildren.map((child, index) => {
          if (React.isValidElement(child)) {
            // Fix React.cloneElement typing and child.props access
            return React.cloneElement(
              child as React.ReactElement<AvatarProps>,
              {
                key: index,
                size,
                style: StyleSheet.flatten([
                  (child.props as AvatarProps).style,
                  {
                    marginLeft: index > 0 ? spacing : 0,
                    zIndex: visibleChildren.length - index,
                  },
                ]),
              }
            );
          }
          return child;
        })}

        {remainingCount > 0 && showMore && (
          <Avatar
            size={size}
            fallbackText={moreText ?? `+${remainingCount}`}
            variant="default"
            onPress={onMorePress}
            style={{
              marginLeft: spacing,
              zIndex: 0,
            }}
          />
        )}
      </View>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// Styles
const createAvatarStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    image: {
      resizeMode: 'cover',
    } as ImageStyle,
    text: {
      fontWeight: '600',
      textAlign: 'center',
    } as TextStyle,
    disabled: {
      opacity: 0.5,
    },
    // Variants
    default: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    primary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    filled: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    success: {
      backgroundColor: theme.colors.success,
      borderColor: theme.colors.success,
    },
    error: {
      backgroundColor: theme.colors.error,
      borderColor: theme.colors.error,
    },
    warning: {
      backgroundColor: theme.colors.warning,
      borderColor: theme.colors.warning,
    },
    info: {
      backgroundColor: theme.colors.info,
      borderColor: theme.colors.info,
    },
    destructive: {
      backgroundColor: theme.colors.destructive,
      borderColor: theme.colors.destructive,
    },
  });

const createAvatarBadgeStyles = (theme: Theme) =>
  StyleSheet.create({
    badge: {
      position: 'absolute',
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
  });

const createAvatarGroupStyles = (_: Theme) =>
  StyleSheet.create({
    group: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  type AvatarProps,
  type AvatarBadgeProps,
  type AvatarGroupProps,
};