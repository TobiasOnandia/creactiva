"use client";

import { SpecificProps } from "@/components/templates/StylePanel"; // Asegúrate de la ruta correcta
import { Section } from "../panel/Section";

export const ListControls = ({ config, onChange }: SpecificProps) => {
  return (
    <Section title="Lista" dotColor="bg-lime-500"> 
      <div className="space-y-4">
        {/* Elementos de la Lista */}
        <div>
          <label htmlFor="listItems" className="text-sm text-neutral-400 mb-1 block">
            Elementos de la Lista (separados por coma)
          </label>
          <textarea
            id="listItems"
            rows={5}
            value={config.items || ""}
            onChange={(e) => onChange("items", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all min-h-[80px]"
            placeholder="Ej: Item 1, Item 2, Otro item"
          />
        </div>

        <div>
          <label htmlFor="listType" className="text-sm text-neutral-400 mb-1 block">
            Tipo de Lista
          </label>
          <select
            id="listType"
            value={config.listType || "unordered"} 
            onChange={(e) => onChange("listType", e.target.value as "ordered" | "unordered")}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          >
            <option value="unordered">Desordenada (viñetas)</option>
            <option value="ordered">Ordenada (números)</option>
          </select>
        </div>
      </div>
    </Section>
  );
};