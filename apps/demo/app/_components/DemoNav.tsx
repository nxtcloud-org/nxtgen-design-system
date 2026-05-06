"use client";

import { Button, cn } from "@nxtgen-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NxtGenLogo } from "./NxtGenLogo";
import { ThemeToggle } from "../theme-toggle";

const NAV = [
  { href: "/",           label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/chat",       label: "Chat" },
  { href: "/tokens",     label: "Tokens" },
] as const;

export function DemoNav({ subtitle }: { subtitle?: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-sticky border-b border-default bg-canvas/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <NxtGenLogo size={28} title="NxtGen" />
          <span className="font-brand font-semibold tracking-tight">NxtGen</span>
          <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-subtle text-text-tertiary uppercase tracking-wider">
            Design v0
          </span>
          {subtitle && (
            <>
              <span className="text-text-tertiary text-sm mx-1">/</span>
              <span className="text-sm text-text-secondary">{subtitle}</span>
            </>
          )}
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  active &&
                    "bg-subtle text-text-primary font-semibold hover:bg-muted",
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
          <div className="ml-1 pl-2 border-l border-default">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
