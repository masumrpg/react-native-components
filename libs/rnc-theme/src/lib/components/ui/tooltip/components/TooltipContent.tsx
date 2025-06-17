import React from 'react';
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

  const getTooltipStyle = () => {
    const { x, y, width, height } = targetLayout;
    let tooltipX = 0;
    let tooltipY = 0;

    switch (position) {
      case 'top':
        tooltipX = x + width / 2;
        tooltipY = y - offset;
        break;
      case 'bottom':
        tooltipX = x + width / 2;
        tooltipY = y + height + offset;
        break;
      case 'left':
        tooltipX = x - offset;
        tooltipY = y + height / 2;
        break;
      case 'right':
        tooltipX = x + width + offset;
        tooltipY = y + height / 2;
        break;
    }

    // Ensure tooltip stays within screen bounds
    const tooltipWidth = 120; // Approximate tooltip width
    const tooltipHeight = 40; // Approximate tooltip height

    if (tooltipX < 10) tooltipX = 10;
    if (tooltipX + tooltipWidth > screenWidth - 10) {
      tooltipX = screenWidth - tooltipWidth - 10;
    }
    if (tooltipY < 10) tooltipY = 10;
    if (tooltipY + tooltipHeight > screenHeight - 10) {
      tooltipY = screenHeight - tooltipHeight - 10;
    }

    return {
      position: 'absolute' as const,
      left: tooltipX,
      top: tooltipY,
      transform: [
        { translateX: position === 'left' || position === 'right' ? 0 : -60 },
        { translateY: position === 'top' || position === 'bottom' ? 0 : -20 },
      ],
    };
  };

  const getArrowStyle = () => {
    const arrowSize = 6;
    const baseArrowStyle = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid' as const,
    };

    switch (position) {
      case 'top':
        return {
          ...baseArrowStyle,
          top: '100%' as const, // Using 'as const' to bypass TypeScript strict checking for this specific case
          left: '50%' as const,
          marginLeft: -arrowSize,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: theme.colors.text,
        };
      case 'bottom':
        return {
          ...baseArrowStyle,
          bottom: '100%' as const,
          left: '50%' as const,
          marginLeft: -arrowSize,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: theme.colors.text,
        };
      case 'left':
        return {
          ...baseArrowStyle,
          left: '100%' as const,
          top: '50%' as const,
          marginTop: -arrowSize,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: theme.colors.text,
        };
      case 'right':
        return {
          ...baseArrowStyle,
          right: '100%' as const,
          top: '50%' as const,
          marginTop: -arrowSize,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: theme.colors.text,
        };
      default:
        return baseArrowStyle;
    }
  };

  return (
    <View style={[styles.container, getTooltipStyle()]}>
      <View style={getArrowStyle()} />
      {typeof content === 'string' ? (
        <Text style={[styles.text, { color: theme.colors.background }]}>{content}</Text>
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
  },
});