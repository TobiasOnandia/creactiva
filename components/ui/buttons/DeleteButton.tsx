import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useCanvasStore } from "@/store/canvasStore";

export const DeleteButton = ({
  elementId,
  className = "",
}: {
  elementId: string;
  className?: string;
}) => {
  const deleteElement = useCanvasStore((state) => state.deleteElement);

  const handleDelete = useCallback(() => {
    if (!elementId) return;
    deleteElement(elementId);
  }, [elementId, deleteElement]);

  const isDefaultStyle = !className;
  const buttonClassName =
    className ||
    "w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
      className={buttonClassName}
      aria-label="Eliminar elemento seleccionado"
    >
      <Trash2 className="w-4 h-4" />
      {isDefaultStyle && <span>Eliminar elemento</span>}
    </button>
  );
};
