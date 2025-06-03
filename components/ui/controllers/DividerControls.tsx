import { SpecificProps } from "@/components/templates/StylePanel";
import { ColorInput } from "../panel/ColorInput";
import { NumberInput } from "../panel/NumberInput";
import { Section } from "../panel/Section";

export const DividerControls = ({ config, onChange }: SpecificProps) => (
  <Section title="Separador" dotColor="bg-neutral-500">
    <div className="space-y-4">
      {/* Altura & Ancho */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Altura"
          id="height"
          defaultValue={parseInt(String(config.height || 1), 10)}
          min={1}
        />
        <NumberInput
          label="Ancho"
          id="width"
          defaultValue={parseInt(String(config.width || 1), 10)}
        />
      </div>

      {/* Color */}
      <ColorInput
        label="Color"
        id="backgroundColor"
        defaultValue={config.backgroundColor || "#ffffff"}
      />

      {/* Estilo de Borde */}
      <div>
        <label className="text-sm text-neutral-400 mb-1 block">Estilo</label>
        <select
          value={config.borderStyle || "solid"}
          onChange={(e) => onChange("borderStyle", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        >
          <option value="solid">Continuo</option>
          <option value="dashed">Segmentado</option>
          <option value="dotted">Punteado</option>
          <option value="double">Doble</option>
        </select>
      </div>
    </div>
  </Section>
);