import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import {
  CalendarProps,
  CalendarDate,
  CalendarMonth,
  CalendarDay,
  DateRange,
  CalendarTheme,
} from './types';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { CalendarUtils } from './utils/CalendarUtils';

const Calendar: React.FC<CalendarProps> = ({
  mode = 'single',
  selectedDate,
  selectedDates = [],
  selectedRange,
  minDate,
  maxDate,
  disabledDates = [],
  showWeekNumbers = false,
  showSixWeeks = false,
  hideExtraDays = false,
  firstDayOfWeek = 0,
  enableSwipeMonths = true,
  hideArrows = false,
  disableMonthChange = false,
  theme: customTheme,
  style,
  headerStyle,
  dayStyle,
  dayTextStyle,
  onDateSelect,
  onDatesSelect,
  onRangeSelect,
  onMonthChange,
  onDayPress,
  onDayLongPress,
  renderDay,
  renderHeader,
  renderArrow,
  accessibilityLabel,
  testID,
  variant = 'default',
  size = 'md',
  disabled = false,
  ...rest
}) => {
  const { theme: globalTheme } = useTheme();
  const styles = useThemedStyles(createStyles);

  // Current month state
  const [currentMonth, setCurrentMonth] = useState<CalendarMonth>(() => {
    const today = new Date();
    const initialDate = selectedDate
      ? CalendarUtils.parseDate(selectedDate)
      : selectedRange?.startDate
      ? CalendarUtils.parseDate(selectedRange.startDate)
      : today;
    const dateToUse = initialDate ? new Date(initialDate) : today;
    
    return CalendarUtils.getMonthData(dateToUse);
  });

  // Internal state for selections
  const [internalSelectedDate, setInternalSelectedDate] = useState<CalendarDate>(selectedDate || null);
  const [internalSelectedDates, setInternalSelectedDates] = useState<CalendarDate[]>(selectedDates);
  const [internalSelectedRange, setInternalSelectedRange] = useState<DateRange | undefined>(selectedRange);
  const [rangeSelectionInProgress, setRangeSelectionInProgress] = useState(false);

  // Merge themes
  const mergedTheme: CalendarTheme = useMemo(() => ({
    backgroundColor: globalTheme.colors.background,
    calendarBackground: globalTheme.colors.surface,
    textSectionTitleColor: globalTheme.colors.textSecondary,
    selectedDayBackgroundColor: globalTheme.colors.primary,
    selectedDayTextColor: globalTheme.colors.background,
    todayTextColor: globalTheme.colors.primary,
    dayTextColor: globalTheme.colors.text,
    textDisabledColor: globalTheme.colors.muted,
    arrowColor: globalTheme.colors.text,
    disabledArrowColor: globalTheme.colors.muted,
    monthTextColor: globalTheme.colors.text,
    textDayFontSize: globalTheme.typography.body.fontSize || 14,
    textMonthFontSize: globalTheme.typography.heading.fontSize || 16,
    textDayHeaderFontSize: globalTheme.typography.caption.fontSize || 12,
    rangeSelectionBackgroundColor: `${globalTheme.colors.primary}20`,
    rangeSelectionBorderColor: globalTheme.colors.primary,
    ...customTheme,
  }), [globalTheme, customTheme]);

  // Update internal state when props change
  useEffect(() => {
    if (selectedDate !== undefined) {
      setInternalSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDates !== undefined) {
      setInternalSelectedDates(selectedDates);
    }
  }, [selectedDates]);

  useEffect(() => {
    if (selectedRange !== undefined) {
      setInternalSelectedRange(selectedRange);
    }
  }, [selectedRange]);

  // Navigation handlers
  const handlePrevMonth = useCallback(() => {
    if (disableMonthChange) return;
    
    const prevMonth = CalendarUtils.getPreviousMonth(currentMonth);
    setCurrentMonth(prevMonth);
    onMonthChange?.(prevMonth);
  }, [currentMonth, disableMonthChange, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    if (disableMonthChange) return;
    
    const nextMonth = CalendarUtils.getNextMonth(currentMonth);
    setCurrentMonth(nextMonth);
    onMonthChange?.(nextMonth);
  }, [currentMonth, disableMonthChange, onMonthChange]);

  // Day press handler
  const handleDayPress = useCallback((day: CalendarDay) => {
    if (disabled || day.state.disabled) return;

    onDayPress?.(day);

    switch (mode) {
      case 'single': {
        const newSelectedDate = day.date;
        setInternalSelectedDate(newSelectedDate);
        onDateSelect?.(newSelectedDate);
        break;
      }

      case 'multiple': {
        const dateString = CalendarUtils.formatDate(day.date);
        const currentDates = [...internalSelectedDates];
        const existingIndex = currentDates.findIndex((date) => {
          const parsedDate = CalendarUtils.parseDate(date);
          return parsedDate ? CalendarUtils.formatDate(parsedDate) === dateString : false;
        });

        if (existingIndex >= 0) {
          currentDates.splice(existingIndex, 1);
        } else {
          currentDates.push(day.date);
        }

        setInternalSelectedDates(currentDates);
        onDatesSelect?.(currentDates);
        break;
      }

      case 'range':
        if (!rangeSelectionInProgress || !internalSelectedRange?.startDate) {
          // Start new range selection
          const newRange: DateRange = {
            startDate: day.date,
            endDate: null,
          };
          setInternalSelectedRange(newRange);
          setRangeSelectionInProgress(true);
        } else {
          // Complete range selection
          const parsedStartDate = CalendarUtils.parseDate(internalSelectedRange.startDate);
          if (!parsedStartDate) return;
          
          const startDate = parsedStartDate;
          const endDate = day.date;
          
          const finalRange: DateRange = {
            startDate: startDate <= endDate ? startDate : endDate,
            endDate: startDate <= endDate ? endDate : startDate,
          };
          
          setInternalSelectedRange(finalRange);
          setRangeSelectionInProgress(false);
          onRangeSelect?.(finalRange);
        }
        break;
    }
  }, [disabled, mode, internalSelectedDates, internalSelectedRange, rangeSelectionInProgress, onDateSelect, onDatesSelect, onDayPress, onRangeSelect]);

  // Day long press handler
  const handleDayLongPress = useCallback((day: CalendarDay) => {
    if (disabled || day.state.disabled) return;
    onDayLongPress?.(day);
  }, [disabled, onDayLongPress]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: mergedTheme.backgroundColor },
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      {...rest}
    >
      <CalendarHeader
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        hideArrows={hideArrows}
        disableMonthChange={disableMonthChange}
        theme={mergedTheme}
        style={headerStyle}
        renderArrow={renderArrow}
        renderHeader={renderHeader}
      />
      
      <CalendarGrid
        month={currentMonth}
        selectedDate={internalSelectedDate}
        selectedDates={internalSelectedDates}
        selectedRange={internalSelectedRange}
        mode={mode}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        firstDayOfWeek={firstDayOfWeek}
        showSixWeeks={showSixWeeks}
        hideExtraDays={hideExtraDays}
        onDayPress={handleDayPress}
        onDayLongPress={handleDayLongPress}
        theme={mergedTheme}
        dayStyle={dayStyle}
        dayTextStyle={dayTextStyle}
        renderDay={renderDay}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.md,
      padding: theme.spacing.md,
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

export { Calendar };
export type { CalendarProps };