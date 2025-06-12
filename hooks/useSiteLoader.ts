'use client';

import { useCanvasStore } from "@/store/canvasStore";
import { loadSite } from "@/app/actions/loadSiteAction";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useSiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setSections = useCanvasStore((state) => state.setSections);
  const setActiveSection = useCanvasStore((state) => state.setActiveSection);

  useEffect(() => {
    const loadSiteData = async () => {
      try {
        setError(null);
        const result = await loadSite();

        if (result.success && result.sections) {
          setSections(result.sections);

          const homeSection = result.sections.find(section => section.isHome);
          if (homeSection) {
            setActiveSection(homeSection.id);
          } else if (result.sections.length > 0) {
            setActiveSection(result.sections[0].id);
          }

          // Solo mostrar el toast de éxito si no es la primera carga
          if (result.sections.length > 0) {
            toast.success('Sitio cargado correctamente', {
              position: 'top-center',
              duration: 3000,
              style: {
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }
            });
          }
        } else {
          throw new Error(result.error || 'Error desconocido al cargar el sitio');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al cargar el sitio';
        console.error('Error al cargar el sitio:', error);
        setError(errorMessage);
        toast.error(errorMessage, {
          position: 'top-center',
          duration: 5000,
          style: {
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSiteData();
  }, [setSections, setActiveSection]);

  return { isLoading, error };
}
