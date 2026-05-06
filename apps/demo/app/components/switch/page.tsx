"use client";

import { Switch } from "@nxtgen-org/react";
import { useState } from "react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function SwitchDoc() {
  return (
    <ComponentPage
      category="Inputs"
      name="Switch"
      tagline="즉시 효과를 갖는 on/off 토글."
      description={
        <p>
          폼 제출 없이 즉시 반영되는 설정용. 폼 안에서 제출 시점에 적용되는 다중 선택은
          <code> Checkbox</code>를 사용. Radix Switch 기반.
        </p>
      }
      importLine={`import { Switch } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <BasicDemo />
      </ComponentSection>

      <ComponentSection title="With label & description">
        <Variant
          title="Compound 라벨"
          preview={
            <div className="w-full max-w-sm">
              <Switch
                label="알림 받기"
                description="에이전트 응답 완료 시 데스크톱 알림."
                defaultChecked
              />
            </div>
          }
          code={`<Switch
  label="알림 받기"
  description="에이전트 응답 완료 시 데스크톱 알림."
  defaultChecked
/>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Disabled">
        <Variant
          title="비활성"
          preview={<Switch label="비활성" disabled />}
          code={`<Switch label="비활성" disabled />`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "checked", type: "boolean", description: "controlled 상태." },
            { name: "defaultChecked", type: "boolean", description: "uncontrolled 초기값." },
            { name: "onCheckedChange", type: "(checked: boolean) => void" },
            { name: "label", type: "string", description: "라벨 텍스트 — useId로 자동 연결." },
            { name: "description", type: "string", description: "보조 설명." },
            { name: "disabled", type: "boolean", defaultValue: "false" },
            { name: "...props", type: "Radix Switch Root props" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function BasicDemo() {
  const [on, setOn] = useState(true);
  return (
    <Variant
      title="Controlled"
      preview={<Switch checked={on} onCheckedChange={setOn} />}
      code={`const [on, setOn] = useState(true);

<Switch checked={on} onCheckedChange={setOn} />`}
    />
  );
}
