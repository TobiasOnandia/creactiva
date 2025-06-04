import { create } from "zustand";
import { CanvasElement } from "@/types/CanvasTypes";

export interface Section {
  id: string;
  name: string;
  slug: string;
  elements: CanvasElement[];
  layout: any[];
  isHome?: boolean;
}

export interface CanvasStore {
  sections: Section[];
  activeSectionId: string;
  canvasElements: CanvasElement[];
  deletedElements: CanvasElement[];
  isEditMode: boolean;
  activeDevice: "mobile" | "tablet" | "desktop";
  isStylePanelOpen: {
    id: string;
    isOpen: boolean;
  };
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  setActiveSection: (id: string) => void;
  updateSectionLayout: (id: string, layout: any[]) => void;
  addElementToSection: (element: CanvasElement, sectionId: string) => void;
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
  sections: [
    {
      id: "home",
      name: "Inicio",
      slug: "inicio",
      elements: [],
      layout: [],
      isHome: true
    }
  ],
  activeSectionId: "home",
  canvasElements: [],
  deletedElements: [],
  isStylePanelOpen: { id: "", isOpen: false },
  activeDevice: "desktop",
  isEditMode: false,

  addSection: (section) => 
    set((state) => ({
      sections: [...state.sections, section]
    })),

  removeSection: (id) => 
    set((state) => ({
      sections: state.sections.filter(section => section.id !== id)
    })),

  setActiveSection: (id) => 
    set((state) => {
      const section = state.sections.find(s => s.id === id);
      return {
        activeSectionId: id,
        canvasElements: section?.elements || []
      };
    }),

  updateSectionLayout: (id, layout) =>
    set((state) => ({
      sections: state.sections.map(section =>
        section.id === id ? { ...section, layout } : section
      )
    })),

  addElementToSection: (element, sectionId) =>
    set((state) => {
      const updatedSections = state.sections.map(section =>
        section.id === sectionId
          ? { ...section, elements: [...section.elements, element] }
          : section
      );
      
      return {
        sections: updatedSections,
        canvasElements: sectionId === state.activeSectionId
          ? [...state.canvasElements, element]
          : state.canvasElements
      };
    }),

  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => set({ activeDevice: device }),
  clearCanvas: () => set({ canvasElements: [] }),
  openStylePanel: (id: string) => set((state) => ({ isStylePanelOpen: { id, isOpen: !state.isStylePanelOpen.isOpen } })),
  updateElementConfig: (id: string, newConfig: Partial<CanvasElement["config"]>) => {
    set((state) => ({
      canvasElements: state.canvasElements.map((element) =>
        element.id === id ? { ...element, config: { ...element.config, ...newConfig } } : element
      ),
    }));
  },
  deleteElement: (id: string) =>
    set((state) => {
      const elementToDelete = state.canvasElements.find((el) => el.id === id);
      if (!elementToDelete) return state;

      const updatedSections = state.sections.map(section => ({
        ...section,
        elements: section.elements.filter(el => el.id !== id)
      }));

      return {
        sections: updatedSections,
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
