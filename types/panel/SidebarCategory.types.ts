interface DraggableElementData {
  type: string;
  icon: JSX.Element;
  label: string;
  colorClass: string;
  id: string;
}

// Define a type for a sidebar category
interface SidebarCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  elements: DraggableElementData[];
}
