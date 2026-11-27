"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/utils.js";

export type StatusTone = "ok" | "brand" | "muted";

function dotClass(tone: StatusTone): string {
  switch (tone) {
    case "ok":
      return "bg-ok shadow-[0_0_8px_var(--ok-glow)]";
    case "brand":
      return "bg-brand shadow-[0_0_8px_var(--brand-glow)]";
    case "muted":
      return "bg-text-4";
  }
}

function ringClass(tone: StatusTone): string {
  switch (tone) {
    case "ok":
      return "bg-ok/60";
    case "brand":
      return "bg-brand/60";
    case "muted":
      return "bg-text-4/60";
  }
}

export function Status({
  tone = "ok",
  pulse = true,
  children,
  className,
}: {
  tone?: StatusTone;
  pulse?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      data-slot="status"
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.12em] text-text-2 uppercase",
        className,
      )}
    >
      <span className="relative inline-block size-1.5 shrink-0" aria-hidden="true">
        {pulse ? (
          <span
            className={cn(
              "absolute inset-0 rounded-full motion-safe:animate-ping",
              ringClass(tone),
            )}
          />
        ) : null}
        <span className={cn("relative block size-1.5 rounded-full", dotClass(tone))} />
      </span>
      {children}
    </span>
  );
}
