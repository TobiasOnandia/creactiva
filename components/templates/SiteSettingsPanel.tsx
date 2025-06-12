"use client"; 

import { Settings,  Code, Search } from 'lucide-react';
import Image from 'next/image';

export const SiteSettingsPanel = () => {
  return (
    <aside className=" h-screen w-80 bg-neutral-900 border-x border-neutral-800 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
      <header className="flex items-center gap-3 pb-4 border-b border-neutral-800">
        <Settings className="w-6 h-6 text-emerald-500" />
        <h2 className="text-xl font-semibold text-neutral-200 tracking-wide">
          Configuración del Sitio
        </h2>
      </header>

      <section className="space-y-4">
        <header className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <h4 className="text-sm font-medium text-neutral-300 tracking-wide flex-1">
            General
          </h4>
        </header>
            <label htmlFor="siteName" className="text-sm text-neutral-400">
              Nombre del Sitio
            <input
              type="text"
              id="siteName"
              className="w-full px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              placeholder="Mi increíble sitio web"
              defaultValue="Mi Sitio Web"
            />
            </label>
            <label htmlFor="favicon" className="text-sm text-neutral-400">
              Favicon URL
            <figure className="flex items-center gap-2">
              <Image src="https://www.google.com/favicon.ico" alt="Favicon" width={24} height={24} className="rounded-md border border-neutral-700 flex-shrink-0" unoptimized />
              <input
                type="text"
                id="favicon"
                className="w-full px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
                placeholder="https://tudominio.com/favicon.ico"
                defaultValue="https://www.google.com/favicon.ico"
              />
            </figure>
            </label>
      </section>

      <section className="space-y-4">
        <header className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <h4 className="text-sm font-medium text-neutral-300 tracking-wide flex-1">
            SEO
          </h4>
          <Search className="w-4 h-4 text-neutral-500" />
        </header>
            <label htmlFor="seoTitle" className="text-sm text-neutral-400">
              Título de Página (SEO)
            <input
              type="text"
              id="seoTitle"
              className="w-full px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              placeholder="Título para buscadores"
              defaultValue="Mi Sitio Web - Inicio"
            />
            </label>

            <label htmlFor="metaDescription" className="text-sm text-neutral-400">
              Meta Descripción
            <textarea
              id="metaDescription"
              rows={3}
              className="w-full px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs resize-y focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              placeholder="Una breve descripción de tu sitio web para los motores de búsqueda."
              defaultValue="Diseña tu propio sitio web con nuestra intuitiva herramienta de arrastrar y soltar."
            />
            </label>
      </section>


      <section className="space-y-4">
        <header className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <h4 className="text-sm font-medium text-neutral-300 tracking-wide flex-1">
            Código Personalizado
          </h4>
          <Code className="w-4 h-4 text-neutral-500" />
        </header>
            <label htmlFor="headScripts" className="text-sm text-neutral-400">
              Scripts en &lt;head&gt;
            <textarea
              id="headScripts"
              rows={5}
              className="w-full px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs font-mono resize-y focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              placeholder={``}
              defaultValue={`<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`}
            />
            </label>
            <label htmlFor="bodyScripts" className="text-sm text-neutral-400">
              Scripts antes de &lt;/body&gt;
            <textarea
              id="bodyScripts"
              rows={5}
              className="w-full px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-neutral-300 text-xs font-mono resize-y focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
              placeholder={``}
              defaultValue={`<script>/* Tu código JS personalizado */</script>`}
            />
            </label>
      </section>
    </aside>
  );
};