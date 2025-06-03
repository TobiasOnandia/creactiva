
export interface ConfigStyle {
    backgroundColor: string;
    color: string;
    fontSize: number;
    padding: number;
    border: number;
    borderRadius: number;
    content: string;
}


export interface CanvasElement {
  id: string;
  type: string;
  config: ConfigStyle;
}
