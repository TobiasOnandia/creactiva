// components/Editor/CanvasItem.tsx
import { useDraggable } from "@dnd-kit/core";
import { Resizable } from "re-resizable";
import { CanvasItemProps } from "@/types/DragAndDrop.types";
import { CanvasItemContent } from "@/components/editor/content/CanvasItemContent";
import { useState } from "react";
import { GripVertical, Hand } from "lucide-react";

export const CanvasItem = ({ element, onResize }: CanvasItemProps) => {
  const { id, type, label, colorClass, x, y, width, height } = element;
  const [isResizing, setIsResizing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id, // Usa el ID único del elemento en el canvas
      data: {
        type: type,
        label: label,
        isCanvasItem: true,
      },
      disabled: isResizing,
    });

  const style = {
    position: "absolute" as "absolute",
    left: x,
    top: y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : 1,
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    backgroundColor: "rgba(38, 38, 38, 0.8)",
    color: "rgba(212, 212, 212, 0.8)",
    cursor: isDragging ? "grabbing" : "grab", // Cursor para arrastrar
    overflow: "hidden", // Evita que el contenido se desborde si se redimensiona a un tamaño pequeño
  };

  // --- Manejador para el evento onResize de re-resizable ---
  const handleResize = (
    event: MouseEvent | TouchEvent,
    direction: any,
    refToElement: HTMLElement,
    delta: { width: number; height: number }
  ) => {
    const currentWidth = refToElement.offsetWidth;
    const currentHeight = refToElement.offsetHeight;
    onResize(id, currentWidth, currentHeight); // Llama a la prop 'onResize'
  };

  // --- Manejador para el evento onResizeStop de re-resizable ---
  const handleResizeStop = (
    event: MouseEvent | TouchEvent,
    direction: any,
    refToElement: HTMLElement,
    delta: { width: number; height: number }
  ) => {
    handleResize(event, direction, refToElement, delta);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;
    if (target.closest(".dnd-cancel-handle")) {
      event.stopPropagation(); // Detener la propagación si es un handle de resize
    }
  };

  return (
    // --- Este es el div principal que usa dnd-kit y tiene el tamaño del estado ---
    // Le aplicamos la referencia de dnd-kit, atributos, listeners, y nuestro manejador onMouseDown
    <div
      ref={setNodeRef} // <-- Referencia para el hook Draggable AQUÍ
      {...attributes} // <-- Atributos de dnd-kit AQUÍ
      onMouseDown={handleMouseDown} // Manejador para evitar arrastre en handles
      onTouchStart={handleMouseDown} // Importante para dispositivos táctiles
      style={style} // <-- Aplica posición Y TAMAÑO AQUÍ
      className="select-none" // Evita seleccionar texto
    >
      {/* --- Resizable envuelve el contenido --- */}
      {/* Resizable necesita conocer el tamaño, pero su función es añadir handles y reportar cambios */}
      <Resizable
        size={{ width, height }} // Le decimos a Resizable el tamaño CONCETUAL del estado
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={(e, dir, ref, delta) => {
          setIsResizing(false);
          onResize(id, ref.offsetWidth, ref.offsetHeight);
        }} // Llama handleResizeStop al soltar
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        minWidth={20} // Opcional: tamaño mínimo
        minHeight={20} // Opcional: tamaño mínimo
        lockAspectRatio={true} // Si quieres mantener la proporción
        handleClasses={{
          bottomRight: "resize-handle dnd-cancel-handle", // <-- Clase personalizada
          right: "resize-handle dnd-cancel-handle", // <-- Añádela aquí
          bottom: "resize-handle dnd-cancel-handle", // <-- Añádela aquí
        }}
        data-no-dnd="true"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab absolute top-0 left-0 p-1 h-full w-full"
          title="Arrastrar"
        ></div>
        <CanvasItemContent type={type} label={label} colorClass={colorClass} />
      </Resizable>
    </div>
  );
};
