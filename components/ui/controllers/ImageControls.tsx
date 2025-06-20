import { SpecificProps } from "@/components/templates/StylePanel";
import { NumberInput } from "../panel/NumberInput";
import { Section } from "../panel/Section";

export const ImageControls = ({ config, onChange }: SpecificProps) => (
  <Section title="Imagen" dotColor="bg-rose-500">
    <label className="text-sm text-neutral-400 mb-1 block">
      URL de la imagen
      <input
        type="text"
        onChange={(e) => onChange("src", e.target.value)}
        className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        placeholder="https://ejemplo.com/imagen.jpg"
      />
    </label>

    <label className="text-sm text-neutral-400 mb-1 block">
      Texto alternativo
      <input
        type="text"
        onChange={(e) => onChange("alt", e.target.value)}
        className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        placeholder="Descripción de la imagen"
      />
    </label>

    <NumberInput
      label="Ancho"
      id="width"
      defaultValue={parseInt(String(config.width || 100), 10)}
      min={50}
    />
    <NumberInput
      label="Altura"
      id="height"
      defaultValue={parseInt(String(config.height || 100), 10)}
      min={50}
    />
    <label htmlFor="lazyLoad" className="ml-2 block text-sm text-neutral-300">
      <input
        type="checkbox"
        id="lazyLoad"
        onChange={(e) => onChange("lazyLoad", e.target.checked)}
        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
      />
      Carga diferida (lazy load)
    </label>
  </Section>
);
