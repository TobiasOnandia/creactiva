import { useElementSelection } from "@/hooks/useElementSelection";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockVibrate = vi.fn();

beforeEach(() => {
  (navigator as any).vibrate = mockVibrate;
  mockVibrate.mockReset();
});

describe("useElementSelection", () => {
  it("should select and deselect elements", () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();

    const { result } = renderHook(() =>
      useElementSelection({ onElementSelect: onSelect, onElementDeselect: onDeselect })
    );

    act(() => {
      result.current.selectElement("element-1");
    });

    expect(result.current.selectedElementId).toBe("element-1");
    expect(onSelect).toHaveBeenCalledWith("element-1");
    expect(mockVibrate).toHaveBeenCalledWith(50);

    act(() => {
      result.current.deselectElement();
    });

    expect(result.current.selectedElementId).toBe(null);
    expect(onDeselect).toHaveBeenCalled();
  });

  it("should return true if element is selected", () => {
    const { result } = renderHook(() => useElementSelection());

    act(() => {
      result.current.selectElement("element-2");
    });

    expect(result.current.isElementSelected("element-2")).toBe(true);
    expect(result.current.isElementSelected("element-3")).toBe(false);
  });

  it("should handle element touch selection", () => {
    const { result } = renderHook(() => useElementSelection());
    const mockEvent = { stopPropagation: vi.fn() } as any;

    act(() => {
      result.current.handleElementTouch("element-4", mockEvent);
    });

    expect(result.current.selectedElementId).toBe("element-4");
  });

  it("should not reselect already selected element on touch", () => {
    const { result } = renderHook(() => useElementSelection());
    const mockEvent = { stopPropagation: vi.fn() } as any;

    act(() => {
      result.current.selectElement("element-5");
    });

    act(() => {
      result.current.handleElementTouch("element-5", mockEvent);
    });

    expect(result.current.selectedElementId).toBe("element-5");
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
});
