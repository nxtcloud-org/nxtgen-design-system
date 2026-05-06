"use client";

import { cn } from "@nxtgen-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOKEN_PAGES } from "./tokenRegistry";

export function TokenSideNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="토큰 목록"
      className="h-full overflow-y-auto scrollbar-none w-56 shrink-0 px-3 py-6 hidden md:block"
    >
      <Link
        href="/tokens"
        className={cn(
          "block px-2 py-1.5 mb-4 text-sm font-semibold rounded-sm transition-colors duration-fast",
          pathname === "/tokens"
            ? "bg-subtle text-text-primary"
            : "text-text-secondary hover:bg-subtle hover:text-text-primary",
        )}
      >
        모든 토큰
      </Link>
      <div className="px-2 mb-1.5 text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
        Foundation
      </div>
      <ul className="space-y-0.5">
        {TOKEN_PAGES.map((item) => {
          const href = `/tokens/${item.slug}`;
          const active = pathname === href;
          return (
            <li key={item.slug}>
              <Link
                href={href}
                className={cn(
                  "block px-2 py-1 text-sm rounded-sm transition-colors duration-fast",
                  active
                    ? "bg-brand-subtle text-text-brand font-medium"
                    : "text-text-secondary hover:bg-subtle hover:text-text-primary",
                )}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
