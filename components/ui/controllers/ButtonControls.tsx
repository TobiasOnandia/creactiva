import { SpecificProps } from "@/components/templates/StylePanel";
import { ColorInput } from "../panel/ColorInput";
import { NumberInput } from "../panel/NumberInput";
import { Section } from "../panel/Section";

export const ButtonControls = ({
  config,
  onChange,
  isSubmit = false,
}: SpecificProps & { isSubmit?: boolean }) => (
  <Section title="Botón" dotColor="bg-cyan-500">
    <label className="text-sm text-neutral-400 mb-1 block">Texto</label>
    <input
      type="text"
      value={config.content || ""}
      onChange={(e) => onChange("content", e.target.value)}
      className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
      placeholder="Texto del botón"
    />

    <ColorInput
      label="Color de fondo"
      id="backgroundColor"
      defaultValue={config.backgroundColor || "#ffffff"}
    />
    <ColorInput
      label="Color de texto"
      id="color"
      defaultValue={config.color || "#000000"}
    />

    <NumberInput
      label="Radio de borde"
      id="borderRadius"
      defaultValue={parseInt(String(config.borderRadius || 0), 10)}
      min={0}
    />
    <NumberInput
      label="Ancho"
      id="width"
      defaultValue={parseInt(String(config.width || 1), 10)}
      min={0}
    />

    {isSubmit && (
      <div>
        <label className="text-sm text-neutral-400 mb-1 block">
          Acción al enviar
        </label>
        <select
          onChange={(e) => onChange("action", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        >
          <option value="submit">Enviar formulario</option>
          <option value="function">Ejecutar función</option>
        </select>
        
      </div>
    )}
  </Section>
);