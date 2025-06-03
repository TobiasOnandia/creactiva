"use client";
import { useState } from "react";
import { 
  LayoutGrid, 
  Trash2,
  FolderPlus,
  Search,
} from 'lucide-react';

export function PagesPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const pages = [
    { id: 1, name: "Inicio", isHome: true, updated: "Hoy" },
    { id: 2, name: "Sobre Nosotros", isHome: false, updated: "Ayer" },
    { id: 3, name: "Servicios", isHome: false, updated: "Ayer" },
    { id: 4, name: "Contacto", isHome: false, updated: "Hace 3 días" },
  ];

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="flex h-screen z-100 bg-neutral-900/80 backdrop-blur-xl border-r border-white/10">
        <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-72 flex flex-col">
          <header className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-cyan-400" />
                Páginas
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Gestiona las páginas de tu sitio web
            </p>
          </header>

          <div className="p-4 border-b border-white/10">
            <label className="relative">
              <input
                type="text"
                placeholder="Buscar páginas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-800/50 border border-white/10 rounded-xl px-3 pl-10 py-2 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </label>
            
            <button 
              className="mt-3 w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              <FolderPlus className="w-5 h-5" />
              <span className="text-neutral-200 text-sm font-medium">
                Nueva Página
              </span>
            </button>
          </div>

            <ul className="p-4 space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
              {filteredPages.map((page) => (
                <li
                  key={page.id}
                  className="group relative flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 border border-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <h6 className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm text-neutral-200 truncate">
                      {page.name}
                    </span>
                  </h6>
                  
                    <button 
                      className="p-1 cursor-pointer hover:bg-red-500/10 rounded-md text-red-400 hover:text-red-300"
                      title="Eliminar página"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                </li>
              ))}
            </ul>
        </section>
    </aside>
  );
}