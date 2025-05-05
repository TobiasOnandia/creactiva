"use client";

import { useState } from "react";
import CanvasArea from "@/components/Editor/CanvasArea";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay, // Importa DragOverlay
  useSensor, // Importa useSensor
  useSensors, // Importa useSensors
  PointerSensor, // Importa PointerSensor
} from "@dnd-kit/core";
import { TextIcon, ImageIcon, StarIcon } from "lucide-react"; // Importa iconos si los usas en el overlay

// Define un tipo para los elementos en el lienzo (igual que antes)
interface CanvasElement {
  id: string;
  type: string;
  label: string;
  colorClass: string;
}

// Define un tipo para los datos del elemento arrastrado (para el overlay)
interface ActiveDraggableData {
  type: string;
  label: string;
  colorClass: string;
  // ... otras props que pases en DraggableElement data
}

export default function Home() {
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [elementCounter, setElementCounter] = useState(0);

  // Estado para guardar el ID y los datos del elemento que se está arrastrando
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItemData, setActiveItemData] =
    useState<ActiveDraggableData | null>(null);

  // Configura los sensores. PointerSensor es el predeterminado y funciona con ratón y tacto.
  const sensors = useSensors(useSensor(PointerSensor));

  // Función que se ejecuta CUANDO EMPIEZA un arrastre
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    setActiveItemData(event.active.data.current as ActiveDraggableData);
  }

  // Función que se ejecuta CUANDO TERMINA un arrastre
  function handleDragEnd(event: DragEndEvent) {
    // Lógica para añadir elemento al canvas (la misma que antes)
    if (event.over && event.over.id === "canvas") {
      if (activeItemData && activeItemData.type) {
        const newElementId = `canvas-item-${elementCounter}`;
        const newElement: CanvasElement = {
          id: newElementId,
          type: activeItemData.type,
          label: activeItemData.label,
          colorClass: activeItemData.colorClass,
          // ... otras props si las guardaste en CanvasElement
        };
        setCanvasElements((prevElements) => [...prevElements, newElement]);
        setElementCounter((prevCount) => prevCount + 1);
        console.log("Elemento soltado en el canvas:", newElement);
      } else {
        console.warn("Dragged item has no data or type.");
      }
    }

    // Limpia el estado del elemento activo al finalizar el arrastre (éxito o fallo)
    setActiveId(null);
    setActiveItemData(null); // Limpia también los datos del overlay
  }

  // Opcional: Función que se ejecuta si el arrastre es cancelado (ej: tecla ESC)
  function handleDragCancel() {
    console.log("Drag cancelled");
    setActiveId(null);
    setActiveItemData(null); // Limpia también los datos
  }

  // Helper para renderizar la representación visual del elemento arrastrado en el Overlay
  // Puedes hacer esto en un componente separado si es más complejo.
  const renderDragOverlayContent = () => {
    if (!activeItemData) {
      return null;
    }

    // Renderiza una versión simplificada del DraggableElement para el overlay
    return (
      <div
        // No necesita ref, listeners ni attributes de dnd-kit aquí
        className={`p-3 rounded-lg border border-white/10 shadow-xl opacity-90 ${activeItemData.colorClass}`}
        style={{ cursor: "grabbing" }} // Muestra el cursor de "agarrando"
      >
        <div className="flex flex-col items-center gap-2">
          {/* Renderiza un icono o placeholder basado en el tipo */}
          {activeItemData.type === "text" && (
            <TextIcon className="w-6 h-6 text-white/70" />
          )}
          {activeItemData.type === "image" && (
            <ImageIcon className="w-6 h-6 text-white/70" />
          )}
          {activeItemData.type === "star" && (
            <StarIcon className="w-6 h-6 text-white/70" />
          )}
          {/* Placeholder genérico si el tipo no coincide */}
          {!["text", "image", "star"].includes(activeItemData.type) && (
            <div className="w-6 h-6 bg-neutral-700 rounded" />
          )}

          <span className="text-xs text-neutral-300 text-center">
            {activeItemData.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    // Añade los sensores y los manejadores de eventos de drag start/cancel
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel} // Opcional, pero buena práctica
    >
      {/* Pasa el estado canvasElements a CanvasArea */}
      <CanvasArea droppedElements={canvasElements} />
      <Sidebar /> {/* Sidebar sigue siendo la fuente */}
      {/* --- DragOverlay --- */}
      {/* Este componente renderiza el clon del elemento arrastrado */}
      {/* Se coloca DENTRO del DndContext */}
      <DragOverlay>
        {/* Renderiza el contenido del overlay solo si hay un elemento activo */}
        {renderDragOverlayContent()}
      </DragOverlay>
    </DndContext>
  );
}
