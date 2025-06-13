import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useCanvasStore } from "@/store/canvasStore";

export const DeleteButton = ({
  id,
  className,
}: {
  id: string;
  className: string;
}) => {
  const deleteElement = useCanvasStore((state) => state.deleteElement);

  const handleDelete = useCallback(() => {
    if (!id) return;
    deleteElement(id);
  }, [id, deleteElement]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
      className={className}
      aria-label="Eliminar elemento seleccionado"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
};
