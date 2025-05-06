"use client";

import { useDroppable } from "@dnd-kit/core";
import { useRef, useEffect, useCallback } from "react";
import { CanvasItem } from "@/components/editor/canvas/CanvasItem";
import { useCanvasStore } from "@/store/canvasStore";
import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";

interface CanvasAreaProps {
  onCanvasRectChange: (rect: DOMRect) => void;
}

export default function CanvasArea({ onCanvasRectChange }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const droppedElements = useCanvasStore((state) => state.canvasElements);
  const updateElementSize = useCanvasStore((state) => state.updateElementSize);
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas", // El ID del droppable
  });

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      canvasRef.current = node;
    },
    [setNodeRef]
  ); // setNodeRef es una dependencia estable del hook dnd-kit

  useEffect(() => {
    if (canvasRef.current) {
      onCanvasRectChange(canvasRef.current.getBoundingClientRect());
    }
  }, [onCanvasRectChange]);

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
            className="relative bg-neutral-900/80 backdrop-blur-sm min-h-[768px] h-auto border-2 border-dashed rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full max-w-4xl p-6"
          >
            {droppedElements.map((element) => (
              <CanvasItem
                key={element.id} // Usa el ID único del elemento en canvas
                element={element}
                onResize={updateElementSize}
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
