import { CanvasArea } from "@/components/canvas/CanvasArea";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StylePanel } from "@/components/templates/StylePanel";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <CanvasArea />
        <StylePanel />
      </div>
    </>
  );
}
