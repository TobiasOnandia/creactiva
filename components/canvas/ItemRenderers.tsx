"use client";
import { useCanvasStore } from "@/store/canvasStore";
import { ConfigStyle } from "@/types/CanvasTypes";
import { ImageIcon, StarIcon, VideoIcon } from "lucide-react";

export const ItemRenderers: Record<
  string,
  React.FC<{ config: ConfigStyle; id: string }>
> = {
  header: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);
    return (
      <header
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full flex items-center "
      >
        <h3 className=" font-semibold truncate">{config.content}</h3>
      </header>
    );
  },
  text: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full flex flex-col justify-center space-y-1 px-2 py-1"
      >
        <div className="w-11/12 h-2 bg-neutral-600 rounded-full"></div>
        <div className="w-full h-2 bg-neutral-600 rounded-full"></div>
        <div className="w-10/12 h-2 bg-neutral-600 rounded-full"></div>
      </div>
    );
  },
  paragraph: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full flex flex-col justify-center space-y-1 px-2 py-1"
      >
        <p className="">{config.content}</p>
        <p className=""></p>
        <p className=""></p>
      </div>
    );
  },
  image: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded"
      >
        <ImageIcon className="w-6 h-6 mb-1" />
        <span>Imagen</span>
      </div>
    );
  },
  button: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full flex items-center justify-center p-2"
      >
        <button
          className={`px-4 py-2 rounded text-white text-sm font-medium`}
          style={{ pointerEvents: "none" }}
        >
          Botón
        </button>
      </div>
    );
  },
  divider: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full flex items-center px-2"
      >
        <div className="w-full h-0.5 bg-neutral-600 rounded-full"></div>
      </div>
    );
  },
  star: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full flex items-center justify-center"
      >
        <StarIcon className="w-6 h-6 text-yellow-500" />
      </div>
    );
  },
  video: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded"
      >
        <VideoIcon className="w-6 h-6 mb-1" />
        <span>Video</span>
      </div>
    );
  },
  gallery: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-1 p-1 rounded"
      >
        <div className="bg-neutral-600 rounded"></div>
        <div className="bg-neutral-600 rounded"></div>
        <div className="bg-neutral-600 rounded"></div>
        <div className="bg-neutral-600 rounded"></div>
      </div>
    );
  },
  carousel: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full bg-neutral-700 flex items-center justify-between px-2 rounded"
      >
        <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>
        <div className="text-neutral-400 text-xs">Carrusel</div>
        <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>
      </div>
    );
  },
  select: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full flex items-center px-2  py-1"
      >
        <div className="w-full h-6 bg-neutral-600 rounded flex items-center justify-between px-2 text-xs text-neutral-400">
          <span>Seleccionar...</span>
          <span className="ml-2">&#9660;</span>
        </div>
      </div>
    );
  },
  checkbox: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}

        style={config}
        className="w-full h-full flex items-center px-2 py-1"
      >
        <div className="w-4 h-4 bg-neutral-600 rounded mr-2"></div>
        <span className="text-neutral-300 text-sm">Opción</span>
      </div>
    );
  },
  submit: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full flex items-center justify-center p-2"
      >
        <button
          className={`px-4 py-2 rounded text-white text-sm font-medium bg-cyan-600`}
          style={{ pointerEvents: "none" }}
        >
          Enviar
        </button>
      </div>
    );
  },
  landing: ({config, id}) => {
    return (
       <div className="space-y-1.5">
        <div className="h-3 bg-cyan-500/30 rounded-full" />
        <div className="h-8 bg-purple-500/30 rounded-lg" />
        <div className="h-20 bg-rose-500/30 rounded-lg" />
        <div className="h-24 bg-emerald-500/30 rounded-lg" />
        <div className="h-3 bg-cyan-500/30 rounded-full" />
      </div>
    )
  },
  dashboard: ({config, id}) => {
    return (
        <div className="flex gap-1.5 h-28">
        <div className="w-1/4 bg-amber-500/30 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-blue-500/30 rounded-full" />
          <div className="h-22 bg-indigo-500/30 rounded-lg" />
        </div>
      </div>
    )
  },
  blog: ({config, id}) => {
    return (
       <div className="space-y-1.5 h-24">
        <div className="h-3 bg-cyan-500/30 rounded-full" />
        <div className="flex gap-1.5 flex-1">
          <div className="w-3/4 bg-purple-500/30 rounded-lg" />
          <div className="w-1/4 bg-emerald-500/30 rounded-lg" />
        </div>
        <div className="h-3 bg-cyan-500/30 rounded-full" />
      </div>
    )
  },
  portfolio: ({config, id}) => {
    return (
       <div className="space-y-1.5 h-24">
        <div className="h-12 bg-rose-500/30 rounded-lg" />
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 bg-blue-500/30 rounded" />
          <div className="h-6 bg-blue-500/30 rounded" />
        </div>
        <div className="h-6 bg-amber-500/30 rounded-lg" />
      </div>
    )
  }
  ,
  ecommerce: ({config, id}) => {
    return (
      <div className="space-y-1.5 h-24">
        <div className="h-6 bg-purple-500/30 rounded-lg" />
        <div className="h-4 bg-cyan-500/30 rounded-full" />
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 bg-emerald-500/30 rounded" />
          ))}
        </div>
      </div>
    )
  }
};
