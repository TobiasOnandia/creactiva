// components/Editor/CanvasItem.tsx
import { useDraggable } from "@dnd-kit/core";
// Importa el modificador para restringir al elemento padre
import { StarIcon } from "lucide-react"; // Importa iconos para placeholders
import { Resizable, ResizeCallback } from "re-resizable";

interface CanvasItemProps {
  id: string; // ID único de este elemento en el canvas
  type: string;
  label: string;
  colorClass: string; // Puedes usarla para algo visual en el item del canvas
  x: number; // Posición X inicial (controlada por el estado del padre)
  y: number; // Posición Y inicial (controlada por el estado del padre)
  canvasId: string;
  width: number;
  height: number;
  onResize: (itemId: string, newWidth: number, newHeight: number) => void;

  // textContent?: string;
  // imageUrl?: string;
}

export const CanvasItem = ({
  id,
  type,
  label,
  colorClass,
  x,
  y,
  canvasId,
  width,
  height,
  onResize,
}: CanvasItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id, // Usa el ID único del elemento en el canvas
      data: {
        type: type,
        label: label,
        // Pasa otros datos necesarios si el item del canvas necesita ser identificado al arrastrar
        isCanvasItem: true, // Un flag útil para saber en handleDragEnd si es un item del canvas
      },
    });

  // El estilo combina la posición inicial (x, y) con la transformación de dnd-kit durante el arrastre
  const style = {
    position: "absolute" as "absolute", // Los elementos en canvas suelen ser absolutos para free-form
    left: x,
    top: y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    // Asegura que el elemento arrastrado esté por encima de otros elementos no arrastrados
    zIndex: isDragging ? 1000 : 1, // Z-index alto mientras se arrastra, normal cuando no
    // Añade otros estilos básicos si quieres que se parezcan a los del sidebar, pero en canvas
    padding: "12px", // p-3
    borderRadius: "8px", // rounded-lg
    border: `1px solid rgba(255, 255, 255, 0.1)`, // border border-white/10
    backgroundColor: "rgba(38, 38, 38, 0.8)", // bg-neutral-800/80
    color: "rgba(212, 212, 212, 0.8)", // text-neutral-300/80
    cursor: isDragging ? "grabbing" : "grab", // Cursor
  };

  const handleResize = (
    event: MouseEvent | TouchEvent,
    direction: any, // Tipo interno de re-resizable
    refToElement: HTMLElement, // Referencia al elemento DOM con el tamaño actual
    delta: { width: number; height: number } // Delta del cambio de tamaño
  ) => {
    // Obtenemos el tamaño actual del elemento DOM interno que Resizable gestiona (y que es el mismo que dnd-kit mueve)
    const currentWidth = refToElement.offsetWidth;
    const currentHeight = refToElement.offsetHeight;

    // Llamamos al manejador del padre para ACTUALIZAR el estado en tiempo real
    onResize(id, currentWidth, currentHeight); // <-- Llama a la prop 'onResize'
  };

  const handleResizeStop = (
    event: MouseEvent | TouchEvent,
    direction: any,
    refToElement: HTMLElement,
    delta: { width: number; height: number }
  ) => {
    // Llamamos al mismo manejador para asegurarnos de que el tamaño final se registre
    handleResize(event, direction, refToElement, delta);
    // Opcional: Aquí podrías añadir lógica extra que solo se ejecuta al soltar (ej: guardar en DB)
    // console.log(`Resize stopped for ${id}`);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement; // --- ¡CRÍTICO! Buscar la clase personalizada 'dnd-cancel-handle' --- // Asegúrate de que esta clase se aplica a TODOS los handles habilitados en handleClasses
    if (target.closest(".dnd-cancel-handle")) {
      event.stopPropagation(); // <--- ¡Detener la propagación si es un handle! // Opcional: log para depurar si se detuvo la propagación // console.log("Stopped propagation for resize handle click.");
    } // Si el clic no fue en un handle, el evento continúa y dnd-kit lo verá.
  };

  // Renderiza el contenido del elemento basándose en su tipo
  const renderContent = () => {
    // Esto es similar a lo que hacías en RenderDragOverlayContent, pero aquí es el contenido real del item en canvas
    switch (type) {
      case "text":
      case "header":
      case "paragraph":
        return (
          <p className="text-neutral-200">Contenido de Texto (Editable?)</p>
        ); // Podría ser un <textarea> o div contenteditable
      case "image":
        return (
          <div className="w-24 h-16 bg-neutral-700 flex items-center justify-center text-neutral-400">
            Imagen
          </div>
        ); // <img src={imageUrl} />
      case "button":
        return (
          <button
            className={`px-3 py-1 rounded text-white ${colorClass.replace(
              "/10",
              ""
            )}`}
          >
            Botón
          </button>
        ); // Usa colorClass para el color de fondo
      case "divider":
        return (
          <div className="w-full h-1 bg-neutral-700 rounded-full my-2"></div>
        ); // Un separador
      case "star":
        return <StarIcon className="w-6 h-6 text-yellow-500" />;
      // Añade más casos para otros tipos (video, select, checkbox, etc.)
      default:
        return (
          <div className="text-sm">
            Item: {label} ({type})
          </div>
        ); // Fallback
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown} // Importante para dispositivos táctiles
      {...listeners} // Event listeners para el arrastre
      style={style} // Aplica posición y transformación
      // Clases adicionales si las necesitas
      className="select-none  " // Evita seleccionar texto mientras arrastras
    >
      <Resizable
        size={{ width, height }} // Le decimos a Resizable el tamaño actual del estado
        onResize={handleResize} // Llama handleResize DURANTE el arrastre
        onResizeStop={handleResizeStop} // Llama handleResizeStop al soltar
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
        // --- re-resizable añade la clase 'resize-handle' por defecto ---
        handleClasses={{
          bottomRight: "resize-handle dnd-cancel-handle", // <-- Clase personalizada
          right: "resize-handle dnd-cancel-handle", // <-- Añádela aquí
          bottom: "resize-handle dnd-cancel-handle", // <-- Añádela aquí
          // Asegúrate de añadirla a cualquier otro handle que habilites en 'enable'
          // ej: topLeft: "resize-handle dnd-cancel-handle",
        }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {renderContent()} {/* Renderiza el contenido basado en el tipo */}
      </Resizable>
    </div>
  );
};
