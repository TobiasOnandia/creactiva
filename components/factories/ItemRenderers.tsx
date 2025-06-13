"use client";
import { useCanvasStore } from "@/store/canvasStore";
import { ElementConfig } from "@/types/canvas/CanvasTypes";
import { ImageIcon, MoveLeft, MoveRight, StarIcon } from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";

interface ItemRendererProps {
  config: ElementConfig;
  id: string;
}

const Hero: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);
  return (
    <section
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full flex items-center justify-center hover:opacity-90 transition-opacity"
    >
      <h1 className="font-semibold tracking-tight">{config.content}</h1>
    </section>
  );
};

const Header: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);
  const navItems = config?.navItems
    ?.split(",")
    .map((item: string) => item.trim())
    .filter((item: string) => item !== "") || [
    "Inicio",
    "Servicios",
    "Acerca de",
    "Contacto",
  ];
  return (
    <header
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full f bg-neutral-900 border-b border-neutral-700/50 flex flex-wrap items-center justify-between px-6 py-4 hover:opacity-90 transition-opacity"
    >
      <h1 className="text-2xl font-bold text-white tracking-tight">
        {config?.title || "Mi Sitio"}
      </h1>
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item: string, index: number) => (
          <a
            key={index}
            href={config?.navLinks?.[index] || "#"}
            className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
};

const Text: React.FC<ItemRendererProps> = ({ config, id }) => {
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
};

const Paragraph: React.FC<ItemRendererProps> = ({ config, id }) => {
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
};

const Image: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full bg-neutral-800/50 flex flex-col items-center justify-center text-neutral-400 text-xs rounded-lg border border-neutral-700/50 hover:border-cyan-500/30 transition-colors"
    >
      {config.src ? (
        <NextImage
          src={config.src}
          alt={config.alt || ""}
          fill
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          <ImageIcon className="w-8 h-8 mb-2 text-cyan-500/70" />
          <span>Imagen</span>
        </>
      )}
    </div>
  );
};

const Divider: React.FC<ItemRendererProps> = ({ config, id }) => {
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
};

const Star: React.FC<ItemRendererProps> = ({ config, id }) => {
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
};

const Gallery: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);
  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full bg-neutral-700 grid grid-cols-2 grid-rows-2 gap-1 p-1 rounded"
    >
      {config.images ? (
        config.images.split(",").map((url, index) => {
          return (
            <NextImage
              key={index}
              src={url}
              alt={config.alt || "Imagen"}
              fill
              style={{ objectFit: "cover" }}
            />
          );
        })
      ) : (
        <>
          <div className="bg-neutral-600 rounded"></div>
          <div className="bg-neutral-600 rounded"></div>
          <div className="bg-neutral-600 rounded"></div>
          <div className="bg-neutral-600 rounded"></div>
        </>
      )}
    </div>
  );
};

const Carousel: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = config.images ? config.images.split(",") : [];

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full bg-neutral-700 flex items-center justify-center relative overflow-hidden rounded"
    >
      {images.length > 0 ? (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 z-10 p-1 bg-black/30 rounded-full text-white disabled:opacity-50"
            style={{ pointerEvents: isEditMode ? "none" : "auto" }}
            disabled={isEditMode}
          >
            <MoveLeft size={20} />
          </button>
          <div className="w-full h-full relative">
            <NextImage
              key={currentIndex}
              src={images[currentIndex]}
              alt={config.alt || `Imagen ${currentIndex + 1}`}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
          <button
            onClick={handleNext}
            className="absolute right-2 z-10 p-1 bg-black/30 rounded-full text-white disabled:opacity-50"
            style={{ pointerEvents: isEditMode ? "none" : "auto" }}
            disabled={isEditMode}
          >
            <MoveRight size={20} />
          </button>
        </>
      ) : (
        <div className="text-neutral-400 text-xs">Carrusel</div>
      )}
    </div>
  );
};

