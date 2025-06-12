"use client";
import { useCanvasStore } from "@/store/canvasStore";
import { ElementConfig } from "@/types/canvas/CanvasTypes";
import { ImageIcon, MoveLeft, MoveRight, StarIcon } from "lucide-react";

export const ItemRenderers: Record<
  string,
  React.FC<{ config: ElementConfig; id: string }>
  > = {

  hero: ({ config, id }) => {
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
  },
  header: ({ config, id }) => {
  const openStylePanel = useCanvasStore((state) => state.openStylePanel);
  const isEditMode = useCanvasStore((state) => state.isEditMode);

  // Elementos de navegación por defecto
  const navItems = config?.navItems?.split(',').map(item => item.trim()).filter(item => item !== '') || 
    ["Inicio", "Servicios", "Acerca de", "Contacto"];

  return (
    <header
      onClick={isEditMode ? () => openStylePanel(id) : undefined}
      style={config}
      className="w-full h-full bg-neutral-900 border-b border-neutral-700/50 flex items-center justify-between px-6 py-4 hover:opacity-90 transition-opacity"
    >
      {/* Logo/Título */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {config?.title || "Mi Sitio"}
        </h1>
      </div>

      {/* Navegación */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
            style={{ pointerEvents: "none" }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Botones de autenticación */}
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 text-neutral-300 hover:text-white transition-colors text-sm font-medium border border-neutral-600 rounded-md hover:border-neutral-500"
          style={{ pointerEvents: "none" }}
        >
          {config?.loginText || "Iniciar Sesión"}
        </button>
        <button
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white transition-colors text-sm font-medium rounded-md"
          style={{ pointerEvents: "none" }}
        >
          {config?.registerText || "Registrarse"}
        </button>
      </div>

      {/* Menú móvil (hamburguesa) */}
      <div className="md:hidden flex items-center">
        <button
          className="text-neutral-300 hover:text-white transition-colors"
          style={{ pointerEvents: "none" }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
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
        <select name="" id="" required={config.required}>
          {
            config.options ? (
              config.options.split(',').map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))
            ) : (
              <>
                <option value="">Opcion 1</option>
                <option value="">Opcion 2</option>
                <option value="">Opcion 3</option>
              </>
            )
          }
        </select>
    
      </div>
    );
  },
  checkbox: ({ config, id }) => {
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
        <span className="text-neutral-300 text-sm">{config.label || 'Opcion'}</span>
      </label>
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
  card: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full bg-neutral-800 rounded-lg shadow-md border border-neutral-700/50 flex flex-col overflow-hidden hover:opacity-90 transition-opacity"
      >
        <div className="w-full h-1/2 bg-neutral-700 flex items-center justify-center">
          {config?.src ? (
            <img src={config.src} alt={config.alt || "Imagen de tarjeta"} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-12 h-12 text-neutral-400" />
          )}
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <h4 className="font-semibold text-neutral-200 text-base mb-1 truncate">{config?.title || "Título de la Tarjeta"}</h4>
          <p className="text-neutral-400 text-xs line-clamp-2">{config?.description || "Descripción corta de la tarjeta."}</p>
            <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded opacity-70" style={{pointerEvents: "none"}}>
              {config.buttonText || "Botón de Acción"}
            </button>
        </div>
      </div>
    );
  },

  form: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full bg-neutral-800 rounded-lg shadow-md border border-neutral-700/50 p-4 flex flex-col gap-3 justify-center hover:opacity-90 transition-opacity"
      >
        <h4 className="font-semibold text-neutral-200 text-base mb-1">{config?.title || "Formulario"}</h4>
        {/* Placeholder para campos de formulario */}
        <div className="w-full h-8 bg-neutral-700 rounded-md"></div>
        <div className="w-full h-8 bg-neutral-700 rounded-md"></div>
        <div className="w-full h-8 bg-neutral-700 rounded-md"></div>
        {/* Placeholder para botón de envío */}
        <button className="w-full h-9 bg-cyan-600 rounded-md text-white text-sm mt-2 opacity-70" style={{pointerEvents: "none"}}>
          Enviar
        </button>
      </div>
    );
  },

  list: ({ config, id }) => {
    const openStylePanel = useCanvasStore((state) => state.openStylePanel);
    const isEditMode = useCanvasStore((state) => state.isEditMode);

    const listItems = config?.options?.split(',').map(item => item.trim()).filter(item => item !== '') || ["Elemento 1", "Elemento 2", "Elemento 3"];
    const listType = config?.listType === 'ordered' ? 'ol' : 'ul';

    return (
      <div
        onClick={isEditMode ? () => openStylePanel(id) : undefined}
        style={config}
        className="w-full h-full bg-neutral-800 rounded-lg shadow-md border border-neutral-700/50 p-4 overflow-auto hover:opacity-90 transition-opacity"
      >
        {listType === 'ul' ? (
          <ul className="list-disc pl-5 text-neutral-300 text-sm space-y-1">
            {listItems.slice(0, 3).map((item, index) => ( // Mostrar solo los primeros 3 para placeholder
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
        {listItems.length > 3 && <p className="text-neutral-500 text-xs mt-1">...</p>}
      </div>
    );
  },

};
