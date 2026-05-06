"use client";

import { Bot, Heart, Settings } from "@nxtgen-org/icons";
import { Button, IconButton, Tooltip, TooltipProvider } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function TooltipDoc() {
  return (
    <ComponentPage
      category="Feedback"
      name="Tooltip"
      tagline="hover/focus 시 표시되는 짧은 보조 정보."
      description={
        <p>
          IconButton의 의미 보강, 키보드 단축키 안내 등. 본문 안 핵심 정보 전달용은 아님.
          여러 곳에 쓰면 외부에 <code>TooltipProvider</code>로 감쌀 것 (delay 공유).
        </p>
      }
      importLine={`import { Tooltip, TooltipProvider } from "@nxtgen-org/react";`}
    >
      <TooltipProvider>
        <ComponentSection title="Sides">
          <Variant
            title="top / bottom / left / right"
            preview={
              <>
                <Tooltip content="새 채팅 시작" side="top">
                  <IconButton aria-label="새 채팅" icon={<Bot size={18} />} />
                </Tooltip>
                <Tooltip content="좋아요" side="bottom">
                  <IconButton aria-label="좋아요" icon={<Heart size={18} />} variant="secondary" />
                </Tooltip>
                <Tooltip content="환경설정" side="right">
                  <IconButton aria-label="설정" icon={<Settings size={18} />} variant="ghost" />
                </Tooltip>
              </>
            }
            code={`<Tooltip content="새 채팅 시작" side="top">
  <IconButton aria-label="새 채팅" icon={<Bot size={18} />} />
</Tooltip>`}
          />
        </ComponentSection>

        <ComponentSection title="Rich content">
          <Variant
            title="ReactNode 렌더"
            preview={
              <Tooltip
                content={
                  <>
                    <kbd>⌘</kbd> + <kbd>K</kbd> 로 빠르게 열기
                  </>
                }
              >
                <Button variant="secondary" size="sm">
                  키보드 단축키
                </Button>
              </Tooltip>
            }
            code={`<Tooltip
  content={<><kbd>⌘</kbd> + <kbd>K</kbd> 로 빠르게 열기</>}
>
  <Button variant="secondary" size="sm">키보드 단축키</Button>
</Tooltip>`}
          />
        </ComponentSection>

        <ComponentSection title="API">
          <PropsTable
            rows={[
              { name: "content", type: "ReactNode", required: true },
              { name: "children", type: "ReactNode", description: "trigger element.", required: true },
              { name: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"top"' },
              { name: "align", type: '"start" | "center" | "end"', defaultValue: '"center"' },
              { name: "delayDuration", type: "number", defaultValue: "300" },
              { name: "withProvider", type: "boolean", defaultValue: "true", description: "외부 Provider 있으면 false." },
            ]}
          />
        </ComponentSection>
      </TooltipProvider>
    </ComponentPage>
  );
}
