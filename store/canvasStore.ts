import { create } from "zustand";
import { CanvasElement } from "@/types/CanvasTypes";

export interface CanvasStore {
  canvasElements: CanvasElement[];
  deletedElements: CanvasElement[];
  isEditMode: boolean;
  activeDevice: "mobile" | "tablet" | "desktop";
  isStylePanelOpen: {
    id: string;
    isOpen: boolean;
  };
  addCanvasElement: (element: CanvasElement) => void;
  toggleEditMode: () => void;
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => void;
  clearCanvas: () => void;
  openStylePanel: (id: string) => void;
  updateElementConfig: (id: string, newConfig: Partial<CanvasElement["config"]>) => void;
  deleteElement: (id: string) => void;
  restoreDefaultStyles: () => void;
  restoreElement: (id: string) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvasElements: [],
  isStylePanelOpen: {
    id: "",
    isOpen: false,
  },
  activeDevice: "desktop",
  isEditMode: false,
  deletedElements: [],
  addCanvasElement: (element: CanvasElement) => {
    set((state) => ({
      canvasElements: [...state.canvasElements, element],
    }));
  },
  updateElementConfig: (id: string, newConfig: Partial<CanvasElement["config"]>) => {
    set((state) => ({
      canvasElements: state.canvasElements.map((element) =>
        element.id === id ? { ...element, config: { ...element.config, ...newConfig } } : element
      ),
    }));
  },
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => set({ activeDevice: device }),
  clearCanvas: () => set({ canvasElements: [] }),
  openStylePanel: (id: string) => set((state) => ({ isStylePanelOpen: { id, isOpen: !state.isStylePanelOpen.isOpen } })),
  deleteElement: (id: string) =>
  set((state) => {
    const elementToDelete = state.canvasElements.find((el) => el.id === id);
    if (!elementToDelete) return {};
    return {
      canvasElements: state.canvasElements.filter((el) => el.id !== id),
      deletedElements: [...state.deletedElements, elementToDelete],
    };
  }),
  restoreDefaultStyles: () => set((state) => ({
    canvasElements: state.canvasElements.map((element) => ({
      ...element,
      config: {
        ...element.config,
      }
    }))
  })),
  restoreElement: (id: string) =>
  set((state) => {
    const elementToRestore = state.deletedElements.find((el) => el.id === id);
    if (!elementToRestore) return {};
    return {
      canvasElements: [...state.canvasElements, elementToRestore],
      deletedElements: state.deletedElements.filter((el) => el.id !== id),
    };
  }),
}));
