"use client";

import { Trash2 } from "@nxtgen-org/icons";
import { Button, Dialog } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function DialogDoc() {
  return (
    <ComponentPage
      category="Feedback"
      name="Dialog"
      tagline="모달 다이얼로그 — 사용자 결정·확인이 필요한 흐름."
      description={
        <p>
          Compound: <code>Trigger / Content / Header / Title / Description / Footer / Close</code>.
          Radix Dialog 기반 — focus trap, ESC, overlay 클릭 닫기 모두 표준.
        </p>
      }
      importLine={`import { Dialog } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Variant
          title="Confirm 패턴"
          preview={
            <Dialog>
              <Dialog.Trigger asChild>
                <Button variant="danger" leftIcon={<Trash2 size={16} />}>
                  에이전트 삭제
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>정말 삭제하시겠습니까?</Dialog.Title>
                  <Dialog.Description>
                    이 에이전트의 모든 대화·메모리·도구 정의가 영구 삭제됩니다.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button variant="ghost">취소</Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button variant="danger">삭제</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          }
          code={`<Dialog>
  <Dialog.Trigger asChild>
    <Button variant="danger" leftIcon={<Trash2 size={16} />}>삭제</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>정말 삭제하시겠습니까?</Dialog.Title>
      <Dialog.Description>영구 삭제됩니다.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close asChild>
        <Button variant="ghost">취소</Button>
      </Dialog.Close>
      <Dialog.Close asChild>
        <Button variant="danger">삭제</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "Dialog", type: "Radix Dialog Root" },
            { name: "Dialog.Trigger", type: "Radix Trigger" },
            { name: "Dialog.Content", type: "Radix Content + hideCloseButton?: boolean" },
            { name: "Dialog.Header / Title / Description / Footer / Close", type: "—" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
