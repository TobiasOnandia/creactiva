'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';

export const PreviewButton = () => {
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);
  const togglePreviewMode = useCanvasStore((state) => state.togglePreviewMode);

  return (
    <button
      onClick={togglePreviewMode}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-200
        ${isPreviewMode 
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20' 
          : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-700'
        }
      `}
    >
      {isPreviewMode ? (
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
