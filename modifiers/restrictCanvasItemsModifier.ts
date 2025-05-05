// modifiers/restrictCanvasItemsModifier.ts
// Importa el modificador que quieres aplicar condicionalmente
import { Modifier } from "@dnd-kit/core/dist/modifiers/types";
import { restrictToParentElement } from "@dnd-kit/modifiers";

// Define tu modificador personalizado
export const restrictCanvasItemsModifier: Modifier = (args) => {
  // Accede a los datos del elemento que se está arrastrando
  const draggableData = args.active?.data?.current;

  // Verifica si este elemento es un item del canvas (usando el flag isCanvasItem)
  const isCanvasItem = draggableData?.isCanvasItem === true;

  // Si es un item del canvas, aplica el modificador restrictToParentElement
  if (isCanvasItem) {
    // restrictToParentElement necesita los mismos argumentos que recibió tu modificador personalizado
    return restrictToParentElement(args);
  }

  // Si NO es un item del canvas (ej: es un elemento del sidebar),
  // devuelve la transformación sin modificar.
  return args.transform;
};
