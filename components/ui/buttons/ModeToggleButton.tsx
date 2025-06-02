"use client"
import { Edit, Eye } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';

export const ModeToggleButton = () => {
  const isEditMode = useCanvasStore((state) => state.isEditMode);
  const toggleEditMode = useCanvasStore((state) => state.toggleEditMode);

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-2">
      <button
        onClick={toggleEditMode}
        className={`
          relative flex items-center cursor-pointer justify-center gap-2 px-5 py-3 rounded-xl font-medium
          transition-all duration-300 shadow-xl group overflow-hidden
          ${isEditMode 
            ? 'bg-gradient-to-br from-cyan-600/80 to-cyan-500/80 text-white' 
            : 'bg-gradient-to-br from-purple-600/80 to-purple-500/80 text-white'}
        `}
      >
        {/* Efecto de luz radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icono y texto */}
        {isEditMode ? (
          <>
            <Edit className="w-5 h-5" />
            <span>Modo Edición</span>
          </>
        ) : (
          <>
            <Eye className="w-5 h-5" />
            <span>Modo Contenido</span>
          </>
        )}
        
        {/* Indicador de estado */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
          isEditMode ? 'bg-cyan-400' : 'bg-purple-400'
        } shadow-[0_0_8px] ${
          isEditMode ? 'shadow-cyan-400/50' : 'shadow-purple-400/50'
        }`} />
      </button>
    </div>
  );
};
