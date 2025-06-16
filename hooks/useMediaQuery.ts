import { useState, useEffect } from 'react';

/**
 * Custom hook para detectar si una media query coincide con la pantalla actual
 * @param query La media query CSS a evaluar (ej: '(max-width: 768px)')
 * @returns Boolean indicando si la media query coincide
 */
export function useMediaQuery(query: string): boolean {
  // Inicializar con false si estamos en el servidor o true/false según el match inicial en cliente
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // En el cliente, verificamos el estado inicial
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Función que actualiza el estado cuando cambia el tamaño de pantalla
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Agregar listener para cambios en la media query
    media.addEventListener('change', listener);

    // Cleanup: remover el listener cuando el componente se desmonte
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]); // Re-ejecutar solo si cambia la query

  return matches;
}

/**
 * Proporciona breakpoints predefinidos para facilitar el uso
 */
export const useBreakpoint = {
  useMobile: () => useMediaQuery('(max-width: 767px)'),
  useTablet: () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)'),
  useDesktop: () => useMediaQuery('(min-width: 1024px)'),
  useLargeDesktop: () => useMediaQuery('(min-width: 1280px)'),
};

export default useMediaQuery;
