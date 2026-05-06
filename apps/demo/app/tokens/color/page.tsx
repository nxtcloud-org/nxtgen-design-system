import { TokenPage, TokenSection } from "../../_components/doc";

const SCALES = [
  { name: "blue", label: "Blue (Primary)" },
  { name: "magenta", label: "Magenta (Accent)" },
  { name: "gray", label: "Gray" },
  { name: "success", label: "Success" },
  { name: "warning", label: "Warning" },
  { name: "danger", label: "Danger" },
  { name: "info", label: "Info" },
] as const;

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;
const GRAY_STEPS = ["0", ...STEPS, "950", "1000"] as const;

export default function ColorTokenPage() {
  return (
    <TokenPage
      name="Color"
      tagline="Primitive 색상 스케일 + 시그니처 그라디언트."
      description=<p>
        <strong>Primitive 색은 컴포넌트에서 직접 참조 금지</strong> — 반드시
        <code> Semantic</code> 토큰을 통해 사용합니다. light/dark 자동 적응을 보장.
      </p>
      usage={`var(--color-blue-500) · bg-brand · tokens.color.blue["500"]`}
    >
      {SCALES.map(({ name, label }) => (
        <TokenSection key={name} title={label}>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-1">
            {(name === "gray" ? GRAY_STEPS : STEPS).map((step) => (
              <div key={step} className="space-y-1">
                <div
                  className="aspect-square rounded-md border border-subtle"
                  style={{ background: `var(--color-${name}-${step})` }}
                />
                <div className="text-xs text-text-tertiary text-center">{step}</div>
              </div>
            ))}
          </div>
        </TokenSection>
      ))}

      <TokenSection
        title="Signature Gradient"
        description="AI 시그니처. CTA · 헤드라인 · 아바타 링."
      >
        <div className="space-y-3">
          <div className="h-32 rounded-xl bg-gradient-brand shadow-glow-brand" />
          <code className="block text-xs font-mono text-text-tertiary">
            linear-gradient(135deg, #2560FF 0%, #A855F7 55%, #E642CA 100%)
          </code>
        </div>
      </TokenSection>
    </TokenPage>
  );
}
