"use client";
import { useState } from "react";
import { PuzzleIcon, Plus, Check } from "lucide-react";
import { sections } from "@/config";
import { Section } from "@/components/ui/panel/Section";
import { ElementType } from "@/types/canvas/CanvasTypes";
import { useAddElementMobile } from "@/hooks/useAddElementMobile";

export const MobileSecondaryPanel = () => {
  const [selectedElementType, setSelectedElementType] =
    useState<ElementType | null>(null);
  const { addElementToCanvas, isAdding, lastAddedElement } =
    useAddElementMobile();

  const handleElementClick = async (elementType: ElementType) => {
    if (isAdding) return;

    setSelectedElementType(elementType);

    const success = await addElementToCanvas(elementType);

    if (success) {
      // Feedback visual temporal
      setTimeout(() => {
        setSelectedElementType(null);
      }, 500);
    } else {
      setSelectedElementType(null);
    }
  };

  const getButtonState = (elementType: ElementType) => {
    if (lastAddedElement === elementType) {
      return "success";
    }
    if (selectedElementType === elementType && isAdding) {
      return "loading";
    }
    if (selectedElementType === elementType) {
      return "selected";
    }
    return "default";
  };

  const getButtonIcon = (
    elementType: ElementType,
    IconComponent: React.ComponentType<{ className?: string }>,
  ) => {
    const state = getButtonState(elementType);

    if (state === "success") {
      return <Check className="w-5 h-5 text-emerald-400" />;
    }

    if (state === "loading") {
      return (
        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      );
    }

    return (
      <IconComponent className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    );
  };

  const getButtonStyles = (elementType: ElementType) => {
    const state = getButtonState(elementType);

    const baseStyles =
      "group relative flex cursor-pointer items-center gap-3 p-3 rounded-xl border transition-all duration-300 active:scale-95";

    switch (state) {
      case "success":
        return `${baseStyles} bg-emerald-500/20 border-emerald-500/40 shadow-lg shadow-emerald-500/20`;
      case "loading":
        return `${baseStyles} bg-cyan-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20 animate-pulse`;
      case "selected":
        return `${baseStyles} bg-cyan-500/20 border-cyan-500/40 shadow-lg shadow-cyan-500/20`;
      default:
        return `${baseStyles} bg-neutral-800/50 border-white/10 hover:bg-neutral-800 hover:border-cyan-500/30`;
    }
  };

  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-full flex flex-col">
      <header className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
          <PuzzleIcon className="w-5 h-5 text-cyan-400" />
          Elementos
        </h3>
        <p className="text-sm text-neutral-400 mt-1">
          Toca cualquier elemento para agregarlo
        </p>
      </header>

      <section className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
        {sections.map((section) => (
          <Section
            key={section.title}
            title={section.title}
            dotColor="bg-cyan-500"
          >
            {section.elements.map((element, index) => {
              const elementType = element.type as ElementType;
              const buttonState = getButtonState(elementType);
              const isProcessing =
                selectedElementType === elementType && isAdding;

              return (
                <button
                  key={`${element.type}-${index}`}
                  onClick={() => handleElementClick(elementType)}
                  disabled={isAdding}
                  className={getButtonStyles(elementType)}
                  aria-label={`Agregar ${element.label} al canvas`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.15)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      className={`p-1.5 rounded-md border transition-colors ${
                        buttonState === "success"
                          ? "bg-emerald-900/50 border-emerald-500/20"
                          : buttonState === "selected"
                            ? "bg-cyan-900/50 border-cyan-500/20"
                            : "bg-neutral-900/50 border-white/5 group-hover:border-cyan-500/20"
                      }`}
                    >
                      {getButtonIcon(elementType, element.icon)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-medium transition-colors block truncate ${
                        buttonState === "success"
                          ? "text-emerald-300"
                          : buttonState === "loading"
                            ? "text-cyan-300"
                            : buttonState === "selected"
                              ? "text-cyan-300"
                              : "text-neutral-300 group-hover:text-neutral-100"
                      }`}
                    >
                      {element.label}
                    </span>
                    {isProcessing && (
                      <span className="text-xs text-cyan-400 block">
                        Agregando...
                      </span>
                    )}
                  </div>

                  <div
                    className={`transition-colors ${
                      buttonState === "success"
                        ? "text-emerald-400"
                        : buttonState === "loading"
                          ? "text-cyan-400"
                          : buttonState === "selected"
                            ? "text-cyan-400"
                            : "text-neutral-600 group-hover:text-neutral-400"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    ) : buttonState === "success" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 rounded-xl border transition-colors pointer-events-none ${
                      buttonState === "success"
                        ? "border-emerald-500/20"
                        : buttonState === "loading"
                          ? "border-cyan-500/40"
                          : buttonState === "selected"
                            ? "border-cyan-500/20"
                            : "border-transparent group-hover:border-cyan-500/20"
                    }`}
                  />
                </button>
              );
            })}
          </Section>
        ))}

        {/* Espaciado adicional para bottom navigation */}
        <div className="h-4" />
      </section>
    </section>
  );
};
