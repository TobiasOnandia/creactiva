// components/TemplatesPanel.tsx
import { DraggableTemplate } from "@/components/common/DraggableTemplate";
import { TemplateNodeData } from "@/types/panel/TemplateNodeType";
import { LayoutTemplate, SearchIcon } from "lucide-react";
// Importa los tipos que definimos

// Configuración de categorías (se mantiene igual)
const categories = ["Landing", "Dashboard", "Blog", "Portfolio"];

// Configuración de plantillas
// La propiedad 'structure' ahora usa el tipo TemplateNodeData
export const templates: {
  title: string;
  description: string;
  structure: TemplateNodeData; // <-- Ahora es TemplateNodeData
}[] = [
  {
    title: "Landing Clásica",
    description: "Header + Hero + Contenido + Footer",
    structure: { // <-- Objeto de datos para el contenedor principal
      type: 'container', // Es un contenedor
      containerType: 'div', // El tipo de elemento HTML para el contenedor
      classes: 'space-y-1.5', // Clases de Tailwind para el layout vertical
      children: [ // Array de nodos hijos
        { // Nodo para el Header
          type: 'element', // Es un elemento básico
          elementType: 'header', // El tipo de elemento HTML
          elementLabel: 'Header', // Etiqueta para UI
          elementColorClass: 'bg-cyan-500/30', // Clase de color para previsualización
          classes: 'h-3 rounded-full', // Clases adicionales para el tamaño/forma
        },
        { // Nodo para el Hero
          type: 'container', // El Hero es un contenedor (podría tener elementos dentro)
          containerType: 'section', // Tipo semántico para el Hero
          elementLabel: 'Hero Section',
          elementColorClass: 'bg-purple-500/30',
          classes: 'h-8 rounded-lg',
          children: [] // Por ahora vacío, pero podrías añadir elementos hijos aquí
        },
        { // Nodo para el Contenido Principal
          type: 'container', // El contenido principal es un contenedor
          containerType: 'main', // Tipo semántico para el contenido principal
          elementLabel: 'Main Content',
          elementColorClass: 'bg-rose-500/30',
          classes: 'h-20 rounded-lg',
          children: [] // Aquí irían secciones, artículos, etc.
        },
         { // Nodo para otro bloque de contenido (ej: sección de características)
          type: 'container',
          containerType: 'section',
          elementLabel: 'Features Section',
          elementColorClass: 'bg-emerald-500/30',
          classes: 'h-24 rounded-lg',
          children: [] // Aquí irían elementos o contenedores de características
        },
        { // Nodo para el Footer
          type: 'element', // Es un elemento básico
          elementType: 'footer', // El tipo de elemento HTML
          elementLabel: 'Footer',
          elementColorClass: 'bg-cyan-500/30',
          classes: 'h-3 rounded-full',
        },
      ],
    },
  },
  {
    title: "Dashboard",
    description: "Sidebar + Header + Contenido",
    structure: {
      type: 'container',
      containerType: 'div',
      classes: 'flex gap-1.5 h-28', // Contenedor principal con layout flex horizontal
      children: [
        { // Nodo para el Sidebar
          type: 'container',
          containerType: 'aside', // Tipo semántico para el sidebar
          elementLabel: 'Sidebar',
          elementColorClass: 'bg-amber-500/30',
          classes: 'w-1/4 rounded-lg', // Clases para el ancho del sidebar
          children: [] // Podría tener elementos de navegación (ul, li, a)
        },
        { // Contenedor para el Header y Contenido (ocupa el espacio restante)
          type: 'container',
          containerType: 'div',
          classes: 'flex-1 space-y-1.5', // Ocupa espacio restante y layout flex vertical para sus hijos
          children: [
            { // Nodo para el Header del Dashboard
              type: 'element',
              elementType: 'header',
              elementLabel: 'Dashboard Header',
              elementColorClass: 'bg-blue-500/30',
              classes: 'h-4 rounded-full',
            },
            { // Nodo para el Contenido Principal del Dashboard
              type: 'container',
              containerType: 'div', // O 'main'
              elementLabel: 'Dashboard Content',
              elementColorClass: 'bg-indigo-500/30',
              classes: 'h-22 rounded-lg',
              children: [] // Aquí irían gráficos, tablas, etc.
            }
          ]
        }
      ]
    }
  },
  {
    title: "Blog Moderno",
    description: "Header + Contenido + Sidebar + Footer",
    structure: {
      type: 'container',
      containerType: 'div',
      classes: 'space-y-1.5 h-24', // Contenedor principal con layout vertical
      children: [
        { // Nodo para el Header
          type: 'element',
          elementType: 'header',
          elementLabel: 'Blog Header',
          elementColorClass: 'bg-cyan-500/30',
          classes: 'h-3 rounded-full',
        },
        { // Contenedor para Contenido y Sidebar (layout flex horizontal)
          type: 'container',
          containerType: 'div',
          classes: 'flex gap-1.5 flex-1', // Ocupa espacio restante y layout horizontal
          children: [
            { // Nodo para el Contenido del Blog
              type: 'container',
              containerType: 'main', // Tipo semántico para el contenido principal
              elementLabel: 'Blog Content',
              elementColorClass: 'bg-purple-500/30',
              classes: 'w-3/4 rounded-lg', // Ocupa 3/4 del ancho
              children: [] // Aquí irían artículos, comentarios, etc.
            },
            { // Nodo para el Sidebar del Blog
              type: 'container',
              containerType: 'aside', // Tipo semántico para el sidebar
              elementLabel: 'Blog Sidebar',
              elementColorClass: 'bg-emerald-500/30',
              classes: 'w-1/4 rounded-lg', // Ocupa 1/4 del ancho
              children: [] // Podría tener widgets, enlaces, etc.
            }
          ]
        },
        { // Nodo para el Footer
          type: 'element',
          elementType: 'footer',
          elementLabel: 'Blog Footer',
          elementColorClass: 'bg-cyan-500/30',
          classes: 'h-3 rounded-full',
        },
      ]
    }
  },
   {
    title: "Portafolio",
    description: "Hero Fullscreen + Grid + Contacto",
    structure: {
      type: 'container',
      containerType: 'div',
      classes: 'space-y-1.5 h-24', // Contenedor principal con layout vertical
      children: [
        { // Nodo para el Hero
          type: 'container',
          containerType: 'section',
          elementLabel: 'Hero Section',
          elementColorClass: 'bg-rose-500/30',
          classes: 'h-12 rounded-lg',
          children: [] // Podría tener un h1, p, button
        },
        { // Nodo para el Grid de Proyectos
          type: 'container',
          containerType: 'div',
          classes: 'grid grid-cols-2 gap-1.5', // Contenedor con layout grid de 2 columnas
          children: [
             { // Elemento dentro del grid (ej: tarjeta de proyecto)
              type: 'element',
              elementType: 'div', // Podría ser 'article' o 'div'
              elementLabel: 'Project Card',
              elementColorClass: 'bg-blue-500/30',
              classes: 'h-6 rounded',
            },
             { // Otro elemento dentro del grid
              type: 'element',
              elementType: 'div',
              elementLabel: 'Project Card',
              elementColorClass: 'bg-blue-500/30',
              classes: 'h-6 rounded',
            },
             // Puedes añadir más elementos 'element' aquí para más columnas/filas en el grid
          ]
        },
        { // Nodo para la Sección de Contacto
          type: 'container',
          containerType: 'section',
          elementLabel: 'Contact Section',
          elementColorClass: 'bg-amber-500/30',
          classes: 'h-6 rounded-lg',
          children: [] // Podría tener un form, h2, p
        },
      ]
    }
  },
    {
    title: "Tienda Online",
    description: "Navbar complejo + Product Grid + Carrito",
    structure: {
      type: 'container',
      containerType: 'div',
      classes: 'space-y-1.5 h-24', // Contenedor principal con layout vertical
      children: [
        { // Nodo para el Navbar
          type: 'container',
          containerType: 'nav', // Tipo semántico para la navegación
          elementLabel: 'Navbar',
          elementColorClass: 'bg-purple-500/30',
          classes: 'h-6 rounded-lg',
          children: [] // Podría tener a, ul, li, button (carrito)
        },
         { // Un elemento separador visual
          type: 'element',
          elementType: 'p', // Un elemento hr
          elementLabel: 'Separator',
          elementColorClass: 'bg-cyan-500/30',
          classes: 'h-0.5 rounded-full',
        },
        { // Nodo para el Grid de Productos
          type: 'container',
          containerType: 'div',
          classes: 'grid grid-cols-3 gap-1.5', // Contenedor con layout grid de 3 columnas
          children: [
             { // Elemento dentro del grid (ej: tarjeta de producto)
              type: 'element',
              elementType: 'div', // Podría ser 'article' o 'div'
              elementLabel: 'Product Card',
              elementColorClass: 'bg-emerald-500/30',
              classes: 'h-6 rounded',
            },
              { // Otro elemento dentro del grid
              type: 'element',
              elementType: 'div',
              elementLabel: 'Product Card',
              elementColorClass: 'bg-emerald-500/30',
              classes: 'h-6 rounded',
            },
              { // Otro elemento dentro del grid
              type: 'element',
              elementType: 'div',
              elementLabel: 'Product Card',
              elementColorClass: 'bg-emerald-500/30',
              classes: 'h-6 rounded',
            },
          ]
        },
      ]
    }
  },
];

