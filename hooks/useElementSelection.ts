import { useState, useCallback, useEffect, useRef } from "react";

interface UseElementSelectionProps {
  onElementSelect?: (elementId: string) => void;
  onElementDeselect?: () => void;
}

interface UseElementSelectionReturn {
  selectedElementId: string | null;
  selectElement: (elementId: string) => void;
  deselectElement: () => void;
  isElementSelected: (elementId: string) => boolean;
  handleElementTouch: (elementId: string, e: React.TouchEvent) => void;
  handleCanvasTouch: (e: React.TouchEvent) => void;
  handleLongPress: (elementId: string, e: React.TouchEvent) => void;
}

export const useElementSelection = ({
  onElementSelect,
  onElementDeselect,
}: UseElementSelectionProps = {}): UseElementSelectionReturn => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const touchStartPosition = useRef<{ x: number; y: number } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const selectElement = useCallback((elementId: string) => {
    setSelectedElementId(elementId);
    onElementSelect?.(elementId);
    if (navigator.vibrate) navigator.vibrate(50);
  }, [onElementSelect]);

  const deselectElement = useCallback(() => {
    setSelectedElementId(null);
    onElementDeselect?.();
  }, [onElementDeselect]);

  const isElementSelected = useCallback(
    (elementId: string) => selectedElementId === elementId,
    [selectedElementId]
  );

  const handleElementTouch = useCallback((elementId: string, e: React.TouchEvent) => {
    e.stopPropagation();
    if (selectedElementId === elementId) return;
    selectElement(elementId);
  }, [selectedElementId, selectElement]);

  const handleCanvasTouch = useCallback((e: React.TouchEvent) => {
    const target = e.target as Element;
    if (
      target.closest('[data-element]') ||
      target.closest('.mobile-toolbar-menu') ||
      target.closest('[data-editor-ui]') ||
      target.closest('.mobile-element-toolbar')
    ) return;
    deselectElement();
  }, [deselectElement]);

  const handleLongPress = useCallback((elementId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPosition.current = { x: touch.clientX, y: touch.clientY };

    if (longPressTimer.current) clearTimeout(longPressTimer.current);

    longPressTimer.current = setTimeout(() => {
      selectElement(elementId);
    }, 500);
  }, [selectElement]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartPosition.current || !longPressTimer.current) return;

    const touch = e.touches[0];
    const currentPosition = { x: touch.clientX, y: touch.clientY };

    const distance = Math.sqrt(
      Math.pow(currentPosition.x - touchStartPosition.current.x, 2) +
      Math.pow(currentPosition.y - touchStartPosition.current.y, 2)
    );

    if (distance > 10) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      touchStartPosition.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    touchStartPosition.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return {
    selectedElementId,
    selectElement,
    deselectElement,
    isElementSelected,
    handleElementTouch,
    handleCanvasTouch,
    handleLongPress,
  };
};
