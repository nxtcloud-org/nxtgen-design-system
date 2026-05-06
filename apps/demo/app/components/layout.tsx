import type { ReactNode } from "react";
import { DemoNav } from "../_components/DemoNav";
import { SideNav } from "../_components/doc/SideNav";
import { TableOfContents } from "../_components/doc/TableOfContents";

/**
 * /components/* nested layout.
 * 상단 DemoNav + 좌측 SideNav + 본문 + 우측 TableOfContents.
 */
export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-canvas text-text-primary flex flex-col overflow-hidden">
      <DemoNav subtitle="Components" />
      <div className="flex flex-1 min-h-0 max-w-7xl w-full mx-auto">
        <SideNav />
        <main id="doc-scroll" className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
        <TableOfContents />
      </div>
    </div>
  );
}
