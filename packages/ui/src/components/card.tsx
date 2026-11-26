"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/utils.js";

export function Card({
  corners = false,
  className,
  ...props
}: ComponentProps<"div"> & { corners?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "border border-line-strong bg-surface text-card-foreground",
        corners && "corners",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("grid gap-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-xl leading-tight font-semibold tracking-[-0.03em]", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm leading-relaxed text-text-2", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2.5 px-6 pb-6", className)} {...props} />;
}
