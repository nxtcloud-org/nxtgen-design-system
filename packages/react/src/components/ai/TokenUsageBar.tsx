"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface TokenUsageBarProps extends HTMLAttributes<HTMLDivElement> {
  used: number;
  total: number;
  /** label 우측 표시. 기본: "{used} / {total}" */
  label?: string;
  /** 경고 임계 (0~1, 기본 0.75) */
  warnAt?: number;
  /** 위험 임계 (0~1, 기본 0.9) */
  dangerAt?: number;
  /** 컴팩트 (height 4px) */
  compact?: boolean;
}

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString());

export const TokenUsageBar = forwardRef<HTMLDivElement, TokenUsageBarProps>(
  ({ className, used, total, label, warnAt = 0.75, dangerAt = 0.9, compact, ...props }, ref) => {
    const ratio = total > 0 ? Math.min(used / total, 1) : 0;
    const tone = ratio >= dangerAt ? "danger" : ratio >= warnAt ? "warning" : "brand";

    const fillCls = {
      brand: "bg-brand",
      warning: "bg-[var(--color-warning-500)]",
      danger: "bg-[var(--color-danger-500)]",
    }[tone];

    const textCls = {
      brand: "text-text-tertiary",
      warning: "text-[var(--color-warning-700)]",
      danger: "text-text-danger",
    }[tone];

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary">컨텍스트 사용량</span>
          <span className={cn("font-mono", textCls)}>
            {label ?? `${fmt(used)} / ${fmt(total)}`}
            <span className="ml-1 opacity-60">({Math.round(ratio * 100)}%)</span>
          </span>
        </div>
        <div
          className={cn("w-full bg-muted rounded-full overflow-hidden", compact ? "h-1" : "h-1.5")}
        >
          <div
            className={cn(
              fillCls,
              "h-full rounded-full transition-all duration-base ease-standard",
            )}
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      </div>
    );
  },
);
TokenUsageBar.displayName = "TokenUsageBar";
