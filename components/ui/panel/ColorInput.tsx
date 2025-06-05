import { useCanvasStore } from "@/store/canvasStore";
import { CanvasElement } from "@/types/canvas/CanvasTypes";

const COLOR_INPUT_TO_CONFIG_KEY: Record<string, keyof CanvasElement['config']> = {
  backgroundColor: "backgroundColor",
  textColor: "color",
  borderColor: "borderColor",
  textShadow: "textShadow",
  fill: "fill",
  stroke: "stroke",
} as const;

export const ColorInput = ({
  label,
  id,
  defaultValue,
}: {
  label: string;
  id: keyof typeof COLOR_INPUT_TO_CONFIG_KEY;
  defaultValue: string;
}) => {
  const updateElementConfig = useCanvasStore((state) => state.updateElementConfig);
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const canvasElements = useCanvasStore((state) => state.canvasElements);

  const selectedElement = canvasElements.find(
    (element) => element.id === isStylePanelOpen.id
  );

  const configKey = COLOR_INPUT_TO_CONFIG_KEY[id];
  const currentValue = selectedElement?.config?.[configKey] || defaultValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStylePanelOpen.id) return;

    const value = e.target.value;
    updateElementConfig(isStylePanelOpen.id, {
      [configKey]: value,
    });
  };

  return (
    <label
      htmlFor={id}
      className="text-sm text-neutral-400  gap-2"
    >
      {label}
      <div className="flex items-center gap-3">

      <input
        type="text"
        className="w-24 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        placeholder="#HEX"
        value={currentValue as string}
        onChange={handleChange}
      />
      <input
        type="color"
        id={id}
        className="w-8 h-8 rounded-md border border-neutral-700 cursor-pointer"
        value={currentValue as string}
        onChange={handleChange}
      />
        </div>
    </label>
  );
};
