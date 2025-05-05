// calculations/positionCalculations.ts
import { DragEndEvent } from "@dnd-kit/core";
import { CanvasElement } from "@/types/DragAndDrop.types";

// Calcula la posición inicial (x, y) de un *nuevo* elemento al soltarlo en el canvas
// Retorna las coordenadas restringidas a los límites del canvas.
export const calculateInitialPosition = (
  dragEvent: DragEndEvent, // Evento, necesario para active.rect.initial y delta
  canvasBounds: DOMRect | null, // Límites del área droppable del canvas
  itemBoundsAtStart: DOMRect | null // <--- Usamos este nombre para mayor claridad
): { x: number; y: number } => {
  // Validaciones defensivas
  if (
    !canvasBounds ||
    !itemBoundsAtStart ||
    !dragEvent.active?.rect?.current?.initial
  ) {
    // <-- Validar que event.active.rect.initial también exista
    console.warn(
      "Bounds o datos del evento faltantes para el cálculo de posición inicial."
    );
    return { x: 0, y: 0 }; // Retorna una posición por defecto si falta algo crucial
  }

  // Posición inicial del elemento en el viewport (usando rect.initial)
  const startViewportX = dragEvent.active.rect.current.initial.left; // <-- Usar initial.left
  const startViewportY = dragEvent.active.rect.current.initial.top; // <-- Usar initial.top

  // Posición final en el viewport = Posición inicial en viewport + Movimiento total (delta)
  const finalViewportX = startViewportX + dragEvent.delta.x;
  const finalViewportY = startViewportY + dragEvent.delta.y;

  // Posición relativa al canvas = Posición final (viewport) - Offset del canvas (viewport)
  const initialX = finalViewportX - canvasBounds.left;
  const initialY = finalViewportY - canvasBounds.top;

  // Obtener dimensiones del elemento al inicio del arrastre (usando el argumento itemBoundsAtStart)
  const itemWidth = itemBoundsAtStart.width;
  const itemHeight = itemBoundsAtStart.height;

  // Restringir (clamp) la posición calculada dentro de los límites del canvas
  const boundedX = Math.max(
    0,
    Math.min(initialX, canvasBounds.width - itemWidth)
  );
  const boundedY = Math.max(
    0,
    Math.min(initialY, canvasBounds.height - itemHeight)
  );

  return { x: boundedX, y: boundedY };
};

// Calcula la nueva posición (x, y) de un *elemento existente* después de ser arrastrado en el canvas
// Retorna las coordenadas restringidas a los límites del canvas.
export const calculateNewPosition = (
  currentElement: CanvasElement, // El estado actual del elemento antes del movimiento
  delta: { x: number; y: number }, // El movimiento total del arrastre
  canvasBounds: DOMRect | null, // Límites del área droppable del canvas
  itemBoundsAtStart: DOMRect | null // <--- Usamos este nombre para mayor claridad
): { x: number; y: number } => {
  // Validaciones defensivas
  if (!currentElement || !canvasBounds || !itemBoundsAtStart) {
    // <-- Validar itemBoundsAtStart también
    console.warn(
      "Datos o bounds faltantes para el cálculo de actualización de posición."
    );
    return { x: currentElement?.x || 0, y: currentElement?.y || 0 }; // Retorna posición actual o defecto
  }

  // Calcular la NUEVA posición potencial (posición anterior + delta)
  const newX = currentElement.x + delta.x;
  const newY = currentElement.y + delta.y;

  // Obtener dimensiones del elemento al inicio del arrastre (usando el argumento itemBoundsAtStart)
  const itemWidth = itemBoundsAtStart.width; // <-- Usar itemBoundsAtStart.width
  const itemHeight = itemBoundsAtStart.height; // <-- Usar itemBoundsAtStart.height

  // Restringir (clamp) la nueva posición dentro de los límites del canvas
  const boundedNewX = Math.max(
    0,
    Math.min(newX, canvasBounds.width - itemWidth)
  );
  const boundedNewY = Math.max(
    0,
    Math.min(newY, canvasBounds.height - itemHeight)
  );

  return { x: boundedNewX, y: boundedNewY };
};
