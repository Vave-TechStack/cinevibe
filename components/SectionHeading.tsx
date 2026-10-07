interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  badge?: string;
}

export function SectionHeading({
  title,
  subtitle,
  actionLabel,
  actionHref,
  badge,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {badge && (
          <span className="mb-2 inline-block rounded-full border border-cinema-gold/30 bg-cinema-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cinema-gold">
            {badge}
          </span>
        )}
        <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="text-sm font-semibold text-cinema-gold hover:text-yellow-400 transition-colors"
        >
          {actionLabel} →
        </a>
      )}
    </div>
  );
}
