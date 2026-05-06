import Link from "next/link";
import { TOKEN_PAGES } from "../_components/doc";

export default function TokensCatalog() {
  return (
    <div className="px-8 py-12 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Design Tokens</h1>
        <p className="text-lg text-text-secondary">
          DTCG JSON → CSS Variables · TypeScript const · Tailwind preset. Light/Dark 자동 적응.
        </p>
      </header>

      <h2 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
        Foundation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOKEN_PAGES.map((item) => (
          <Link
            key={item.slug}
            href={`/tokens/${item.slug}`}
            className="block p-4 rounded-md border border-default bg-surface hover:border-strong hover:shadow-sm transition-all duration-fast ease-standard"
          >
            <div className="font-semibold tracking-[-0.01em] mb-1">{item.name}</div>
            <div className="text-sm text-text-secondary">{item.tagline}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
