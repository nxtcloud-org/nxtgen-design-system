import { Slot } from "@nxtgen-org/react-headless";
import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";

const iconButton = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "transition-colors duration-fast ease-standard",
    "focus-visible:outline-none focus-visible:shadow-focus",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-brand text-on-brand hover:bg-brand-hover",
        secondary: "bg-subtle text-text-primary border border-default hover:bg-muted",
        ghost: "bg-transparent text-text-primary hover:bg-subtle",
        danger: "bg-danger text-on-brand hover:opacity-90",
      },
      size: {
        sm: "size-8 rounded-sm",
        md: "size-10 rounded-md",
        lg: "size-12 rounded-md",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {
  asChild?: boolean;
  icon: ReactNode;
  /** 시각적 라벨 없으므로 필수. 스크린리더용. */
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(iconButton({ variant, size }), className)} {...props}>
        {icon}
      </Comp>
    );
  },
);
IconButton.displayName = "IconButton";
