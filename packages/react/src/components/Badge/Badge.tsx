import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

const badge = cva("inline-flex items-center gap-1 font-medium whitespace-nowrap select-none", {
  variants: {
    variant: {
      neutral: "bg-subtle text-text-primary",
      brand: "bg-brand-subtle text-text-brand",
      success: "bg-[var(--color-success-50)] text-[var(--color-success-700)]",
      warning: "bg-[var(--color-warning-50)] text-[var(--color-warning-700)]",
      danger: "bg-[var(--color-danger-50)] text-[var(--color-danger-700)]",
      info: "bg-[var(--color-info-50)] text-[var(--color-info-700)]",
      gradient: "bg-gradient-brand text-on-brand",
    },
    size: {
      sm: "h-5 px-1.5 text-xs rounded-sm",
      md: "h-6 px-2 text-xs rounded-sm",
      lg: "h-7 px-2.5 text-sm rounded-md",
    },
  },
  defaultVariants: { variant: "neutral", size: "md" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span ref={ref} className={cn(badge({ variant, size }), className)} {...props} />
  ),
);
Badge.displayName = "Badge";
