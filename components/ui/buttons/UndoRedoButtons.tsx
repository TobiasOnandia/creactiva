import { Undo2Icon, Redo2Icon } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';
import { useHistoryStore } from '@/store/historyStore';

export const UndoRedoButtons = () => {
  const { undo, redo, isPreviewMode } = useCanvasStore();
  const { canUndo, canRedo } = useHistoryStore();

  if (isPreviewMode) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`p-1.5 rounded-lg transition-colors ${
          canUndo
            ? 'hover:bg-neutral-800 text-neutral-300'
            : 'text-neutral-600 cursor-not-allowed'
        }`}
        title="Deshacer (Ctrl+Z)"
      >
        <Undo2Icon className="w-4 h-4" />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className={`p-1.5 rounded-lg transition-colors ${
          canRedo
            ? 'hover:bg-neutral-800 text-neutral-300'
            : 'text-neutral-600 cursor-not-allowed'
        }`}
        title="Rehacer (Ctrl+Y)"
      >
        <Redo2Icon className="w-4 h-4" />
      </button>
    </div>
  );
};
