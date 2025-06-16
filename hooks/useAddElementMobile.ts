"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useCanvasStore } from "@/store/canvasStore";
import { ElementFactory } from "@/components/factories/elementFactory";
import { GRID_CONFIG } from "@/config";
import { ELEMENT_TYPE_CONFIG } from "@/config/elementConfig";
import { ElementType } from "@/types/canvas/CanvasTypes";
import { GridLayout } from "@/types/canvas/LayoutTypes";

interface UseAddElementMobileReturn {
  addElementToCanvas: (elementType: ElementType) => Promise<boolean>;
  isAdding: boolean;
  lastAddedElement: ElementType | null;
}

export const useAddElementMobile = (): UseAddElementMobileReturn => {
  const [isAdding, setIsAdding] = useState(false);
  const [lastAddedElement, setLastAddedElement] = useState<ElementType | null>(
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

  const findAvailablePosition = useCallback((): { x: number; y: number } => {
    const occupiedPositions = new Set(
      currentLayouts.map((item) => `${item.x},${item.y}`),
    );

    // Buscar la primera posición disponible empezando desde arriba
    for (let y = 0; y < 50; y++) {
      for (
        let x = 0;
        x < GRID_CONFIG.cols.lg - GRID_CONFIG.defaultSize.w;
        x++
      ) {
        const position = `${x},${y}`;
        if (!occupiedPositions.has(position)) {
          return { x, y };
        }
      }
    }

    // Si no hay posición disponible, agregar al final
    const maxY = Math.max(...currentLayouts.map((item) => item.y + item.h), 0);
    return { x: 0, y: maxY };
  }, [currentLayouts]);

  const createLayoutItem = useCallback(
    (
      elementId: string,
      x: number,
      y: number,
      elementType: ElementType,
    ): GridLayout => {
      const defaultSize =
        ELEMENT_TYPE_CONFIG[elementType] || GRID_CONFIG.defaultSize;

      return {
        i: elementId,
        x,
        y,
        w: defaultSize.w,
        h: defaultSize.h,
        minH: GRID_CONFIG.minSize.h,
        minW: GRID_CONFIG.minSize.w,
        static: false,
        isDraggable: true,
      };
    },
    [],
  );

  const addElementToCanvas = useCallback(
    async (elementType: ElementType): Promise<boolean> => {
      if (isAdding) return false;

      setIsAdding(true);
      setLastAddedElement(elementType);

      try {
        // Crear el nuevo elemento
        const newCanvasElement = ElementFactory.createElement(elementType);

        // Encontrar posición disponible
        const { x, y } = findAvailablePosition();

        // Crear el layout item
        const newLayoutItem = createLayoutItem(
          newCanvasElement.id,
          x,
          y,
          elementType,
        );

        // Agregar al store
        addElementToSection(newCanvasElement, activeSectionId);

        // Actualizar layout
        const updatedLayout = [...currentLayouts, newLayoutItem];
        updateSectionLayout(activeSectionId, updatedLayout);

        // Mostrar notificación de éxito
        toast.success(`Elemento ${elementType} agregado`, {
          description: "El elemento se ha añadido al canvas exitosamente",
          duration: 2000,
          style: {
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            backdropFilter: "blur(10px)",
          },
        });

        // Pequeña pausa para feedback visual
        await new Promise((resolve) => setTimeout(resolve, 300));

        return true;
      } catch (error) {
        console.error("Error adding element to canvas:", error);

        // Mostrar notificación de error
        toast.error("Error al agregar elemento", {
          description: "No se pudo agregar el elemento al canvas",
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
        // Limpiar el último elemento agregado después de un tiempo
        setTimeout(() => setLastAddedElement(null), 1000);
      }
    },
    [
      isAdding,
      findAvailablePosition,
      createLayoutItem,
      addElementToSection,
      activeSectionId,
      currentLayouts,
      updateSectionLayout,
    ],
  );

  return {
    addElementToCanvas,
    isAdding,
    lastAddedElement,
  };
};
