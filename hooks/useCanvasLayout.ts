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
  const [currentLayouts, setCurrentLayouts] = useState<{
    lg: GridLayout[];
    md: GridLayout[];
    sm: GridLayout[];
    xs: GridLayout[];
    xxs: GridLayout[];
  }>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: []
  });

  const generateDefaultLayout = useCallback((elements: CanvasElement[], breakpoint: string = 'lg'): GridLayout[] => {
    const cols = GRID_CONFIG.cols[breakpoint as keyof typeof GRID_CONFIG.cols] || GRID_CONFIG.cols.lg;
    const itemWidth = breakpoint === 'xs' || breakpoint === 'xxs' ? cols : Math.min(GRID_CONFIG.defaultSize.w, cols);
    
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
  }, []);

  const validateLayout = useCallback((layout: GridLayout[], elements: CanvasElement[]): GridLayout[] => {
    return layout.filter(layoutItem => 
      elements.some(element => element.id === layoutItem.i)
    );
  }, []);

  const createLayoutForNewElements = useCallback((
    existingLayout: GridLayout[], 
    elements: CanvasElement[],
    breakpoint: string = 'lg'
  ): GridLayout[] => {
    const cols = GRID_CONFIG.cols[breakpoint as keyof typeof GRID_CONFIG.cols] || GRID_CONFIG.cols.lg;
    const itemWidth = breakpoint === 'xs' || breakpoint === 'xxs' ? cols : Math.min(GRID_CONFIG.defaultSize.w, cols);
    
    return elements
      .filter(element => !existingLayout.some(layout => layout.i === element.id))
      .map((element, index) => ({
        i: element.id,
        x: (existingLayout.length + index) * itemWidth % cols,
        y: Math.floor((existingLayout.length + index) / cols) * GRID_CONFIG.defaultSize.h,
        w: itemWidth,
        h: GRID_CONFIG.defaultSize.h,
        minH: GRID_CONFIG.minSize.h,
        minW: GRID_CONFIG.minSize.w,
        static: false,
        isDraggable: true,
      }));
  }, []);

  const generateLayoutsForAllBreakpoints = useCallback((elements: CanvasElement[]) => {
    const breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];
    const layouts: any = {};
    
    breakpoints.forEach(breakpoint => {
      layouts[breakpoint] = generateDefaultLayout(elements, breakpoint);
    });
    
    return layouts;
  }, [generateDefaultLayout]);

  const adaptLayoutToBreakpoint = useCallback((
    layout: GridLayout[], 
    fromBreakpoint: string, 
    toBreakpoint: string
  ): GridLayout[] => {
    const fromCols = GRID_CONFIG.cols[fromBreakpoint as keyof typeof GRID_CONFIG.cols];
    const toCols = GRID_CONFIG.cols[toBreakpoint as keyof typeof GRID_CONFIG.cols];
    
    if (fromCols === toCols) return layout;
    
    return layout.map(item => {
      // Para breakpoints más pequeños, ajustar el ancho para que ocupe toda la fila
      if (toCols < fromCols) {
        return {
          ...item,
          x: 0,
          w: toCols,
        };
      }
      
      // Para breakpoints más grandes, restaurar el ancho original pero asegurar que quepa
      return {
        ...item,
        w: Math.min(item.w, toCols),
        x: Math.min(item.x, toCols - item.w),
      };
    });
  }, []);

  useEffect(() => {
    if (!activeSection) return;

    let newLayouts: any = {
      lg: [],
      md: [],
      sm: [],
      xs: [],
      xxs: []
    };

    if (activeSection.layout?.length > 0) {
      // Usar el layout guardado como base para 'lg'
      const validLayout = validateLayout(activeSection.layout, canvasElements);
      const newElementLayouts = createLayoutForNewElements(validLayout, canvasElements, 'lg');
      const baseLgLayout = [...validLayout, ...newElementLayouts];
      
      // Generar layouts para cada breakpoint basado en el layout de 'lg'
      newLayouts.lg = baseLgLayout;
      newLayouts.md = adaptLayoutToBreakpoint(baseLgLayout, 'lg', 'md');
      newLayouts.sm = adaptLayoutToBreakpoint(baseLgLayout, 'lg', 'sm');
      newLayouts.xs = adaptLayoutToBreakpoint(baseLgLayout, 'lg', 'xs');
      newLayouts.xxs = adaptLayoutToBreakpoint(baseLgLayout, 'lg', 'xxs');
    } else if (canvasElements.length > 0) {
      newLayouts = generateLayoutsForAllBreakpoints(canvasElements);
    }

    setCurrentLayouts(newLayouts);
    updateSectionLayout(activeSectionId, newLayouts.lg);
  }, [
    activeSection?.id, 
    canvasElements.length, 
    activeSectionId, 
    validateLayout, 
    createLayoutForNewElements, 
    generateLayoutsForAllBreakpoints, 
    adaptLayoutToBreakpoint,
    updateSectionLayout
  ]);

  const handleLayoutChange = useCallback((newLayout: GridLayout[], breakpoint: string = 'lg') => {
    const validatedLayout = newLayout.map(item => ({
      ...item,
      static: item.static || false,
      isDraggable: item.isDraggable !== false,
      minH: item.minH || GRID_CONFIG.minSize.h,
      minW: item.minW || GRID_CONFIG.minSize.w
    }));
    
    // Actualizar solo el layout del breakpoint específico
    setCurrentLayouts(prev => ({
      ...prev,
      [breakpoint]: validatedLayout
    }));
    
    // Solo actualizar el store si es el breakpoint principal (lg)
    if (breakpoint === 'lg') {
      updateSectionLayout(activeSectionId, validatedLayout);
    }
  }, [activeSectionId, updateSectionLayout]);

  return {
    currentLayouts,
    setCurrentLayouts,
    handleLayoutChange,
  };
}