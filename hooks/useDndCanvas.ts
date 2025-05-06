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
  // Pero lo mantenemos aquí para consistencia si el componente que usa el hook lo necesita directamente.
  // Sin embargo, es más idiomático que el componente que renderiza la lista (CanvasArea) lo lea del store.
  // Para este hook, solo necesitamos retornar los manejadores y el estado activo del arrastre.
  // Eliminamos canvasElements del retorno del hook.
  // canvasElements: CanvasElement[]; // <-- Eliminado del retorno

  activeId: string | null;
  activeItemData: ActiveDraggableData | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
  handleCanvasRectChange: (rect: DOMRect) => void;
  handleCanvasItemResize: (itemId: string, newWidth: number, newHeight: number) => void;
  // handleCanvasItemResize ya no necesita ser devuelto si CanvasArea llama directamente a la acción del store
  // handleCanvasItemResize: (itemId: string, newWidth: number, newHeight: number) => void; // <-- Eliminado del retorno
}

export const useDndCanvas = (): UseDndCanvasReturn => {
  // === Gestión del Estado (ahora desde Zustand) ===
  // Obtenemos las acciones y el estado necesario directamente del store
  const canvasElements = useCanvasStore((state) => state.canvasElements); // Leemos el estado si es necesario dentro del hook (ej: para find)
  const addElement = useCanvasStore((state) => state.addElement); // Obtenemos la acción
  const updateElementPosition = useCanvasStore(
    (state) => state.updateElementPosition
  ); // Obtenemos la acción
  const updateElementSize = useCanvasStore((state) => state.updateElementSize); // Obtenemos la acción
  // Si canvasRect está en el store, lo obtendrías aquí:
  // const canvasRect = useCanvasStore(state => state.canvasRect);
  // const setCanvasRect = useCanvasStore(state => state.setCanvasRect);

  // === Estado Local del Hook (No en Zustand) ===
  // activeId y activeItemData solo son relevantes DURANTE el arrastre, no necesitan ser globales
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
      // Opcional: Logs de depuración
      // console.log("--- Drag Started ---");
      // console.log("event.active.rect.initial:", event.active?.rect?.initial);
      // console.log("Element state from canvasElements (if exists):", canvasElements.find(el => el.id === event.active.id)); // canvasElements del store
      // console.log("--- End Drag Started Log ---");
    },
    [canvasElements]
  ); // Dependencia canvasElements si se usa para logs/lógica inicial

  // Este manejador coordina: determina qué pasó, llama al cálculo, llama a la acción del store.
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
    // Dependencias:
    // - activeId, activeItemData (estado local del hook)
    // - canvasRect (estado local del hook o del store)
    // - canvasElements (estado del store, necesario si haces find dentro del handler)
    // - Las ACCIONES del store (Zustand garantiza que las acciones son estables, pero useCallback las necesita como deps)
    // - clearActiveState (función auxiliar local)
    [
      activeId,
      activeItemData,
      canvasRect,
      canvasElements, // Si lo usas dentro del handler
      addElement, // Acción del store
      updateElementPosition, // Acción del store
      clearActiveState, // Función auxiliar local
    ]
  ); // Dependencias actualizadas

  const handleDragCancel = useCallback(() => {
    clearActiveState();
  }, [clearActiveState]);

  // handleCanvasItemResize ahora se implementa llamando a la acción del store
  // Este manejador podría pasarse a CanvasArea, o CanvasArea podría llamar a la acción del store directamente.
  // Si CanvasArea llama directamente a la acción, no necesitas devolver esta función desde el hook.
  // Si la devuelves, su implementación es simple:
  const handleCanvasItemResize = useCallback(
    (itemId: string, newWidth: number, newHeight: number) => {
      updateElementSize(itemId, newWidth, newHeight); // <-- Llamar a la acción del store
    },
    [updateElementSize]
  );

  // === Valores Devueltos por el Hook ===
  return {
    activeId, // Estado local (para DragOverlay)
    activeItemData, // Estado local (para DragOverlay)
    // Manejadores de eventos de Dnd-kit
    handleDragStart,
    handleDragEnd,
    handleDragCancel,

    // Manejador para que CanvasArea reporte sus límites
    handleCanvasRectChange,

    // Manejador de redimensionamiento (si CanvasArea lo necesita recibir del hook)
    handleCanvasItemResize,
  };
};
