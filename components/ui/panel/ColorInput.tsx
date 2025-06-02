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
  const setConfig = useCanvasStore((state) => state.setConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(label.toLowerCase() === "color") {
      const value = e.target.value;
      setConfig({ color: value });
    }
    if(label.toLowerCase() === "fondo") {
      const value = e.target.value;
      setConfig({ backgroundColor: value });
    }
  };

  return (
    <label htmlFor={id} className="text-sm text-neutral-400 flex items-center justify-between">
        {label}
       <input
          type="text"
          className="w-24 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          placeholder="#HEX"
          onChange={handleChange}
          defaultValue={defaultValue}
          />
        <input
          type="color"
          id={id}
          onChange={handleChange}
          className="w-8 h-8 rounded-md border border-neutral-700 cursor-pointer"
          defaultValue={defaultValue}
          />
    </label>
  );
};
