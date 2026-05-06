"use client";

import { ModelSelector } from "@nxtgen-org/react";
import { useState } from "react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

const MODELS = [
  { value: "opus",   label: "Claude Opus 4.7",   group: "Anthropic", tier: "frontier" as const, description: "복잡 태스크 · 추론" },
  { value: "sonnet", label: "Claude Sonnet 4.6", group: "Anthropic", tier: "balanced" as const, description: "균형" },
  { value: "haiku",  label: "Claude Haiku 4.5",  group: "Anthropic", tier: "fast"     as const, description: "초고속" },
  { value: "gpt-5",  label: "GPT-5",             group: "OpenAI",    tier: "frontier" as const },
];

export default function ModelSelectorDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="ModelSelector"
      tagline="모델 선택 드롭다운 — tier 자동 배지."
      description={
        <p>
          <code>Select</code>의 wrapper. <code>tier</code>(frontier/balanced/fast)에 따라 자동 배지,
          <code>group</code>으로 provider 그룹화.
        </p>
      }
      importLine={`import { ModelSelector, type ModelOption } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Demo />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "models", type: "ModelOption[]", required: true },
            { name: "value / defaultValue", type: "string" },
            { name: "onChange", type: "(value: string) => void" },
            { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"sm"' },
            {
              name: "ModelOption",
              type: "{ value, label, group?, tier?, description? }",
              description: 'tier: "frontier" | "balanced" | "fast"',
            },
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
      title="Tier 배지 + group"
      preview={
        <div className="w-full max-w-xs">
          <ModelSelector models={MODELS} value={model} onChange={setModel} />
          <p className="mt-2 text-xs text-text-tertiary">선택: <code>{model}</code></p>
        </div>
      }
      code={`const MODELS = [
  { value: "opus",   label: "Claude Opus 4.7",   group: "Anthropic", tier: "frontier" },
  { value: "sonnet", label: "Claude Sonnet 4.6", group: "Anthropic", tier: "balanced" },
  { value: "haiku",  label: "Claude Haiku 4.5",  group: "Anthropic", tier: "fast" },
  { value: "gpt-5",  label: "GPT-5",             group: "OpenAI",    tier: "frontier" },
];

<ModelSelector models={MODELS} value={model} onChange={setModel} />`}
      align="start"
    />
  );
}
