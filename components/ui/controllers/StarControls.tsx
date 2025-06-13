import { SpecificProps } from "@/components/templates/StylePanel";
import { ColorInput } from "../panel/ColorInput";
import { NumberInput } from "../panel/NumberInput";
import { Section } from "../panel/Section";

export const StarControls = ({ config, onChange }: SpecificProps) => (
  <Section title="Estrella" dotColor="bg-yellow-500">
    <NumberInput
      label="Tamaño"
      id="size"
      defaultValue={parseInt(String(config.fontSize || 24), 10)}
      min={8}
    />
    <NumberInput
      label="Grosor"
      id="strokeWidth"
      defaultValue={parseInt(String(config.strokeWidth || 2), 10)}
      min={1}
    />

    {/* Colores */}
    <ColorInput
      label="Color de relleno"
      id="fill"
      defaultValue={config.fill || "#FFD700"}
    />
    <ColorInput
      label="Color de borde"
      id="stroke"
      defaultValue={config.stroke || "#000000"}
    />

    <input
      type="checkbox"
      id="filled"
      checked={!!config.fill}
      onChange={(e) => onChange("filled", e.target.checked)}
      className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
    />
    <label htmlFor="filled" className="ml-2 block text-sm text-neutral-300">
      Relleno sólido
    </label>
  </Section>
);
