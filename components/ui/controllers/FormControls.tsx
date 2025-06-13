"use client";

import { SpecificProps } from "@/components/templates/StylePanel";
import { Section } from "../panel/Section";

export const FormControls = ({ config, onChange }: SpecificProps) => {
  return (
    <Section title="Formulario" dotColor="bg-fuchsia-500">
      <label
        htmlFor="formTitle"
        className="text-sm text-neutral-400 mb-1 block"
      >
        Título del Formulario
        <input
          type="text"
          id="formTitle"
          value={config.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: Formulario de Contacto"
        />
      </label>

      <label
        htmlFor="submitButtonText"
        className="text-sm text-neutral-400 mb-1 block"
      >
        Texto del Botón de Envío
        <input
          type="text"
          id="submitButtonText"
          value={config.submitButtonText || ""}
          onChange={(e) => onChange("submitButtonText", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: Enviar Mensaje"
        />
      </label>

      <label
        htmlFor="formMethod"
        className="text-sm text-neutral-400 mb-1 block"
      >
        Método de Envío
        <select
          id="formMethod"
          value={"POST"}
          onChange={(e) => onChange("formMethod", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        >
          <option value="POST">POST</option>
          <option value="GET">GET</option>
        </select>
      </label>

      <label
        htmlFor="formAction"
        className="text-sm text-neutral-400 mb-1 block"
      >
        URL de Acción (action)
        <input
          type="text"
          id="formAction"
          value={config.formAction || ""}
          onChange={(e) => onChange("formAction", e.target.value)}
          className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="Ej: /api/submit-form"
        />
      </label>
    </Section>
  );
};
