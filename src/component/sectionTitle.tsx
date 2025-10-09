export const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-10 text-center">
    {eyebrow && (
      <p className="mb-2 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 dark:text-zinc-300">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
        {subtitle}
      </p>
    )}
  </div>
);