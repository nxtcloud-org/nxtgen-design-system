"use client";

import { Bot } from "@nxtgen-org/icons";
import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";

const wrapper = cva("relative inline-flex items-center justify-center shrink-0 rounded-full", {
  variants: {
    size: { sm: "size-7", md: "size-10", lg: "size-14", xl: "size-20" },
  },
  defaultVariants: { size: "md" },
});

const inner = cva(
  "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-surface text-text-primary",
  {
    variants: {
      size: { sm: "size-6", md: "size-9", lg: "size-[52px]", xl: "size-[76px]" },
    },
    defaultVariants: { size: "md" },
  },
);

const ICON_SIZE = { sm: 12, md: 18, lg: 24, xl: 36 } as const;

export interface AgentAvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof wrapper> {
  /** idle: 정적 보더 / thinking: 회전 / speaking: 펄스 */
  status?: "idle" | "thinking" | "speaking";
  src?: string;
  alt?: string;
  fallback?: ReactNode;
}

export const AgentAvatar = forwardRef<HTMLSpanElement, AgentAvatarProps>(
  ({ className, size = "md", status = "idle", src, alt, fallback, ...props }, ref) => {
    const ringStyle: React.CSSProperties = {
      background: "conic-gradient(from 0deg, #2560FF, #A855F7, #E642CA, #2560FF)",
    };

    return (
      <span ref={ref} className={cn(wrapper({ size }), className)} {...props}>
        {/* 그라디언트 링 */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full",
            status === "thinking" && "animate-spin [animation-duration:3s]",
            status === "speaking" && "animate-pulse",
          )}
          style={ringStyle}
        />
        {/* inner 표면 */}
        <span className={inner({ size })}>
          {src ? (
            // biome-ignore lint/a11y/useAltText: alt prop forwarded
            <img src={src} alt={alt ?? ""} className="size-full object-cover" />
          ) : (
            (fallback ?? <Bot size={ICON_SIZE[size ?? "md"]} className="text-text-secondary" />)
          )}
        </span>
      </span>
    );
  },
);
AgentAvatar.displayName = "AgentAvatar";
