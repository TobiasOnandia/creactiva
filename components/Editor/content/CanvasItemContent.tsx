// components/Editor/CanvasItemContent.tsx
import React from "react";
import { StarIcon } from "lucide-react"; // Importa los iconos que uses

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
    case "text":
    case "header":
    case "paragraph":
      // Puedes usar textContent si lo pasas
      return (
        <p className="text-neutral-200 text-sm">
          {/* {textContent || 'Contenido de Texto (Editable?'} */}
          Contenido de Texto (Editable?)
        </p>
      );
    case "image":
      // Puedes usar imageUrl si lo pasas
      return (
        <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-neutral-400 text-xs">
          {/* {imageUrl ? <img src={imageUrl} alt={label} className="w-full h-full object-cover" /> : 'Imagen'} */}
          Imagen
        </div>
      );
    case "button":
      // Puedes usar buttonText si lo pasas
      return (
        <button
          className={`px-3 py-1 rounded text-white text-sm ${colorClass.replace(
            "/10",
            ""
          )}`} // Usa colorClass para el fondo del botón
        >
          {/* {buttonText || label} */}
          Botón
        </button>
      );
    case "divider":
      // Un separador simple que llena el ancho disponible
      return (
        <div className="w-full h-1 bg-neutral-700 rounded-full my-2"></div>
      );
    case "star":
      return <StarIcon className="w-6 h-6 text-yellow-500" />;
    // Añade más casos para otros tipos (video, select, checkbox, etc.)
    // Asegúrate de que el contenido use width: '100%' y height: '100%' si debe llenar el Resizable
    default:
      return (
        <div className="text-sm text-neutral-300 text-center w-full h-full flex items-center justify-center">
          Item: {label} ({type})
        </div>
      ); // Fallback genérico
  }
};
