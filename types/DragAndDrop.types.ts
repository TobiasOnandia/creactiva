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
  element: CanvasElement;
  onResize: (itemId: string, newWidth: number, newHeight: number) => void;
}
