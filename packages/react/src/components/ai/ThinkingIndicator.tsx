"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ThinkingIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  /** 텍스트 라벨 (기본 "생각 중") */
  label?: string;
}

const SIZE = {
  sm: "size-1.5 gap-1",
  md: "size-2 gap-1.5",
  lg: "size-2.5 gap-2",
} as const;

export const ThinkingIndicator = forwardRef<HTMLSpanElement, ThinkingIndicatorProps>(
  ({ className, size = "md", label = "생각 중", ...props }, ref) => {
    const [dotSize, gapCls] = SIZE[size].split(" ");
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-flex items-center", gapCls, className)}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("rounded-full bg-gradient-brand animate-pulse", dotSize)}
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "1.2s" }}
          />
        ))}
      </span>
    );
  },
);
ThinkingIndicator.displayName = "ThinkingIndicator";
