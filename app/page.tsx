// app/page.tsx
"use client";

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import { Sidebar } from "@/components/layout/Sidebar";
import { RenderDragOverlayContent } from "@/helpers/RenderDragOverlayContent";
import { useDndCanvas } from "@/hooks/useDndCanvas";
import { restrictCanvasItemsModifier } from "@/modifiers/restrictCanvasItemsModifier";
import CanvasArea from "@/components/editor/canvas/CanvasArea";

export default function Home() {
  // Obtiene solo lo que el hook devuelve ahora (manejadores y estado activo)
  const {
    activeItemData,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleCanvasRectChange,
  } = useDndCanvas();

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictCanvasItemsModifier]}
    >
      <CanvasArea onCanvasRectChange={handleCanvasRectChange} />
      <Sidebar />
      {/* --- DragOverlay --- */}
      {activeItemData && activeItemData.isCanvasItem === undefined ? (
        <DragOverlay>{RenderDragOverlayContent(activeItemData)}</DragOverlay>
      ) : null}
    </DndContext>
  );
}
