// components/Editor/CanvasArea.tsx
"use client";

import { useDroppable } from "@dnd-kit/core";
import { useRef, useEffect, useCallback } from "react"; // Importa useRef y useEffect
import { CanvasElement } from "@/types/DragAndDrop.types"; // Importa el tipo CanvasElement
import { CanvasItem } from "./CanvasItem"; // Importa el nuevo componente CanvasItem
import { useCanvasStore } from "@/store/canvasStore";
import { BackgroundCanvas } from "../../background/BackgroundCanvas";

interface CanvasAreaProps {
  // Añade una prop para comunicar sus dimensiones al padre (Home/hook)
  onCanvasRectChange: (rect: DOMRect) => void;
  onCanvasItemResize: (
    itemId: string,
    newWidth: number,
    newHeight: number
  ) => void; // Mantén este nombre para recibir del hook
}

export default function CanvasArea({
  onCanvasRectChange,
  onCanvasItemResize,
}: CanvasAreaProps) {
  // Referencia para el div que es el área droppable real
  const canvasRef = useRef<HTMLDivElement>(null);
  const droppedElements = useCanvasStore((state) => state.canvasElements);
  // Configura el droppable, usando la ref
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas", // El ID del droppable
  });

  // Combina la ref del hook con la ref local
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      // La ref del hook Dnd-kit
      setNodeRef(node);
      // Nuestra ref local para medir
      canvasRef.current = node;
    },
    [setNodeRef]
  ); // setNodeRef es una dependencia estable del hook dnd-kit

  // Usa useEffect para notificar al padre cuando la ref tenga un nodo (el div)
  // Esto le da al hook del padre las dimensiones del canvas
  useEffect(() => {
    if (canvasRef.current) {
      onCanvasRectChange(canvasRef.current.getBoundingClientRect());

      // Opcional: Añadir un ResizeObserver si el tamaño del canvas puede cambiar
      // const observer = new ResizeObserver(entries => {
      //     for (let entry of entries) {
      //         onCanvasRectChange(entry.target.getBoundingClientRect() as DOMRect);
      //     }
      // });
      // observer.observe(canvasRef.current);
      // return () => observer.disconnect(); // Limpiar al desmontar
    }
  }, [onCanvasRectChange]); // Dependencia: la función del padre

  // Feedback visual cuando se arrastra sobre el canvas (lo mismo que antes)
  const dropTargetStyle = {
    borderColor: isOver
      ? "rgba(96, 165, 250, 0.5)"
      : "rgba(255, 255, 255, 0.1)",
    backgroundColor: isOver
      ? "rgba(96, 165, 250, 0.05)"
      : "rgba(161, 161, 170, 0.05)",
  };

  return (
    <main className="relative h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
      {/* Grid de fondo */}
      <BackgroundCanvas />
      {/* Scrollable area */}
      <section className="relative h-full w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <article className="min-h-full min-w-full flex items-center justify-center p-8">
          <div
            ref={combinedRef} // Usa la ref combinada
            style={dropTargetStyle}
            className="relative bg-neutral-900/80 backdrop-blur-sm min-h-[300px] h-auto border-2 border-dashed rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full max-w-4xl p-6"
          >
            {/* Herramientas Flotantes */}
            {/* ... */}

            {droppedElements.map((element) => (
              <CanvasItem
                key={element.id} // Usa el ID único del elemento en canvas
                id={element.id}
                type={element.type}
                label={element.label}
                width={element.width} // <-- Pasa el ancho
                height={element.height}
                onResize={onCanvasItemResize}
                colorClass={element.colorClass}
                x={element.x} // Pasa la posición X del estado
                y={element.y} // Pasa la posición Y del estado
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
