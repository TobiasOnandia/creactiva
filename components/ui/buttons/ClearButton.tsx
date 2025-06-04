"use client"
import { useCanvasStore } from "@/store/canvasStore";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const ClearButton = () => {
  const clearCanvas = useCanvasStore((state) => state.clearCanvas);

    const handleClear = () => {
      toast.custom(
        (t) => (
          <div className="relative w-full max-w-md bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent -z-10" />
            
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-base font-medium text-neutral-200">Confirmar acción</h3>
                <button 
                  onClick={() => toast.dismiss(t)}
                  className="ml-auto p-1 rounded-md text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-neutral-300 mb-2">¿Estás seguro que deseas limpiar el canvas?</p>
              <p className="text-xs text-neutral-500">Esta acción no se puede deshacer y eliminará todos los elementos.</p>
            </div>
            
            <div className="flex items-center justify-end gap-2 p-4 bg-neutral-900/80">
              <button
                onClick={() => toast.dismiss(t)}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearCanvas();
                  toast.success("Canvas limpiado correctamente", {
                    position: "top-center",
                    duration: 3000,
                    style: {
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
                    }
                  });
                  toast.dismiss(t);
                }}
                className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 rounded-lg text-sm transition-colors"
              >
                Limpiar Canvas
              </button>
            </div>
          </div>
        ),
        {
          position: "top-center",
          duration: 10000, 
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
