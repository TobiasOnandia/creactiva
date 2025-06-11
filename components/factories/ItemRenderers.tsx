"use client";
import { useCanvasStore } from "@/store/canvasStore";
import { ElementConfig } from "@/types/canvas/CanvasTypes";
import { ImageIcon, MoveLeft, MoveRight, StarIcon } from "lucide-react";

export const ItemRenderers: Record<
  string,
  React.FC<{ config: ElementConfig; id: string }>
> = {
  header: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);
    return (
      <header
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <h1 className="font-semibold tracking-tight">{config.content}</h1>
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
        className="w-full h-full flex flex-col justify-center hover:opacity-90 transition-opacity"
      >
        <p>{config.content}</p>
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
        className="w-full h-full flex flex-col justify-center hover:opacity-90 transition-opacity"
      >
        <p>{config.content}</p>
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
        className="w-full h-full bg-neutral-800/50 flex flex-col items-center justify-center text-neutral-400 text-xs rounded-lg border border-neutral-700/50 hover:border-cyan-500/30 transition-colors"
      >
        {
          config.src ? (
            <img src={config.src} alt={config.alt} />
          ) :
            (
              <>
                  <ImageIcon className="w-8 h-8 mb-2 text-cyan-500/70" />
            <span>Imagen</span>
              </>
          )
        }
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
        className="w-full h-full flex items-center justify-center"
      >
        <button
          className="px-6 py-2.5 rounded-lg text-white text-sm font-medium shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
          style={{ pointerEvents: "none", ...config }}
        >
          {config.content}
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
  gallery: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);
    console.log(config)
    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-1 p-1 rounded"
      >
         {
          config.images ? (
            config.images.split(',').map((url, index) => {
              return (
                <img key={index} src={url} alt={config.alt} />
              )
            })
          ) :
            (
              <>
                <div className="bg-neutral-600 rounded"></div>
                <div className="bg-neutral-600 rounded"></div>
                <div className="bg-neutral-600 rounded"></div>
                <div className="bg-neutral-600 rounded"></div>
              </>
          )
        }
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
       
          {
          config.images ? (
            config.images.split(',').map((url, index) => {
              return (
                <>
                <button onClick={() => {++index}}> <MoveRight /> </button>
                  <img key={index} src={url[index]} alt={config.alt} />
                <button onClick={() => {index - 1}}> <MoveLeft /> </button>

                </>
              )
            })
          ) :
            (
              <>
               <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>
                <div className="text-neutral-400 text-xs">Carrusel</div>
                <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>
              </>
          )
        }
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
    link: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <a href={config?.href || "#"}
           className="text-blue-400 underline cursor-pointer"
           style={{ pointerEvents: "none" }} 
        >
          {config?.content || "Enlace de ejemplo"}
        </a>
      </div>
    );
  },
};
