import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../context/ThemeContext';
import { useThemedStyles } from '../../../../hooks/useThemedStyles';
import { Theme } from '../../../../types/theme';
import { CalendarGridProps, CalendarDay } from '../types';
import { CalendarWeek } from './CalendarWeek';
import { CalendarUtils } from '../utils/CalendarUtils';

const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  selectedDate,
  selectedDates = [],
  selectedRange,
  mode,
  minDate,
  maxDate,
  disabledDates = [],
  firstDayOfWeek,
  showSixWeeks = false,
  hideExtraDays = false,
  onDayPress,
  onDayLongPress,
  theme,
  dayStyle,
  dayTextStyle,
  renderDay,
}) => {
  const { theme: globalTheme } = useTheme();
  const styles = useThemedStyles(createStyles);

  // Generate day names for header
  const dayNames = useMemo(() => {
    return CalendarUtils.getDayNames(firstDayOfWeek);
  }, [firstDayOfWeek]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    return CalendarUtils.generateCalendarDays({
      month,
      selectedDate,
      selectedDates,
      selectedRange,
      mode,
      minDate,
      maxDate,
      disabledDates,
      firstDayOfWeek,
      showSixWeeks,
      hideExtraDays,
    });
  }, [
    month,
    selectedDate,
    selectedDates,
    selectedRange,
    mode,
    minDate,
    maxDate,
    disabledDates,
    firstDayOfWeek,
    showSixWeeks,
    hideExtraDays,
  ]);

  // Group days into weeks
  const weeks = useMemo(() => {
    const weeksArray: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeksArray.push(calendarDays.slice(i, i + 7));
    }
    return weeksArray;
  }, [calendarDays]);

  return (
    <View style={styles.container}>
      {/* Day names header */}
      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName, index) => (
          <View key={index} style={styles.dayNameContainer}>
            <Text
              style={[
                styles.dayNameText,
                {
                  color: theme?.textSectionTitleColor || globalTheme.colors.textSecondary,
                  fontSize: theme?.textDayHeaderFontSize || globalTheme.typography.caption.fontSize || 12,
                  fontFamily: theme?.textDayHeaderFontFamily,
                  fontWeight: (theme?.textDayHeaderFontWeight || '600') as '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold',
                },
              ]}
            >
              {dayName}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar weeks */}
      <View style={styles.weeksContainer}>
        {weeks.map((week, weekIndex) => (
          <CalendarWeek
            key={weekIndex}
            week={week}
            onDayPress={onDayPress}
            onDayLongPress={onDayLongPress}
            theme={theme}
            dayStyle={dayStyle}
            dayTextStyle={dayTextStyle}
            renderDay={renderDay}
          />
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    dayNamesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: theme.spacing.sm,
    },
    dayNameContainer: {
      width: 40,
      alignItems: 'center',
    },
    dayNameText: {
      fontSize: theme.typography.caption.fontSize || 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
    },
    weeksContainer: {
      flex: 1,
    },
  });

export { CalendarGrid };