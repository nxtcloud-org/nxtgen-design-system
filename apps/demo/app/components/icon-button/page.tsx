"use client";

import { Heart, MoreHorizontal, Search, Settings, Trash2 } from "@nxtgen-org/icons";
import { IconButton } from "@nxtgen-org/react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function IconButtonDoc() {
  return (
    <ComponentPage
      category="Actions"
      name="IconButton"
      tagline="아이콘만으로 액션을 표현하는 버튼."
      description=<p>
        툴바·헤더·테이블 행 등 공간이 좁고 액션 의미가 아이콘으로 충분할 때. 시각 라벨이 없으므로{" "}
        <code>aria-label</code>이 <strong>필수</strong>.
      </p>
      importLine={`import { IconButton } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Variants">
        <Variant
          title="4 variants"
          preview={
            <>
              <IconButton aria-label="검색" icon={<Search size={18} />} variant="primary" />
              <IconButton aria-label="설정" icon={<Settings size={18} />} variant="secondary" />
              <IconButton aria-label="더보기" icon={<MoreHorizontal size={18} />} variant="ghost" />
              <IconButton aria-label="삭제" icon={<Trash2 size={18} />} variant="danger" />
            </>
          }
          code={`<IconButton aria-label="검색" icon={<Search size={18} />} variant="primary" />
<IconButton aria-label="설정" icon={<Settings size={18} />} variant="secondary" />
<IconButton aria-label="더보기" icon={<MoreHorizontal size={18} />} variant="ghost" />
<IconButton aria-label="삭제" icon={<Trash2 size={18} />} variant="danger" />`}
        />
      </ComponentSection>

      <ComponentSection title="Sizes">
        <Variant
          title="sm / md / lg"
          preview={
            <>
              <IconButton aria-label="좋아요" icon={<Heart size={14} />} size="sm" />
              <IconButton aria-label="좋아요" icon={<Heart size={18} />} size="md" />
              <IconButton aria-label="좋아요" icon={<Heart size={22} />} size="lg" />
            </>
          }
          code={`<IconButton aria-label="좋아요" icon={<Heart size={14} />} size="sm" />
<IconButton aria-label="좋아요" icon={<Heart size={18} />} size="md" />
<IconButton aria-label="좋아요" icon={<Heart size={22} />} size="lg" />`}
        />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "icon", type: "ReactNode", description: "표시할 아이콘.", required: true },
            { name: "aria-label", type: "string", description: "스크린리더 라벨.", required: true },
            {
              name: "variant",
              type: '"primary" | "secondary" | "ghost" | "danger"',
              defaultValue: '"ghost"',
            },
            { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
            { name: "asChild", type: "boolean", defaultValue: "false", description: "Radix Slot." },
            { name: "...props", type: "ButtonHTMLAttributes<HTMLButtonElement>" },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}
