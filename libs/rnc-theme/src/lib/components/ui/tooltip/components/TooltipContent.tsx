import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TooltipContentProps } from '../types';
import { useTheme } from '../../../../context/ThemeContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const TooltipContent: React.FC<TooltipContentProps> = ({
  content,
  position,
  targetLayout,
  offset,
}) => {
  const { theme } = useTheme();
  const [tooltipLayout, setTooltipLayout] = useState({ width: 0, height: 0 });

  const getTooltipStyle = () => {
    const { x, y, width, height } = targetLayout;
    const { width: tooltipWidth, height: tooltipHeight } = tooltipLayout;

    let tooltipX = 0;
    let tooltipY = 0;

    switch (position) {
      case 'top':
        tooltipX = x + width / 2 - tooltipWidth / 2;
        tooltipY = y - tooltipHeight - offset;
        break;
      case 'bottom':
        tooltipX = x + width / 2 - tooltipWidth / 2;
        tooltipY = y + height + offset;
        break;
      case 'left':
        tooltipX = x - tooltipWidth - offset;
        tooltipY = y + height / 2 - tooltipHeight / 2;
        break;
      case 'right':
        tooltipX = x + width + offset;
        tooltipY = y + height / 2 - tooltipHeight / 2;
        break;
    }

    // Ensure tooltip stays within screen bounds
    const padding = 10;
    if (tooltipX < padding) {
      tooltipX = padding;
    }
    if (tooltipX + tooltipWidth > screenWidth - padding) {
      tooltipX = screenWidth - tooltipWidth - padding;
    }
    if (tooltipY < padding) {
      tooltipY = padding;
    }
    if (tooltipY + tooltipHeight > screenHeight - padding) {
      tooltipY = screenHeight - tooltipHeight - padding;
    }

    return {
      position: 'absolute' as const,
      left: tooltipX,
      top: tooltipY,
    };
  };

  const getArrowStyle = () => {
    const { x, y, width, height } = targetLayout;
    const { width: tooltipWidth, height: tooltipHeight } = tooltipLayout;
    const arrowSize = 6;

    const baseArrowStyle = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid' as const,
    };

    // Calculate arrow position relative to target element
    const targetCenterX = x + width / 2;
    const targetCenterY = y + height / 2;
    const tooltipStyle = getTooltipStyle();
    const tooltipLeft = tooltipStyle.left as number;
    const tooltipTop = tooltipStyle.top as number;

    switch (position) {
      case 'top':
        return {
          ...baseArrowStyle,
          bottom: -arrowSize,
          left: Math.max(
            arrowSize,
            Math.min(
              tooltipWidth - arrowSize,
              targetCenterX - tooltipLeft - arrowSize
            )
          ),
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: 'rgba(0, 0, 0, 0.8)',
        };
      case 'bottom':
        return {
          ...baseArrowStyle,
          top: -arrowSize,
          left: Math.max(
            arrowSize,
            Math.min(
              tooltipWidth - arrowSize,
              targetCenterX - tooltipLeft - arrowSize
            )
          ),
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'rgba(0, 0, 0, 0.8)',
        };
      case 'left':
        return {
          ...baseArrowStyle,
          right: -arrowSize,
          top: Math.max(
            arrowSize,
            Math.min(
              tooltipHeight - arrowSize,
              targetCenterY - tooltipTop - arrowSize
            )
          ),
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'rgba(0, 0, 0, 0.8)',
        };
      case 'right':
        return {
          ...baseArrowStyle,
          left: -arrowSize,
          top: Math.max(
            arrowSize,
            Math.min(
              tooltipHeight - arrowSize,
              targetCenterY - tooltipTop - arrowSize
            )
          ),
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: 'rgba(0, 0, 0, 0.8)',
        };
      default:
        return baseArrowStyle;
    }
  };

  const handleLayout = (event: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height });
  };

  return (
    <View style={[styles.container, getTooltipStyle()]} onLayout={handleLayout}>
      {tooltipLayout.width > 0 && <View style={getArrowStyle()} />}
      {typeof content === 'string' ? (
        <Text style={[styles.text, { color: theme.colors.background }]}>
          {content}
        </Text>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    maxWidth: 200,
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});
