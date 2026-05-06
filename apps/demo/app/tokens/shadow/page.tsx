import { TokenPage, TokenSection } from "../../_components/doc";

const ELEVATION = ["xs", "sm", "md", "lg", "xl"] as const;
const SPECIAL = ["focus", "glow-brand", "glow-accent"] as const;

export default function ShadowTokenPage() {
  return (
    <TokenPage
      name="Shadow"
      tagline="Elevation + focus + glow."
      description={
        <p>
          깊이를 표현. dark 모드에선 자동으로 강도 조정 + border 보강. focus shadow는 포커스 가시성
          — 키보드 네비 강조.
        </p>
      }
      usage={"var(--shadow-md) · shadow-md"}
    >
      <TokenSection title="Elevation">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {ELEVATION.map((k) => (
            <div key={k} className="flex flex-col items-center gap-3">
              <div
                className="w-24 h-24 rounded-lg bg-surface border border-default"
                style={{ boxShadow: `var(--shadow-${k})` }}
              />
              <code className="text-xs text-text-tertiary font-mono">shadow.{k}</code>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Focus & Glow" description="포커스 링 + 브랜드 강조 글로우.">
        <div className="grid grid-cols-3 gap-6">
          {SPECIAL.map((k) => (
            <div key={k} className="flex flex-col items-center gap-3">
              <div
                className="w-24 h-24 rounded-lg bg-surface border border-default"
                style={{ boxShadow: `var(--shadow-${k})` }}
              />
              <code className="text-xs text-text-tertiary font-mono">shadow.{k}</code>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
