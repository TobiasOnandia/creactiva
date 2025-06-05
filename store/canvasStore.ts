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
  setSections: (sections: Section[]) => void;
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
      if (!section) return state;

      return {
        activeSectionId: id,
        canvasElements: [...section.elements], // Crear una nueva referencia del array
        isStylePanelOpen: { id: "", isOpen: false } // Cerrar el panel de estilos al cambiar de sección
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
      // Crear un elemento con ID temporal si no tiene uno
      const elementWithId = {
        ...element,
        id: element.id || `temp_id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      const updatedSections = state.sections.map(section =>
        section.id === sectionId
          ? { ...section, elements: [...section.elements, elementWithId] }
          : section
      );

      // Si la sección actual es la que se está modificando, actualizar canvasElements
      const updatedCanvasElements = sectionId === state.activeSectionId
        ? [...state.canvasElements, elementWithId]
        : state.canvasElements;

      return {
        sections: updatedSections,
        canvasElements: updatedCanvasElements
      };
    }),

  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setActiveDevice: (device: "mobile" | "tablet" | "desktop") => set({ activeDevice: device }),
  clearCanvas: () => set({ canvasElements: [] }),
  openStylePanel: (id: string) => set((state) => ({ isStylePanelOpen: { id, isOpen: !state.isStylePanelOpen.isOpen } })),
  updateElementConfig: (id: string, newConfig: Partial<CanvasElement["config"]>) => {
    set((state) => {
      // Encontrar la sección que contiene el elemento
      const sectionIndex = state.sections.findIndex(section =>
        section.elements.some(el => el.id === id)
      );

      if (sectionIndex === -1) return state;

      // Crear una copia profunda de las secciones
      const updatedSections = [...state.sections];
      const section = { ...updatedSections[sectionIndex] };

      // Actualizar el elemento en la sección
      section.elements = section.elements.map(element =>
        element.id === id
          ? { ...element, config: { ...element.config, ...newConfig } }
          : element
      );

      updatedSections[sectionIndex] = section;

      // Si el elemento está en la sección activa, actualizar canvasElements
      const updatedCanvasElements = state.sections[sectionIndex].id === state.activeSectionId
        ? section.elements
        : state.canvasElements;

      return {
        sections: updatedSections,
        canvasElements: updatedCanvasElements
      };
    });
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
  setSections: (sections: Section[]) =>
    set((state) => {
      const activeSection = sections.find(s => s.id === state.activeSectionId);

      return {
        sections,
        // Asegurarnos de crear una nueva referencia del array de elementos
        canvasElements: activeSection ? [...activeSection.elements] : [],
        // Restablecer el estado del panel de estilos
        isStylePanelOpen: { id: "", isOpen: false }
      };
    }),
}));
