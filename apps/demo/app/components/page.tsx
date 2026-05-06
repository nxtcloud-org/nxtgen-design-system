import Link from "next/link";
import { COMPONENT_GROUPS } from "../_components/doc";

export default function ComponentsCatalog() {
  return (
    <div className="px-8 py-12 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Components</h1>
        <p className="text-lg text-text-secondary">NxtGen 디자인 시스템의 모든 React 컴포넌트.</p>
      </header>

      <div className="space-y-12">
        {COMPONENT_GROUPS.map((group) => (
          <section key={group.category}>
            <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/components/${item.slug}`}
                  className="block p-4 rounded-md border border-default bg-surface hover:border-strong hover:shadow-sm transition-all duration-fast ease-standard"
                >
                  <div className="font-semibold tracking-[-0.01em] mb-1">{item.name}</div>
                  <div className="text-sm text-text-secondary">{item.tagline}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
