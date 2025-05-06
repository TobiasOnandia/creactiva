export interface ActiveDraggableData {
  type: string;
  label: string;
  colorClass: string;
}

export interface CanvasElement {
  id: string;
  type: string;
  label: string;
  colorClass: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CanvasItemProps {
  id: string; // ID único de este elemento en el canvas
  type: string;
  label: string;
  colorClass: string; // Puede ser útil para algo visual en el item del canvas
  x: number; // Posición X (controlada por el estado del padre)
  y: number; // Posición Y (controlada por el estado del padre)
  width: number; // Ancho del estado
  height: number; // Alto del estado
  onResize: (itemId: string, newWidth: number, newHeight: number) => void;
}
