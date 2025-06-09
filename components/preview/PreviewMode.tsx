'use client';

import { useSearchParams } from 'next/navigation';
import { useCanvasStore } from '@/store/canvasStore';
import { CanvasItemContent } from '../canvas/CanvasItemContent';

export const PreviewMode = () => {
  const sections = useCanvasStore((state) => state.sections);
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  if (!isPreview) return null;

  return (
    <div className="min-h-screen w-full bg-white">
      {sections.map((section) => (
        <div key={section.id} className="w-full">
          {section.elements.map((element) => (
            <div key={element.id} style={element.styles}>
              <CanvasItemContent element={element} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
