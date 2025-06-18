import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../../../hooks/useThemedStyles';
import { Theme } from '../../../../types/theme';
import { CalendarWeekProps } from '../types';
import { CalendarDay } from './CalendarDay';

const CalendarWeek: React.FC<CalendarWeekProps> = ({
  week,
  onDayPress,
  onDayLongPress,
  theme,
  dayStyle,
  dayTextStyle,
  renderDay,
}) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.weekContainer}>
      {week.map((day, index) => (
        <CalendarDay
          key={`${day.dateString}-${index}`}
          day={day}
          onPress={onDayPress}
          onLongPress={onDayLongPress}
          theme={theme}
          style={dayStyle}
          textStyle={dayTextStyle}
          renderDay={renderDay}
        />
      ))}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    weekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 2,
    },
  });

export { CalendarWeek };