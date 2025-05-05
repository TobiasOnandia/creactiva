// modifiers/restrictCanvasItemsModifier.ts
// Importa el modificador que quieres aplicar condicionalmente
import { Modifier } from "@dnd-kit/core/dist/modifiers/types";
import { restrictToParentElement } from "@dnd-kit/modifiers";

// Define tu modificador personalizado
export const restrictCanvasItemsModifier: Modifier = (args) => {
  const draggableData = args.active?.data?.current;
  const isCanvasItem = draggableData?.isCanvasItem === true;
  if (isCanvasItem) {
    return restrictToParentElement(args);
  }

  return args.transform;
};
