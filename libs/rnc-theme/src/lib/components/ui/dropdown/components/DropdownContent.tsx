import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { DropdownContentProps } from '../types';
import { DropdownItem } from './DropdownItem';
import { resolveColor } from '../../../../utils';

export const DropdownContent: React.FC<DropdownContentProps> = ({
  options,
  selectedValue,
  onSelect,
  searchable = false,
  multiple = false,
  maxHeight = 200,
  renderOption,
  onSearch,
  style,
  optionStyle,
  selectedOptionStyle,
  searchInputStyle,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (option.description && option.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [options, searchQuery]);

  const isSelected = (value: string | number) => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: resolveColor(theme, 'background', theme.colors.background),
      borderRadius: theme.components.borderRadius.md,
      borderWidth: 1,
      borderColor: resolveColor(theme, 'border', theme.colors.border),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      maxHeight,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: resolveColor(theme, 'border', theme.colors.border),
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    searchInput: {
      flex: 1,
      fontSize: theme.typography.body.fontSize,
      color: resolveColor(theme, 'text', theme.colors.text),
      paddingVertical: theme.spacing.xs,
    },
    scrollView: {
      flexGrow: 0,
    },
    emptyContainer: {
      padding: theme.spacing.lg,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: theme.typography.body.fontSize,
      color: resolveColor(theme, 'textSecondary', theme.colors.textSecondary),
      textAlign: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      {searchable && (
        <View style={styles.searchContainer}>
          <Search
            size={16}
            color={resolveColor(theme, 'textSecondary', theme.colors.textSecondary)}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, searchInputStyle]}
            placeholder="Search options..."
            placeholderTextColor={resolveColor(theme, 'textSecondary', theme.colors.textSecondary)}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      )}
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => {
            const selected = isSelected(option.value);
            
            if (renderOption) {
              return (
                <View key={`${option.value}-${index}`}>
                  {renderOption(option, selected)}
                </View>
              );
            }
            
            return (
              <DropdownItem
                key={`${option.value}-${index}`}
                option={option}
                isSelected={selected}
                onSelect={() => onSelect(option.value)}
                style={optionStyle}
                selectedStyle={selectedOptionStyle}
                theme={theme}
              />
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No options found' : 'No options available'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};