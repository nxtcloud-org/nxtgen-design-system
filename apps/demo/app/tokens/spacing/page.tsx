import { TokenPage, TokenSection } from "../../_components/doc";

const SCALE = [
  ["0",   0],   ["0.5", 2],  ["1",  4],   ["1.5", 6],  ["2",  8],
  ["3",  12],   ["4",  16],  ["5",  20],  ["6",   24], ["8",  32],
  ["10", 40],   ["12", 48],  ["16", 64],  ["20",  80], ["24", 96], ["32", 128],
] as const;

const GAP = [
  ["tight",   4],
  ["snug",    8],
  ["regular", 12],
  ["relaxed", 16],
  ["loose",   24],
] as const;

export default function SpacingTokenPage() {
  return (
    <TokenPage
      name="Spacing"
      tagline="4px base · 16단계."
      description={
        <p>
          모든 spacing은 4의 배수 (단, 0/0.5/1.5는 미세 조정용). 빠른 산수 + 일관된 리듬.
        </p>
      }
      usage={`var(--spacing-4) · gap-4 · p-4 · tokens.spacing["4"]`}
    >
      <TokenSection title="Scale">
        <div className="space-y-2">
          {SCALE.map(([key, px]) => (
            <div key={key} className="flex items-center gap-4">
              <code className="text-xs text-text-tertiary w-20 font-mono">spacing.{key}</code>
              <div className="h-6 bg-brand rounded-sm" style={{ width: `${px}px` }} />
              <span className="text-xs text-text-tertiary tabular-nums">{px}px</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Gap aliases" description="자주 쓰는 패턴의 시맨틱 별칭.">
        <div className="space-y-2">
          {GAP.map(([key, px]) => (
            <div key={key} className="flex items-center gap-4">
              <code className="text-xs text-text-tertiary w-20 font-mono">gap.{key}</code>
              <div className="h-6 bg-accent rounded-sm" style={{ width: `${px}px` }} />
              <span className="text-xs text-text-tertiary tabular-nums">{px}px</span>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
