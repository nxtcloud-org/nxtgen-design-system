"use client";

import * as RS from "@radix-ui/react-switch";
import { type ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof RS.Root> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<React.ElementRef<typeof RS.Root>, SwitchProps>(
  ({ className, id, label, description, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    const root = (
      <RS.Root
        ref={ref}
        id={switchId}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
          "border-2 border-transparent transition-colors duration-fast ease-standard",
          "focus-visible:outline-none focus-visible:shadow-focus",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "data-[state=checked]:bg-brand data-[state=unchecked]:bg-muted",
          className,
        )}
        {...props}
      >
        <RS.Thumb
          className={cn(
            "pointer-events-none block size-5 rounded-full bg-white shadow-sm",
            "transition-transform duration-fast ease-standard",
            "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          )}
        />
      </RS.Root>
    );

    if (!label && !description) return root;

    return (
      <div className="flex items-start gap-3">
        {root}
        <div className="flex flex-col">
          {label && (
            <label htmlFor={switchId} className="text-sm font-medium cursor-pointer">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
        </div>
      </div>
    );
  },
);
Switch.displayName = "Switch";
