import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CanvasItemContent } from "../content/CanvasItemContent";

export function CanvasArea() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
      <BackgroundCanvas />
      <section className="relative h-full w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <article className="min-h-full min-w-full flex items-center justify-center p-8">
          <div className="relative bg-neutral-900/80 backdrop-blur-sm min-h-[768px] h-auto border-2 border-dashed border-neutral-800 rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full max-w-4xl p-6">
            {["header"].map((element) => (
              <CanvasItemContent key={element} type={"header"} />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
