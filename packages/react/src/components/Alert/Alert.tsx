import { AlertCircle, CheckCircle2, Info, type LucideIcon, TriangleAlert, X } from "@nxtgen-org/icons";
import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { IconButton } from "../IconButton/IconButton";

const alert = cva("flex gap-3 rounded-md border p-4", {
  variants: {
    variant: {
      info: "bg-[var(--color-info-50)]    border-[var(--color-info-200)]    text-[var(--color-info-900)]",
      success:
        "bg-[var(--color-success-50)] border-[var(--color-success-200)] text-[var(--color-success-900)]",
      warning:
        "bg-[var(--color-warning-50)] border-[var(--color-warning-200)] text-[var(--color-warning-900)]",
      danger:
        "bg-[var(--color-danger-50)]  border-[var(--color-danger-200)]  text-[var(--color-danger-900)]",
    },
  },
  defaultVariants: { variant: "info" },
});

const ICONS: Record<NonNullable<VariantProps<typeof alert>["variant"]>, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
};

const ICON_COLOR: Record<NonNullable<VariantProps<typeof alert>["variant"]>, string> = {
  info: "text-[var(--color-info-600)]",
  success: "text-[var(--color-success-600)]",
  warning: "text-[var(--color-warning-600)]",
  danger: "text-[var(--color-danger-600)]",
};

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alert> {
  title?: ReactNode;
  onDismiss?: () => void;
  icon?: ReactNode | false;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, children, onDismiss, icon, ...props }, ref) => {
    const Icon = ICONS[variant ?? "info"];
    return (
      <div ref={ref} role="alert" className={cn(alert({ variant }), className)} {...props}>
        {icon !== false && (
          <div className={cn("shrink-0 mt-0.5", ICON_COLOR[variant ?? "info"])}>
            {icon ?? <Icon size={18} />}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold text-sm mb-0.5">{title}</div>}
          {children && <div className="text-sm opacity-90">{children}</div>}
        </div>
        {onDismiss && (
          <IconButton
            aria-label="알림 닫기"
            size="sm"
            variant="ghost"
            icon={<X size={16} />}
            onClick={onDismiss}
            className="-mr-2 -mt-1 shrink-0"
          />
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";
