"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useCanvasStore } from "@/store/canvasStore";
import { useState } from "react";

export const PreviewButton = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);
  const togglePreviewMode = useCanvasStore((state) => state.togglePreviewMode);
  const closeStylePanel = useCanvasStore((state) => state.closeStylePanel);
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);

  const handleTogglePreview = async () => {
    setIsTransitioning(true);

    try {
      if (isPreviewMode) {
        togglePreviewMode();
        setTimeout(() => {
          openStylePanel("home");
        }, 300);
      } else {
        closeStylePanel();
        setTimeout(() => {
          togglePreviewMode();
        }, 150);
      }
    } finally {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <button
      onClick={handleTogglePreview}
      disabled={isTransitioning}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-300 ease-in-out
        disabled:opacity-70 disabled:cursor-not-allowed
        ${
          isPreviewMode
            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 shadow-lg shadow-cyan-500/10"
            : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700 hover:text-neutral-300"
        }
      `}
      aria-label={
        isPreviewMode ? "Salir del modo preview" : "Activar modo preview"
      }
    >
      {isTransitioning ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Cargando...</span>
        </>
      ) : isPreviewMode ? (
        <>
          <EyeOff className="w-4 h-4" />
          <span>Salir de Preview</span>
        </>
      ) : (
        <>
          <Eye className="w-4 h-4" />
          <span>Vista Previa</span>
        </>
      )}
    </button>
  );
};
