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

Por el momento, las siguientes funcionalidades están planeadas o en desarrollo. ¡Contribuciones y feedback son muy bienvenidos! 🙌

### 1. Eliminar Elementos del Canvas
- [x] Agregar un botón o icono de “papelera” al seleccionar un elemento (Modo Layout o Contenido).  
- [x] Implementar la lógica en `useCanvasStore` para remover un elemento por su ID.  
- [x] Asegurar que el elemento se elimine también de `currentLayout` en `CanvasArea`.

### 2. Selección de Elementos
- [x] Implementar la lógica para seleccionar un elemento en el canvas (p. ej. al hacer clic sobre él).  
- [x] Al seleccionar, el `StylePanel` debe abrirse mostrando las propiedades de estilo del elemento.  
- [x] Crear un estado global `selectedElementId` en `useCanvasStore` y mantenerlo sincronizado.

### 3. Conexión del Panel de Estilos
- [x] Conectar los inputs del `StylePanel` a la acción `updateCanvasElement` en `useCanvasStore` para aplicar estilos en tiempo real.  
- [x] Asegurar que los valores de los inputs reflejen el estilo actual del elemento seleccionado.

### 4. Lógica del Panel de Configuración del Sitio
- [ ] Implementar la lógica para guardar y cargar configuraciones globales (nombre del sitio, favicon, SEO, scripts).  
- [ ] Validar formularios y mostrar feedback de errores (por ejemplo, URL inválida, campos obligatorios).

### 5. Persistencia de Datos
- [x] Integrar un sistema de persistencia con Supabase para:
  - Guardar `currentLayout` y `canvasElements`.  
  - Restaurar el diseño del usuario al recargar la página.  
- [x] Manejar versiones o “snapshots” del proyecto para permitir “deshacer/rehacer”.

### 6. Más Tipos de Elementos
- [ ] Ampliar `SectionPanel` con nuevos componentes:
  - Galerías avanzadas (carruseles de imágenes, sliders).  
  - Formularios de contacto (inputs, selects, checkbox, botones de envío).  
  - Mapas interactivos (Google Maps, OpenStreetMap).  
  - Iconos e ilustraciones SVG personalizables.  
- [ ] Desarrollar vistas de contenido editable y estilos configurables para cada tipo.

### 7. Mejoras de UI/UX
- [ ] Implementar “Deshacer/Rehacer” para las acciones del editor (ctrl+Z, ctrl+Y).  
- [x] Añadir herramientas de alineación y distribución (alinear a la izquierda, centrar, justificar).  
- [x] Mejorar el feedback visual al arrastrar y redimensionar (guías, sombras, líneas de ayuda).  

### 8. Validación de Formularios
- [ ] Implementar validación robusta en formularios de registro e inicio de sesión.  
- [x] Mostrar mensajes de error, advertencia y éxito (toasts o banners).

### 9. Funcionalidad de Guardar y Publicar
- [ ] Permitir exportar el sitio web en formato estático (`.zip`, HTML/CSS/JS).  
- [ ] Integrar un flujo de “publicación” automático (por ejemplo, despliegue a Netlify, Vercel o GitHub Pages).  
- [ ] Mostrar vista previa del sitio final en un subdominio temporal.
