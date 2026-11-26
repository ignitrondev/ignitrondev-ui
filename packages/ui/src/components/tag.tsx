"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/utils.js";

export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex border border-line-strong px-[9px] py-[5px] font-mono text-[10px] leading-[1.2] font-medium tracking-[0.04em] text-text-3",
        className,
      )}
      {...props}
    />
  );
}
