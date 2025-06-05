import { ConfigStyle } from "@/types/canvas/CanvasTypes";
import { ColorInput } from "./ColorInput";
import { NumberInput } from "./NumberInput";
import { Section } from "./Section";

export const AppearanceSection = ({
  config,
  onChange,
}: { config: ConfigStyle; onChange: (key: string, value: any) => void }) => (
  <Section title="Apariencia" dotColor="bg-purple-500">
    <div className="space-y-4">
      <ColorInput
        label="Color de fondo"
        id="backgroundColor"
        defaultValue={config.backgroundColor || "#ffffff"}
      />
      <NumberInput
        label="Radio de borde"
        id="borderRadius"
        defaultValue={parseInt(String(config.borderRadius || 0), 10)}
        min={0}
      />
      <NumberInput
        label="Grosor de borde"
        id="borderWidth"
        defaultValue={parseInt(String(config.borderWidth || 0), 10)}
        min={0}
      />
      {parseInt(String(config.borderWidth || 0), 10) > 0 && (
        <ColorInput
          label="Color de borde"
          id="borderColor"
          defaultValue={config.borderColor || "#000000"}
        />
      )}

      <label className="text-sm text-neutral-400 mb-1 block">Sombra</label>
      <input
        type="text"
        value={config.boxShadow || ""}
        onChange={(e) => onChange("boxShadow", e.target.value)}
        className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        placeholder="0px 4px 12px rgba(0,0,0,0.1)"
      />
    </div>
  </Section >
);