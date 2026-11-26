"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/utils.js";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 border px-2 py-[5px] font-mono text-[10px] leading-none font-medium tracking-[0.1em] whitespace-nowrap uppercase",
  {
    variants: {
      tone: {
        neutral: "border-line-strong text-text-3",
        brand: "border-brand-line text-brand",
        ok: "border-ok/40 text-ok",
        research: "border-dashed border-text-2 text-text-2",
        planned: "border-line-strong text-text-4",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
