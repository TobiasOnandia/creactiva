'use client';

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CanvasArea } from "@/components/canvas/CanvasArea";
import { StylePanel } from "@/components/templates/StylePanel";
import { useSiteLoader } from "@/hooks/useSiteLoader";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { LoadingCanvas } from "../loaders/LoadingCanvas";
import { AlertCircle } from "lucide-react";

export function CanvasEditor() {
  const { isLoading, error } = useSiteLoader();
  
  useUndoRedo();

  if (isLoading) {
    return <LoadingCanvas />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="space-y-4 text-center p-6 bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-red-500/20">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-neutral-200">Error al cargar el sitio</h2>
          <p className="text-neutral-400 max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <CanvasArea />
        <StylePanel />
      </div>
    </div>
  );
}
