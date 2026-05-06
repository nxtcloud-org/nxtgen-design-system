import { TokenUsageBar } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function TokenUsageBarDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="TokenUsageBar"
      tagline="컨텍스트 사용량 progress bar — 임계점 자동 컬러 전환."
      description={
        <p>
          <code>warnAt</code>(기본 75%), <code>dangerAt</code>(기본 90%)을 넘으면
          색상이 brand → warning → danger로 자동 전환. 숫자 포맷도 K/M 자동.
        </p>
      }
      importLine={`import { TokenUsageBar } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Threshold colors">
        <Variant
          title="정상 / 경고 / 위험"
          preview={
            <div className="w-full max-w-sm space-y-4">
              <TokenUsageBar used={48000} total={200000} />
              <TokenUsageBar used={170000} total={200000} />
              <TokenUsageBar used={195000} total={200000} />
            </div>
          }
          code={`<TokenUsageBar used={48000}  total={200000} />  // 정상 (brand)
<TokenUsageBar used={170000} total={200000} />  // 경고 (warning, 75%~)
<TokenUsageBar used={195000} total={200000} />  // 위험 (danger, 90%~)`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Compact">
        <Variant
          title="얇은 변형"
          preview={
            <div className="w-full max-w-sm">
              <TokenUsageBar used={120000} total={200000} compact />
            </div>
          }
          code={`<TokenUsageBar used={120000} total={200000} compact />`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "used", type: "number", required: true },
            { name: "total", type: "number", required: true },
            { name: "warnAt", type: "number (0~1)", defaultValue: "0.75" },
            { name: "dangerAt", type: "number (0~1)", defaultValue: "0.9" },
            { name: "compact", type: "boolean", description: "얇은 변형 (h-1)." },
            { name: "label", type: "string", description: "기본 '{used} / {total}'." },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
