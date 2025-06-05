import { GridLayout } from "./LayoutTypes";

export interface CanvasElement {
  id: string;
  type: string;
  config: React.CSSProperties;
  data?: unknown
}
export interface DeviceConfig {
  maxWidth: string;
  icon: React.ReactNode;
  colorClass: string,
  shadowColor: string,
}

export interface LayoutItem extends GridLayout {
  minH: number;
  minW: number;
  static: boolean;
  isDraggable: boolean;
}
