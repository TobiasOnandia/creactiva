import { ConfigStyle } from "@/types/CanvasTypes";
import { Section } from "../panel/Section";
import { NumberInput } from "../panel/NumberInput";
import { SpecificProps } from "@/components/templates/StylePanel";

export const VideoControls = ({ config, onChange }: SpecificProps) => (
  <Section title="Video" dotColor="bg-blue-500">
    <div className="space-y-4">
      {/* URL */}
      <div>
        <label className="text-sm text-neutral-400 mb-1 block">
          URL del video
        </label>
        <input
          type="text"
          value={config.src || ""}
          onChange={(e) => onChange("src", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="https://ejemplo.com/video.mp4"
        />
      </div>

      {/* Ancho y Alto */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Ancho"
          id="width"
          defaultValue={parseInt(String(config.width || 200), 10)}
          min={200}
        />
        <NumberInput
          label="Altura"
          id="height"
          defaultValue={parseInt(String(config.height || 200), 10)}
          min={100}
        />
      </div>

      {/* Opciones de Reproducción */}
      <div className="space-y-2">
        <label className="text-sm text-neutral-400">Opciones de reproducción</label>
        <div className="grid grid-cols-2 gap-3">
          {["autoplay", "controls", "loop", "muted"].map((opt) => (
            <div key={opt} className="flex items-center">
              <input
                type="checkbox"
                id={opt}
                checked={!!config[opt as keyof ConfigStyle]}
                onChange={(e) => onChange(opt, e.target.checked)}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
              />
              <label htmlFor={opt} className="ml-2 block text-sm text-neutral-300 capitalize">
                {opt}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);
