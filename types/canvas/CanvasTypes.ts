import { GridLayout } from "./LayoutTypes";

export type ElementType =
  | "header"
  | "paragraph"
  | "button"
  | "link"
  | "image"
  | "gallery"
  | "text"
  | "form"
  | "input"
  | "textarea"
  | "divider"
  | "video"
  | "map"
  | "icon"
  | "card"
  | "list"
  | "quote"
  | "code"
  | "table"
  | "progress"
  | "alert"
  | "rating"
  | "spacer"
  | "menu"
  | "tabs"
  | "accordion"
  | "carousel"
  | "grid"
  | "container";

export interface CanvasElement {
  id: string;
  type: ElementType;
  config: ElementConfig;
}

export interface ElementConfig extends React.CSSProperties {
  id?: string;
  type?: ElementType;
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
  navHref?: string;
  targetBlank?: boolean;
  submitButtonText?: string;
  formAction?: string;
  items?: string;
  navItems?: string;
  onClick?: () => void;
  onChange?: (value: any) => void;
  onSubmit?: () => void;

  disabled?: boolean;
  placeholder?: string;
  stickyHeader?: boolean;
  showMobileMenu?: boolean;
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
