import {
  CheckSquareIcon,
  ClipboardListIcon,
  ComponentIcon,
  CopyPlus,
  HelpCircle,
  ImageIcon,
  LayoutGridIcon,
  LayoutTemplate,
  Link,
  ListIcon,
  MinusIcon,
  Monitor,
  Pilcrow,
  SendIcon,
  SettingsIcon,
  SlidersVerticalIcon,
  Smartphone,
  SquareStackIcon,
  StickyNote,
  Tablet,
  TextIcon,
} from "lucide-react";
import { CanvasElement, DeviceConfig } from "./types/canvas/CanvasTypes";

export const mainNavItems = [
  { id: "pages", label: "Páginas", icon: StickyNote },
  { id: "templates", label: "Plantillas", icon: LayoutTemplate },
  { id: "add", label: "Añadir Elementos", icon: CopyPlus },
  { id: "assets", label: "Multimedia", icon: ImageIcon },
  { id: "settings", label: "Ajustes Sitio", icon: SettingsIcon },
];

export const bottomNavItems = [
  { id: "help", label: "Ayuda", icon: HelpCircle },
];

export const DEFAULT_ITEM_WIDTH = 150;
export const DEFAULT_ITEM_HEIGHT = 100;

export const sections = [
  {
    title: "Básicos",
    icon: SquareStackIcon,
    elements: [
      {
        type: "header",
        icon: TextIcon,
        label: "Encabezado",
        colorClass: "bg-cyan-500/10",
      },
      {
        type: "paragraph",
        icon: Pilcrow,
        label: "Texto",
        colorClass: "bg-purple-500/10",
      },
      {
        type: "divider",
        icon: MinusIcon,
        label: "Separador",
        colorClass: "bg-amber-500/10",
      },
      {
        type: 'link',
        icon: Link,
        label: 'Enlace',
        colorClass: "bg-amber-500/10",

      }
    ],
  },
  {
    title: "Media",
    icon: ImageIcon,
    elements: [
      {
        type: "image",
        icon: ImageIcon,
        label: "Imagen",
        colorClass: "bg-rose-500/10",
      },
      {
        type: "gallery",
        icon: LayoutGridIcon,
        label: "Galería",
        colorClass: "bg-sky-500/10",
      },
      {
        type: "carousel",
        icon: SlidersVerticalIcon,
        label: "Carrusel",
        colorClass: "bg-lime-500/10",
      },
    ],
  },
  {
    title: "Formularios",
    icon: ClipboardListIcon,
    elements: [
      {
        type: "select",
        icon: ListIcon,
        label: "Selector",
        colorClass: "bg-orange-500/10",
      },
      {
        type: "checkbox",
        icon: CheckSquareIcon,
        label: "Checkbox",
        colorClass: "bg-violet-500/10",
      },
      {
        type: "submit",
        icon: SendIcon,
        label: "Botón Enviar",
        colorClass: "bg-cyan-500/10",
      },
    ],
  },
];

export const categories = ["Landing", "Dashboard", "Blog", "Portfolio"];



export type DeviceType = "mobile" | "tablet" | "desktop";

export const DEVICE_CONFIG = {
  mobile: {
    icon: Smartphone,
    colorClass: "text-emerald-400",
    shadowColor: "#7DFFB2",
    maxWidth: "max-w-xs",
  },
  tablet: {
    icon: Tablet,
    colorClass: "text-cyan-400",
    shadowColor: "#72BAE8",
    maxWidth: "max-w-3xl"
  },
  desktop: {
    icon: Monitor,
    colorClass: "text-purple-400",
    shadowColor: "#C792EA",
    maxWidth: "max-w-7xl"
  },
};


export const GRID_CONFIG = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 90,
  defaultSize: { w: 4, h: 2 },
  minSize: { w: 2, h: 2 },
} as const;

export const DEFAULT_ELEMENT_CONFIGS = {
  button: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center" as const,
    content: "Botón",
    paddingInline: 24,
    paddingBlock: 12,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center" as const,
    content: "Encabezado",
  },
  text: {
    content: "Texto de ejemplo",
    textAlign: "left" as const,
  },
  paragraph: {
    content: "Párrafo de ejemplo con contenido más extenso para mostrar el diseño.",
    textAlign: "left" as const,
  },
} as const;