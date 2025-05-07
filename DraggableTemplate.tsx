// components/common/DraggableTemplate.tsx
// Importa el hook useDraggable para hacer el componente arrastrable
import { useDraggable } from "@dnd-kit/core";
// Importa CSS para aplicar transformaciones de estilo durante el arrastre
import { CSS } from "@dnd-kit/utilities";
// Importa los tipos necesarios para la estructura de datos de arrastre y plantillas
import { ActiveDraggableData } from "@/types/DragAndDrop.types"; // Asegúrate de que esta ruta de importación sea correcta
import { TemplateNodeData } from "@/types/panel/TemplateNodeType";

// Define las props que espera el componente DraggableTemplate
interface DraggableTemplateProps {
  title: string; // Título de la plantilla
  description: string; // Descripción de la plantilla
  // La estructura de datos de la plantilla, usando el tipo TemplateNodeData
  structure: TemplateNodeData;
}

// =============================================================================
// Componente Auxiliar: TemplatePreview
// Este componente se encarga de renderizar una previsualización visual simplificada
// de la estructura de la plantilla en el panel, basándose en los datos TemplateNodeData.
// =============================================================================
export const TemplatePreview = ({ node }: { node: TemplateNodeData }) => {
  // Define las clases de Tailwind para la previsualización del nodo actual
  let previewClasses = 'rounded ' + (node.classes || ''); // Mantiene las clases generales del nodo de plantilla

  // Añade clases específicas para la previsualización basadas en el tipo de nodo y clases de layout
  if (node.type === 'container') {
      // Estilos visuales para contenedores en la previsualización
      previewClasses += ' border border-dashed border-white/20 p-0.5';
      // Intenta inferir el layout flex/grid de las clases para replicarlo en la previsualización
      if (node.containerType === 'div' && node.classes?.includes('flex')) {
          previewClasses += ' flex';
          if (node.classes.includes('flex-col')) previewClasses += ' flex-col';
          else previewClasses += ' flex-row'; // Por defecto, si es flex pero no col, asume row
      } else if (node.containerType === 'div' && node.classes?.includes('grid')) {
           previewClasses += ' grid';
           if (node.gridCols) previewClasses += ` grid-cols-${node.gridCols}`; // Aplica clases de grid si se especifica gridCols
      }
       // Clases para controlar el tamaño en la previsualización (evitar que se distorsionen)
       previewClasses += ' flex-shrink-0 min-h-[10px] min-w-[10px]'; // Asegura un tamaño mínimo visible
  } else { // type === 'element'
      // Estilos visuales para elementos básicos en la previsualización
      previewClasses += ` ${node.elementColorClass || 'bg-neutral-700/30'} h-3`; // Aplica color y un tamaño de ejemplo
      previewClasses += ' flex-shrink-0'; // Evita que se encojan demasiado
  }


  return (
    // Renderiza un div simple con las clases calculadas para representar el nodo de plantilla
    <div className={previewClasses}>
      {/* Si es un contenedor y tiene hijos, renderiza los hijos recursivamente */}
      {node.type === 'container' && node.children && node.children.length > 0 ? (
        node.children.map((childNode, index) => (
          // Llama recursivamente a TemplatePreview para cada nodo hijo
          // Usa el índice como key para la lista de hijos (suficiente para la previsualización)
          <TemplatePreview key={index} node={childNode} />
        ))
      ) : (
          // Si es un elemento básico (hoja), muestra una etiqueta simple
          <div className="text-[6px] text-white/60 text-center truncate pointer-events-none">
              {node.elementLabel || node.elementType} {/* Muestra la etiqueta o el tipo de elemento */}
          </div>
      )}
    </div>
  );
};


// =============================================================================
// Componente Principal: DraggableTemplate
// Representa una plantilla en el panel lateral y la hace arrastrable.
// =============================================================================
export const DraggableTemplate = ({ title, description, structure }: DraggableTemplateProps) => {
  // Define el objeto de datos que se adjuntará al evento de arrastre.
  // Este objeto se pasará a la zona de caída (el canvas).
  const draggableData: ActiveDraggableData = {
    // Genera un ID único para esta operación de arrastre.
    // Este ID identifica el elemento arrastrable en el contexto de Dnd-kit.
    id: `draggable-template-${title.replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`,
    type: 'template', // Indica que lo que se está arrastrando es una plantilla
    templateData: structure, // Adjunta la estructura de datos completa de la plantilla
  };

  // Usa el hook useDraggable para hacer que este componente sea arrastrable.
  // Le pasamos el ID y los datos que definimos.
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: draggableData.id, // Usa el ID definido para el arrastrable
    data: draggableData, // Pasa el objeto de datos que contiene la estructura de la plantilla
  });

  // Define los estilos inline para aplicar la transformación de movimiento durante el arrastre.
  const style = {
    // Aplica la transformación de traslación proporcionada por dnd-kit
    transform: CSS.Translate.toString(transform),
    // Ajusta la opacidad para dar feedback visual durante el arrastre
    opacity: isDragging ? 0.5 : 1,
    // Cambia el cursor para indicar que es arrastrable
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    // El elemento HTML principal que será arrastrable.
    // Le aplicamos las props necesarias de useDraggable.
    <div
      ref={setNodeRef} // Asigna la referencia del nodo DOM a dnd-kit
      style={style} // Aplica los estilos de transformación y estado de arrastre
      {...listeners} // Añade los manejadores de eventos de arrastre (mousedown, touchstart, etc.)
      {...attributes} // Añade atributos ARIA y otros necesarios para accesibilidad
      // Añade clases de Tailwind para la apariencia visual de la tarjeta de plantilla
      className="group relative p-4 rounded-xl bg-neutral-800/50 border border-white/10 hover:border-cyan-500/30 transition-all"
    >
      {/* Contenido visible de la tarjeta de plantilla */}
      <div className="space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-neutral-200">{title}</h4>
          <p className="text-xs text-neutral-400">{description}</p>
        </div>

        {/* Área para la previsualización visual de la estructura de la plantilla */}
        {/* Usamos el componente auxiliar TemplatePreview para renderizar la estructura de datos como JSX */}
        <div className="pointer-events-none"> {/* pointer-events-none evita que la previsualización interfiera con el arrastre */}
            <TemplatePreview node={structure} /> {/* Pasa la estructura de datos al componente de previsualización */}
        </div>
      </div>

      {/* Efecto visual de hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
