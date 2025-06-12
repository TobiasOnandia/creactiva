import { CanvasElement } from "@/types/canvas/CanvasTypes";

export type TemplateConfig = {
  elements: CanvasElement[];
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minH: number;
    minW: number;
    static: boolean;
    isDraggable: boolean;
  }[];
};

export const templateConfigs: Record<string, TemplateConfig> = {
  landing: {
    elements: [
      {
        id: "header",
        type: "header",
        config: {
          type: "header",
          content: "Mi Landing Page",
          fontSize: 48,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1a1a1a",
          marginBottom: 24
        }
      },
      {
        id: "hero",
        type: "paragraph",
        config: {
          type: "paragraph",
          content: "Transforma tus ideas en realidad con nuestra plataforma intuitiva",
          fontSize: 24,
          textAlign: "center",
          color: "#4a4a4a",
          marginBottom: 48
        }
      },
      {
        id: "cta",
        type: "button",
        config: {
          type: "button",
          content: "Comenzar Ahora",
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          fontSize: 18,
          padding: 16,
          borderRadius: 8,
          textAlign: "center"
        }
      }
    ],
    layout: [
      {
        i: "header",
        x: 0,
        y: 0,
        w: 12,
        h: 2,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "hero",
        x: 0,
        y: 2,
        w: 12,
        h: 3,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "cta",
        x: 4,
        y: 5,
        w: 4,
        h: 2,
        minH: 2,
        minW: 2,
        static: false,
        isDraggable: true
      }
    ]
  },
  dashboard: {
    elements: [
      {
        id: "welcomeHeader",
        type: "header",
        config: {
          type: "header",
          content: "Bienvenido al Dashboard",
          fontSize: 32,
          fontWeight: "bold",
          color: "#1a1a1a",
          marginBottom: 16
        }
      },
      {
        id: "stats1",
        type: "text",
        config: {
          type: "text",
          content: "Estadísticas Principales",
          backgroundColor: "#f3f4f6",
          padding: 24,
          borderRadius: 8,
          fontSize: 18
        }
      },
      {
        id: "stats2",
        type: "text",
        config: {
          type: "text",
          content: "Datos Recientes",
          backgroundColor: "#f3f4f6",
          padding: 24,
          borderRadius: 8,
          fontSize: 18
        }
      }
    ],
    layout: [
      {
        i: "welcomeHeader",
        x: 0,
        y: 0,
        w: 12,
        h: 2,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "stats1",
        x: 0,
        y: 2,
        w: 6,
        h: 4,
        minH: 3,
        minW: 3,
        static: false,
        isDraggable: true
      },
      {
        i: "stats2",
        x: 6,
        y: 2,
        w: 6,
        h: 4,
        minH: 3,
        minW: 3,
        static: false,
        isDraggable: true
      }
    ]
  },
  blog: {
    elements: [
      {
        id: "blogTitle",
        type: "header",
        config: {
          type: "header",
          content: "Mi Blog",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1a1a1a",
          marginBottom: 32
        }
      },
      {
        id: "blogPost",
        type: "text",
        config: {
          type: "text",
          content: "Última Publicación",
          fontSize: 24,
          color: "#4a4a4a",
          marginBottom: 16
        }
      },
      {
        id: "sidebar",
        type: "text",
        config: {
          type: "text",
          content: "Categorías",
          backgroundColor: "#f3f4f6",
          padding: 16,
          borderRadius: 8,
          fontSize: 16
        }
      }
    ],
    layout: [
      {
        i: "blogTitle",
        x: 0,
        y: 0,
        w: 12,
        h: 2,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "blogPost",
        x: 0,
        y: 2,
        w: 8,
        h: 6,
        minH: 4,
        minW: 4,
        static: false,
        isDraggable: true
      },
      {
        i: "sidebar",
        x: 8,
        y: 2,
        w: 4,
        h: 6,
        minH: 4,
        minW: 2,
        static: false,
        isDraggable: true
      }
    ]
  },
  portfolio: {
    elements: [
      {
        id: "portfolioHeader",
        type: "header",
        config: {
          type: "header",
          content: "Mi Portafolio",
          fontSize: 48,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1a1a1a",
          marginBottom: 32
        }
      },
      {
        id: "gallery",
        type: "gallery",
        config: {
          type: "gallery",
          columns: 3,
          gap: 16,
        },
      },
      {
        id: "contact",
        type: "text",
        config: {
          type: "text",
          content: "¡Contáctame!",
          fontSize: 24,
          textAlign: "center",
          color: "#4a4a4a",
          marginTop: 32
        }
      }
    ],
    layout: [
      {
        i: "portfolioHeader",
        x: 0,
        y: 0,
        w: 12,
        h: 2,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "gallery",
        x: 0,
        y: 2,
        w: 12,
        h: 6,
        minH: 4,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "contact",
        x: 0,
        y: 8,
        w: 12,
        h: 2,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      }
    ]
  },
  ecommerce: {
    elements: [
      {
        id: "shopHeader",
        type: "header",
        config: {
          type: "header",
          content: "Mi Tienda",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1a1a1a",
          marginBottom: 32
        }
      },
      {
        id: "productsGrid",
        type: "gallery",
        config: {
          type: "gallery",
          columns: 4,
          gap: 24,
        }
      },
      {
        id: "cart",
        type: "text",
        config: {
          type: "text",
          content: "Carrito",
          fontSize: 20,
          backgroundColor: "#f3f4f6",
          padding: 16,
          borderRadius: 8
        }
      }
    ],
    layout: [
      {
        i: "shopHeader",
        x: 0,
        y: 0,
        w: 12,
        h: 2,
        minH: 2,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "productsGrid",
        x: 0,
        y: 2,
        w: 9,
        h: 8,
        minH: 6,
        minW: 6,
        static: false,
        isDraggable: true
      },
      {
        i: "cart",
        x: 9,
        y: 2,
        w: 3,
        h: 8,
        minH: 4,
        minW: 2,
        static: false,
        isDraggable: true
      }
    ]
  }
};
