// components/common/DraggableElement.tsx
import { useDraggable } from "@dnd-kit/core";
import React from "react"; // Import React if not already imported

export const DraggableElement = ({
  type,
  id,
  icon,
  label,
  colorClass,
}: {
  type: string;
  id: string; // The dnd-kit ID for this draggable
  icon: JSX.Element;
  label: string;
  colorClass: string; // Tailwind class for background color
}) => {
  // useDraggable hook provides attributes, listeners, ref, transform, and isDragging state
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id, // Use the provided ID
      data: {
        type: type,
        label: label,
        colorClass: colorClass,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        opacity: isDragging ? 0 : 1,
        transition: "none",
      }
    : {
        opacity: 1,
        transition: "opacity 0.3s ease",
      };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`group relative p-3 rounded-lg border border-white/10 cursor-grab active:cursor-grabbing ${colorClass} hover:border-cyan-500/30`}
    >
      <div className="flex flex-col items-center gap-2 pointer-events-none">
        <span className="p-2 rounded-md bg-neutral-900/50 border border-white/10">
          {icon}
        </span>
        <span className="text-xs text-neutral-300 text-center">{label}</span>
      </div>
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
