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
// Si usas Zustand, puedes importar el store aquí si necesitas algo globalmente
// import { useCanvasStore } from "@/store/canvasStore";

export default function Home() {
  // Obtiene solo lo que el hook devuelve ahora (manejadores y estado activo)
  const {
    activeItemData, // Necesitamos esto para saber si es un item de canvas
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
      {/* Renderiza el DragOverlay SOLO si hay un elemento activo Y NO es un item del canvas */}
      {activeItemData && !activeItemData.type ? (
        <DragOverlay>
          {/* Renderiza el contenido del overlay usando los datos activos */}
          {RenderDragOverlayContent(activeItemData)}
        </DragOverlay>
      ) : null}{" "}
    </DndContext>
  );
}
