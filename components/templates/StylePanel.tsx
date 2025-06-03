"use client";
import { useMemo } from "react";
import {
  Palette,
  Trash2,
  Undo2,
} from "lucide-react";
import { useCanvasStore } from "@/store/canvasStore";
import { ConfigStyle, CanvasElement } from "@/types/CanvasTypes";
import { TextControls } from "@/components/ui/controllers/TextControllers";
import { ImageControls } from "@/components/ui/controllers/ImageControls";
import { VideoControls } from "@/components/ui/controllers/VideoControls";
import { DividerControls } from "@/components/ui/controllers/DividerControls";
import { StarControls } from "@/components/ui/controllers/StarControls";
import { GalleryControls } from "@/components/ui/controllers/GalleryControls";
import { OptionControls } from "@/components/ui/controllers/OptionControls";
import { ButtonControls } from "@/components/ui/controllers/ButtonControls";
import { DesignSection } from "../ui/panel/DesignSection";
import { AppearanceSection } from "../ui/panel/AppearanceSection";


export type SpecificProps = {
  config: ConfigStyle;
  onChange: (key: string, value: any) => void;
};


const SPECIFIC_CONTROLS: Record<
  string,
  React.FC<SpecificProps & { [key: string]: any }>
> = {
  header: TextControls,
  text: TextControls,
  paragraph: TextControls,
  image: ImageControls,
  video: VideoControls,
  gallery: (props: SpecificProps) => <GalleryControls {...props} isCarousel={false} />,
  carousel: (props: SpecificProps) => <GalleryControls {...props} isCarousel={true} />,
  select: (props: SpecificProps) => <OptionControls {...props} isCheckbox={false} />,
  checkbox: (props: SpecificProps) => <OptionControls {...props} isCheckbox={true} />,
  button: (props: SpecificProps) => <ButtonControls {...props} isSubmit={false} />,
  submit: (props: SpecificProps) => <ButtonControls {...props} isSubmit={true} />,
  divider: DividerControls,
  star: StarControls,
};



export const StylePanel = () => {

  const canvasElements = useCanvasStore((state) => state.canvasElements);
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const deleteElement = useCanvasStore((state) => state.deleteElement);
  const restoreElement = useCanvasStore((state) => state.restoreElement);
  const updateElementConfig = useCanvasStore((state) => state.updateElementConfig);

  const selectedElement = useMemo<CanvasElement | undefined>(
    () => canvasElements.find((el) => el.id === isStylePanelOpen.id),
    [canvasElements, isStylePanelOpen.id]
  );
  const elementType = selectedElement?.type;
  const config = selectedElement?.config || ({} as ConfigStyle);

  const handleChange = (key: string, value: any) => {
    if (!isStylePanelOpen.id) return;
    updateElementConfig(isStylePanelOpen.id, { [key]: value });
  };

  if (!isStylePanelOpen.isOpen || !elementType) return null;

  const SpecificComponent = SPECIFIC_CONTROLS[elementType];

  return (
    <aside className="h-screen w-96 bg-neutral-900/90 backdrop-blur-lg border-l border-white/10 shadow-2xl shadow-black/50 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
      {/* Header del Panel con título, Íconos de Restaurar/Eliminar */}
      <header className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-cyan-500" />
          <h2 className="text-xl font-semibold text-neutral-200 tracking-wide capitalize">
            {elementType}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 transition-colors"
            title="Restaurar valores predeterminados"
            onClick={() => restoreElement(isStylePanelOpen.id)}
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-colors"
            title="Eliminar elemento"
            onClick={() => deleteElement(isStylePanelOpen.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Controles Específicos del Tipo */}
      {SpecificComponent && (
        <SpecificComponent config={config} onChange={handleChange} />
      )}

      <DesignSection config={config} onChange={handleChange} />

      <AppearanceSection config={config} onChange={handleChange} />

      {/* Footer: Botón Eliminar */}
      <footer className="pt-4 border-t border-white/10">
        <button
          onClick={() => deleteElement(isStylePanelOpen.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 rounded-xl transition-colors duration-300"
        >
          <Trash2 className="w-5 h-5" />
          <span className="font-medium">Eliminar Elemento</span>
        </button>
      </footer>
    </aside>
  );
};
