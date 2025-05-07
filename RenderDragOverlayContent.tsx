// helpers/RenderDragOverlayContent.tsx
import React from 'react';
// Importa los tipos necesarios
import { ActiveDraggableData } from '@/types/DragAndDrop.types'; // Asegúrate de que la ruta sea correcta
// Importa el componente TemplatePreview si lo definiste en otro archivo
// Si TemplatePreview está en DraggableTemplate.tsx y no se exporta,
// necesitarás moverlo a un archivo separado o duplicar su lógica aquí.
import { TemplatePreview } from '@/components/common/DraggableTemplate'; // Asumiendo que TemplatePreview es exportado desde aquí


// Función que determina qué contenido mostrar en el DragOverlay
export const RenderDragOverlayContent = (item: ActiveDraggableData) => {
  // Verifica el tipo del elemento arrastrado
  if (item.type === 'element' && item.elementData) {
    // Si es un elemento básico (desde la sidebar de elementos)
    // Renderiza una previsualización simple del elemento básico
    return (
      <div
        className={`w-full h-full rounded-lg flex items-center justify-center text-xs text-white/80 ${item.elementData.colorClass || 'bg-neutral-700/30'}`}
        style={{ width: '100px', height: '50px' }} // Tamaño de previsualización
      >
        {item.elementData.label || item.elementData.type}
      </div>
    );
  } else if (item.type === 'template' && item.templateData) {
    // Si es una plantilla (desde el panel de plantillas)
    // Renderiza una previsualización de la estructura de la plantilla
    // Puedes usar el componente TemplatePreview que creamos para el panel
    return (
        <div
            className="w-full h-full p-2 bg-neutral-700/50 rounded-lg flex items-center justify-center"
            style={{ width: '150px', height: '100px' }} // Tamaño de previsualización de la plantilla
        >
            {/* Usa el componente TemplatePreview para mostrar la estructura de datos */}
            {/* Le pasamos el nodo raíz de la estructura de la plantilla */}
            <TemplatePreview node={item.templateData} />
        </div>
    );

  } else if (item.type === 'canvas-element' && item.canvasElementId) {
      // TODO: Si implementas arrastrar elementos existentes en el canvas,
      // necesitarás una lógica de previsualización diferente aquí.
      // Podrías renderizar una copia simplificada del elemento del canvas.
       return (
          <div className="w-full h-full rounded-lg border border-dashed border-white/50 flex items-center justify-center text-xs text-white/50">
              Moviendo Item Canvas: {item.canvasElementId}
          </div>
       );
  }


  // Caso por defecto si el tipo no es reconocido
  return (
    <div className="w-full h-full rounded-lg bg-red-500/30 flex items-center justify-center text-xs text-white/80">
      Item: ({item.type}) - Contenido no definido
    </div>
  );
};

// Nota: Si TemplatePreview no se exporta desde DraggableTemplate.tsx,
// puedes copiar la lógica de TemplatePreview directamente aquí o mover TemplatePreview
// a un archivo separado que ambos componentes puedan importar.
