// useCanvasLayout.ts (versión mejorada)

import { useState, useEffect, useCallback } from "react";
import { GridLayout } from "@/types/canvas/LayoutTypes";
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { GRID_CONFIG } from "@/config";

const breakpoints = ["lg", "md", "sm", "xs", "xxs"] as const;

export function useCanvasLayout(
  activeSectionId: string,
  activeSection: any,
  canvasElements: CanvasElement[],
  updateSectionLayout: (id: string, layout: GridLayout[]) => void
) {
  const [currentLayouts, setCurrentLayouts] = useState<Record<string, GridLayout[]>>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  });

  const generateDefaultLayout = useCallback(
    (elements: CanvasElement[], breakpoint: string): GridLayout[] => {
      const cols = GRID_CONFIG.cols[breakpoint as keyof typeof GRID_CONFIG.cols] || GRID_CONFIG.cols.lg;
      const itemWidth = ["xs", "xxs"].includes(breakpoint)
        ? cols
        : Math.min(GRID_CONFIG.defaultSize.w, cols);

      return elements.map((element, index) => ({
        i: element.id,
        x: (index * itemWidth) % cols,
        y: Math.floor((index * itemWidth) / cols) * GRID_CONFIG.defaultSize.h,
        w: itemWidth,
        h: GRID_CONFIG.defaultSize.h,
        minH: GRID_CONFIG.minSize.h,
        minW: GRID_CONFIG.minSize.w,
        static: false,
        isDraggable: true,
      }));
    },
    []
  );

  const validateLayout = useCallback((layout: GridLayout[], elements: CanvasElement[]) => {
    const ids = new Set(elements.map((e) => e.id));
    return layout.filter((item) => ids.has(item.i));
  }, []);

  const createLayoutForNewElements = useCallback(
    (existingLayout: GridLayout[], elements: CanvasElement[], breakpoint: string): GridLayout[] => {
      const cols = GRID_CONFIG.cols[breakpoint as keyof typeof GRID_CONFIG.cols] || GRID_CONFIG.cols.lg;
      const itemWidth = ["xs", "xxs"].includes(breakpoint)
        ? cols
        : Math.min(GRID_CONFIG.defaultSize.w, cols);

      const existingIds = new Set(existingLayout.map((item) => item.i));
      const newElements = elements.filter((e) => !existingIds.has(e.id));

      return newElements.map((element, index) => ({
        i: element.id,
        x: ((existingLayout.length + index) * itemWidth) % cols,
        y: Math.floor((existingLayout.length + index) / cols) * GRID_CONFIG.defaultSize.h,
        w: itemWidth,
        h: GRID_CONFIG.defaultSize.h,
        minH: GRID_CONFIG.minSize.h,
        minW: GRID_CONFIG.minSize.w,
        static: false,
        isDraggable: true,
      }));
    },
    []
  );

  const adaptLayoutToBreakpoint = useCallback(
    (layout: GridLayout[], from: string, to: string): GridLayout[] => {
      const fromCols = GRID_CONFIG.cols[from as keyof typeof GRID_CONFIG.cols];
      const toCols = GRID_CONFIG.cols[to as keyof typeof GRID_CONFIG.cols];

      return layout.map((item) => {
        if (toCols < fromCols) {
          return { ...item, x: 0, w: toCols };
        }
        return {
          ...item,
          w: Math.min(item.w, toCols),
          x: Math.min(item.x, toCols - item.w),
        };
      });
    },
    []
  );

  useEffect(() => {
    if (!activeSection) return;

    let newLayouts: Record<string, GridLayout[]> = {
      lg: [],
      md: [],
      sm: [],
      xs: [],
      xxs: [],
    };

    if (activeSection.layout?.length > 0) {
      const base = validateLayout(activeSection.layout, canvasElements);
      const added = createLayoutForNewElements(base, canvasElements, "lg");
      const lgLayout = [...base, ...added];

      newLayouts.lg = lgLayout;
      for (const bp of breakpoints.filter((b) => b !== "lg")) {
        newLayouts[bp] = adaptLayoutToBreakpoint(lgLayout, "lg", bp);
      }
    } else {
      for (const bp of breakpoints) {
        newLayouts[bp] = generateDefaultLayout(canvasElements, bp);
      }
    }

    setCurrentLayouts(newLayouts);
    updateSectionLayout(activeSectionId, newLayouts.lg);
  }, [activeSection?.id, canvasElements, updateSectionLayout]);

  const handleLayoutChange = useCallback(
    (newLayout: GridLayout[], breakpoint: string = "lg") => {
      const updated = newLayout.map((item) => ({
        ...item,
        static: item.static ?? false,
        isDraggable: item.isDraggable ?? true,
        minH: item.minH ?? GRID_CONFIG.minSize.h,
        minW: item.minW ?? GRID_CONFIG.minSize.w,
      }));

      setCurrentLayouts((prev) => ({ ...prev, [breakpoint]: updated }));

      if (breakpoint === "lg") {
        updateSectionLayout(activeSectionId, updated);
      }
    },
    [activeSectionId, updateSectionLayout]
  );

  return {
    currentLayouts,
    setCurrentLayouts,
    handleLayoutChange,
  };
}
