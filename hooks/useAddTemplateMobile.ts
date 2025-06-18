"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useCanvasStore } from "@/store/canvasStore";
import { templateConfigs } from "@/config/templateConfigs";

export type TemplateType = keyof typeof templateConfigs;

interface UseAddTemplateMobileReturn {
  addTemplateToCanvas: (templateType: TemplateType) => Promise<boolean>;
  isAdding: boolean;
  lastAddedTemplate: TemplateType | null;
}
/*  */
export function useAddTemplateMobile(): UseAddTemplateMobileReturn {
  const addElementToSection = useCanvasStore(state => state.addElementToSection);
  const updateSectionLayout = useCanvasStore(state => state.updateSectionLayout);
  const activeSectionId = useCanvasStore(state => state.activeSectionId);
  const sections = useCanvasStore(state => state.sections);

  const [isAdding, setIsAdding] = useState(false);
  const [lastAddedTemplate, setLastAddedTemplate] = useState<TemplateType | null>(null);

  const addTemplateToCanvas = useCallback(async (templateType: TemplateType): Promise<boolean> => {
    if (isAdding) return false;
    setIsAdding(true);

    try {
      const config = templateConfigs[templateType];
      if (!config) throw new Error(`Template ${templateType} no encontrado`);

      const section = sections.find(sec => sec.id === activeSectionId);
      if (!section) throw new Error(`Sección ${activeSectionId} no encontrada`);

      // Add elements
      for (const element of config.elements) {
        const elementCopy = { ...element, id: crypto.randomUUID() };
        // await in case it's async
        // @ts-ignore
        await addElementToSection(elementCopy, activeSectionId);
      }

      // Compute new layout items
      const existingLayout = section.layout;
      const baseY = existingLayout.length > 0
        ? Math.max(...existingLayout.map(item => item.y + item.h))
        : 0;

      const newItems = config.layout.map(def => ({
        i: crypto.randomUUID(),
        x: def.x,
        y: baseY + def.y,
        w: def.w,
        h: def.h,
        minH: def.minH,
        minW: def.minW,
        static: false,
        isDraggable: true,
      }));

      updateSectionLayout(activeSectionId, [...existingLayout, ...newItems]);

      setLastAddedTemplate(templateType);
      // clear after timeout
      setTimeout(() => setLastAddedTemplate(null));

      setIsAdding(false);
      toast.success('Template agregado');
      return true;
    } catch (error) {
      console.error('Error adding template to canvas:', error);
      setIsAdding(false);
      toast.error('Error al agregar template', { description: 'No se pudo agregar el template al canvas' });
      return false;
    }
  }, [isAdding, addElementToSection, updateSectionLayout, activeSectionId, sections]);

  return { isAdding, lastAddedTemplate, addTemplateToCanvas };
}
