import React, { forwardRef } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { resolveColor } from '../../../utils';
import {
  HideDirectionType,
  useHideOnScroll as onScrolling,
  ScrollDirectionType,
  HideOnScrollResult,
} from '../../../hooks/useHideOnScroll';

interface ScrollProps extends ScrollViewProps {
  children?: React.ReactNode;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: keyof Theme['colors'];
  borderRadius?: keyof Theme['components']['borderRadius'];
  themed?: boolean;
  hideOnScroll?: {
    height: number;
    duration?: number;
    threshold?: number;
    scrollDirection?: ScrollDirectionType;
    hideDirection?: HideDirectionType;
    result: (value: HideOnScrollResult | null) => void;
  };
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
      hideOnScroll,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createVStyles);

    const hideOnScrollProps = hideOnScroll
      ? onScrolling({
          height: hideOnScroll.height,
          duration: hideOnScroll.duration ?? 300,
          threshold: hideOnScroll.threshold ?? 10,
          scrollDirection: hideOnScroll.scrollDirection,
          hideDirection: hideOnScroll.hideDirection,
        })
      : null;

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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    };

    return (
      <ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

VScroll.displayName = 'VScroll';

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
      hideOnScroll,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createHStyles);

    const hideOnScrollProps = hideOnScroll
      ? onScrolling({
          height: hideOnScroll.height,
          duration: hideOnScroll.duration ?? 300,
          threshold: hideOnScroll.threshold ?? 10,
          scrollDirection: hideOnScroll.scrollDirection,
          hideDirection: hideOnScroll.hideDirection,
        })
      : null;

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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      hideOnScrollProps?.onScroll(event);
      hideOnScroll?.result(hideOnScrollProps ?? null);
    };

    return (
      <ScrollView
        ref={ref}
        style={[scrollStyle, style]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

HScroll.displayName = 'HScroll';

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

export { VScroll, HScroll };
export type { ScrollProps };
