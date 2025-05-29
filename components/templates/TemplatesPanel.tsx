import { categories } from "@/config";
import { LayoutTemplate, SearchIcon } from "lucide-react";

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

const TemplateCard = ({ title, description, structure }: Template) => (
  <div className="p-4 border-b border-white/10">
    <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
      {title}
    </h4>
    <p className="text-xs text-neutral-400 mt-1">{description}</p>
    {structure}
  </div>
);

export const TemplatesPanel = () => {
  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-80 flex flex-col">
      <header className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-cyan-400" />
            Plantillas
          </h3>
          <button className="p-1.5 hover:bg-neutral-800/50 rounded-lg">
            <SearchIcon className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
        <p className="text-sm text-neutral-400 mt-1">
          Estructuras predefinidas para tu página
        </p>
      </header>

      <article className="flex items-center gap-1 p-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-3 py-1 text-xs text-neutral-200 rounded-md bg-neutral-800/50 border border-white/10 hover:border-cyan-500/30 transition-colors"
          >
            {cat}
          </button>
        ))}
      </article>

      <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 p-4">
        <article className="space-y-4">
          {templates.map((tpl) => (
            <TemplateCard key={tpl.title} {...tpl} />
          ))}
        </article>
      </section>
    </section>
  );
};
