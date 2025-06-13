import { ItemRenderers } from "@/components/factories/ItemRenderers";
import { ElementConfig } from "@/types/canvas/CanvasTypes";
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
  config: ElementConfig;
  id:string
}

export const CanvasItemContent = ({ id,  type, config }: CanvasItemContentProps) => {
  console.log(type)

  const Renderer = ItemRenderers[type];
  if (Renderer) {
        return <Renderer config={config as unknown as Json} id={id} />;
  }


  return (
    <p className="text-sm text-neutral-300 text-center w-full h-full flex items-center justify-center p-2 border border-dashed border-neutral-600 rounded">
      Item: {type} - Contenido no definido
    </p>
  );
};
