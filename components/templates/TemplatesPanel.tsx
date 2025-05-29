import { categories } from "@/config";
import {
  FilterIcon,
  LayoutGridIcon,
  LayoutTemplate,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

export const templates = [
  {
    title: "Landing Clásica",
    description: "Header + Hero + Contenido + Footer",
    structure: (
      <div className="space-y-1.5">
        <div className="h-3 bg-cyan-500/30 rounded-full" />
        <div className="h-8 bg-purple-500/30 rounded-lg" />
        <div className="h-20 bg-rose-500/30 rounded-lg" />
        <div className="h-24 bg-emerald-500/30 rounded-lg" />
        <div className="h-3 bg-cyan-500/30 rounded-full" />
      </div>
    ),
  },
  {
    title: "Dashboard",
    description: "Sidebar + Header + Contenido",
    structure: (
      <div className="flex gap-1.5 h-28">
        <div className="w-1/4 bg-amber-500/30 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-blue-500/30 rounded-full" />
          <div className="h-22 bg-indigo-500/30 rounded-lg" />
        </div>
      </div>
    ),
  },
  {
    title: "Blog Moderno",
    description: "Header + Contenido + Sidebar + Footer",
    structure: (
      <div className="space-y-1.5 h-24">
        <div className="h-3 bg-cyan-500/30 rounded-full" />
        <div className="flex gap-1.5 flex-1">
          <div className="w-3/4 bg-purple-500/30 rounded-lg" />
          <div className="w-1/4 bg-emerald-500/30 rounded-lg" />
        </div>
        <div className="h-3 bg-cyan-500/30 rounded-full" />
      </div>
    ),
  },
  {
    title: "Portafolio",
    description: "Hero Fullscreen + Grid + Contacto",
    structure: (
      <div className="space-y-1.5 h-24">
        <div className="h-12 bg-rose-500/30 rounded-lg" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 bg-blue-500/30 rounded" />
          <div className="h-6 bg-blue-500/30 rounded" />
        </div>
        <div className="h-6 bg-amber-500/30 rounded-lg" />
      </div>
    ),
  },
  {
    title: "Tienda Online",
    description: "Navbar complejo + Product Grid + Carrito",
    structure: (
      <div className="space-y-1.5 h-24">
        <div className="h-6 bg-purple-500/30 rounded-lg" />
        <div className="h-4 bg-cyan-500/30 rounded-full" />
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 bg-emerald-500/30 rounded" />
          ))}
        </div>
      </div>
    ),
  },
];

type Template = (typeof templates)[0];

export const TemplateCard = ({ title, description, structure }: Template) => (
  <li
    className="group relative p-4 rounded-xl bg-neutral-800/50 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
    onClick={() => console.log(`Selected template: ${title}`)}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <article className="relative z-10">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
            <span className="group-hover:text-cyan-300 transition-colors">
              {title}
            </span>
          </h4>
          <p className="text-xs text-neutral-400 mt-1.5 group-hover:text-neutral-300 transition-colors">
            {description}
          </p>
        </div>

        <button className="p-1.5 text-neutral-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 p-3 bg-neutral-900/70 rounded-lg border border-white/5 shadow-inner shadow-black/30 group-hover:shadow-cyan-500/10 transition-all">
        {structure}
      </div>
    </article>

    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan-500/20 transition-colors pointer-events-none" />
  </li>
);

export const TemplatesPanel = () => {
  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-80 flex flex-col">
      <header className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-cyan-400" />
          Plantillas
        </h3>
        <p className="text-sm text-neutral-400 mt-1">
          Estructuras predefinidas para tu página
        </p>
      </header>

      <ul className="p-3 border-b border-white/10 bg-neutral-900/30 backdrop-blur-sm">
        <li className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap flex-shrink-0 transition-all ${
                index === 0
                  ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                  : "bg-neutral-800/50 border border-white/10 text-neutral-300 hover:border-cyan-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </li>
      </ul>

      <section className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
        <label className="relative ">
          <input
            type="search"
            placeholder="Buscar plantillas..."
            className="w-full bg-neutral-800/50 border mb-4 border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all pl-10"
          />
          <SearchIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </label>
        <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2 px-1">
          <StarIcon className="w-4 h-4 text-amber-400" />
          <span>Populares</span>
        </h4>

        <ul className="space-y-3">
          {templates.slice(0, 3).map((tpl) => (
            <TemplateCard key={tpl.title} {...tpl} />
          ))}
        </ul>
      </section>
    </section>
  );
};
