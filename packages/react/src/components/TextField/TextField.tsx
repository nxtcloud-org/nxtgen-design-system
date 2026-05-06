import { type VariantProps, cva } from "class-variance-authority";
import { type InputHTMLAttributes, type ReactNode, forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

const input = cva(
  [
    "w-full bg-surface text-text-primary placeholder:text-text-tertiary",
    "border outline-none transition-colors duration-fast ease-standard",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-subtle",
    "focus-visible:shadow-focus",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm rounded-sm",
        md: "h-10 px-3 text-sm rounded-md",
        lg: "h-12 px-4 text-base rounded-md",
      },
      invalid: {
        true: "border-danger focus-visible:border-danger",
        false: "border-default focus-visible:border-focus",
      },
      hasLeftSlot: { true: "pl-9" },
      hasRightSlot: { true: "pr-9" },
    },
    defaultVariants: { size: "md", invalid: false },
  },
);

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof input> {
  label?: string;
  helper?: string;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, className, size, label, helper, error, leftSlot, rightSlot, required, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const invalid = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
            {required && <span className="text-text-danger ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {leftSlot && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {leftSlot}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={invalid || undefined}
            aria-describedby={helper || error ? helperId : undefined}
            required={required}
            className={cn(
              input({
                size,
                invalid,
                hasLeftSlot: Boolean(leftSlot),
                hasRightSlot: Boolean(rightSlot),
              }),
              className,
            )}
            {...props}
          />
          {rightSlot && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {rightSlot}
            </div>
          )}
        </div>
        {(helper || error) && (
          <p
            id={helperId}
            className={cn("text-xs", error ? "text-text-danger" : "text-text-tertiary")}
          >
            {error ?? helper}
          </p>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";
