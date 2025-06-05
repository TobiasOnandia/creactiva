import { useCallback } from "react";

export function useDragStart() {
  const handleDragStart = useCallback((e: React.DragEvent<HTMLElement>) => {
    const elementType = e.currentTarget.id;
    e.dataTransfer.setData("text/plain", elementType);
    e.dataTransfer.effectAllowed = "move";
    
    e.currentTarget.style.opacity = "0.5";
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.opacity = "1";
  }, []);

  return {
    handleDragStart,
    handleDragEnd,
  };
}
