"use client";

import { MoreHorizontal, Sparkles, Trash2 } from "@nxtgen-org/icons";
import { Badge, Button, Card, IconButton } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function CardDoc() {
  return (
    <ComponentPage
      category="Contents"
      name="Card"
      tagline="Compound API로 자유롭게 조합하는 카드 컨테이너."
      description={
        <p>
          내부 컴포넌트(<code>Header / Title / Description / Body / Actions</code>)는 모두 옵셔널.
          본문 색은 <code>opacity-80/85</code>로 부모 색을 상속해 일반/그라디언트 카드 어디서나 가독성 자동.
        </p>
      }
      importLine={`import { Card } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Variants">
        <Variant
          title="3 variants"
          preview={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Card>
                <Card.Header>
                  <Card.Title>Outlined</Card.Title>
                </Card.Header>
                <Card.Body>기본. 가장 자주 쓰는 패턴.</Card.Body>
              </Card>
              <Card variant="elevated">
                <Card.Header>
                  <Card.Title>Elevated</Card.Title>
                </Card.Header>
                <Card.Body>그림자. 호버시 강조.</Card.Body>
              </Card>
              <Card variant="ghost" className="bg-gradient-brand text-on-brand">
                <Card.Header>
                  <Card.Title className="text-white">Ghost + Gradient</Card.Title>
                </Card.Header>
                <Card.Body>AI/프리미엄 강조 영역.</Card.Body>
              </Card>
            </div>
          }
          code={`<Card>...</Card>
<Card variant="elevated">...</Card>
<Card variant="ghost" className="bg-gradient-brand text-on-brand">...</Card>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Compound API">
        <Variant
          title="Header / Title / Description / Body / Actions"
          preview={
            <div className="w-full max-w-sm">
              <Card>
                <Card.Header>
                  <div>
                    <Card.Title>새 에이전트</Card.Title>
                    <Card.Description>AI 채팅 에이전트를 생성합니다.</Card.Description>
                  </div>
                  <Badge variant="brand">
                    <Sparkles size={10} /> NEW
                  </Badge>
                </Card.Header>
                <Card.Body>모델, 프롬프트, 도구 정의를 단계별로 설정합니다.</Card.Body>
                <Card.Actions>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Create</Button>
                </Card.Actions>
              </Card>
            </div>
          }
          code={`<Card>
  <Card.Header>
    <div>
      <Card.Title>새 에이전트</Card.Title>
      <Card.Description>AI 채팅 에이전트를 생성합니다.</Card.Description>
    </div>
    <Badge variant="brand">NEW</Badge>
  </Card.Header>
  <Card.Body>모델, 프롬프트, 도구 정의를 단계별로 설정합니다.</Card.Body>
  <Card.Actions>
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button size="sm">Create</Button>
  </Card.Actions>
</Card>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Surface tones">
        <Variant
          title="시맨틱 토큰 활용"
          preview={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Card>
                <Card.Header>
                  <Card.Title>Default</Card.Title>
                </Card.Header>
                <Card.Body>기본 표면.</Card.Body>
              </Card>
              <Card className="bg-brand-subtle border-focus">
                <Card.Header>
                  <Card.Title className="text-text-brand">Brand</Card.Title>
                </Card.Header>
                <Card.Body>CTA 영역.</Card.Body>
              </Card>
              <Card className="border-danger">
                <Card.Header>
                  <Card.Title className="text-text-danger">Danger</Card.Title>
                  <IconButton
                    aria-label="삭제"
                    icon={<Trash2 size={14} />}
                    size="sm"
                    variant="danger"
                  />
                </Card.Header>
                <Card.Body>삭제 액션 영역.</Card.Body>
              </Card>
            </div>
          }
          code={`<Card>...</Card>
<Card className="bg-brand-subtle border-focus">...</Card>
<Card className="border-danger">...</Card>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "variant", type: '"outlined" | "elevated" | "ghost"', defaultValue: '"outlined"' },
            { name: "padding", type: '"none" | "sm" | "md" | "lg"', defaultValue: '"md"' },
            { name: "radius", type: '"md" | "lg" | "xl"', defaultValue: '"lg"' },
            { name: "Card.Header", type: "div", description: "flex justify-between." },
            { name: "Card.Title", type: "h3", description: "font-semibold." },
            { name: "Card.Description", type: "p", description: "opacity-80, 부모 색 상속." },
            { name: "Card.Body", type: "div", description: "opacity-85, 부모 색 상속." },
            { name: "Card.Actions", type: "div", description: "flex justify-end." },
            { name: "...props", type: "HTMLAttributes<HTMLDivElement>" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
