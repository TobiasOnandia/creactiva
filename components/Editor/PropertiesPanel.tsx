import { Box, CogIcon, LayoutGridIcon, PaletteIcon } from "lucide-react";

export function PropertiesPanel() {
  return (
    <aside className="fixed inset-y-0 right-0 z-50 flex bg-neutral-900/80 backdrop-blur-xl border-l border-white/10">
      {/* Panel de Propiedades Expandido */}
      <div className="h-full bg-neutral-900/80 backdrop-blur-xl shadow-xl shadow-black/40 w-72">
        {/* Encabezado */}
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" />
            Propiedades del Elemento
          </h3>
          <p className="text-sm text-neutral-400 mt-1">Sección actual: Hero</p>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full h-[calc(100vh-140px)]">
          {/* Sección Layout */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <LayoutGridIcon className="w-4 h-4 text-cyan-400" />
              Diseño
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-400">Ancho</label>
                <input
                  type="text"
                  className="bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 w-24 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                  value="100%"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-400">Altura</label>
                <input
                  type="text"
                  className="bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 w-24 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                  value="Auto"
                />
              </div>

              <div className="relative pt-4">
                <label className="absolute top-0 left-0 text-xs text-neutral-400">
                  Padding
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["T", "R", "B", "L"].map((side) => (
                    <input
                      key={side}
                      type="number"
                      className="bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 text-center focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                      placeholder={side}
                      value="16"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sección Apariencia */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <PaletteIcon className="w-4 h-4 text-cyan-400" />
              Apariencia
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-400">
                  Color de fondo
                </label>
                <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/10 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/80 to-purple-500/80" />
                  <div className="absolute inset-[1px] bg-neutral-900 rounded-[5px]" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-400">Opacidad</label>
                <div className="w-24 h-1.5 bg-neutral-800 rounded-full relative">
                  <div className="absolute h-full w-3/4 bg-cyan-500 rounded-full" />
                  <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -translate-y-1/2 top-1/2 right-[25%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Borde</label>
                  <select className="w-full bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20">
                    <option>Solido</option>
                    <option>Punteado</option>
                    <option>Dashed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Radio</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                    value="12px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección Avanzada */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <CogIcon className="w-4 h-4 text-cyan-400" />
              Avanzado
            </h4>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Sombra</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                    value="0 4px 24px #000"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400">Z-index</label>
                  <input
                    type="number"
                    className="w-full bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                    value="1"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Clases CSS</label>
                <input
                  type="text"
                  className="w-full bg-neutral-800/50 border border-white/10 rounded-md px-2 py-1 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
                  placeholder="custom-class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
