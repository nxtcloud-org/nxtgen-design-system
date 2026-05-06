"use client";

import { AgentAvatar } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function AgentAvatarDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="AgentAvatar"
      tagline="conic-gradient 보더 + 상태 표시 아바타."
      description={
        <p>
          NxtGen의 시그니처 그라디언트가 conic으로 회전 보더를 만듭니다. status에 따라
          정적/회전/펄스 애니메이션이 자동 적용.
        </p>
      }
      importLine={`import { AgentAvatar } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Sizes">
        <Variant
          title="sm / md / lg / xl"
          preview={
            <>
              <AgentAvatar size="sm" />
              <AgentAvatar size="md" />
              <AgentAvatar size="lg" />
              <AgentAvatar size="xl" />
            </>
          }
          code={`<AgentAvatar size="sm" />
<AgentAvatar size="md" />
<AgentAvatar size="lg" />
<AgentAvatar size="xl" />`}
        />
      </ComponentSection>

      <ComponentSection title="Status">
        <Variant
          title="idle / thinking / speaking"
          preview={
            <>
              <div className="flex flex-col items-center gap-2">
                <AgentAvatar size="lg" status="idle" />
                <span className="text-xs text-text-tertiary">idle</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AgentAvatar size="lg" status="thinking" />
                <span className="text-xs text-text-tertiary">thinking</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AgentAvatar size="lg" status="speaking" />
                <span className="text-xs text-text-tertiary">speaking</span>
              </div>
            </>
          }
          code={`<AgentAvatar size="lg" status="idle" />
<AgentAvatar size="lg" status="thinking" />  // 회전
<AgentAvatar size="lg" status="speaking" />  // 펄스`}
        />
      </ComponentSection>

      <ComponentSection title="Custom image">
        <Variant
          title="src + alt"
          preview={
            <AgentAvatar
              size="lg"
              src="https://api.dicebear.com/7.x/bottts/svg?seed=NxtGen"
              alt="custom agent"
            />
          }
          code={`<AgentAvatar
  size="lg"
  src="https://example.com/avatar.png"
  alt="agent name"
/>`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "size", type: '"sm" | "md" | "lg" | "xl"', defaultValue: '"md"' },
            { name: "status", type: '"idle" | "thinking" | "speaking"', defaultValue: '"idle"' },
            { name: "src", type: "string", description: "이미지 URL." },
            { name: "alt", type: "string" },
            { name: "fallback", type: "ReactNode", description: "src 없을 때 (기본 Bot 아이콘)." },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
