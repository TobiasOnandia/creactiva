// useCanvasLayout.test.ts

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCanvasLayout } from "@/hooks/useCanvasLayout";

const mockUpdateSectionLayout = vi.fn();

const sampleElements = [
  { id: "1", type: "text" },
  { id: "2", type: "image" },
  { id: "3", type: "button" },
];

describe("useCanvasLayout", () => {
  beforeEach(() => {
    mockUpdateSectionLayout.mockReset();
  });

  it("should generate default layout when no saved layout", () => {
    const { result } = renderHook(() =>
      useCanvasLayout("section-1", {}, sampleElements as any, mockUpdateSectionLayout)
    );

    const layouts = result.current.currentLayouts;
    expect(layouts.lg.length).toBe(sampleElements.length);
    expect(layouts.lg[0].i).toBe("1");
    expect(mockUpdateSectionLayout).toHaveBeenCalledWith("section-1", layouts.lg);
  });

  it("should validate and adapt layout when activeSection has layout", () => {
    const storedLayout = [
      {
        i: "1",
        x: 0,
        y: 0,
        w: 4,
        h: 2,
      },
    ];

    const activeSection = { layout: storedLayout };

    const { result } = renderHook(() =>
      useCanvasLayout("section-2", activeSection, sampleElements as any, mockUpdateSectionLayout)
    );

    const layouts = result.current.currentLayouts;
    expect(layouts.lg.some((l) => l.i === "2")).toBe(true); // Element 2 debe haber sido agregado
    expect(layouts.lg.length).toBe(3); // Todos los elementos presentes
  });

  it("should handle layout change and update only lg layout", () => {
    const { result } = renderHook(() =>
      useCanvasLayout("section-3", {}, sampleElements as any, mockUpdateSectionLayout)
    );

    const newLayout = [
      {
        i: "1",
        x: 1,
        y: 2,
        w: 4,
        h: 3,
        static: false,
        isDraggable: true,
      },
    ];

    act(() => {
      result.current.handleLayoutChange(newLayout, "lg");
    });

    expect(result.current.currentLayouts.lg[0].x).toBe(1);
    expect(mockUpdateSectionLayout).toHaveBeenCalledWith("section-3", expect.anything());
  });

  it("should not update store if layout is for non-lg breakpoint", () => {
    const { result } = renderHook(() =>
      useCanvasLayout("section-4", {}, sampleElements as any, mockUpdateSectionLayout)
    );

    act(() => {
      result.current.handleLayoutChange(
        [
          {
            i: "1",
            x: 0,
            y: 0,
            w: 4,
            h: 2,
            static: false,
            isDraggable: true,
          },
        ],
        "sm"
      );
    });

    expect(mockUpdateSectionLayout).toHaveBeenCalledTimes(1); // Solo se llama desde el primer render
  });
});
