"use client";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useAddTemplateMobile, TemplateType } from "@/hooks/useAddTemplateMobile";

interface MobileTemplateCardProps {
  title: string;
  description: string;
  structure: React.ReactNode;
  type: TemplateType;
  category?: string;
}

export const MobileTemplateCard = ({
  title,
  description,
  structure,
  type,
  category
}: MobileTemplateCardProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const { addTemplateToCanvas, isAdding, lastAddedTemplate } = useAddTemplateMobile();

  const handleTemplateClick = async () => {
    if (isAdding) return;

    setSelectedTemplate(type);

    const success = await addTemplateToCanvas(type);

    if (success) {
      // Feedback visual temporal
      setTimeout(() => {
        setSelectedTemplate(null);
      }, 500);
    } else {
      setSelectedTemplate(null);
    }
  };

  const getTemplateState = () => {
    if (lastAddedTemplate === type) {
      return "success";
    }
    if (selectedTemplate === type && isAdding) {
      return "loading";
    }
    if (selectedTemplate === type) {
      return "selected";
    }
    return "default";
  };

  const getTemplateIcon = () => {
    const state = getTemplateState();

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

  const getTemplateStyles = () => {
    const state = getTemplateState();

    const baseStyles = "group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden active:scale-95 w-full";

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

  const templateState = getTemplateState();
  const isProcessing = selectedTemplate === type && isAdding;

  return (
    <button
      onClick={handleTemplateClick}
      disabled={isAdding}
      className={getTemplateStyles()}
      aria-label={`Agregar template ${title} al canvas`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <article className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 text-left">
            <h4 className={`text-sm font-medium flex items-center gap-2 transition-colors ${
              templateState === "success"
                ? "text-emerald-300"
                : templateState === "loading"
                ? "text-cyan-300"
                : templateState === "selected"
                ? "text-cyan-300"
                : "text-neutral-200 group-hover:text-cyan-300"
            }`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                templateState === "success"
                  ? "bg-emerald-500"
                  : templateState === "loading"
                  ? "bg-cyan-500 animate-pulse"
                  : "bg-cyan-500"
              }`} />
              <span className="truncate">
                {title}
              </span>
            </h4>
            <p className={`text-xs mt-1.5 transition-colors ${
              templateState === "success"
                ? "text-emerald-400"
                : templateState === "loading"
                ? "text-cyan-400"
                : "text-neutral-400 group-hover:text-neutral-300"
            }`}>
              {description}
            </p>
            {category && (
              <span className="text-xs text-neutral-500 mt-1 block">
                {category}
              </span>
            )}
            {isProcessing && (
              <span className="text-xs text-cyan-400 block mt-1">
                Agregando template...
              </span>
            )}
          </div>

          <div className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
            templateState === "success"
              ? "text-emerald-400 bg-emerald-500/10"
              : templateState === "loading"
              ? "text-cyan-400 bg-cyan-500/10"
              : "text-neutral-500 hover:text-cyan-400 hover:bg-cyan-500/10"
          }`}>
            {getTemplateIcon()}
          </div>
        </div>

        <div className={`mt-3 p-3 rounded-lg border shadow-inner transition-all ${
          templateState === "success"
            ? "bg-emerald-900/20 border-emerald-500/20 shadow-emerald-500/10"
            : templateState === "loading"
            ? "bg-cyan-900/20 border-cyan-500/20 shadow-cyan-500/10"
            : "bg-neutral-900/70 border-white/5 shadow-black/30 group-hover:shadow-cyan-500/10"
        }`}>
          {structure}
        </div>
      </article>

      <div className={`absolute inset-0 rounded-xl border transition-colors pointer-events-none ${
        templateState === "success"
          ? "border-emerald-500/20"
          : templateState === "loading"
          ? "border-cyan-500/40"
          : templateState === "selected"
          ? "border-cyan-500/20"
          : "border-transparent group-hover:border-cyan-500/20"
      }`} />
    </button>
  );
};
