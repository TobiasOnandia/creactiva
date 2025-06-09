'use client';

import { useCanvasStore } from '@/store/canvasStore';
import { type ReactNode } from 'react';

interface PreviewModeProps {
  children: ReactNode;
}

export function PreviewMode({ children }: PreviewModeProps) {
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  return (
    <div
      className={`h-full transition-all duration-300 ${
        isPreviewMode ? 'preview-mode' : ''
      }`}
    >
      {children}
    </div>
  );
}
