"use client";
import { useCallback } from "react";
import { Palette, X, ChevronLeft } from "lucide-react";
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
    useShallow((state) => {
      const selectedElement = selectedId
        ? state.sections
            .flatMap((section) => section.elements)
            .find((element) => element.id === selectedId)
        : null;

      return {
        selectedElement,
        updateElementConfig: state.updateElementConfig,
        closeStylePanel: state.closeStylePanel,
        duplicateElement: state.duplicateElement,
      };
    }),
  );
};

const ActionButton = ({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    className="p-2 hover:bg-neutral-800/60 rounded-lg transition-colors group"
    aria-label="Cerrar panel de estilos"
    title="Cerrar panel"
  >
    <X className="w-5 h-5 text-neutral-400 group-hover:text-neutral-200 transition-colors" />
  </button>
);

const PanelHeader = ({
  type,
  actionButtons,
  onBack,
}: {
  type: string;
  actionButtons?: React.ReactNode;
  onBack?: () => void;
}) => (
  <header className="flex items-center gap-3 p-4 border-b border-white/10 bg-neutral-900/95 backdrop-blur-xl">
    {onBack && (
      <button
        onClick={onBack}
        className="p-2 hover:bg-neutral-800/60 rounded-lg transition-colors"
        aria-label="Volver"
      >
        <ChevronLeft className="w-5 h-5 text-neutral-400" />
      </button>
    )}
    <div className="flex items-center gap-3 flex-1">
      <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <Palette className="w-5 h-5 text-purple-400" />
      </div>
      <div className="flex flex-col">
        <h2 className="font-medium text-neutral-200 capitalize">
          Editando: {type}
        </h2>
        <p className="text-xs text-neutral-400">Personaliza este elemento</p>
      </div>
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
    <section
      aria-label={`Controles específicos de ${type}`}
      className="space-y-6"
    >
      <SpecificComponent config={config} onChange={onChange} />
    </section>
  );
};

export const MobileStylePanel = () => {
  const isStylePanelOpen = useCanvasStore((state) => state.isStylePanelOpen);
  const { selectedElement, updateElementConfig, closeStylePanel } =
    useStylePanelData(isStylePanelOpen.id);

  const handleChange = useCallback(
    (key: string, value: string | number | boolean | undefined) => {
      if (!isStylePanelOpen.id) return;
      updateElementConfig(isStylePanelOpen.id, { [key]: value });
    },
    [isStylePanelOpen.id, updateElementConfig],
  );

  const handleClose = useCallback(() => {
    closeStylePanel();
  }, [closeStylePanel]);

  if (!isStylePanelOpen.isOpen || !selectedElement) return null;

  const { type, config } = selectedElement;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn" />

      {/* Full Screen Modal */}
      <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900 animate-slideInFromRight">
        <PanelHeader
          type={type}
          actionButtons={<ActionButton onClose={handleClose} />}
          onBack={handleClose}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Element Specific Controls */}
            <ElementControls
              type={type}
              config={config || {}}
              onChange={handleChange}
            />

            {/* Design Section */}
            <div className="border-t border-white/10 pt-6">
              <DesignSection config={config || {}} onChange={handleChange} />
            </div>

            {/* Appearance Section */}
            <div className="border-t border-white/10 pt-6">
              <AppearanceSection
                config={config || {}}
                onChange={handleChange}
              />
            </div>

            {/* Delete Section */}
            <div className="border-t border-white/10 pt-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-300">
                  Acciones del elemento
                </h3>
                <DeleteButton elementId={isStylePanelOpen.id || ""} />
              </div>
            </div>

            {/* Bottom spacing for mobile navigation */}
            <div className="h-20" />
          </div>
        </div>
      </div>
    </>
  );
};
