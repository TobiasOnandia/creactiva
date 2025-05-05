import { ImageIcon, StarIcon, TextIcon } from "lucide-react";
import { ActiveDraggableData } from "@/types/DragAndDrop.types";

export const RenderDragOverlayContent = (
  activeItemData: ActiveDraggableData
) => {
  if (!activeItemData) {
    return null;
  }

  return (
    <div
      className={`p-3 rounded-lg border border-white/10 shadow-xl opacity-90 ${activeItemData.colorClass}`}
      style={{ cursor: "grabbing" }}
    >
      <div className="flex flex-col items-center gap-2">
        {/* Renderiza un icono o placeholder basado en el tipo */}
        {activeItemData.type === "text" && (
          <TextIcon className="w-6 h-6 text-white/70" />
        )}
        {activeItemData.type === "image" && (
          <ImageIcon className="w-6 h-6 text-white/70" />
        )}
        {activeItemData.type === "star" && (
          <StarIcon className="w-6 h-6 text-white/70" />
        )}
        {/* Placeholder genérico si el tipo no coincide */}
        {!["text", "image", "star"].includes(activeItemData.type) && (
          <div className="w-6 h-6 bg-neutral-700 rounded" />
        )}

        <span className="text-xs text-neutral-300 text-center">
          {activeItemData.label}
        </span>
      </div>
    </div>
  );
};
