"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { AgentAvatar } from "./AgentAvatar";

// max-w는 wrapper에서 한 번만 적용 (user/assistant 너비 일치).
const bubble = cva("px-4 py-3 text-sm leading-relaxed break-words", {
  variants: {
    role: {
      user: "bg-brand text-on-brand rounded-2xl rounded-br-sm",
      assistant: "bg-subtle text-text-primary rounded-2xl rounded-bl-sm",
      system: "bg-transparent text-text-tertiary text-xs italic mx-auto px-0",
    },
  },
  defaultVariants: { role: "assistant" },
});

export interface MessageBubbleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof bubble> {
  /** 보낸 시각 표시 (선택) */
  timestamp?: string;
  /** assistant 메시지 좌측 아바타 */
  avatar?: ReactNode;
  /** assistant 메시지 그라디언트 보더 표시 */
  gradientBorder?: boolean;
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    { className, role = "assistant", timestamp, avatar, gradientBorder, children, ...props },
    ref,
  ) => {
    if (role === "system") {
      return (
        <div ref={ref} className={cn("w-full flex", className)} {...props}>
          <div className={bubble({ role })}>{children}</div>
        </div>
      );
    }

    const isUser = role === "user";
    const useGradient = gradientBorder && !isUser;

    return (
      <div
        ref={ref}
        className={cn("w-full flex gap-2", isUser ? "justify-end" : "justify-start", className)}
        {...props}
      >
        {!isUser && (avatar ?? <AgentAvatar size="sm" />)}
        <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser && "items-end")}>
          {useGradient ? (
            // background-clip 트릭: inner surface + outer gradient를 단일 div로.
            // transparent border가 그라디언트 layer를 노출 → 모서리 정렬 자동.
            <div
              className="rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed break-words text-text-primary border-[1.5px] border-transparent [background-origin:border-box] [background-clip:padding-box,border-box]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--bg-surface), var(--bg-surface)), linear-gradient(135deg, #2560FF 0%, #A855F7 55%, #E642CA 100%)",
              }}
            >
              {children}
            </div>
          ) : (
            <div className={bubble({ role })}>{children}</div>
          )}
          {timestamp && <span className="text-xs text-text-tertiary px-1">{timestamp}</span>}
        </div>
      </div>
    );
  },
);
MessageBubble.displayName = "MessageBubble";
