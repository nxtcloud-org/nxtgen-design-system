"use client";

import * as RG from "@radix-ui/react-radio-group";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

const Root = forwardRef<React.ElementRef<typeof RG.Root>, ComponentPropsWithoutRef<typeof RG.Root>>(
  ({ className, ...props }, ref) => (
    <RG.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
  ),
);
Root.displayName = "RadioGroup";

interface ItemProps extends ComponentPropsWithoutRef<typeof RG.Item> {
  label?: string;
  description?: string;
}

const Item = forwardRef<React.ElementRef<typeof RG.Item>, ItemProps>(
  ({ className, id, label, description, ...props }, ref) => {
    const generatedId = useId();
    const itemId = id ?? generatedId;

    const radio = (
      <RG.Item
        ref={ref}
        id={itemId}
        className={cn(
          "size-4 shrink-0 rounded-full border-[1.5px] border-[var(--color-gray-400)]",
          "bg-surface transition-colors duration-fast ease-standard",
          "hover:border-[var(--color-gray-500)]",
          "focus-visible:outline-none focus-visible:shadow-focus",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "data-[state=checked]:border-brand",
          className,
        )}
        {...props}
      >
        <RG.Indicator className="flex h-full w-full items-center justify-center after:block after:size-2 after:rounded-full after:bg-brand" />
      </RG.Item>
    );

    if (!label && !description) return radio;

    return (
      <div className="flex items-start gap-2">
        {radio}
        <div className="flex flex-col -mt-0.5">
          {label && (
            <label htmlFor={itemId} className="text-sm cursor-pointer">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
        </div>
      </div>
    );
  },
);
Item.displayName = "RadioGroup.Item";

export const RadioGroup = Object.assign(Root, { Item });
