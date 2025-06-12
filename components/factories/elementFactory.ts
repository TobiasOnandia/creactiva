import { DEFAULT_ELEMENT_CONFIGS } from "@/config";
import { CanvasElement, ElementType } from "@/types/canvas/CanvasTypes";

export class ElementFactory {
    static createElement(type: ElementType): CanvasElement {
    const baseConfig = {
      backgroundColor: "transparent",
      color: "#f8fafc",
      fontSize: 16,
      padding: 16,
      paddingInline: 16,
      paddingBlock: 16,
      borderRadius: 8,
      fontWeight: "normal",
      lineHeight: 1.5,
      letterSpacing: 0.025,
      boxShadow: "none",
      textAlign: "left" as const,
    };

    const typeConfig = DEFAULT_ELEMENT_CONFIGS[type as keyof typeof DEFAULT_ELEMENT_CONFIGS] || {
      content: "Nuevo elemento",
    };

    return {
      id: crypto.randomUUID(),
      type,
      config: { type, ...baseConfig, ...typeConfig },
    };
  }
}