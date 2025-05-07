export type TemplateNodeType = 'container' | 'element';

export type ElementType =
  'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' |
  'button' | 'a' | 'img' | 'input' | 'textarea' |
  'section' | 'header' | 'footer' | 'main' | 'aside' | 'nav' | 'article' |
  'ul' | 'ol' | 'li' |
  'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td';


export interface TemplateNodeData {
    type: TemplateNodeType; // Indica si este nodo es un 'container' o un 'element'
    classes?: string; // Clases de Tailwind u otras clases CSS para aplicar a este nodo
    containerType?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'aside' | 'nav' | 'article' | 'form' | 'ul' | 'ol' | 'table';
    flexDirection?: 'row' | 'col'; // Ejemplo de propiedad de layout para contenedores flex
    gridCols?: number; // Ejemplo de propiedad de layout para contenedores grid
    children?: TemplateNodeData[]; // Array de nodos hijos (para estructuras anidadas)
    elementType?: ElementType; // El tipo de elemento HTML (p, h1, img, button, etc.)
    elementLabel?: string; // Un texto descriptivo para identificar el elemento (ej: 'Botón Primario', 'Imagen de Producto')
    elementColorClass?: string; // Clase de Tailwind para dar un color de previsualización (ej: 'bg-blue-500/30')
  }
  

