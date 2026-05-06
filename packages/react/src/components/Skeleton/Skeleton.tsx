import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Tailwind class shorthand */
  rounded?: "sm" | "md" | "lg" | "full";
}

const ROUNDED = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, rounded = "md", ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden
      className={cn("bg-muted animate-pulse", ROUNDED[rounded], className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
