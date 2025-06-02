"use client";
import { sections } from "@/config";
import { PlusCircleIcon } from "lucide-react";
import { Section } from "../ui/panel/Section";

export const SectionPanel = ({ title, elements }: (typeof sections)[0]) => {
  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    const elementType = e.currentTarget.id;
    e.dataTransfer.setData("text/plain", elementType);
    e.dataTransfer.effectAllowed = "move";
    console.log(`Iniciando arrastre para tipo: ${elementType}`); // Para depuración
  };

  return (

    <Section title={title} dotColor="bg-cyan-500">
      {elements.map((element) => (
        <section
          key={crypto.randomUUID()}
          id={element.type}
          draggable
          onDragStart={(e) => handleDragStart(e)}
          className="group relative flex cursor-pointer items-center gap-3 p-3 rounded-xl bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-cyan-500/30 transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.15)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-1.5 rounded-md bg-neutral-900/50 border border-white/5 group-hover:border-cyan-500/20 transition-colors">
              <element.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>

          <p className="flex-1 min-w-0">
            <span className="text-xs font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors block truncate">
              {element.label}
            </span>
          </p>

          <PlusCircleIcon className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />

          <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan-500/20 transition-colors pointer-events-none" />
        </section>
      ))}
    </Section>
      
  );
};
