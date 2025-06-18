"use client";
import { useState } from "react";
import {
  LayoutTemplate,
  SearchIcon,
  StarIcon,
  Plus,
  Check,
} from "lucide-react";
import { categories } from "@/config";
import {
  useAddTemplateMobile,
  TemplateType,
} from "@/hooks/useAddTemplateMobile";
import { templates } from "./TemplatesPanel";

export const MobileTemplatesPanel = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("Landing");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { addTemplateToCanvas, isAdding, lastAddedTemplate } =
    useAddTemplateMobile();

  const handleTemplateClick = async (templateType: TemplateType) => {
    if (isAdding) return;

    setSelectedTemplate(templateType);

    const success = await addTemplateToCanvas(templateType);

    if (success) {
      setTimeout(() => {
        setSelectedTemplate(null);
      }, 500);
    } else {
      setSelectedTemplate(null);
    }
  };

  const getTemplateState = (templateType: TemplateType) => {
    if (lastAddedTemplate === templateType) {
      return "success";
    }
    if (selectedTemplate === templateType && isAdding) {
      return "loading";
    }
    if (selectedTemplate === templateType) {
      return "selected";
    }
    return "default";
  };

  const getTemplateIcon = (templateType: TemplateType) => {
    const state = getTemplateState(templateType);

    if (state === "success") {
      return <Check className="w-4 h-4 text-emerald-400" />;
    }

    if (state === "loading") {
      return (
        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      );
    }

    return <Plus className="w-4 h-4" />;
  };

  const getTemplateStyles = (templateType: TemplateType) => {
    const state = getTemplateState(templateType);

    const baseStyles =
      "group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden active:scale-95";

    switch (state) {
      case "success":
        return `${baseStyles} bg-emerald-500/20 border-emerald-500/40 shadow-lg shadow-emerald-500/20`;
      case "loading":
        return `${baseStyles} bg-cyan-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20 animate-pulse`;
      case "selected":
        return `${baseStyles} bg-cyan-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20`;
      default:
        return `${baseStyles} bg-neutral-800/50 border-white/10 hover:border-cyan-500/30`;
    }
  };

  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-full flex flex-col">
      <header className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-cyan-400" />
          Plantillas
        </h3>
        <p className="text-sm text-neutral-400 mt-1">
          Toca para agregar una estructura completa
        </p>
      </header>

      {/* Categories */}
      <div className="p-3 border-b border-white/10 bg-neutral-900/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
          {["Todos", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap flex-shrink-0 transition-all ${
                selectedCategory === category
                  ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                  : "bg-neutral-800/50 border border-white/10 text-neutral-300 hover:border-cyan-500/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <input
            type="search"
            placeholder="Buscar plantillas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all pl-10"
          />
          <SearchIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Templates Grid */}
      <section className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
        <div className="flex items-center gap-2 px-1">
          <StarIcon className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-neutral-300">
            {templates.length} plantillas disponibles
          </span>
        </div>

        <div className="space-y-3">
          {templates.map((template, index) => {
            const templateState = getTemplateState(template.type);
            const isProcessing = selectedTemplate === template.type && isAdding;

            return (
              <button
                key={`${template.type}-${index}`}
                onClick={() => handleTemplateClick(template.type)}
                disabled={isAdding}
                className={getTemplateStyles(template.type)}
                aria-label={`Agregar template ${template.title} al canvas`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <article className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-medium flex items-center gap-2 transition-colors ${
                          templateState === "success"
                            ? "text-emerald-300"
                            : templateState === "loading"
                            ? "text-cyan-300"
                            : templateState === "selected"
                            ? "text-cyan-300"
                            : "text-neutral-200 group-hover:text-cyan-300"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            templateState === "success"
                              ? "bg-emerald-500"
                              : templateState === "loading"
                              ? "bg-cyan-500 animate-pulse"
                              : "bg-cyan-500"
                          }`}
                        />
                        <span className="truncate">{template.title}</span>
                      </h4>
                      <p
                        className={`text-xs mt-1.5 transition-colors truncate ${
                          templateState === "success"
                            ? "text-emerald-400"
                            : templateState === "loading"
                            ? "text-cyan-400"
                            : "text-neutral-400 group-hover:text-neutral-300"
                        }`}
                      >
                        {template.description}
                      </p>
                      {isProcessing && (
                        <span className="text-xs text-cyan-400 block mt-1">
                          Agregando template...
                        </span>
                      )}
                    </div>

                    <div
                      className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
                        templateState === "success"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : templateState === "loading"
                          ? "text-cyan-400 bg-cyan-500/10"
                          : "text-neutral-500 hover:text-cyan-400 hover:bg-cyan-500/10"
                      }`}
                    >
                      {getTemplateIcon(template.type)}
                    </div>
                  </div>

                  <div
                    className={`mt-3 p-3 rounded-lg border shadow-inner transition-all ${
                      templateState === "success"
                        ? "bg-emerald-900/20 border-emerald-500/20 shadow-emerald-500/10"
                        : templateState === "loading"
                        ? "bg-cyan-900/20 border-cyan-500/20 shadow-cyan-500/10"
                        : "bg-neutral-900/70 border-white/5 shadow-black/30 group-hover:shadow-cyan-500/10"
                    }`}
                  >
                    {template.structure}
                  </div>
                </article>

                <div
                  className={`absolute inset-0 rounded-xl border transition-colors pointer-events-none ${
                    templateState === "success"
                      ? "border-emerald-500/20"
                      : templateState === "loading"
                      ? "border-cyan-500/40"
                      : templateState === "selected"
                      ? "border-cyan-500/20"
                      : "border-transparent group-hover:border-cyan-500/20"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-8">
            <LayoutTemplate className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-400">No se encontraron plantillas</p>
            <p className="text-xs text-neutral-500 mt-1">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}

        {/* Espaciado adicional para bottom navigation */}
        <div className="h-4" />
      </section>
    </section>
  );
};
