import {
  HelpCircle,
  ImageIcon,
  LayoutIcon,
  SettingsIcon,
  StickyNote,
} from "lucide-react";

export const mainNavItems = [
  { id: "pages", label: "Páginas", icon: StickyNote },
  { id: "add", label: "Añadir Elementos", icon: LayoutIcon },
  { id: "assets", label: "Multimedia", icon: ImageIcon },
  { id: "settings", label: "Ajustes Sitio", icon: SettingsIcon },
];

export const bottomNavItems = [
  { id: "help", label: "Ayuda", icon: HelpCircle },
];
