import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

interface VariantProps {
  title: string;
  description?: ReactNode;
  /** 라이브 미리보기 — 실제 컴포넌트 인스턴스 */
  preview: ReactNode;
  /** 미리보기와 일치하는 코드 스니펫 */
  code: string;
  /** preview 영역 정렬 (기본 center). align="start"는 좌측 정렬. */
  align?: "start" | "center";
}

/** Preview를 위, Code를 아래에 배치 (상하 레이아웃). */
export function Variant({ title, description, preview, code, align = "center" }: VariantProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold tracking-[-0.01em]">{title}</h3>
        {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
      </div>
      <div className="rounded-md border border-default overflow-hidden">
        <div
          className={`min-h-[140px] flex flex-wrap items-center gap-3 p-6 bg-canvas ${
            align === "start" ? "justify-start" : "justify-center"
          }`}
        >
          {preview}
        </div>
        <div className="border-t border-default">
          <CodeBlock code={code} />
        </div>
      </div>
    </div>
  );
}
