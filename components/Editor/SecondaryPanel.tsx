import {
  CheckSquareIcon,
  ClipboardListIcon,
  ComponentIcon,
  ImageIcon,
  LayoutGridIcon,
  ListIcon,
  MinusIcon,
  Pilcrow,
  PlusIcon,
  PuzzleIcon,
  SendIcon,
  SlidersVerticalIcon,
  SquareStackIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { DraggableElement } from "@/components/common/DraggableElement";

export const SecondaryPanel = () => {
  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-72 flex flex-col">
      <header className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
          <PuzzleIcon className="w-5 h-5 text-cyan-400" />
          Elementos
        </h3>
        <p className="text-sm text-neutral-400 mt-1">
          Arrastra elementos al canvas
        </p>
      </header>

      {/* Categorías */}
      <section className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
        {/* Sección Básicos */}
        <article className="space-y-4">
          <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
            <SquareStackIcon className="w-4 h-4 text-cyan-400" />
            Básicos
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <DraggableElement
              id={crypto.randomUUID()}
              type="header"
              icon={<TextIcon className="w-4 h-4" />}
              label="Encabezado"
              colorClass="bg-cyan-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="paragraph"
              icon={<Pilcrow className="w-4 h-4" />}
              label="Texto"
              colorClass="bg-purple-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="button"
              icon={<ComponentIcon className="w-4 h-4" />}
              label="Botón"
              colorClass="bg-emerald-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="divider"
              icon={<MinusIcon className="w-4 h-4" />}
              label="Separador"
              colorClass="bg-amber-500/10"
            />
          </div>
        </article>

        {/* Sección Media */}
        <article className="space-y-4">
          <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            Media
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <DraggableElement
              id={crypto.randomUUID()}
              type="image"
              icon={<ImageIcon className="w-4 h-4" />}
              label="Imagen"
              colorClass="bg-rose-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="video"
              icon={<VideoIcon className="w-4 h-4" />}
              label="Video"
              colorClass="bg-indigo-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="gallery"
              icon={<LayoutGridIcon className="w-4 h-4" />}
              label="Galería"
              colorClass="bg-sky-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="carousel"
              icon={<SlidersVerticalIcon className="w-4 h-4" />}
              label="Carrusel"
              colorClass="bg-lime-500/10"
            />
          </div>
        </article>

        {/* Sección Formularios */}
        <article className="space-y-4">
          <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
            <ClipboardListIcon className="w-4 h-4 text-cyan-400" />
            Formularios
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <DraggableElement
              id={crypto.randomUUID()}
              type="select"
              icon={<ListIcon className="w-4 h-4" />}
              label="Selector"
              colorClass="bg-orange-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="checkbox"
              icon={<CheckSquareIcon className="w-4 h-4" />}
              label="Checkbox"
              colorClass="bg-violet-500/10"
            />
            <DraggableElement
              id={crypto.randomUUID()}
              type="submit"
              icon={<SendIcon className="w-4 h-4" />}
              label="Botón Enviar"
              colorClass="bg-cyan-500/10"
            />
          </div>
        </article>
      </section>
    </section>
  );
};
