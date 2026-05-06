"use client";

import { Search } from "@nxtgen-org/icons";
import { TextField } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function TextFieldDoc() {
  return (
    <ComponentPage
      category="Inputs"
      name="TextField"
      tagline="label · helper · error · slot을 포함한 텍스트 입력."
      description={
        <p>
          단일 줄 텍스트 입력. 라벨은 <code>useId</code>로 자동 연결되어 접근성 보장, 좌우 슬롯으로
          아이콘·키바인딩 힌트 추가 가능.
        </p>
      }
      importLine={`import { TextField } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Variant
          title="With label & helper"
          preview={
            <div className="w-full max-w-sm">
              <TextField label="이름" placeholder="홍길동" helper="실명을 입력해주세요." required />
            </div>
          }
          code={`<TextField
  label="이름"
  placeholder="홍길동"
  helper="실명을 입력해주세요."
  required
/>`}
          align="start"
        />
        <Variant
          title="Error state"
          preview={
            <div className="w-full max-w-sm">
              <TextField
                label="이메일"
                value="not-an-email"
                error="올바른 이메일 형식이 아닙니다."
                onChange={() => {}}
              />
            </div>
          }
          code={`<TextField
  label="이메일"
  value={email}
  error={invalid ? "올바른 이메일 형식이 아닙니다." : undefined}
  onChange={(e) => setEmail(e.target.value)}
/>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Sizes">
        <Variant
          title="sm / md / lg"
          preview={
            <div className="w-full max-w-sm space-y-3">
              <TextField label="Small" size="sm" placeholder="sm" />
              <TextField label="Medium" size="md" placeholder="md" />
              <TextField label="Large" size="lg" placeholder="lg" />
            </div>
          }
          code={`<TextField size="sm" />
<TextField size="md" />
<TextField size="lg" />`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Slots">
        <Variant
          title="Left / Right slot"
          preview={
            <div className="w-full max-w-sm space-y-3">
              <TextField placeholder="검색" leftSlot={<Search size={16} />} />
              <TextField placeholder="검색" rightSlot={<kbd className="text-xs">⌘K</kbd>} />
            </div>
          }
          code={`<TextField leftSlot={<Search size={16} />} placeholder="검색" />
<TextField rightSlot={<kbd>⌘K</kbd>} placeholder="검색" />`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "label", type: "string", description: "라벨 텍스트." },
            { name: "helper", type: "string", description: "보조 설명." },
            { name: "error", type: "string", description: "에러 메시지. 있으면 invalid 스타일." },
            { name: "leftSlot", type: "ReactNode", description: "input 좌측 (아이콘 등)." },
            { name: "rightSlot", type: "ReactNode", description: "input 우측 (키 힌트 등)." },
            { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
            { name: "required", type: "boolean", description: "라벨에 * 표시." },
            {
              name: "...props",
              type: "InputHTMLAttributes<HTMLInputElement>",
              description: "표준 input 속성.",
            },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
