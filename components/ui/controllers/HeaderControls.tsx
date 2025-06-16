"use client";

import { SpecificProps } from "@/components/templates/StylePanel";
import { Section } from "../panel/Section";
import { ColorInput } from "../panel/ColorInput";
import { NumberInput } from "../panel/NumberInput";

export const HeaderControls = ({ config, onChange }: SpecificProps) => {
  return (
    <Section title="Header" dotColor="bg-indigo-500">
      <label htmlFor="headerTitle" className="text-sm text-neutral-400 mb-4 ">
        Título/Logo
        <input
          type="text"
          id="headerTitle"
          value={config.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full px-3 py-2 mt-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: Mi Sitio Web"
        />
      </label>

      <label htmlFor="navItems" className="text-sm text-neutral-400 mb-1 ">
        Elementos de Navegación (separados por coma)
        <textarea
          id="navItems"
          rows={3}
          value={config.navItems || ""}
          onChange={(e) => onChange("navItems", e.target.value)}
          className="w-full px-3 py-2 mt-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Inicio, Servicios, Acerca de, Contacto"
        />
      </label>

      <label htmlFor="linkHref" className="text-sm text-neutral-400">
        URL (href)
        <input
          type="text"
          id="linkHref"
          value={config.navHref || ""}
          onChange={(e) => onChange("navHref", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: https://ejemplo.com, https://ejemplo.com, https://ejemplo.com"
        />
      </label>

      <ColorInput
        label="Color de fondo"
        id="backgroundColor"
        defaultValue={config.backgroundColor || "#171717"}
      />
      <ColorInput
        label="Color del título"
        id="titleColor"
        defaultValue={config.color || "#ffffff"}
      />

      <ColorInput
        label="Color navegación"
        id="navColor"
        defaultValue={config.color || "#d4d4d8"}
      />
      <ColorInput
        label="Color borde"
        id="borderColor"
        defaultValue={config.borderColor || "#404040"}
      />

      <NumberInput
        label="Altura del header"
        id="headerHeight"
        defaultValue={parseInt(String(config.height || 80), 10)}
        min={50}
        max={200}
      />
      <NumberInput
        label="Tamaño título"
        id="titleFontSize"
        defaultValue={parseInt(String(config.fontSize || 24), 10)}
        min={16}
        max={48}
      />

      <NumberInput
        label="Padding horizontal"
        id="paddingX"
        defaultValue={parseInt(String(config.paddingInline || 24), 10)}
        min={0}
        max={100}
      />
      <NumberInput
        label="Espaciado navegación"
        id="navSpacing"
        defaultValue={parseInt(String(config.gap || 32), 10)}
        min={8}
        max={60}
      />

      <label
        htmlFor="showBorder"
        className="flex items-center gap-2 text-sm text-neutral-300"
      >
        <input
          type="checkbox"
          id="showBorder"
          checked={!!config.border}
          onChange={(e) => onChange("showBorder", e.target.checked)}
          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
        />
        Mostrar borde inferior
      </label>

      <label
        htmlFor="stickyHeader"
        className="flex items-center gap-2 text-sm text-neutral-300"
      >
        <input
          type="checkbox"
          id="stickyHeader"
          checked={!!config.stickyHeader}
          onChange={(e) => onChange("stickyHeader", e.target.checked)}
          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
        />
        Header fijo (sticky)
      </label>

      <label
        htmlFor="showMobileMenu"
        className="flex items-center gap-2 text-sm text-neutral-300"
      >
        <input
          type="checkbox"
          id="showMobileMenu"
          checked={config.showMobileMenu !== false}
          onChange={(e) => onChange("showMobileMenu", e.target.checked)}
          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
        />
        Mostrar menú móvil
      </label>
    </Section>
  );
};
