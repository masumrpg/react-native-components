import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { BaseComponentProps } from '../../../../types/ui';

export type CalendarMode = 'single' | 'range' | 'multiple';

export type CalendarDate = Date | string | null;

export interface DateRange {
  startDate: CalendarDate;
  endDate: CalendarDate;
}

export interface CalendarDayState {
  selected: boolean;
  disabled: boolean;
  today: boolean;
  inRange: boolean;
  startOfRange: boolean;
  endOfRange: boolean;
  weekend: boolean;
}

export interface CalendarDay {
  date: Date;
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
  state: CalendarDayState;
}

export interface CalendarMonth {
  month: number;
  year: number;
  dateString: string;
  timestamp: number;
}

export interface CalendarTheme {
  backgroundColor?: string;
  calendarBackground?: string;
  textSectionTitleColor?: string;
  selectedDayBackgroundColor?: string;
  selectedDayTextColor?: string;
  todayTextColor?: string;
  dayTextColor?: string;
  textDisabledColor?: string;
  dotColor?: string;
  selectedDotColor?: string;
  arrowColor?: string;
  disabledArrowColor?: string;
  monthTextColor?: string;
  indicatorColor?: string;
  textDayFontFamily?: string;
  textMonthFontFamily?: string;
  textDayHeaderFontFamily?: string;
  textDayFontWeight?: string;
  textMonthFontWeight?: string;
  textDayHeaderFontWeight?: string;
  textDayFontSize?: number;
  textMonthFontSize?: number;
  textDayHeaderFontSize?: number;
  agendaDayTextColor?: string;
  agendaDayNumColor?: string;
  agendaTodayColor?: string;
  agendaKnobColor?: string;
  rangeSelectionBackgroundColor?: string;
  rangeSelectionBorderColor?: string;
}

export interface CalendarProps extends BaseComponentProps {
  // Date selection
  mode?: CalendarMode;
  selectedDate?: CalendarDate;
  selectedDates?: CalendarDate[];
  selectedRange?: DateRange;
  
  // Date constraints
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
  disabledDates?: CalendarDate[];
  
  // Display options
  showWeekNumbers?: boolean;
  showSixWeeks?: boolean;
  hideExtraDays?: boolean;
  firstDayOfWeek?: number; // 0 = Sunday, 1 = Monday, etc.
  
  // Month navigation
  enableSwipeMonths?: boolean;
  hideArrows?: boolean;
  disableMonthChange?: boolean;
  
  // Styling
  theme?: CalendarTheme;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  dayStyle?: StyleProp<ViewStyle>;
  dayTextStyle?: StyleProp<TextStyle>;
  
  // Callbacks
  onDateSelect?: (date: CalendarDate) => void;
  onDatesSelect?: (dates: CalendarDate[]) => void;
  onRangeSelect?: (range: DateRange) => void;
  onMonthChange?: (month: CalendarMonth) => void;
  onDayPress?: (day: CalendarDay) => void;
  onDayLongPress?: (day: CalendarDay) => void;
  
  // Custom rendering
  renderDay?: (day: CalendarDay) => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
  renderArrow?: (direction: 'left' | 'right') => React.ReactNode;
  
  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}

export interface CalendarHeaderProps {
  month: CalendarMonth;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  hideArrows?: boolean;
  disableMonthChange?: boolean;
  theme?: CalendarTheme;
  style?: StyleProp<ViewStyle>;
  renderArrow?: (direction: 'left' | 'right') => React.ReactNode;
  renderHeader?: (date: Date) => React.ReactNode;
}

export interface CalendarDayProps {
  day: CalendarDay;
  onPress: (day: CalendarDay) => void;
  onLongPress?: (day: CalendarDay) => void;
  theme?: CalendarTheme;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  renderDay?: (day: CalendarDay) => React.ReactNode;
}

export interface CalendarWeekProps {
  week: CalendarDay[];
  onDayPress: (day: CalendarDay) => void;
  onDayLongPress?: (day: CalendarDay) => void;
  theme?: CalendarTheme;
  dayStyle?: StyleProp<ViewStyle>;
  dayTextStyle?: StyleProp<TextStyle>;
  renderDay?: (day: CalendarDay) => React.ReactNode;
}

export interface CalendarGridProps {
  month: CalendarMonth;
  selectedDate?: CalendarDate;
  selectedDates?: CalendarDate[];
  selectedRange?: DateRange;
  mode: CalendarMode;
  minDate?: CalendarDate;
  maxDate?: CalendarDate;
  disabledDates?: CalendarDate[];
  firstDayOfWeek: number;
  showSixWeeks?: boolean;
  hideExtraDays?: boolean;
  onDayPress: (day: CalendarDay) => void;
  onDayLongPress?: (day: CalendarDay) => void;
  theme?: CalendarTheme;
  dayStyle?: StyleProp<ViewStyle>;
  dayTextStyle?: StyleProp<TextStyle>;
  renderDay?: (day: CalendarDay) => React.ReactNode;
}