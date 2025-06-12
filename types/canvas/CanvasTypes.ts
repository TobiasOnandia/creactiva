import { GridLayout } from "./LayoutTypes";

export interface CanvasElement {
  id: string;
  type: string;
  config: ElementConfig; 
}

export interface ElementConfig extends React.CSSProperties {
  id?: string;
  type: string;
  content?: string;
  required?: boolean;
  href?: string;
  title?: string;
  description?: string;
  src?: string;
  alt?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  field1?: string;
  field2?: string;
  field3?: string;
  buttonText?: string;
  options?: string;
  listType?: "ordered" | "unordered";
  fontSize?: string | number;
  label?: string;
  images?: string;
  targetBlank?: boolean;

  onClick?: () => void;
  onChange?: (value: any) => void;
  onSubmit?: () => void;
  
  disabled?: boolean;
  placeholder?: string;
}

export interface DeviceConfig {
  maxWidth: string;
  icon: React.ReactNode;
  colorClass: string;
  shadowColor: string;
}

export interface LayoutItem extends GridLayout {
  minH: number;
  minW: number;
  static: boolean;
  isDraggable: boolean;
}


export type StyleConfig = Pick<ElementConfig, keyof React.CSSProperties>;
export type PropsConfig = Omit<ElementConfig, keyof React.CSSProperties>;