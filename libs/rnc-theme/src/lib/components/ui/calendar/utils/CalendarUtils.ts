import {
  CalendarDate,
  CalendarMonth,
  CalendarDay,
  CalendarDayState,
  DateRange,
  CalendarMode,
} from '../types';

interface GenerateCalendarDaysOptions {
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
}

export class CalendarUtils {
  /**
   * Parse a date from various formats
   */
  static parseDate(date: CalendarDate): Date | null {
    if (!date) return null;
    if (date instanceof Date) return date;
    if (typeof date === 'string') {
      const parsed = new Date(date);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  }

  /**
   * Format a date to YYYY-MM-DD string
   */
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /**
   * Check if a date is today
   */
  static isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  /**
   * Check if a date is a weekend (Saturday or Sunday)
   */
  static isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  /**
   * Get month data for a given date
   */
  static getMonthData(date: Date): CalendarMonth {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const firstDay = new Date(year, month - 1, 1);
    
    return {
      month,
      year,
      dateString: this.formatDate(firstDay),
      timestamp: firstDay.getTime(),
    };
  }

  /**
   * Get previous month data
   */
  static getPreviousMonth(currentMonth: CalendarMonth): CalendarMonth {
    const date = new Date(currentMonth.year, currentMonth.month - 2, 1);
    return this.getMonthData(date);
  }

  /**
   * Get next month data
   */
  static getNextMonth(currentMonth: CalendarMonth): CalendarMonth {
    const date = new Date(currentMonth.year, currentMonth.month, 1);
    return this.getMonthData(date);
  }

  /**
   * Get month name
   */
  static getMonthName(date: Date, locale = 'en-US'): string {
    return date.toLocaleDateString(locale, { month: 'long' });
  }

  /**
   * Get day names based on first day of week
   */
  static getDayNames(firstDayOfWeek = 0, locale = 'en-US'): string[] {
    const baseDate = new Date(2023, 0, 1); // January 1, 2023 (Sunday)
    const dayNames = [];
    
    for (let i = 0; i < 7; i++) {
      const dayIndex = (firstDayOfWeek + i) % 7;
      const date = new Date(baseDate);
      date.setDate(date.getDate() + dayIndex);
      dayNames.push(date.toLocaleDateString(locale, { weekday: 'short' }));
    }
    
    return dayNames;
  }

  /**
   * Check if a date is disabled
   */
  static isDateDisabled(
    date: Date,
    minDate?: CalendarDate,
    maxDate?: CalendarDate,
    disabledDates?: CalendarDate[]
  ): boolean {
    // Check min date
    if (minDate) {
      const min = this.parseDate(minDate);
      if (min && date < min) return true;
    }

    // Check max date
    if (maxDate) {
      const max = this.parseDate(maxDate);
      if (max && date > max) return true;
    }

    // Check disabled dates
    if (disabledDates && disabledDates.length > 0) {
      return disabledDates.some(disabledDate => {
        const disabled = this.parseDate(disabledDate);
        return disabled && this.isSameDay(date, disabled);
      });
    }

    return false;
  }

  /**
   * Check if a date is selected
   */
  static isDateSelected(
    date: Date,
    selectedDate?: CalendarDate,
    selectedDates?: CalendarDate[],
    mode: CalendarMode = 'single'
  ): boolean {
    switch (mode) {
      case 'single': {
        if (!selectedDate) return false;
        const selected = this.parseDate(selectedDate);
        return selected ? this.isSameDay(date, selected) : false;
      }

      case 'multiple':
        if (!selectedDates || selectedDates.length === 0) return false;
        return selectedDates.some(selectedDate => {
          const selected = this.parseDate(selectedDate);
          return selected ? this.isSameDay(date, selected) : false;
        });

      case 'range':
        // Range selection is handled separately
        return false;

      default:
        return false;
    }
  }

  /**
   * Check if a date is in range
   */
  static isDateInRange(date: Date, range?: DateRange): boolean {
    if (!range || !range.startDate || !range.endDate) return false;
    
    const start = this.parseDate(range.startDate);
    const end = this.parseDate(range.endDate);
    
    if (!start || !end) return false;
    
    return date >= start && date <= end;
  }

  /**
   * Check if a date is start of range
   */
  static isStartOfRange(date: Date, range?: DateRange): boolean {
    if (!range || !range.startDate) return false;
    const start = this.parseDate(range.startDate);
    return start ? this.isSameDay(date, start) : false;
  }

  /**
   * Check if a date is end of range
   */
  static isEndOfRange(date: Date, range?: DateRange): boolean {
    if (!range || !range.endDate) return false;
    const end = this.parseDate(range.endDate);
    return end ? this.isSameDay(date, end) : false;
  }

  /**
   * Generate calendar days for a month
   */
  static generateCalendarDays(options: GenerateCalendarDaysOptions): CalendarDay[] {
    const {
      month,
      selectedDate,
      selectedDates,
      selectedRange,
      mode,
      minDate,
      maxDate,
      disabledDates,
      firstDayOfWeek,
      showSixWeeks = false,
      hideExtraDays = false,
    } = options;

    const days: CalendarDay[] = [];
    const firstDayOfMonth = new Date(month.year, month.month - 1, 1);
    
    // Calculate the first day to show (might be from previous month)
    const startDate = new Date(firstDayOfMonth);
    const dayOfWeek = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - dayOfWeek);

    // Calculate how many days to show
    const totalDays = showSixWeeks ? 42 : 35;
    
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = currentDate.getMonth() === firstDayOfMonth.getMonth();
      
      // Skip extra days if hideExtraDays is true
      if (hideExtraDays && !isCurrentMonth) {
        continue;
      }
      
      // Create day state
      const state: CalendarDayState = {
        selected: this.isDateSelected(currentDate, selectedDate, selectedDates, mode) ||
                 this.isStartOfRange(currentDate, selectedRange) ||
                 this.isEndOfRange(currentDate, selectedRange),
        disabled: this.isDateDisabled(currentDate, minDate, maxDate, disabledDates),
        today: this.isToday(currentDate),
        inRange: this.isDateInRange(currentDate, selectedRange),
        startOfRange: this.isStartOfRange(currentDate, selectedRange),
        endOfRange: this.isEndOfRange(currentDate, selectedRange),
        weekend: this.isWeekend(currentDate),
      };

      // Create calendar day
      const calendarDay: CalendarDay = {
        date: new Date(currentDate),
        dateString: this.formatDate(currentDate),
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        timestamp: currentDate.getTime(),
        state,
      };

      days.push(calendarDay);
    }

    return days;
  }

  /**
   * Get days in month
   */
  static getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  /**
   * Add days to a date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Add months to a date
   */
  static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Get difference in days between two dates
   */
  static getDaysDifference(date1: Date, date2: Date): number {
    const timeDifference = date2.getTime() - date1.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  }
}