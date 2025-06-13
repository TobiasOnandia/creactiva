"use client";

import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "@/components/canvas/CanvasItemContent";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCanvasStore } from "@/store/canvasStore";
import { useCanvasLayout } from "@/hooks/useCanvasLayout";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { GRID_CONFIG } from "@/config";
import { GridContainer } from "@/components/ui/canvas/GridContainer";
import { SectionHeader } from "@/components/ui/canvas/SectionHeader";
import { ElementToolbar } from "@/components/ui/canvas/ElementToolbar";
import { PreviewContent } from "@/components/preview/PreviewContent";
import { useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function CanvasArea() {
  const {
    canvasElements,
    activeSectionId,
    sections,
    isPreviewMode,
    activeDevice,
    updateSectionLayout,
    openStylePanel,
    duplicateElement,
  } = useCanvasStore();

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const activeSection = sections.find((s) => s.id === activeSectionId);

  const { currentLayouts, setCurrentLayouts, handleLayoutChange } =
    useCanvasLayout(
      activeSectionId,
      activeSection,
      canvasElements,
      updateSectionLayout
    );

  const { handleDrop } = useDragAndDrop(currentLayouts.lg, (layout) => {
    setCurrentLayouts((prev) => ({ ...prev, lg: layout }));
  });

  const handleElementClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(elementId);
  };

  const handleLayoutChangeWithBreakpoint = (
    layout: Layout[],
    layouts: { [key: string]: Layout[] }
  ) => {
    Object.keys(layouts).forEach((breakpoint) => {
      handleLayoutChange(layouts[breakpoint], breakpoint);
    });
  };

  if (isPreviewMode) {
    return <PreviewContent />;
  }

  return (
    <main
      className={`relative w-full h-screen overflow-hidden ${
        isPreviewMode
          ? "bg-white"
          : "bg-gradient-to-br from-neutral-950 to-neutral-900/80"
      }`}
    >
      {!isPreviewMode && <BackgroundCanvas />}

      <section
        data-canvas
        className="absolute inset-0 p-8 flex items-center justify-center overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full"
      >
        <GridContainer activeDevice={activeDevice}>
          <div data-editor-ui>
            <SectionHeader sectionName={activeSection?.name} />
          </div>

          <ResponsiveGridLayout
            className="layout h-full"
            layouts={currentLayouts}
            breakpoints={GRID_CONFIG.breakpoints}
            cols={GRID_CONFIG.cols}
            rowHeight={GRID_CONFIG.rowHeight}
            onLayoutChange={handleLayoutChangeWithBreakpoint}
            autoSize={true}
            isDraggable={true}
            isResizable={true}
            isDroppable={true}
            draggableCancel=".no-drag"
            draggableHandle=".drag-handle"
            droppingItem={{
              i: "dropping-item",
              w: GRID_CONFIG.defaultSize.w,
              h: GRID_CONFIG.defaultSize.h,
            }}
            onDrop={handleDrop}
            compactType={null}
            preventCollision={true}
            style={{ minHeight: "100%" }}
            useCSSTransforms={true}
          >
            {canvasElements.map((item) => (
              <div key={item.id} className="grid-item h-full relative group">
                {!isPreviewMode && (
                  <div
                    data-drag-handle
                    className="drag-handle absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-20 flex items-center justify-center"
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </div>
                )}

                {!isPreviewMode && (
                  <ElementToolbar
                    elementId={item.id}
                    onEdit={() => openStylePanel(item.id)}
                    onDuplicate={() => duplicateElement(item.id)}
                    visible={selectedElementId === item.id}
                  />
                )}

                <div
                  data-element
                  className={`no-drag h-full w-full cursor-pointer transition-all rounded ${
                    !isPreviewMode
                      ? `
                      ${
                        selectedElementId === item.id
                          ? "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20"
                          : "hover:ring-2 hover:ring-cyan-500/30"
                      }
                      ${
                        selectedElementId && selectedElementId !== item.id
                          ? "opacity-50"
                          : ""
                      }
                    `
                      : ""
                  }`}
                  onClick={(e) =>
                    !isPreviewMode && handleElementClick(item.id, e)
                  }
                >
                  <CanvasItemContent
                    id={item.id}
                    type={item.type}
                    config={item.config}
                  />
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      </section>
    </main>
  );
}
