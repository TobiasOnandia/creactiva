import { ImageIcon, StarIcon, VideoIcon } from "lucide-react";

export const ItemRenderers: Record<string, React.FC> = {
  header: () => (
    <div className="w-full h-full flex items-center px-2 py-1">
      <h3 className="text-neutral-100 text-lg font-semibold truncate">
        Encabezado
      </h3>
    </div>
  ),
  text: () => (
    <div className="w-full h-full flex flex-col justify-center space-y-1 px-2 py-1">
      <div className="w-11/12 h-2 bg-neutral-600 rounded-full"></div>
      <div className="w-full h-2 bg-neutral-600 rounded-full"></div>
      <div className="w-10/12 h-2 bg-neutral-600 rounded-full"></div>
    </div>
  ),
  paragraph: () => (
    <div className="w-full h-full flex flex-col justify-center space-y-1 px-2 py-1">
      <div className="w-11/12 h-2 bg-neutral-600 rounded-full"></div>
      <div className="w-full h-2 bg-neutral-600 rounded-full"></div>
      <div className="w-10/12 h-2 bg-neutral-600 rounded-full"></div>
    </div>
  ),
  image: () => (
    <div className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded">
      <ImageIcon className="w-6 h-6 mb-1" />
      <span>Imagen</span>
    </div>
  ),
  button: () => (
    <div className="w-full h-full flex items-center justify-center p-2">
      <button
        className={`px-4 py-2 rounded text-white text-sm font-medium`}
        style={{ pointerEvents: "none" }}
      >
        Botón
      </button>
    </div>
  ),
  divider: () => (
    <div className="w-full h-full flex items-center px-2">
      <div className="w-full h-0.5 bg-neutral-600 rounded-full"></div>
    </div>
  ),
  star: () => (
    <div className="w-full h-full flex items-center justify-center">
      <StarIcon className="w-6 h-6 text-yellow-500" />
    </div>
  ),
  video: () => (
    <div className="w-full h-full bg-neutral-700 flex flex-col items-center justify-center text-neutral-400 text-xs rounded">
      <VideoIcon className="w-6 h-6 mb-1" />
      <span>Video</span>
    </div>
  ),
  gallery: () => (
    <div className="w-full h-full bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-1 p-1 rounded">
      <div className="bg-neutral-600 rounded"></div>
      <div className="bg-neutral-600 rounded"></div>
      <div className="bg-neutral-600 rounded"></div>
      <div className="bg-neutral-600 rounded"></div>
    </div>
  ),
  carousel: () => (
    <div className="w-full h-full bg-neutral-700 flex items-center justify-between px-2 rounded">
      <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>
      <div className="text-neutral-400 text-xs">Carrusel</div>
      <div className="w-4 h-4 bg-neutral-600 rounded-full"></div>
    </div>
  ),
  select: () => (
    <div className="w-full h-full flex items-center px-2 py-1">
      <div className="w-full h-6 bg-neutral-600 rounded flex items-center justify-between px-2 text-xs text-neutral-400">
        <span>Seleccionar...</span>
        <span className="ml-2">&#9660;</span>
      </div>
    </div>
  ),
  checkbox: () => (
    <div className="w-full h-full flex items-center px-2 py-1">
      <div className="w-4 h-4 bg-neutral-600 rounded mr-2"></div>
      <span className="text-neutral-300 text-sm">Opción</span>
    </div>
  ),
  submit: () => (
    <div className="w-full h-full flex items-center justify-center p-2">
      <button
        className={`px-4 py-2 rounded text-white text-sm font-medium bg-cyan-600`}
        style={{ pointerEvents: "none" }}
      >
        Enviar
      </button>
    </div>
  ),
};
