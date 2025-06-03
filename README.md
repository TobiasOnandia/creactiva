Creactiva - Editor Visual de Sitios Web
¡Bienvenido al repositorio de Creactiva! Esta aplicación es un editor visual de sitios web de arrastrar y soltar, diseñado para permitir a los usuarios construir y personalizar páginas web de manera intuitiva. Construido con tecnologías modernas para una experiencia de usuario fluida y reactiva.

🚀 Tecnologías Utilizadas
✨ Características Implementadas
Aquí te presentamos las funcionalidades clave que ya están operativas en Creactiva:

🖱️ Arrastrar y Soltar Elementos:
Los usuarios pueden seleccionar y arrastrar elementos predefinidos (como encabezados, texto, imágenes, botones) desde un panel lateral (sidebar) y soltarlos directamente en el lienzo de diseño.

📐 Diseño de Cuadrícula Interactivo:
Los elementos en el lienzo se gestionan con react-grid-layout, lo que permite arrastrarlos y redimensionarlos libremente dentro de una cuadrícula responsiva, facilitando la organización del contenido.

✏️ Modos de Edición (Layout vs. Contenido):
La aplicación ofrece dos modos distintos para una experiencia de edición optimizada:

Modo Layout: Permite a los usuarios organizar, mover y redimensionar los elementos en la cuadrícula.

Modo Contenido: Deshabilita la interacción de la cuadrícula y permite a los usuarios editar el contenido real de cada elemento (ej. cambiar el texto de un encabezado, la URL de una imagen).

✍️ Edición de Contenido en Línea:
En el "Modo Contenido", los elementos como texto, encabezados, botones, imágenes y videos se vuelven editables directamente en el lienzo, proporcionando una experiencia WYSIWYG (Lo que ves es lo que obtienes).

🎨 Panel de Estilos (Diseño):
Se ha creado un panel lateral dedicado para ajustar las propiedades de estilo del elemento seleccionado, incluyendo:

Colores (fondo, texto).

Tipografía (tamaño de fuente, alineación).

Espaciado (padding).

Bordes (ancho, radio).

⚙️ Panel de Configuración del Sitio:
Un sub-sidebar diseñado para ajustes globales que afectan a todo el sitio web, como:

Información general (nombre del sitio, favicon).

Configuración SEO (título, meta descripción).

Inserción de código personalizado (<head>, </body>).

📦 Gestión de Estado Centralizada:
Se utiliza Zustand para manejar el estado global de los elementos del canvas y sus configuraciones, asegurando una sincronización eficiente y un rendimiento óptimo.

🧩 Componentes Reutilizables:
La arquitectura se basa en componentes UI modulares (FormField, Checkbox, AuthLayout, SectionPanel, StylePanel, SiteSettingsPanel, ItemRenderers) para promover la reutilización del código, la consistencia visual y facilitar el mantenimiento.

🚧 Tareas Pendientes
Para que Creactiva sea una herramienta completa y robusta, las siguientes tareas deben ser abordadas:

Eliminar Elementos del Canvas:

[ ] Agregar un botón o una opción para eliminar un único elemento del canvas. Esto podría ser un icono de "papelera" que aparece al seleccionar un elemento o al pasar el ratón sobre él en "Modo Layout" o "Modo Contenido".

[ ] Implementar la lógica en useCanvasStore para remover un elemento por su ID.

[ ] Asegurarse de que el elemento también se elimine del currentLayout en CanvasArea.

Selección de Elementos:

[ ] Implementar la lógica para seleccionar un elemento en el canvas (ej. al hacer clic sobre él).

[ ] Al seleccionar un elemento, el StylePanel debería abrirse y mostrar las propiedades de estilo del elemento seleccionado.

[ ] Desarrollar un estado global para el elemento seleccionado (ej. selectedElementId en useCanvasStore).

Conectar el Panel de Estilos:

[ ] Conectar los inputs del StylePanel a la acción updateCanvasElement en useCanvasStore para que los cambios de estilo se apliquen al elemento seleccionado en tiempo real.

[ ] Asegurarse de que los valores de los inputs en el StylePanel reflejen el estilo actual del elemento seleccionado.

Lógica del Panel de Configuración del Sitio:

[ ] Implementar la lógica para guardar y cargar las configuraciones globales del sitio (nombre del sitio, favicon, SEO, scripts).

Persistencia de Datos:

[ ] Implementar un sistema de persistencia (ej. Firestore, localStorage) para guardar el currentLayout y los canvasElements (incluyendo sus data y config) para que los diseños de los usuarios no se pierdan al recargar la página.

Más Tipos de Elementos:

[ ] Añadir más tipos de componentes al SectionPanel (ej. galerías de imágenes avanzadas, formularios, mapas, iconos, etc.).

[ ] Desarrollar sus respectivas vistas de contenido editable y opciones de estilo.

Mejoras de UI/UX:

[ ] Implementar un sistema de "deshacer/rehacer" para las acciones del editor.

[ ] Añadir herramientas de alineación y distribución para los elementos.

[ ] Mejorar el feedback visual durante el arrastre y redimensionamiento.

Validación de Formularios:

[ ] Implementar validación más robusta para los campos de registro e inicio de sesión.

Funcionalidad de Guardar/Publicar:

[ ] Desarrollar la capacidad de guardar el sitio web en un formato exportable o publicarlo.
