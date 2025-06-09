'use client';
import { useSearchParams } from 'next/navigation';
import { CanvasArea } from "@/components/canvas/CanvasArea";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LoadingCanvas } from "@/components/loaders/LoadingCanvas";
import { StylePanel } from "@/components/templates/StylePanel";
import { useSiteLoader } from "@/hooks/useSiteLoader";
import { PreviewMode } from "@/components/preview/PreviewMode";

export default function CanvasEditor() {
  const { isLoading } = useSiteLoader();
 const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  if (isLoading) {
    return (
     <LoadingCanvas />
    );
  }
if (isPreview) {
    return <PreviewMode />;
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
