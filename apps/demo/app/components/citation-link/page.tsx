import { CitationLink, TooltipProvider } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function CitationLinkDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="CitationLink"
      tagline="RAG 출처 표시 위첨자 링크 — 호버 시 미리보기."
      description={
        <p>
          assistant 응답 안에 인라인으로 삽입. 호버하면 Tooltip으로 출처 제목·발췌·링크가
          미리보기됩니다. <code>TooltipProvider</code>로 감싸야 합니다.
        </p>
      }
      importLine={`import { CitationLink, TooltipProvider } from "@nxtgen-org/react";`}
    >
      <TooltipProvider>
        <ComponentSection title="Inline citation">
          <Variant
            title="본문 안 위첨자 링크"
            preview={
              <p className="text-sm text-text-primary leading-relaxed">
                NxtGen은 Pretendard·Geist 폰트를 사용합니다.
                <CitationLink
                  index={1}
                  title="DESIGN.md §0 — Brand"
                  source="nxtgen-design-system/DESIGN.md"
                  excerpt="Minimal, calm, technical, intelligent. Apple-grade restraint."
                  href="#"
                />
                Tailwind v3 + Radix + CVA 조합입니다.
                <CitationLink
                  index={2}
                  title="PLAN.md §5"
                  source="nxtgen-design-system/PLAN.md"
                  excerpt="Tailwind v4 + Radix + CVA (shadcn/ui 스타일)"
                  href="#"
                />
              </p>
            }
            code={`<p>
  NxtGen은 Pretendard·Geist 폰트를 사용합니다.
  <CitationLink
    index={1}
    title="DESIGN.md §0 — Brand"
    source="nxtgen-design-system/DESIGN.md"
    excerpt="Minimal, calm, technical, intelligent."
    href="#"
  />
</p>`}
            align="start"
          />
        </ComponentSection>

        <ComponentSection title="API">
          <PropsTable
            rows={[
              { name: "index", type: "number", required: true, description: "출처 번호." },
              { name: "title", type: "string", required: true },
              { name: "excerpt", type: "ReactNode", description: "Tooltip 본문 발췌." },
              { name: "source", type: "string", description: "도메인/sub-label." },
              { name: "href", type: "string", description: "출처 URL." },
            ]}
          />
        </ComponentSection>
      </TooltipProvider>
    </ComponentPage>
  );
}
