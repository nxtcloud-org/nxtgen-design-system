import { TokenPage, TokenSection } from "../../_components/doc";

const DURATION = [
  ["instant", "0ms"],
  ["fast", "120ms"],
  ["base", "200ms"],
  ["slow", "320ms"],
  ["slower", "480ms"],
] as const;

const EASE = [
  ["standard", "cubic-bezier(0.4, 0.0, 0.2, 1)"],
  ["emphasized", "cubic-bezier(0.2, 0.0, 0, 1)"],
  ["entrance", "cubic-bezier(0.0, 0.0, 0.2, 1)"],
  ["exit", "cubic-bezier(0.4, 0.0, 1, 1)"],
] as const;

export default function MotionTokenPage() {
  return (
    <TokenPage
      name="Motion"
      tagline="Apple-style duration + easing."
      description={
        <>
          <p>
            <strong>100ms 미만</strong>: 즉시 인지 / <strong>200ms</strong>: 자연 /{" "}
            <strong>400ms+</strong>: 답답. 대부분의 UI 트랜지션은 <code>fast</code>/
            <code>base</code>.
          </p>
          <p className="mt-2">
            <code>prefers-reduced-motion</code> 자동 처리 (globals.css).
          </p>
        </>
      }
      usage={"var(--motion-duration-base) · duration-base · ease-standard"}
    >
      <TokenSection title="Duration">
        <div className="space-y-2">
          {DURATION.map(([key, val]) => (
            <div key={key} className="flex items-center gap-4">
              <code className="text-xs text-text-tertiary w-24 font-mono">duration.{key}</code>
              <span className="text-sm text-text-secondary tabular-nums">{val}</span>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Easing">
        <div className="space-y-2">
          {EASE.map(([key, val]) => (
            <div key={key} className="flex items-center gap-4">
              <code className="text-xs text-text-tertiary w-24 font-mono shrink-0">ease.{key}</code>
              <code className="text-xs text-text-tertiary font-mono">{val}</code>
            </div>
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}
