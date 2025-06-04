import { templates } from "@/components/templates/TemplatesPanel";
import { PlusIcon } from "lucide-react";

type Template = (typeof templates)[0];


export const TemplateCard = ({ title, description, structure, type }: Template) => {
  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    const elementType = e.currentTarget.id;
    console.log(elementType)

    e.dataTransfer.setData("text/plain", elementType);
    e.dataTransfer.effectAllowed = "move";
    console.log(`Iniciando arrastre para tipo: ${elementType}`); 
  };

  return(
  <li
    className="group relative p-4 rounded-xl bg-neutral-800/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
    draggable
    id={type}
    onDragStart={(e) => handleDragStart(e)}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <article className="relative z-10">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
            <span className="group-hover:text-cyan-300 transition-colors">
              {title}
            </span>
          </h4>
          <p className="text-xs text-neutral-400 mt-1.5 group-hover:text-neutral-300 transition-colors">
            {description}
          </p>
        </div>

        <button className="p-1.5 text-neutral-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 p-3 bg-neutral-900/70 rounded-lg border border-white/5 shadow-inner shadow-black/30 group-hover:shadow-cyan-500/10 transition-all">
        {structure}
      </div>
    </article>

    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan-500/20 transition-colors pointer-events-none" />
  </li>
)};