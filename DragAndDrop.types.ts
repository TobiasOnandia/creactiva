import { ElementType, TemplateNodeData } from "./panel/TemplateNodeType";

export interface ActiveDraggableData {
  id: string; // Un ID para la operación de arrastre (puede ser temporal o el ID del elemento si se mueve uno existente)
  type: 'element' | 'template' | 'canvas-element'; // Indica si se arrastra un elemento básico, una plantilla o un elemento ya en el canvas
  elementData?: {
    type: ElementType; // El tipo de elemento HTML
    label: string;     // Etiqueta
    colorClass: string; // Clase de color
    classes?: string;
  };
  templateData?: TemplateNodeData;
  canvasElementId?: string;
  isCanvasItem?: boolean
  initialPosition?: { x: number; y: number };
}


export interface CanvasElement {
  id: string; // ID único de este elemento en el canvas
  parentId: string | null; // ID del contenedor padre en el canvas (null para elementos de nivel superior)
  children: string[]; // Array de IDs de los CanvasElements hijos
  type: 'container' | 'element'; // Tipo de nodo en el canvas (corresponde a TemplateNodeType)
  x: number; // Posición X en el canvas (principalmente para elementos de nivel superior)
  y: number; // Posición Y en el canvas (principalmente para elementos de nivel superior)
  width: number; // Ancho del elemento
  height: number; // Alto del elemento
  classes?: string; // Clases de Tailwind u otras clases CSS aplicadas a este elemento
  containerType?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'aside' | 'nav' | 'article' | 'form' | 'ul' | 'ol' | 'table'; // Tipos semánticos de contenedor
  elementType?: ElementType; // El tipo de elemento HTML real que se renderizará
  elementLabel?: string; // Etiqueta o nombre descriptivo del elemento (para UI/inspector)
  elementColorClass?: string; // Clase de color de previsualización
  flexDirection?: string;
  gridCols?: number;
}



export interface CanvasItemProps {
  element: CanvasElement;
  onResize: (itemId: string, newWidth: number, newHeight: number) => void;
}
