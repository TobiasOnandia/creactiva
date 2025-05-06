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
import { SectionPanel } from "@/components/editor/panel/sections/SectionsPanel";

export const sections = [
  {
    title: "Básicos",
    icon: <SquareStackIcon className="w-4 h-4 text-cyan-400" />,
    elements: [
      {
        type: "header",
        icon: <TextIcon className="w-4 h-4" />,
        label: "Encabezado",
        colorClass: "bg-cyan-500/10",
      },
      {
        type: "paragraph",
        icon: <Pilcrow className="w-4 h-4" />,
        label: "Texto",
        colorClass: "bg-purple-500/10",
      },
      {
        type: "button",
        icon: <ComponentIcon className="w-4 h-4" />,
        label: "Botón",
        colorClass: "bg-emerald-500/10",
      },
      {
        type: "divider",
        icon: <MinusIcon className="w-4 h-4" />,
        label: "Separador",
        colorClass: "bg-amber-500/10",
      },
    ],
  },
  {
    title: "Media",
    icon: <ImageIcon className="w-4 h-4 text-cyan-400" />,
    elements: [
      {
        type: "image",
        icon: <ImageIcon className="w-4 h-4" />,
        label: "Imagen",
        colorClass: "bg-rose-500/10",
      },
      {
        type: "video",
        icon: <VideoIcon className="w-4 h-4" />,
        label: "Video",
        colorClass: "bg-indigo-500/10",
      },
      {
        type: "gallery",
        icon: <LayoutGridIcon className="w-4 h-4" />,
        label: "Galería",
        colorClass: "bg-sky-500/10",
      },
      {
        type: "carousel",
        icon: <SlidersVerticalIcon className="w-4 h-4" />,
        label: "Carrusel",
        colorClass: "bg-lime-500/10",
      },
    ],
  },
  {
    title: "Formularios",
    icon: <ClipboardListIcon className="w-4 h-4 text-cyan-400" />,
    elements: [
      {
        type: "select",
        icon: <ListIcon className="w-4 h-4" />,
        label: "Selector",
        colorClass: "bg-orange-500/10",
      },
      {
        type: "checkbox",
        icon: <CheckSquareIcon className="w-4 h-4" />,
        label: "Checkbox",
        colorClass: "bg-violet-500/10",
      },
      {
        type: "submit",
        icon: <SendIcon className="w-4 h-4" />,
        label: "Botón Enviar",
        colorClass: "bg-cyan-500/10",
      },
    ],
  },
];

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

      <section className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700">
        {sections.map((section) => (
          <SectionPanel key={section.title} {...section} />
        ))}
      </section>
    </section>
  );
};
