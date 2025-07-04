import React, { useState, useCallback, useRef } from 'react';
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
  hostName,
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [targetLayout, setTargetLayout] = useState<LayoutRectangle | null>(
    null
  );
  const [isLongPressed, setIsLongPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<View>(null);

  const visible = controlledVisible ?? internalVisible;

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (controlledVisible === undefined) {
      setInternalVisible(false);
    }
    setIsLongPressed(false);
    onVisibilityChange?.(false);
  }, [controlledVisible, onVisibilityChange]);

  const handleLongPress = useCallback(() => {
    setIsLongPressed(true);
    showTooltip();
  }, [showTooltip]);

  const handlePressIn = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(showTooltip, delay);
  }, [showTooltip, delay]);

  const handlePressOut = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Jika tooltip ditampilkan melalui long press, beri delay lebih lama sebelum hilang
    if (isLongPressed && visible) {
      hideTimeoutRef.current = setTimeout(hideTooltip, 2000); // 2 detik delay
    } else {
      // Untuk press biasa, langsung hilang
      setTimeout(hideTooltip, 100);
    }
  }, [hideTooltip, isLongPressed, visible]);

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <TouchableOpacity
        ref={targetRef}
        activeOpacity={0.8}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        delayLongPress={200}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setTargetLayout({ x, y, width, height });
        }}
      >
        {children}
      </TouchableOpacity>

      {visible && targetLayout && (
        <Portal name={`tooltip-${Math.random()}`} hostName={hostName}>
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
