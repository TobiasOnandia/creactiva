// hooks/useDndCanvas.ts
import { useState, useCallback } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
// Asegúrate de que estos tipos incluyan TemplateNodeData y ActiveDraggableData
import { ActiveDraggableData, CanvasElement } from "@/types/DragAndDrop.types";
// Importa tus funciones de cálculo de posición
import {
  calculateInitialPosition,
  calculateNewPosition, // Puede que calculateNewPosition no se use en la lógica de adición, pero la mantenemos si la usas para mover
  checkCollisions, // Si implementas colisiones
} from "@/calculations/positionCalculations";
// Importa tu store de Zustand
// Importa tus valores por defecto
import { DEFAULT_ITEM_HEIGHT, DEFAULT_ITEM_WIDTH } from "@/config";
import { useCanvasStore } from "@/store/canvasStore";

// Define el tipo de retorno del hook
interface UseDndCanvasReturn {
  activeId: string | null; // ID del elemento arrastrado (para DragOverlay)
  activeItemData: ActiveDraggableData | null; // Datos del elemento arrastrado (para DragOverlay)
  handleDragStart: (event: DragStartEvent) => void; // Manejador de inicio de arrastre
  handleDragEnd: (event: DragEndEvent) => void; // Manejador de fin de arrastre
  handleDragCancel: () => void; // Manejador de cancelación de arrastre
  handleCanvasRectChange: (rect: DOMRect) => void; // Manejador para que CanvasArea reporte su tamaño
  handleCanvasItemResize: (
    itemId: string,
    newWidth: number,
    newHeight: number
  ) => void; // Manejador para redimensionar elementos existentes
}

