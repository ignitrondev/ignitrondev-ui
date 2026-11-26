"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/utils.js";

export function Kicker({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] text-text-3 uppercase",
        className,
      )}
    >
      {index ? <b className="font-medium text-brand">{index}</b> : null}
      <span>{children}</span>
      <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
    </p>
  );
}
