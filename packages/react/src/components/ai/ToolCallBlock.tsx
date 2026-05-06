"use client";

import { AlertCircle, CheckCircle2, ChevronRight, Loader2, Wrench } from "@nxtgen-org/icons";
import { type HTMLAttributes, type ReactNode, forwardRef, useState } from "react";
import { cn } from "../../utils/cn";

export type ToolCallStatus = "pending" | "running" | "success" | "error";

export interface ToolCallBlockProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  status?: ToolCallStatus;
  /** JSON.stringify된 인자 또는 객체. 객체면 자동 stringify. */
  input?: unknown;
  /** 결과 (선택). 객체면 자동 stringify. */
  output?: unknown;
  /** 실행 시간 ms (선택) */
  durationMs?: number;
  defaultOpen?: boolean;
  children?: ReactNode;
}

const STATUS_META: Record<ToolCallStatus, { icon: ReactNode; color: string; label: string }> = {
  pending: {
    icon: <Loader2 size={14} className="animate-spin" />,
    color: "text-text-tertiary",
    label: "대기",
  },
  running: {
    icon: <Loader2 size={14} className="animate-spin" />,
    color: "text-text-brand",
    label: "실행 중",
  },
  success: {
    icon: <CheckCircle2 size={14} />,
    color: "text-[var(--color-success-600)]",
    label: "완료",
  },
  error: { icon: <AlertCircle size={14} />, color: "text-text-danger", label: "실패" },
};

const stringify = (v: unknown): string =>
  typeof v === "string" ? v : v === undefined ? "" : JSON.stringify(v, null, 2);

export const ToolCallBlock = forwardRef<HTMLDivElement, ToolCallBlockProps>(
  (
    {
      className,
      name,
      status = "success",
      input,
      output,
      durationMs,
      defaultOpen = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const meta = STATUS_META[status];

    return (
      <div
        ref={ref}
        className={cn(
          "border border-default rounded-md bg-surface text-sm overflow-hidden",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 text-left",
            "hover:bg-subtle transition-colors duration-fast ease-standard",
            "focus-visible:outline-none focus-visible:shadow-focus",
          )}
          aria-expanded={open}
        >
          <ChevronRight
            size={14}
            className={cn(
              "text-text-tertiary transition-transform duration-fast",
              open && "rotate-90",
            )}
          />
          <Wrench size={14} className="text-text-tertiary" />
          <code className="font-mono text-text-primary">{name}</code>
          <span className={cn("ml-auto flex items-center gap-1.5 text-xs", meta.color)}>
            {meta.icon}
            <span>{meta.label}</span>
            {typeof durationMs === "number" && (
              <span className="text-text-tertiary tabular-nums">· {durationMs}ms</span>
            )}
          </span>
        </button>
        {open && (
          <div className="border-t border-default p-3 space-y-3 bg-canvas">
            {input !== undefined && (
              <div>
                <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider">
                  Input
                </div>
                <pre className="font-mono text-xs text-text-secondary whitespace-pre-wrap break-all bg-subtle p-2 rounded-sm">
                  {stringify(input)}
                </pre>
              </div>
            )}
            {output !== undefined && (
              <div>
                <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider">
                  Output
                </div>
                <pre className="font-mono text-xs text-text-secondary whitespace-pre-wrap break-all bg-subtle p-2 rounded-sm">
                  {stringify(output)}
                </pre>
              </div>
            )}
            {children}
          </div>
        )}
      </div>
    );
  },
);
ToolCallBlock.displayName = "ToolCallBlock";
