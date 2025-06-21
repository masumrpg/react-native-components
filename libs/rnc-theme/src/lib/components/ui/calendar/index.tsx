import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars';
import { useTheme } from '../../../context/RNCProvider';
import { Theme as CalendarTheme } from 'react-native-calendars/src/types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Theme } from '../../../types/theme';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react-native';

// Custom header component with month/year picker
interface CustomHeaderProps {
  month: Date;
  theme: Theme;
  onMonthChange?: (date: { dateString: string; day: number; month: number; year: number; timestamp: number }) => void;
}

const CustomHeader = ({ month, theme, onMonthChange }: CustomHeaderProps) => {
  const currentDate = new Date(month);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

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

  // Generate years (current year ± 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  const handleMonthYearSelect = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    if (onMonthChange) {
      // Format data sesuai dengan yang diharapkan oleh Calendar component
      const dateString = newDate.toISOString().split('T')[0];
      onMonthChange({
        dateString,
        day: newDate.getDate(),
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear(),
        timestamp: newDate.getTime()
      });
    }
    setShowPicker(false);
  };

  const openPicker = () => {
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth());
    setShowPicker(true);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={openPicker}
          activeOpacity={0.7}
        >
          <Text style={[styles.headerDate, { color: theme.colors.primary }]}>
            {dayName}, {monthName} {day}, {year}
          </Text>
          <ChevronDown
            size={20}
            color={theme.colors.primary}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.pickerHeader}>
              <Text style={[styles.pickerTitle, { color: theme.colors.text }]}>
                Pilih Bulan & Tahun
              </Text>
            </View>

            <View style={styles.pickerContent}>
              {/* Month Picker */}
              <View style={styles.pickerSection}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Bulan
                </Text>
                <ScrollView
                  style={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {monthNames.map((monthName, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.pickerItem,
                        selectedMonth === index && {
                          backgroundColor: theme.colors.primary + '20',
                          borderColor: theme.colors.primary,
                        },
                      ]}
                      onPress={() => setSelectedMonth(index)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          {
                            color:
                              selectedMonth === index
                                ? theme.colors.primary
                                : theme.colors.text,
                          },
                        ]}
                      >
                        {monthName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerSection}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Tahun
                </Text>
                <ScrollView
                  style={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {years.map((yearItem) => (
                    <TouchableOpacity
                      key={yearItem}
                      style={[
                        styles.pickerItem,
                        selectedYear === yearItem && {
                          backgroundColor: theme.colors.primary + '20',
                          borderColor: theme.colors.primary,
                        },
                      ]}
                      onPress={() => setSelectedYear(yearItem)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          {
                            color:
                              selectedYear === yearItem
                                ? theme.colors.primary
                                : theme.colors.text,
                          },
                        ]}
                      >
                        {yearItem}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.pickerActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.cancelButton,
                  { borderColor: theme.colors.border },
                ]}
                onPress={() => setShowPicker(false)}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Batal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.confirmButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleMonthYearSelect}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    { color: theme.colors.surface },
                  ]}
                >
                  Pilih
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const Calendar = ({ current, onMonthChange, ...props }: CalendarProps) => {
  const { theme: globalTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState(
    current || new Date().toISOString().split('T')[0]
  );

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
      key={currentDate} // Force re-render when date changes
      style={{
        borderRadius: 10,
        elevation: 4,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: 'hidden',
        padding: 5,
      }}
      theme={calendarTheme}
      renderHeader={(date) => (
        <CustomHeader
          month={date || new Date(currentDate)}
          theme={globalTheme}
          onMonthChange={(dateObj) => {
            setCurrentDate(dateObj.dateString);
            if (onMonthChange) {
              onMonthChange(dateObj);
            }
          }}
        />
      )}
      current={currentDate}
      onMonthChange={(month) => {
        setCurrentDate(month.dateString);
        if (onMonthChange) {
          onMonthChange(month);
        }
      }}
      hideExtraDays={false}
      firstDay={0} // Start week on Sunday
      enableSwipeMonths={true}
      {...props}
    />
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  headerDate: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  chevronIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerContainer: {
    width: Math.min(screenWidth - 40, 400),
    maxHeight: screenHeight * 0.8,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  pickerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  pickerContent: {
    flexDirection: 'row',
    maxHeight: 300,
  },
  pickerSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 250,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  pickerActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  confirmButton: {
    borderWidth: 0,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export { Calendar };
export type { CalendarProps };