const Select: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full flex items-center px-2 py-1"
    >
      <select name="" id="" required={config.required}>
        {config.options ? (
          config.options.split(",").map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <>
            <option value="">Opcion 1</option>
            <option value="">Opcion 2</option>
            <option value="">Opcion 3</option>
          </>
        )}
      </select>
    </div>
  );
};

const Checkbox: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  return (
    <label
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      htmlFor={id}
      className="w-full h-full flex items-center px-2 py-1 gap-2"
    >
      <input required={config.required} type="checkbox" name="" id={id} />
      <span className="text-neutral-300 text-sm">
        {config.label || "Opcion"}
      </span>
    </label>
  );
};

const Submit: React.FC<ItemRendererProps> = ({ config, id }) => {
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
};

const Link: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full flex items-center justify-center hover:opacity-90 transition-opacity"
    >
      <a
        href={config?.href || "#"}
        className="text-blue-400 underline cursor-pointer"
        style={{ pointerEvents: "none" }}
      >
        {config?.content || "Enlace de ejemplo"}
      </a>
    </div>
  );
};

const Card: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full relative flex items-center justify-center bg-neutral-800 rounded-lg shadow-md border border-neutral-700/50 overflow-hidden hover:opacity-90 transition-opacity"
    >
      {config?.src ? (
        <NextImage
          src={config.src}
          alt={config.alt || "Imagen"}
          fill
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-700">
          <ImageIcon className="w-12 h-12 text-neutral-400" />
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <h4 className="font-semibold text-neutral-200 text-base mb-1 truncate">
          {config?.title || "Título de la Tarjeta"}
        </h4>
        <p className="text-neutral-400 text-xs line-clamp-2">
          {config?.description || "Descripción corta de la tarjeta."}
        </p>
        <button
          className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded opacity-70"
          style={{ pointerEvents: "none" }}
        >
          {config.buttonText || "Botón de Acción"}
        </button>
      </div>
    </div>
  );
};

const Form: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full bg-neutral-800 rounded-lg shadow-md border border-neutral-700/50 p-4 flex flex-col gap-3 justify-center hover:opacity-90 transition-opacity"
    >
      <h4 className="font-semibold text-neutral-200 text-base mb-1">
        {config?.title || "Formulario"}
      </h4>
      {/* Placeholder para campos de formulario */}
      <div className="w-full h-8 bg-neutral-700 rounded-md"></div>
      <div className="w-full h-8 bg-neutral-700 rounded-md"></div>
      <div className="w-full h-8 bg-neutral-700 rounded-md"></div>
      {/* Placeholder para botón de envío */}
      <button
        className="w-full h-9 bg-cyan-600 rounded-md text-white text-sm mt-2 opacity-70"
        style={{ pointerEvents: "none" }}
      >
        Enviar
      </button>
    </div>
  );
};

const List: React.FC<ItemRendererProps> = ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  const listItems = config?.options
    ?.split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "") || [
    "Elemento 1",
    "Elemento 2",
    "Elemento 3",
  ];
  const listType = config?.listType === "ordered" ? "ol" : "ul";

  return (
    <div
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full bg-neutral-800 rounded-lg shadow-md border border-neutral-700/50 p-4 overflow-auto hover:opacity-90 transition-opacity"
    >
      {listType === "ul" ? (
        <ul className="list-disc pl-5 text-neutral-300 text-sm space-y-1">
          {listItems.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <ol className="list-decimal pl-5 text-neutral-300 text-sm space-y-1">
          {listItems.slice(0, 3).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
      {listItems.length > 3 && (
        <p className="text-neutral-500 text-xs mt-1">...</p>
      )}
    </div>
  );
};

export const ItemRenderers: Record<
  string,
  React.FC<{ config: ElementConfig; id: string }>
> = {
  hero: Hero,
  header: Header,
  text: Text,
  paragraph: Paragraph,
  image: Image,
  divider: Divider,
  star: Star,
  gallery: Gallery,
  carousel: Carousel,
  select: Select,
  checkbox: Checkbox,
  submit: Submit,
  link: Link,
  card: Card,
  form: Form,
  list: List,
};
