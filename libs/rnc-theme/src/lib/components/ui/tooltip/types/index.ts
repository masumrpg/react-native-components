import React, { ReactNode } from 'react';
import { LayoutRectangle } from 'react-native';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  delay?: number;
  offset?: number;
  disabled?: boolean;
  hostName?: string;
}

export interface TooltipContentProps {
  content: string | ReactNode;
  position: TooltipPosition;
  targetLayout: LayoutRectangle;
  offset: number;
}
