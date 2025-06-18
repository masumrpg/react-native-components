import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import {
  Calendar,
  Button,
  ButtonText,
  useTheme,
} from 'rnc-theme';
import type { CalendarDate, DateRange } from 'rnc-theme';

const CalendarScreen: React.FC = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  
  // Single date picker state
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(new Date());
  
  // Multiple dates picker state
  const [selectedDates, setSelectedDates] = useState<CalendarDate[]>([]);
  
  // Date range picker state
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  
  // Custom disabled dates
  const [disabledDates] = useState<CalendarDate[]>([
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 0, 1),   // New Year
    new Date(2024, 6, 4),   // Independence Day
  ]);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleSingleDateSelect = (date: CalendarDate) => {
    setSelectedDate(date);
    Alert.alert('Date Selected', `Selected: ${date?.toString()}`);
  };

  const handleMultipleDatesSelect = (dates: CalendarDate[]) => {
    setSelectedDates(dates);
    Alert.alert('Dates Selected', `Selected ${dates.length} dates`);
  };

  const handleRangeSelect = (range: DateRange) => {
    setSelectedRange(range);
    if (range.startDate && range.endDate) {
      Alert.alert(
        'Range Selected',
        `From: ${range.startDate.toString()}\nTo: ${range.endDate.toString()}`
      );
    }
  };

  const clearSelections = () => {
    setSelectedDate(null);
    setSelectedDates([]);
    setSelectedRange({ startDate: null, endDate: null });
  };

  const createStyles = () => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    header: {
      fontSize: theme.typography.heading.fontSize,
      fontWeight: theme.typography.heading.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: 'center' as const,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: theme.typography.subtitle.fontSize,
      fontWeight: theme.typography.subtitle.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    description: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
      lineHeight: 20,
    },
    calendarContainer: {
      marginBottom: theme.spacing.lg,
    },
    selectedInfo: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.components.borderRadius.md,
      marginTop: theme.spacing.md,
    },
    selectedText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    themeToggle: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.components.borderRadius.md,
      marginBottom: theme.spacing.lg,
    },
    themeText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
    buttonContainer: {
      marginTop: theme.spacing.md,
    },
  });

  const styles = createStyles();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Calendar Component</Text>
      
      {/* Theme Toggle */}
      <View style={styles.themeToggle}>
        <Text style={styles.themeText}>
          Theme: {themeMode === 'light' ? 'Light' : 'Dark'}
        </Text>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{
            false: theme.colors.muted,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.background}
        />
      </View>

      {/* Single Date Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Single Date Picker</Text>
        <Text style={styles.description}>
          Select a single date. Perfect for birthdays, appointments, or any single date selection.
        </Text>
        
        <View style={styles.calendarContainer}>
          <Calendar
            mode="single"
            selectedDate={selectedDate}
            onDateSelect={handleSingleDateSelect}
            minDate={new Date()}
            disabledDates={disabledDates}
            variant="default"
            size="md"
          />
        </View>
        
        {selectedDate && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>
              Selected Date: {selectedDate.toString()}
            </Text>
          </View>
        )}
      </View>

      {/* Multiple Dates Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Dates Picker</Text>
        <Text style={styles.description}>
          Select multiple dates. Great for availability calendars, event planning, or multi-day selections.
        </Text>
        
        <View style={styles.calendarContainer}>
          <Calendar
            mode="multiple"
            selectedDates={selectedDates}
            onDatesSelect={handleMultipleDatesSelect}
            disabledDates={disabledDates}
            variant="primary"
            size="md"
          />
        </View>
        
        {selectedDates.length > 0 && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>
              Selected Dates ({selectedDates.length}):
            </Text>
            {selectedDates.map((date, index) => (
              <Text key={index} style={styles.selectedText}>
                • {date?.toString()}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Date Range Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date Range Picker</Text>
        <Text style={styles.description}>
          Select a date range with start and end dates. Perfect for hotel bookings, vacation planning, or period selections.
        </Text>
        
        <View style={styles.calendarContainer}>
          <Calendar
            mode="range"
            selectedRange={selectedRange}
            onRangeSelect={handleRangeSelect}
            minDate={new Date()}
            disabledDates={disabledDates}
            variant="secondary"
            size="md"
            firstDayOfWeek={1} // Monday
          />
        </View>
        
        {(selectedRange.startDate || selectedRange.endDate) && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>
              Start Date: {selectedRange.startDate?.toString() || 'Not selected'}
            </Text>
            <Text style={styles.selectedText}>
              End Date: {selectedRange.endDate?.toString() || 'Not selected'}
            </Text>
            {selectedRange.startDate && selectedRange.endDate && (
              <Text style={styles.selectedText}>
                Duration: {Math.ceil(
                (new Date(selectedRange.endDate).getTime() - new Date(selectedRange.startDate).getTime()) / 
                (1000 * 60 * 60 * 24)
              )} days
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Custom Styled Calendar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled Calendar</Text>
        <Text style={styles.description}>
          Calendar with custom theme colors and styling options.
        </Text>
        
        <View style={styles.calendarContainer}>
          <Calendar
            mode="single"
            selectedDate={selectedDate}
            onDateSelect={handleSingleDateSelect}
            theme={{
              selectedDayBackgroundColor: '#FF6B6B',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#FF6B6B',
              arrowColor: '#FF6B6B',
              monthTextColor: '#FF6B6B',
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
            variant="outline"
            size="lg"
            showWeekNumbers={false}
            hideExtraDays={true}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          size="md"
          onPress={clearSelections}
          style={{ marginBottom: theme.spacing.md }}
        >
          <ButtonText>Clear All Selections</ButtonText>
        </Button>
        
        <Button
          variant="primary"
          size="md"
          onPress={() => {
            Alert.alert(
              'Calendar Demo',
              'This is a comprehensive calendar component with date picker, range picker, and multiple date selection features!'
            );
          }}
        >
          <ButtonText>Show Info</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
};

export default CalendarScreen;