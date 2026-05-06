"use client";

import { Check, ChevronDown, ChevronUp } from "@nxtgen-org/icons";
import * as RS from "@radix-ui/react-select";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

const Root = RS.Root;
const Group = RS.Group;
const Value = RS.Value;

const Trigger = forwardRef<
  React.ElementRef<typeof RS.Trigger>,
  ComponentPropsWithoutRef<typeof RS.Trigger> & { size?: "sm" | "md" | "lg" }
>(({ className, children, size = "md", ...props }, ref) => {
  const sizeCls = {
    sm: "h-8 px-2.5 text-sm rounded-sm",
    md: "h-10 px-3 text-sm rounded-md",
    lg: "h-12 px-4 text-base rounded-md",
  }[size];
  return (
    <RS.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between gap-2",
        "bg-surface text-text-primary border border-default",
        "transition-colors duration-fast ease-standard",
        "focus-visible:outline-none focus-visible:shadow-focus focus-visible:border-focus",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-subtle",
        "data-[placeholder]:text-text-tertiary",
        sizeCls,
        className,
      )}
      {...props}
    >
      {children}
      <RS.Icon asChild>
        <ChevronDown size={16} className="text-text-tertiary" />
      </RS.Icon>
    </RS.Trigger>
  );
});
Trigger.displayName = "Select.Trigger";

const Content = forwardRef<
  React.ElementRef<typeof RS.Content>,
  ComponentPropsWithoutRef<typeof RS.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <RS.Portal>
    <RS.Content
      ref={ref}
      position={position}
      sideOffset={4}
      className={cn(
        "z-popover overflow-hidden min-w-[var(--radix-select-trigger-width)]",
        "bg-surface text-text-primary border border-default rounded-md shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    >
      <RS.ScrollUpButton className="flex items-center justify-center h-6 cursor-default">
        <ChevronUp size={14} />
      </RS.ScrollUpButton>
      <RS.Viewport className="p-1">{children}</RS.Viewport>
      <RS.ScrollDownButton className="flex items-center justify-center h-6 cursor-default">
        <ChevronDown size={14} />
      </RS.ScrollDownButton>
    </RS.Content>
  </RS.Portal>
));
Content.displayName = "Select.Content";

const Item = forwardRef<React.ElementRef<typeof RS.Item>, ComponentPropsWithoutRef<typeof RS.Item>>(
  ({ className, children, ...props }, ref) => (
    <RS.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2",
        "rounded-sm py-1.5 pl-7 pr-2 text-sm outline-none",
        "focus:bg-subtle data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[state=checked]:font-medium",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <RS.ItemIndicator>
          <Check size={14} className="text-text-brand" />
        </RS.ItemIndicator>
      </span>
      <RS.ItemText>{children}</RS.ItemText>
    </RS.Item>
  ),
);
Item.displayName = "Select.Item";

const Label = forwardRef<
  React.ElementRef<typeof RS.Label>,
  ComponentPropsWithoutRef<typeof RS.Label>
>(({ className, ...props }, ref) => (
  <RS.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs text-text-tertiary uppercase tracking-wider", className)}
    {...props}
  />
));
Label.displayName = "Select.Label";

const Separator = forwardRef<
  React.ElementRef<typeof RS.Separator>,
  ComponentPropsWithoutRef<typeof RS.Separator>
>(({ className, ...props }, ref) => (
  <RS.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-default", className)} {...props} />
));
Separator.displayName = "Select.Separator";

export const Select = Object.assign(Root, {
  Group,
  Value,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
});
