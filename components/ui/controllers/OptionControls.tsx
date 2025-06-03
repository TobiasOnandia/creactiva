import { SpecificProps } from "@/components/templates/StylePanel";
import { Section } from "../panel/Section";

export const OptionControls = ({
  config,
  onChange,
  isCheckbox = false,
}: SpecificProps & { isCheckbox?: boolean }) => (
  <Section title="Opciones" dotColor="bg-amber-500">
    <div className="space-y-4">
      <div>
        <label className="text-sm text-neutral-400 mb-1 block">
          {isCheckbox ? "Etiqueta" : "Opciones (separadas por coma)"}
        </label>
        {isCheckbox ? (
          <input
            type="text"
            value={config.label || ""}
            onChange={(e) => onChange("label", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Etiqueta del checkbox"
          />
        ) : (
          <textarea
            value={config.options || ""}
            onChange={(e) => onChange("options", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all min-h-[100px]"
            placeholder="Opción 1, Opción 2, Opción 3"
          />
        )}
      </div>

      {!isCheckbox && (
        <div>
          <label className="text-sm text-neutral-400 mb-1 block">Texto por defecto</label>
          <input
            type="text"
            value={config.placeholder || ""}
            onChange={(e) => onChange("placeholder", e.target.value)}
            className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            placeholder="Seleccionar..."
          />
        </div>
      )}

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={!!config.required}
          onChange={(e) => onChange("required", e.target.checked)}
          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-white/10 rounded bg-neutral-800/50"
        />
        <label htmlFor="required" className="ml-2 block text-sm text-neutral-300">
          Campo obligatorio
        </label>
      </div>
    </div>
  </Section>
);