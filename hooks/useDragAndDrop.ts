import { useCallback } from "react";
import { GridLayout } from "@/types/canvas/LayoutTypes";
import { templateConfigs } from "@/config/templateConfigs";
import { GRID_CONFIG } from "@/config";
import { ElementFactory } from "@/components/factories/elementFactory";
import { useCanvasStore } from "@/store/canvasStore";
import { ELEMENT_TYPE_CONFIG } from "@/config/elementConfig";
import { ElementType } from "@/types/canvas/CanvasTypes";

export function useDragAndDrop(
  currentLayout: GridLayout[],
  setCurrentLayout: (layout: GridLayout[]) => void,
) {
  const addElementToSection = useCanvasStore(state => state.addElementToSection)
  const updateSectionLayout = useCanvasStore(state => state.updateSectionLayout)
  const activeSectionId = useCanvasStore(state => state.activeSectionId)


  const createLayoutItem = useCallback((
    elementId: string,
    x: number,
    y: number,
    customProps: Partial<GridLayout> = {}
  ): GridLayout => ({
    i: elementId,
    x,
    y,
    w: GRID_CONFIG.defaultSize.w,
    h: GRID_CONFIG.defaultSize.h,
    minH: GRID_CONFIG.minSize.h,
    minW: GRID_CONFIG.minSize.w,
    static: false,
    isDraggable: true,
    ...customProps
  }), []);

  const updateLayoutAndStore = useCallback((newLayoutItems: GridLayout[]) => {
    const updatedLayout = [...currentLayout, ...newLayoutItems];
    setCurrentLayout(updatedLayout);
    updateSectionLayout(activeSectionId, updatedLayout);
  }, [currentLayout, setCurrentLayout, updateSectionLayout, activeSectionId]);

  const handleTemplateDropDrop = useCallback((
    templateConfig: any,
    item: GridLayout
  ) => {
    const elementsWithNewIds = templateConfig.elements.map((element: any) => ({
      ...element,
      id: crypto.randomUUID()
    }));

    const layoutsWithNewIds = templateConfig.layout.map((layout: any, index: number) => 
      createLayoutItem(
        elementsWithNewIds[index].id,
        item.x,
        item.y + index * 2,
        {
          w: layout.w || GRID_CONFIG.defaultSize.w,
          h: layout.h || GRID_CONFIG.defaultSize.h,
          minH: layout.minH || GRID_CONFIG.minSize.h,
          minW: layout.minW || GRID_CONFIG.minSize.w,
        }
      )
    );

    elementsWithNewIds.forEach((element: any) => {
      addElementToSection(element, activeSectionId);
    });

    updateLayoutAndStore(layoutsWithNewIds);
  }, [activeSectionId, addElementToSection, createLayoutItem, updateLayoutAndStore]);

  const handleSingleElementDrop = useCallback((
    elementType: ElementType,
    item: GridLayout
  ) => {
    const newCanvasElement = ElementFactory.createElement(elementType);
    
    const defaultSize = ELEMENT_TYPE_CONFIG[elementType] || GRID_CONFIG.defaultSize;

    const newLayoutItem = createLayoutItem(
      newCanvasElement.id,
      item.x,
      item.y,
      { w: defaultSize.w, h: defaultSize.h }
    );

    addElementToSection(newCanvasElement, activeSectionId);
    updateLayoutAndStore([newLayoutItem]);
  }, [activeSectionId, addElementToSection, createLayoutItem, updateLayoutAndStore]);

  const handleDrop = useCallback((
    layout: GridLayout[], 
    item: GridLayout, 
    e: Event
  ) => {
    const dragEvent = e as unknown as DragEvent;
    const droppedElementType = dragEvent.dataTransfer?.getData("text/plain") as ElementType;
    
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

  return { 
    handleDrop,
  };
}