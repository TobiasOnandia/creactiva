import { PlusIcon } from "lucide-react";

export const SecondaryPanel = () => {
  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-72">
      <header className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-neutral-200">Páginas</h3>
        <p className="text-sm text-neutral-400 mt-1">
          Gestiona tu estructura de contenido
        </p>
      </header>

      {/* Contenido del Panel */}
      <section className="p-4">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 border border-white/10 hover:border-cyan-500/30 transition-colors duration-300">
          <PlusIcon className="w-5 h-5 text-cyan-400" />
          <span className="text-neutral-200 text-sm font-medium">
            Nueva Página
          </span>
        </button>
      </section>
    </section>
  );
};
