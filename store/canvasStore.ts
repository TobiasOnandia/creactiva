import { create } from "zustand";
import { CanvasElement } from "@/types/CanvasTypes";

export interface CanvasStore {
  canvasElements: CanvasElement[];
  isEditMode: boolean;
  activeDevice: "mobile" | "tablet" | "desktop";
  isStylePanelOpen: boolean;
  addCanvasElement: (element: CanvasElement) => void;
  toggleEditMode: () => void;
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => void;
  clearCanvas: () => void;
  openStylePanel: () => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasElements: [],
  isStylePanelOpen: false,
  activeDevice: "desktop",
  isEditMode: false,
  addCanvasElement: (element: CanvasElement) => {
    set((state) => ({
      canvasElements: [...state.canvasElements, element],
    }));
  },
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => set({ activeDevice: device }),
  clearCanvas: () => set({ canvasElements: [] }),
  openStylePanel: () => set((state) => ({ isStylePanelOpen: !state.isStylePanelOpen })),
}));
