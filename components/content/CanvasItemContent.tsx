import { ItemRenderers } from "@/components/canvas/ItemRenderers";
import { useCanvasStore } from "@/store/canvasStore";

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
  | "submit";

interface CanvasItemContentProps {
  type: CanvasItemType | string;
}

export const CanvasItemContent = ({ type }: CanvasItemContentProps) => {
  const Renderer = ItemRenderers[type];
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const config = useCanvasStore((state) => state.config);
  console.log("CanvasItemContent type:", config, "Renderer:", Renderer);
  if (Renderer) {
    return <Renderer openStylePanel={openStylePanel} config={config} />;
  }

  return (
    <p className="text-sm text-neutral-300 text-center w-full h-full flex items-center justify-center p-2 border border-dashed border-neutral-600 rounded">
      Item: {type} - Contenido no definido
    </p>
  );
};
