"use client";

import React, { useState, useEffect } from "react";
import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "@/components/content/CanvasItemContent";
import { Responsive, Layout, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface CanvasElement {
  id: string;
  type: string;
}

export function CanvasArea() {
  const initialCanvasElements: CanvasElement[] = [
    { id: "item1", type: "header" },
    { id: "item2", type: "text" },
    { id: "item3", type: "image" },
    { id: "item4", type: "button" },
    { id: "item5", type: "video" },
    { id: "item6", type: "gallery" },
    { id: "item7", type: "select" },
  ];

  const [currentLayout, setCurrentLayout] = useState<Layout[]>([]);

  useEffect(() => {
    if (initialCanvasElements.length > 0 && currentLayout.length === 0) {
      const generatedLayout: Layout[] = initialCanvasElements.map(
        (item, index) => ({
          i: item.id,
          x: (index * 2) % 12,
          y: Math.floor(index / 6) * 2,
          w: 2,
          h: 2,
          minW: 1,
          minH: 1,
        })
      );
      setCurrentLayout(generatedLayout);
    }
  }, [initialCanvasElements, currentLayout]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setCurrentLayout(newLayout);
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
      <BackgroundCanvas />

      <section className="absolute inset-0 p-8 flex items-center justify-center overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <article className="relative bg-neutral-900/80 backdrop-blur-sm min-h-[768px] h-auto border-2 border-dashed border-neutral-800 rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full max-w-4xl p-6">
          {currentLayout.length > 0 ? (
            <ResponsiveGridLayout
              className="layout"
              layouts={{
                lg: currentLayout,
                md: currentLayout,
                sm: currentLayout,
                xs: currentLayout,
                xxs: currentLayout,
              }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={30}
              onLayoutChange={handleLayoutChange}
              isDraggable={true}
              isResizable={true}
              compactType="vertical"
              preventCollision={true}
            >
              {initialCanvasElements.map((item) => (
                <div key={item.id} className="grid-item">
                  <CanvasItemContent type={item.type} />
                </div>
              ))}
            </ResponsiveGridLayout>
          ) : (
            <p className="flex items-center justify-center h-full text-neutral-400">
              Cargando elementos del canvas...
            </p>
          )}
        </article>
      </section>
    </main>
  );
}
