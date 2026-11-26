"use client";

import { forwardRef, type ComponentProps } from "react";
import { cn } from "../lib/utils.js";

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-32 w-full resize-y border border-input bg-surface px-3 py-3 text-sm leading-relaxed text-foreground transition-colors outline-none placeholder:text-text-4 focus-visible:border-brand disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    );
  },
);
