"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/utils.js";

export type StatusTone = "ok" | "brand" | "muted";

function dotClass(tone: StatusTone): string {
  switch (tone) {
    case "ok":
      return "bg-ok shadow-[0_0_8px_rgba(74,222,128,0.7)]";
    case "brand":
      return "bg-brand shadow-[0_0_8px_rgba(255,178,36,0.55)]";
    case "muted":
      return "bg-text-4";
  }
}

function ringClass(tone: StatusTone): string {
  switch (tone) {
    case "ok":
      return "border-ok";
    case "brand":
      return "border-brand";
    case "muted":
      return "border-text-4";
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
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.12em] text-text-2 uppercase",
        className,
      )}
    >
      <span className="relative inline-block size-1.5 shrink-0" aria-hidden="true">
        <span className={cn("absolute inset-0 rounded-full", dotClass(tone))} />
        {pulse ? (
          <span
            className={cn(
              "absolute -inset-[3px] rounded-full border opacity-0 motion-safe:animate-ripple",
              ringClass(tone),
            )}
          />
        ) : null}
      </span>
      {children}
    </span>
  );
}
