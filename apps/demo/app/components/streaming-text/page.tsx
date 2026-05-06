"use client";

import { Button, StreamingText } from "@nxtgen-org/react";
import { useState } from "react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

const SAMPLE =
  "토큰 단위로 점진 출력하는 LLM 응답 시뮬레이션. 커서가 깜빡이며 문자가 하나씩 나타납니다.";

export default function StreamingTextDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="StreamingText"
      tagline="setInterval로 토큰 단위 점진 출력 + 커서 blink."
      description={
        <p>
          LLM 스트리밍 응답을 시뮬레이션. 실제 SSE/WebSocket 스트림 사용 시는 받은 토큰을
          점진적으로 <code>text</code> prop에 누적시키면 됩니다.
        </p>
      }
      importLine={`import { StreamingText } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Basic">
        <Demo />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "text", type: "string", required: true, description: "전체 텍스트." },
            { name: "speed", type: "number", defaultValue: "30", description: "토큰당 ms." },
            { name: "cursor", type: "boolean", defaultValue: "true", description: "blink 커서 표시." },
            { name: "done", type: "boolean", defaultValue: "false", description: "완료된 상태로 시작 (replay 방지)." },
            { name: "onComplete", type: "() => void" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function Demo() {
  const [key, setKey] = useState(0);
  return (
    <Variant
      title="다시 재생"
      preview={
        <div className="w-full space-y-3">
          <p className="text-sm text-text-primary">
            <StreamingText key={key} text={SAMPLE} speed={25} />
          </p>
          <Button size="sm" variant="secondary" onClick={() => setKey((k) => k + 1)}>
            다시 재생
          </Button>
        </div>
      }
      code={`<StreamingText text={SAMPLE} speed={25} />`}
      align="start"
    />
  );
}
