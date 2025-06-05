import { useCallback } from "react";
import { GridLayout } from "@/types/canvas/LayoutTypes";
import { templateConfigs } from "@/config/templateConfigs";
import { GRID_CONFIG } from "@/config";
import { ElementFactory } from "@/components/factories/elementFactory";

export function useDragAndDrop(
  activeSectionId: string,
  currentLayout: GridLayout[],
  setCurrentLayout: (layout: GridLayout[]) => void,
  addElementToSection: (element: any, sectionId: string) => void,
  updateSectionLayout: (id: string, layout: GridLayout[]) => void
) {
  const handleTemplateDropDrop = useCallback((
    templateConfig: any,
    item: GridLayout
  ) => {
    const elementsWithNewIds = templateConfig.elements.map((element: any) => ({
      ...element,
      id: crypto.randomUUID()
    }));

    const layoutsWithNewIds = templateConfig.layout.map((layout: any, index: number) => ({
      ...layout,
      i: elementsWithNewIds[index].id,
      x: item.x,
      y: item.y + index * 2,
      minH: layout.minH || GRID_CONFIG.minSize.h,
      minW: layout.minW || GRID_CONFIG.minSize.w,
      static: false,
      isDraggable: true
    }));

    elementsWithNewIds.forEach((element: any) => {
      addElementToSection(element, activeSectionId);
    });
    
    const updatedLayout = [...currentLayout, ...layoutsWithNewIds];
    setCurrentLayout(updatedLayout);
    updateSectionLayout(activeSectionId, updatedLayout);
  }, [activeSectionId, currentLayout, setCurrentLayout, addElementToSection, updateSectionLayout]);

  const handleSingleElementDrop = useCallback((
    elementType: string,
    item: GridLayout
  ) => {
    const newCanvasElement = ElementFactory.createElement(elementType);
    
    const newLayoutItem: GridLayout = {
      i: newCanvasElement.id,
      x: item.x,
      y: item.y,
      w: GRID_CONFIG.defaultSize.w,
      h: GRID_CONFIG.defaultSize.h,
      minH: GRID_CONFIG.minSize.h,
      minW: GRID_CONFIG.minSize.w,
      static: false,
      isDraggable: true,
    };
    
    addElementToSection(newCanvasElement, activeSectionId);
    const updatedLayout = [...currentLayout, newLayoutItem];
    setCurrentLayout(updatedLayout);
    updateSectionLayout(activeSectionId, updatedLayout);
  }, [activeSectionId, currentLayout, setCurrentLayout, addElementToSection, updateSectionLayout]);

  const handleDrop = useCallback((layout: GridLayout[], item: GridLayout, e: Event) => {
    const dragEvent = e as unknown as DragEvent;
    const droppedElementType = dragEvent.dataTransfer?.getData("text/plain");

    if (!droppedElementType) {
      console.error("No element type data found in drag event");
      return;
    }

    const templateConfig = templateConfigs[droppedElementType];
    
    if (templateConfig) {
      handleTemplateDropDrop(templateConfig, item);
    } else {
      handleSingleElementDrop(droppedElementType, item);
    }
  }, [handleTemplateDropDrop, handleSingleElementDrop]);

  return { handleDrop };
}