"use client";

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import CanvasArea from "@/components/Editor/CanvasArea";
import { Sidebar } from "@/components/layout/Sidebar";
import { RenderDragOverlayContent } from "@/helpers/RenderDragOverlayContent";

import { useDndCanvas } from "@/hooks/useDndCanvas";

export default function Home() {
  const {
    canvasElements,
    activeItemData,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useDndCanvas();

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    // Pasa los manejadores obtenidos del hook a DndContext
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <CanvasArea droppedElements={canvasElements} />
      <Sidebar />
      <DragOverlay>
        {activeItemData ? RenderDragOverlayContent(activeItemData) : null}
      </DragOverlay>
    </DndContext>
  );
}
