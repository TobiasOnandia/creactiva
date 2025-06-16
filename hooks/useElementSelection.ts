"use client";
import { useState, useCallback, useEffect } from "react";

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
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [touchStartPosition, setTouchStartPosition] = useState<{ x: number; y: number } | null>(null);

  const selectElement = useCallback((elementId: string) => {
    setSelectedElementId(elementId);
    onElementSelect?.(elementId);

    // Haptic feedback si está disponible
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [onElementSelect]);

  const deselectElement = useCallback(() => {
    setSelectedElementId(null);
    onElementDeselect?.();
  }, [onElementDeselect]);

  const isElementSelected = useCallback((elementId: string) => {
    return selectedElementId === elementId;
  }, [selectedElementId]);

  const handleElementTouch = useCallback((elementId: string, e: React.TouchEvent) => {
    e.stopPropagation();

    // Si ya está seleccionado, no hacer nada (para permitir interacción con toolbar)
    if (selectedElementId === elementId) {
      return;
    }

    selectElement(elementId);
  }, [selectedElementId, selectElement]);

  const handleCanvasTouch = useCallback((e: React.TouchEvent) => {
    const target = e.target as Element;

    // No deseleccionar si se toca un elemento, toolbar, o UI del editor
    if (
      target.closest('[data-element]') ||
      target.closest('.mobile-toolbar-menu') ||
      target.closest('[data-editor-ui]') ||
      target.closest('.mobile-element-toolbar')
    ) {
      return;
    }

    deselectElement();
  }, [deselectElement]);

  const handleLongPress = useCallback((elementId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startTime = Date.now();
    const startPosition = { x: touch.clientX, y: touch.clientY };

    setTouchStartTime(startTime);
    setTouchStartPosition(startPosition);

    // Clear any existing timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }

    const timer = setTimeout(() => {
      selectElement(elementId);
    }, 500); // 500ms para long press

    setLongPressTimer(timer);
  }, [longPressTimer, selectElement]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartPosition || !longPressTimer) return;

    const touch = e.touches[0];
    const currentPosition = { x: touch.clientX, y: touch.clientY };

    // Calcular distancia desde posición inicial
    const distance = Math.sqrt(
      Math.pow(currentPosition.x - touchStartPosition.x, 2) +
      Math.pow(currentPosition.y - touchStartPosition.y, 2)
    );

    // Si se mueve más de 10px, cancelar long press
    if (distance > 10) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }
      setTouchStartPosition(null);
    }
  }, [touchStartPosition, longPressTimer]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setTouchStartPosition(null);
    setTouchStartTime(0);
  }, [longPressTimer]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [longPressTimer]);

  // Agregar event listeners globales para touch events
  useEffect(() => {
    const handleGlobalTouchMove = (e: TouchEvent) => {
      handleTouchMove(e as any);
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      handleTouchEnd();
    };

    if (longPressTimer) {
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
      document.addEventListener('touchcancel', handleGlobalTouchEnd);

      return () => {
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
        document.removeEventListener('touchcancel', handleGlobalTouchEnd);
      };
    }
  }, [longPressTimer, handleTouchMove, handleTouchEnd]);

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
