import type { ChildrenProps } from "./types";

export const Badge = ({ children }: ChildrenProps) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-200">
    {children}
  </span>
);