import React, { forwardRef } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';
import Animated from 'react-native-reanimated';

interface ScrollProps extends ScrollViewProps {
  children?: React.ReactNode;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
}

const VScroll = forwardRef<ScrollView, ScrollProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createVStyles);

    const scrollStyle: ViewStyle = {
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: resolveColor(
        theme,
        backgroundColor,
        themed ? theme.colors.background : 'transparent'
      ),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    };

    return (
      <ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

VScroll.displayName = 'VScroll';

const AnimatedVScroll = forwardRef<Animated.ScrollView, ScrollProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createVStyles);

    const scrollStyle: ViewStyle = {
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: resolveColor(
        theme,
        backgroundColor,
        themed ? theme.colors.background : 'transparent'
      ),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    };

    return (
      <Animated.ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </Animated.ScrollView>
    );
  }
);

AnimatedVScroll.displayName = 'AnimatedVScroll';

const HScroll = forwardRef<ScrollView, ScrollProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createHStyles);

    const scrollStyle: ViewStyle = {
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: resolveColor(
        theme,
        backgroundColor,
        themed ? theme.colors.background : 'transparent'
      ),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    };

    return (
      <ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

HScroll.displayName = 'HScroll';

const AnimatedHScroll = forwardRef<Animated.ScrollView, ScrollProps>(
  (
    {
      children,
      style,
      padding,
      margin,
      backgroundColor,
      borderRadius,
      themed = false,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createHStyles);

    const scrollStyle: ViewStyle = {
      ...styles.base,
      padding: padding ? theme.spacing[padding] : undefined,
      margin: margin ? theme.spacing[margin] : undefined,
      backgroundColor: resolveColor(
        theme,
        backgroundColor,
        themed ? theme.colors.background : 'transparent'
      ),
      borderRadius: borderRadius
        ? theme.components.borderRadius[borderRadius]
        : undefined,
    };

    return (
      <Animated.ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </Animated.ScrollView>
    );
  }
);

AnimatedHScroll.displayName = 'AnimatedHScroll';

const createVStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flex: 1,
      flexDirection: 'column',
    },
  });

const createHStyles = (_: Theme) =>
  StyleSheet.create({
    base: {
      flex: 1,
      flexDirection: 'row',
    },
  });

export { VScroll, HScroll, AnimatedVScroll, AnimatedHScroll };
export type { ScrollProps };
