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
import { MobileElementToolbar } from "@/components/ui/canvas/MobileElementToolbar";
import { PreviewContent } from "@/components/preview/PreviewContent";
import { useElementSelection } from "@/hooks/useElementSelection";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function MobileCanvasArea() {
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

  const {
    selectedElementId,
    selectElement,
    deselectElement,
    isElementSelected,
  } = useElementSelection();

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
    if (isElementSelected(elementId)) {
      deselectElement();
    } else {
      selectElement(elementId);
    }
  };

  const handleCanvasClick = () => {
    deselectElement();
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
        className="absolute inset-0 p-4 flex z-10 items-center justify-center overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full"
        onClick={handleCanvasClick}
      >
        <GridContainer activeDevice={activeDevice}>
          <div data-editor-ui className="mb-4">
            <SectionHeader sectionName={activeSection?.name} />
          </div>

          <ResponsiveGridLayout
            className="layout h-full"
            layouts={currentLayouts}
            breakpoints={{
              lg: 1200,
              md: 996,
              sm: 768,
              xs: 480,
              xxs: 0,
            }}
            cols={{
              lg: 12, // Reducido para mobile
              md: 10,
              sm: 8,
              xs: 6,
              xxs: 4,
            }}
            rowHeight={GRID_CONFIG.rowHeight}
            onLayoutChange={handleLayoutChangeWithBreakpoint}
            autoSize={true}
            isDraggable={!selectedElementId}
            isResizable={!selectedElementId}
            isDroppable={true}
            draggableCancel=".no-drag, .mobile-toolbar-menu"
            draggableHandle=".mobile-drag-handle"
            droppingItem={{
              i: "dropping-item",
              w: 4, // Tamaño más pequeño para mobile
              h: 3,
            }}
            onDrop={handleDrop}
            compactType={null}
            preventCollision={true}
            style={{ minHeight: "100%" }}
            useCSSTransforms={true}
            margin={[8, 8]} // Menor margen para mobile
          >
            {canvasElements.map((item) => (
              <div key={item.id} className="grid-item h-full relative group">
                {/* Mobile drag handle - más grande y visible */}
                {!isPreviewMode && !selectedElementId && (
                  <div
                    data-drag-handle
                    className="mobile-drag-handle absolute -top-2 -left-2 w-8 h-8 bg-cyan-500 rounded-full opacity-80 hover:opacity-100 transition-opacity cursor-move flex items-center justify-center shadow-lg border-2 border-white/20"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </div>
                )}

                {/* Mobile Element Toolbar */}
                {!isPreviewMode && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mobile-toolbar-menu"
                  >
                    <MobileElementToolbar
                      elementId={item.id}
                      onEdit={() => openStylePanel(item.id)}
                      onDuplicate={() => duplicateElement(item.id)}
                      visible={isElementSelected(item.id)}
                    />
                  </div>
                )}

                <div
                  data-element
                  className={`no-drag h-full w-full transition-all rounded-lg touch-manipulation ${
                    !isPreviewMode
                      ? `
                      ${
                        isElementSelected(item.id)
                          ? "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/5"
                          : "hover:ring-2 hover:ring-cyan-500/30 active:ring-2 active:ring-cyan-500/50"
                      }
                      ${
                        selectedElementId && !isElementSelected(item.id)
                          ? "opacity-50"
                          : ""
                      }
                    `
                      : ""
                  }`}
                  onClick={(e) =>
                    !isPreviewMode && handleElementClick(item.id, e)
                  }
                  style={{
                    minHeight: "60px", // Altura mínima para elementos táctiles
                    minWidth: "80px", // Ancho mínimo para elementos táctiles
                  }}
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

      {/* Indicador de elementos seleccionados */}
      {selectedElementId && !isPreviewMode && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
          <p className="text-xs text-cyan-400 font-medium">
            Elemento seleccionado • Toca las opciones para editar
          </p>
        </div>
      )}
    </main>
  );
}
