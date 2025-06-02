import { ElementConfig } from "@/store/canvasStore";

export interface CanvasElement {
  id: string;
  type: string;
  config?: ElementConfig;
}
