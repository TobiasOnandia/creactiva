export const DraggableTemplate = ({
  title,
  description,
  structure,
}: {
  title: string;
  description: string;
  structure: React.ReactNode;
}) => (
  <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("template-type", title);
      e.dataTransfer.effectAllowed = "move";
    }}
    className="group relative p-4 rounded-xl bg-neutral-800/50 border border-white/10 hover:border-cyan-500/30 cursor-grab active:cursor-grabbing transition-all"
  >
    <div className="space-y-3">
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-neutral-200">{title}</h4>
        <p className="text-xs text-neutral-400">{description}</p>
      </div>

      {/* Preview de la estructura */}
      <div className="pointer-events-none">{structure}</div>
    </div>

    {/* Efecto de hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);
