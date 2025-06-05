"use client";

import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "@/components/canvas/CanvasItemContent";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCanvasStore } from "@/store/canvasStore";
import { useCanvasLayout } from "@/hooks/useCanvasLayout";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { GRID_CONFIG } from "@/config";
import { GridContainer } from "@/components/ui/canvas/GridContainer";
import { SectionHeader } from "@/components/ui/canvas/SectionHeader";
import { ElementToolbar } from "@/components/ui/canvas/ElementToolbar";
import { useState } from "react";
import { GripVertical } from 'lucide-react'; 

const ResponsiveGridLayout = WidthProvider(Responsive);

export function CanvasArea() {
  const canvasElements = useCanvasStore((state) => state.canvasElements);
  const activeSectionId = useCanvasStore((state) => state.activeSectionId);
  const sections = useCanvasStore((state) => state.sections);
  const addElementToSection = useCanvasStore((state) => state.addElementToSection);
  const updateSectionLayout = useCanvasStore((state) => state.updateSectionLayout);
  const activeDevice = useCanvasStore((state) => state.activeDevice);
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const deleteElement = useCanvasStore((state) => state.deleteElement);
  const duplicateElement = useCanvasStore((state) => state.duplicateElement);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);

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

  const handleElementClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(elementId);
  };

  const handleElementHover = (elementId: string) => {
    setHoveredElementId(elementId);
  };

  const handleElementLeave = () => {
    setHoveredElementId(null);
  };

  const handleMainClick = () => {
    setSelectedElementId(null);
  };

  return (
    <main 
      className="relative w-full h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden"
      onClick={handleMainClick}
    >
      <BackgroundCanvas />
      
      <section className="absolute inset-0 p-8 flex items-center justify-center overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <GridContainer activeDevice={activeDevice}>
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
            isDraggable={true}
            isResizable={true}
            isDroppable={true}
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
              <div 
                key={item.id} 
                className="grid-item h-full relative group"
                onMouseEnter={() => handleElementHover(item.id)}
                onMouseLeave={handleElementLeave}
              >
                <div className="drag-handle absolute -top-3 -left-3 w-8 h-8 bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-grab z-20 flex items-center justify-center border border-neutral-700 shadow-md group-hover:shadow-lg group-hover:bg-neutral-700 group-hover:border-cyan-500/50">
                  <GripVertical className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                </div>

                <ElementToolbar
                  elementId={item.id}
                  onEdit={() => openStylePanel(item.id)}
                  onDuplicate={() => duplicateElement(item.id)}
                  onDelete={() => deleteElement(item.id)}
                  visible={hoveredElementId === item.id || selectedElementId === item.id}
                />
                
                <div 
                  className={`no-drag h-full w-full cursor-pointer transition-all rounded
                    ${selectedElementId === item.id ? 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20' : 'hover:ring-2 hover:ring-cyan-500/30'}
                    ${selectedElementId && selectedElementId !== item.id ? 'opacity-50' : ''}`}
                  onClick={(e) => {
                    openStylePanel(item.id)
                    handleElementClick(item.id, e)
                  }}
                >
                  <CanvasItemContent id={item.id} type={item.type} config={item.config} />
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      </section>
    </main>
  );
}