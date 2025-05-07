import { useState, useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ActiveDraggableData, CanvasElement } from "@/types/DragAndDrop.types";
import {
  calculateInitialPosition,
  calculateNewPosition,
  checkCollisions,
} from "@/calculations/positionCalculations";
import { useCanvasStore } from "@/store/canvasStore";
import { DEFAULT_ITEM_HEIGHT, DEFAULT_ITEM_WIDTH } from "@/config";

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

        let potentialPosition: { x: number; y: number };
        let itemWidth: number;
        let itemHeight: number;
        let movingItemId: string | null = null;
        // 2. Si es un item nuevo...
        if (isNewItem && activeItemData) {
          // *** Llamar a la función de CÁLCULO externa ***
          potentialPosition = calculateInitialPosition(
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
            x: potentialPosition.x,
            y: potentialPosition.y,
          }); // <-- Llamar a la acción del store

          itemWidth = DEFAULT_ITEM_WIDTH;
          itemHeight = DEFAULT_ITEM_HEIGHT;
          movingItemId = null;

          // Clear active state after adding new element
          clearActiveState();
          return;
        } // 3. Si es un item existente...
        else if (!isNewItem && activeId) {
          const currentItemState = canvasElements.find(
            (element) => element.id === activeId
          );

          if (!currentItemState) {
            console.warn(
              "WARNING: Drag ended on canvas, but item ID is unknown or data missing.",
              activeId,
              activeItemData
            );
            return;
          }

          potentialPosition = calculateInitialPosition(
            event, // Pass the event
            canvasRect, // canvasRect local o del store
            event.active.rect.current.initial as DOMRect // <-- Pass initial rect
          );

          itemWidth = currentItemState.width;
          itemHeight = currentItemState.height;
          movingItemId = activeId;
        } else {
          console.warn(
            "WARNING: Drag ended on canvas, but item ID is unknown or data missing.",
            activeId,
            activeItemData
          );
          return;
        }

        const potentialRect = {
          left: potentialPosition.x,
          right: potentialPosition.x + itemWidth,
          top: potentialPosition.y,
          bottom: potentialPosition.y + itemHeight,
        };

        const hasCollisions = checkCollisions(
          potentialRect,
          canvasElements,
          activeId
        );

        if (!hasCollisions) {
          if (isNewItem && activeItemData) {
            // Crear el objeto completo del nuevo elemento (la posición ya está en potentialPosition)
            const newElementId = `canvas-item-${Date.now()}-${Math.random()
              .toString(36)
              .substring(2, 9)}`; // Generar ID único aquí o en la acción del store
            const newElement: CanvasElement = {
              id: newElementId, // Usar el ID generado
              type: activeItemData.type,
              label: activeItemData.label,
              colorClass: activeItemData.colorClass,
              x: potentialPosition.x, // Usar posición calculada
              y: potentialPosition.y, // Usar posición calculada
              width: itemWidth, // Usar el ancho
              height: itemHeight, // Usar el alto
              // ... otras props
            };
            addElement(newElement); // <-- Llamar a la acción del store para añadir
            // Nota: Si tu acción addElement en el store ya genera el ID,
            // solo necesitarías pasar los datos sin ID y la posición calculada.
            // Asegúrate de que la acción addElement en el store acepte el formato correcto.
          } else if (!isNewItem && activeId) {
            // Llamar a la ACCIÓN del store para actualizar la posición
            updateElementPosition(activeId, potentialPosition); // <-- Llamar a la acción del store para mover
          }
          console.log("INFO: No collision detected. State updated.");
        } else {
          // --- Si hay colisión, NO actualizar el estado ---
          console.warn(
            "WARNING: Collision detected. Element not placed or moved."
          );
          // Opcional: Proporcionar feedback visual al usuario (ej: borde rojo en el overlay)
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
      canvasElements,
      addElement,
      updateElementPosition,
      clearActiveState,
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
