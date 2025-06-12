'use client';
import { useMemo } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { CanvasItemContent } from '../canvas/CanvasItemContent';
import { ElementConfig } from '@/types/canvas/CanvasTypes';

// Constants
const ROW_HEIGHT = 90;
const GRID_COLUMNS = 12;

// Types for better type safety
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
}

export function PreviewContent() {
  const sections = useCanvasStore((state) => state.sections);
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  const processedSections = useMemo<ProcessedSection[]>(() => {
    if (!sections) return [];
    
    return sections.map((section) => ({
      id: section.id,
      elementsWithLayout: section.elements
        ?.map((element) => {
          const layout = section.layout?.find(l => l.i === element.id);
          return layout ? { element, layout } : null;
        })
        .filter(Boolean) as ElementWithLayout[] || []
    }));
  }, [sections]);

  if (!isPreviewMode) return null;

  return (
    <div className="w-screen min-h-screen bg-white overflow-y-auto">
      {processedSections.map((section) => (
        <PreviewSection 
          key={section.id} 
          section={section} 
        />
      ))}
    </div>
  );
}

const PreviewSection = ({ section }: { section: ProcessedSection }) => {
  if (!section.elementsWithLayout.length) return null;

  return (
    <section
      className="w-full min-h-screen p-8"
      data-section-id={section.id}
      aria-label={`Preview section ${section.id}`}
    >
      <div className="w-full h-full max-w-7xl mx-auto">
        <div 
          className="grid gap-4 relative w-full"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
            gridAutoRows: `${ROW_HEIGHT}px`
          }}
          role="grid"
          aria-label="Canvas elements layout"
        >
          {section.elementsWithLayout.map(({ element, layout }) => (
            <PreviewElement
              key={element.id}
              element={element}
              layout={layout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PreviewElement = ({ 
  element, 
  layout 
}: { 
  element: ElementWithLayout['element'];
  layout: ElementWithLayout['layout'];
}) => {
  return (
    <div
      className="preview-element"
      style={{
        gridColumn: `${layout.x + 1} / span ${layout.w}`,
        gridRow: `${layout.y + 1} / span ${layout.h}`,
      }}
      data-element-id={element.id}
      role="gridcell"
    >
      <CanvasItemContent
        id={element.id}
        type={element.type}
        config={element.config}
      />
    </div>
  );
};

export default PreviewContent;