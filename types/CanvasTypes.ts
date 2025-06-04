
export interface ConfigStyle {
    backgroundColor?: string;
    color?: string;
    fontSize?: number;
    padding?: number;
    border?: string;
    borderRadius?: number;
    boxShadow?: string;
    marginTop?: number;
    marginBottom?: number;
    paddingX?: number;
    paddingY?: number;
    borderColor?: string;
    borderWidth?: number;
    fontFamily?: string;
    fontWeight?: string;
    textAlign?: string;
    textDecoration?: string;
    textTransform?: string;
    lineHeight?: number;
    letterSpacing?: number;
    textShadow?: string;
    fontStyle?: string;
    borderStyle?: string;
    src?: string;
    alt?: string;
    href?: string;
    lazyLoad?: boolean;
    action?: string;
    columns?: number;
    spacing?: number;
    images?: string[];
    url?: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    type?: string;
    options?: string[];
    label?: string;
    filled?: boolean;
    size?: string;
    name?: string;
    strokeWidth?: string;
    fill?: string;
    stroke?: string;
    content?: string;
}


export interface CanvasElement {
  id: string;
  type: string;
  config: ConfigStyle;
  data?: unknown
}
