import type { ReactNode } from "react";

interface TokenPageProps {
  name: string;
  tagline: string;
  description?: ReactNode;
  /** 사용 코드 (예: bg-brand 클래스 / var(--bg-brand) / tokens.bg.brand). */
  usage?: string;
  children: ReactNode;
}

export function TokenPage({ name, tagline, description, usage, children }: TokenPageProps) {
  return (
    <div className="px-8 py-12 max-w-4xl">
      <header className="mb-12">
        <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
          Foundation
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{name}</h1>
        <p className="text-lg text-text-secondary mb-6">{tagline}</p>
        {description && (
          <div className="text-sm text-text-secondary leading-relaxed">{description}</div>
        )}
        {usage && (
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-subtle border border-default font-mono text-xs">
            {usage}
          </div>
        )}
      </header>

      <div className="space-y-12">{children}</div>
    </div>
  );
}

export function TokenSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (
    <section className="space-y-6 scroll-mt-20">
      <div>
        <h2 id={id} className="text-2xl font-semibold tracking-tight mb-2 scroll-mt-20">
          {title}
        </h2>
        {description && <p className="text-text-secondary">{description}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}
