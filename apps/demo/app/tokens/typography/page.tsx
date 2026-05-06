import { TokenPage, TokenSection } from "../../_components/doc";

const SCALE = [
  { token: "display.2xl", className: "text-[4.5rem] leading-[1.05] font-bold tracking-tight" },
  { token: "display.xl", className: "text-[3.75rem] leading-[1.05] font-bold tracking-tight" },
  { token: "display.lg", className: "text-5xl leading-[1.1] font-semibold tracking-tight" },
  { token: "heading.xl", className: "text-4xl leading-snug font-semibold tracking-[-0.01em]" },
  { token: "heading.lg", className: "text-3xl leading-snug font-semibold tracking-[-0.01em]" },
  { token: "heading.md", className: "text-2xl leading-snug font-semibold" },
  { token: "heading.sm", className: "text-xl leading-snug font-semibold" },
  { token: "heading.xs", className: "text-lg leading-snug font-semibold" },
  { token: "body.lg", className: "text-lg leading-relaxed" },
  { token: "body.md", className: "text-base leading-relaxed" },
  { token: "body.sm", className: "text-sm" },
  { token: "body.xs", className: "text-xs tracking-wide" },
  { token: "code.md", className: "text-sm font-mono" },
  { token: "code.sm", className: "text-xs font-mono" },
];

export default function TypographyTokenPage() {
  return (
    <TokenPage
      name="Typography"
      tagline="Pretendard Variable + Geist · 14단계 스케일."
      description=<p>
        <strong>Pretendard Variable</strong>: 한국어 본문 + UI / <strong>Geist Sans</strong>: 영문
        헤딩 + 브랜드 표현 / <strong>Geist Mono</strong>: 코드 · 토큰값.
      </p>
      usage={"font-sans · font-mono · font-brand"}
    >
      <TokenSection title="Type Scale">
        <div className="space-y-4">
          {SCALE.map(({ token, className }) => (
            <div key={token} className="flex items-baseline gap-6 border-b border-subtle pb-3">
              <code className="text-xs text-text-tertiary w-24 shrink-0 font-mono">{token}</code>
              <div className={className}>다음 세대의 디자인 시스템</div>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Weights">
        <div className="space-y-2">
          {[
            ["regular", 400],
            ["medium", 500],
            ["semibold", 600],
            ["bold", 700],
          ].map(([name, w]) => (
            <div key={name} className="flex items-baseline gap-6">
              <code className="text-xs text-text-tertiary w-24 shrink-0 font-mono">
                {name} ({w})
              </code>
              <span className="text-xl" style={{ fontWeight: w as number }}>
                NxtGen Design System
              </span>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
