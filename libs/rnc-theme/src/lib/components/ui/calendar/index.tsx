import { ViewStyle } from 'react-native';
import { Calendar as RNCalendar, CalendarProps as RNCalendarProps } from 'react-native-calendars';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import {
  ComponentState,
  BaseComponentProps,
  ComponentVariant,
} from '../../../types/ui';

type BaseCalendarProps = BaseComponentProps & RNCalendarProps & {
  // Theme customization props
  headerTextColor?: string;
  monthTextColor?: string;
  dayTextColor?: string;
  selectedDayBackgroundColor?: string;
  selectedDayTextColor?: string;
  todayTextColor?: string;
  disabledTextColor?: string;
  arrowColor?: string;
  backgroundColor?: string;
};

type CalendarProps = BaseCalendarProps;

// Styles
type StateStylesType = {
  [K in ComponentState as `state${Capitalize<K>}`]: ViewStyle;
};

const createStyles = (theme: Theme) =>
  ({
    container: {
      marginBottom: 0,
    } as ViewStyle,
    base: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.lg,
      overflow: 'hidden',
    } as ViewStyle,
    // Variants
    default: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    primary: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    secondary: {
      borderWidth: 1.5,
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    outline: {
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: 'transparent',
    } as ViewStyle,
    ghost: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    } as ViewStyle,
    filled: {
      borderWidth: 0,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    success: {
      borderWidth: 1.5,
      borderColor: theme.colors.success,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    error: {
      borderWidth: 1.5,
      borderColor: theme.colors.error,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    warning: {
      borderWidth: 1.5,
      borderColor: theme.colors.warning,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    info: {
      borderWidth: 1.5,
      borderColor: theme.colors.info,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    destructive: {
      borderWidth: 1.5,
      borderColor: theme.colors.destructive,
      backgroundColor: theme.colors.surface,
    } as ViewStyle,
    // Sizes
    sizeXs: {
      padding: theme.spacing.xs,
    } as ViewStyle,
    sizeSm: {
      padding: theme.spacing.sm,
    } as ViewStyle,
    sizeMd: {
      padding: theme.spacing.md,
    } as ViewStyle,
    sizeLg: {
      padding: theme.spacing.lg,
    } as ViewStyle,
    sizeXl: {
      padding: theme.spacing.xl,
    } as ViewStyle,
    // States
    stateDefault: {} as ViewStyle,
    stateFocus: {
      borderWidth: 2,
    } as ViewStyle,
    stateActive: {
      borderWidth: 2,
      opacity: 0.9,
    } as ViewStyle,
    stateDisabled: {
      opacity: 0.6,
      pointerEvents: 'none',
    } as ViewStyle,
    stateLoading: {
      opacity: 0.8,
    } as ViewStyle,
    stateError: {
      borderColor: theme.colors.error,
    } as ViewStyle,
    stateSuccess: {
      borderColor: theme.colors.success,
    } as ViewStyle,
    stateWarning: {
      borderColor: theme.colors.warning,
    } as ViewStyle,
  } as const satisfies Record<string, ViewStyle> &
    StateStylesType &
    Record<ComponentVariant, ViewStyle>);

const Calendar = (
  (
    {
      variant = 'default',
      size = 'md',
      disabled = false,
      style,
      // Theme props
      headerTextColor,
      monthTextColor,
      dayTextColor,
      selectedDayBackgroundColor,
      selectedDayTextColor,
      todayTextColor,
      disabledTextColor,
      arrowColor,
      backgroundColor,
      // Calendar props
      onDayPress,
      onDayLongPress,
      onMonthChange,
      onVisibleMonthsChange,
      current,
      minDate,
      maxDate,
      firstDay = 1, // Monday as first day
      markedDates,
      markingType,
      hideArrows = false,
      hideExtraDays = false,
      disableMonthChange = false,
      enableSwipeMonths = true,
      disableArrowLeft,
      disableArrowRight,
      disableAllTouchEventsForDisabledDays = true,
      renderArrow,
      renderHeader,
      customHeaderTitle,
      displayLoadingIndicator = false,
      showWeekNumbers = false,
      showSixWeeks = false,
      ...props
    }: CalendarProps,
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createStyles);

    const calendarStyles = [
      styles.base,
      styles[variant],
      styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
      disabled && styles.stateDisabled,
      style,
    ];

    // Create theme object for react-native-calendars
    const calendarTheme = {
      backgroundColor: backgroundColor || theme.colors.surface,
      calendarBackground: backgroundColor || theme.colors.surface,
      textSectionTitleColor: headerTextColor || theme.colors.text,
      textSectionTitleDisabledColor: disabledTextColor || theme.colors.muted,
      selectedDayBackgroundColor: selectedDayBackgroundColor || theme.colors.primary,
      selectedDayTextColor: selectedDayTextColor || theme.colors.surface,
      todayTextColor: todayTextColor || theme.colors.primary,
      dayTextColor: dayTextColor || theme.colors.text,
      textDisabledColor: disabledTextColor || theme.colors.muted,
      dotColor: theme.colors.primary,
      selectedDotColor: selectedDayTextColor || theme.colors.surface,
      arrowColor: arrowColor || theme.colors.primary,
      disabledArrowColor: theme.colors.muted,
      monthTextColor: monthTextColor || theme.colors.text,
      indicatorColor: theme.colors.primary,
      textDayFontWeight: '400' as const,
      textMonthFontWeight: '600' as const,
      textDayHeaderFontWeight: '500' as const,
      textDayFontSize: theme.typography.body.fontSize,
      textMonthFontSize: theme.typography.title.fontSize,
      textDayHeaderFontSize: theme.typography.caption.fontSize,
      // Additional styling
      'stylesheet.calendar.header': {
        week: {
          marginTop: theme.spacing.sm,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      },
      'stylesheet.day.basic': {
        base: {
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        },
        selected: {
          backgroundColor: selectedDayBackgroundColor || theme.colors.primary,
          borderRadius: theme.components.borderRadius.md,
        },
        today: {
          borderWidth: 1,
          borderColor: todayTextColor || theme.colors.primary,
          borderRadius: theme.components.borderRadius.md,
        },
      },
    };

    return (
      <RNCalendar
        style={calendarStyles}
        theme={calendarTheme}
        onDayPress={disabled ? undefined : onDayPress}
        onDayLongPress={disabled ? undefined : onDayLongPress}
        onMonthChange={disabled ? undefined : onMonthChange}
        onVisibleMonthsChange={disabled ? undefined : onVisibleMonthsChange}
        current={current}
        minDate={minDate}
        maxDate={maxDate}
        firstDay={firstDay}
        markedDates={markedDates}
        markingType={markingType}
        hideArrows={hideArrows || disabled}
        hideExtraDays={hideExtraDays}
        disableMonthChange={disableMonthChange || disabled}
        enableSwipeMonths={enableSwipeMonths && !disabled}
        disableArrowLeft={disableArrowLeft || disabled}
        disableArrowRight={disableArrowRight || disabled}
        disableAllTouchEventsForDisabledDays={disableAllTouchEventsForDisabledDays}
        renderArrow={renderArrow}
        renderHeader={renderHeader}
        customHeaderTitle={customHeaderTitle}
        displayLoadingIndicator={displayLoadingIndicator}
        showWeekNumbers={showWeekNumbers}
        showSixWeeks={showSixWeeks}
        {...props}
      />
    );
  }
);

export { Calendar };
export type { CalendarProps };