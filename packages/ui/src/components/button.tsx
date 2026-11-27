"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../lib/utils.js";

const primaryClasses =
  "border-primary bg-primary text-primary-foreground hover:border-brand hover:bg-brand hover:text-brand-foreground";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2.5 border font-medium whitespace-nowrap tracking-[-0.005em] transition-[background-color,color,border-color] duration-150 ease-ignition outline-none focus-visible:outline focus-visible:outline-offset-[3px] focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_.ign-arrow]:transition-transform",
  {
    variants: {
      variant: {
        default: primaryClasses,
        primary: primaryClasses,
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:opacity-90",
        outline:
          "border-line-strong bg-transparent text-foreground hover:border-line-bright hover:bg-hover",
        secondary: "border-line bg-secondary text-secondary-foreground hover:bg-surface",
        ghost:
          "border-line-strong bg-transparent text-foreground hover:border-line-bright hover:bg-hover",
        link: "border-transparent bg-transparent text-foreground underline-offset-4 hover:text-brand hover:underline",
      },
      size: {
        sm: "h-[34px] px-3.5 text-[13px] [&_svg]:size-3.5",
        default: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-[52px] px-[26px] text-[15px] [&_svg]:size-4",
        icon: "size-11 p-0 [&_svg]:size-4",
      },
    },
    compoundVariants: [
      {
        size: ["sm", "default", "lg"],
        className:
          "hover:[&_svg]:translate-x-[3px] hover:[&_.ign-arrow]:translate-x-[3px]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, type, ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild) {
    return <Slot ref={ref} data-slot="button" className={classes} {...props} />;
  }
  return (
    <button
      ref={ref}
      data-slot="button"
      type={type ?? "button"}
      className={classes}
      {...props}
    />
  );
});
