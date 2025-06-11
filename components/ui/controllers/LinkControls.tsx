"use client";

import { SpecificProps } from "@/components/templates/StylePanel"; 
import { Section } from "../panel/Section";

export const LinkControls = ({ config, onChange }: SpecificProps) => {


  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("content", e.target.value);
  };

  const handleHrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("href", e.target.value);
  };

  return (
    <Section title="Enlace" dotColor="bg-blue-500"> 
      <div className="flex flex-col gap-1">
        <label htmlFor="linkContent" className="text-sm text-neutral-400">
          Texto del Enlace
        </label>
        <input
          type="text"
          id="linkContent"
          value={config.content || ""}
          onChange={handleContentChange}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: Visita nuestro sitio"
        />
      </div>

      {/* Input para la URL del enlace */}
      <div className="flex flex-col gap-1">
        <label htmlFor="linkHref" className="text-sm text-neutral-400">
          URL (href)
        </label>
        <input
          type="text"
          id="linkHref"
          value={config.href || ""}
          onChange={handleHrefChange}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: https://ejemplo.com"
        />
      </div>
      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          id="openInNewTab"
          checked={!!config.targetBlank} // Asume una prop 'targetBlank' en ElementConfig
          onChange={(e) => onChange("targetBlank", e.target.checked)}
          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
        />
        <label htmlFor="openInNewTab" className="ml-2 block text-sm text-neutral-300">
          Abrir en nueva pestaña
        </label>
      </div>
     
    </Section>
  );
};