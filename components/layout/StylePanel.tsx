"use client";
import { styleConfig } from "@/config";
import { Palette } from "lucide-react";
import { Section } from "@/components/ui/panel/Section";
import { ColorInput } from "@/components/ui/panel/ColorInput";
import { NumberInput } from "@/components/ui/panel/NumberInput";
import { AlignButtonGroup } from "@/components/ui/panel/AlignButtonGroup";
import { useCanvasStore } from "@/store/canvasStore";

export const StylePanel = () => {
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  return (
    <aside className={`${isStylePanelOpen ? "block" : "hidden"} h-screen w-80 bg-neutral-900 border-l border-neutral-800 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full`}>
      <header className="flex items-center gap-3 pb-4 border-b border-neutral-800">
        <Palette className="w-6 h-6 text-cyan-500" />
        <h2 className="text-xl font-semibold text-neutral-200 tracking-wide">
          Estilos del Elemento
        </h2>
      </header>

      {styleConfig.map(({ title, dotColor, fields }) => (
        <Section key={title} title={title} dotColor={dotColor}>
          {fields.map((field, index) => {
            if (field.type === "color") {
              return (
                <ColorInput
                  key={index}
                  label={field.label}
                  id={field.id as string}
                  defaultValue={field.defaultValue as string}
                />
              );
            }
            if (field.type === "number") {
              return (
                <NumberInput
                  key={index}
                  label={field.label}
                  id={field.id as string}
                  defaultValue={field.defaultValue as number}
                  min={0}
                />
              );
            }
            if (field.type === "align") {
              return (
                  <label key={index} className="text-sm text-neutral-400 flex items-center justify-between">{field.label}
                  <AlignButtonGroup />
                  </label>
              );
            }
            return null;
          })}
        </Section>
      ))}
    </aside>
  );
};
