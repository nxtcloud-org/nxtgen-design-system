import { TokenPage, TokenSection } from "../../_components/doc";

const BG = [
  "canvas",
  "surface",
  "subtle",
  "muted",
  "inverse",
  "brand",
  "brand-hover",
  "brand-subtle",
  "accent",
  "accent-hover",
  "success",
  "warning",
  "danger",
  "info",
];
const TEXT = [
  "primary",
  "secondary",
  "tertiary",
  "disabled",
  "inverse",
  "brand",
  "accent",
  "success",
  "warning",
  "danger",
  "on-brand",
];
const BORDER = ["default", "subtle", "strong", "focus", "danger"];

export default function SemanticTokenPage() {
  return (
    <TokenPage
      name="Semantic"
      tagline="Light/Dark에서 자동 스왑되는 시맨틱 매핑."
      description={
        <p>
          모든 컴포넌트가 사용해야 하는 layer. 우상단 토글로 light/dark 전환 시 모든 카드 색이
          자동으로 바뀌는 것을 확인할 수 있습니다.
        </p>
      }
      usage={"var(--bg-brand) · bg-brand · tokens.bg.brand"}
    >
      <TokenSection title="Background">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {BG.map((t) => (
            <div key={t} className="flex items-center gap-3 p-2 rounded-md border border-default">
              <div
                className="w-12 h-12 rounded-md border border-subtle shrink-0"
                style={{ background: `var(--bg-${t})` }}
              />
              <code className="text-sm text-text-secondary">bg.{t}</code>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Text">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {TEXT.map((t) => (
            <div key={t} className="flex items-center gap-3 p-2 rounded-md border border-default">
              <span
                className="font-semibold text-lg w-12 text-center shrink-0"
                style={{ color: `var(--text-${t})` }}
              >
                Aa
              </span>
              <code className="text-sm text-text-secondary">text.{t}</code>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {BORDER.map((t) => (
            <div key={t} className="flex items-center gap-3 p-2 rounded-md border border-default">
              <div
                className="w-12 h-12 rounded-md bg-canvas shrink-0"
                style={{ border: `1.5px solid var(--border-${t})` }}
              />
              <code className="text-sm text-text-secondary">border.{t}</code>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
