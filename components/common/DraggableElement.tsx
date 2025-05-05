// components/Editor/DraggableElement.tsx
import { useDraggable } from "@dnd-kit/core";

export const DraggableElement = ({
  type,
  id,
  icon,
  label,
  colorClass,
}: {
  type: string;
  id: string;
  icon: JSX.Element;
  label: string;
  colorClass: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: type,
      label: label,
      colorClass: colorClass, // <--- Añadido colorClass a los datos
    },
  });

  // La lógica de estilo y clase para el arrastre se queda igual que la última vez
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        transition: "none", // Asegura que no haya transición CSS durante el arrastre
      }
    : undefined;

  const className = `group relative p-3 rounded-lg border border-white/10 cursor-grab active:cursor-grabbing ${colorClass} hover:border-cyan-500/30 ${
    transform ? "" : "transition-all duration-300"
  }`;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={className}
    >
      <div className="flex flex-col items-center gap-2 pointer-events-none">
        <div className="p-2 rounded-md bg-neutral-900/50 border border-white/10">
          {icon}
        </div>
        <span className="text-xs text-neutral-300 text-center">{label}</span>
      </div>
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
