import { CanvasItemContent } from "@/components/canvas/CanvasItemContent";

export interface PublicPageRendererProps {
  section: {
    id: string;
    name: string;
    slug: string;
    elements: { id: string; type: string; config: any }[];
    layouts: { id: string; layout_data: any }[];
  };
}

export const PublicPageRenderer = ({ section }: PublicPageRendererProps) => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">{section.name}</h1>
      <div className="space-y-4">
        {section.elements.map((el) => (
          <CanvasItemContent
            key={el.id}
            id={el.id}
            type={el.type}
            config={el.config}
          />
        ))}
      </div>
    </div>
  );
};
