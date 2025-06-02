import { create } from "zustand";
import { CanvasElement } from "@/types/CanvasTypes";

interface CanvasStore {
  canvasElements: CanvasElement[];
  addCanvasElement: (element: CanvasElement) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  activeDevice: "mobile" | "tablet" | "desktop";
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasElements: [],
  addCanvasElement: (element: CanvasElement) => {
    set((state) => ({
      canvasElements: [...state.canvasElements, element],
    }));
  },
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  activeDevice: "desktop",
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => set({ activeDevice: device }),
}));
