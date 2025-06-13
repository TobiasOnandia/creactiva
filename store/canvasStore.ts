import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { GridLayout } from "@/types/canvas/LayoutTypes";
import { useHistoryStore } from "./historyStore";

export interface Section {
  id: string;
  name: string;
  slug: string;
  elements: CanvasElement[];
  layout: GridLayout[];
  is_home?: boolean;
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface StylePanel {
  id: string;
  isOpen: boolean;
}

export interface CanvasStore {
  sections: Section[];
  activeSectionId: string;
  canvasElements: CanvasElement[]; 
  deletedElements: CanvasElement[];
  isEditMode: boolean;
  activeDevice: DeviceType;
  isStylePanelOpen: StylePanel;
  isPreviewMode: boolean;
  activeSection: Section | undefined;
  
  addSection: (section: Section) => void;
  removeSection: (id: string) => void;
  setActiveSection: (id: string) => void;
  setSections: (sections: Section[]) => void;
  updateSectionLayout: (id: string, layout: GridLayout[]) => void;
  
  addElementToSection: (element: CanvasElement, sectionId: string) => void;
  updateElementConfig: (id: string, newConfig: Partial<CanvasElement["config"]>) => void;
  deleteElement: (id: string) => void;
  restoreElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  
  setActiveDevice: (device: DeviceType) => void;
  openStylePanel: (id: string) => void;
  closeStylePanel: () => void;

  undo: () => void;
  redo: () => void;
  togglePreviewMode: () => void;
  
  clearCanvas: () => void;
}

const createDefaultSection = (): Section => ({
  id: "home",
  name: "Inicio",
  slug: "inicio",
  elements: [],
  layout: [],
  is_home: true
});

const validateLayoutItem = (item: GridLayout): GridLayout => ({
  ...item,
  static: item.static || false,
  isDraggable: item.isDraggable !== false,
  minH: item.minH || 2,
  minW: item.minW || 2
});

const generateId = (): string => crypto.randomUUID();

const findSectionById = (sections: Section[], id: string): Section | undefined =>
  sections.find(section => section.id === id);

const findElementById = (elements: CanvasElement[], id: string): CanvasElement | undefined =>
  elements.find(element => element.id === id);

export const useCanvasStore = create<CanvasStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      sections: [createDefaultSection()],
      activeSectionId: "home",
      canvasElements: [],
      deletedElements: [],
      isStylePanelOpen: { id: "", isOpen: false },
      activeDevice: "desktop",
      isEditMode: false,
      isPreviewMode: false,

      get activeSection() {
        return findSectionById(get().sections, get().activeSectionId);
      },

      setSections: (sections) =>
        set((state) => {
          const sectionsCopy = JSON.parse(JSON.stringify(sections));
          
          state.sections = sectionsCopy;
          const activeSection = findSectionById(sectionsCopy, state.activeSectionId);
          if (activeSection) {
            state.canvasElements = [...activeSection.elements];
          } else if (sectionsCopy[0]) {
            state.activeSectionId = sectionsCopy[0].id;
            state.canvasElements = [...sectionsCopy[0].elements];
          }
          
          useHistoryStore.getState().clear();
          useHistoryStore.getState().pushState(sectionsCopy);
        }),

      addSection: (section) =>
        set((state) => {
          state.sections.push({
            ...section,
            id: section.id || generateId()
          });
          useHistoryStore.getState().pushState([...state.sections]);
        }),

      removeSection: (id) =>
        set((state) => {
          state.sections = state.sections.filter(section => section.id !== id);
          
          if (state.activeSectionId === id) {
            state.activeSectionId = state.sections[0]?.id || "";
          }

          useHistoryStore.getState().pushState([...state.sections]);
        }),

      setActiveSection: (id) =>
        set((state) => {
          const section = findSectionById(state.sections, id);
          if (section) {
            state.activeSectionId = id;
            state.canvasElements = [...section.elements];
            state.isStylePanelOpen = { id: "", isOpen: false };
          }
        }),

      updateSectionLayout: (id, layout) =>
        set((state) => {
          const section = findSectionById(state.sections, id);
          if (section) {
            section.layout = layout.map(validateLayoutItem);
          }
        }),

