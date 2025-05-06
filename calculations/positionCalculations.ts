// calculations/positionCalculations.ts
import { DragEndEvent } from "@dnd-kit/core";
import { CanvasElement } from "@/types/DragAndDrop.types";

export const calculateInitialPosition = (
  dragEvent: DragEndEvent,
  canvasBounds: DOMRect | null,
  itemInitialRect: DOMRect | null
): { x: number; y: number } => {
  if (
    !canvasBounds ||
    !itemInitialRect ||
    !dragEvent.active?.rect?.current.initial
  ) {
    console.warn(
      "Bounds o event data missing for initial position calculation."
    );
    return { x: 0, y: 0 };
  }

  // La posición inicial en el viewport es la que dnd-kit capturó al inicio del arrastre
  const startViewportX = itemInitialRect.left;
  const startViewportY = itemInitialRect.top;

  // Posición final en el viewport = Posición inicial en viewport + Movimiento total (delta)
  const finalViewportX = startViewportX + dragEvent.delta.x;
  const finalViewportY = startViewportY + dragEvent.delta.y;

  // Posición relativa al canvas = Posición final (viewport) - Offset del canvas (viewport)
  const initialX = finalViewportX - canvasBounds.left;
  const initialY = finalViewportY - canvasBounds.top;

  // Obtener dimensiones del elemento al inicio del arrastre (usando el argumento)
  const itemWidth = itemInitialRect.width;
  const itemHeight = itemInitialRect.height;

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

export const calculateNewPosition = (
  dragEvent: DragEndEvent,
  canvasBounds: DOMRect | null,
  itemInitialRect: DOMRect | null
): { x: number; y: number } => {
  if (
    !canvasBounds ||
    !itemInitialRect ||
    !dragEvent.active?.rect?.current.initial
  ) {
    console.warn(
      "Datos o bounds faltantes para el cálculo de actualización de posición."
    );
    return { x: 0, y: 0 }; // Return default or handle error
  }

  // La posición del elemento en el DOM al inicio del arrastre (relativa al viewport)
  const startViewportX = itemInitialRect.left;
  const startViewportY = itemInitialRect.top;

  // La posición del elemento relativa al canvas origin AT THE START OF THE DRAG
  const startCanvasRelativeX = startViewportX - canvasBounds.left;
  const startCanvasRelativeY = startViewportY - canvasBounds.top;

  // La NUEVA posición relativa al canvas origin = Posición en el inicio del arrastre + movimiento total (delta)
  const newX = startCanvasRelativeX + dragEvent.delta.x;
  const newY = startCanvasRelativeY + dragEvent.delta.y;

  // Obtener dimensiones del elemento al inicio del arrastre (usando el argumento)
  const itemWidth = itemInitialRect.width;
  const itemHeight = itemInitialRect.height;

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

// *** NUEVA FUNCIÓN: Verifica si una caja delimitadora potencial colisiona con elementos existentes ***
export const checkCollisions = (
  potentialRect: { left: number; right: number; top: number; bottom: number },
  existingElements: CanvasElement[],
  // Opcional: ID del elemento que se está moviendo (para no colisionar consigo mismo)
  movingItemId: string | null = null
): boolean => {
  // Validar que la caja potencial sea válida
  if (
    potentialRect.left >= potentialRect.right ||
    potentialRect.top >= potentialRect.bottom
  ) {
    console.warn("Invalid potential rect for collision check:", potentialRect);
    return false; // Considerar que no hay colisión si la caja es inválida
  }

  for (const existingElement of existingElements) {
    // Si se proporciona un movingItemId, saltar el elemento que se está moviendo
    if (movingItemId !== null && existingElement.id === movingItemId) {
      continue;
    }

    const existingRect = {
      left: existingElement.x,
      right: existingElement.x + existingElement.width,
      top: existingElement.y,
      bottom: existingElement.y + existingElement.height,
    };

    const noOverlap =
      potentialRect.left >= existingRect.right ||
      potentialRect.right <= existingRect.left ||
      potentialRect.top >= existingRect.bottom ||
      potentialRect.bottom <= existingRect.top;

    if (!noOverlap) {
      // Se detectó una colisión
      console.log(`Collision detected with element ${existingElement.id}`);
      return true;
    }
  }

  return false;
};
