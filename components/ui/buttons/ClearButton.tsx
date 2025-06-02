"use client"
import { useCanvasStore } from "@/store/canvasStore";
import { Trash2 } from "lucide-react";

export const ClearButton = () => {
  const clearCanvas = useCanvasStore((state) => state.clearCanvas);
  


  return (
    <>
    <button onClick={clearCanvas} className="flex items-center cursor-pointer justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50">
      <Trash2 className="w-4 h-4" />
      <span className="hidden sm:inline">Limpiar</span>
    </button>
    {/* Agregar confirmacion de limpieza  */}
    
    </>
  );
};
