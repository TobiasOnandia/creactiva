import { describe, it, expect, beforeEach, vi, Mock, afterEach } from "vitest";
import { useCanvasStore, Section, DeviceType } from "@/store/canvasStore";
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { GridLayout } from "@/types/canvas/LayoutTypes";

const pushState = vi.fn();
const clear = vi.fn();
const undo = vi.fn().mockReturnValue(null);
const redo = vi.fn().mockReturnValue(null);

// Mock del historyStore con espías estables
vi.mock("@/store/historyStore", () => ({
  useHistoryStore: {
    getState: () => ({ pushState, clear, undo, redo }),
  },
}));

// Mock de crypto.randomUUID
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: vi.fn(() => `mock-uuid-${Date.now()}-${Math.random()}`),
  },
});

// Mock data helpers
const createMockElement = (
  overrides: Partial<CanvasElement> = {}
): CanvasElement => ({
  id: "mock-element-id",
  type: "text",
  config: {
    content: "Test content",
  },
  ...overrides,
});

const createMockSection = (overrides: Partial<Section> = {}): Section => ({
  id: "mock-section-id",
  name: "Mock Section",
  slug: "mock-section",
  elements: [],
  layout: [],
  ...overrides,
});

const createMockLayout = (overrides: Partial<GridLayout> = {}): GridLayout => ({
  i: "layout-item-1",
  x: 0,
  y: 0,
  w: 4,
  h: 2,
  static: false,
  isDraggable: true,
  minH: 2,
  minW: 2,
  ...overrides,
});

