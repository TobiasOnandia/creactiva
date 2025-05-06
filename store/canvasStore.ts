// stores/canvasStore.ts
import { create } from "zustand";
import { CanvasElement } from "@/types/DragAndDrop.types";
import { DEFAULT_ITEM_WIDTH, DEFAULT_ITEM_HEIGHT } from "@/config"; // Importa tus valores por defecto

interface CanvasState {
  canvasElements: CanvasElement[];
  elementCounter: number;

  // Acciones para modificar el estado
  addElement: (
    element: Omit<CanvasElement, "id" | "width" | "height"> & {
      x: number;
      y: number;
    }
  ) => string; // Añade un elemento, retorna su nuevo ID
  updateElementPosition: (
    itemId: string,
    newPosition: { x: number; y: number }
  ) => void;
  updateElementSize: (
    itemId: string,
    newWidth: number,
    newHeight: number
  ) => void;
  // Si canvasRect está en el store:
  // setCanvasRect: (rect: DOMRect) => void;
  // Puedes añadir acciones para seleccionar/deseleccionar elementos, eliminar, etc.
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  // Estado inicial
  canvasElements: [],
  elementCounter: 0,
  // canvasRect: null,

  // Acciones
  addElement: (elementData) => {
    const newElementId = `canvas-item-${get().elementCounter}`;
    const newElement: CanvasElement = {
      id: newElementId,
      type: elementData.type,
      label: elementData.label,
      colorClass: elementData.colorClass,
      x: elementData.x,
      y: elementData.y,
      width: DEFAULT_ITEM_WIDTH, // Usar valores por defecto
      height: DEFAULT_ITEM_HEIGHT, // Usar valores por defecto
      // ... otras props si vienen en elementData
    };
    set((state) => ({
      canvasElements: [...state.canvasElements, newElement],
      elementCounter: state.elementCounter + 1,
    }));
    return newElementId; // Retornar el ID del nuevo elemento
  },

  updateElementPosition: (itemId, newPosition) => {
    set((state) => ({
      canvasElements: state.canvasElements.map((el) =>
        el.id === itemId ? { ...el, x: newPosition.x, y: newPosition.y } : el
      ),
    }));
  },

  updateElementSize: (itemId, newWidth, newHeight) => {
    set((state) => ({
      canvasElements: state.canvasElements.map((el) =>
        el.id === itemId ? { ...el, width: newWidth, height: newHeight } : el
      ),
    }));
  },

  // Si canvasRect está en el store:
  // setCanvasRect: (rect) => set({ canvasRect: rect }),
}));
