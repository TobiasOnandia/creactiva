"use client";

import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "@/components/canvas/CanvasItemContent";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCanvasStore } from "@/store/canvasStore";
import { useCanvasLayout } from "@/hooks/useCanvasLayout";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import {  GRID_CONFIG } from "@/config";
import { GridContainer } from "@/components/ui/canvas/GridContainer";
import { SectionHeader } from "@/components/ui/canvas/SectionHeader";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function CanvasArea() {
  const canvasElements = useCanvasStore((state) => state.canvasElements);
  const activeSectionId = useCanvasStore((state) => state.activeSectionId);
  const sections = useCanvasStore((state) => state.sections);
  const addElementToSection = useCanvasStore((state) => state.addElementToSection);
  const updateSectionLayout = useCanvasStore((state) => state.updateSectionLayout);
  const activeDevice = useCanvasStore((state) => state.activeDevice);

  const activeSection = sections.find(s => s.id === activeSectionId);

  const { currentLayout, setCurrentLayout, handleLayoutChange } = useCanvasLayout(
    activeSectionId,
    activeSection,
    canvasElements,
    updateSectionLayout
  );

  const { handleDrop } = useDragAndDrop(
    activeSectionId,
    currentLayout,
    setCurrentLayout,
    addElementToSection,
    updateSectionLayout
  );

  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
      <BackgroundCanvas />
      
      <section className="absolute inset-0 p-8 flex items-center justify-center overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <GridContainer activeDevice={activeDevice} >
          <SectionHeader sectionName={activeSection?.name} />

          <ResponsiveGridLayout
            className="layout h-full"
            layouts={{
              lg: currentLayout,
              md: currentLayout,
              sm: currentLayout,
              xs: currentLayout,
              xxs: currentLayout,
            }}
            breakpoints={GRID_CONFIG.breakpoints}
            cols={GRID_CONFIG.cols}
            rowHeight={GRID_CONFIG.rowHeight}
            onLayoutChange={handleLayoutChange}
            autoSize={true}
            draggableCancel=".no-drag"
            draggableHandle=".drag-handle"
            droppingItem={{ 
              i: "dropping-item", 
              w: GRID_CONFIG.defaultSize.w, 
              h: GRID_CONFIG.defaultSize.h 
            }}
            onDrop={handleDrop}
            compactType={null}
            preventCollision={true}
            style={{ minHeight: '100%' }}
            useCSSTransforms={true}
          >
            {canvasElements.map((item) => (
              <div key={item.id} className={`grid-item h-full drag-handle`}>
                <CanvasItemContent id={item.id} type={item.type} config={item.config} />
              </div>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      </section>
    </main>
  );
}