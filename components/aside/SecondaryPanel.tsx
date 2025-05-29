import { PuzzleIcon } from "lucide-react";
import { sections } from "@/config";
import { SectionPanel } from "@/components/aside/SectionsPanel";

export const SecondaryPanel = () => {
  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-72 flex flex-col">
      <header className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
          <PuzzleIcon className="w-5 h-5 text-cyan-400" />
          Elementos
        </h3>
        <p className="text-sm text-neutral-400 mt-1">
          Arrastra elementos al canvas
        </p>
      </header>

      <section className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
        {sections.map((section) => (
          <SectionPanel key={section.title} {...section} />
        ))}
      </section>
    </section>
  );
};
