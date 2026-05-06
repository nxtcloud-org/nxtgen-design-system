"use client";

import { ModelSelector, PromptInput } from "@nxtgen-org/react";
import { useState } from "react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

const MODELS = [
  { value: "opus", label: "Opus 4.7", group: "Anthropic", tier: "frontier" as const },
  { value: "sonnet", label: "Sonnet 4.6", group: "Anthropic", tier: "balanced" as const },
];

export default function PromptInputDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="PromptInput"
      tagline="멀티라인 입력 + ⌘+Enter 전송 + 파일첨부 + leftSlot."
      description={
        <p>
          채팅 입력 박스. textarea가 자동으로 사이즈 조절(<code>maxRows</code>까지),
          <code> ⌘/Ctrl + Enter</code>로 전송, <code>isStreaming</code> 시 stop 버튼으로 토글.
        </p>
      }
      importLine={`import { PromptInput } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <BasicDemo />
      </ComponentSection>

      <ComponentSection title="With model selector & attach">
        <FullDemo />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "value / defaultValue", type: "string", description: "controlled / uncontrolled." },
            { name: "onChange", type: "(value: string) => void" },
            { name: "onSubmit", type: "(value: string) => void", description: "⌘+Enter 또는 send." },
            { name: "isStreaming", type: "boolean", description: "true면 stop 버튼." },
            { name: "onStop", type: "() => void" },
            { name: "enableAttach", type: "boolean", description: "파일 첨부 버튼." },
            { name: "onAttach", type: "(files: FileList) => void" },
            { name: "maxRows", type: "number", defaultValue: "8" },
            { name: "leftSlot", type: "ReactNode", description: "예: ModelSelector." },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function BasicDemo() {
  const [last, setLast] = useState("");
  return (
    <Variant
      title="onSubmit"
      preview={
        <div className="w-full space-y-2">
          <PromptInput onSubmit={setLast} />
          {last && <p className="text-xs text-text-tertiary">전송: {last}</p>}
        </div>
      }
      code={`<PromptInput onSubmit={(text) => sendMessage(text)} />`}
      align="start"
    />
  );
}

function FullDemo() {
  const [model, setModel] = useState("opus");
  return (
    <Variant
      title="leftSlot + enableAttach"
      preview={
        <div className="w-full">
          <PromptInput
            enableAttach
            onAttach={(files) => alert(`${files.length}개 파일`)}
            leftSlot={<ModelSelector models={MODELS} value={model} onChange={setModel} />}
          />
        </div>
      }
      code={`<PromptInput
  enableAttach
  onAttach={(files) => upload(files)}
  leftSlot={<ModelSelector models={MODELS} value={model} onChange={setModel} />}
/>`}
      align="start"
    />
  );
}
