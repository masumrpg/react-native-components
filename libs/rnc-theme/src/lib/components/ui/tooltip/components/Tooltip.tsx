import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, LayoutRectangle } from 'react-native';
import { Portal } from '../../portal';
import { TooltipContent } from './TooltipContent';
import { TooltipProps } from '../types';

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  visible: controlledVisible,
  onVisibilityChange,
  delay = 500,
  offset = 8,
  disabled = false,
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [targetLayout, setTargetLayout] = useState<LayoutRectangle | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<View>(null);

  const visible = controlledVisible !== undefined ? controlledVisible : internalVisible;

  const showTooltip = useCallback(() => {
    if (disabled) return;

    if (targetRef.current) {
      targetRef.current.measureInWindow((x, y, width, height) => {
        setTargetLayout({ x, y, width, height });
        if (controlledVisible === undefined) {
          setInternalVisible(true);
        }
        onVisibilityChange?.(true);
      });
    }
  }, [disabled, controlledVisible, onVisibilityChange]);

  const hideTooltip = useCallback(() => {
    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
    onVisibilityChange?.(false);
  }, [controlledVisible, onVisibilityChange]);

  const handlePressIn = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(showTooltip, delay);
  }, [showTooltip, delay]);

  const handlePressOut = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    hideTooltip();
  }, [hideTooltip]);

  return (
    <>
      <TouchableOpacity
        ref={targetRef}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setTargetLayout({ x, y, width, height });
        }}
      >
        {children}
      </TouchableOpacity>

      {visible && targetLayout && (
        <Portal name={`tooltip-${Math.random()}`}>
          <TooltipContent
            content={content}
            position={position}
            targetLayout={targetLayout}
            offset={offset}
          />
        </Portal>
      )}
    </>
  );
};