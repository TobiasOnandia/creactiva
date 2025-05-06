// app/page.tsx
"use client";

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import CanvasArea from "@/components/editor/canvas/CanvasArea";
import { Sidebar } from "@/components/layout/Sidebar";
import { RenderDragOverlayContent } from "@/helpers/RenderDragOverlayContent";
import { useDndCanvas } from "@/hooks/useDndCanvas";
// Importa el modificador personalizado
import { restrictCanvasItemsModifier } from "@/modifiers/restrictCanvasItemsModifier";

export default function Home() {
  const {
    activeItemData,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleCanvasRectChange, // Esta función la pasamos a CanvasArea
    handleCanvasItemResize,
  } = useDndCanvas();

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    // Pasa el modificador personalizado en el array 'modifiers'
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictCanvasItemsModifier]} // <-- ¡Aplícalo aquí!
    >
      <CanvasArea onCanvasRectChange={handleCanvasRectChange} />

      <Sidebar />

      <DragOverlay>
        {activeItemData ? RenderDragOverlayContent(activeItemData) : null}
      </DragOverlay>
    </DndContext>
  );
}
