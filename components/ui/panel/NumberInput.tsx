import { useCanvasStore } from "@/store/canvasStore";

export const NumberInput = ({
  label,
  id,
  defaultValue,
  min,
  max,
}: {
  label: string;
  id: string;
  defaultValue: number;
  min?: number;
  max?: number;
  }) => {
  
  const setConfig = useCanvasStore((state) => state.setConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfig({ fontSize: value });
  };

  return (
    <label htmlFor={id} className="text-sm flex items-center justify-between text-neutral-400">
      {label}
      <input
        type="number"
        id={id}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className="w-20 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        onChange={handleChange}
      />
    </label>

  )
};