import React, {
  useState,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  Modal as RNModal,
  Pressable,
  TextInput,
  Dimensions,
  useWindowDimensions,
  Platform,
  InteractionManager,
  Animated,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { resolveColor } from '../../../utils/color';
import { ChevronDown, Check, X } from 'lucide-react-native';

// Animation constants
const ANIMATION_DURATION = 250;
const SPRING_CONFIG = {
  tension: Platform.OS === 'android' ? 120 : 150,
  friction: Platform.OS === 'android' ? 8 : 7,
  useNativeDriver: true,
} as const;

// Types
// type ComboboxVariant = 'default' | 'outline' | 'filled';
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
  // variant?: ComboboxVariant;
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
  closeOnSelect?: boolean;
  backgroundColor?: string;
  // padding?: keyof Theme['spacing'];
  elevation?: number;
  shadowOpacity?: number;
}

type ComboboxProps = BaseComboboxProps;

// Styles factory following Modal pattern
const createComboboxStyles = (theme: Theme) => ({
  container: {} as ViewStyle,

  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.2,
  } as TextStyle,

  labelError: {
    color: theme.colors.error,
  } as TextStyle,

  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.borderRadius.lg,
    backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    ...(Platform.OS === 'android' && {
      elevation: 1,
    }),
  } as ViewStyle,

  triggerFocused: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    ...(Platform.OS === 'android' && {
      elevation: 2,
    }),
  } as ViewStyle,

  triggerError: {
    borderColor: theme.colors.error,
  } as ViewStyle,

  triggerSuccess: {
    borderColor: theme.colors.success,
  } as ViewStyle,

  triggerDisabled: {
    opacity: 0.6,
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
  } as ViewStyle,

  triggerText: {
    flex: 1,
    color: theme.colors.text,
    fontWeight: '400',
    letterSpacing: 0.1,
  } as TextStyle,

  triggerTextPlaceholder: {
    color: theme.colors.textSecondary,
  } as TextStyle,

  triggerTextSelected: {
    fontWeight: '500',
  } as TextStyle,

  chevron: {
    marginLeft: theme.spacing.sm,
    padding: 4,
  } as ViewStyle,

  clearButton: {
    marginLeft: theme.spacing.xs,
    padding: 6,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
  } as ViewStyle,

  helperText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    fontWeight: '400',
  } as TextStyle,

  helperTextError: {
    color: theme.colors.error,
  } as TextStyle,

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  } as ViewStyle,

  modalContent: {
    position: 'absolute',
    backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
    borderRadius: theme.borderRadius.lg,
    shadowColor: resolveColor(theme, 'text', theme.colors.text),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
    ...(Platform.OS === 'android' && {
      elevation: 8,
    }),
  } as ViewStyle,

  searchContainer: {
    padding: theme.spacing.md,
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
    borderBottomWidth: 1,
    borderBottomColor: resolveColor(theme, 'border', theme.colors.border),
  } as ViewStyle,

  searchInput: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: resolveColor(theme, 'surface', theme.colors.surface),
    fontWeight: '400',
    minHeight: 44,
    borderWidth: 1,
    borderColor: resolveColor(theme, 'border', theme.colors.border),
  } as ViewStyle,

  optionsList: {
    flexGrow: 1,
  } as ViewStyle,

  optionsScrollContainer: {
    paddingBottom: Platform.OS === 'android' ? 8 : 0,
  } as ViewStyle,

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 48,
    backgroundColor: 'transparent',
  } as ViewStyle,

  optionHover: {
    backgroundColor: resolveColor(theme, 'background', theme.colors.background),
  } as ViewStyle,

  optionSelected: {
    backgroundColor: theme.colors.primary + '08',
  } as ViewStyle,

  optionDisabled: {
    opacity: 0.4,
  } as ViewStyle,

  optionText: {
    flex: 1,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    fontWeight: '400',
    letterSpacing: 0.1,
  } as TextStyle,

  checkIcon: {
    marginLeft: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    padding: 2,
  } as ViewStyle,

  emptyState: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  } as ViewStyle,

  emptyText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '400',
    textAlign: 'center',
  } as TextStyle,
});

