import { ItemRenderers } from "@/components/factories/ItemRenderers";
import { Json } from "@/types/database/database.types";

type CanvasItemType =
  | "header"
  | "text"
  | "paragraph"
  | "image"
  | "button"
  | "divider"
  | "star"
  | "gallery"
  | "carousel"
  | "select"
  | "checkbox"
  | "submit";

interface CanvasItemContentProps {
  type: CanvasItemType | string;
  config: Json;
  id: string;
}

export const CanvasItemContent = ({
  id,
  type,
  config,
}: CanvasItemContentProps) => {
  const Renderer = ItemRenderers[type];
  if (Renderer) {
    return <Renderer config={config} id={id} />;
  }
  return (
    <p className="text-sm text-neutral-300 text-center w-full h-full flex items-center justify-center p-2 border border-dashed border-neutral-600 rounded">
      Item: {type} - Contenido no definido
    </p>
  );
};
