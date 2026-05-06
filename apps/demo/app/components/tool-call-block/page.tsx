import { ToolCallBlock } from "@nxtgen-org/react";
import {
  ComponentPage,
  ComponentSection,
  PropsTable,
  Variant,
} from "../../_components/doc";

export default function ToolCallBlockDoc() {
  return (
    <ComponentPage
      category="AI-Native"
      name="ToolCallBlock"
      tagline="에이전트의 도구 호출 표시 + JSON I/O 접힘/펼침."
      description={
        <p>
          에이전트가 외부 도구(<code>read_file</code>, <code>web_search</code> 등)를
          호출했을 때 표시. status에 따라 자동 아이콘/색.
        </p>
      }
      importLine={`import { ToolCallBlock } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Statuses">
        <Variant
          title="pending / running / success / error"
          preview={
            <div className="w-full space-y-2">
              <ToolCallBlock name="read_file" status="success" durationMs={12} input={{ path: "DESIGN.md" }} />
              <ToolCallBlock name="web_search" status="running" input={{ query: "Pretendard" }} />
              <ToolCallBlock name="grep" status="error" durationMs={840} output={{ error: "no matches" }} />
              <ToolCallBlock name="schedule" status="pending" />
            </div>
          }
          code={`<ToolCallBlock name="read_file"  status="success" durationMs={12} input={{ path: "DESIGN.md" }} />
<ToolCallBlock name="web_search" status="running" input={{ query: "Pretendard" }} />
<ToolCallBlock name="grep"       status="error"   durationMs={840} output={{ error: "no matches" }} />
<ToolCallBlock name="schedule"   status="pending" />`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="Default open with I/O">
        <Variant
          title="펼쳐진 상태"
          preview={
            <div className="w-full">
              <ToolCallBlock
                name="search_design_tokens"
                status="success"
                durationMs={42}
                input={{ query: "primary color", scope: "semantic" }}
                output={{ matches: 3, tokens: ["bg.brand", "text.brand", "border.focus"] }}
                defaultOpen
              />
            </div>
          }
          code={`<ToolCallBlock
  name="search_design_tokens"
  status="success"
  durationMs={42}
  input={{ query: "primary color", scope: "semantic" }}
  output={{ matches: 3, tokens: ["bg.brand", "text.brand", "border.focus"] }}
  defaultOpen
/>`}
          align="start"
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "name", type: "string", required: true },
            { name: "status", type: '"pending" | "running" | "success" | "error"', defaultValue: '"success"' },
            { name: "input", type: "unknown", description: "객체면 자동 stringify." },
            { name: "output", type: "unknown", description: "객체면 자동 stringify." },
            { name: "durationMs", type: "number" },
            { name: "defaultOpen", type: "boolean", defaultValue: "false" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
