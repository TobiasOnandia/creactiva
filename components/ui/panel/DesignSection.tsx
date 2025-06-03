import { ConfigStyle } from "@/types/CanvasTypes";
import { NumberInput } from "./NumberInput";
import { Section } from "./Section";

export const DesignSection = ({
  config,
}: { config: ConfigStyle; onChange: (key: string, value: any) => void }) => (
  <Section title="Diseño" dotColor="bg-cyan-500">
    <div className="space-y-4">
      {/* Ancho & Alto */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Ancho"
          id="width"
          defaultValue={parseInt(String(config.width || 200), 10)}
          min={0}
        />
        <NumberInput
          label="Altura"
          id="height"
          defaultValue={parseInt(String(config.height || 100), 10)}
          min={0}
        />
      </div>

      {/* Márgenes */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Margen superior"
          id="marginTop"
          defaultValue={parseInt(String(config.marginTop || 0), 10)}
          min={0}
        />
        <NumberInput
          label="Margen inferior"
          id="marginBottom"
          defaultValue={parseInt(String(config.marginBottom || 0), 10)}
          min={0}
        />
      </div>

      {/* Relleno */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Relleno horizontal"
          id="paddingX"
          defaultValue={parseInt(String(config.paddingX || 0), 10)}
          min={0}
        />
        <NumberInput
          label="Relleno vertical"
          id="paddingY"
          defaultValue={parseInt(String(config.paddingY || 0), 10)}
          min={0}
        />
      </div>
    </div>
  </Section>
);
