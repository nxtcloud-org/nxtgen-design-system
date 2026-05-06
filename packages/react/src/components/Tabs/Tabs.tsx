"use client";

import * as RT from "@radix-ui/react-tabs";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";

const Root = forwardRef<React.ElementRef<typeof RT.Root>, ComponentPropsWithoutRef<typeof RT.Root>>(
  ({ className, ...props }, ref) => (
    <RT.Root ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
  ),
);
Root.displayName = "Tabs";

const List = forwardRef<React.ElementRef<typeof RT.List>, ComponentPropsWithoutRef<typeof RT.List>>(
  ({ className, ...props }, ref) => (
    <RT.List
      ref={ref}
      className={cn("inline-flex items-center gap-1 border-b border-default", className)}
      {...props}
    />
  ),
);
List.displayName = "Tabs.List";

const Trigger = forwardRef<
  React.ElementRef<typeof RT.Trigger>,
  ComponentPropsWithoutRef<typeof RT.Trigger>
>(({ className, ...props }, ref) => (
  <RT.Trigger
    ref={ref}
    className={cn(
      "relative -mb-px inline-flex items-center gap-2 px-3 py-2 text-sm font-medium",
      "text-text-tertiary transition-colors duration-fast ease-standard",
      "hover:text-text-primary focus-visible:outline-none focus-visible:shadow-focus rounded-sm",
      "disabled:opacity-50 disabled:pointer-events-none",
      "data-[state=active]:text-text-primary",
      "data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px",
      "data-[state=active]:after:h-0.5 data-[state=active]:after:bg-brand",
      className,
    )}
    {...props}
  />
));
Trigger.displayName = "Tabs.Trigger";

const Content = forwardRef<
  React.ElementRef<typeof RT.Content>,
  ComponentPropsWithoutRef<typeof RT.Content>
>(({ className, ...props }, ref) => (
  <RT.Content
    ref={ref}
    className={cn("focus-visible:outline-none focus-visible:shadow-focus rounded-md", className)}
    {...props}
  />
));
Content.displayName = "Tabs.Content";

export const Tabs = Object.assign(Root, { List, Trigger, Content });