// Componente para renderizar cada tarjeta de plantilla en el panel
// Ahora espera 'structure' de tipo TemplateNodeData
const TemplateCard = ({ title, description, structure }: { title: string; description: string; structure: TemplateNodeData }) => (
  // Pasa la estructura de datos al componente DraggableTemplate
  <DraggableTemplate
    title={title}
    description={description}
    structure={structure}
  />
);

// Componente principal del Panel de Plantillas
export const TemplatesPanel = () => {
  return (
    <section className="h-full bg-neutral-900/80 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/40 w-80 flex flex-col">
      {/* Encabezado del panel */}
      <header className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-cyan-400" />
            Plantillas
          </h3>
          {/* Botón de búsqueda (funcionalidad no implementada aquí) */}
          <button className="p-1.5 hover:bg-neutral-800/50 rounded-lg">
            <SearchIcon className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
        <p className="text-sm text-neutral-400 mt-1">
          Estructuras predefinidas para tu página
        </p>
      </header>

      {/* Sección de Categorías (se mantiene igual) */}
      <article className="flex items-center gap-1 p-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-3 py-1 text-xs rounded-md bg-neutral-800/50 border border-white/10 hover:border-cyan-500/30 transition-colors"
          >
            {cat}
          </button>
        ))}
      </article>

      {/* Listado de Plantillas Arrastrables */}
      <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700 p-4">
        <article className="grid grid-cols-1 gap-4">
          {/* Mapea sobre el array de plantillas y renderiza un TemplateCard para cada una */}
          {templates.map((tpl) => (
            <TemplateCard key={tpl.title} {...tpl} />
          ))}
        </article>
      </section>
    </section>
  );
};
