import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { NumberInput } from "../panel/NumberInput";
import { Section } from "../panel/Section";
import { ColorInput } from "../panel/ColorInput";
import { SpecificProps } from "@/components/templates/StylePanel";

export const TextControls = ({ config, onChange }: SpecificProps) => {
  const handleAlign = (align: string) => onChange("textAlign", align);

  return (
    <Section title="Texto" dotColor="bg-purple-500">
      <div className="space-y-4">
        {/* Contenido Editable */}
        <div>
          <label className="text-sm text-neutral-400 mb-1 block">
            Contenido
          </label>
          <textarea
            value={config.content || ""}
            onChange={(e) => onChange("content", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all min-h-[100px]"
          />
        </div>

        {/* Tamaño de Fuente & Altura de Línea */}
        <div className="grid grid-cols-2 gap-4">
          <NumberInput
            label="Tamaño de fuente"
            id="fontSize"
            defaultValue={parseInt(String(config.fontSize || 16), 10)}
            min={8}
          />
          <NumberInput
            label="Altura de línea"
            id="lineHeight"
            defaultValue={parseFloat(String(config.lineHeight || 1.5))}
            min={0.8}
          />
        </div>

        {/* Alineación */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-neutral-400">Alineación</label>
          <div className="flex bg-neutral-800/50 border border-white/10 rounded-xl p-1">
            {[
              { value: "left", icon: <AlignLeft className="w-4 h-4" /> },
              { value: "center", icon: <AlignCenter className="w-4 h-4" /> },
              { value: "right", icon: <AlignRight className="w-4 h-4" /> },
              { value: "justify", icon: <AlignJustify className="w-4 h-4" /> },
            ].map((align) => (
              <button
                key={align.value}
                onClick={() => handleAlign(align.value)}
                className={`p-2 rounded-lg ${
                  config.textAlign === align.value
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {align.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Color de Texto */}
        <ColorInput
          label="Color de texto"
          id="color"
          defaultValue={config.color || "#ffffff"}
        />
      </div>
    </Section>
  );
};