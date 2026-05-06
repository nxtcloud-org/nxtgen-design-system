import type { ReactNode } from "react";

interface ComponentPageProps {
  category: string;
  name: string;
  /** 한 줄 정의 */
  tagline: string;
  /** 무엇이고 언제 쓰는가 */
  description: ReactNode;
  /** import 라인 */
  importLine: string;
  children: ReactNode;
}

/**
 * /components/[slug] 페이지의 본문 wrapper.
 * 외곽 chrome (DemoNav, SideNav)는 components/layout.tsx가 제공.
 */
export function ComponentPage({
  category,
  name,
  tagline,
  description,
  importLine,
  children,
}: ComponentPageProps) {
  return (
    <div className="px-8 py-12 max-w-4xl">
      <header className="mb-12">
        <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
          {category}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          {name}
        </h1>
        <p className="text-lg text-text-secondary mb-6">{tagline}</p>
        <div className="text-sm text-text-secondary leading-relaxed">
          {description}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-subtle border border-default font-mono text-xs">
          {importLine}
        </div>
      </header>

      <div className="space-y-12">{children}</div>
    </div>
  );
}

/** title → 영숫자 slug. TableOfContents가 동일 함수로 매칭. */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** 한 섹션 wrapper. h2에 id 자동 부여 (TOC 연결). */
export function ComponentSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const id = slugifyTitle(title);
  return (
    <section className="space-y-6 scroll-mt-20">
      <div>
        <h2
          id={id}
          className="text-2xl font-semibold tracking-tight mb-2 scroll-mt-20"
        >
          {title}
        </h2>
        {description && <p className="text-text-secondary">{description}</p>}
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}
