import {
  CopyPlus,
  HelpCircle,
  ImageIcon,
  LayoutTemplate,
  SettingsIcon,
  StickyNote,
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
