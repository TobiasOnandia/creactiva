import React from "react";
import { StarIcon, ImageIcon, VideoIcon } from "lucide-react";
import { ItemRenderers } from "../canvas/ItemRenderers";

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

  if (Renderer) {
    return <Renderer />;
  }

  return (
    <div className="text-sm text-neutral-300 text-center w-full h-full flex items-center justify-center p-2 border border-dashed border-neutral-600 rounded">
      Item: {type} - Contenido no definido
    </div>
  );
};
