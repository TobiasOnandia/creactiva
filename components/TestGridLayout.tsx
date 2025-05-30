"use client";
import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // ¡CRUCIAL!

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayout: Layout[] = [
  { i: "a", x: 0, y: 0, w: 2, h: 2 },
  { i: "b", x: 2, y: 0, w: 2, h: 2 },
  { i: "c", x: 4, y: 0, w: 2, h: 2 },
];

export function TestGridLayout() {
  const [layout, setLayout] = useState<Layout[]>(initialLayout);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  return (
    <div
      style={{ width: "80%", margin: "20px auto", border: "1px solid gray" }}
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }} // Pasar el layout al breakpoint lg
        cols={{ lg: 12 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true} // ¡Esto es clave!
      >
        <div key="a" style={{ background: "lightblue" }}>
          A
        </div>
        <div key="b" style={{ background: "lightgreen" }}>
          B
        </div>
        <div key="c" style={{ background: "lightcoral" }}>
          C
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
