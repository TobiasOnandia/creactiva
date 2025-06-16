"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useCanvasStore } from "@/store/canvasStore";
import { templateConfigs, TemplateConfig } from "@/config/templateConfigs";
import { GRID_CONFIG } from "@/config";
import { GridLayout } from "@/types/canvas/LayoutTypes";

export type TemplateType = keyof typeof templateConfigs;

interface UseAddTemplateMobileReturn {
  addTemplateToCanvas: (templateType: TemplateType) => Promise<boolean>;
  isAdding: boolean;
  lastAddedTemplate: TemplateType | null;
}

export const useAddTemplateMobile = (): UseAddTemplateMobileReturn => {
  const [isAdding, setIsAdding] = useState(false);
  const [lastAddedTemplate, setLastAddedTemplate] = useState<TemplateType | null>(
    null,
  );

  const addElementToSection = useCanvasStore(
    (state) => state.addElementToSection,
  );
  const updateSectionLayout = useCanvasStore(
    (state) => state.updateSectionLayout,
  );
  const activeSectionId = useCanvasStore((state) => state.activeSectionId);
  const currentLayouts = useCanvasStore(
    (state) =>
      state.sections.find((s) => s.id === activeSectionId)?.layout || [],
  );

  const findAvailablePositionForTemplate = useCallback((templateConfig: TemplateConfig): { offsetX: number; offsetY: number } => {
    // Calcular el área total que ocupará el template
    const templateBounds = templateConfig.layout.reduce(
      (bounds, item) => ({
        maxX: Math.max(bounds.maxX, item.x + item.w),
        maxY: Math.max(bounds.maxY, item.y + item.h),
      }),
      { maxX: 0, maxY: 0 }
    );

    // Buscar espacio disponible para el template completo
    const occupiedPositions = new Set(
      currentLayouts.map((item) => `${item.x},${item.y}`),
    );

    // Intentar posicionar el template empezando desde arriba
    for (let offsetY = 0; offsetY < 50; offsetY++) {
      for (let offsetX = 0; offsetX <= GRID_CONFIG.cols.lg - templateBounds.maxX; offsetX++) {
        let canPlace = true;

        // Verificar si todas las posiciones del template están libres
        for (const layoutItem of templateConfig.layout) {
          const newX = offsetX + layoutItem.x;
          const newY = offsetY + layoutItem.y;

          // Verificar cada celda que ocupará este elemento
          for (let x = newX; x < newX + layoutItem.w; x++) {
            for (let y = newY; y < newY + layoutItem.h; y++) {
              if (occupiedPositions.has(`${x},${y}`)) {
                canPlace = false;
                break;
              }
            }
            if (!canPlace) break;
          }
          if (!canPlace) break;
        }

        if (canPlace) {
          return { offsetX, offsetY };
        }
      }
    }

    // Si no hay espacio, colocar al final
    const maxY = Math.max(...currentLayouts.map((item) => item.y + item.h), 0);
    return { offsetX: 0, offsetY: maxY };
  }, [currentLayouts]);

  const createLayoutItemsFromTemplate = useCallback(
    (templateConfig: TemplateConfig, elementsWithNewIds: any[], offsetX: number, offsetY: number): GridLayout[] => {
      return templateConfig.layout.map((layoutItem, index) => ({
        i: elementsWithNewIds[index].id,
        x: offsetX + layoutItem.x,
        y: offsetY + layoutItem.y,
        w: layoutItem.w || GRID_CONFIG.defaultSize.w,
        h: layoutItem.h || GRID_CONFIG.defaultSize.h,
        minH: layoutItem.minH || GRID_CONFIG.minSize.h,
        minW: layoutItem.minW || GRID_CONFIG.minSize.w,
        static: false,
        isDraggable: true,
      }));
    },
    [],
  );

  const addTemplateToCanvas = useCallback(
    async (templateType: TemplateType): Promise<boolean> => {
      if (isAdding) return false;

      setIsAdding(true);
      setLastAddedTemplate(templateType);

      try {
        const templateConfig = templateConfigs[templateType];

        if (!templateConfig) {
          throw new Error(`Template ${templateType} no encontrado`);
        }

        // Crear elementos con nuevos IDs únicos
        const elementsWithNewIds = templateConfig.elements.map((element) => ({
          ...element,
          id: crypto.randomUUID(),
        }));

        // Encontrar posición disponible para todo el template
        const { offsetX, offsetY } = findAvailablePositionForTemplate(templateConfig);

        // Crear layouts con las nuevas posiciones
        const newLayoutItems = createLayoutItemsFromTemplate(
          templateConfig,
          elementsWithNewIds,
          offsetX,
          offsetY
        );

        // Agregar todos los elementos al store
        elementsWithNewIds.forEach((element) => {
          addElementToSection(element, activeSectionId);
        });

        // Actualizar layout con todos los nuevos elementos
        const updatedLayout = [...currentLayouts, ...newLayoutItems];
        updateSectionLayout(activeSectionId, updatedLayout);

        // Mostrar notificación de éxito
        const templateNames: Record<TemplateType, string> = {
          landing: "Landing Page",
          dashboard: "Dashboard",
          blog: "Blog",
          portfolio: "Portafolio",
          ecommerce: "Tienda Online"
        };

        toast.success(`Template ${templateNames[templateType]} agregado`, {
          description: `${elementsWithNewIds.length} elementos añadidos al canvas`,
          duration: 3000,
          style: {
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            backdropFilter: "blur(10px)",
          },
        });

        // Pequeña pausa para feedback visual
        await new Promise((resolve) => setTimeout(resolve, 500));

        return true;
      } catch (error) {
        console.error("Error adding template to canvas:", error);

        // Mostrar notificación de error
        toast.error("Error al agregar template", {
          description: "No se pudo agregar el template al canvas",
          duration: 3000,
          style: {
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            backdropFilter: "blur(10px)",
          },
        });

        return false;
      } finally {
        setIsAdding(false);
        // Limpiar el último template agregado después de un tiempo
        setTimeout(() => setLastAddedTemplate(null), 1500);
      }
    },
    [
      isAdding,
      findAvailablePositionForTemplate,
      createLayoutItemsFromTemplate,
      addElementToSection,
      activeSectionId,
      currentLayouts,
      updateSectionLayout,
    ],
  );

  return {
    addTemplateToCanvas,
    isAdding,
    lastAddedTemplate,
  };
};
