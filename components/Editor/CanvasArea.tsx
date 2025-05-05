import { ImageIcon, PlusIcon, StarIcon, TextIcon } from "lucide-react";

export default function CanvasArea() {
  return (
    <main className="relative ml-16 mt-16 h-[calc(100vh-4rem)] bg-gradient-to-br from-neutral-950 to-neutral-900/80 overflow-hidden">
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
        <article className="min-h-full min-w-full flex items-center justify-center p-8">
          <div className="relative bg-neutral-900/80 backdrop-blur-sm border-2 border-dashed border-white/10 rounded-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/30 group w-full max-w-4xl">
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

            {/* Secciones editables */}
            <section className="p-8 space-y-6">
              {/* Hero Section */}
              <header className="relative bg-neutral-800/50 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors cursor-move">
                <div className="flex flex-col items-center text-center space-y-4">
                  <h1 className="text-4xl font-bold bg-[linear-gradient(97deg,_#7DFFB2_-12.5%,_#72BAE8_50%,_#C792EA_112.5%)] bg-clip-text text-transparent">
                    Titulo Principal
                  </h1>
                  <p className="text-neutral-400 max-w-xl">
                    Descripción o texto introductorio para tu página. Edita este
                    contenido directamente haciendo clic.
                  </p>
                </div>
              </header>

              {/* Grid de características */}
              <article className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="relative space-y-2 bg-neutral-800/50 rounded-xl p-4 border border-white/10 hover:border-cyan-500/30 transition-colors cursor-move"
                  >
                    <span className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-cyan-400" />
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-200">
                      Característica {item}
                    </h3>
                    <p className="text-sm  text-neutral-400">
                      Descripción de la característica...
                    </p>
                  </div>
                ))}
              </article>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}
