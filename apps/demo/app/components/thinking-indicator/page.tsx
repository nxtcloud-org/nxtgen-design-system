import { ThinkingIndicator } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function ThinkingIndicatorDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="ThinkingIndicator"
      tagline="그라디언트 점 3개가 stagger 펄스하는 thinking 인디케이터."
      description={
        <p>
          AI 응답 생성 중 사용. 일반 로딩은 <code>Spinner</code>, AI thinking은 본 컴포넌트로 시각
          구분.
        </p>
      }
      importLine={`import { ThinkingIndicator } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Sizes">
        <Variant
          title="sm / md / lg"
          preview={
            <>
              <ThinkingIndicator size="sm" />
              <ThinkingIndicator size="md" />
              <ThinkingIndicator size="lg" />
            </>
          }
          code={`<ThinkingIndicator size="sm" />
<ThinkingIndicator size="md" />
<ThinkingIndicator size="lg" />`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
            {
              name: "label",
              type: "string",
              defaultValue: '"생각 중"',
              description: "스크린리더 라벨.",
            },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
