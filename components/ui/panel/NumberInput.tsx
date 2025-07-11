import { useMemo } from "react";
import { useCanvasStore } from "@/store/canvasStore";
import { CanvasElement } from "@/types/canvas/CanvasTypes";

interface NumberInputProps {
  label: string;
  id: string;
  defaultValue: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const INPUT_TO_CONFIG_KEY: Record<string, keyof CanvasElement['config']> = {
  fontSize: "fontSize",
  padding: "padding",
  border: "border",
  borderRadius: "borderRadius",
  marginTop: "marginTop",
  marginBottom: "marginBottom",
  paddingInline: "paddingInline",
  paddingBlock: "paddingBlock",
  borderWidth: "borderWidth",
  lineHeight: "lineHeight",
  letterSpacing: "letterSpacing",
  columns: "columns",
  gap: "gap",
  rows: "gridRow",
} as const;

export const NumberInput = ({
  label,
  id,
  defaultValue,
  min,
  max,
  onChange,
}: NumberInputProps) => {
  const updateElementConfig = useCanvasStore((state) => state.updateElementConfig);
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const canvasElements = useCanvasStore((state) => state.canvasElements);

  const selectedElement = useMemo(
    () =>
      canvasElements.find((element) => element.id === isStylePanelOpen.id),
    [canvasElements, isStylePanelOpen.id]
  );

  const configKey = INPUT_TO_CONFIG_KEY[id];


  const currentValue =
    configKey && selectedElement?.config
      ? selectedElement.config[configKey]
      : defaultValue;

  
  const displayValue = isNaN(currentValue as number) ? defaultValue : currentValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    if (isNaN(newValue)) return;

    if (onChange) {
      onChange(newValue);
    } else {
      if (!isStylePanelOpen.id) return;
      if (!configKey) return; 
      updateElementConfig(isStylePanelOpen.id, { [configKey]: newValue });
    }
  };

  return (
    <label
      htmlFor={id}
      className="text-sm flex items-center justify-between text-neutral-400"
    >
      {label}
      <input
        type="number"
        id={id}
        value={displayValue as number}
        min={min ?? 1}
        max={max}
        onChange={handleChange}
        className="w-20 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
      />
    </label>
  );
};
