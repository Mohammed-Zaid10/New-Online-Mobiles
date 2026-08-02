export function Section({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-border/60 bg-hero-gradient">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
