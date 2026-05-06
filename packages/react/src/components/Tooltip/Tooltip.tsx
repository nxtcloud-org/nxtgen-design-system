"use client";

import * as RT from "@radix-ui/react-tooltip";
import { type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  /** 외부 Provider가 있으면 false. 단독 사용 시 true(기본). */
  withProvider?: boolean;
}

const Content = forwardRef<HTMLDivElement, RT.TooltipContentProps & { className?: string }>(
  ({ className, sideOffset = 6, ...props }, ref) => (
    <RT.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-tooltip px-2.5 py-1.5 rounded-sm",
        "bg-inverse text-text-inverse text-xs font-medium",
        "shadow-md",
        "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
        "data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        className,
      )}
      {...props}
    />
  ),
);
Content.displayName = "Tooltip.Content";

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 300,
  withProvider = true,
}: TooltipProps) {
  const root = (
    <RT.Root delayDuration={delayDuration}>
      <RT.Trigger asChild>{children}</RT.Trigger>
      <RT.Portal>
        <Content side={side} align={align}>
          {content}
        </Content>
      </RT.Portal>
    </RT.Root>
  );
  return withProvider ? <RT.Provider>{root}</RT.Provider> : root;
}

export const TooltipProvider = RT.Provider;
