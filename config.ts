import {
  CheckSquareIcon,
  ClipboardListIcon,
  CopyPlus,
  HelpCircle,
  ImageIcon,
  LayoutGridIcon,
  LayoutTemplate,
  Link,
  ListIcon,
  MinusIcon,
  Monitor,
  PanelTop,
  Pilcrow,
  RectangleVertical,
  SendIcon,
  SettingsIcon,
  SlidersVerticalIcon,
  Smartphone,
  SquareStackIcon,
  StickyNote,
  Tablet,
  TextIcon,
} from "lucide-react";

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
        type: "hero",
        icon: TextIcon,
        label: "Portada",
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
   {
    title: "Componentes Avanzados",
    icon: ClipboardListIcon,
    elements: [
      {
        type: "list",
        icon: ListIcon,
        label: "Lista",
        colorClass: "bg-orange-500/10",
      },
      {
        type: "form",
        icon: ClipboardListIcon,
        label: "formulario",
        colorClass: "bg-violet-500/10",
      },
      {
        type: "card",
        icon: RectangleVertical,
        label: "Tarejeta",
        colorClass: "bg-cyan-500/10",
      },
      {
        type: "header",
        icon: PanelTop,
        label: "Encabezado",
        colorClass: "bg-cyan-500/10",
      }
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
  cols: { lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 },
  rowHeight: 30,
  defaultSize: { w: 4, h: 4 },
  minSize: { w: 0.5, h: 0.5 },
} as const;

export const DEFAULT_ELEMENT_CONFIGS = {
  button: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    content: "Botón",
    paddingInline: 24,
    paddingBlock: 12,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: "6px",
  },
  
  hero: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    content: "Bienvenido a Nuestro Sitio",
    padding: "60px 20px",
    minHeight: "400px",
  },
  
  header: {
    backgroundColor: "#171717",
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    title: "Mi Sitio Web",
    navItems: "Inicio, Servicios, Acerca de, Contacto",
    borderBottom: "1px solid rgba(115, 115, 115, 0.3)",
    padding: "16px 24px",
  },
  
  text: {
    content: "Texto de ejemplo para mostrar el contenido",
    fontSize: 16,
    color: "#e5e5e5",
    textAlign: "left",
    lineHeight: "1.6",
    padding: "8px",
  },
  
  paragraph: {
    content: "Este es un párrafo de ejemplo con contenido más extenso para mostrar cómo se ve el diseño con texto largo. Perfecto para descripciones detalladas.",
    fontSize: 16,
    color: "#d4d4d4",
    textAlign: "left",
    lineHeight: "1.7",
    padding: "16px",
    backgroundColor: "rgba(38, 38, 38, 0.3)",
    borderRadius: "8px",
  },
  
  image: {
    src: "",
    alt: "Imagen de ejemplo",
    borderRadius: "8px",
    backgroundColor: "rgba(38, 38, 38, 0.5)",
    border: "1px solid rgba(115, 115, 115, 0.3)",
  },
  
  gallery: {
    images: "",
    alt: "Galería de imágenes",
    backgroundColor: "#404040",
    borderRadius: "8px",
    padding: "4px",
    gap: "4px",
  },
  
  carousel: {
    images: "",
    alt: "Carrusel de imágenes",
    backgroundColor: "#404040",
    borderRadius: "8px",
    overflow: "hidden",
  },
  
  select: {
    options: "Opción 1, Opción 2, Opción 3",
    required: false,
    backgroundColor: "#262626",
    color: "#e5e5e5",
    border: "1px solid #404040",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: 14,
  },
  
  checkbox: {
    label: "Acepto los términos y condiciones",
    required: false,
    color: "#d4d4d4",
    fontSize: 14,
    padding: "8px",
  },
  
  submit: {
    backgroundColor: "#0891b2",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    borderRadius: "6px",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  
  link: {
    content: "Enlace de ejemplo",
    href: "#",
    color: "#60a5fa",
    fontSize: 16,
    textDecoration: "underline",
    padding: "4px",
  },
  
  card: {
    src: "",
    alt: "Imagen de tarjeta",
    title: "Título de la Tarjeta",
    description: "Descripción breve y atractiva de la tarjeta que captura la atención del usuario.",
    buttonText: "Ver Más",
    backgroundColor: "#262626",
    color: "#e5e5e5",
    borderRadius: "12px",
    border: "1px solid rgba(115, 115, 115, 0.3)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  
  form: {
    title: "Formulario de Contacto",
    backgroundColor: "#262626",
    color: "#e5e5e5",
    borderRadius: "12px",
    border: "1px solid rgba(115, 115, 115, 0.3)",
    padding: "24px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  
  list: {
    options: "Primer elemento de la lista, Segundo elemento importante, Tercer elemento destacado",
    listType: "unordered", 
    backgroundColor: "#262626",
    color: "#d4d4d4",
    borderRadius: "12px",
    border: "1px solid rgba(115, 115, 115, 0.3)",
    padding: "20px",
    fontSize: 14,
    lineHeight: "1.6",
  },
  
  divider: {
    backgroundColor: "#525252",
    height: "2px",
    borderRadius: "1px",
    margin: "16px 0",
    opacity: "0.6",
  },
  
  star: {
    color: "#fbbf24",
    fontSize: 24,
  },
} as const;