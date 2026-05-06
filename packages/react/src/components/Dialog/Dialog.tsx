"use client";

import { X } from "@nxtgen-org/icons";
import * as RD from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { IconButton } from "../IconButton/IconButton";

const Root = RD.Root;
const Trigger = RD.Trigger;
const Close = RD.Close;
const Portal = RD.Portal;

const Overlay = forwardRef<
  React.ElementRef<typeof RD.Overlay>,
  ComponentPropsWithoutRef<typeof RD.Overlay>
>(({ className, ...props }, ref) => (
  <RD.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
Overlay.displayName = "Dialog.Overlay";

interface ContentProps extends ComponentPropsWithoutRef<typeof RD.Content> {
  hideCloseButton?: boolean;
}

const Content = forwardRef<React.ElementRef<typeof RD.Content>, ContentProps>(
  ({ className, children, hideCloseButton, ...props }, ref) => (
    <Portal>
      <Overlay />
      <RD.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-modal -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg max-h-[85vh] overflow-auto",
          "bg-surface text-text-primary border border-default rounded-lg shadow-xl",
          "p-6",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <RD.Close asChild>
            <IconButton
              aria-label="닫기"
              icon={<X size={16} />}
              size="sm"
              variant="ghost"
              className="absolute right-3 top-3"
            />
          </RD.Close>
        )}
      </RD.Content>
    </Portal>
  ),
);
Content.displayName = "Dialog.Content";

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />
);
Header.displayName = "Dialog.Header";

const Title = forwardRef<
  React.ElementRef<typeof RD.Title>,
  ComponentPropsWithoutRef<typeof RD.Title>
>(({ className, ...props }, ref) => (
  <RD.Title
    ref={ref}
    className={cn("text-lg font-semibold tracking-[-0.01em]", className)}
    {...props}
  />
));
Title.displayName = "Dialog.Title";

const Description = forwardRef<
  React.ElementRef<typeof RD.Description>,
  ComponentPropsWithoutRef<typeof RD.Description>
>(({ className, ...props }, ref) => (
  <RD.Description ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
));
Description.displayName = "Dialog.Description";

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end gap-2 mt-6", className)} {...props} />
);
Footer.displayName = "Dialog.Footer";

export const Dialog = Object.assign(Root, {
  Trigger,
  Close,
  Content,
  Header,
  Title,
  Description,
  Footer,
});
