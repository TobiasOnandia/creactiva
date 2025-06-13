"use client";
import { useMemo } from "react";
import { useCanvasStore } from "@/store/canvasStore";
import { CanvasItemContent } from "@/components/canvas/CanvasItemContent";
import { ElementConfig } from "@/types/canvas/CanvasTypes";

const ROW_HEIGHT = 60;
const GRID_COLUMNS = 12;
const GRID_GAP = 16;

interface ElementWithLayout {
  element: {
    id: string;
    type: string;
    config: ElementConfig;
  };
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface ProcessedSection {
  id: string;
  elementsWithLayout: ElementWithLayout[];
  maxY: number;
}

export function PreviewContent() {
  const sections = useCanvasStore((state) => state.sections);
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  const processedSections = useMemo<ProcessedSection[]>(() => {
    if (!sections) return [];

    return sections.map((section) => {
      const elementsWithLayout =
        (section.elements
          ?.map((element) => {
            const layout = section.layout?.find((l) => l.i === element.id);
            return layout ? { element, layout } : null;
          })
          .filter(Boolean) as ElementWithLayout[]) || [];

      const maxY = elementsWithLayout.reduce(
        (max, { layout }) => Math.max(max, layout.y + layout.h),
        0
      );

      return {
        id: section.id,
        elementsWithLayout,
        maxY,
      };
    });
  }, [sections]);

  if (!isPreviewMode) return null;

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      {processedSections.map((section) => (
        <PreviewSection key={section.id} section={section} />
      ))}
    </div>
  );
}

export const PreviewSection = ({ section }: { section: ProcessedSection }) => {
  if (!section.elementsWithLayout.length) return null;

  const sectionMinHeight = Math.max(
    section.maxY * ROW_HEIGHT + GRID_GAP * 2,
    400
  );

  return (
    <section
      className="w-full relative"
      style={{ minHeight: sectionMinHeight }}
      data-section-id={section.id}
      aria-label={`Preview section ${section.id}`}
    >
      <div
        className="grid relative w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${section.maxY || 1}, ${ROW_HEIGHT}px)`,
          gap: `${GRID_GAP}px`,
        }}
        role="grid"
        aria-label="Canvas elements layout"
      >
        {section.elementsWithLayout.map(({ element, layout }) => (
          <PreviewElement key={element.id} element={element} layout={layout} />
        ))}
      </div>
    </section>
  );
};

export const PreviewElement = ({
  element,
  layout,
}: {
  element: ElementWithLayout["element"];
  layout: ElementWithLayout["layout"];
}) => {
  return (
    <div
      className="preview-element w-full h-full"
      style={{
        gridColumn: `${layout.x + 1} / span ${layout.w}`,
        gridRow: `${layout.y + 1} / span ${layout.h}`,
      }}
      data-element-id={element.id}
      role="gridcell"
    >
      <div className="w-full h-full flex items-stretch">
        <CanvasItemContent
          id={element.id}
          type={element.type}
          config={element.config}
        />
      </div>
    </div>
  );
};
