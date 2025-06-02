export const ColorInput = ({
  label,
  id,
  defaultValue,
}: {
  label: string;
  id: string;
  defaultValue: string;
}) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-sm text-neutral-400">
      {label}
    </label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        id={id}
        className="w-8 h-8 rounded-md border border-neutral-700 cursor-pointer"
        defaultValue={defaultValue}
      />
      <input
        type="text"
        className="w-24 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
        placeholder="#HEX"
        defaultValue={defaultValue}
      />
    </div>
  </div>
);
