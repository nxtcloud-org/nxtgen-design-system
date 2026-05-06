import { MessageBubble } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function MessageBubbleDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="MessageBubble"
      tagline="user / assistant / system 채팅 말풍선."
      description={
        <p>
          role에 따라 자동 정렬·색·꼬리 모서리 처리. assistant에 <code>gradientBorder</code>
          옵션을 켜면 background-clip 트릭으로 1.5px 그라디언트 보더가 자연스럽게 그려집니다.
        </p>
      }
      importLine={`import { MessageBubble } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Roles">
        <Variant
          title="user / assistant / system"
          preview={
            <div className="w-full space-y-3">
              <MessageBubble role="system">에이전트가 활성화되었습니다.</MessageBubble>
              <MessageBubble role="user" timestamp="방금">
                NxtGen 디자인시스템 알려줘.
              </MessageBubble>
              <MessageBubble role="assistant" timestamp="방금">
                AI 애플리케이션을 위한 디자인시스템입니다.
              </MessageBubble>
            </div>
          }
          code={`<MessageBubble role="system">에이전트가 활성화되었습니다.</MessageBubble>
<MessageBubble role="user" timestamp="방금">NxtGen 디자인시스템 알려줘.</MessageBubble>
<MessageBubble role="assistant" timestamp="방금">
  AI 애플리케이션을 위한 디자인시스템입니다.
</MessageBubble>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Gradient border (assistant)">
        <Variant
          title="AI 강조 메시지"
          preview={
            <div className="w-full">
              <MessageBubble role="assistant" gradientBorder timestamp="방금">
                Pretendard·Geist 폰트와 시그니처 그라디언트를 기반으로 합니다.
              </MessageBubble>
            </div>
          }
          code={`<MessageBubble role="assistant" gradientBorder>
  Pretendard·Geist 폰트와 시그니처 그라디언트를 기반으로 합니다.
</MessageBubble>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "role", type: '"user" | "assistant" | "system"', defaultValue: '"assistant"' },
            { name: "timestamp", type: "string", description: "말풍선 아래 시각 표시." },
            { name: "avatar", type: "ReactNode", description: "assistant 좌측 아바타. 기본 AgentAvatar." },
            { name: "gradientBorder", type: "boolean", description: "assistant에만 적용. 그라디언트 1.5px border." },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
