"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/utils.js";
import { Kicker } from "./kicker.js";

export function SectionHead({
  index,
  kicker,
  title,
  lede,
  className,
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-x-20",
        className,
      )}
    >
      <div>
        <Kicker index={index}>{kicker}</Kicker>
        <h2 className="mt-[22px] text-[clamp(36px,4.6vw,60px)] leading-[1.02] font-semibold tracking-[-0.045em]">
          {title}
        </h2>
      </div>
      {lede ? (
        <p className="max-w-[520px] text-base leading-[1.75] text-text-2">{lede}</p>
      ) : null}
    </div>
  );
}
