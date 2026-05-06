"use client";

import { cn } from "@nxtgen-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
}

/**
 * 우측 "On this page" 네비.
 * 페이지 안 모든 h2[id]를 자동 추출 + IntersectionObserver로 active 추적.
 * pathname이 바뀌면 자동 재스캔.
 */
export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 한 frame 기다림 — page render 완료 후 DOM scan
    const timer = requestAnimationFrame(() => {
      const els = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("main h2[id]"),
      );
      setHeadings(
        els.map((el) => ({ id: el.id, text: el.textContent ?? "" })),
      );
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;
    const root = document.getElementById("doc-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topMost.target.id);
        }
      },
      { root, rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return <div className="w-44 shrink-0 hidden xl:block" />;

  return (
    <aside
      aria-label="페이지 목차"
      className="h-full overflow-y-auto scrollbar-none w-44 shrink-0 px-3 py-12 hidden xl:block"
    >
      <div className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-3">
        On this page
      </div>
      <ul className="space-y-1.5 border-l border-default">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const root = document.getElementById("doc-scroll");
                  const target = document.getElementById(h.id);
                  if (root && target) {
                    const top = target.offsetTop - 24;
                    root.scrollTo({ top, behavior: "smooth" });
                    history.replaceState(null, "", `#${h.id}`);
                  }
                }}
                className={cn(
                  "block -ml-px pl-3 py-0.5 text-sm border-l-2 border-transparent transition-colors duration-fast",
                  active
                    ? "text-text-brand border-l-[var(--border-focus)] font-medium"
                    : "text-text-tertiary hover:text-text-primary",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
