export const SectionHeader = ({ sectionName }: { sectionName?: string }) => (
  <div className="absolute top-0 left-0 right-0 p-4 text-center">
    <h2 className="text-sm font-medium text-neutral-400">
      {sectionName || "Sin sección seleccionada"}
    </h2>
  </div>
);
