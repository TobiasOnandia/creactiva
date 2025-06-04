"use client";
import { useState } from "react";
import { 
  LayoutGrid, 
  Trash2,
  FolderPlus,
  Search,
  HomeIcon,
  GripVertical,
} from 'lucide-react';
import { useCanvasStore, Section } from "@/store/canvasStore";

export function PagesPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const activeSectionId = useCanvasStore((state) => state.activeSectionId);
  const sections = useCanvasStore((state) => state.sections);
  const addSection = useCanvasStore((state) => state.addSection);
  const removeSection = useCanvasStore((state) => state.removeSection);
  const setActiveSection = useCanvasStore((state) => state.setActiveSection);

  const handleAddSection = () => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      name: "Nueva Sección",
      slug: "nueva-seccion-" + Date.now(),
      elements: [],
      layout: [],
    };
    addSection(newSection);
  };

  const filteredSections = sections.filter(section => 
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="flex h-screen z-100 bg-neutral-900/80 backdrop-blur-xl border-r border-white/10">
      <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-72 flex flex-col">
        <header className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-cyan-400" />
            Secciones
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            Gestiona las secciones de tu sitio web
          </p>
        </header>

        <div className="p-4 border-b border-white/10">
          <label className="relative">
            <input
              type="text"
              placeholder="Buscar secciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-800/50 border border-white/10 rounded-xl px-3 pl-10 py-2 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </label>
          
          <button 
            onClick={handleAddSection}
            className="mt-3 w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            <FolderPlus className="w-5 h-5" />
            <span className="text-neutral-200 text-sm font-medium">
              Nueva Sección
            </span>
          </button>
        </div>

        <ul className="p-4 space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
          {filteredSections.map((section) => (
            <li
              key={section.id}
              className={`group relative flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer ${
                section.id === activeSectionId
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-neutral-800/50 hover:bg-neutral-800 border-white/10 hover:border-cyan-500/30"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <GripVertical className="w-4 h-4 text-neutral-500 cursor-move" />
              {section.isHome && (
                <HomeIcon className="w-4 h-4 text-amber-400" />
              )}
              <h6 className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-sm truncate">
                  {section.name}
                </span>
              </h6>
              
              {!section.isHome && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(section.id);
                  }}
                  className="p-1 cursor-pointer hover:bg-red-500/10 rounded-md text-red-400 hover:text-red-300"
                  title="Eliminar sección"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}