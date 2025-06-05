"use client";

import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "@/components/canvas/CanvasItemContent";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCanvasStore } from "@/store/canvasStore";
import { useCanvasLayout } from "@/hooks/useCanvasLayout";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { DEVICE_CONFIG, GRID_CONFIG } from "@/config";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Componente para el header de la sección
const SectionHeader = ({ sectionName }: { sectionName?: string }) => (
  <div className="absolute top-0 left-0 right-0 p-4 text-center">
    <h2 className="text-sm font-medium text-neutral-400">
      {sectionName || "Sin sección seleccionada"}
    </h2>
  </div>
);

const GridContainer = ({ 
  children, 
  activeDevice, 
  isEditMode 
}: { 
  children: React.ReactNode;
  activeDevice: string;
  isEditMode: boolean;
}) => (
  <article className={`
    relative z-50 flex-grow bg-neutral-900/80 backdrop-blur-sm h-full 
    border-2 border-dashed border-neutral-800 rounded-xl shadow-2xl 
    shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 
    group w-full ${DEVICE_CONFIG[activeDevice].maxWidth} p-6 flex flex-col
    ${isEditMode ? 'edit-mode' : ''}
  `}>
    {children}
  </article>
);

export function CanvasArea() {
  // Store hooks
  const canvasElements = useCanvasStore((state) => state.canvasElements);
  const activeSectionId = useCanvasStore((state) => state.activeSectionId);
  const sections = useCanvasStore((state) => state.sections);
  const addElementToSection = useCanvasStore((state) => state.addElementToSection);
  const updateSectionLayout = useCanvasStore((state) => state.updateSectionLayout);
  const activeDevice = useCanvasStore((state) => state.activeDevice);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  // Computed values
  const activeSection = sections.find(s => s.id === activeSectionId);

  // Custom hooks
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
        <GridContainer activeDevice={activeDevice} isEditMode={isEditMode}>
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
            isDraggable={!isEditMode}
            isResizable={!isEditMode}
            isDroppable={!isEditMode}
            autoSize={true}
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
              <div key={item.id} className={`grid-item h-full ${isEditMode ? 'no-drag' : ''}`}>
                <CanvasItemContent id={item.id} type={item.type} config={item.config} />
              </div>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      </section>
    </main>
  );
}