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
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Typography } from '../typography';
import { useTheme } from '../../../context/RNCProvider';
import { Theme } from '../../../types/theme';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { createShadow } from '../../../utils';
import { ChevronDown, Check, X } from 'lucide-react-native';
import { ComponentSize, ComponentState } from '../../../types/ui';
import { ANIMATION_CONSTANTS } from '../../../constants/ui';

// Animation constants
const SPRING_CONFIG = {
  tension: Platform.OS === 'android' ? 120 : 150,
  friction: Platform.OS === 'android' ? 8 : 7,
  useNativeDriver: true,
} as const;

interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type BaseComboboxProps = {
  label?: string;
  placeholder?: string;
  size?: ComponentSize;
  state?: ComponentState;
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
  borderRadius?: keyof Theme['components']['borderRadius'];
  style?: StyleProp<ViewStyle>;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  dropdownStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  animationEnabled?: boolean;
  maxDropdownHeight?: number;
  closeOnSelect?: boolean;
  backgroundColor?: string;
  elevation?: number;
  shadowOpacity?: number;
};

type ComboboxProps = BaseComboboxProps;

// Styles factory following Modal pattern
const createComboboxStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {},

    label: {
      fontSize: theme.typography.body.fontSize,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      letterSpacing: 0.2,
    },

    labelError: {
      color: theme.colors.error,
    },

    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: theme.components.borderRadius.lg,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...createShadow(2),
    },

    triggerFocused: {
      borderColor: theme.colors.primary,
      ...createShadow(2),
    },

    triggerError: {
      borderColor: theme.colors.error,
    },

    triggerSuccess: {
      borderColor: theme.colors.success,
    },

    triggerDisabled: {
      opacity: 0.6,
      backgroundColor: theme.colors.background,
    },

    triggerText: {
      flex: 1,
      color: theme.colors.text,
      fontWeight: '400',
      letterSpacing: 0.1,
    },

    triggerTextPlaceholder: {
      color: theme.colors.textSecondary,
    },

    triggerTextSelected: {
      fontWeight: '500',
    },

    chevron: {
      marginLeft: theme.spacing.sm,
      padding: 4,
    },

    clearButton: {
      marginLeft: theme.spacing.xs,
      padding: 6,
      borderRadius: theme.components.borderRadius.sm,
      backgroundColor: theme.colors.background,
    },

    helperText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.sm,
      fontWeight: '400',
    },

    helperTextError: {
      color: theme.colors.error,
    },

    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    modalContent: {
      position: 'absolute',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.components.borderRadius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...createShadow(8),
    },

    searchContainer: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    searchInput: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.components.borderRadius.md,
      backgroundColor: theme.colors.surface,
      fontWeight: '400',
      minHeight: 44,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    optionsList: {
      flexGrow: 1,
    },

    optionsScrollContainer: {
      paddingBottom: Platform.OS === 'android' ? 8 : 0,
    },

    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      minHeight: 48,
      backgroundColor: 'transparent',
    },

    optionHover: {
      backgroundColor: theme.colors.background,
    },

    optionSelected: {
      backgroundColor: theme.colors.primary + '08',
    },

    optionDisabled: {
      opacity: 0.4,
    },

    optionText: {
      flex: 1,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      fontWeight: '400',
      letterSpacing: 0.1,
    },

    checkIcon: {
      marginLeft: theme.spacing.sm,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.components.borderRadius.full,
      padding: 2,
    },

    emptyState: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      alignItems: 'center',
    },

    emptyText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      fontWeight: '400',
      textAlign: 'center',
    },
  });

