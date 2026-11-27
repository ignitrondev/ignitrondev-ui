"use client";

import type { ComponentProps } from "react";
import { cn } from "../lib/utils.js";

function CardCorners() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -left-px size-2.5 border-t border-l border-text-3"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -right-px size-2.5 border-t border-r border-text-3"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -left-px size-2.5 border-b border-l border-text-3"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -bottom-px size-2.5 border-r border-b border-text-3"
      />
    </>
  );
}

export function Card({
  corners = false,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { corners?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative border border-line-strong bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      {corners ? <CardCorners /> : null}
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("grid gap-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl leading-tight font-semibold tracking-[-0.03em]", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6 pb-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2.5 px-6 pb-6", className)}
      {...props}
    />
  );
}
