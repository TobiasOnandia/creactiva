// components/Editor/CanvasItemContent.tsx
import React from "react";
import {
  StarIcon,
  ImageIcon,
  ComponentIcon,
  MinusIcon,
  Pilcrow,
  TextIcon,
  VideoIcon,
} from "lucide-react"; // Importa los iconos que uses

interface CanvasItemContentProps {
  type: string;
  label: string;
  colorClass: string; // Puede ser útil para estilos específicos del contenido
  // Añade aquí otras props que tus tipos de contenido puedan necesitar
  // textContent?: string;
  // imageUrl?: string;
  // buttonText?: string;
  // options?: string[]; // Para select/checkbox
}

export const CanvasItemContent: React.FC<CanvasItemContentProps> = ({
  type,
  label,
  colorClass,
  // Desestructura otras props de contenido aquí
  // textContent, imageUrl, etc.
}) => {
  // Lógica para renderizar el contenido basado en el tipo
  switch (type) {
    case "header":
      // Placeholder para encabezado: texto más grande y en negrita
      return (
        <div className="w-full h-full flex items-center px-2 py-1">
          <h3 className="text-neutral-100 text-lg font-semibold truncate">
            Encabezado
          </h3>
        </div>
      );
    case "text":
    case "paragraph":
      // Placeholder para texto/párrafo: simula líneas de texto
      return (
        <div className="w-full h-full flex flex-col justify-center space-y-1 px-2 py-1">
          <div className="w-11/12 h-2 bg-neutral-600 rounded-full"></div>
          <div className="w-full h-2 bg-neutral-600 rounded-full"></div>
          <div className="w-10/12 h-2 bg-neutral-600 rounded-full"></div>
        </div>
      );
    case "image":
      // Placeholder para imagen: área con fondo, icono y texto centrado
      return (
        <div className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded">
          <ImageIcon className="w-6 h-6 mb-1" /> {/* Icono de imagen */}
          <span>Imagen</span> {/* Texto */}
        </div>
      );
    case "button":
      // Placeholder para botón: simula la apariencia de un botón
      return (
        <div className="w-full h-full flex items-center justify-center p-2">
          <button
            className={`px-4 py-2 rounded text-white text-sm font-medium ${colorClass.replace(
              "/10",
              ""
            )}`} // Usa colorClass para el fondo del botón
            style={{ pointerEvents: "none" }} // Asegura que el clic en el placeholder no active nada
          >
            Botón
          </button>
        </div>
      );
    case "divider":
      // Placeholder para separador: línea horizontal
      return (
        <div className="w-full h-full flex items-center px-2">
          <div className="w-full h-0.5 bg-neutral-600 rounded-full"></div>
        </div>
      );
    case "star":
      // Placeholder para estrella: solo el icono centrado
      return (
        <div className="w-full h-full flex items-center justify-center">
          <StarIcon className="w-6 h-6 text-yellow-500" />
        </div>
      );
    case "video":
      // Placeholder para video: similar a imagen pero con icono de video
      return (
        <div className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded">
          <VideoIcon className="w-6 h-6 mb-1" /> {/* Icono de video */}
          <span>Video</span> {/* Texto */}
        </div>
      );
    case "gallery":
      // Placeholder para galería: simula una cuadrícula de imágenes pequeñas
      return (
        <div className="w-full h-full bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-1 p-1 rounded">
          <div className="bg-neutral-600 rounded"></div>
          <div className="bg-neutral-600 rounded"></div>
          <div className="bg-neutral-600 rounded"></div>
          <div className="bg-neutral-600 rounded"></div>
        </div>
      );
    case "carousel":
      // Placeholder para carrusel: simula un visor con flechas
      return (
        <div className="w-full h-full bg-neutral-700 flex items-center justify-between px-2 rounded">
          <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>{" "}
          {/* Flecha izquierda */}
          <div className="text-neutral-400 text-xs">Carrusel</div> {/* Texto */}
          <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>{" "}
          {/* Flecha derecha */}
        </div>
      );
    case "select":
      // Placeholder para selector (dropdown)
      return (
        <div className="w-full h-full flex items-center px-2 py-1">
          <div className="w-full h-6 bg-neutral-600 rounded flex items-center justify-between px-2 text-xs text-neutral-400">
            <span>Seleccionar...</span>
            <span className="ml-2">&#9660;</span> {/* Flecha hacia abajo */}
          </div>
        </div>
      );
    case "checkbox":
      // Placeholder para checkbox
      return (
        <div className="w-full h-full flex items-center px-2 py-1">
          <div className="w-4 h-4 bg-neutral-600 rounded mr-2"></div>
          <span className="text-neutral-300 text-sm">Opción</span>
        </div>
      );
    case "submit":
      // Placeholder para botón de enviar (similar a botón normal pero quizás con otro color/texto)
      return (
        <div className="w-full h-full flex items-center justify-center p-2">
          <button
            className={`px-4 py-2 rounded text-white text-sm font-medium bg-cyan-600`} // Color de ejemplo
            style={{ pointerEvents: "none" }} // Asegura que el clic en el placeholder no active nada
          >
            Enviar
          </button>
        </div>
      );
    // Añade más casos para otros tipos que puedas tener en tu SecondaryPanel
    default:
      // Fallback genérico si el tipo no coincide
      return (
        <div className="text-sm text-neutral-300 text-center w-full h-full flex items-center justify-center p-2 border border-dashed border-neutral-600 rounded">
          Item: {label} ({type}) - Contenido no definido
        </div>
      );
  }
};
