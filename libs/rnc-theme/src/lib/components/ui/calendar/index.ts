export { Calendar } from './Calendar';
export * as types from './types';
export * as components from './components';

// Re-export specific types to avoid conflicts
export type {
  CalendarProps,
  CalendarMode,
  CalendarDate,
  DateRange,
  CalendarTheme,
} from './types';