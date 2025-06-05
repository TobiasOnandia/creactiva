
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { NumberInput } from "./NumberInput";
import { Section } from "./Section";

export const DesignSection = ({
  config,
}: { config: CanvasElement['config']; onChange: (key: string, value: any) => void }) => (
  <Section title="Diseño" dotColor="bg-cyan-500">
    <div className="space-y-4">
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

      <NumberInput
        label="Relleno horizontal"
        id="paddingInline"
        defaultValue={parseInt(String(config.paddingInline || 0), 10)}
        min={0}
      />
      <NumberInput
        label="Relleno vertical"
        id="paddingBlock"
        defaultValue={parseInt(String(config.paddingBlock || 0), 10)}
        min={0}
      />
    </div>
  </Section>
);
