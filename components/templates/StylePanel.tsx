"use client";
import { useCallback } from "react";
import { Palette, X } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useCanvasStore } from "@/store/canvasStore";
import { ElementConfig } from "@/types/canvas/CanvasTypes";
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
import { HeaderControls } from "../ui/controllers/HeaderControls";
import { DeleteButton } from "../ui/buttons/DeleteButton";

export type SpecificProps = {
  config: ElementConfig;
  onChange: (key: string, value: string | number | boolean | undefined) => void;
};

const SPECIFIC_CONTROLS: Record<
  string,
  React.FC<SpecificProps & { [key: string]: unknown }>
> = {
  header: HeaderControls,
  text: TextControls,
  paragraph: TextControls,
  image: ImageControls,
  gallery: (props) => <GalleryControls {...props} isCarousel={false} />,
  carousel: (props) => <GalleryControls {...props} isCarousel={true} />,
  select: (props) => <OptionControls {...props} isCheckbox={false} />,
  checkbox: (props) => <OptionControls {...props} isCheckbox={true} />,
  button: (props) => <ButtonControls {...props} isSubmit={false} />,
  submit: (props) => <ButtonControls {...props} isSubmit={true} />,
  link: LinkControls,
  card: CardControls,
  form: FormControls,
  list: ListControls,
  divider: DividerControls,
  star: StarControls,
} as const;

const useStylePanelData = (selectedId?: string) => {
  return useCanvasStore(
    useShallow((state) => ({
      selectedElement: selectedId
        ? state.canvasElements.find((el) => el.id === selectedId)
        : undefined,
      isStylePanelOpen: state.isStylePanelOpen,
      deleteElement: state.deleteElement,
      restoreElement: state.restoreElement,
      updateElementConfig: state.updateElementConfig,
      closeStylePanel: state.closeStylePanel,
      duplicateElement: state.duplicateElement,
    }))
  );
};

const ActionButton = ({ onClose }: { onClose: () => void }) => (
  <button
    className="p-2 rounded-lg bg-neutral-800/50 border border-white/10 hover:bg-neutral-800 hover:border-red-500/30 text-neutral-400 hover:text-red-400 transition-colors duration-200"
    title="Cerrar panel de estilos"
    onClick={onClose}
    aria-label="Cerrar panel de estilos"
  >
    <X className="w-4 h-4" />
  </button>
);

const PanelHeader = ({
  type,
  actionButtons,
}: {
  type: string;
  actionButtons: React.ReactNode;
}) => (
  <header className="flex items-center justify-between p-6 pb-4 border-b border-white/10 flex-shrink-0">
    <div className="flex items-center gap-3">
      <Palette className="w-6 h-6 text-cyan-500" />
      <h2 className="text-xl font-semibold text-neutral-200 tracking-wide capitalize">
        {type}
      </h2>
    </div>
    {actionButtons}
  </header>
);

const ElementControls = ({
  type,
  config,
  onChange,
}: {
  type: string;
  config: ElementConfig;
  onChange: (key: string, value: string | number | boolean | undefined) => void;
}) => {
  const SpecificComponent = SPECIFIC_CONTROLS[type];

  if (!SpecificComponent) return null;

  return (
    <section aria-label={`Controles específicos de ${type}`}>
      <SpecificComponent config={config} onChange={onChange} />
    </section>
  );
};

export const StylePanel = () => {
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const { selectedElement, updateElementConfig, closeStylePanel } =
    useStylePanelData(isStylePanelOpen.id);

  const handleChange = useCallback(
    (key: string, value: string | number | boolean | undefined) => {
      if (!isStylePanelOpen.id) return;
      updateElementConfig(isStylePanelOpen.id, { [key]: value });
    },
    [isStylePanelOpen.id, updateElementConfig]
  );

  const handleClose = useCallback(() => {
    closeStylePanel();
  }, [closeStylePanel]);

  if (!isStylePanelOpen.isOpen || !selectedElement) return null;

  const { type, config } = selectedElement;

  return (
    <aside
      className="h-screen w-96 bg-neutral-900/90 backdrop-blur-lg border-l border-white/10 shadow-2xl shadow-black/50 flex flex-col"
      role="complementary"
      aria-label={`Panel de estilos para ${type}`}
    >
      <PanelHeader
        type={type}
        actionButtons={<ActionButton onClose={handleClose} />}
      />

      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 scrollbar-thumb-rounded-full">
        <ElementControls
          type={type}
          config={config || {}}
          onChange={handleChange}
        />
        <DesignSection config={config || {}} onChange={handleChange} />
        <AppearanceSection config={config || {}} onChange={handleChange} />
      </div>

      <footer className="p-6 pt-4 border-t border-white/10 flex-shrink-0">
        <DeleteButton
          id={isStylePanelOpen.id}
          className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
      </footer>
    </aside>
  );
};
