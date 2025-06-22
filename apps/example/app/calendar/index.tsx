import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Calendar, useTheme, VStack, ListMarkedDates } from 'rnc-theme';
import { DateData } from 'react-native-calendars';

const CalendarScreen = () => {
  const { theme } = useTheme();

  const listMarkedDates: ListMarkedDates = [
    {
      date: '2025-06-20',
      marked: true,
    },
    {
      date: '2025-06-22',
      marked: true,
    },
  ];

  const [selectedDate, setSelectedDate] = useState<DateData | undefined>(
    undefined
  );

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <VStack>
        <Calendar
          onDayPress={handleDayPress}
          selectedDate={selectedDate}
          listMarkedDates={listMarkedDates}
        />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  selectedDateText: {
    flex: 1,
    marginRight: 12,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
});

export default CalendarScreen;
