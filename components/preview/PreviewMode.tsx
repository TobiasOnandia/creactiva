'use client';

import { useCanvasStore } from '@/store/canvasStore';
import { type ReactNode } from 'react';



export function PreviewMode({ children }: {children: React.ReactNode}) {
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  return (
    <main
      className={`h-screen transition-all duration-300 ${
        isPreviewMode ? 'preview-mode' : ''
      }`}
    >
      {children}
    </main>
  );
}
