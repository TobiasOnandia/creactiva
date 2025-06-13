"use client";

import { useCanvasStore } from "@/store/canvasStore";
import { PreviewContent } from "./PreviewContent";
import { useEffect } from "react";

export function PreviewMode({ children }: { children: React.ReactNode }) {
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  useEffect(() => {
    if (isPreviewMode) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("preview-active");
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("preview-active");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("preview-active");
    };
  }, [isPreviewMode]);

  return (
    <main className="h-screen relative overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ease-in-out ${
          isPreviewMode
            ? "opacity-0 pointer-events-none absolute inset-0 z-0"
            : "opacity-100 pointer-events-auto relative z-10"
        }`}
      >
        {children}
      </div>

      <div
        className={`fixed inset-0 transition-all overflow-scroll duration-300 ease-in-out ${
          isPreviewMode
            ? "opacity-100 pointer-events-auto z-20"
            : "opacity-0 pointer-events-none z-0"
        }`}
      >
        {isPreviewMode && (
          <>
            <div className="fixed h-20 top-0 left-0 right-0 z-30 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
              <header className="flex items-center h-full justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-neutral-300 font-medium">
                    Modo Preview Activo
                  </span>
                </div>

                <button
                  onClick={() => useCanvasStore.getState().togglePreviewMode()}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1 rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Presiona ESC para salir
                </button>
              </header>
            </div>

            <PreviewContent />
          </>
        )}
      </div>

      <PreviewKeyboardHandler />
    </main>
  );
}

function PreviewKeyboardHandler() {
  const togglePreviewMode = useCanvasStore((state) => state.togglePreviewMode);
  const isPreviewMode = useCanvasStore((state) => state.isPreviewMode);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isPreviewMode) {
        event.preventDefault();
        togglePreviewMode();
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        togglePreviewMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewMode, togglePreviewMode]);

  return null;
}
