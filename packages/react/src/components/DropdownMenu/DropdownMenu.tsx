"use client";

import { Check, ChevronRight, Circle } from "@nxtgen-org/icons";
import * as RDM from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

const Root = RDM.Root;
const Trigger = RDM.Trigger;
const Group = RDM.Group;
const Portal = RDM.Portal;
const Sub = RDM.Sub;
const RadioGroup = RDM.RadioGroup;

const contentCls = cn(
  "z-popover min-w-[12rem] overflow-hidden",
  "bg-surface text-text-primary border border-default rounded-md shadow-lg p-1",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
);

const itemCls = cn(
  "relative flex cursor-pointer select-none items-center gap-2",
  "rounded-sm px-2 py-1.5 text-sm outline-none",
  "focus:bg-subtle data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
);

const Content = forwardRef<
  React.ElementRef<typeof RDM.Content>,
  ComponentPropsWithoutRef<typeof RDM.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <RDM.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(contentCls, className)}
      {...props}
    />
  </Portal>
));
Content.displayName = "DropdownMenu.Content";

const Item = forwardRef<
  React.ElementRef<typeof RDM.Item>,
  ComponentPropsWithoutRef<typeof RDM.Item> & { destructive?: boolean }
>(({ className, destructive, ...props }, ref) => (
  <RDM.Item
    ref={ref}
    className={cn(
      itemCls,
      destructive && "text-text-danger focus:bg-[var(--color-danger-50)]",
      className,
    )}
    {...props}
  />
));
Item.displayName = "DropdownMenu.Item";

const CheckboxItem = forwardRef<
  React.ElementRef<typeof RDM.CheckboxItem>,
  ComponentPropsWithoutRef<typeof RDM.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <RDM.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemCls, "pl-7", className)}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <RDM.ItemIndicator>
        <Check size={14} className="text-text-brand" />
      </RDM.ItemIndicator>
    </span>
    {children}
  </RDM.CheckboxItem>
));
CheckboxItem.displayName = "DropdownMenu.CheckboxItem";

const RadioItem = forwardRef<
  React.ElementRef<typeof RDM.RadioItem>,
  ComponentPropsWithoutRef<typeof RDM.RadioItem>
>(({ className, children, ...props }, ref) => (
  <RDM.RadioItem ref={ref} className={cn(itemCls, "pl-7", className)} {...props}>
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <RDM.ItemIndicator>
        <Circle size={8} className="fill-text-brand text-text-brand" />
      </RDM.ItemIndicator>
    </span>
    {children}
  </RDM.RadioItem>
));
RadioItem.displayName = "DropdownMenu.RadioItem";

const Label = forwardRef<
  React.ElementRef<typeof RDM.Label>,
  ComponentPropsWithoutRef<typeof RDM.Label>
>(({ className, ...props }, ref) => (
  <RDM.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs text-text-tertiary uppercase tracking-wider", className)}
    {...props}
  />
));
Label.displayName = "DropdownMenu.Label";

const Separator = forwardRef<
  React.ElementRef<typeof RDM.Separator>,
  ComponentPropsWithoutRef<typeof RDM.Separator>
>(({ className, ...props }, ref) => (
  <RDM.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-default", className)} {...props} />
));
Separator.displayName = "DropdownMenu.Separator";

const Shortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs text-text-tertiary", className)} {...props} />
);
Shortcut.displayName = "DropdownMenu.Shortcut";

const SubTrigger = forwardRef<
  React.ElementRef<typeof RDM.SubTrigger>,
  ComponentPropsWithoutRef<typeof RDM.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <RDM.SubTrigger
    ref={ref}
    className={cn(itemCls, "data-[state=open]:bg-subtle", className)}
    {...props}
  >
    {children}
    <ChevronRight size={14} className="ml-auto" />
  </RDM.SubTrigger>
));
SubTrigger.displayName = "DropdownMenu.SubTrigger";

const SubContent = forwardRef<
  React.ElementRef<typeof RDM.SubContent>,
  ComponentPropsWithoutRef<typeof RDM.SubContent>
>(({ className, ...props }, ref) => (
  <RDM.SubContent ref={ref} className={cn(contentCls, className)} {...props} />
));
SubContent.displayName = "DropdownMenu.SubContent";

export const DropdownMenu = Object.assign(Root, {
  Trigger,
  Content,
  Group,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  Label,
  Separator,
  Shortcut,
  Sub,
  SubTrigger,
  SubContent,
});
