"use client";

import { SpecificProps } from "@/components/templates/StylePanel"; 
import { Section } from "../panel/Section";

export const CardControls = ({ config, onChange }: SpecificProps) => {
  return (
    <Section title="Tarjeta" dotColor="bg-amber-500">
      <div className="space-y-4">
        <div>
          <label htmlFor="cardImageSrc" className="text-sm text-neutral-400 mb-1 block">
            URL de la Imagen
          </label>
          <input
            type="text"
            id="cardImageSrc"
            value={config.src || ""} 
            onChange={(e) => onChange("src", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="https://ejemplo.com/tarjeta-imagen.jpg"
          />
        </div>

        <div>
          <label htmlFor="cardImageAlt" className="text-sm text-neutral-400 mb-1 block">
            Texto Alternativo (Alt)
          </label>
          <input
            type="text"
            id="cardImageAlt"
            value={config.alt || ""} 
            onChange={(e) => onChange("alt", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Descripción de la imagen de la tarjeta"
          />
        </div>

        <div>
          <label htmlFor="cardTitle" className="text-sm text-neutral-400 mb-1 block">
            Título de la Tarjeta
          </label>
          <input
            type="text"
            id="cardTitle"
            value={config.title || ""} 
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Ej: Producto Destacado"
          />
        </div>

        <div>
          <label htmlFor="cardDescription" className="text-sm text-neutral-400 mb-1 block">
            Descripción
          </label>
          <textarea
            id="cardDescription"
            rows={3}
            value={config.description || ""} 
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Una descripción corta del contenido de esta tarjeta..."
          />
        </div>

        <div>
          <label htmlFor="cardButtonText" className="text-sm text-neutral-400 mb-1 block">
            Texto del Botón (Opcional)
          </label>
          <input
            type="text"
            id="cardButtonText"
            value={config.buttonText || ""} 
            onChange={(e) => onChange("buttonText", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Ej: Leer Más"
          />
        </div>
      </div>
    </Section>
  );
};