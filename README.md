# Creactiva — Editor Visual de Sitios Web

¡Bienvenido a **Creactiva**! 🎉  
Creactiva es un editor visual de sitios web de arrastrar y soltar (drag & drop), diseñado para que los usuarios construyan y personalicen páginas web de manera intuitiva y sin necesidad de programar. Con una experiencia fluida y reactiva, podrás ver los cambios en tiempo real y ajustar cada detalle al instante.

## 🚀 Tecnologías Utilizadas

- **React**
- **Next.js**
- **Zustand**
- **react-grid-layout**
- **Tailwind CSS**
- **Lucide React**
- **TypeScript**
- **ESLint + Prettier**

## ✨ Características Implementadas

1. ### 🖱️ Arrastrar y Soltar Elementos

   - Panel lateral (sidebar) con elementos predefinidos: encabezados, texto, imágenes, botones, videos, galería, etc.
   - Permite arrastrar desde el sidebar y soltar en el lienzo principal (canvas).

2. ### 📐 Diseño de Cuadrícula Interactivo

   - Utiliza **react-grid-layout** para manejar la posición y tamaño de cada elemento.
   - Soporta arrastrar, redimensionar y soltar dentro de una cuadrícula responsiva.

3. ### ✏️ Modos de Edición (Layout vs. Contenido)

   - **Modo Layout**:
     - Organizar, mover y redimensionar elementos en la cuadrícula.
     - Ideal para estructurar la página sin editar el contenido.
   - **Modo Contenido**:
     - Deshabilita la interacción de la cuadrícula y permite editar texto, imágenes y otros contenidos directamente en el canvas.
     - Experiencia WYSIWYG (Lo que ves es lo que obtienes).

4. ### ✍️ Edición de Contenido en Línea

   - Todos los elementos (texto, encabezados, botones, imágenes, videos) son editables directamente en el lienzo cuando estás en **Modo Contenido**.
   - Cambia texto, URLs de imagen, enlaces de video y más sin salir del canvas.

5. ### 🎨 Panel de Estilos (Style Panel)

   - Panel lateral dedicado para ajustar propiedades de estilo del elemento seleccionado.
   - Propiedades disponibles:
     - **Colores**: fondo, texto.
     - **Tipografía**: tamaño de fuente, alineación, familia de fuentes (configurable).
     - **Espaciado**: padding, margen (próximamente).
     - **Bordes**: ancho, color y radio.

6. ### ⚙️ Panel de Configuración del Sitio

   - Sub-sidebar para ajustes globales que afectan a todo el sitio:
     - **Información general**: nombre del sitio, favicon, logo.
     - **SEO**: título, meta descripción, palabras clave.
     - **Scripts personalizados**: insertar código en `<head>` o antes de `</body>`.

7. ### 📦 Gestión de Estado Centralizada

   - **Zustand** maneja el estado global de:
     - `canvasElements`: estructura y datos de cada elemento en el canvas.
     - `currentLayout`: posiciones y tamaños para react-grid-layout.
     - `isEditMode`: determina si estamos en modo “Layout” o “Contenido”.
     - `selectedElementId`: ID del elemento actualmente seleccionado.

8. ### 🧩 Componentes Reutilizables y Modulares
   - **FormField**, **Checkbox**, **AuthLayout**, **SectionPanel**, **StylePanel**, **SiteSettingsPanel**, **ItemRenderers**, etc.
   - Fomentan la consistencia visual y facilitan el mantenimiento a largo plazo.

---

## 📋 Tareas Pendientes (Roadmap)

### ✅ Funciones Implementadas

1. **Eliminación de Elementos**

   - Botón de papelera para eliminar elementos
   - Lógica de eliminación en `useCanvasStore`
   - Sincronización con `currentLayout`

2. **Selección de Elementos**

   - Selección por clic en elementos
   - Apertura automática del `StylePanel`
   - Estado global `selectedElementId`

3. **Panel de Estilos**

   - Conexión con `updateCanvasElement`
   - Actualización en tiempo real de estilos
   - Sincronización bidireccional de valores

4. **Persistencia de Datos**

   - Integración con Supabase
   - Guardado y carga de diseños
   - Sistema de snapshots

5. **Mejoras de UI/UX**
   - Herramientas de alineación
   - Feedback visual mejorado
   - Mensajes de estado (toasts)

### 🚧 En Progreso

1. **Panel de Configuración del Sitio**

   - [ ] Guardado de configuraciones globales
   - [ ] Validación de formularios
   - [ ] Gestión de SEO

2. **Nuevos Tipos de Elementos**

   - [ ] Galerías avanzadas
   - [ ] Formularios de contacto
   - [ ] Mapas interactivos
   - [ ] Iconos SVG personalizables

3. **Funcionalidades de Editor**
   - [x] Sistema de Deshacer/Rehacer
   - [ ] Validación de formularios
   - [ ] Exportación a estáticos

### 📱 Próximamente: Modo Móvil

Actualmente estoy trabajando en la implementación del modo móvil que incluirá:

- [ ] Vista previa responsiva
- [ ] Controles adaptativos para pantallas táctiles
- [ ] Menús optimizados para móviles
- [ ] Ajustes específicos para dispositivos móviles

### 💡 Ideas Futuras

- Exportación a múltiples formatos
- Integración con plataformas de hosting
- Plantillas predefinidas
- Colaboración en tiempo real

¡Tus sugerencias son bienvenidas! 🙌
