'use client';

import { Settings, Copy, Trash2 } from 'lucide-react';

interface ElementToolbarProps {
  elementId: string;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  visible: boolean;
}

export const ElementToolbar = ({ 
  elementId,
  onEdit,
  onDuplicate,
  onDelete,
  visible 
}: ElementToolbarProps) => {
  if (!visible) return null;

  return (
    <nav className="absolute -top-10 left-1/2 z-200 -translate-x-1/2 flex items-center gap-1 px-1.5 py-1 rounded-lg bg-neutral-900/95 border border-white/10 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1.5 rounded-md hover:bg-white/5 text-cyan-400 hover:text-cyan-300 transition-colors"
        title="Editar estilos"
      >
        <Settings className="w-4 h-4" />
      </button>
      
      <span className="w-px h-4 bg-white/10" />
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDuplicate();
        }}
        className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-neutral-300 transition-colors"
        title="Duplicar elemento"
      >
        <Copy className="w-4 h-4" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1.5 rounded-md hover:bg-white/5 text-red-400 hover:text-red-300 transition-colors"
        title="Eliminar elemento"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </nav>
  );
};
