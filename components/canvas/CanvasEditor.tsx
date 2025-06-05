'use client';

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CanvasArea } from "@/components/canvas/CanvasArea";
import { StylePanel } from "@/components/templates/StylePanel";
import { useSiteLoader } from "@/hooks/useSiteLoader";
import { LoadingCanvas } from "../loaders/LoadingCanvas";

export function CanvasEditor() {
  const { isLoading } = useSiteLoader();

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
