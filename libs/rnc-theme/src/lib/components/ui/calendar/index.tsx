import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars';
import { useTheme } from '../../../context/RNCProvider';
import { Theme as CalendarTheme } from 'react-native-calendars/src/types';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../../types/theme';

// Custom header component to show clean date without GMT
interface CustomHeaderProps {
  month: Date;
  addMonth?: (count: number) => void;
  theme: Theme;
}

const CustomHeader = ({ month, theme }: CustomHeaderProps) => {
  const currentDate = new Date(month);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const dayName = dayNames[today.getDay()];
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const day = today.getDate();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerDate, { color: theme.colors.primary }]}>
        {dayName}, {monthName} {day}, {year}
      </Text>
    </View>
  );
};

const Calendar = ({ ...props }: CalendarProps) => {
  const { theme: globalTheme } = useTheme();

  const calendarTheme: CalendarTheme = {
    // Enhanced Colors & Text with better contrast
    // backgroundColor: globalTheme.colors.surface,
    calendarBackground: globalTheme.colors.surface,

    // Month header styling
    // monthTextColor: globalTheme.colors.text,
    // textMonthFontSize: globalTheme.fontSizes.xl,
    // textMonthFontWeight: globalTheme.typography.heading.fontWeight

    // Day styling with improved readability
    dayTextColor: globalTheme.colors.text,
    textDayFontSize: globalTheme.fontSizes.md,
    textDayFontWeight: globalTheme.typography.body.fontWeight,

    // Header days (Sun, Mon, etc.)
    textSectionTitleColor: globalTheme.colors.textSecondary,
    textSectionTitleDisabledColor: globalTheme.colors.muted,
    textDayHeaderFontSize: globalTheme.fontSizes.sm,
    textDayHeaderFontWeight: globalTheme.typography.subtitle.fontWeight,

    // Today highlighting
    todayTextColor: globalTheme.colors.primary,
    todayBackgroundColor: globalTheme.colors.primary + '15', // 15% opacity

    // Selected day styling
    selectedDayBackgroundColor: globalTheme.colors.primary,
    selectedDayTextColor: globalTheme.colors.surface,

    // Navigation arrows
    arrowColor: globalTheme.colors.primary,
    arrowStyle: {
      padding: globalTheme.spacing.xs,
      backgroundColor: globalTheme.colors.primary + '15',
      borderRadius: globalTheme.components.borderRadius.md,
    },
    disabledArrowColor: globalTheme.colors.muted,

    // Disabled and inactive dates
    textDisabledColor: globalTheme.colors.muted,
    textInactiveColor: globalTheme.colors.border,

    // Dots for marked dates
    dotColor: globalTheme.colors.primary,
    selectedDotColor: globalTheme.colors.surface,
    disabledDotColor: globalTheme.colors.muted,
    todayDotColor: globalTheme.colors.primary,
  };

  return (
    <RNCalendar
      style={{
        borderRadius: globalTheme.components.borderRadius.md,
        overflow: 'hidden',
        padding: 5,
      }}
      theme={calendarTheme}
      renderHeader={(date) => <CustomHeader month={date} theme={globalTheme} />}
      hideExtraDays={false}
      firstDay={0} // Start week on Sunday
      enableSwipeMonths={true}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerDate: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export { Calendar };
export type { CalendarProps };
