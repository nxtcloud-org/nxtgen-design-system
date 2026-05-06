"use client";

import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "@nxtgen-org/icons";
import * as RT from "@radix-ui/react-toast";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";
import { cn } from "../../utils/cn";

type Variant = "info" | "success" | "warning" | "danger";

interface ToastItem {
  id: number;
  variant: Variant;
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
};

const ICON_TONE = {
  info: "text-[var(--color-info-500)]",
  success: "text-[var(--color-success-500)]",
  warning: "text-[var(--color-warning-500)]",
  danger: "text-[var(--color-danger-500)]",
};

export function ToastProvider({
  children,
  duration = 5000,
}: {
  children: ReactNode;
  duration?: number;
}) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback<ToastContextValue["toast"]>((t) => {
    setItems((prev) => [...prev, { id: Date.now() + Math.random(), ...t }]);
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <RT.Provider duration={duration}>
        {children}
        {items.map((item) => {
          const Icon = ICONS[item.variant];
          return (
            <RT.Root
              key={item.id}
              duration={item.duration ?? duration}
              onOpenChange={(open) => !open && remove(item.id)}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-start gap-3 p-4",
                "bg-surface text-text-primary border border-default rounded-md shadow-lg",
                "data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-80",
                "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
                "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
                "data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full",
              )}
            >
              <Icon size={18} className={cn("mt-0.5", ICON_TONE[item.variant])} />
              <div className="min-w-0">
                <RT.Title className="text-sm font-semibold">{item.title}</RT.Title>
                {item.description && (
                  <RT.Description className="text-xs text-text-secondary mt-0.5">
                    {item.description}
                  </RT.Description>
                )}
              </div>
              <RT.Close aria-label="닫기" className="text-text-tertiary hover:text-text-primary">
                <X size={14} />
              </RT.Close>
            </RT.Root>
          );
        })}
        <RT.Viewport
          className={cn(
            "fixed bottom-4 right-4 z-toast flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]",
            "outline-none",
          )}
        />
      </RT.Provider>
    </ToastContext.Provider>
  );
}

export const Toast = forwardRef<
  React.ElementRef<typeof RT.Root>,
  ComponentPropsWithoutRef<typeof RT.Root>
>((props, ref) => <RT.Root ref={ref} {...props} />);
Toast.displayName = "Toast";
