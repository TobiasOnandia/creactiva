import {
  CheckSquareIcon,
  ClipboardListIcon,
  ComponentIcon,
  CopyPlus,
  HelpCircle,
  ImageIcon,
  LayoutGridIcon,
  LayoutTemplate,
  ListIcon,
  MinusIcon,
  Pilcrow,
  SendIcon,
  SettingsIcon,
  SlidersVerticalIcon,
  SquareStackIcon,
  StickyNote,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { CanvasElement, ConfigStyle } from "./types/CanvasTypes";

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
        type: "button",
        icon: ComponentIcon,
        label: "Botón",
        colorClass: "bg-emerald-500/10",
      },
      {
        type: "divider",
        icon: MinusIcon,
        label: "Separador",
        colorClass: "bg-amber-500/10",
      },
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
        type: "video",
        icon: VideoIcon,
        label: "Video",
        colorClass: "bg-indigo-500/10",
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


