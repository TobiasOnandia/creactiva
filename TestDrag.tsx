"use client";
import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function TestDrag() {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const onDrop = (curLayout: Layout[], droppedItem: Layout, e: DragEvent) => {
    const type = e.dataTransfer?.getData("text/plain");
    console.log("tipo recibido en onDrop:", type);
    if (!type) return;
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, id]);
    setLayout((prev) => [
      ...prev,
      { i: id, x: droppedItem.x, y: droppedItem.y, w: 3, h: 2 },
    ]);
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Sidebar con un solo ítem draggable */}
      <div>
        <button
          id="mi-tipo"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", "mi-tipo");
          }}
        >
          Arrástrame
        </button>
      </div>

      {/* Grid donde soltar */}
      <div
        style={{ width: 600, height: 400, border: "1px solid #555" }}
        onDragOver={(e) => e.preventDefault()}
      >
        <ResponsiveGridLayout
          className="layout"
          layouts={{
            lg: layout,
            md: layout,
            sm: layout,
            xs: layout,
            xxs: layout,
          }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          isDroppable={true}
          droppingItem={{ i: "dropping-item", w: 3, h: 2 }}
          onDrop={(l, item, e) => onDrop(l, item, e as DragEvent)}
        >
          {items.map((id) => (
            <div key={id} style={{ background: "#28a" }}>
              <span style={{ color: "white" }}>{id}</span>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
