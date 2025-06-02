import { create } from "zustand";
import { CanvasElement } from "@/types/CanvasTypes";

export interface CanvasStore {
  canvasElements: CanvasElement[];
  addCanvasElement: (element: CanvasElement) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  activeDevice: "mobile" | "tablet" | "desktop";
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => void;
  clearCanvas: () => void;
  isStylePanelOpen: boolean;
  openStylePanel: () => void;
  config: {
    content: string;
    backgroundColor: string;
    color: string;
    fontSize: string;
    padding: string;
    border: string;
    borderRadius: string;
  }
  setConfig: (newConfig: Partial<CanvasStore["config"]>) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasElements: [],
  config: {
    content: "Titulo del elemento",
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
  },
  isStylePanelOpen: false,
  addCanvasElement: (element: CanvasElement) => {
    set((state) => ({
      canvasElements: [...state.canvasElements, element],
    }));
  },
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  activeDevice: "desktop",
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => set({ activeDevice: device }),
  clearCanvas: () => set({ canvasElements: [] }),
  openStylePanel: () => set((state) => ({ isStylePanelOpen: !state.isStylePanelOpen })),
  setConfig: (newConfig: Partial<CanvasStore["config"]>) => set((state) => ({ config: { ...state.config, ...newConfig } })),
}));
