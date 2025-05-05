import { useDroppable } from "@dnd-kit/core";
import { ImageIcon, PlusIcon, StarIcon, TextIcon } from "lucide-react";

interface CanvasAreaProps {
  droppedElements: {
    id: string;
    type: string;
    label: string;
    colorClass: string;
  }[];
}

export default function CanvasArea({ droppedElements }: CanvasAreaProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas",
  });

  const dropTargetStyle = {
    borderColor: isOver
      ? "rgba(96, 165, 250, 0.5)"
      : "rgba(255, 255, 255, 0.1)", // Cian o Blanco/10
    // Quizás cambia un poco el fondo también
    backgroundColor: isOver
      ? "rgba(96, 165, 250, 0.05)"
      : "rgba(161, 161, 170, 0.05)", // Un tinte ligeramente azul/gris
  };

  return (
    <main className="relative  h-screen bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
      {/* Grid de fondo interactivo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.03)_0%,_transparent_70%)]">
        <div
          className="absolute inset-0 opacity-20 [mask-image:linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Canvas Principal */}
      <section className="relative h-full w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        {/* Contenedor de la página editable */}
        <article className="min-h-full min-w-full  flex items-center justify-center p-8">
          <div
            ref={setNodeRef}
            style={dropTargetStyle}
            className="relative bg-neutral-900/80 backdrop-blur-sm h-124 border-2 border-dashed border-white/10 rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full max-w-4xl"
          >
            {/* Herramientas Flotantes */}
            <header className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-cyan-400">
                <PlusIcon className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-cyan-400">
                <TextIcon className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-cyan-400">
                <ImageIcon className="w-5 h-5" />
              </button>
            </header>

            <div className="space-y-4">
              {" "}
              {/* Usa un div para organizar los elementos soltados */}
              {droppedElements.map((element) => (
                // Deberías reemplazar este div placeholder por componentes reales
                // basados en element.type (ej: <TextBlock />, <ImageBlock />)
                <div
                  key={element.id} // Usa el ID único para la instancia
                  className="bg-neutral-800 border border-neutral-700 rounded-md p-4 text-neutral-300"
                >
                  <p>
                    <strong>Tipo:</strong> {element.type}
                  </p>
                  <p>
                    <strong>Etiqueta:</strong> {element.label}
                  </p>
                  {/* Ejemplo: Renderizar contenido diferente según el tipo */}
                  {element.type === "text" && (
                    <p className="mt-2 text-white">
                      Contenido de Texto Editable...
                    </p>
                  )}
                  {element.type === "image" && (
                    <div className="mt-2 w-32 h-20 bg-neutral-700 flex items-center justify-center text-neutral-400">
                      Placeholder de Imagen
                    </div>
                  )}
                  {element.type === "star" && (
                    <StarIcon className="mt-2 w-6 h-6 text-yellow-500" />
                  )}
                  {/* Añade más condiciones para otros tipos */}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
