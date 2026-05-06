import { Sparkles } from "@nxtgen-org/icons";
import { Badge } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function BadgeDoc() {
  return (
    <ComponentPage
      category="Contents"
      name="Badge"
      tagline="짧은 메타 정보 표시 라벨."
      description={
        <p>
          상태(NEW, Online), 카운트, 분류 등. 인터랙션 없는 정적 라벨. 액션이 있다면{" "}
          <code>Button</code> 또는 <code>Tag</code>(추후) 사용.
        </p>
      }
      importLine={`import { Badge } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Variants">
        <Variant
          title="7 variants"
          preview={(
            ["neutral", "brand", "success", "warning", "danger", "info", "gradient"] as const
          ).map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
          code={`<Badge variant="neutral">neutral</Badge>
<Badge variant="brand">brand</Badge>
<Badge variant="success">success</Badge>
<Badge variant="warning">warning</Badge>
<Badge variant="danger">danger</Badge>
<Badge variant="info">info</Badge>
<Badge variant="gradient">gradient</Badge>`}
        />
      </ComponentSection>

      <ComponentSection title="Sizes">
        <Variant
          title="sm / md / lg"
          preview={
            <>
              <Badge size="sm" variant="brand">
                sm
              </Badge>
              <Badge size="md" variant="brand">
                md
              </Badge>
              <Badge size="lg" variant="brand">
                lg
              </Badge>
            </>
          }
          code={`<Badge size="sm" variant="brand">sm</Badge>
<Badge size="md" variant="brand">md</Badge>
<Badge size="lg" variant="brand">lg</Badge>`}
        />
      </ComponentSection>

      <ComponentSection title="With icon">
        <Variant
          title="아이콘 결합"
          preview={
            <Badge variant="gradient">
              <Sparkles size={12} /> AI Powered
            </Badge>
          }
          code={`<Badge variant="gradient">
  <Sparkles size={12} /> AI Powered
</Badge>`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"neutral" | "brand" | "success" | "warning" | "danger" | "info" | "gradient"',
              defaultValue: '"neutral"',
            },
            { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
            { name: "...props", type: "HTMLAttributes<HTMLSpanElement>" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
