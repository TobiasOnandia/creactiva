export const Section = ({
  title,
  dotColor,
  children,
}: {
  title: string;
  dotColor: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4 w-68">
    <header className="flex items-center gap-2 px-1">
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <h4 className="text-sm font-medium text-neutral-300 tracking-wide flex-1">
        {title}
      </h4>
    </header>
    <article className="flex flex-col gap-4">{children}</article>
  </section>
);
