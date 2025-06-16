import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Función que actualiza el estado cuando cambia el tamaño de pantalla
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Agregar listener para cambios en la media query
    media.addEventListener("change", listener);

    // Cleanup: remover el listener cuando el componente se desmonte
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]); // Re-ejecutar solo si cambia la query

  return matches;
}


export function useBreakpoints() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
}

export function useMobile() {
  return useMediaQuery("(max-width: 767px)");
}


export function useTablet() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}

export default useMediaQuery;
