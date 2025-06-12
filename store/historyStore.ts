import { create } from 'zustand';
import { Section } from './canvasStore';

interface HistoryState {
  past: Section[][];
  present: Section[];
  future: Section[][];
  canUndo: boolean;
  canRedo: boolean;
  maxHistory: number;
  pushState: (sections: Section[]) => void;
  undo: () => Section[] | undefined;
  redo: () => Section[] | undefined;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  present: [],
  future: [],
  canUndo: false,
  canRedo: false,
  maxHistory: 50,

  pushState: (sections: Section[]) => {
    set(state => {
      if (state.present.length === 0) {
        return {
          ...state,
          present: JSON.parse(JSON.stringify(sections))
        };
      }

      if (JSON.stringify(state.present) === JSON.stringify(sections)) {
        return state;
      }

      return {
        past: [...state.past, state.present].slice(-state.maxHistory),
        present: JSON.parse(JSON.stringify(sections)), // Deep copy
        future: [],
        canUndo: true,
        canRedo: false
      };
    });
  },

  undo: () => {
    const state = get();
    if (state.past.length === 0) return;

    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);

    set({
      past: newPast,
      present: previous,
      future: [state.present, ...state.future],
      canUndo: newPast.length > 0,
      canRedo: true
    });

    return previous;
  },

  redo: () => {
    const state = get();
    if (state.future.length === 0) return;

    const next = state.future[0];
    const newFuture = state.future.slice(1);

    set({
      past: [...state.past, state.present],
      present: next,
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0
    });

    return next;
  },

  clear: () => {
    set({
      past: [],
      present: [],
      future: [],
      canUndo: false,
      canRedo: false
    });
  }
}));