// Size configuration
const getSizeStyles = (size: ComboboxSize, theme: Theme) => {
  const sizeMap = {
    sm: {
      padding: { horizontal: theme.spacing.md, vertical: theme.spacing.sm },
      fontSize: theme.typography.body.fontSize,
      minHeight: 40,
      iconSize: 18,
    },
    md: {
      padding: {
        horizontal: theme.spacing.md,
        vertical: theme.spacing.sm,
      },
      fontSize: theme.typography.body.fontSize,
      minHeight: 48,
      iconSize: 20,
    },
    lg: {
      padding: { horizontal: theme.spacing.lg, vertical: theme.spacing.md },
      fontSize: theme.typography.subtitle.fontSize,
      minHeight: 56,
      iconSize: 24,
    },
  };
  return sizeMap[size];
};

// Fixed dropdown positioning utility for Android
const getDropdownPosition = (
  triggerLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  },
  dropdownHeight: number,
  screenHeight: number
) => {
  // Adjust pageY to account for status bar on Android
  const adjustedPageY =
    Platform.OS === 'android' ? triggerLayout.pageY : triggerLayout.pageY;

  const spaceBelow = screenHeight - (adjustedPageY + triggerLayout.height);
  const spaceAbove = adjustedPageY;
  const showAbove = spaceBelow < dropdownHeight + 20 && spaceAbove > spaceBelow;

  return {
    top: showAbove
      ? adjustedPageY - dropdownHeight - 8
      : adjustedPageY + triggerLayout.height + 8,
    left: triggerLayout.pageX,
    width: triggerLayout.width,
    showAbove,
  };
};

