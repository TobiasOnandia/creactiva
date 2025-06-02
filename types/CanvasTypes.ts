
export interface ConfigStyle {
    backgroundColor: string;
    color: string;
    fontSize: string;
    padding: string;
    border: string;
    borderRadius: string;
    content: string;
}


export interface CanvasElement {
  id: string;
  type: string;
  config: ConfigStyle;
}