// Size configuration - Consistent with Input component
const getSizeStyles = (size: ComponentSize, theme: Theme) => {
  const sizeMap = {
    xs: {
      padding: { horizontal: theme.spacing.xs, vertical: 0 },
      fontSize: theme.typography.caption.fontSize,
      minHeight: 32,
      iconSize: 16,
    },
    sm: {
      padding: { horizontal: theme.spacing.sm, vertical: 0 },
      fontSize: theme.typography.body.fontSize,
      minHeight: 36,
      iconSize: 18,
    },
    md: {
      padding: {
        horizontal: theme.spacing.md,
        vertical: 0,
      },
      fontSize: theme.typography.body.fontSize,
      minHeight: 42,
      iconSize: 20,
    },
    lg: {
      padding: { horizontal: theme.spacing.lg, vertical: 0 },
      fontSize: theme.typography.subtitle.fontSize,
      minHeight: 48,
      iconSize: 24,
    },
    xl: {
      padding: { horizontal: theme.spacing.xl, vertical: 0 },
      fontSize: theme.typography.title.fontSize,
      minHeight: 56,
      iconSize: 28,
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
  const adjustedPageY = Platform.OS === 'android' ? triggerLayout.pageY : triggerLayout.pageY;

  const spaceBelow = screenHeight - (adjustedPageY + triggerLayout.height);
  const spaceAbove = adjustedPageY;
  const showAbove = spaceBelow < dropdownHeight + 20 && spaceAbove > spaceBelow;

  return {
    top: showAbove ? adjustedPageY - dropdownHeight - 8 : adjustedPageY + triggerLayout.height + 8,
    left: triggerLayout.pageX,
    width: triggerLayout.width,
    showAbove,
  };
};

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
            duration: ANIMATION_CONSTANTS.DURATION.NORMAL * 0.8,
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
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
          ? ANIMATION_CONSTANTS.DURATION.NORMAL * 0.6
          : ANIMATION_CONSTANTS.DURATION.NORMAL * 0.8;

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
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
        borderRadius: theme.components.borderRadius[borderRadius],
        backgroundColor: backgroundColor ?? theme.colors.surface,
      },
      inputStyle,
    ];

    const triggerTextStyle = [
      styles.triggerText,
      selectedOptions.length === 0 ? styles.triggerTextPlaceholder : styles.triggerTextSelected,
      {
        fontSize: sizeStyles.fontSize,
      },
    ];

    return (
      <View style={[styles.container, style]} ref={ref}>
        {label && (
          <Typography
            variant="label"
            style={[styles.label, state === 'error' && styles.labelError, labelStyle]}
          >
            {label}
            {required && (
              <Typography variant="body" style={{ color: theme.colors.error }}>
                {' '}
                *
              </Typography>
            )}
          </Typography>
        )}

        <Animated.View style={animationEnabled ? triggerAnimatedStyle : {}}>
          <TouchableOpacity
            ref={triggerRef}
            style={triggerStyle}
            onPress={handleToggle}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <Typography variant="body" style={triggerTextStyle} numberOfLines={1}>
              {displayText}
            </Typography>

            {clearable && selectedOptions.length > 0 && !disabled && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X size={sizeStyles.iconSize - 2} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}

            <Animated.View style={[styles.chevron, animationEnabled ? chevronAnimatedStyle : {}]}>
              <ChevronDown size={sizeStyles.iconSize} color={theme.colors.textSecondary} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {(helperText ?? errorText) && (
          <Typography
            variant="small"
            style={[
              styles.helperText,
              state === 'error' && styles.helperTextError,
              helperTextStyle,
            ]}
          >
            {state === 'error' ? errorText : helperText}
          </Typography>
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
              <Pressable style={{ flex: 1 }} onPress={handleBackdropPress} disabled={!isModalReady}>
                <Animated.View
                  style={[
                    styles.modalContent,
                    {
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      width: dropdownPosition.width,
                      maxHeight: maxDropdownHeight,
                      backgroundColor: backgroundColor ?? theme.colors.surface,
                      ...(Platform.OS === 'ios'
                        ? {
                            shadowOpacity,
                          }
                        : {
                            elevation,
                          }),
                    },
                    dropdownStyle,
                    animationEnabled ? dropdownAnimatedStyle : {},
                  ]}
                  pointerEvents={isModalReady ? 'auto' : 'none'}
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
                        <Typography variant="body" style={styles.emptyText}>
                          {searchText ? 'No results found' : 'No options available'}
                        </Typography>
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
                            <Typography variant="body" style={styles.optionText}>
                              {option.label}
                            </Typography>
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


export { Combobox };
export type { ComboboxProps, ComboboxOption };
