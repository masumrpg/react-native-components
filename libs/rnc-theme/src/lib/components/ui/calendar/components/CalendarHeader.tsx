import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../../context/ThemeContext';
import { useThemedStyles } from '../../../../hooks/useThemedStyles';
import { Theme } from '../../../../types/theme';
import { CalendarHeaderProps } from '../types';
import { CalendarUtils } from '../utils/CalendarUtils';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  onPrevMonth,
  onNextMonth,
  hideArrows = false,
  disableMonthChange = false,
  theme,
  style,
  renderArrow,
  renderHeader,
}) => {
  const { theme: globalTheme } = useTheme();
  const styles = useThemedStyles(createStyles);

  const monthDate = new Date(month.year, month.month - 1, 1);
  const monthName = CalendarUtils.getMonthName(monthDate);
  const yearText = month.year.toString();

  if (renderHeader) {
    return (
      <View style={[styles.container, style]}>
        {renderHeader(monthDate)}
      </View>
    );
  }

  const renderLeftArrow = () => {
    if (hideArrows) return null;
    
    if (renderArrow) {
      return (
        <TouchableOpacity
          onPress={onPrevMonth}
          disabled={disableMonthChange}
          style={styles.arrowButton}
          accessibilityLabel="Previous month"
          accessibilityRole="button"
        >
          {renderArrow('left')}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={onPrevMonth}
        disabled={disableMonthChange}
        style={styles.arrowButton}
        accessibilityLabel="Previous month"
        accessibilityRole="button"
      >
        <Text
          style={[
            styles.arrowText,
            {
              color: disableMonthChange
                ? theme?.disabledArrowColor || globalTheme.colors.muted
                : theme?.arrowColor || globalTheme.colors.text,
            },
          ]}
        >
          ‹
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRightArrow = () => {
    if (hideArrows) return null;
    
    if (renderArrow) {
      return (
        <TouchableOpacity
          onPress={onNextMonth}
          disabled={disableMonthChange}
          style={styles.arrowButton}
          accessibilityLabel="Next month"
          accessibilityRole="button"
        >
          {renderArrow('right')}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={onNextMonth}
        disabled={disableMonthChange}
        style={styles.arrowButton}
        accessibilityLabel="Next month"
        accessibilityRole="button"
      >
        <Text
          style={[
            styles.arrowText,
            {
              color: disableMonthChange
                ? theme?.disabledArrowColor || globalTheme.colors.muted
                : theme?.arrowColor || globalTheme.colors.text,
            },
          ]}
        >
          ›
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderLeftArrow()}
      
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.monthText,
            {
            color: theme?.monthTextColor || globalTheme.colors.text,
            fontSize: theme?.textMonthFontSize || globalTheme.typography.heading.fontSize || 16,
            fontFamily: theme?.textMonthFontFamily,
            fontWeight: (theme?.textMonthFontWeight || 'bold') as '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold',
          },
          ]}
        >
          {monthName} {yearText}
        </Text>
      </View>
      
      {renderRightArrow()}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    monthText: {
      fontSize: theme.typography.heading.fontSize || 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    arrowButton: {
      padding: theme.spacing.sm,
      minWidth: 44,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });

export { CalendarHeader };