import { Spinner } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function SpinnerDoc() {
  return (
    <ComponentPage
      category="Loading"
      name="Spinner"
      tagline="회전 로딩 인디케이터."
      description={
        <p>
          짧은 비동기 작업 (네트워크 요청 등). 콘텐츠 placeholder가 필요하면
          <code> Skeleton</code>을 대신 사용.
        </p>
      }
      importLine={`import { Spinner } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Sizes">
        <Variant
          title="sm / md / lg"
          preview={
            <>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </>
          }
          code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
        />
      </ComponentSection>

      <ComponentSection title="Tones">
        <Variant
          title="brand / neutral / onBrand"
          preview={
            <>
              <Spinner tone="brand" />
              <Spinner tone="neutral" />
              <div className="bg-brand p-2 rounded-md">
                <Spinner tone="onBrand" />
              </div>
            </>
          }
          code={`<Spinner tone="brand" />
<Spinner tone="neutral" />
<Spinner tone="onBrand" />  // bg-brand 위에서 사용`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
            { name: "tone", type: '"brand" | "neutral" | "onBrand"', defaultValue: '"brand"' },
            {
              name: "label",
              type: "string",
              defaultValue: '"로딩 중"',
              description: "스크린리더 라벨.",
            },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
