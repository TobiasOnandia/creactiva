// helpers/RenderDragOverlayContent.ts
import {
  ImageIcon,
  VideoIcon,
  StarIcon, // Asegúrate de importar todos los iconos que uses
} from "lucide-react"; // Importa todos los iconos necesarios
import { ActiveDraggableData } from "@/types/DragAndDrop.types"; // Importa el tipo

export const RenderDragOverlayContent = (
  activeItemData: ActiveDraggableData | null // Acepta null por seguridad
) => {
  // Si no hay datos activos, no renderizar nada
  if (!activeItemData) {
    return null;
  }

  // Estilos base para el contenedor del overlay
  const baseStyle = {
    cursor: "grabbing", // Muestra el cursor de "agarrando"
    // Puedes añadir un tamaño por defecto si quieres que el overlay tenga una dimensión inicial
    // width: '150px',
    // height: '100px',
  };

  // Renderiza una representación visual del elemento arrastrado basada en su tipo
  const renderOverlayContent = () => {
    switch (activeItemData.type) {
      case "header":
        return (
          <div className="w-full h-full flex items-center px-2 py-1">
            <h3 className="text-neutral-100 text-sm font-semibold truncate">
              Encabezado
            </h3>
          </div>
        );
      case "text":
      case "paragraph":
        return (
          <div className="w-full h-full flex flex-col justify-center space-y-1 px-2 py-1">
            <div className="w-11/12 h-1.5 bg-neutral-600 rounded-full"></div>
            <div className="w-full h-1.5 bg-neutral-600 rounded-full"></div>
            <div className="w-10/12 h-1.5 bg-neutral-600 rounded-full"></div>
          </div>
        );
      case "image":
        return (
          <div className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded">
            <ImageIcon className="w-5 h-5 mb-1" />
            <span>Imagen</span>
          </div>
        );
      case "button":
        return (
          <div className="w-full h-full flex items-center justify-center p-1">
            <button
              className={`px-3 py-1 rounded text-white text-xs font-medium ${activeItemData.colorClass.replace(
                "/10",
                ""
              )}`}
              style={{ pointerEvents: "none" }} // Asegura que el clic en el overlay no active nada
            >
              Botón
            </button>
          </div>
        );
      case "divider":
        return (
          <div className="w-full h-full flex items-center px-1">
            <div className="w-full h-0.5 bg-neutral-600 rounded-full"></div>
          </div>
        );
      case "star":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <StarIcon className="w-5 h-5 text-yellow-500" />
          </div>
        );
      case "video":
        return (
          <div className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded">
            <VideoIcon className="w-5 h-5 mb-1" />
            <span>Video</span>
          </div>
        );
      case "gallery":
        return (
          <div className="w-full h-full bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 rounded">
            <div className="bg-neutral-600 rounded"></div>
            <div className="bg-neutral-600 rounded"></div>
            <div className="bg-neutral-600 rounded"></div>
            <div className="bg-neutral-600 rounded"></div>
          </div>
        );
      case "carousel":
        return (
          <div className="w-full h-full bg-neutral-700 flex items-center justify-between px-1 rounded">
            <div className="w-3 h-3 bg-neutral-600 rounded-full"></div>
            <div className="text-neutral-400 text-xs">Carrusel</div>
            <div className="w-3 h-3 bg-neutral-600 rounded-full"></div>
          </div>
        );
      case "select":
        return (
          <div className="w-full h-full flex items-center px-1 py-0.5">
            <div className="w-full h-5 bg-neutral-600 rounded flex items-center justify-between px-1 text-xs text-neutral-400">
              <span>Seleccionar...</span>
              <span className="ml-1">&#9660;</span>
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div className="w-full h-full flex items-center px-1 py-0.5">
            <div className="w-3 h-3 bg-neutral-600 rounded mr-1"></div>
            <span className="text-neutral-300 text-xs">Opción</span>
          </div>
        );
      case "submit":
        return (
          <div className="w-full h-full flex items-center justify-center p-1">
            <button
              className={`px-3 py-1 rounded text-white text-xs font-medium bg-cyan-600`}
              style={{ pointerEvents: "none" }}
            >
              Enviar
            </button>
          </div>
        );
      // Fallback genérico si el tipo no coincide
      default:
        return (
          <div className="text-xs text-neutral-300 text-center w-full h-full flex items-center justify-center p-1 border border-dashed border-neutral-600 rounded">
            {activeItemData.label} ({activeItemData.type})
          </div>
        );
    }
  };

  return (
    // Contenedor principal del overlay
    <div
      className={`p-2 rounded-lg border border-white/10 shadow-xl opacity-90 ${activeItemData.colorClass}`}
      style={baseStyle} // Aplica el estilo base
    >
      {/* Renderiza el contenido específico del overlay */}
      {renderOverlayContent()}
    </div>
  );
};
