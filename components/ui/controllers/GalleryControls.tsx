import { NumberInput } from "../panel/NumberInput";
import { Section } from "../panel/Section";
import { SpecificProps } from "@/components/templates/StylePanel";

export const GalleryControls = ({
  config,
  onChange,
  isCarousel = false,
}: SpecificProps & { isCarousel?: boolean }) => (
  <Section title="Galería" dotColor="bg-emerald-500">
    <NumberInput
      label="Columnas"
      id="columns"
      defaultValue={parseInt(String(config.columns || 3), 10)}
      min={1}
      max={6}
    />
    <NumberInput
      label="Espaciado"
      id="gap"
      defaultValue={parseInt(String(config.gap || 10), 10)}
      min={0}
    />
    <label className="text-sm text-neutral-400 mb-1 block">
      URL de las imágenes (separadas por coma)
    </label>
    <textarea
      onChange={(e) => onChange("images", e.target.value)}
      className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all min-h-[100px]"
      placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
    />

    {isCarousel && (
      <label className="text-sm text-neutral-400">Opciones del carrusel
        <div className="grid grid-cols-2 gap-3">
          {["autoplay", "arrows", "dots", "infinite"].map((opt) => (
            <div key={opt} className="flex items-center">
              <input
                type="checkbox"
                id={opt}
                checked={!!config}
                onChange={(e) => onChange(opt, e.target.checked)}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
              />
              <label htmlFor={opt} className="ml-2 block text-sm text-neutral-300 capitalize">
                {opt}
              </label>
            </div>
          ))}
        </div>
      </label>
    )}
  </Section>
);
