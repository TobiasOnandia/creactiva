import { DraggableElement } from "@/components/common/DraggableElement";
import { sections } from "@/components/editor/panel/SecondaryPanel";

export const SectionPanel = ({
  title,
  icon,
  elements,
}: (typeof sections)[0]) => (
  <article className="space-y-4">
    <h4 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
      {icon}
      {title}
    </h4>
    <div className="grid grid-cols-2 gap-2">
      {elements.map(({ type, icon, label, colorClass }) => (
        <DraggableElement
          key={crypto.randomUUID()}
          id={crypto.randomUUID()}
          type={type}
          icon={icon}
          label={label}
          colorClass={colorClass}
        />
      ))}
    </div>
  </article>
);
