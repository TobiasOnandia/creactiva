// src/store/canvasStore.ts
import { create } from "zustand";
import { CanvasElement } from "@/types/CanvasTypes";

interface CanvasStore {
  canvasElements: CanvasElement[];
  addCanvasElement: (element: CanvasElement) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasElements: [],
  addCanvasElement: (element: CanvasElement) => {
    set((state) => ({
      canvasElements: [...state.canvasElements, element],
    }));
  },
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode }))
}));
