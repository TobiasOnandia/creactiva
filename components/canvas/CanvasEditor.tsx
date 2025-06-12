'use client';

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CanvasArea } from "@/components/canvas/CanvasArea";
import { StylePanel } from "@/components/templates/StylePanel";
import { useSiteLoader } from "@/hooks/useSiteLoader";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { LoadingCanvas } from "../loaders/LoadingCanvas";

export function CanvasEditor() {
  const { isLoading } = useSiteLoader();
  
  useUndoRedo();

  if (isLoading) {
    return (
      <LoadingCanvas />      
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
