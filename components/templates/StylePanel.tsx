"use client";
import { useMemo, useCallback } from "react";
import {
  Palette,
  Trash2,
  Undo2,
  X,
  Copy,
} from "lucide-react";
import { shallow, useShallow } from "zustand/shallow"; 
import { useCanvasStore } from "@/store/canvasStore";
import { CanvasElement, ElementConfig } from "@/types/canvas/CanvasTypes";
import { TextControls } from "@/components/ui/controllers/TextControllers";
import { ImageControls } from "@/components/ui/controllers/ImageControls";
import { DividerControls } from "@/components/ui/controllers/DividerControls";
import { StarControls } from "@/components/ui/controllers/StarControls";
import { GalleryControls } from "@/components/ui/controllers/GalleryControls";
import { OptionControls } from "@/components/ui/controllers/OptionControls";
import { ButtonControls } from "@/components/ui/controllers/ButtonControls";
import { DesignSection } from "@/components/ui/panel/DesignSection";
import { AppearanceSection } from "@/components/ui/panel/AppearanceSection";
import { LinkControls } from "../ui/controllers/LinkControls";
import { CardControls } from "../ui/controllers/CardControls";
import { FormControls } from "../ui/controllers/FormControls";
import { ListControls } from "../ui/controllers/ListControls";

export type SpecificProps = {
  config: ElementConfig;
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
  gallery: (props: SpecificProps) => <GalleryControls {...props} isCarousel={false} />,
  carousel: (props: SpecificProps) => <GalleryControls {...props} isCarousel={true} />,
  select: (props: SpecificProps) => <OptionControls {...props} isCheckbox={false} />,
  checkbox: (props: SpecificProps) => <OptionControls {...props} isCheckbox={true} />,
  button: (props: SpecificProps) => <ButtonControls {...props} isSubmit={false} />,
  submit: (props: SpecificProps) => <ButtonControls {...props} isSubmit={true} />,
  link: (props: SpecificProps) => <LinkControls {...props} />,
  card: (props: SpecificProps) => <CardControls {...props} />,
  form: (props: SpecificProps) => <FormControls {...props} />,
  list: (props: SpecificProps) => <ListControls {...props} />,

  divider: DividerControls,
  star: StarControls,
};

const useStylePanelData = () => {
  return useCanvasStore(
    useShallow(
      (state) => ({
        canvasElements: state.canvasElements,
        isStylePanelOpen: state.isStylePanelOpen,
        deleteElement: state.deleteElement,
        restoreElement: state.restoreElement,
        updateElementConfig: state.updateElementConfig,
        closeStylePanel: state.closeStylePanel,
        duplicateElement: state.duplicateElement,
      }),
    ),
  );
};

export const StylePanel = () => {
  const {
    canvasElements,
    isStylePanelOpen,
    deleteElement,
    restoreElement,
    updateElementConfig,
    closeStylePanel,
    duplicateElement,
  } = useStylePanelData();

  // Memoizar el elemento seleccionado
  const selectedElement = useMemo<CanvasElement | undefined>(
    () => canvasElements.find((el) => el.id === isStylePanelOpen.id),
    [canvasElements, isStylePanelOpen.id]
  );

  // Memoizar propiedades derivadas
  const elementData = useMemo(() => {
    if (!selectedElement) return null;
    
    return {
      type: selectedElement.type,
      config: selectedElement.config || {},
      SpecificComponent: SPECIFIC_CONTROLS[selectedElement.type],
    };
  }, [selectedElement]);

  // Handlers memoizados para evitar re-renders innecesarios
  const handleChange = useCallback(
    (key: string, value: any) => {
      if (!isStylePanelOpen.id) return;
      updateElementConfig(isStylePanelOpen.id, { [key]: value });
    },
    [isStylePanelOpen.id, updateElementConfig]
  );

  const handleDelete = useCallback(() => {
    if (!isStylePanelOpen.id) return;
    deleteElement(isStylePanelOpen.id);
  }, [isStylePanelOpen.id, deleteElement]);

  const handleRestore = useCallback(() => {
    if (!isStylePanelOpen.id) return;
    restoreElement(isStylePanelOpen.id);
  }, [isStylePanelOpen.id, restoreElement]);

  const handleDuplicate = useCallback(() => {
    if (!isStylePanelOpen.id) return;
    duplicateElement(isStylePanelOpen.id);
  }, [isStylePanelOpen.id, duplicateElement]);

  const handleClose = useCallback(() => {
    closeStylePanel();
  }, [closeStylePanel]);

  // Early return si no hay panel abierto
  if (!isStylePanelOpen.isOpen || !elementData) return null;

  const { type, config, SpecificComponent } = elementData;

  return (
    <aside 
      className="h-screen w-96   bg-neutral-900/90 backdrop-blur-lg border-l border-white/10 shadow-2xl shadow-black/50 flex flex-col"
      role="complementary"
      aria-label={`Panel de estilos para ${type}`}
    >
      {/* Header del Panel */}
      <header className="flex items-center justify-between p-6 pb-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-cyan-500" />
          <h2 className="text-xl font-semibold text-neutral-200 tracking-wide capitalize">
            {type}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 transition-colors duration-200"
            title="Duplicar elemento"
            onClick={handleDuplicate}
            aria-label="Duplicar elemento"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-cyan-500/30 text-neutral-400 hover:text-cyan-400 transition-colors duration-200"
            title="Restaurar valores predeterminados"
            onClick={handleRestore}
            aria-label="Restaurar valores predeterminados"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-lg bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-red-500/30 text-neutral-400 hover:text-red-400 transition-colors duration-200"
            title="Cerrar panel de estilos"
            onClick={handleClose}
            aria-label="Cerrar panel de estilos"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Contenido Scrolleable */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <div className="p-6 space-y-6">
          {/* Controles Específicos del Tipo */}
          {SpecificComponent && (
            <section aria-label={`Controles específicos de ${type}`}>
              <SpecificComponent config={config} onChange={handleChange} />
            </section>
          )}

          {/* Secciones de Diseño y Apariencia */}
          <section aria-label="Controles de diseño">
            <DesignSection config={config} onChange={handleChange} />
          </section>

          <section aria-label="Controles de apariencia">
            <AppearanceSection config={config} onChange={handleChange} />
          </section>
        </div>
      </div>

      {/* Footer con Botón de Eliminar */}
      <footer className="p-6 pt-4 border-t border-white/10 flex-shrink-0">
        <button
          onClick={handleDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          aria-label="Eliminar elemento seleccionado"
        >
          <Trash2 className="w-5 h-5" />
          <span className="font-medium">Eliminar Elemento</span>
        </button>
      </footer>
    </aside>
  );
};