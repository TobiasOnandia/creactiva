
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { NumberInput } from "./NumberInput";
import { Section } from "./Section";

export const DesignSection = ({
  config,
  onChange,
}: { config: CanvasElement['config']; onChange: (key: string, value: string | number) => void }) => (
  <Section title="Diseño" dotColor="bg-cyan-500">
    <div className="space-y-4">
      <NumberInput
        label="Margen superior"
        id="marginTop"
        defaultValue={parseInt(String(config.marginTop || 0), 10)}
        min={0}
        onChange={(value: number) => onChange("marginTop", value)}
      />
      <NumberInput
        label="Margen inferior"
        id="marginBottom"
        defaultValue={parseInt(String(config.marginBottom || 0), 10)}
        min={0}
        onChange={(value: number) => onChange("marginBottom", value)}
      />

      <NumberInput
        label="Relleno horizontal"
        id="paddingInline"
        defaultValue={parseInt(String(config.paddingInline || 0), 10)}
        min={0}
        onChange={(value: number) => onChange("paddingInline", value)}
      />
      <NumberInput
        label="Relleno vertical"
        id="paddingBlock"
        defaultValue={parseInt(String(config.paddingBlock || 0), 10)}
        min={0}
        onChange={(value: number) => onChange("paddingBlock", value)}
      />
    </div>
  </Section>
);
