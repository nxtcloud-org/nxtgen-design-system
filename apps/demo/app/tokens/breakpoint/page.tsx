import { TokenPage, TokenSection } from "../../_components/doc";

const BP = [
  ["sm", "640px", "큰 모바일·세로 태블릿"],
  ["md", "768px", "태블릿"],
  ["lg", "1024px", "작은 데스크톱"],
  ["xl", "1280px", "데스크톱 기본"],
  ["2xl", "1536px", "와이드 모니터"],
] as const;

export default function BreakpointTokenPage() {
  return (
    <TokenPage
      name="Breakpoint"
      tagline="Mobile-first 5단계."
      description={
        <p>
          컴포넌트는 모바일 디폴트로 작성, <code>md:</code> 이상에서 데스크톱 변형. 그 이하 화면은
          자동으로 모바일 layout.
        </p>
      }
      usage={"var(--breakpoint-md) · md:flex · @media (min-width: 768px)"}
    >
      <TokenSection title="Sizes">
        <div className="space-y-2">
          {BP.map(([name, px, desc]) => (
            <div
              key={name}
              className="flex items-center gap-4 px-3 py-2 rounded-md border border-default bg-surface"
            >
              <code className="text-sm font-mono w-12 shrink-0">{name}</code>
              <code className="text-sm font-mono text-text-tertiary tabular-nums w-20 shrink-0">
                {px}
              </code>
              <span className="text-sm text-text-secondary">{desc}</span>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
