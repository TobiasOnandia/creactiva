'use client';

import { CanvasArea } from "@/components/canvas/CanvasArea";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StylePanel } from "@/components/templates/StylePanel";
import { useSiteLoader } from "@/hooks/useSiteLoader";
import { useCanvasStore } from "@/store/canvasStore";
import { PreviewMode } from "@/components/preview/PreviewMode";

export default function CanvasPage() {
  const { isLoading } = useSiteLoader();
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-neutral-400">Cargando sitio...</p>
        </div>
      </div>
    );
  }

  return (
    <PreviewMode>
      <div className="h-screen flex flex-col">
        <div data-editor-ui>
          <Header />
        </div>
        <div className="flex-1 flex">
          {!isPreviewMode && (
            <div data-editor-ui>
              <Sidebar />
            </div>
          )}
          <CanvasArea />
          {!isPreviewMode && (
            <div data-editor-ui>
              <StylePanel />
            </div>
          )}
        </div>
      </div>
    </PreviewMode>
  );
}
