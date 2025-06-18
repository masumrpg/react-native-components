import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../../context/ThemeContext';
import { useThemedStyles } from '../../../../hooks/useThemedStyles';
import { Theme } from '../../../../types/theme';
import { CalendarDayProps } from '../types';

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  onPress,
  onLongPress,
  theme,
  style,
  textStyle,
  renderDay,
}) => {
  const { theme: globalTheme } = useTheme();
  const styles = useThemedStyles(createStyles);

  const handlePress = () => {
    onPress(day);
  };

  const handleLongPress = () => {
    onLongPress?.(day);
  };

  if (renderDay) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={day.state.disabled}
        style={[styles.dayContainer, style]}
        accessibilityLabel={`${day.day} ${day.state.selected ? 'selected' : ''}`}
        accessibilityRole="button"
        accessibilityState={{
          selected: day.state.selected,
          disabled: day.state.disabled,
        }}
      >
        {renderDay(day)}
      </TouchableOpacity>
    );
  }

  const getDayContainerStyle = () => {
    let containerStyle = { ...styles.dayContainer };
    
    if (day.state.selected) {
      containerStyle = {
        ...containerStyle,
        ...styles.selectedDay,
        backgroundColor: theme?.selectedDayBackgroundColor || globalTheme.colors.primary,
      };
    }
    
    if (day.state.today && !day.state.selected) {
      containerStyle = { ...containerStyle, ...styles.todayDay };
    }
    
    if (day.state.inRange && !day.state.selected) {
      containerStyle = {
        ...containerStyle,
        ...styles.inRangeDay,
        backgroundColor: theme?.rangeSelectionBackgroundColor || `${globalTheme.colors.primary}20`,
      };
    }
    
    if (day.state.startOfRange || day.state.endOfRange) {
      containerStyle = {
        ...containerStyle,
        ...styles.rangeEdgeDay,
        backgroundColor: theme?.selectedDayBackgroundColor || globalTheme.colors.primary,
      };
    }
    
    if (day.state.disabled) {
      containerStyle = { ...containerStyle, ...styles.disabledDay };
    }
    
    return containerStyle;
  };

  const getDayTextStyle = () => {
    let textColor = theme?.dayTextColor || globalTheme.colors.text;
    let fontWeight = theme?.textDayFontWeight || 'normal';
    
    if (day.state.selected || day.state.startOfRange || day.state.endOfRange) {
      textColor = theme?.selectedDayTextColor || globalTheme.colors.background;
    } else if (day.state.today) {
      textColor = theme?.todayTextColor || globalTheme.colors.primary;
      fontWeight = 'bold';
    } else if (day.state.disabled) {
      textColor = theme?.textDisabledColor || globalTheme.colors.muted;
    } else if (day.state.weekend && !day.state.selected && !day.state.today) {
      textColor = theme?.textDisabledColor || globalTheme.colors.textSecondary;
    }
    
    return {
      fontSize: theme?.textDayFontSize || globalTheme.typography.body.fontSize || 14,
      fontFamily: theme?.textDayFontFamily,
      fontWeight,
      color: textColor,
      textAlign: 'center' as const,
    };
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      disabled={day.state.disabled}
      style={[getDayContainerStyle(), style]}
      accessibilityLabel={`${day.day} ${day.state.selected ? 'selected' : ''} ${day.state.today ? 'today' : ''}`}
      accessibilityRole="button"
      accessibilityState={{
        selected: day.state.selected,
        disabled: day.state.disabled,
      }}
    >
      <Text style={[styles.dayText, getDayTextStyle(), textStyle]}>
        {day.day}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    dayContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      margin: 1,
      backgroundColor: 'transparent',
    },
    dayText: {
      fontSize: theme.typography.body.fontSize || 14,
      color: theme.colors.text,
      textAlign: 'center',
    },
    selectedDay: {
      backgroundColor: theme.colors.primary,
    },
    todayDay: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    inRangeDay: {
      backgroundColor: `${theme.colors.primary}20`,
      borderRadius: 0,
    },
    rangeEdgeDay: {
      backgroundColor: theme.colors.primary,
    },
    disabledDay: {
      opacity: 0.3,
    },
  });

export { CalendarDay };