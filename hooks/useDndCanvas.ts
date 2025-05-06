// hooks/useDndCanvas.ts
import { useState, useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ActiveDraggableData, CanvasElement } from "@/types/DragAndDrop.types";
// Importa las funciones de cálculo de posición
import {
  calculateInitialPosition,
  calculateNewPosition,
} from "@/calculations/positionCalculations";
import { DEFAULT_ITEM_HEIGHT, DEFAULT_ITEM_WIDTH } from "@/config";

interface UseDndCanvasReturn {
  canvasElements: CanvasElement[];
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
  // === Gestión del Estado ===
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [elementCounter, setElementCounter] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItemData, setActiveItemData] =
    useState<ActiveDraggableData | null>(null);
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  // === Manejador de Límites del Canvas ===
  const handleCanvasRectChange = useCallback((rect: DOMRect) => {
    setCanvasRect(rect);
  }, []);

  // === Función Auxiliar Interna: Limpiar Estado de Arrastre Activo ===
  const clearActiveState = useCallback(() => {
    setActiveId(null);
    setActiveItemData(null);
  }, []); // Dependencias: Setters son estables

  // === Función Auxiliar Interna: Añadir Nuevo Elemento al Estado ===
  // Solo se encarga de la *actualización* del estado, recibiendo el elemento ya formado.
  const addCanvasElementState = useCallback(
    (newElement: CanvasElement) => {
      setCanvasElements((prevElements) => [...prevElements, newElement]);
      setElementCounter((prevCount) => prevCount + 1); // Relacionado con añadir
      console.log("SUCCESS: Elemento soltado en el canvas:", newElement);
    },
    [setCanvasElements, setElementCounter]
  ); // Dependencias: Setters son estables

  const handleCanvasItemResize = useCallback(
    (itemId: string, newWidth: number, newHeight: number) => {
      console.log(`Resizing item ${itemId} to ${newWidth}x${newHeight}`);
      setCanvasElements((prevElements) => {
        const itemIndex = prevElements.findIndex((el) => el.id === itemId);
        if (itemIndex === -1) {
          console.warn(
            `WARNING: Elemento con ID ${itemId} no encontrado para actualizar tamaño.`
          );
          return prevElements;
        }

        // Actualiza el width y height del elemento de forma inmutable
        const newElements = [...prevElements];
        newElements[itemIndex] = {
          ...newElements[itemIndex],
          width: newWidth,
          height: newHeight,
        };
        console.log(`SUCCESS: Elemento en canvas ${itemId} redimensionado.`);
        return newElements; // Devuelve el nuevo estado
      });
    },
    [setCanvasElements]
  );

  // === Función Auxiliar Interna: Actualizar Posición de Elemento Existente en Estado ===
  // Solo se encarga de la *actualización* del estado, recibiendo el ID y la nueva posición ya calculada.
  const updateCanvasElementState = useCallback(
    (itemId: string, newPosition: { x: number; y: number }) => {
      setCanvasElements((prevElements) => {
        // Usar findIndex y actualizar de forma inmutable
        const draggedElementIndex = prevElements.findIndex(
          (el) => el.id === itemId
        );
        if (draggedElementIndex === -1) {
          console.warn(
            `WARNING: Elemento con ID ${itemId} no encontrado en el estado para actualizar posición.`
          );
          return prevElements;
        }
        const newElements = [...prevElements];
        newElements[draggedElementIndex] = {
          ...prevElements[draggedElementIndex], // Copiar el resto de propiedades
          x: newPosition.x, // Usar la nueva posición calculada
          y: newPosition.y, // Usar la nueva posición calculada
        };
        console.log(
          `SUCCESS: Elemento en canvas ${itemId} movido a x:${newPosition.x}, y:${newPosition.y}`
        );
        return newElements; // Devolver el nuevo estado
      });
    },
    [setCanvasElements]
  ); // Dependencias: Setter es estable

  // === Manejadores Principales de Eventos de Dnd-kit ===

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveItemData(
      event.active?.data?.current as ActiveDraggableData | null
    );
  }, []); // Dependencias: Setters son estables

  // Este manejador coordina: determina qué pasó, llama al cálculo, llama a la actualización de estado.
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      // Verificar si soltó sobre el canvas Y tenemos los bounds necesarios para cálculos
      console.log("--- Drag Ended Condition Check ---");
    console.log("event.over:", event.over);
    console.log("event.over?.id:", event.over?.id);
    console.log("canvasRect:", canvasRect);
    console.log("event.active?.rect?.initial:", event.active?.rect?.current.initial);
    console.log("--- End Drag Ended Condition Check ---");
      
      
      if (
        event.over &&
        event.over.id === "canvas" &&
        canvasRect &&
        event.active?.rect?.current.initial
      ) {
        // 1. Determinar si es un item nuevo o existente
        const isNewItem =
          activeId && !String(activeId).startsWith("canvas-item-");

        // 2. Si es un item nuevo...
        if (isNewItem && activeItemData) {
          // *** Llamar a la función de CÁLCULO externa ***
          const initialPosition = calculateInitialPosition(
            event,
            canvasRect,
            event.active.rect.current.initial as DOMRect
          );
          // Crear el objeto completo del nuevo elemento
          const newElementId = `canvas-item-${elementCounter}`; // Usar contador AQUI
          const newElement: CanvasElement = {
            id: newElementId,
            type: activeItemData.type,
            label: activeItemData.label,
            colorClass: activeItemData.colorClass,
            x: initialPosition.x, // Usar posición calculada
            y: initialPosition.y, // Usar posición calculada
            width: DEFAULT_ITEM_WIDTH,
            height: DEFAULT_ITEM_HEIGHT,
          };

          // *** Llamar a la función auxiliar INTERNA para ACTUALIZAR el estado ***
          addCanvasElementState(newElement); // Pasa el elemento ya formado
        } // 3. Si es un item existente...
        else if (!isNewItem && activeId) {
          const currentItemState = canvasElements.find(
            (el) => el.id === activeId
          );

          if (currentItemState) {
            // *** Llamar a la función de CÁLCULO externa ***
            const newPosition = calculateNewPosition(
              event, // <-- Pass the event
              canvasRect,
              event.active.rect.current.initial as DOMRect
            );

            // *** Llamar a la función auxiliar INTERNA para ACTUALIZAR el estado ***
            updateCanvasElementState(activeId, newPosition); // Pasa ID y nueva posición calculada
          } else {
            console.warn(
              `WARNING: Existing canvas item with ID ${activeId} not found in state.`
            );
          }
        } else {
          console.warn(
            "WARNING: Drag ended on canvas, but item ID is unknown or data missing.",
            activeId,
            activeItemData
          );
        }
      } else {
        // Soltado fuera del canvas o faltan bounds necesarios.
        console.log(
          "INFO: Drag ended, but not over the canvas droppable or bounds missing."
        );
      }

      // 4. Limpiar el estado del arrastre activo al finalizar
      clearActiveState();
    },
    [
      activeId,
      activeItemData,
      canvasRect,
      canvasElements,
      elementCounter,
      addCanvasElementState,
      updateCanvasElementState,
      clearActiveState,
    ]
  ); // Dependencias: todo lo que usa directamente o indirectamente

  const handleDragCancel = useCallback(() => {
    clearActiveState();
  }, [clearActiveState]);

  // === Valores Devueltos por el Hook ===
  return {
    canvasElements,
    activeId,
    activeItemData,
    handleDragStart,
    handleDragEnd, // Devolvemos el manejador principal
    handleDragCancel,
    handleCanvasRectChange, // Para que CanvasArea reporte sus límites
    handleCanvasItemResize,
  };
};
