import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

const spinner = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4 border-2",
      md: "size-5 border-2",
      lg: "size-8 border-[3px]",
    },
    tone: {
      brand: "border-[var(--color-blue-200)] border-t-brand",
      neutral: "border-[var(--color-gray-200)] border-t-text-primary",
      onBrand: "border-white/30 border-t-white",
    },
  },
  defaultVariants: { size: "md", tone: "brand" },
});

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinner> {
  /** 스크린리더용 라벨. 시각 라벨이 옆에 있으면 생략 가능. */
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, tone, label = "로딩 중", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinner({ size, tone }), "rounded-full inline-block", className)}
      {...props}
    />
  ),
);
Spinner.displayName = "Spinner";
