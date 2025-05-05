import { useState, useCallback } from "react"; // Importa useCallback
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { ActiveDraggableData, CanvasElement } from "@/types/DragAndDrop.types";

interface UseDndCanvasReturn {
  canvasElements: CanvasElement[];
  activeId: string | null;
  activeItemData: ActiveDraggableData | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
}

export const useDndCanvas = (): UseDndCanvasReturn => {
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [elementCounter, setElementCounter] = useState(0);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItemData, setActiveItemData] =
    useState<ActiveDraggableData | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveItemData(
      event.active?.data?.current as ActiveDraggableData | null
    );
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (event.over && event.over.id === "canvas") {
        if (
          activeItemData &&
          typeof activeItemData.type === "string" &&
          activeItemData.type !== ""
        ) {
          const newElementId = `canvas-item-${elementCounter}`;
          const newElement: CanvasElement = {
            id: newElementId,
            type: activeItemData.type,
            label: activeItemData.label,
            colorClass: activeItemData.colorClass,
          };
          setCanvasElements((prevElements) => [...prevElements, newElement]);
          setElementCounter((prevCount) => prevCount + 1);
        } else {
          console.log(
            "No se pudo crear el elemento en el canvas. activeItemData es inválido o falta type:",
            activeItemData
          );
        }
      } else {
        console.log("Drag ended, but not over the canvas droppable.");
      }

      setActiveId(null);
      setActiveItemData(null);
    },
    [activeItemData, elementCounter]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setActiveItemData(null);
  }, []);

  return {
    canvasElements,
    activeId,
    activeItemData,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
