import { ArrowRight, Plus, Sparkles } from "@nxtgen-org/icons";
import { Button } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function ButtonDoc() {
  return (
    <ComponentPage
      category="Actions"
      name="Button"
      tagline="사용자의 액션을 트리거하는 가장 기본 요소."
      description={
        <>
          <p>
            텍스트와 (선택적으로) 아이콘으로 구성되며, 시각적 강도에 따라 6가지 variant를
            제공합니다. <code>asChild</code>로 Radix Slot 패턴을 지원해
            <code> {"<Link>"}</code> 등 다른 컴포넌트로 자연스럽게 변환할 수 있습니다.
          </p>
          <p className="mt-3">
            <strong>언제 쓰는가</strong> — 폼 제출, 확인/취소, 페이지 이동, 다이얼로그 트리거 등.
            동일 영역에 여러 버튼이 있다면 가장 중요한 액션 1개만
            <code> primary</code>로, 나머지는 <code>secondary</code> 또는
            <code> ghost</code>로 위계를 잡습니다.
          </p>
        </>
      }
      importLine={`import { Button } from "@nxtgen-org/react";`}
    >
      <ComponentSection
        title="Variants"
        description="시각적 강도에 따라 6가지. primary는 페이지당 1개를 권장."
      >
        <Variant
          title="Primary"
          description="가장 중요한 액션. 페이지당 1개."
          preview={<Button>저장</Button>}
          code={"<Button>저장</Button>"}
        />
        <Variant
          title="Secondary"
          description="primary 옆 보조 액션."
          preview={<Button variant="secondary">취소</Button>}
          code={`<Button variant="secondary">취소</Button>`}
        />
        <Variant
          title="Ghost"
          description="배경 없음. 도구 모음·메뉴 항목 등 시각 소음을 줄여야 할 때."
          preview={<Button variant="ghost">더보기</Button>}
          code={`<Button variant="ghost">더보기</Button>`}
        />
        <Variant
          title="Danger"
          description="파괴적 액션 (삭제·계정 해지 등). Dialog와 함께 확인 단계 권장."
          preview={<Button variant="danger">삭제</Button>}
          code={`<Button variant="danger">삭제</Button>`}
        />
        <Variant
          title="Gradient"
          description="브랜드 시그니처 그라디언트 + glow. AI/프리미엄 강조 CTA."
          preview={
            <Button variant="gradient" leftIcon={<Sparkles size={16} />}>
              AI에게 묻기
            </Button>
          }
          code={`<Button variant="gradient" leftIcon={<Sparkles size={16} />}>
  AI에게 묻기
</Button>`}
        />
        <Variant
          title="Link"
          description="텍스트 링크처럼 보이지만 접근성 측면에서 액션이 명확."
          preview={<Button variant="link">자세히 보기</Button>}
          code={`<Button variant="link">자세히 보기</Button>`}
        />
      </ComponentSection>

      <ComponentSection title="Sizes" description="3가지. 같은 영역에서 여러 사이즈 혼용은 지양.">
        <Variant
          title="Three sizes"
          preview={
            <>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </>
          }
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        />
      </ComponentSection>

      <ComponentSection
        title="With icon"
        description="leftIcon, rightIcon으로 자연스럽게 결합. 아이콘 사이즈는 버튼 사이즈에 맞춰 14~18px."
      >
        <Variant
          title="Leading / Trailing icon"
          preview={
            <>
              <Button leftIcon={<Plus size={16} />}>새 만들기</Button>
              <Button rightIcon={<ArrowRight size={16} />} variant="secondary">
                다음 단계
              </Button>
            </>
          }
          code={`<Button leftIcon={<Plus size={16} />}>새 만들기</Button>
<Button rightIcon={<ArrowRight size={16} />} variant="secondary">
  다음 단계
</Button>`}
        />
      </ComponentSection>

      <ComponentSection
        title="States"
        description="loading은 disabled를 자동 적용하고 클릭을 막습니다."
      >
        <Variant
          title="Loading / Disabled"
          preview={
            <>
              <Button loading>처리 중</Button>
              <Button disabled>비활성</Button>
            </>
          }
          code={`<Button loading>처리 중</Button>
<Button disabled>비활성</Button>`}
        />
      </ComponentSection>

      <ComponentSection
        title="Full width"
        description="block prop으로 컨테이너 가득 채움. 모바일 폼 하단 CTA에 적합."
      >
        <Variant
          title="Block"
          preview={
            <div className="w-full max-w-sm">
              <Button block>가입하기</Button>
            </div>
          }
          code={"<Button block>가입하기</Button>"}
          align="start"
        />
      </ComponentSection>

      <ComponentSection
        title="As another element"
        description="asChild로 <a>, Next.js <Link> 등 다른 element로 동작. Radix Slot 패턴."
      >
        <Variant
          title="With Next.js Link"
          preview={
            <Button asChild>
              <a href="https://nxtgen.app" target="_blank" rel="noreferrer">
                외부 링크 열기
              </a>
            </Button>
          }
          code={`import Link from "next/link";

<Button asChild>
  <Link href="/dashboard">대시보드로</Link>
</Button>`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "ghost" | "danger" | "gradient" | "link"',
              defaultValue: '"primary"',
              description: "시각적 강도.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "버튼 높이/패딩.",
            },
            {
              name: "leftIcon",
              type: "ReactNode",
              description: "텍스트 좌측 아이콘.",
            },
            {
              name: "rightIcon",
              type: "ReactNode",
              description: "텍스트 우측 아이콘.",
            },
            {
              name: "loading",
              type: "boolean",
              defaultValue: "false",
              description: "로딩 상태. disabled 자동 적용.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "비활성. 클릭 불가 + opacity 60%.",
            },
            {
              name: "block",
              type: "boolean",
              defaultValue: "false",
              description: "true면 width 100%.",
            },
            {
              name: "asChild",
              type: "boolean",
              defaultValue: "false",
              description: "Radix Slot 패턴. 자식 요소에 props 전달.",
            },
            {
              name: "...props",
              type: "ButtonHTMLAttributes<HTMLButtonElement>",
              description: "표준 button 속성 (onClick, type, form 등) 전달.",
            },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
