"use client";

import { Bot } from "@nxtgen-org/icons";
import { Button, ToastProvider, useToast } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function ToastDoc() {
  return (
    <ComponentPage
      category="Feedback"
      name="Toast"
      tagline="우하단에 잠시 떴다 사라지는 일시적 알림."
      description={
        <p>
          저장 완료, 에러 발생 등 사용자 흐름을 차단하지 않는 알림. App entry에서
          <code> ToastProvider</code>로 감싸고 <code>useToast()</code> hook으로 발사.
        </p>
      }
      importLine={`import { ToastProvider, useToast } from "@nxtgen-org/react";`}
    >
      <ToastProvider>
        <ComponentSection title="Severities">
          <Demo />
        </ComponentSection>
      </ToastProvider>

      <ComponentSection title="Setup">
        <Variant
          title="App entry"
          preview={
            <pre className="text-xs font-mono text-text-secondary">
              {"<ToastProvider>\n  <App />\n</ToastProvider>"}
            </pre>
          }
          code={`// app/layout.tsx
import { ToastProvider } from "@nxtgen-org/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "ToastProvider", type: "{ duration?: number }", description: "기본 5000ms." },
            { name: "useToast()", type: "{ toast: (item) => void }" },
            { name: "toast()", type: "{ variant, title, description?, duration? }" },
            { name: "variant", type: '"info" | "success" | "warning" | "danger"' },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function Demo() {
  const { toast } = useToast();
  return (
    <Variant
      title="useToast() hook"
      preview={
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              toast({ variant: "info", title: "새 메시지", description: "에이전트 응답." })
            }
          >
            Info
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast({ variant: "success", title: "저장 완료" })}
          >
            Success
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast({ variant: "warning", title: "토큰 부족" })}
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast({ variant: "danger", title: "실행 실패" })}
          >
            Danger
          </Button>
          <Button
            variant="gradient"
            size="sm"
            leftIcon={<Bot size={14} />}
            onClick={() =>
              toast({
                variant: "info",
                title: "에이전트 활성화됨",
                description: "준비 완료. 무엇을 도와드릴까요?",
                duration: 8000,
              })
            }
          >
            AI Toast (8s)
          </Button>
        </>
      }
      code={`const { toast } = useToast();

toast({ variant: "success", title: "저장 완료" });
toast({
  variant: "info",
  title: "에이전트 활성화됨",
  description: "준비 완료.",
  duration: 8000,
});`}
    />
  );
}