      addElementToSection: (element, sectionId) =>
        set((state) => {
          const section = findSectionById(state.sections, sectionId);
          if (section) {
            const elementWithId = {
              ...element,
              id: element.id || generateId()
            };
            section.elements.push(elementWithId);
            
            if (sectionId === state.activeSectionId) {
              state.canvasElements = [...section.elements];
            }
            useHistoryStore.getState().pushState([...state.sections]);
          }
        }),

      updateElementConfig: (id, newConfig) =>
        set((state) => {
          const activeSection = findSectionById(state.sections, state.activeSectionId);
          if (activeSection) {
            const element = findElementById(activeSection.elements, id);
            if (element) {
              element.config = { ...element.config, ...newConfig };
              state.canvasElements = [...activeSection.elements];
            }
          }
        }),

      deleteElement: (id) =>
        set((state) => {
          const activeSection = findSectionById(state.sections, state.activeSectionId);
          if (activeSection) {
            const elementIndex = activeSection.elements.findIndex(e => e.id === id);
            if (elementIndex !== -1) {
              const [deletedElement] = activeSection.elements.splice(elementIndex, 1);
              state.deletedElements.push(deletedElement);
              state.canvasElements = [...activeSection.elements]; 
              state.isStylePanelOpen = { id: "", isOpen: false };
              useHistoryStore.getState().pushState([...state.sections]);
            }
          }
        }),

      restoreElement: (id) =>
        set((state) => {
          const deletedIndex = state.deletedElements.findIndex(e => e.id === id);
          if (deletedIndex !== -1) {
            const [restoredElement] = state.deletedElements.splice(deletedIndex, 1);
            const activeSection = findSectionById(state.sections, state.activeSectionId);
            if (activeSection) {
              activeSection.elements.push(restoredElement);
              state.canvasElements = [...activeSection.elements]; 
              useHistoryStore.getState().pushState([...state.sections]);
            }
          }
        }),

      duplicateElement: (id) =>
        set((state) => {
          const activeSection = findSectionById(state.sections, state.activeSectionId);
          if (activeSection) {
            const elementToDuplicate = findElementById(activeSection.elements, id);
            if (elementToDuplicate) {
              const newElement = {
                ...elementToDuplicate,
                id: generateId(),
              };
              activeSection.elements.push(newElement);
              state.canvasElements = [...activeSection.elements]; 
              useHistoryStore.getState().pushState([...state.sections]);
            }
          }
        }),

      setActiveDevice: (device) =>
        set((state) => {
          state.activeDevice = device;
        }),

      openStylePanel: (id) =>
        set((state) => {
          state.isStylePanelOpen = { id, isOpen: true };
        }),

      closeStylePanel: () =>
        set((state) => {
          state.isStylePanelOpen = { id: "", isOpen: false };
        }),

      togglePreviewMode: () =>
        set((state) => {
          state.isPreviewMode = !state.isPreviewMode;
        }),

      undo: () => {
        const previousState = useHistoryStore.getState().undo();
        if (previousState) {
          set((state) => {
            state.sections = previousState;
            const activeSection = findSectionById(previousState, state.activeSectionId);
            if (activeSection) {
              state.canvasElements = [...activeSection.elements];
            }
          });
        }
      },

      redo: () => {
        const nextState = useHistoryStore.getState().redo();
        if (nextState) {
          set((state) => {
            state.sections = nextState;
            const activeSection = findSectionById(nextState, state.activeSectionId);
            if (activeSection) {
              state.canvasElements = [...activeSection.elements];
            }
          });
        }
      },

      clearCanvas: () =>
        set((state) => {
          const activeSection = findSectionById(state.sections, state.activeSectionId);
          if (activeSection) {
            activeSection.elements = [];
            activeSection.layout = [];
          }
          state.canvasElements = []; 
          state.deletedElements = [];
          state.isStylePanelOpen = { id: "", isOpen: false };
          useHistoryStore.getState().pushState([...state.sections]);
          useHistoryStore.getState().clear(); 
        }),
    }))
  )
);