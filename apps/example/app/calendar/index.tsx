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
} from 'rnc-theme';

const CalendarScreen = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [markedDates, setMarkedDates] = useState({
    '2025-01-15': {
      selected: true,
      marked: true,
      selectedColor: theme.colors.primary,
    },
    '2025-01-16': { marked: true },
    '2025-01-17': { marked: true, dotColor: theme.colors.error },
    '2025-01-18': { disabled: true, disableTouchEvent: true },
  });

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    Alert.alert('Date Selected', `You selected: ${day.dateString}`);
  };

  const handleMonthChange = (month: any) => {
    console.log('Month changed to:', month);
  };

  const addEventToDate = () => {
    if (selectedDate) {
      setMarkedDates((prev) => ({
        ...prev,
        [selectedDate]: {
          selected: true,
          marked: true,
          selectedColor: theme.colors.success,
        },
      }));
      Alert.alert('Event Added', `Event added to ${selectedDate}`);
    } else {
      Alert.alert('No Date Selected', 'Please select a date first');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      {/* 1. Basic Calendar */}
      <Card margin="md">
        <CardHeader
          title="Basic Calendar"
          subtitle="Simple calendar with default styling"
        />
        <CardContent>
          <Calendar
            onDayPress={handleDayPress}
            onMonthChange={handleMonthChange}
            current={currentDate}
          />
        </CardContent>
      </Card>

      {/* 2. Calendar with Marked Dates */}
      <Card margin="md">
        <CardHeader
          title="Calendar with Events"
          subtitle="Shows marked dates and events"
        />
        <CardContent>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            current={currentDate}
          />
          <View style={[styles.selectedDateContainer, { backgroundColor: theme.colors.surface }]}>
            <Typography variant="body" style={styles.selectedDateText}>
              Selected Date: {selectedDate || 'None'}
            </Typography>
            <Button size="sm" variant="primary" onPress={addEventToDate}>
              <ButtonText>Add Event</ButtonText>
            </Button>
          </View>
        </CardContent>
      </Card>

      {/* 3. Primary Variant Calendar */}
      <Card margin="md">
        <CardHeader
          title="Primary Calendar"
          subtitle="Calendar with primary theme variant"
        />
        <CardContent>
          <Calendar
            variant="primary"
            onDayPress={handleDayPress}
            selectedDayBackgroundColor={theme.colors.primary}
            selectedDayTextColor={theme.colors.surface}
            todayTextColor={theme.colors.primary}
            arrowColor={theme.colors.primary}
            current={currentDate}
          />
        </CardContent>
      </Card>

      {/* 4. Custom Styled Calendar */}
      <Card margin="md">
        <CardHeader
          title="Custom Styled Calendar"
          subtitle="Calendar with custom colors and styling"
        />
        <CardContent>
          <Calendar
            variant="outline"
            size="lg"
            onDayPress={handleDayPress}
            backgroundColor={theme.colors.background}
            headerTextColor={theme.colors.primary}
            monthTextColor={theme.colors.primary}
            dayTextColor={theme.colors.text}
            selectedDayBackgroundColor={theme.colors.success}
            selectedDayTextColor={theme.colors.surface}
            todayTextColor={theme.colors.warning}
            arrowColor={theme.colors.primary}
            disabledTextColor={theme.colors.muted}
            current={currentDate}
            markedDates={{
              '2025-01-20': {
                selected: true,
                selectedColor: theme.colors.success,
              },
              '2025-01-21': { marked: true, dotColor: theme.colors.warning },
              '2025-01-22': { marked: true, dotColor: theme.colors.error },
            }}
          />
        </CardContent>
      </Card>

      {/* 5. Period Marking Calendar */}
      <Card margin="md">
        <CardHeader
          title="Period Marking Calendar"
          subtitle="Calendar with period/range selection"
        />
        <CardContent>
          <Calendar
            variant="secondary"
            onDayPress={handleDayPress}
            markingType="period"
            markedDates={{
              '2025-01-10': { startingDay: true, color: theme.colors.primary },
              '2025-01-11': { color: theme.colors.primary },
              '2025-01-12': { color: theme.colors.primary },
              '2025-01-13': { endingDay: true, color: theme.colors.primary },
              '2025-01-25': { startingDay: true, color: theme.colors.success },
              '2025-01-26': { color: theme.colors.success },
              '2025-01-27': { endingDay: true, color: theme.colors.success },
            }}
            current={currentDate}
          />
        </CardContent>
      </Card>

      {/* 6. Multi-dot Calendar */}
      <Card margin="md">
        <CardHeader
          title="Multi-dot Calendar"
          subtitle="Calendar with multiple event indicators"
        />
        <CardContent>
          <Calendar
            variant="ghost"
            onDayPress={handleDayPress}
            markingType="multi-dot"
            markedDates={{
              '2025-01-08': {
                dots: [
                  { key: 'meeting', color: theme.colors.primary },
                  { key: 'workout', color: theme.colors.success },
                ],
              },
              '2025-01-09': {
                dots: [{ key: 'deadline', color: theme.colors.error }],
              },
              '2025-01-10': {
                dots: [
                  { key: 'meeting', color: theme.colors.primary },
                  { key: 'birthday', color: theme.colors.warning },
                  { key: 'reminder', color: theme.colors.info },
                ],
              },
            }}
            current={currentDate}
          />
        </CardContent>
      </Card>

      {/* 7. Disabled Calendar */}
      <Card margin="md">
        <CardHeader
          title="Disabled Calendar"
          subtitle="Calendar in disabled state"
        />
        <CardContent>
          <Calendar
            variant="default"
            disabled={true}
            current={currentDate}
            markedDates={{
              '2025-01-15': {
                selected: true,
                selectedColor: theme.colors.muted,
              },
            }}
          />
        </CardContent>
      </Card>

      {/* 8. Compact Calendar */}
      <Card margin="md">
        <CardHeader
          title="Compact Calendar"
          subtitle="Small size calendar with minimal padding"
        />
        <CardContent>
          <Calendar
            variant="outline"
            size="sm"
            onDayPress={handleDayPress}
            hideExtraDays={true}
            showWeekNumbers={false}
            current={currentDate}
          />
        </CardContent>
      </Card>

      {/* Legend */}
      <Card margin="md">
        <CardHeader title="Legend" subtitle="Calendar marking explanations" />
        <CardContent>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
              <Typography variant="caption">Selected/Meeting</Typography>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: theme.colors.success },
                ]}
              />
              <Typography variant="caption">Workout/Success</Typography>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: theme.colors.error },
                ]}
              />
              <Typography variant="caption">Deadline/Error</Typography>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: theme.colors.warning },
                ]}
              />
              <Typography variant="caption">Birthday/Warning</Typography>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: theme.colors.info },
                ]}
              />
              <Typography variant="caption">Reminder/Info</Typography>
            </View>
          </View>
        </CardContent>
      </Card>
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
