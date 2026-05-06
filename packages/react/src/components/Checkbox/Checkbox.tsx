"use client";

import { Check, Minus } from "@nxtgen-org/icons";
import * as RC from "@radix-ui/react-checkbox";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof RC.Root> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<React.ElementRef<typeof RC.Root>, CheckboxProps>(
  ({ className, id, label, description, ...props }, ref) => {
    const generatedId = useId();
    const cbId = id ?? generatedId;

    const root = (
      <RC.Root
        ref={ref}
        id={cbId}
        className={cn(
          "peer size-4 shrink-0 rounded-sm border-[1.5px] border-[var(--color-gray-400)]",
          "bg-surface transition-colors duration-fast ease-standard",
          "hover:border-[var(--color-gray-500)]",
          "focus-visible:outline-none focus-visible:shadow-focus",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "data-[state=checked]:bg-brand data-[state=checked]:border-brand data-[state=checked]:text-on-brand",
          "data-[state=indeterminate]:bg-brand data-[state=indeterminate]:border-brand data-[state=indeterminate]:text-on-brand",
          className,
        )}
        {...props}
      >
        <RC.Indicator className="flex items-center justify-center">
          {props.checked === "indeterminate" ? <Minus size={12} /> : <Check size={12} />}
        </RC.Indicator>
      </RC.Root>
    );

    if (!label && !description) return root;

    return (
      <div className="flex items-start gap-2">
        {root}
        <div className="flex flex-col -mt-0.5">
          {label && (
            <label htmlFor={cbId} className="text-sm cursor-pointer">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
        </div>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
