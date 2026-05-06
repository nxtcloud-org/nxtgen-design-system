"use client";

import { RadioGroup } from "@nxtgen-org/react";
import { useState } from "react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function RadioGroupDoc() {
  return (
    <ComponentPage
      category="Inputs"
      name="RadioGroup"
      tagline="여러 옵션 중 하나만 선택."
      description={
        <p>
          Compound API: <code>RadioGroup</code> + <code>RadioGroup.Item</code>. 항목 수가
          5개 미만이고 모두 가시적으로 보여야 할 때. 그 이상은 <code>Select</code>.
        </p>
      }
      importLine={`import { RadioGroup } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Demo />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "value", type: "string", description: "controlled 선택." },
            { name: "defaultValue", type: "string" },
            { name: "onValueChange", type: "(value: string) => void" },
            { name: "RadioGroup.Item", type: "{ value, label?, description?, disabled? }" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function Demo() {
  const [model, setModel] = useState("opus");
  return (
    <Variant
      title="Compound API"
      preview={
        <RadioGroup value={model} onValueChange={setModel} className="w-full max-w-sm">
          <RadioGroup.Item value="opus" label="Opus 4.7" description="복잡 태스크 · 추론." />
          <RadioGroup.Item value="sonnet" label="Sonnet 4.6" description="균형잡힌 성능." />
          <RadioGroup.Item value="haiku" label="Haiku 4.5" description="초고속 · 저비용." />
        </RadioGroup>
      }
      code={`const [model, setModel] = useState("opus");

<RadioGroup value={model} onValueChange={setModel}>
  <RadioGroup.Item value="opus"   label="Opus 4.7"   description="복잡 태스크 · 추론." />
  <RadioGroup.Item value="sonnet" label="Sonnet 4.6" description="균형잡힌 성능." />
  <RadioGroup.Item value="haiku"  label="Haiku 4.5"  description="초고속 · 저비용." />
</RadioGroup>`}
      align="start"
    />
  );
}
