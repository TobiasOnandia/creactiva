// hooks/useDndCanvas.ts
import { useState, useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ActiveDraggableData, CanvasElement } from "@/types/DragAndDrop.types";
// Importa DOMRect para el tipo de los límites del canvas
// declare global { interface DOMRectReadOnly { toJSON(): DOMRect; } } // Si usas toJSON y necesitas el tipo

interface UseDndCanvasReturn {
  canvasElements: CanvasElement[];
  activeId: string | null;
  activeItemData: ActiveDraggableData | null; // Sigue siendo útil para el Overlay
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
  // Nueva función para recibir los límites del canvas
  handleCanvasRectChange: (rect: DOMRect) => void;
}

export const useDndCanvas = (): UseDndCanvasReturn => {
  // Estado de los elementos del canvas (ahora con x, y)
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [elementCounter, setElementCounter] = useState(0);

  // Estado del elemento activo (arrastrándose)
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItemData, setActiveItemData] =
    useState<ActiveDraggableData | null>(null);

  // Estado para guardar los límites del área droppable del canvas
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  // Función auxiliar para recibir los límites del canvas desde CanvasArea
  const handleCanvasRectChange = useCallback((rect: DOMRect) => {
    console.log("Canvas Rect updated:", rect); // Log para verificar que llega
    setCanvasRect(rect);
  }, []); // Dependencias: Setter es estable

  // --- Funciones Auxiliares Internas ---

  // Función para limpiar el estado del elemento activo
  const clearActiveState = useCallback(() => {
    setActiveId(null);
    setActiveItemData(null);
  }, []);

  // --- Funciones Manejadoras Principales ---

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveItemData(
      event.active?.data?.current as ActiveDraggableData | null
    );
  }, []); // Dependencias: Setters son estables

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      // Lógica principal: ¿Soltó sobre el canvas?
      if (event.over && event.over.id === "canvas") {
        // --- 1. ¿Es un NUEVO elemento soltado desde el sidebar? ---
        // Verificamos si activeId NO empieza con 'canvas-item-'
        const isNewItem =
          activeId && !String(activeId).startsWith("canvas-item-");

        if (isNewItem && activeItemData && canvasRect) {
          // Si es un nuevo item Y tenemos los datos Y conocemos los límites del canvas

          // Calculamos la posición inicial relativa al canvas droppable
          // Final position = Start position (viewport) + Total movement (delta)
          const finalViewportX =
            event.active.rect.current.initial!.left + event.delta.x;
          const finalViewportY =
            event.active.rect.current.initial!.top + event.delta.y;

          // Position relative to canvas = Final position (viewport) - Canvas offset (viewport)
          const initialX = finalViewportX - canvasRect.left;
          const initialY = finalViewportY - canvasRect.top;

          // Opcional: Restringir la posición inicial para que no se salga del canvas al soltar
          // (Similar al modificador, pero para el estado inicial)
          const boundedX = Math.max(
            0,
            Math.min(
              initialX,
              canvasRect.width - event.active.rect.current!.translated!.width
            )
          );
          const boundedY = Math.max(
            0,
            Math.min(
              initialY,
              canvasRect.height - event.active.rect.current!.translated!.height
            )
          );

          // Creamos el nuevo elemento con su ID único y su posición inicial
          const newElementId = `canvas-item-${elementCounter}`;
          const newElement: CanvasElement = {
            id: newElementId,
            type: activeItemData.type,
            label: activeItemData.label,
            colorClass: activeItemData.colorClass,
            x: boundedX, // Usamos la posición restringida
            y: boundedY, // Usamos la posición restringida
            // ... otras props
          };

          // Añadimos el nuevo elemento al estado (usando actualización funcional)
          setCanvasElements((prevElements) => [...prevElements, newElement]);
          setElementCounter((prevCount) => prevCount + 1); // Incrementamos el contador

          console.log(
            "SUCCESS: Nuevo elemento soltado en el canvas:",
            newElement
          );
        }
        // --- 2. ¿Es un elemento existente en el canvas que ha sido arrastrado? ---
        // Verificamos si activeId SÍ empieza con 'canvas-item-'
        // Y si el elemento existe en nuestro estado actual
        else if (activeId && String(activeId).startsWith("canvas-item-")) {
          // Usamos la actualización funcional para encontrar y modificar el elemento
          setCanvasElements((prevElements) => {
            const draggedElementIndex = prevElements.findIndex(
              (el) => el.id === activeId
            );

            if (draggedElementIndex === -1) {
              console.warn(
                `WARNING: Elemento con ID ${activeId} no encontrado en el estado para actualizar posición.`
              );
              return prevElements; // Devuelve el estado sin cambios si no lo encuentra
            }

            const draggedElement = prevElements[draggedElementIndex];

            // Calculamos la NUEVA posición basada en la posición ANTERIOR + el delta de arrastre
            const newX = draggedElement.x + event.delta.x;
            const newY = draggedElement.y + event.delta.y;

            // --- Aplicar Restricción para la Posición del Estado ---
            // Los modificadores restringen visualmente durante el arrastre.
            // Para guardar la posición *correcta* en el estado, también debemos restringirla.
            // Necesitas las dimensiones del elemento que arrastras (active.rect.current)
            // y las dimensiones del canvas (canvasRect) para calcular los límites.
            // Si canvasRect o event.active.rect.current no están disponibles,
            // simplemente actualiza con newX, newY o maneja el error.

            let boundedNewX = newX;
            let boundedNewY = newY;

            if (canvasRect && event.active.rect.current?.translated) {
              const itemWidth = event.active.rect.current.translated.width;
              const itemHeight = event.active.rect.current.translated.height;

              boundedNewX = Math.max(
                0,
                Math.min(newX, canvasRect.width - itemWidth)
              );
              boundedNewY = Math.max(
                0,
                Math.min(newY, canvasRect.height - itemHeight)
              );
            } else {
              console.warn(
                "WARNING: Canvas Rect o Item Rect no disponibles para restringir posición del estado."
              );
            }

            // Crea una copia del array y actualiza el elemento modificado
            const newElements = [...prevElements];
            newElements[draggedElementIndex] = {
              ...draggedElement,
              x: boundedNewX, // Actualiza con la posición restringida
              y: boundedNewY, // Actualiza con la posición restringida
            };

            console.log(
              `SUCCESS: Elemento en canvas ${activeId} movido a x:${boundedNewX}, y:${boundedNewY}`
            );
            return newElements; // Devuelve el nuevo array de estado
          });
        } else {
          // Esto podría pasar si se arrastra algo que no es del sidebar ni un item de canvas conocido
          console.warn(
            "WARNING: Drag ended on canvas, but item ID is unknown or data is missing.",
            activeId,
            activeItemData
          );
        }
      } else {
        // Si se soltó FUERA del canvas...
        // Si era un item del canvas, quizás podrías devolverlo a su posición original,
        // eliminarlo, etc., dependiendo de la UX deseada. Por ahora, no hacemos nada especial.
        console.log("INFO: Drag ended, but not over the canvas droppable.");
        // Si quieres que los items del canvas NO puedan soltarse fuera,
        // la restricción visual del modificador ya lo impide.
        // Aquí no necesitas hacer nada adicional a menos que quieras otra lógica.
      }

      // SIEMPRE limpia el estado del arrastre al finalizar (sobre canvas o fuera)
      clearActiveState();
    },
    [activeId, activeItemData, canvasElements, canvasRect, clearActiveState]
  ); // Dependencias: activeId, activeItemData, canvasElements, canvasRect, clearActiveState (addCanvasElement no necesita estar si su logica está inlined o usa solo dependencias que ya están)

  // La función addCanvasElement debe ser recreada solo si elementCounter cambia, pero usa canvasRect y activeItemData
  // Es mejor que la lógica de añadir esté directamente en handleDragEnd para evitar complejidad con addCanvasElement deps.
  // Vamos a mover la lógica de `addCanvasElement` de nuevo *dentro* de `handleDragEnd`.

  const handleDragEndRevised = useCallback(
    (event: DragEndEvent) => {
      // ... (logs) ...
      if (event.over && event.over.id === "canvas") {
        const isNewItem =
          activeId && !String(activeId).startsWith("canvas-item-");

        if (isNewItem && activeItemData && canvasRect) {
          // Logica de añadir, copiada de addCanvasElement
          const finalViewportX =
            event.active.rect.current!.translated!.left + event.delta.x;
          const finalViewportY =
            event.active.rect.current!.translated!.top + event.delta.y;
          const initialX = finalViewportX - canvasRect.left;
          const initialY = finalViewportY - canvasRect.top;

          const itemWidth = event.active.rect.current!.translated!.width; // Necesitas dimensiones del item arrastrado!
          const itemHeight = event.active.rect.current!.translated!.height; // Necesitas dimensiones del item arrastrado!

          const boundedX = Math.max(
            0,
            Math.min(initialX, canvasRect.width - itemWidth)
          );
          const boundedY = Math.max(
            0,
            Math.min(initialY, canvasRect.height - itemHeight)
          );

          const newElementId = `canvas-item-${elementCounter}`;
          const newElement: CanvasElement = {
            id: newElementId,
            type: activeItemData.type,
            label: activeItemData.label,
            colorClass: activeItemData.colorClass,
            x: boundedX,
            y: boundedY,
          };

          setCanvasElements((prevElements) => [...prevElements, newElement]);
          setElementCounter((prevCount) => prevCount + 1); // Importante: incrementar después de usarlo para el ID

          console.log(
            "SUCCESS: Nuevo elemento soltado en el canvas:",
            newElement
          );
        } else if (activeId && String(activeId).startsWith("canvas-item-")) {
          // Logica de mover item existente, copiada
          setCanvasElements((prevElements) => {
            const draggedElementIndex = prevElements.findIndex(
              (el) => el.id === activeId
            );
            if (draggedElementIndex === -1) return prevElements;
            const draggedElement = prevElements[draggedElementIndex];

            const newX = draggedElement.x + event.delta.x;
            const newY = draggedElement.y + event.delta.y;

            // Necesitas dimensiones del item Y del canvas para restringir
            let boundedNewX = newX;
            let boundedNewY = newY;

            if (canvasRect && event.active.rect.current?.translated) {
              const itemWidth = event.active.rect.current.translated.width;
              const itemHeight = event.active.rect.current.translated.height;

              boundedNewX = Math.max(
                0,
                Math.min(newX, canvasRect.width - itemWidth)
              );
              boundedNewY = Math.max(
                0,
                Math.min(newY, canvasRect.height - itemHeight)
              );
            }

            const newElements = [...prevElements];
            newElements[draggedElementIndex] = {
              ...draggedElement,
              x: boundedNewX,
              y: boundedNewY,
            };
            console.log(
              `SUCCESS: Elemento en canvas ${activeId} movido a x:${boundedNewX}, y:${boundedNewY}`
            );
            return newElements;
          });
        } else {
          console.warn(
            "WARNING: Drag ended on canvas, but item ID is unknown or data is missing.",
            activeId,
            activeItemData
          );
        }
      } else {
        console.log("INFO: Drag ended, but not over the canvas droppable.");
      }

      clearActiveState(); // Llama a la auxiliar para limpiar estado activo
    },
    [
      activeId,
      activeItemData,
      canvasElements,
      canvasRect,
      elementCounter,
      setCanvasElements,
      setElementCounter,
      clearActiveState,
    ]
  ); // Dependencias actualizadas

  const handleDragCancel = useCallback(() => {
    clearActiveState();
  }, [clearActiveState]);

  return {
    canvasElements,
    activeId,
    activeItemData,
    handleDragStart,
    handleDragEnd: handleDragEndRevised, // Usamos la versión revisada
    handleDragCancel,
    handleCanvasRectChange,
  };
};
