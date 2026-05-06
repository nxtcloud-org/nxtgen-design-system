import { type VariantProps, cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

const card = cva("bg-surface text-text-primary transition-shadow duration-base ease-standard", {
  variants: {
    variant: {
      outlined: "border border-default",
      elevated: "border border-default shadow-sm hover:shadow-md",
      ghost: "",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    radius: {
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
  defaultVariants: { variant: "outlined", padding: "md", radius: "lg" },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof card> {}

const Root = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, radius, ...props }, ref) => (
    <div ref={ref} className={cn(card({ variant, padding, radius }), className)} {...props} />
  ),
);
Root.displayName = "Card";

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-3 mb-4", className)}
      {...props}
    />
  ),
);
Header.displayName = "Card.Header";

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // biome-ignore lint/a11y/useHeadingContent: composed by consumer
    <h3
      ref={ref}
      className={cn("text-lg font-semibold tracking-[-0.01em]", className)}
      {...props}
    />
  ),
);
Title.displayName = "Card.Title";

// Description/Body는 명시적 색을 안 갖고 부모 텍스트 색을 상속 + opacity로 secondary 느낌.
// → 일반 카드(text-text-primary)에선 짙은 회색, gradient 카드(text-on-brand)에선 살짝 투명 흰색.
const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm opacity-80 mt-1", className)} {...props} />
  ),
);
Description.displayName = "Card.Description";

const Body = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm opacity-85", className)} {...props} />
  ),
);
Body.displayName = "Card.Body";

const Actions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-2 mt-6", className)}
      {...props}
    />
  ),
);
Actions.displayName = "Card.Actions";

export const Card = Object.assign(Root, {
  Header,
  Title,
  Description,
  Body,
  Actions,
});
