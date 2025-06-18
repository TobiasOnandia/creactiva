"use client";

import { Settings, Copy } from "lucide-react";
import { DeleteButton } from "../buttons/DeleteButton";

interface ElementToolbarProps {
  elementId: string;
  onEdit: () => void;
  onDuplicate: () => void;
  visible: boolean;
}

export const ElementToolbar = ({
  elementId,
  onEdit,
  onDuplicate,
  visible,
}: ElementToolbarProps) => {
  if (!visible) return null;

  return (
    <nav className="absolute -top-10 left-1/2  -translate-x-1/2 flex items-center gap-1 px-1.5 py-1 rounded-lg bg-neutral-900/95 border border-white/10 backdrop-blur-sm shadow-lg opacity-100 transition-opacity duration-200">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1.5 rounded-md cursor-pointer hover:bg-white/5 text-cyan-400 hover:text-cyan-300 transition-colors"
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
        className="p-1.5 rounded-md cursor-pointer hover:bg-white/5 text-neutral-400 hover:text-neutral-300 transition-colors"
        title="Duplicar elemento"
      >
        <Copy className="w-4 h-4" />
      </button>

      <span className="w-px h-4 bg-white/10" />

      <DeleteButton
        elementId={elementId}
        className="p-1.5 rounded-md cursor-pointer hover:bg-white/5 text-red-400 hover:text-red-300 transition-colors"
      />
    </nav>
  );
};
