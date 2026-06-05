type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-cotton-700">{eyebrow}</p> : null}
      <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight text-cotton-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-cotton-900/70">{description}</p> : null}
    </div>
  );
}
