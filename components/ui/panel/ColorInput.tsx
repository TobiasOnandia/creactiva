import { useCanvasStore } from "@/store/canvasStore";

export const ColorInput = ({
  label,
  id,
  defaultValue,
}: {
  label: string;
  id: string;
  defaultValue: string;
}) => {
  const updateElementConfig = useCanvasStore((state) => state.updateElementConfig);
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const canvasElements = useCanvasStore((state) => state.canvasElements);
  
  const selectedElement = canvasElements.find(
    (element) => element.id === isStylePanelOpen.id
  );


  const currentValue = selectedElement?.config?.[
    id === "bgColor" ? "backgroundColor" : "color"
  ] || defaultValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStylePanelOpen.id) return;

    const value = e.target.value;
    if (id === "bgColor") {
      updateElementConfig(isStylePanelOpen.id, { backgroundColor: value });
    }
    if (id === "textColor") {
      updateElementConfig(isStylePanelOpen.id, { color: value });
    }
  };

  return (
    <label htmlFor={id} className="text-sm text-neutral-400 flex items-center justify-between">
      {label}
      <input
        type="text"
        className="w-24 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        placeholder="#HEX"
        value={currentValue}
        onChange={handleChange}
      />
      <input
        type="color"
        id={id}
        className="w-8 h-8 rounded-md border border-neutral-700 cursor-pointer"
        value={currentValue}
        onChange={handleChange}
      />
    </label>
  );
};
