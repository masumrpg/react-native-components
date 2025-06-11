import React, {
  useState,
  forwardRef,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { ChevronDown, Check, Search, X } from 'lucide-react-native';

// Animation constants
const ANIMATION_DURATION = 250;
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 0.8,
} as const;

type ComboboxVariant = 'default' | 'outline' | 'filled';
type ComboboxSize = 'sm' | 'md' | 'lg';
type ComboboxState = 'default' | 'error' | 'success' | 'warning' | 'disabled';

interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface BaseComboboxProps {
  label?: string;
  placeholder?: string;
  variant?: ComboboxVariant;
  size?: ComboboxSize;
  state?: ComboboxState;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  options: ComboboxOption[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  onSearchChange?: (search: string) => void;
  borderRadius?: keyof Theme['borderRadius'];
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  animationEnabled?: boolean;
  maxDropdownHeight?: number;
}

type ComboboxProps = BaseComboboxProps;

const Combobox = forwardRef<View, ComboboxProps>(
  (
    {
      label,
      placeholder = 'Select an option...',
      variant = 'outline',
      size = 'md',
      state = 'default',
      helperText,
      errorText,
      required = false,
      disabled = false,
      searchable = false,
      clearable = false,
      multiple = false,
      options = [],
      value,
      onValueChange,
      onSearchChange,
      borderRadius = 'lg',
      style,
      inputStyle,
      labelStyle,
      helperTextStyle,
      dropdownStyle,
      optionStyle,
      animationEnabled = true,
      maxDropdownHeight = 250,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const triggerRef = useRef<View>(null);
    const dropdownAnimation = useSharedValue(0);
    const chevronAnimation = useSharedValue(0);
    const scaleAnimation = useSharedValue(1);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchText) return options;
      return options.filter(option =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
    }, [options, searchText, searchable]);

    // Get selected options
    const selectedOptions = useMemo(() => {
      if (!value) return [];
      const values = Array.isArray(value) ? value : [value];
      return options.filter(option => values.includes(option.value));
    }, [value, options]);

    // Display text
    const displayText = useMemo(() => {
      if (selectedOptions.length === 0) return placeholder;
      if (multiple) {
        return selectedOptions.length === 1
          ? selectedOptions[0].label
          : `${selectedOptions.length} items selected`;
      }
      return selectedOptions[0]?.label || placeholder;
    }, [selectedOptions, placeholder, multiple]);

    const styles = useThemedStyles((theme: Theme) => ({
      container: {
        marginBottom: theme.spacing.md,
      },
      label: {
        fontSize: theme.sizes.md,
        fontWeight: '600',
        color: state === 'error' ? theme.colors.error : theme.colors.text,
        marginBottom: theme.spacing.sm,
        letterSpacing: 0.2,
      },
      trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: size === 'sm' ? theme.spacing.md : size === 'lg' ? theme.spacing.lg : theme.spacing.md + 2,
        paddingVertical: size === 'sm' ? theme.spacing.sm : size === 'lg' ? theme.spacing.md : theme.spacing.sm + 4,
        borderRadius: theme.borderRadius[borderRadius],
        backgroundColor: variant === 'filled' ? theme.colors.surface :
                        variant === 'outline' ? theme.colors.surface : 'transparent',
        borderWidth: variant === 'outline' ? 2 : 0,
        borderColor: state === 'error' ? theme.colors.error :
                    state === 'success' ? theme.colors.success :
                    isOpen ? theme.colors.primary : theme.colors.border,
        opacity: disabled ? 0.6 : 1,
        shadowColor: isOpen ? theme.colors.primary : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isOpen ? 0.1 : 0,
        shadowRadius: 8,
        elevation: isOpen ? 2 : 0,
        minHeight: size === 'sm' ? 40 : size === 'lg' ? 56 : 48,
      },
      triggerText: {
        flex: 1,
        fontSize: size === 'sm' ? theme.sizes.sm : size === 'lg' ? theme.sizes.lg : theme.sizes.md,
        fontWeight: selectedOptions.length > 0 ? '500' : '400',
        color: selectedOptions.length > 0 ? theme.colors.text : theme.colors.textSecondary,
        letterSpacing: 0.1,
      },
      chevron: {
        marginLeft: theme.spacing.sm,
        padding: 4,
      },
      clearButton: {
        marginLeft: theme.spacing.xs,
        padding: 6,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.background,
      },
      helperText: {
        fontSize: theme.sizes.sm,
        color: state === 'error' ? theme.colors.error : theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
        fontWeight: '400',
      },
      modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      modalContent: {
        position: 'absolute',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius[borderRadius],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
        maxHeight: maxDropdownHeight,
        overflow: 'hidden',
      },
      searchContainer: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background,
      },
      searchInput: {
        fontSize: theme.sizes.md,
        color: theme.colors.text,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius[borderRadius === 'xl' ? 'lg' : borderRadius === 'lg' ? 'md' : 'sm'],
        backgroundColor: theme.colors.surface,
        fontWeight: '400',
        minHeight: 44,
      },
      optionsList: {
        maxHeight: maxDropdownHeight - (searchable ? 80 : 0),
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
      },
      optionText: {
        flex: 1,
        fontSize: theme.sizes.md,
        color: theme.colors.text,
        fontWeight: '400',
        letterSpacing: 0.1,
      },
      optionDisabled: {
        opacity: 0.4,
      },
      selectedOption: {
        backgroundColor: theme.colors.primary + '08',
      },
      optionHover: {
        backgroundColor: theme.colors.background,
      },
      checkIcon: {
        marginLeft: theme.spacing.sm,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        padding: 2,
      },
      emptyState: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.lg,
        alignItems: 'center',
      },
      emptyText: {
        fontSize: theme.sizes.md,
        color: theme.colors.textSecondary,
        fontWeight: '400',
        textAlign: 'center',
      },
    }));

    const handleToggle = useCallback(() => {
      if (disabled) return;

      // Scale animation for modern feel
      scaleAnimation.value = withSpring(0.98, { damping: 20, stiffness: 300 }, () => {
        scaleAnimation.value = withSpring(1, { damping: 20, stiffness: 300 });
      });

      if (!isOpen) {
        // Measure trigger position
        triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
          setDropdownPosition({
            top: pageY + height + 8,
            left: pageX,
            width: width,
          });
        });
      }

      setIsOpen(!isOpen);

      if (animationEnabled) {
        dropdownAnimation.value = withTiming(isOpen ? 0 : 1, {
          duration: ANIMATION_DURATION,
        });
        chevronAnimation.value = withSpring(isOpen ? 0 : 1, SPRING_CONFIG);
      }
    }, [isOpen, disabled, animationEnabled, dropdownAnimation, chevronAnimation, scaleAnimation]);

    const handleOptionSelect = useCallback((option: ComboboxOption) => {
      if (option.disabled) return;

      let newValue: string | string[];

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        if (currentValues.includes(option.value)) {
          newValue = currentValues.filter(v => v !== option.value);
        } else {
          newValue = [...currentValues, option.value];
        }
      } else {
        newValue = option.value;
        setIsOpen(false);
        if (animationEnabled) {
          dropdownAnimation.value = withTiming(0, { duration: ANIMATION_DURATION });
          chevronAnimation.value = withSpring(0, SPRING_CONFIG);
        }
      }

      onValueChange?.(newValue);
    }, [value, multiple, onValueChange, animationEnabled, dropdownAnimation, chevronAnimation]);

    const handleClear = useCallback(() => {
      onValueChange?.(multiple ? [] : '');
    }, [multiple, onValueChange]);

    const handleSearchChange = useCallback((text: string) => {
      setSearchText(text);
      onSearchChange?.(text);
    }, [onSearchChange]);

    const triggerAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scaleAnimation.value }],
    }));

    const chevronAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: `${interpolate(chevronAnimation.value, [0, 1], [0, 180])}deg`,
        },
      ],
    }));

    const dropdownAnimatedStyle = useAnimatedStyle(() => ({
      opacity: dropdownAnimation.value,
      transform: [
        {
          scaleY: interpolate(dropdownAnimation.value, [0, 1], [0.9, 1]),
        },
        {
          translateY: interpolate(dropdownAnimation.value, [0, 1], [-10, 0]),
        },
      ],
    }));

    const iconSize = size === 'sm' ? 18 : size === 'lg' ? 24 : 20;

    const isSelected = useCallback((option: ComboboxOption) => {
      if (!value) return false;
      const values = Array.isArray(value) ? value : [value];
      return values.includes(option.value);
    }, [value]);

    return (
      <View style={[styles.container, style]} ref={ref}>
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
        )}

        <Animated.View style={animationEnabled ? triggerAnimatedStyle : {}}>
          <TouchableOpacity
            ref={triggerRef}
            style={[styles.trigger, inputStyle]}
            onPress={handleToggle}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <Text style={styles.triggerText} numberOfLines={1}>
              {displayText}
            </Text>

            {clearable && selectedOptions.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X size={iconSize - 2} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}

            <Animated.View style={[styles.chevron, animationEnabled ? chevronAnimatedStyle : {}]}>
              <ChevronDown size={iconSize} color={theme.colors.textSecondary} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {(helperText || errorText) && (
          <Text style={[styles.helperText, helperTextStyle]}>
            {errorText || helperText}
          </Text>
        )}

        <Modal
          visible={isOpen}
          transparent
          animationType="none"
          onRequestClose={() => setIsOpen(false)}
        >
          <Pressable style={styles.modal} onPress={() => setIsOpen(false)}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                },
                dropdownStyle,
                animationEnabled ? dropdownAnimatedStyle : {},
              ]}
            >
              {searchable && (
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search options..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={searchText}
                    onChangeText={handleSearchChange}
                    autoFocus
                  />
                </View>
              )}

              <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
                {filteredOptions.map((option, index) => {
                  const selected = isSelected(option);
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.option,
                        selected && styles.selectedOption,
                        option.disabled && styles.optionDisabled,
                        optionStyle,
                      ]}
                      onPress={() => handleOptionSelect(option)}
                      disabled={option.disabled}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.optionText}>{option.label}</Text>
                      {selected && (
                        <View style={styles.checkIcon}>
                          <Check size={iconSize - 4} color="white" strokeWidth={2.5} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}

                {filteredOptions.length === 0 && (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>
                      {searchText ? 'No matching options found' : 'No options available'}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </Animated.View>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

// Specialized Combobox variants
const ComboboxMultiple = forwardRef<View, Omit<ComboboxProps, 'multiple'>>(
  (props, ref) => {
    return <Combobox ref={ref} {...props} multiple />;
  }
);

const ComboboxSearchable = forwardRef<View, Omit<ComboboxProps, 'searchable'>>(
  (props, ref) => {
    return <Combobox ref={ref} {...props} searchable />;
  }
);

// Display names
Combobox.displayName = 'Combobox';
ComboboxMultiple.displayName = 'ComboboxMultiple';
ComboboxSearchable.displayName = 'ComboboxSearchable';

export {
  Combobox,
  ComboboxMultiple,
  ComboboxSearchable,
  type ComboboxProps,
  type ComboboxOption,
  type ComboboxVariant,
  type ComboboxSize,
  type ComboboxState,
};