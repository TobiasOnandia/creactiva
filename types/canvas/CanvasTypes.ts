import { GridLayout } from "./LayoutTypes";

export interface CanvasElement {
  id: string;
  type: string;
  config: ElementConfig; 
}

export interface ElementConfig extends React.CSSProperties {
  content?: string;        
  src?: string;        
  alt?: string;         
  text?: string;          
  label?: string;        
  options?: string[];     
  images?: string;      
  slides?: string[];   
  href?: string
  targetBlank?: boolean
  action?: string,
  
  onClick?: () => void;
  onChange?: (value: any) => void;
  onSubmit?: () => void;
  
  required?: boolean;
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