"use client";

import { Settings, Copy } from "lucide-react";
import { DeleteButton } from "../buttons/DeleteButton";

interface MobileElementToolbarProps {
  elementId: string;
  onEdit: () => void;
  onDuplicate: () => void;
  visible: boolean;
}

export const MobileElementToolbar = ({
  elementId,
  onEdit,
  onDuplicate,
  visible,
}: MobileElementToolbarProps) => {
  return (
    <div
      aria-hidden={!visible}
      className={`
        absolute -top-14 left-1/2 -translate-x-1/2
        flex items-center gap-1 p-1.5
        bg-neutral-900/80 backdrop-blur-md
        border border-white/10 rounded-full shadow-2xl shadow-black/50
        transition-all duration-300 ease-in-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
    >
      <button
        onClick={onEdit}
        className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors"
        aria-label="Editar estilos"
      >
        <Settings className="w-5 h-5" />
      </button>
      <button
        onClick={onDuplicate}
        className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors"
        aria-label="Duplicar elemento"
      >
        <Copy className="w-5 h-5" />
      </button>
      <div className="w-px h-6 bg-white/10 mx-1" />
      <DeleteButton
        elementId={elementId}
        className="p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/10 active:bg-red-500/20 transition-colors"
        aria-label="Eliminar elemento"
      />
    </div>
  );
};
