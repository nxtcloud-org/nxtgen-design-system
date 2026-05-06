import type { ReactNode } from "react";

/**
 * 모든 demo 페이지의 공통 컨텐츠 래퍼.
 * Server component — cn 같은 client util 사용 금지.
 */
export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-dvh bg-canvas text-text-primary flex flex-col overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

// PageShell 내부의 스크롤 영역. DemoNav 다음에 위치.
export function PageScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      id="doc-scroll"
      className={`flex-1 min-h-0 overflow-y-auto ${className}`}
    >
      {children}
    </main>
  );
}

// 모든 demo 페이지가 동일 max-width로 정렬되도록 단일 값 사용 (DemoNav와도 일치).
// width prop은 호환성 위해 남겨두되 모두 max-w-6xl.
export function PageContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  /** @deprecated 모든 페이지 동일 width로 통일됨 */
  width?: "default" | "wide";
}) {
  return (
    <div className={`flex-1 mx-auto px-6 py-12 w-full max-w-6xl ${className}`}>
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-text-secondary max-w-2xl">{description}</p>
      )}
    </div>
  );
}

export function PageFooter() {
  return (
    <footer className="border-t border-default px-6 py-6 text-center text-text-tertiary text-xs">
      NxtGen Design System · Built with @nxtgen-org/tokens · @nxtgen-org/react
    </footer>
  );
}
