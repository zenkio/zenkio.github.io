export const Card = ({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 ${className}`}
  >
    {children}
  </div>
);