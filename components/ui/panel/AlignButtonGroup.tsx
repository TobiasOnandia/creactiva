import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export const AlignButtonGroup = () => (
  <div className="flex bg-neutral-800/50 rounded-md border border-neutral-700 overflow-hidden">
    <button className="p-1 text-neutral-400 hover:bg-neutral-700 hover:text-cyan-400 transition-colors border-r border-neutral-700">
      <AlignLeft className="w-4 h-4" />
    </button>
    <button className="p-1 text-neutral-400 hover:bg-neutral-700 hover:text-cyan-400 transition-colors border-r border-neutral-700">
      <AlignCenter className="w-4 h-4" />
    </button>
    <button className="p-1 text-neutral-400 hover:bg-neutral-700 hover:text-cyan-400 transition-colors">
      <AlignRight className="w-4 h-4" />
    </button>
  </div>
);