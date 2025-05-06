import { useState, useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ActiveDraggableData, CanvasElement } from "@/types/DragAndDrop.types";
import {
  calculateInitialPosition,
  calculateNewPosition,
} from "@/calculations/positionCalculations";
// Importa el hook del store de Zustand
import { useCanvasStore } from "@/store/canvasStore";

interface UseDndCanvasReturn {
  activeId: string | null;
  activeItemData: ActiveDraggableData | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
  handleCanvasRectChange: (rect: DOMRect) => void;
  handleCanvasItemResize: (
    itemId: string,
    newWidth: number,
    newHeight: number
  ) => void;
}

export const useDndCanvas = (): UseDndCanvasReturn => {
  const canvasElements = useCanvasStore((state) => state.canvasElements); // Leemos el estado si es necesario dentro del hook (ej: para find)
  const addElement = useCanvasStore((state) => state.addElement); // Obtenemos la acción
  const updateElementPosition = useCanvasStore(
    (state) => state.updateElementPosition
  ); // Obtenemos la acción
  const updateElementSize = useCanvasStore((state) => state.updateElementSize); // Obtenemos la acción

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItemData, setActiveItemData] =
    useState<ActiveDraggableData | null>(null);
  // canvasRect puede quedarse aquí si solo lo usa este hook para cálculos
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  // === Manejador de Límites del Canvas ===
  // Si canvasRect está en el store, este manejador llamaría a la acción del store
  const handleCanvasRectChange = useCallback((rect: DOMRect) => {
    setCanvasRect(rect); // O setCanvasRect(rect) si está en el store
  }, []); // Dependencias: Setter local o acción del store

  // === Función Auxiliar Interna: Limpiar Estado de Arrastre Activo ===
  const clearActiveState = useCallback(() => {
    setActiveId(null);
    setActiveItemData(null);
  }, []); // Dependencias: Setters locales son estables

  // === Manejadores Principales de Eventos de Dnd-kit ===

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id as string);
      setActiveItemData(
        event.active?.data?.current as ActiveDraggableData | null
      );
    },
    [canvasElements]
  );
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (
        event.over &&
        event.over.id === "canvas" &&
        canvasRect && // canvasRect local o del store
        event.active?.rect?.current.initial // <-- Check for initial rect here
      ) {
        // 1. Determine if it's a new or existing item
        const isNewItem =
          activeId && !String(activeId).startsWith("canvas-item-");

        // 2. Si es un item nuevo...
        if (isNewItem && activeItemData) {
          // *** Llamar a la función de CÁLCULO externa ***
          const initialPosition = calculateInitialPosition(
            event, // Pass the event
            canvasRect, // canvasRect local o del store
            event.active.rect.current.initial as DOMRect // <-- Pass initial rect
          );

          // *** Llamar a la ACCIÓN del store para añadir el elemento ***
          // La acción addElement en el store se encarga de generar el ID y añadir al estado
          addElement({
            type: activeItemData.type,
            label: activeItemData.label,
            colorClass: activeItemData.colorClass,
            x: initialPosition.x,
            y: initialPosition.y,
          }); // <-- Llamar a la acción del store
        } // 3. Si es un item existente...
        else if (!isNewItem && activeId) {
          // Encontrar el elemento en el estado (necesario si calculateNewPosition lo requiere,
          // o si necesitas otras props del estado para la lógica aquí)
          // Con la versión actual de calculateNewPosition que toma event, canvasRect, initialRect,
          // no necesitas currentItemState para el cálculo de posición.
          // Pero podrías necesitarlo para otras lógicas (ej: verificar permisos).
          // const currentItemState = canvasElements.find(el => el.id === activeId); // canvasElements del store

          // if (currentItemState) { // O simplemente if (activeId) si no necesitas currentItemState

          // *** Llamar a la función de CÁLCULO externa para NUEVA POSICIÓN ***
          // Pass event, canvasRect, and event.active.rect.initial
          const newPosition = calculateNewPosition(
            event, // <-- Pass the event
            canvasRect, // canvasRect local o del store
            event.active.rect.current.initial as DOMRect // <-- Pass initial rect
          );

          // *** Llamar a la ACCIÓN del store para actualizar la posición ***
          updateElementPosition(activeId, newPosition); // <-- Llamar a la acción del store
        } else {
          console.warn(
            "WARNING: Drag ended on canvas, but item ID is unknown or data missing.",
            activeId,
            activeItemData
          );
        }
      } else {
        console.log(
          "INFO: Drag ended, but not over the canvas droppable or bounds missing."
        );
      }

      clearActiveState();
    },
    [
      activeId,
      activeItemData,
      canvasRect,
      canvasElements, // Si lo usas dentro del handler
      addElement, // Acción del store
      updateElementPosition, // Acción del store
      clearActiveState, // Función auxiliar local
    ]
  );

  const handleDragCancel = useCallback(() => {
    clearActiveState();
  }, [clearActiveState]);

  const handleCanvasItemResize = useCallback(
    (itemId: string, newWidth: number, newHeight: number) => {
      updateElementSize(itemId, newWidth, newHeight);
    },
    [updateElementSize]
  );

  return {
    activeId,
    activeItemData,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleCanvasRectChange,
    handleCanvasItemResize,
  };
};
