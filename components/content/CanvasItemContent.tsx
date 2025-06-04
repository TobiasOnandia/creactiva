import { ItemRenderers } from "@/components/canvas/ItemRenderers";
import { useCanvasStore } from "@/store/canvasStore";
import { ConfigStyle } from "@/types/CanvasTypes";

type CanvasItemType =
  | "header"
  | "text"
  | "paragraph"
  | "image"
  | "button"
  | "divider"
  | "star"
  | "video"
  | "gallery"
  | "carousel"
  | "select"
  | "checkbox"
  | "submit"
  | "landing"
  | "dashboard"
  | "blog"
  | "portfolio"
  | "ecommerce";

interface CanvasItemContentProps {
  type: CanvasItemType | string;
  config: ConfigStyle;
  id:string
}

export const CanvasItemContent = ({ id,  type, config }: CanvasItemContentProps) => {
  console.log(type)

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
