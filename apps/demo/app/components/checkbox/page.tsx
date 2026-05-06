"use client";

import { Checkbox } from "@nxtgen-org/react";
import { useState } from "react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function CheckboxDoc() {
  return (
    <ComponentPage
      category="Inputs"
      name="Checkbox"
      tagline="다중 선택. indeterminate 상태 지원."
      description={
        <p>
          폼 안 다중 선택, 동의 항목 등에 사용. 부모-자식 트리 표현 시<code> indeterminate</code>{" "}
          지원. Radix Checkbox 기반.
        </p>
      }
      importLine={`import { Checkbox } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Demo />
      </ComponentSection>

      <ComponentSection title="States">
        <Variant
          title="indeterminate / disabled"
          preview={
            <div className="space-y-2">
              <Checkbox label="indeterminate" checked="indeterminate" />
              <Checkbox label="disabled + checked" disabled checked />
              <Checkbox label="disabled" disabled />
            </div>
          }
          code={`<Checkbox label="indeterminate" checked="indeterminate" />
<Checkbox label="disabled + checked" disabled checked />
<Checkbox label="disabled" disabled />`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "checked", type: 'boolean | "indeterminate"' },
            { name: "defaultChecked", type: 'boolean | "indeterminate"' },
            { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void' },
            { name: "label", type: "string" },
            { name: "description", type: "string" },
            { name: "disabled", type: "boolean", defaultValue: "false" },
            { name: "...props", type: "Radix Checkbox Root props" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function Demo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <Variant
      title="Controlled"
      preview={
        <Checkbox
          label="이용약관에 동의합니다"
          checked={agreed}
          onCheckedChange={(v) => setAgreed(v === true)}
        />
      }
      code={`const [agreed, setAgreed] = useState(false);

<Checkbox
  label="이용약관에 동의합니다"
  checked={agreed}
  onCheckedChange={(v) => setAgreed(v === true)}
/>`}
    />
  );
}
