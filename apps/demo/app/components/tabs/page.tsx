"use client";

import { Tabs } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function TabsDoc() {
  return (
    <ComponentPage
      category="Navigation"
      name="Tabs"
      tagline="같은 영역에서 다른 콘텐츠를 전환하는 탭."
      description={
        <p>
          페이지 안 섹션 전환에 적합. 페이지 자체 전환은 <code>Link</code>를 사용. Radix Tabs 기반 —
          화살표 키 네비, focus 관리 표준.
        </p>
      }
      importLine={`import { Tabs } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Variant
          title="언더라인 인디케이터"
          preview={
            <div className="w-full max-w-md">
              <Tabs defaultValue="prompt">
                <Tabs.List>
                  <Tabs.Trigger value="prompt">Prompt</Tabs.Trigger>
                  <Tabs.Trigger value="tools">Tools</Tabs.Trigger>
                  <Tabs.Trigger value="memory">Memory</Tabs.Trigger>
                  <Tabs.Trigger value="logs" disabled>
                    Logs
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="prompt">
                  <p className="text-sm text-text-secondary p-4 bg-subtle rounded-md">
                    시스템 프롬프트 정의.
                  </p>
                </Tabs.Content>
                <Tabs.Content value="tools">
                  <p className="text-sm text-text-secondary p-4 bg-subtle rounded-md">도구 정의.</p>
                </Tabs.Content>
                <Tabs.Content value="memory">
                  <p className="text-sm text-text-secondary p-4 bg-subtle rounded-md">
                    장기 메모리.
                  </p>
                </Tabs.Content>
              </Tabs>
            </div>
          }
          code={`<Tabs defaultValue="prompt">
  <Tabs.List>
    <Tabs.Trigger value="prompt">Prompt</Tabs.Trigger>
    <Tabs.Trigger value="tools">Tools</Tabs.Trigger>
    <Tabs.Trigger value="memory">Memory</Tabs.Trigger>
    <Tabs.Trigger value="logs" disabled>Logs</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="prompt">...</Tabs.Content>
  <Tabs.Content value="tools">...</Tabs.Content>
  <Tabs.Content value="memory">...</Tabs.Content>
</Tabs>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "Tabs", type: "Radix Root", description: "value/defaultValue/onValueChange." },
            { name: "Tabs.List / .Trigger / .Content", type: "—" },
            { name: "Trigger disabled", type: "boolean" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
