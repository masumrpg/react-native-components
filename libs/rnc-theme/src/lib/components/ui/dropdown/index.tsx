import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutRectangle,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { ChevronDown, X } from 'lucide-react-native';
import { Portal } from '../portal';
import { DropdownContent } from './components/DropdownContent';
import type { DropdownProps } from './types';
import { resolveColor } from '../../../utils';
import { useTheme } from '../../../context/RNCProvider';
import { useThemedStyles } from '../../../hooks/useThemedStyles';

const { height: screenHeight } = Dimensions.get('window');

// FIXME bug kalau option di klik crash

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  searchable = false,
  multiple = false,
  maxHeight = 200,
  position = 'auto',
  alignment = 'left',
  disabled = false,
  loading = false,
  error = false,
  errorMessage,
  helperText,
  label,
  required = false,
  clearable = false,
  closeOnSelect = true,
  renderOption,
  renderSelectedValue,
  onSearch,
  onOpen,
  onClose,
  style,
  dropdownStyle,
  optionStyle,
  selectedOptionStyle,
  searchInputStyle,
  variant = 'outline',
  size = 'md',
  hostName = 'default',
  zIndex = 1000,
  ...props
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const triggerRef = useRef<View>(null);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const translateY = useSharedValue(-10);

  const selectedOptions = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options.filter(option => value.includes(option.value));
    }
    return options.find(option => option.value === value);
  }, [options, value, multiple]);

  const handleToggle = useCallback(() => {
    if (disabled || loading) return;

    if (!isOpen) {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setIsOpen(true);
        onOpen?.();

        opacity.value = withTiming(1, { duration: 200 });
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
      });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.95, { duration: 150 });
      translateY.value = withTiming(-10, { duration: 150 }, () => {
        runOnJS(setIsOpen)(false);
        runOnJS(() => onClose?.())();
      });
    }
  }, [isOpen, disabled, loading, onOpen, onClose, opacity, scale, translateY]);

  const handleSelect = useCallback((selectedValue: string | number) => {
    if (multiple && Array.isArray(value)) {
      const newValue = value.includes(selectedValue)
        ? value.filter(v => v !== selectedValue)
        : [...value, selectedValue];
      onValueChange?.(newValue as any);
    } else {
      onValueChange?.(selectedValue);
      if (closeOnSelect) {
        handleToggle();
      }
    }
  }, [multiple, value, onValueChange, closeOnSelect, handleToggle]);

  const handleClear = useCallback((e: any) => {
    e.stopPropagation();
    if (multiple) {
      onValueChange?.([] as any);
    } else {
      onValueChange?.(undefined as any);
    }
  }, [multiple, onValueChange]);

  const getDropdownPosition = () => {
    if (!triggerLayout) return { top: 0, left: 0 };

    const { x, y, width, height } = triggerLayout;
    const dropdownHeight = Math.min(maxHeight + 50, screenHeight * 0.5);

    let top = y + height + 4;
    let left = x;

    // Auto positioning
    if (position === 'auto') {
      const spaceBelow = screenHeight - (y + height);
      const spaceAbove = y;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        top = y - dropdownHeight - 4;
      }
    } else if (position === 'top') {
      top = y - dropdownHeight - 4;
    }

    // Alignment
    if (alignment === 'right') {
      left = x + width - 200; // Assuming dropdown width of 200
    } else if (alignment === 'center') {
      left = x + (width / 2) - 100; // Assuming dropdown width of 200
    }

    return { top, left };
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });

  const styles = useThemedStyles((themeParam) => StyleSheet.create({
    container: {
      width: '100%',
    },
    labelContainer: {
      marginBottom: themeParam.spacing.xs,
    },
    label: {
      fontSize: themeParam.typography.small.fontSize,
      fontWeight: themeParam.typography.small.fontWeight,
      color: resolveColor(themeParam, 'text', themeParam.colors.text),
      lineHeight: themeParam.typography.small.lineHeight,
    },
    required: {
      color: resolveColor(themeParam, 'error', themeParam.colors.error),
    },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: themeParam.spacing.md,
      paddingVertical: themeParam.spacing.sm,
      borderRadius: themeParam.components.borderRadius[size],
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: error
        ? resolveColor(themeParam, 'error', themeParam.colors.error)
        : resolveColor(themeParam, 'border', themeParam.colors.border),
      backgroundColor: variant === 'filled'
        ? resolveColor(themeParam, 'surface', themeParam.colors.surface)
        : 'transparent',
      minHeight: themeParam.components.height[size],
    },
    triggerDisabled: {
      opacity: 0.5,
    },
    triggerError: {
      borderColor: resolveColor(themeParam, 'error', themeParam.colors.error),
    },
    triggerFocused: {
      borderColor: resolveColor(themeParam, 'primary', themeParam.colors.primary),
      borderWidth: 2,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    placeholder: {
      fontSize: themeParam.typography.body.fontSize,
      color: resolveColor(themeParam, 'textSecondary', themeParam.colors.textSecondary),
    },
    selectedText: {
      fontSize: themeParam.typography.body.fontSize,
      color: resolveColor(themeParam, 'text', themeParam.colors.text),
      flex: 1,
    },
    multipleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: themeParam.spacing.xs,
    },
    multipleItem: {
      backgroundColor: resolveColor(themeParam, 'primary', themeParam.colors.primary) + '20',
      paddingHorizontal: themeParam.spacing.sm,
      paddingVertical: themeParam.spacing.xs,
      borderRadius: themeParam.components.borderRadius.sm,
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '100%',
    },
    multipleText: {
      fontSize: themeParam.typography.small.fontSize,
      color: resolveColor(themeParam, 'primary', themeParam.colors.primary),
      flex: 1,
    },
    removeButton: {
      marginLeft: themeParam.spacing.sm,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clearButton: {
      padding: themeParam.spacing.xs,
      marginRight: themeParam.spacing.xs,
    },
    chevron: {
      transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
    },
    helperContainer: {
      marginTop: themeParam.spacing.xs,
    },
    helperText: {
      fontSize: themeParam.typography.caption.fontSize,
      color: error
        ? resolveColor(themeParam, 'error', themeParam.colors.error)
        : resolveColor(themeParam, 'textSecondary', themeParam.colors.textSecondary),
    },
    dropdown: {
      position: 'absolute',
      minWidth: 200,
      zIndex,
    },
  }));

  const renderSelectedContent = () => {
    if (renderSelectedValue && selectedOptions) {
      return renderSelectedValue(selectedOptions);
    }

    if (multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      return (
        <View style={styles.multipleContainer}>
          {selectedOptions.map((option, index) => (
            <View key={`${option.value}-${index}`} style={styles.multipleItem}>
              <Text style={styles.multipleText}>{option.label}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (!multiple && selectedOptions && !Array.isArray(selectedOptions)) {
      return (
        <Text style={styles.selectedText} numberOfLines={1}>
          {selectedOptions.label}
        </Text>
      );
    }

    return (
      <Text style={styles.placeholder}>
        {placeholder}
      </Text>
    );
  };

  const dropdownPosition = getDropdownPosition();

  return (
    <View style={[styles.container, style]} {...props}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      <TouchableOpacity
        ref={triggerRef}
        style={[
          styles.trigger,
          disabled && styles.triggerDisabled,
          error && styles.triggerError,
          isOpen && styles.triggerFocused,
        ]}
        onPress={handleToggle}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          {renderSelectedContent()}
        </View>

        <View style={styles.actions}>
          {clearable && (selectedOptions || (multiple && Array.isArray(value) && value.length > 0)) && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X
                size={16}
                color={resolveColor(theme.theme, 'textSecondary', theme.theme.colors.textSecondary)}
              />
            </TouchableOpacity>
          )}

          <Animated.View style={styles.chevron}>
            <ChevronDown
              size={20}
              color={resolveColor(theme.theme, 'textSecondary', theme.theme.colors.textSecondary)}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {(errorMessage || helperText) && (
        <View style={styles.helperContainer}>
          <Text style={styles.helperText}>
            {error && errorMessage ? errorMessage : helperText}
          </Text>
        </View>
      )}

      {isOpen && triggerLayout && (
        <Portal hostName={hostName}>
          <Animated.View
            style={[
              styles.dropdown,
              {
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: triggerLayout.width,
              },
              animatedStyle,
              dropdownStyle,
            ]}
          >
            <DropdownContent
              options={options}
              selectedValue={value}
              onSelect={handleSelect}
              searchable={searchable}
              multiple={multiple}
              maxHeight={maxHeight}
              renderOption={renderOption}
              onSearch={onSearch}
              optionStyle={optionStyle}
              selectedOptionStyle={selectedOptionStyle}
              searchInputStyle={searchInputStyle}
              theme={theme.theme}
            />
          </Animated.View>
        </Portal>
      )}
    </View>
  );
};

export * from './types';
export * from './components/DropdownItem';
export * from './components/DropdownContent';