export const useDndCanvas = (): UseDndCanvasReturn => {
  // Obtiene las acciones y el estado necesario del store
  const canvasElements = useCanvasStore((state) => state.canvasElements); // Leemos el estado si es necesario dentro del hook (ej: para find o colisiones)
  const addElement = useCanvasStore((state) => state.addElement); // Acción para añadir un elemento básico
  const updateElementPosition = useCanvasStore(
    (state) => state.updateElementPosition
  ); // Acción para actualizar la posición de un elemento existente
  const updateElementSize = useCanvasStore((state) => state.updateElementSize); // Acción para actualizar el tamaño de un elemento existente
  // *** Necesitas obtener la acción addTemplate de tu store ***
  const addTemplate = useCanvasStore((state) => state.addTemplate); // <-- Acción para añadir una plantilla (Añadir a tu store)

  // Estado local para manejar el arrastre activo y el tamaño del canvas
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItemData, setActiveItemData] =
    useState<ActiveDraggableData | null>(null);
  // canvasRect se mantiene local en este hook para cálculos
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  // === Manejador de Límites del Canvas ===
  // Actualiza el estado local canvasRect
  const handleCanvasRectChange = useCallback((rect: DOMRect) => {
    setCanvasRect(rect);
  }, []); // Dependencia: setCanvasRect local es estable

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
    [] // No necesita dependencias si solo usa setters locales
  );

  // Este manejador coordina: determina qué pasó, llama al cálculo, llama a la acción del store.
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      // Obtiene los datos adjuntos al elemento arrastrado
      const draggableData = active.data.current as ActiveDraggableData | undefined;

      // 1. Verificar si soltó sobre el canvas Y tenemos los bounds necesarios para cálculos
      // Asegúrate de que el ID 'canvas' coincide con el ID de useDroppable en CanvasArea
      if (
        draggableData && // Asegura que hay datos arrastrables
        over &&
        over.id === "canvas" && // Verifica que la caída fue sobre el canvas droppable
        canvasRect && // Asegura que tenemos el rectángulo del canvas
        event.active?.rect?.current.initial // Asegura que tenemos la posición inicial del arrastrable
      ) {
        // 2. Calcula la posición de caída en relación con el canvas
        const dropPosition = calculateInitialPosition(
          event, // Pasa el evento
          canvasRect, // Pasa el canvasRect local
          event.active.rect.current.initial as DOMRect // Pasa la posición inicial del arrastrable
        );

        // 3. Determina si es un elemento NUEVO (básico o plantilla) o EXISTENTE (del canvas)
        // La forma más fiable es verificar el 'type' en los datos arrastrables
        const isNewItem = draggableData.type === 'element' || draggableData.type === 'template';

        // --- Lógica para añadir o mover ---

        if (isNewItem) {
            // *** CASO: Se soltó un NUEVO elemento o plantilla desde un panel ***

            if (draggableData.type === 'element' && draggableData.elementData) {
                // Si es un elemento básico (desde la sidebar de elementos)
                // Calcula el tamaño inicial para el elemento básico
                const itemWidth = DEFAULT_ITEM_WIDTH;
                const itemHeight = DEFAULT_ITEM_HEIGHT;

                // Llama a la acción del store para añadir el elemento básico
                addElement({
                    type:"element",
                    elementType: draggableData.elementData.type, // Usa elementType
                    elementLabel: draggableData.elementData.label,
                    elementColorClass: draggableData.elementData.colorClass,
                    classes: draggableData.elementData.classes, // Pasa las clases si existen
                    x: dropPosition.x,
                    y: dropPosition.y,
                    parentId: null,
                    height: itemHeight,
                    width: itemWidth,
                    // TODO: Lógica para determinar parentId si se suelta dentro de un contenedor
                    // parentId: determineParentId(dropPosition, canvasElements),
                });
                console.log("INFO: New basic element added to canvas.");

            } else if (draggableData.type === 'template' && draggableData.templateData) {
                // *** Si es una plantilla (desde el panel de plantillas) ***
                // Define las dimensiones iniciales para el contenedor raíz de la plantilla
                const initialTemplateWidth = 300; // Puedes ajustar este tamaño
                const initialTemplateHeight = 200; // Puedes ajustar este tamaño

                // *** Llama a la acción addTemplate de la store ***
                // Esta acción se encargará de procesar la estructura de datos
                // y crear todos los CanvasElements anidados en el estado.
                addTemplate(
                    draggableData.templateData, // Pasa la estructura de datos de la plantilla
                    dropPosition, // Pasa la posición de caída para el elemento raíz
                    { width: initialTemplateWidth, height: initialTemplateHeight } // Pasa las dimensiones iniciales
                );
                console.log("INFO: New template added to canvas.");

            } else {
                console.warn("WARNING: Drag ended with unknown new item type or missing data.", draggableData);
            }

            // TODO: Implementar lógica de colisión para nuevos elementos/plantillas si es necesario
            // const potentialRect = { left: dropPosition.x, right: dropPosition.x + itemWidth, top: dropPosition.y, bottom: dropPosition.y + itemHeight };
            // const hasCollisions = checkCollisions(potentialRect, canvasElements, null);
            // Si hay colisión, necesitarías deshacer la adición o hacer la verificación ANTES de llamar a addElement/addTemplate.


        } else if (draggableData.type === 'canvas-element' && activeId) { // activeId es el ID del elemento del canvas que se está arrastrando
            // *** CASO: Se soltó un elemento EXISTENTE dentro del canvas ***
            // activeId es el ID del elemento del canvas que se está moviendo.
            // draggableData.canvasElementId también podría usarse si lo adjuntas en CanvasItem.

            // Calcula la nueva posición final (puede ser igual a dropPosition si no hay modificadores de movimiento)
            const newPosition = calculateNewPosition( // Asegúrate de que calculateNewPosition esté importado
              event, // Pasa el evento
              canvasRect, // Pasa el canvasRect local
              event.active.rect.current.initial as DOMRect // Pasa la posición inicial del arrastrable
            );

            // TODO: Implementar lógica de colisión para movimiento si es necesario
            // Necesitarías el tamaño actual del elemento para esto.
            // const currentItemState = canvasElements.find(el => el.id === activeId);
            // if (currentItemState) {
            //    const potentialRect = { left: newPosition.x, right: newPosition.x + currentItemState.width, top: newPosition.y, bottom: newPosition.y + currentItemState.height };
            //    const hasCollisions = checkCollisions(potentialRect, canvasElements, activeId);
            //    if (!hasCollisions) {
                   // Si no hay colisión (o no implementas colisiones para movimiento), actualiza la posición
                   // *** Llama a la acción updateElementPosition de la store ***
                   updateElementPosition(activeId, newPosition);
                   console.log(`INFO: Existing item ${activeId} moved to`, newPosition);
            //    } else {
            //        console.warn(`WARNING: Collision detected for item ${activeId}. Item not moved.`);
            //    }
            // } else {
            //     console.warn(`WARNING: Existing canvas item with ID ${activeId} not found in state.`);
            // }

            // Si no implementas colisiones para movimiento, simplemente actualiza la posición:
             updateElementPosition(activeId, newPosition); // <-- Llama a la acción del store
             console.log(`INFO: Existing item ${activeId} moved to`, newPosition);


        } else {
            // Esto no debería ocurrir si los tipos de arrastre están bien definidos en ActiveDraggableData
            console.warn("WARNING: Drag ended with unhandled draggable data type or missing activeId.", draggableData, activeId);
        }

      } else {
        console.log(
          "INFO: Drag ended, but not over the canvas droppable or bounds missing."
        );
      }

      // 4. Siempre limpia el estado de arrastre activo al final del evento
      clearActiveState();

    },
    // Dependencias de useCallback:
    // - Estado local del hook: activeId, activeItemData, canvasRect
    // - Estado del store si se accede directamente dentro del handler (ej: canvasElements para find)
    // - Acciones del store: addElement, updateElementPosition, addTemplate
    // - Funciones auxiliares locales: clearActiveState
    // - Funciones de cálculo externas: calculateInitialPosition, calculateNewPosition, checkCollisions (si se usan y no son estables)
    [
      activeId,
      activeItemData,
      canvasRect,
      canvasElements, // Si lo usas dentro del handler
      addElement,
      updateElementPosition,
      addTemplate, // <-- Añadir addTemplate como dependencia
      clearActiveState,
      // calculateInitialPosition, // Añadir si no es estable
      // calculateNewPosition, // Añadir si no es estable
      // checkCollisions, // Añadir si no es estable
    ]
  ); // Dependencias actualizadas


  const handleDragCancel = useCallback(() => {
    clearActiveState();
  }, [clearActiveState]);


  // Manejador para redimensionar un elemento existente en el canvas
  // Llama a la acción updateElementSize de la store
   const handleCanvasItemResize = useCallback((itemId: string, newWidth: number, newHeight: number) => {
       updateElementSize(itemId, newWidth, newHeight); // <-- Llama a la acción del store
   }, [updateElementSize]); // Dependencia: la acción del store


  // === Valores Devueltos por el Hook ===
  return {
    activeId, // Estado local (para DragOverlay en Home)
    activeItemData, // Estado local (para DragOverlay en Home)

    // Manejadores de eventos de Dnd-kit (Home los pasa al DndContext)
    handleDragStart,
    handleDragEnd,
    handleDragCancel,

    // Manejador para que CanvasArea reporte sus límites (Home lo pasa a CanvasArea)
    handleCanvasRectChange,

    // Manejador de redimensionamiento (CanvasArea lo pasa a CanvasItem)
    handleCanvasItemResize,
  };
};
