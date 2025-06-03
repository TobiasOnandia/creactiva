import { useMemo } from "react";
import { useCanvasStore } from "@/store/canvasStore";
import { ConfigStyle } from "@/types/CanvasTypes";

interface NumberInputProps {
  label: string;
  id: string;
  defaultValue: number;
  min?: number;
  max?: number;
}

const INPUT_TO_CONFIG_KEY: Record<string, keyof ConfigStyle> = {
  title: "content",
  fontSize: "fontSize",
  padding: "padding",
  borderWidth: "border",
  borderRadius: "borderRadius",
} as const;

export const NumberInput = ({
  label,
  id,
  defaultValue,
  max,
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

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStylePanelOpen.id) return;
    if (!configKey) return; 
    const newValue = e.target.valueAsNumber;
    updateElementConfig(isStylePanelOpen.id, { [configKey]: newValue });
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
        value={currentValue}
        min={0}
        max={max}
        onChange={handleChange}
        className="w-20 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
      />
    </label>
  );
};
