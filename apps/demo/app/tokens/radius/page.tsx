import { TokenPage, TokenSection } from "../../_components/doc";

const SCALE = [
  ["none", 0],
  ["xs", 2],
  ["sm", 4],
  ["md", 8],
  ["lg", 12],
  ["xl", 16],
  ["2xl", 24],
  ["full", 9999],
] as const;

export default function RadiusTokenPage() {
  return (
    <TokenPage
      name="Radius"
      tagline="8단계 borderRadius."
      description={
        <p>
          Apple-grade restraint — 일반 컴포넌트는 <code>md (8px)</code> 또는 <code>lg (12px)</code>{" "}
          위주. <code>full</code>은 pill·아바타 전용.
        </p>
      }
      usage={`var(--radius-md) · rounded-md · tokens.radius.md`}
    >
      <TokenSection title="Scale">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {SCALE.map(([key, px]) => (
            <div key={key} className="space-y-2">
              <div
                className="aspect-square bg-subtle border border-default"
                style={{ borderRadius: typeof px === "number" ? `${Math.min(px, 60)}px` : px }}
              />
              <div className="text-xs text-text-tertiary text-center">
                <div className="font-mono">{key}</div>
                <div>{px === 9999 ? "full" : `${px}px`}</div>
              </div>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
