import { useState, useEffect, useCallback } from "react";
import { GridLayout } from "@/types/canvas/LayoutTypes";
import { CanvasElement } from "@/types/canvas/CanvasTypes";
import { GRID_CONFIG } from "@/config";

export function useCanvasLayout(
  activeSectionId: string,
  activeSection: any,
  canvasElements: CanvasElement[],
  updateSectionLayout: (id: string, layout: GridLayout[]) => void
) {
  const [currentLayout, setCurrentLayout] = useState<GridLayout[]>([]);

  const generateDefaultLayout = useCallback((elements: CanvasElement[]): GridLayout[] => {
    return elements.map((element, index) => ({
      i: element.id,
      x: (index * GRID_CONFIG.defaultSize.w) % GRID_CONFIG.cols.lg,
      y: Math.floor(index / 3) * GRID_CONFIG.defaultSize.h,
      w: GRID_CONFIG.defaultSize.w,
      h: GRID_CONFIG.defaultSize.h,
      minH: GRID_CONFIG.minSize.h,
      minW: GRID_CONFIG.minSize.w,
      static: false,
      isDraggable: true,
    }));
  }, []);

  const validateLayout = useCallback((layout: GridLayout[], elements: CanvasElement[]): GridLayout[] => {
    return layout.filter(layoutItem => 
      elements.some(element => element.id === layoutItem.i)
    );
  }, []);

  const createLayoutForNewElements = useCallback((
    existingLayout: GridLayout[], 
    elements: CanvasElement[]
  ): GridLayout[] => {
    return elements
      .filter(element => !existingLayout.some(layout => layout.i === element.id))
      .map((element, index) => ({
        i: element.id,
        x: (existingLayout.length + index) * GRID_CONFIG.defaultSize.w % GRID_CONFIG.cols.lg,
        y: Math.floor((existingLayout.length + index) / 3) * GRID_CONFIG.defaultSize.h,
        w: GRID_CONFIG.defaultSize.w,
        h: GRID_CONFIG.defaultSize.h,
        minH: GRID_CONFIG.minSize.h,
        minW: GRID_CONFIG.minSize.w,
        static: false,
        isDraggable: true,
      }));
  }, []);

  useEffect(() => {
    if (!activeSection) return;

    let newLayout: GridLayout[] = [];

    if (activeSection.layout?.length > 0) {
      const validLayout = validateLayout(activeSection.layout, canvasElements);
      const newElementLayouts = createLayoutForNewElements(validLayout, canvasElements);
      newLayout = [...validLayout, ...newElementLayouts];
    } else if (canvasElements.length > 0) {
      newLayout = generateDefaultLayout(canvasElements);
    }

    setCurrentLayout(newLayout);
    updateSectionLayout(activeSectionId, newLayout);
  }, [activeSection?.id, canvasElements.length, activeSectionId, validateLayout, createLayoutForNewElements, generateDefaultLayout, updateSectionLayout]);

  const handleLayoutChange = useCallback((newLayout: GridLayout[]) => {
    const validatedLayout = newLayout.map(item => ({
      ...item,
      static: item.static || false,
      isDraggable: item.isDraggable !== false,
      minH: item.minH || GRID_CONFIG.minSize.h,
      minW: item.minW || GRID_CONFIG.minSize.w
    }));
    
    setCurrentLayout(validatedLayout);
    updateSectionLayout(activeSectionId, validatedLayout);
  }, [activeSectionId, updateSectionLayout]);

  return {
    currentLayout,
    setCurrentLayout,
    handleLayoutChange,
  };
}
