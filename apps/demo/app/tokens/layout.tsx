import type { ReactNode } from "react";
import { DemoNav } from "../_components/DemoNav";
import { TableOfContents } from "../_components/doc/TableOfContents";
import { TokenSideNav } from "../_components/doc/TokenSideNav";

/**
 * /tokens/* nested layout.
 * 상단 DemoNav + 좌측 TokenSideNav + 본문 + 우측 TableOfContents.
 */
export default function TokensLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-canvas text-text-primary flex flex-col overflow-hidden">
      <DemoNav subtitle="Tokens" />
      <div className="flex flex-1 min-h-0 max-w-7xl w-full mx-auto">
        <TokenSideNav />
        <main id="doc-scroll" className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
        <TableOfContents />
      </div>
    </div>
  );
}
