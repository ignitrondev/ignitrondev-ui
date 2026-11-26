"use client";

import { forwardRef, type ComponentProps } from "react";
import { cn } from "../lib/utils.js";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full border border-input bg-surface px-3 text-sm text-foreground transition-colors outline-none placeholder:text-text-4 focus-visible:border-brand disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
});