describe("Canvas Store", () => {
  beforeEach(() => {
    // Reset store to initial state
    useCanvasStore.setState({
      sections: [
        {
          id: "home",
          name: "Inicio",
          slug: "inicio",
          elements: [],
          layout: [],
          is_home: true,
        },
      ],
      activeSectionId: "home",  
      canvasElements: [],
      deletedElements: [],
      isStylePanelOpen: { id: "", isOpen: false },
      activeDevice: "desktop",
      isEditMode: false,
      isPreviewMode: false,
    });

    // Clear mock calls
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Helper para obtener el estado actualizado
  const getStore = () => useCanvasStore.getState();

  describe("Initial State", () => {
    it("should have correct initial state", () => {
      const store = getStore();
      expect(store.sections).toHaveLength(1);
      expect(store.sections[0].id).toBe("home");
      expect(store.activeSectionId).toBe("home");
      expect(store.canvasElements).toEqual([]);
      expect(store.deletedElements).toEqual([]);
      expect(store.activeDevice).toBe("desktop");
      expect(store.isEditMode).toBe(false);
      expect(store.isPreviewMode).toBe(false);
    });

    it("should have activeSection computed property working", () => {
      const store = getStore();
      expect(store.activeSection).toBeDefined();
      expect(store.activeSection?.id).toBe("home");
    });
  });

  describe("Section Management", () => {
    it("should add a new section", () => {
      const newSection = createMockSection({
        id: "new-section",
        name: "New Section",
      });

      useCanvasStore.getState().addSection(newSection);
      const store = getStore();

      expect(store.sections).toHaveLength(2);
      expect(store.sections[1]).toEqual(
        expect.objectContaining({
          id: "new-section",
          name: "New Section",
        })
      );
    });

    it("should generate ID for section if not provided", () => {
      const newSection = createMockSection({ id: undefined as any });

      useCanvasStore.getState().addSection(newSection);
      const store = getStore();

      expect(store.sections[1].id).toMatch(/mock-uuid/);
    });

    it("should remove a section", () => {
      const sectionToRemove = createMockSection({ id: "to-remove" });
      useCanvasStore.getState().addSection(sectionToRemove);
      
      let store = getStore();
      expect(store.sections).toHaveLength(2);

      useCanvasStore.getState().removeSection("to-remove");
      store = getStore();

      expect(store.sections).toHaveLength(1);
      expect(store.sections.find((s) => s.id === "to-remove")).toBeUndefined();
    });

    it("should change active section when removed section is active", () => {
      const newSection = createMockSection({ id: "new-active" });
      useCanvasStore.getState().addSection(newSection);
      useCanvasStore.getState().setActiveSection("new-active");

      let store = getStore();
      expect(store.activeSectionId).toBe("new-active");

      useCanvasStore.getState().removeSection("new-active");
      store = getStore();

      expect(store.activeSectionId).toBe("home");
    });

    it("should set active section and update canvas elements", () => {
      const element = createMockElement({ id: "test-element" });
      const newSection = createMockSection({
        id: "section-with-elements",
        elements: [element],
      });

      useCanvasStore.getState().addSection(newSection);
      useCanvasStore.getState().setActiveSection("section-with-elements");
      
      const store = getStore();
      expect(store.activeSectionId).toBe("section-with-elements");
      expect(store.canvasElements).toHaveLength(1);
      expect(store.canvasElements[0].id).toBe("test-element");
    });

    it("should close style panel when changing active section", () => {
      useCanvasStore.getState().openStylePanel("some-element");
      let store = getStore();
      expect(store.isStylePanelOpen.isOpen).toBe(true);

      const newSection = createMockSection({ id: "new-section" });
      useCanvasStore.getState().addSection(newSection);
      useCanvasStore.getState().setActiveSection("new-section");
      
      store = getStore();
      expect(store.isStylePanelOpen.isOpen).toBe(false);
      expect(store.isStylePanelOpen.id).toBe("");
    });

    it("should update section layout with validation", () => {
      const layout = [
        createMockLayout({
          i: "item-1",
          // Missing some properties to test validation
          static: undefined as any,
          isDraggable: undefined as any,
          minH: undefined as any,
          minW: undefined as any,
        }),
      ];

      useCanvasStore.getState().updateSectionLayout("home", layout);
      const store = getStore();

      const homeSection = store.sections.find((s) => s.id === "home");
      expect(homeSection?.layout[0]).toEqual(
        expect.objectContaining({
          static: false,
          isDraggable: true,
          minH: 2,
          minW: 2,
        })
      );
    });

    it("should set sections and update active section", () => {
      const newSections = [
        createMockSection({ id: "section1", name: "Section 1" }),
        createMockSection({ id: "section2", name: "Section 2" }),
      ];

      useCanvasStore.getState().setSections(newSections);
      const store = getStore();
      
      expect(store.sections).toHaveLength(2);
      expect(store.activeSectionId).toBe("section1");
      expect(store.canvasElements).toEqual([]);
    });
  });

  describe("Element Management", () => {
    it("should add element to section", () => {
      const element = createMockElement();

      useCanvasStore.getState().addElementToSection(element, "home");
      const store = getStore();
      
      const homeSection = store.sections.find((s) => s.id === "home");
      expect(homeSection?.elements).toHaveLength(1);
      expect(store.canvasElements).toHaveLength(1);
    });

    it("should generate ID for element if not provided", () => {
      const element = createMockElement({ id: undefined as any });

      useCanvasStore.getState().addElementToSection(element, "home");
      const store = getStore();

      const homeSection = store.sections.find((s) => s.id === "home");
      expect(homeSection?.elements[0].id).toMatch(/mock-uuid/);
    });

    it("should update element config", () => {
      const element = createMockElement({ id: "element-to-update" });
      useCanvasStore.getState().addElementToSection(element, "home");

      const newConfig = { content: "Updated content" };
      useCanvasStore.getState().updateElementConfig("element-to-update", newConfig);
      const store = getStore();

      const updatedElement = store.canvasElements.find(
        (e) => e.id === "element-to-update"
      );
      expect(updatedElement?.config.content).toBe("Updated content");
    });

    it("should delete element and add to deleted elements", () => {
      const element = createMockElement({ id: "element-to-delete" });
      useCanvasStore.getState().addElementToSection(element, "home");

      let store = getStore();
      expect(store.canvasElements).toHaveLength(1);
      expect(store.deletedElements).toHaveLength(0);

      useCanvasStore.getState().deleteElement("element-to-delete");
      store = getStore();

      expect(store.canvasElements).toHaveLength(0);
      expect(store.deletedElements).toHaveLength(1);
      expect(store.deletedElements[0].id).toBe("element-to-delete");
    });

    it("should close style panel when deleting element", () => {
      const element = createMockElement({ id: "element-to-delete" });
      useCanvasStore.getState().addElementToSection(element, "home");
      useCanvasStore.getState().openStylePanel("element-to-delete");

      let store = getStore();
      expect(store.isStylePanelOpen.isOpen).toBe(true);

      useCanvasStore.getState().deleteElement("element-to-delete");
      store = getStore();

      expect(store.isStylePanelOpen.isOpen).toBe(false);
    });

    it("should restore deleted element", () => {
      const element = createMockElement({ id: "element-to-restore" });
      useCanvasStore.getState().addElementToSection(element, "home");
      useCanvasStore.getState().deleteElement("element-to-restore");

      let store = getStore();
      expect(store.canvasElements).toHaveLength(0);
      expect(store.deletedElements).toHaveLength(1);

      useCanvasStore.getState().restoreElement("element-to-restore");
      store = getStore();

      expect(store.canvasElements).toHaveLength(1);
      expect(store.deletedElements).toHaveLength(0);
    });

    it("should duplicate element", () => {
      const element = createMockElement({ id: "element-to-duplicate" });
      useCanvasStore.getState().addElementToSection(element, "home");

      useCanvasStore.getState().duplicateElement("element-to-duplicate");
      const store = getStore();

      expect(store.canvasElements).toHaveLength(2);
      expect(store.canvasElements[0].id).toBe("element-to-duplicate");
      expect(store.canvasElements[1].id).toMatch(/mock-uuid/);
      expect(store.canvasElements[1].config).toEqual(element.config);
    });
  });

  describe("UI State Management", () => {
    it("should set active device", () => {
      const devices: DeviceType[] = ["mobile", "tablet", "desktop"];

      devices.forEach((device) => {
        useCanvasStore.getState().setActiveDevice(device);
        const store = getStore();
        expect(store.activeDevice).toBe(device);
      });
    });

    it("should open and close style panel", () => {
      let store = getStore();
      expect(store.isStylePanelOpen.isOpen).toBe(false);

      useCanvasStore.getState().openStylePanel("element-id");
      store = getStore();

      expect(store.isStylePanelOpen.isOpen).toBe(true);
      expect(store.isStylePanelOpen.id).toBe("element-id");

      useCanvasStore.getState().closeStylePanel();
      store = getStore();

      expect(store.isStylePanelOpen.isOpen).toBe(false);
      expect(store.isStylePanelOpen.id).toBe("");
    });

    it("should toggle preview mode", () => {
      let store = getStore();
      expect(store.isPreviewMode).toBe(false);

      useCanvasStore.getState().togglePreviewMode();
      store = getStore();
      expect(store.isPreviewMode).toBe(true);

      useCanvasStore.getState().togglePreviewMode();
      store = getStore();
      expect(store.isPreviewMode).toBe(false);
    });
  });

  describe("Canvas Operations", () => {
    it("should clear canvas", () => {
      const element = createMockElement();
      useCanvasStore.getState().addElementToSection(element, "home");
      useCanvasStore.getState().openStylePanel("some-element");

      let store = getStore();
      expect(store.canvasElements).toHaveLength(1);
      expect(store.isStylePanelOpen.isOpen).toBe(true);

      useCanvasStore.getState().clearCanvas();
      store = getStore();

      expect(store.canvasElements).toHaveLength(0);
      expect(store.deletedElements).toHaveLength(0);
      expect(store.isStylePanelOpen.isOpen).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle adding element to non-existent section", () => {
      const element = createMockElement();
      const initialStore = getStore();

      useCanvasStore.getState().addElementToSection(element, "non-existent");
      const store = getStore();

      // Should not change state
      expect(store.sections).toEqual(initialStore.sections);
      expect(store.canvasElements).toEqual(initialStore.canvasElements);
    });

    it("should handle updating non-existent element", () => {
      const initialStore = getStore();
      const initialElements = [...initialStore.canvasElements];

      useCanvasStore.getState().updateElementConfig("non-existent", { content: "test" });
      const store = getStore();

      expect(store.canvasElements).toEqual(initialElements);
    });

    it("should handle deleting non-existent element", () => {
      const initialStore = getStore();
      const initialState = {
        canvasElements: [...initialStore.canvasElements],
        deletedElements: [...initialStore.deletedElements],
      };

      useCanvasStore.getState().deleteElement("non-existent");
      const store = getStore();

      expect(store.canvasElements).toEqual(initialState.canvasElements);
      expect(store.deletedElements).toEqual(initialState.deletedElements);
    });

    it("should handle restoring non-existent deleted element", () => {
      const initialStore = getStore();
      const initialState = {
        canvasElements: [...initialStore.canvasElements],
        deletedElements: [...initialStore.deletedElements],
      };

      useCanvasStore.getState().restoreElement("non-existent");
      const store = getStore();

      expect(store.canvasElements).toEqual(initialState.canvasElements);
      expect(store.deletedElements).toEqual(initialState.deletedElements);
    });

    it("should handle duplicating non-existent element", () => {
      const initialStore = getStore();
      const initialElements = [...initialStore.canvasElements];

      useCanvasStore.getState().duplicateElement("non-existent");
      const store = getStore();

      expect(store.canvasElements).toEqual(initialElements);
    });

    it("should handle setting non-existent active section", () => {
      const initialStore = getStore();
      const initialActiveId = initialStore.activeSectionId;
      const initialElements = [...initialStore.canvasElements];

      useCanvasStore.getState().setActiveSection("non-existent");
      const store = getStore();

      expect(store.activeSectionId).toBe(initialActiveId);
      expect(store.canvasElements).toEqual(initialElements);
    });
  });

  describe("History Integration", () => {
    it("should call history pushState when adding section", () => {
      const newSection = createMockSection();
      useCanvasStore.getState().addSection(newSection);

      // Verificar que pushState fue llamado con datos serializables
      expect(pushState).toHaveBeenCalledTimes(1);
      
      // Verificar que el argumento pasado es un array de secciones válido
      const calledWith = pushState.mock.calls[0][0];
      expect(Array.isArray(calledWith)).toBe(true);
      expect(calledWith).toHaveLength(2);
      expect(calledWith[1]).toEqual(expect.objectContaining(newSection));
    });

    it("should call history pushState when removing section", () => {
      const newSection = createMockSection({ id: "to-remove" });
      useCanvasStore.getState().addSection(newSection);
      vi.clearAllMocks(); // Clear previous calls

      useCanvasStore.getState().removeSection("to-remove");

      // Verificar que pushState fue llamado
      expect(pushState).toHaveBeenCalledTimes(1);
      
      // Verificar que solo queda la sección home
      const calledWith = pushState.mock.calls[0][0];
      expect(Array.isArray(calledWith)).toBe(true);
      expect(calledWith).toHaveLength(1);
    });

    it("should handle undo operation", () => {
      const mockUndo = undo as Mock;
      const previousState = [createMockSection({ id: "previous-state" })];
      mockUndo.mockReturnValueOnce(previousState);

      useCanvasStore.getState().undo();
      const store = getStore();

      expect(store.sections).toEqual(previousState);
    });

    it("should handle redo operation", () => {
      const mockRedo = redo as Mock;
      const nextState = [createMockSection({ id: "next-state" })];
      mockRedo.mockReturnValueOnce(nextState);

      useCanvasStore.getState().redo();
      const store = getStore();

      expect(store.sections).toEqual(nextState);
    });
  });
});