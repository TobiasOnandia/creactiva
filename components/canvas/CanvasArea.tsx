"use client";

import { useState } from "react";
import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "@/components/content/CanvasItemContent";
import { Responsive, Layout, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCanvasStore } from "@/store/canvasStore";
import { CanvasElement } from "@/types/CanvasTypes";
import { templateConfigs } from "@/config/templateConfigs";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEVICE_CONFIG = {
  mobile: {
    maxWidth: "max-w-sm",
  },
  tablet: {
    maxWidth: "max-w-3xl",
  },
  desktop: {
    maxWidth: "max-w-7xl",
  },
};

export function CanvasArea() {
  const [currentLayout, setCurrentLayout] = useState<Layout[]>([]);
  const canvasElements = useCanvasStore((state) => state.canvasElements);
  const addCanvasElement = useCanvasStore((state) => state.addCanvasElement);
  const addMultipleElements = useCanvasStore((state) => state.addMultipleElements);
  const isEditMode = useCanvasStore((state) => state.isEditMode);
  const activeDevice = useCanvasStore((state) => state.activeDevice);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setCurrentLayout(newLayout);
  };

  const handleDrop = (layout: Layout[], item: Layout, e: Event) => {
    const dragEvent = e as unknown as DragEvent;
    const droppedElementType = dragEvent.dataTransfer?.getData("text/plain");

    if (!droppedElementType) {
      console.error("No se pudo obtener el tipo del elemento arrastrado");
      return;
    }

    const templateConfig = templateConfigs[droppedElementType];
    if (templateConfig) {
      const elementsWithNewIds = templateConfig.elements.map(element => ({
        ...element,
        id: crypto.randomUUID()
      }));

      const layoutsWithNewIds = templateConfig.layout.map((layout, index) => ({
        ...layout,
        i: elementsWithNewIds[index].id,
        x: item.x,
        y: item.y + index * 2
      }));

      addMultipleElements(elementsWithNewIds);
      
      setCurrentLayout(prev => [...prev, ...layoutsWithNewIds]);
      return;
    }

    const newCanvasElementId = crypto.randomUUID();
    const newCanvasElement: CanvasElement = {
      id: newCanvasElementId,
      type: droppedElementType,
      config: {
        backgroundColor: droppedElementType === "button" ? "#3b82f6" : "transparent",
        color: droppedElementType === "button" ? "#ffffff" : "#f8fafc",
        fontSize: droppedElementType === "header" ? 24 : 16,
        padding: 16,
        paddingX: droppedElementType === "button" ? 24 : 16,
        paddingY: droppedElementType === "button" ? 12 : 16,
        borderRadius: 8,
        fontWeight: droppedElementType === "header" ? "bold" : "normal",
        lineHeight: 1.5,
        letterSpacing: 0.025,
        boxShadow: droppedElementType === "button" ? "0 1px 3px 0 rgba(0, 0, 0, 0.1)" : "none",
        content: droppedElementType === "header" ? "Encabezado" : 
                droppedElementType === "text" ? "Texto de ejemplo" :
                droppedElementType === "button" ? "Botón" :
                droppedElementType === "paragraph" ? "Párrafo de ejemplo con contenido más extenso para mostrar el diseño." :
                "Nuevo elemento",
        textAlign: droppedElementType === "header" || droppedElementType === "button" ? "center" : "left"
      }
    };

    const newLayoutItem: Layout = {
      i: newCanvasElementId,
      x: item.x,
      y: item.y,
      w: 4,
      h: 2,
      minH: 2,
      minW: 2,
      static: false,
      isDraggable: true,
    };
    
    addCanvasElement(newCanvasElement);
    setCurrentLayout((prev) => [...prev, newLayoutItem]);
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
      <BackgroundCanvas />
      <section className="absolute inset-0 p-8 flex items-center justify-center overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <article
          className={`relative z-50  flex-grow   bg-neutral-900/80 backdrop-blur-sm  h-full border-2 border-dashed border-neutral-800 rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full ${DEVICE_CONFIG[activeDevice].maxWidth} p-6 flex flex-col`}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('border-cyan-500');
            e.currentTarget.classList.add('border-neutral-800');
          }}
        >
            <ResponsiveGridLayout
              className="layout h-full"
              layouts={{
                lg: currentLayout,
                md: currentLayout,
                sm: currentLayout,
                xs: currentLayout,
                xxs: currentLayout,
              }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={90}
              onLayoutChange={handleLayoutChange}
              isDraggable={true}
              isDroppable={true}
              autoSize={true}
              droppingItem={{ i: "dropping-item", w: 2, h: 2 }}
              onDrop={handleDrop}
              isResizable={true}
              compactType={null}
              preventCollision={true}
              style={{ minHeight: '100%' }}
              useCSSTransforms={true}
              draggableCancel=".no-drag"
            >
              {canvasElements.map((item) => (
                <div key={item.id} className={`grid-item h-full ${isEditMode ? 'no-drag'  : '' }`}>
                  <CanvasItemContent id={item.id} type={item.type} config={item.config } />
                </div>
              ))}
            </ResponsiveGridLayout>
        </article>
      </section>
    </main>
  );
}
