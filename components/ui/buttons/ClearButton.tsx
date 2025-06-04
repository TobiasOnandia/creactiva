"use client"
import { useCanvasStore } from "@/store/canvasStore";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const ClearButton = () => {
  const clearCanvas = useCanvasStore((state) => state.clearCanvas);
  const sections = useCanvasStore((state) => state.sections);

  const handleClear = () => {
    toast(
      <div className="flex flex-col gap-4">
        <p className="text-neutral-200">¿Estás seguro que deseas limpiar el canvas?</p>
        <p className="text-sm text-neutral-400">Esta acción no se puede deshacer.</p>
      </div>,
      {
        action: {
          label: "Limpiar",
          onClick: () => {
            clearCanvas();
            toast.success("Canvas limpiado correctamente");
          },
        },
        cancel: {
          label: "Cancelar",
          onClick: () => {},
        },
        position: "top-center",
        duration: 5000,
        actionButtonStyle: {
          backgroundColor: "rgb(239 68 68 / 0.1)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)",
        },
        cancelButtonStyle: {
          backgroundColor: "rgb(64 64 64 / 0.1)",
          color: "#a3a3a3",
          border: "1px solid rgba(163, 163, 163, 0.2)",
        },
      }
    );
  };

  return (
    <button 
      onClick={handleClear} 
      className="flex items-center cursor-pointer justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
    >
      <Trash2 className="w-4 h-4" />
      <span className="hidden sm:inline">Limpiar</span>
    </button>
  );
};
