import { create } from "zustand";
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { GridLayout } from "@/types/canvas/LayoutTypes";

export interface Section {
  id: string;
  name: string;
  slug: string;
  elements: CanvasElement[];
  layout: GridLayout[];
  is_home?: boolean;
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
  isPreviewMode: boolean;
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  setActiveSection: (id: string) => void;
  updateSectionLayout: (id: string, layout: GridLayout[]) => void;
  addElementToSection: (element: CanvasElement, sectionId: string) => void;
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => void;
  clearCanvas: () => void;
  openStylePanel: (id: string) => void;
  updateElementConfig: (id: string, newConfig: Partial<CanvasElement["config"]>) => void;
  deleteElement: (id: string) => void;
  restoreElement: (id: string) => void;
  setSections: (sections: Section[]) => void;
  duplicateElement: (id: string) => void;
  togglePreviewMode: () => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  sections: [
    {
      id: "home",
      name: "Inicio",
      slug: "inicio",
      elements: [],
      layout: [],
      is_home: true
    }
  ],
  activeSectionId: "home",
  canvasElements: [],
  deletedElements: [],
  isStylePanelOpen: { id: "", isOpen: false },
  activeDevice: "desktop",
  isEditMode: false,
  isPreviewMode: false,
  setSections: (sections) => 
    set((state) => ({
      sections,
      canvasElements: sections.find(s => s.id === state.activeSectionId)?.elements || []
    })),

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
      if (!section) return state;

      return {
        activeSectionId: id,
        canvasElements: [...section.elements],
        isStylePanelOpen: { id: "", isOpen: false }
      };
    }),

  updateSectionLayout: (id, layout) =>
    set((state) => {
      const validatedLayout = layout.map(item => ({
        ...item,
        static: item.static || false,
        isDraggable: item.isDraggable !== false,
        minH: item.minH || 2,
        minW: item.minW || 2
      }));

      return {
        sections: state.sections.map(section =>
          section.id === id 
            ? { ...section, layout: validatedLayout }
            : section
        )
      };
    }),

  addElementToSection: (element, sectionId) =>
    set((state) => {
      const elementWithId = {
        ...element,
        id: element.id || crypto.randomUUID()
      };

      const updatedSections = state.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              elements: [...section.elements, elementWithId]
            }
          : section
      );

      return {
        sections: updatedSections,
        canvasElements: 
          state.activeSectionId === sectionId
            ? [...state.canvasElements, elementWithId]
            : state.canvasElements
      };
    }),


  setActiveDevice: (device) =>
    set(() => ({
      activeDevice: device
    })),

  clearCanvas: () =>
    set((state) => {
      const updatedSections = state.sections.map(section =>
        section.id === state.activeSectionId
          ? { ...section, elements: [], layout: [] }
          : section
      );

      return {
        sections: updatedSections,
        canvasElements: [],
        deletedElements: [],
        isStylePanelOpen: { id: "", isOpen: false }
      };
    }),

  openStylePanel: (id) =>
    set((state) => ({
      isStylePanelOpen: {
        id,
        isOpen: true
      }
    })),

  updateElementConfig: (id, newConfig) =>
    set((state) => {
      const updatedElements = state.canvasElements.map(element =>
        element.id === id
          ? { ...element, config: { ...element.config, ...newConfig } }
          : element
      );

      const updatedSections = state.sections.map(section =>
        section.id === state.activeSectionId
          ? { ...section, elements: updatedElements }
          : section
      );

      return {
        canvasElements: updatedElements,
        sections: updatedSections
      };
    }),

  deleteElement: (id) =>
    set((state) => {
      const elementToDelete = state.canvasElements.find(e => e.id === id);
      if (!elementToDelete) return state;

      const updatedElements = state.canvasElements.filter(e => e.id !== id);
      const updatedSections = state.sections.map(section =>
        section.id === state.activeSectionId
          ? { ...section, elements: updatedElements }
          : section
      );

      return {
        canvasElements: updatedElements,
        sections: updatedSections,
        deletedElements: [...state.deletedElements, elementToDelete],
        isStylePanelOpen: { id: "", isOpen: false }
      };
    }),

  restoreElement: (id) =>
    set((state) => {
      const elementToRestore = state.deletedElements.find(e => e.id === id);
      if (!elementToRestore) return state;

      const updatedDeleted = state.deletedElements.filter(e => e.id !== id);
      const updatedElements = [...state.canvasElements, elementToRestore];
      const updatedSections = state.sections.map(section =>
        section.id === state.activeSectionId
          ? { ...section, elements: updatedElements }
          : section
      );

      return {
        deletedElements: updatedDeleted,
        canvasElements: updatedElements,
        sections: updatedSections
      };
    }),

  duplicateElement: (id) => 
    set((state) => {
      const elementToDuplicate = state.canvasElements.find(el => el.id === id);
      if (!elementToDuplicate) return state;

      const newElement = {
        ...elementToDuplicate,
        id: crypto.randomUUID(),
      };

      const updatedSections = state.sections.map(section =>
        section.id === state.activeSectionId
          ? {
              ...section,
              elements: [...section.elements, newElement]
            }
          : section
      );

      return {
        sections: updatedSections,
        canvasElements: [...state.canvasElements, newElement]
      };
    }),

  togglePreviewMode: () => 
    set((state) => ({ isPreviewMode: !state.isPreviewMode })),
}));
