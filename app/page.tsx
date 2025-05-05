import CanvasArea from "@/components/Editor/CanvasArea";
import { PropertiesPanel } from "@/components/Editor/PropertiesPanel";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <CanvasArea />
      <Sidebar />
      {/* <PropertiesPanel /> */}
    </>
  );
}
