import { TokenPage, TokenSection } from "../../_components/doc";

const Z = [
  ["base",     0,    "기본 stacking context."],
  ["dropdown", 1000, "Select·DropdownMenu Content."],
  ["sticky",   1100, "DemoNav·sticky 헤더."],
  ["overlay",  1200, "Dialog overlay (dim 배경)."],
  ["modal",    1300, "Dialog content."],
  ["popover",  1400, "Popover·Hover card."],
  ["toast",    1500, "Toast viewport."],
  ["tooltip",  1600, "Tooltip — 가장 위."],
] as const;

export default function ZIndexTokenPage() {
  return (
    <TokenPage
      name="Z-Index"
      tagline="레이어 우선순위 — 100 단위로 분리."
      description={
        <p>
          매직 넘버 금지. 모든 floating UI는 정해진 토큰만 사용. tooltip이 가장 위에
          뜨도록 가장 큰 값 부여.
        </p>
      }
      usage={`var(--z-index-modal) · z-modal · tokens.zIndex.modal`}
    >
      <TokenSection title="Layers">
        <div className="space-y-1">
          {Z.map(([name, value, desc]) => (
            <div
              key={name}
              className="flex items-center gap-4 px-3 py-2 rounded-md border border-default bg-surface"
            >
              <code className="text-sm font-mono w-24 shrink-0">{name}</code>
              <code className="text-sm font-mono text-text-tertiary tabular-nums w-16 shrink-0">
                {value}
              </code>
              <span className="text-sm text-text-secondary">{desc}</span>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
