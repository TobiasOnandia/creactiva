"use client";

import { SpecificProps } from "@/components/templates/StylePanel";
import { Section } from "../panel/Section";
import { ColorInput } from "../panel/ColorInput";
import { NumberInput } from "../panel/NumberInput";

export const HeaderControls = ({ config, onChange }: SpecificProps) => {
  return (
    <Section title="Header" dotColor="bg-indigo-500">
      <div className="space-y-4">
        {/* Título/Logo */}
        <div>
          <label htmlFor="headerTitle" className="text-sm text-neutral-400 mb-1 block">
            Título/Logo
          </label>
          <input
            type="text"
            id="headerTitle"
            value={config.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Ej: Mi Sitio Web"
          />
        </div>

        {/* Elementos de navegación */}
        <div>
          <label htmlFor="navItems" className="text-sm text-neutral-400 mb-1 block">
            Elementos de Navegación (separados por coma)
          </label>
          <textarea
            id="navItems"
            rows={3}
            value={config.navItems || ""}
            onChange={(e) => onChange("navItems", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Inicio, Servicios, Acerca de, Contacto"
          />
        </div>

        {/* Texto de botones */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="loginText" className="text-sm text-neutral-400 mb-1 block">
              Texto Botón Login
            </label>
            <input
              type="text"
              id="loginText"
              value={config.loginText || ""}
              onChange={(e) => onChange("loginText", e.target.value)}
              className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
              placeholder="Iniciar Sesión"
            />
          </div>
          <div>
            <label htmlFor="registerText" className="text-sm text-neutral-400 mb-1 block">
              Texto Botón Registro
            </label>
            <input
              type="text"
              id="registerText"
              value={config.registerText || ""}
              onChange={(e) => onChange("registerText", e.target.value)}
              className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
              placeholder="Registrarse"
            />
          </div>
        </div>

        {/* Colores del header */}
        <div className="grid grid-cols-2 gap-3">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
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
        </div>

        {/* Tamaños y espaciado */}
        <div className="grid grid-cols-2 gap-3">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
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
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showBorder"
              checked={!!config.border}
              onChange={(e) => onChange("showBorder", e.target.checked)}
              className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
            />
            <label htmlFor="showBorder" className="ml-2 block text-sm text-neutral-300">
              Mostrar borde inferior
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="stickyHeader"
              checked={!!config.stickyHeader}
              onChange={(e) => onChange("stickyHeader", e.target.checked)}
              className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
            />
            <label htmlFor="stickyHeader" className="ml-2 block text-sm text-neutral-300">
              Header fijo (sticky)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showMobileMenu"
              checked={config.showMobileMenu !== false}
              onChange={(e) => onChange("showMobileMenu", e.target.checked)}
              className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
            />
            <label htmlFor="showMobileMenu" className="ml-2 block text-sm text-neutral-300">
              Mostrar menú móvil
            </label>
          </div>
        </div>

        {/* Estilo de los botones */}
        <div>
          <label htmlFor="buttonStyle" className="text-sm text-neutral-400 mb-1 block">
            Estilo de botones
          </label>
          <select
            id="buttonStyle"
            value={"default"}
            onChange={(e) => onChange("buttonStyle", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          >
            <option value="default">Por defecto</option>
            <option value="outline">Solo bordes</option>
            <option value="ghost">Sin fondo</option>
            <option value="solid">Sólido</option>
          </select>
        </div>
      </div>
    </Section>
  );
};