import { Slot, Slottable } from "@nxtgen-org/react-headless";
import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";

const button = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap select-none",
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
        gradient: "bg-gradient-brand text-on-brand hover:opacity-95 shadow-glow-brand",
        link: "bg-transparent text-text-brand underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-sm",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-md",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  /** Radix Slot 패턴. true면 자식 요소에 props 전달 (Link 등 wrapping 용도). */
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      asChild = false,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(button({ variant, size, block }), className)}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...props}
      >
        {leftIcon}
        <Slottable>{children}</Slottable>
        {rightIcon}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { button as buttonVariants };
