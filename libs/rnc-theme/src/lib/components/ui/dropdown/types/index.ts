import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { BaseComponentProps } from '../../../../types/ui';
import { Theme } from '../../../../types/theme';

export type DropdownPosition = 'top' | 'bottom' | 'auto';
export type DropdownAlignment = 'left' | 'right' | 'center';

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface DropdownProps extends BaseComponentProps {
  options: DropdownOption[];
  value?: string | number | (string | number)[];
  onValueChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  maxHeight?: number;
  position?: DropdownPosition;
  alignment?: DropdownAlignment;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
  renderSelectedValue?: (option: DropdownOption | DropdownOption[]) => React.ReactNode;
  onSearch?: (query: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  dropdownStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  selectedOptionStyle?: StyleProp<ViewStyle>;
  searchInputStyle?: StyleProp<TextStyle>;
  hostName?: string;
  zIndex?: number;
}

export interface DropdownContentProps {
  options: DropdownOption[];
  selectedValue?: string | number | (string | number)[];
  onSelect: (value: string | number) => void;
  searchable?: boolean;
  multiple?: boolean;
  maxHeight?: number;
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
  onSearch?: (query: string) => void;
  style?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  selectedOptionStyle?: StyleProp<ViewStyle>;
  searchInputStyle?: StyleProp<TextStyle>;
  theme: Theme;
}

export interface DropdownTriggerProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface DropdownItemProps {
  option: DropdownOption;
  isSelected: boolean;
  onSelect: () => void;
  style?: StyleProp<ViewStyle>;
  selectedStyle?: StyleProp<ViewStyle>;
  theme: Theme;
}