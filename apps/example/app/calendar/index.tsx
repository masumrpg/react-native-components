import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import {
  Calendar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  ButtonText,
  useTheme,
  VStack,
} from 'rnc-theme';
import { DateData } from 'react-native-calendars';
import { Text } from 'react-native';

const CalendarScreen = () => {
  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <VStack>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            '2025-06-21': {
              marked: true,
              // disabled: true,
              // disableTouchEvent: true,
            },
            ...(selectedDate && {
              [selectedDate]: {
                selected: true,
              },
            }),
          }}
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
