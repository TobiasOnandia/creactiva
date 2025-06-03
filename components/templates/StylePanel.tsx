"use client";
import { styleConfig } from "@/config";
import { Palette, Trash2, Undo2 } from "lucide-react";
import { Section } from "@/components/ui/panel/Section";
import { ColorInput } from "@/components/ui/panel/ColorInput";
import { NumberInput } from "@/components/ui/panel/NumberInput";
import { AlignButtonGroup } from "@/components/ui/panel/AlignButtonGroup";
import { useCanvasStore } from "@/store/canvasStore";

export const StylePanel = () => {
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const deleteElement = useCanvasStore((state) => state.deleteElement);
  const restoreElement = useCanvasStore((state) => state.restoreElement);
  const updateElementConfig = useCanvasStore((state) => state.updateElementConfig);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateElementConfig(isStylePanelOpen.id, { content: value });
  };
  
  
  return (
    <aside 
      className={`${isStylePanelOpen.isOpen ? "block" : "hidden"} h-screen w-96 bg-neutral-900/90 backdrop-blur-lg border-l border-white/10 shadow-2xl shadow-black/50 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full`}
    >
      <header className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-cyan-500" />
          <h2 className="text-xl font-semibold text-neutral-200 tracking-wide">
            Estilos
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 transition-colors"
            title="Restaurar valores predeterminados"
            onClick={(() => restoreElement(isStylePanelOpen.id))}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          
          <button
            className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-colors"
            title="Eliminar elemento"
            onClick={(() => deleteElement(isStylePanelOpen.id))}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>


      {styleConfig.map(({ title, dotColor, fields }) => (
        <Section key={title} title={title} dotColor={dotColor}>
          {fields.map((field, index) => {
            if (field.type === "text") {
              return (
                <label key={index} className="text-sm text-neutral-400 flex gap-3 items-center justify-between">
                  {field.label}
                  <input
                    type="text"
                    id={field.id as string}
                    onChange={handleChange}
                    defaultValue={field.defaultValue as string}
                    className="w-full px-3 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-neutral-300 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                  />
                </label>
              );
            }
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
                <div key={index} className="flex items-center justify-between">
                  <label className="text-sm text-neutral-400">{field.label}</label>
                  <AlignButtonGroup />
                </div>
              );
            }
            return null;
          })}
        </Section>
      ))}

      <footer className="pt-4 border-t border-white/10">
        <button
          onClick={(() => deleteElement(isStylePanelOpen.id))}
          className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 rounded-xl transition-colors duration-300"
        >
          <Trash2 className="w-5 h-5" />
          <span className="font-medium">Eliminar Elemento</span>
        </button>
      </footer>
    </aside>
  );
};