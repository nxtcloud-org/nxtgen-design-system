import { Card, Skeleton } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function SkeletonDoc() {
  return (
    <ComponentPage
      category="Loading"
      name="Skeleton"
      tagline="콘텐츠가 로드되기 전 자리 표시 placeholder."
      description={
        <p>
          페이지 진입 시 layout shift를 줄이고 인지 속도를 빠르게. 로드될 컨텐츠의 모양과
          비슷하게 배치.
        </p>
      }
      importLine={`import { Skeleton } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Card placeholder">
        <Variant
          title="아바타 + 텍스트 라인"
          preview={
            <Card className="w-full max-w-sm">
              <div className="flex gap-3 mb-4">
                <Skeleton rounded="full" className="size-10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </Card>
          }
          code={`<Card>
  <div className="flex gap-3 mb-4">
    <Skeleton rounded="full" className="size-10 shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
  <div className="space-y-2">
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
  </div>
</Card>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "rounded", type: '"sm" | "md" | "lg" | "full"', defaultValue: '"md"' },
            { name: "className", type: "string", description: "h-/w-/size- 등 사이즈 지정." },
            { name: "...props", type: "HTMLAttributes<HTMLDivElement>" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
