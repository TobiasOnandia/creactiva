"use client";

import dynamic from "next/dynamic";

const CanvasEditor = dynamic(
  () => import("@/components/canvas/CanvasEditor").then((mod) => mod.CanvasEditor),
  { ssr: false }
);

export default function EditorPage() {
  return <CanvasEditor />;
}
