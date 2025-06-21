import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { DropdownItemProps } from '../types';
import { resolveColor } from '../../../../utils';

export const DropdownItem: React.FC<DropdownItemProps> = ({
  option,
  isSelected,
  onSelect,
  style,
  selectedStyle,
  theme,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: theme.components.height.md,
      backgroundColor: isSelected
        ? resolveColor(theme, 'primary', theme.colors.primary) + '10'
        : 'transparent',
    },
    disabled: {
      opacity: 0.5,
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
      width: 20,
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
    },
    label: {
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
      color: resolveColor(theme, 'text', theme.colors.text),
      lineHeight: theme.typography.body.lineHeight,
    },
    description: {
      fontSize: theme.typography.caption.fontSize,
      color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
      marginTop: 2,
      lineHeight: theme.typography.caption.lineHeight,
    },
    checkContainer: {
      marginLeft: theme.spacing.sm,
      width: 20,
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        option.disabled && styles.disabled,
        style,
        isSelected && selectedStyle,
      ]}
      onPress={onSelect}
      disabled={option.disabled}
      activeOpacity={0.7}
    >
      {option.icon && (
        <View style={styles.iconContainer}>
          {option.icon}
        </View>
      )}
      
      <View style={styles.textContainer}>
        <Text style={styles.label}>{option.label}</Text>
        {option.description && (
          <Text style={styles.description}>{option.description}</Text>
        )}
      </View>
      
      {isSelected && (
        <View style={styles.checkContainer}>
          <Check
            size={16}
            color={resolveColor(theme, 'primary', theme.colors.primary)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};