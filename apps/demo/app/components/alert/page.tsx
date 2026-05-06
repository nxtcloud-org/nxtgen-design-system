"use client";

import { Alert, Button } from "@nxtgen-org/react";
import { useState } from "react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function AlertDoc() {
  return (
    <ComponentPage
      category="Feedback"
      name="Alert"
      tagline="페이지 안에 머무는 인라인 알림."
      description={
        <p>
          페이지/섹션 영역에 영구·반영구로 머무는 메시지. 일시적 알림은 <code>Toast</code>.
          severity 4종, 자동 아이콘, 옵션으로 dismiss 버튼.
        </p>
      }
      importLine={`import { Alert } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Severities">
        <Variant
          title="info / success / warning / danger"
          preview={
            <div className="w-full space-y-2">
              <Alert variant="info" title="새 모델">Opus 4.7이 추가되었습니다.</Alert>
              <Alert variant="success" title="저장 완료">정상적으로 저장되었습니다.</Alert>
              <Alert variant="warning" title="토큰 부족">남은 토큰: 1,200</Alert>
              <Alert variant="danger" title="실행 실패">도구 호출 오류.</Alert>
            </div>
          }
          code={`<Alert variant="info" title="새 모델">Opus 4.7이 추가되었습니다.</Alert>
<Alert variant="success" title="저장 완료">정상적으로 저장되었습니다.</Alert>
<Alert variant="warning" title="토큰 부족">남은 토큰: 1,200</Alert>
<Alert variant="danger" title="실행 실패">도구 호출 오류.</Alert>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Dismissible">
        <DismissDemo />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "variant", type: '"info" | "success" | "warning" | "danger"', defaultValue: '"info"' },
            { name: "title", type: "ReactNode" },
            { name: "children", type: "ReactNode", description: "본문." },
            { name: "onDismiss", type: "() => void", description: "있으면 우측에 닫기 버튼." },
            { name: "icon", type: "ReactNode | false", description: "false면 숨김. 직접 ReactNode면 override." },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function DismissDemo() {
  const [open, setOpen] = useState(true);
  return (
    <Variant
      title="onDismiss"
      preview={
        <div className="w-full">
          {open ? (
            <Alert variant="danger" title="에이전트 실행 실패" onDismiss={() => setOpen(false)}>
              도구 호출 중 오류 발생.
            </Alert>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
              알림 다시 보기
            </Button>
          )}
        </div>
      }
      code={`const [open, setOpen] = useState(true);

{open && (
  <Alert variant="danger" title="실패" onDismiss={() => setOpen(false)}>
    도구 호출 오류.
  </Alert>
)}`}
      align="start"
    />
  );
}
