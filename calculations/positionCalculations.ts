import { DragEndEvent } from '@dnd-kit/core';

// Calculates the initial position (x, y) for a *new* element dropped on the canvas.
// Position is relative to the canvas origin (top-left).
// Returns the coordinates clamped within the canvas bounds.
export const calculateInitialPosition = (
  dragEvent: DragEndEvent, // Event, needed for active.rect.initial and delta
  canvasBounds: DOMRect | null, // Bounds of the canvas droppable area
  // Recibimos el rect inicial capturado por dnd-kit
  itemInitialRect: DOMRect | null
): { x: number, y: number } => {
  // Validaciones defensivas
  if (!canvasBounds || !itemInitialRect || !dragEvent.active?.rect?.current.initial) {
     console.warn("Bounds o event data missing for initial position calculation.");
     return { x: 0, y: 0 };
  }

  // La posición inicial en el viewport es la que dnd-kit capturó al inicio del arrastre
  const startViewportX = itemInitialRect.left; // <-- Usar el argumento itemInitialRect
  const startViewportY = itemInitialRect.top;   // <-- Usar el argumento itemInitialRect

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
  const boundedX = Math.max(0, Math.min(initialX, canvasBounds.width - itemWidth));
  const boundedY = Math.max(0, Math.min(initialY, canvasBounds.height - itemHeight));

  return { x: boundedX, y: boundedY };
};


// Calculates the new position (x, y) for an *existing* canvas element after dragging.
// Position is relative to the canvas origin (top-left).
// Returns the coordinates clamped within the canvas bounds.
export const calculateNewPosition = (
  // Ya no necesitamos el estado currentElement aquí para la posición, solo para otras props si fuera necesario
  // currentElement: CanvasElement,
  dragEvent: DragEndEvent, // Event, needed for delta and active.rect.initial
  canvasBounds: DOMRect | null, // Bounds of the canvas droppable area
  // Recibimos el rect inicial capturado por dnd-kit
  itemInitialRect: DOMRect | ClientRect | null
): { x: number, y: number } => {
   // Validaciones
   if (!canvasBounds || !itemInitialRect || !dragEvent.active?.rect?.current.initial) {
       console.warn("Bounds o event data missing for existing item position update calculation.");
       return { x: 0, y: 0 }; // Return default or handle error
   }

   // La posición del elemento en el DOM al inicio del arrastre (relativa al viewport)
   const startViewportX = itemInitialRect.left; // <-- Usar el argumento itemInitialRect
   const startViewportY = itemInitialRect.top;   // <-- Usar el argumento itemInitialRect

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
   const boundedNewX = Math.max(0, Math.min(newX, canvasBounds.width - itemWidth));
   const boundedNewY = Math.max(0, Math.min(newY, canvasBounds.height - itemHeight));

   return { x: boundedNewX, y: boundedNewY };
};