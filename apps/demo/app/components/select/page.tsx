"use client";

import { Select } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function SelectDoc() {
  return (
    <ComponentPage
      category="Inputs"
      name="Select"
      tagline="키보드 친화 단일 선택 드롭다운."
      description={
        <p>
          항목이 많거나 그룹화가 필요한 경우. Compound:
          <code> Trigger / Content / Group / Label / Item / Separator</code>. Radix Select 기반 —
          키보드, 포커스 트랩, 가상 포커스 모두 표준.
        </p>
      }
      importLine={`import { Select } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Variant
          title="Single group"
          preview={
            <div className="w-full max-w-xs">
              <Select defaultValue="ko">
                <Select.Trigger className="w-full">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="ko">한국어</Select.Item>
                    <Select.Item value="en">English</Select.Item>
                    <Select.Item value="ja">日本語</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select>
            </div>
          }
          code={`<Select defaultValue="ko">
  <Select.Trigger className="w-full">
    <Select.Value />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Item value="ko">한국어</Select.Item>
      <Select.Item value="en">English</Select.Item>
      <Select.Item value="ja">日本語</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="With groups & labels">
        <Variant
          title="Multiple groups + separator"
          preview={
            <div className="w-full max-w-xs">
              <Select defaultValue="opus">
                <Select.Trigger className="w-full">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Anthropic</Select.Label>
                    <Select.Item value="opus">Opus 4.7</Select.Item>
                    <Select.Item value="sonnet">Sonnet 4.6</Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>OpenAI</Select.Label>
                    <Select.Item value="gpt-5">GPT-5</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select>
            </div>
          }
          code={`<Select defaultValue="opus">
  <Select.Trigger>
    <Select.Value />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Anthropic</Select.Label>
      <Select.Item value="opus">Opus 4.7</Select.Item>
      <Select.Item value="sonnet">Sonnet 4.6</Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.Label>OpenAI</Select.Label>
      <Select.Item value="gpt-5">GPT-5</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            {
              name: "Select",
              type: "Radix Select Root",
              description: "value/defaultValue/onValueChange.",
            },
            { name: "Trigger", type: "props + size?: 'sm'|'md'|'lg'" },
            { name: "Content", type: "Radix Content + 자체 styling" },
            { name: "Item", type: "value: string + children" },
            {
              name: "Group / Label / Separator",
              type: "—",
              description: "Label은 Group 내부 필수.",
            },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
