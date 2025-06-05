'use client';

import { CanvasArea } from "@/components/canvas/CanvasArea";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LoadingCanvas } from "@/components/loaders/LoadingCanvas";
import { StylePanel } from "@/components/templates/StylePanel";
import { useSiteLoader } from "@/hooks/useSiteLoader";

export default function CanvasEditor() {
  const { isLoading } = useSiteLoader();

  if (isLoading) {
    return (
     <LoadingCanvas />
    );
  }


  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <CanvasArea />
        <StylePanel />
      </div>
    </>
  );
}
