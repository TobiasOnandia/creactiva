import { describe, it, expect, beforeEach } from 'vitest';
import { useHistoryStore } from '@/store/historyStore';
import { Section } from '@/store/canvasStore';

describe('useHistoryStore', () => {
  beforeEach(() => {
    useHistoryStore.getState().clear();
  });

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const state = useHistoryStore.getState();
      
      expect(state.past).toEqual([]);
      expect(state.present).toEqual([]);
      expect(state.future).toEqual([]);
      expect(state.canUndo).toBe(false);
      expect(state.canRedo).toBe(false);
      expect(state.maxHistory).toBe(50);
    });
  });

  describe('pushState', () => {
    it('debe establecer el estado presente cuando está vacío', () => {
      const sections: Section[] = [
        { id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }
      ];

      useHistoryStore.getState().pushState(sections);
      const state = useHistoryStore.getState();

      expect(state.present).toEqual(sections);
      expect(state.past).toEqual([]);
      expect(state.future).toEqual([]);
      expect(state.canUndo).toBe(false);
      expect(state.canRedo).toBe(false);
    });

    it('debe agregar el estado presente al historial cuando se hace push de un nuevo estado', () => {
      const sections1: Section[] = [
        { id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }
      ];
      const sections2: Section[] = [
        { id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }
      ];

      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      
      const state = useHistoryStore.getState();

      expect(state.present).toEqual(sections2);
      expect(state.past).toEqual([sections1]);
      expect(state.future).toEqual([]);
      expect(state.canUndo).toBe(true);
      expect(state.canRedo).toBe(false);
    });

    it('no debe cambiar el estado si las secciones son idénticas', () => {
      const sections: Section[] = [
        { id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }
      ];

      useHistoryStore.getState().pushState(sections);
      const stateBefore = useHistoryStore.getState();
      
      useHistoryStore.getState().pushState(sections);
      const stateAfter = useHistoryStore.getState();

      expect(stateAfter).toEqual(stateBefore);
    });

    it('debe limpiar el future cuando se hace push de un nuevo estado', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];
      const sections3: Section[] = [{ id: '1', name: 'Section 3', slug: 'section-3', elements: [], layout: [] }];

      // Crear historial
      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      useHistoryStore.getState().pushState(sections3);

      // Hacer undo para crear future
      useHistoryStore.getState().undo();
      expect(useHistoryStore.getState().future.length).toBe(1);

      // Push nuevo estado debe limpiar future
      const sections4: Section[] = [{ id: '1', name: 'Section 4', slug: 'section-4', elements: [], layout: [] }];
      useHistoryStore.getState().pushState(sections4);

      const state = useHistoryStore.getState();
      expect(state.future).toEqual([]);
      expect(state.canRedo).toBe(false);
    });

    it('debe respetar el límite máximo de historial', () => {
      useHistoryStore.setState({ maxHistory: 3 });

      const sections = Array.from({ length: 5 }, (_, i) => [
        { id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }
      ]);

      sections.forEach(section => {
        useHistoryStore.getState().pushState(section);
      });

      const state = useHistoryStore.getState();
      expect(state.past.length).toBe(0);
      expect(state.present.length).toBe(1);
      expect(state.future.length).toBe(0);
    });

    it('debe hacer deep copy de las secciones', () => {
      const sections: Section[] = [
        { id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }
      ];

      useHistoryStore.getState().pushState(sections);
      
      sections[0].name = 'Modified';

      const state = useHistoryStore.getState();
      expect(state.present[0].name).toBe('Section 1');
    });
  });

  describe('undo', () => {
    it('debe retornar undefined si no hay estados pasados', () => {
      const result = useHistoryStore.getState().undo();
      expect(result).toBeUndefined();
    });

    it('debe restaurar el estado anterior', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];

      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);

      const result = useHistoryStore.getState().undo();
      const state = useHistoryStore.getState();

      expect(result).toEqual(sections1);
      expect(state.present).toEqual(sections1);
      expect(state.past).toEqual([]);
      expect(state.future).toEqual([sections2]);
      expect(state.canUndo).toBe(false);
      expect(state.canRedo).toBe(true);
    });

    it('debe manejar múltiples undos correctamente', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];
      const sections3: Section[] = [{ id: '1', name: 'Section 3', slug: 'section-3', elements: [], layout: [] }];

      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      useHistoryStore.getState().pushState(sections3);

      useHistoryStore.getState().undo();
      let state = useHistoryStore.getState();
      expect(state.present).toEqual(sections2);
      expect(state.canUndo).toBe(true);

      // Segundo undo
      useHistoryStore.getState().undo();
      state = useHistoryStore.getState();
      expect(state.present).toEqual(sections1);
      expect(state.canUndo).toBe(false);
    });
  });

  describe('redo', () => {
    it('debe retornar undefined si no hay estados futuros', () => {
      const result = useHistoryStore.getState().redo();
      expect(result).toBeUndefined();
    });

    it('debe restaurar el estado siguiente', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];

      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      useHistoryStore.getState().undo();

      const result = useHistoryStore.getState().redo();
      const state = useHistoryStore.getState();

      expect(result).toEqual(sections2);
      expect(state.present).toEqual(sections2);
      expect(state.past).toEqual([sections1]);
      expect(state.future).toEqual([]);
      expect(state.canUndo).toBe(true);
      expect(state.canRedo).toBe(false);
    });

    it('debe manejar múltiples redos correctamente', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];
      const sections3: Section[] = [{ id: '1', name: 'Section 3', slug: 'section-3', elements: [], layout: [] }];

      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      useHistoryStore.getState().pushState(sections3);

      // Hacer undos
      useHistoryStore.getState().undo();
      useHistoryStore.getState().undo();

      // Primer redo
      useHistoryStore.getState().redo();
      let state = useHistoryStore.getState();
      expect(state.present).toEqual(sections2);
      expect(state.canRedo).toBe(true);

      // Segundo redo
      useHistoryStore.getState().redo();
      state = useHistoryStore.getState();
      expect(state.present).toEqual(sections3);
      expect(state.canRedo).toBe(false);
    });
  });

  describe('clear', () => {
    it('debe limpiar todo el historial', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];

      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      useHistoryStore.getState().undo();

      useHistoryStore.getState().clear();
      const state = useHistoryStore.getState();

      expect(state.past).toEqual([]);
      expect(state.present).toEqual([]);
      expect(state.future).toEqual([]);
      expect(state.canUndo).toBe(false);
      expect(state.canRedo).toBe(false);
    });
  });

  describe('Flujo completo', () => {
    it('debe manejar un flujo completo de operaciones', () => {
      const sections1: Section[] = [{ id: '1', name: 'Section 1', slug: 'section-1', elements: [], layout: [] }];
      const sections2: Section[] = [{ id: '1', name: 'Section 2', slug: 'section-2', elements: [], layout: [] }];
      const sections3: Section[] = [{ id: '1', name: 'Section 3', slug: 'section-3', elements: [], layout: [] }];
      const sections4: Section[] = [{ id: '1', name: 'Section 4', slug: 'section-4', elements: [], layout: [] }];

      // Crear historial
      useHistoryStore.getState().pushState(sections1);
      useHistoryStore.getState().pushState(sections2);
      useHistoryStore.getState().pushState(sections3);

      // Undo y agregar nueva rama
      useHistoryStore.getState().undo();
      useHistoryStore.getState().pushState(sections4);

      const state = useHistoryStore.getState();
      expect(state.present).toEqual(sections4);
      expect(state.past).toEqual([sections1, sections2]);
      expect(state.future).toEqual([]);
      expect(state.canUndo).toBe(true);
      expect(state.canRedo).toBe(false);
    });
  });
});