// Ubah default borderRadius dari 'lg' ke 'md'
const Combobox = forwardRef<React.ComponentRef<typeof View>, ComboboxProps>(
  (
    {
      label,
      placeholder = 'Select an option...',
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
      borderRadius = 'md',
      style,
      inputStyle,
      labelStyle,
      helperTextStyle,
      dropdownStyle,
      optionStyle,
      animationEnabled = true,
      maxDropdownHeight = 250,
      closeOnSelect = true,
      backgroundColor,
      elevation = 3,
      shadowOpacity = 0.1,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const styles = useThemedStyles(createComboboxStyles);
    const sizeStyles = getSizeStyles(size, theme);

    // State management following Modal pattern
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
      showAbove: false,
    });
    const [isModalReady, setIsModalReady] = useState(false);
    const [shouldShowModal, setShouldShowModal] = useState(false);

    // Refs for tracking
    const triggerRef = useRef<View>(null);
    const isAnimatingRef = useRef(false);
    const mountedRef = useRef(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Screen dimensions
    const windowDimensions = useWindowDimensions();
    const screenDimensions = Dimensions.get('screen');

    const { height: screenHeight } = useMemo(() => {
      const fallbackHeight = 667;

      if (Platform.OS === 'android') {
        // For Android, use window height which excludes status bar
        return {
          height: windowDimensions.height || fallbackHeight,
        };
      }

      return {
        height: windowDimensions.height || fallbackHeight,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowDimensions, screenDimensions]);

    // Animation values - Changed to Animated.Value
    const dropdownAnimation = useRef(new Animated.Value(0)).current;
    const chevronAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    // Initialize animation values
    const initializeAnimationValues = useCallback(() => {
      dropdownAnimation.setValue(0);
      opacity.setValue(0);
      chevronAnimation.setValue(isOpen ? 1 : 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchText) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchText.toLowerCase())
      );
    }, [options, searchText, searchable]);

    // Get selected options
    const selectedOptions = useMemo(() => {
      if (!value) return [];
      const values = Array.isArray(value) ? value : [value];
      return options.filter((option) => values.includes(option.value));
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

    // Safe state updater
    const safeSetState = useCallback((setter: () => void) => {
      if (mountedRef.current) {
        setter();
      }
    }, []);

    // Animation completion handler
    const onAnimationComplete = useCallback(
      (isOpening: boolean) => {
        isAnimatingRef.current = false;

        if (!isOpening && mountedRef.current) {
          timeoutRef.current = setTimeout(() => {
            safeSetState(() => setShouldShowModal(false));
          }, 50);
        }
      },
      [safeSetState]
    );

    // Show dropdown
    const showDropdown = useCallback(() => {
      if (!mountedRef.current || isAnimatingRef.current || disabled) return;

      // Measure trigger position
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        const dropdownHeight = Math.min(
          maxDropdownHeight,
          filteredOptions.length * 50 + (searchable ? 80 : 20)
        );

        const position = getDropdownPosition(
          { x, y, width, height, pageX, pageY },
          dropdownHeight,
          screenHeight
        );

        setDropdownPosition(position);
      });

      isAnimatingRef.current = true;
      setIsModalReady(false);
      setShouldShowModal(true);
      setIsOpen(true);

      // Scale animation for modern feel
      Animated.sequence([
        Animated.spring(scaleAnimation, {
          toValue: 0.98,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
      ]).start();

      initializeAnimationValues();

      InteractionManager.runAfterInteractions(() => {
        if (!mountedRef.current) return;

        const readyDelay = Platform.OS === 'android' ? 100 : 50;

        setTimeout(() => {
          if (!mountedRef.current) return;

          safeSetState(() => setIsModalReady(true));

          // Start animations
          Animated.timing(opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION * 0.8,
            useNativeDriver: true,
          }).start();

          setTimeout(
            () => {
              if (!mountedRef.current) return;

              Animated.parallel([
                Animated.spring(dropdownAnimation, {
                  toValue: 1,
                  ...SPRING_CONFIG,
                }),
                Animated.spring(chevronAnimation, {
                  toValue: 1,
                  ...SPRING_CONFIG,
                }),
              ]).start((finished) => {
                if (finished) {
                  onAnimationComplete(true);
                }
              });
            },
            Platform.OS === 'android' ? 100 : 50
          );
        }, readyDelay);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      disabled,
      filteredOptions.length,
      maxDropdownHeight,
      screenHeight,
      searchable,
      initializeAnimationValues,
      safeSetState,
      onAnimationComplete,
    ]);

    // Hide dropdown
    const hideDropdown = useCallback(() => {
      if (!mountedRef.current || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      setIsOpen(false);

      const exitDuration =
        Platform.OS === 'android'
          ? ANIMATION_DURATION * 0.6
          : ANIMATION_DURATION * 0.8;

      Animated.parallel([
        Animated.timing(dropdownAnimation, {
          toValue: 0,
          duration: exitDuration,
          useNativeDriver: true,
        }),
        Animated.spring(chevronAnimation, {
          toValue: 0,
          ...SPRING_CONFIG,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: exitDuration,
          useNativeDriver: true,
        }),
      ]).start((finished) => {
        if (finished) {
          onAnimationComplete(false);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onAnimationComplete]);

    // Handle toggle
    const handleToggle = useCallback(() => {
      if (isOpen) {
        hideDropdown();
      } else {
        showDropdown();
      }
    }, [isOpen, hideDropdown, showDropdown]);

    // Handle option select
    const handleOptionSelect = useCallback(
      (option: ComboboxOption) => {
        if (option.disabled) return;

        let newValue: string | string[];

        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          if (currentValues.includes(option.value)) {
            newValue = currentValues.filter((v) => v !== option.value);
          } else {
            newValue = [...currentValues, option.value];
          }
        } else {
          newValue = option.value;
          if (closeOnSelect) {
            hideDropdown();
          }
        }

        onValueChange?.(newValue);
      },
      [value, multiple, onValueChange, closeOnSelect, hideDropdown]
    );

    // Handle clear
    const handleClear = useCallback(() => {
      onValueChange?.(multiple ? [] : '');
    }, [multiple, onValueChange]);

    // Handle search change
    const handleSearchChange = useCallback(
      (text: string) => {
        setSearchText(text);
        onSearchChange?.(text);
      },
      [onSearchChange]
    );

    // Handle backdrop press
    const handleBackdropPress = useCallback(() => {
      if (!isAnimatingRef.current && isModalReady) {
        hideDropdown();
      }
    }, [hideDropdown, isModalReady]);

    // Check if option is selected
    const isSelected = useCallback(
      (option: ComboboxOption) => {
        if (!value) return false;
        const values = Array.isArray(value) ? value : [value];
        return values.includes(option.value);
      },
      [value]
    );

    // Cleanup
    useEffect(() => {
      return () => {
        mountedRef.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        dropdownAnimation.stopAnimation();
        chevronAnimation.stopAnimation();
        scaleAnimation.stopAnimation();
        opacity.stopAnimation();
      };
    }, [dropdownAnimation, chevronAnimation, scaleAnimation, opacity]);

    // Animated styles - Changed to use Animated.View interpolation
    const triggerAnimatedStyle = {
      transform: [{ scale: scaleAnimation }],
    };

    const chevronAnimatedStyle = {
      transform: [
        {
          rotate: chevronAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };

    const overlayAnimatedStyle = {
      opacity: opacity,
    };

    const dropdownAnimatedStyle = {
      opacity: dropdownAnimation,
      transform: [
        {
          scaleY: dropdownAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
        {
          translateY: dropdownAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [dropdownPosition.showAbove ? 10 : -10, 0],
          }),
        },
      ],
    };

    // Computed styles
    const triggerStyle = [
      styles.trigger,
      isOpen && styles.triggerFocused,
      state === 'error' && styles.triggerError,
      state === 'success' && styles.triggerSuccess,
      disabled && styles.triggerDisabled,
      {
        paddingHorizontal: sizeStyles.padding.horizontal,
        paddingVertical: sizeStyles.padding.vertical,
        minHeight: sizeStyles.minHeight,
        borderRadius: theme.borderRadius[borderRadius],
        backgroundColor: resolveColor(
          theme,
          backgroundColor,
          theme.colors.surface
        ),
      },
      inputStyle,
    ];

    const triggerTextStyle = [
      styles.triggerText,
      selectedOptions.length === 0
        ? styles.triggerTextPlaceholder
        : styles.triggerTextSelected,
      {
        fontSize: sizeStyles.fontSize,
      },
    ];

    return (
      <View style={[styles.container, style]} ref={ref}>
        {label && (
          <Text
            style={[
              styles.label,
              state === 'error' && styles.labelError,
              labelStyle,
            ]}
          >
            {label}
            {required && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
        )}

        <Animated.View style={animationEnabled ? triggerAnimatedStyle : {}}>
          <TouchableOpacity
            ref={triggerRef}
            style={triggerStyle}
            onPress={handleToggle}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <Text style={triggerTextStyle} numberOfLines={1}>
              {displayText}
            </Text>

            {clearable && selectedOptions.length > 0 && !disabled && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X
                  size={sizeStyles.iconSize - 2}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            )}

            <Animated.View
              style={[
                styles.chevron,
                animationEnabled ? chevronAnimatedStyle : {},
              ]}
            >
              <ChevronDown
                size={sizeStyles.iconSize}
                color={theme.colors.textSecondary}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {(helperText || errorText) && (
          <Text
            style={[
              styles.helperText,
              state === 'error' && styles.helperTextError,
              helperTextStyle,
            ]}
          >
            {state === 'error' ? errorText : helperText}
          </Text>
        )}

        {shouldShowModal && (
          <RNModal
            visible={shouldShowModal}
            transparent
            animationType="none"
            onRequestClose={hideDropdown}
            statusBarTranslucent
          >
            <Animated.View
              style={[styles.overlay, overlayAnimatedStyle]}
              pointerEvents={isModalReady ? 'auto' : 'none'}
            >
              <Pressable
                style={{ flex: 1 }}
                onPress={handleBackdropPress}
                disabled={!isModalReady}
              >
                <Animated.View
                  style={[
                    styles.modalContent,
                    {
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      width: dropdownPosition.width,
                      maxHeight: maxDropdownHeight,
                      backgroundColor: resolveColor(
                        theme,
                        backgroundColor,
                        theme.colors.surface
                      ),
                      ...(Platform.OS === 'android'
                        ? {
                            elevation,
                          }
                        : {
                            shadowOpacity,
                          }),
                    },
                    dropdownStyle,
                    animationEnabled ? dropdownAnimatedStyle : {},
                  ]}
                  pointerEvents="box-none"
                >
                  {searchable && (
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor={theme.colors.textSecondary}
                        value={searchText}
                        onChangeText={handleSearchChange}
                        autoFocus={false}
                      />
                    </View>
                  )}

                  <ScrollView
                    style={styles.optionsList}
                    contentContainerStyle={styles.optionsScrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {filteredOptions.length === 0 ? (
                      <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>
                          {searchText
                            ? 'No results found'
                            : 'No options available'}
                        </Text>
                      </View>
                    ) : (
                      filteredOptions.map((option, index) => {
                        const selected = isSelected(option);
                        return (
                          <TouchableOpacity
                            key={`${option.value}-${index}`}
                            style={[
                              styles.option,
                              selected && styles.optionSelected,
                              option.disabled && styles.optionDisabled,
                              optionStyle,
                            ]}
                            onPress={() => handleOptionSelect(option)}
                            disabled={option.disabled}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.optionText}>
                              {option.label}
                            </Text>
                            {selected && (
                              <View style={styles.checkIcon}>
                                <Check
                                  size={sizeStyles.iconSize - 6}
                                  color={theme.colors.surface}
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })
                    )}
                  </ScrollView>
                </Animated.View>
              </Pressable>
            </Animated.View>
          </RNModal>
        )}
      </View>
    );
  }
);

Combobox.displayName = 'Combobox';


export {Combobox};
export type { ComboboxProps, ComboboxOption };
