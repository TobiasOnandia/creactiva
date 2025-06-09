'use client';

import { useCanvasStore } from '@/store/canvasStore';
import { CanvasItemContent } from '../canvas/CanvasItemContent';

export function PreviewContent() {
  const sections = useCanvasStore((state) => state.sections);
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  if (!isPreviewMode) return null;

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      {sections.map((section) => (
        <section 
          key={section.id}
          className="w-full min-h-screen flex flex-col items-center justify-center p-8"
          data-section-id={section.id}
        >
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-12 gap-4 relative">
              {section.elements.map((element) => {
                const layout = section.layout.find(l => l.i === element.id);
                if (!layout) return null;

                return (
                  <div
                    key={element.id}
                    className="preview-element"
                    style={{
                      gridColumn: `span ${layout.w} / span ${layout.w}`,
                      gridRow: `span ${layout.h} / span ${layout.h}`,
                      transform: `translateY(${layout.y * 90}px)`, // 90px es el rowHeight
                    }}
                  >
                    <CanvasItemContent 
                      id={element.id} 
                      type={element.type} 
                      config={element.config} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
