"use client";

import { ChevronDown, Copy, LogOut, Settings, User } from "@nxtgen-org/icons";
import { Button, DropdownMenu } from "@nxtgen-org/react";
import { useState } from "react";
import { ComponentPage, ComponentSection, PropsTable, Variant } from "../../_components/doc";

export default function DropdownMenuDoc() {
  return (
    <ComponentPage
      category="Feedback"
      name="DropdownMenu"
      tagline="컨텍스트 메뉴 — sub menu, checkbox/radio item, shortcut 지원."
      description={
        <p>
          더보기(<code>···</code>) 버튼, 사용자 메뉴 등에 사용. Radix DropdownMenu 기반 — 키보드
          네비, 화살표 sub-menu 진입 표준.
        </p>
      }
      importLine={`import { DropdownMenu } from "@nxtgen-org/react";`}
    >
      <ComponentSection title="Full demo">
        <Demo />
      </ComponentSection>

      <ComponentSection title="API">
        <PropsTable
          rows={[
            { name: "DropdownMenu", type: "Radix Root" },
            { name: ".Trigger / .Content / .Item / .Label / .Separator", type: "—" },
            { name: ".CheckboxItem / .RadioGroup / .RadioItem", type: "—" },
            { name: ".Sub / .SubTrigger / .SubContent", type: "—" },
            { name: ".Shortcut", type: "span", description: "ml-auto 자동 우측 정렬." },
            { name: ".Item destructive", type: "boolean", description: "위험 액션 (붉은색)." },
          ]}
        />
      </ComponentSection>
    </ComponentPage>
  );
}

function Demo() {
  const [theme, setTheme] = useState("system");
  const [showHidden, setShowHidden] = useState(false);
  return (
    <Variant
      title="Compound + sub + checkbox/radio + shortcut"
      preview={
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary" rightIcon={<ChevronDown size={14} />}>
              메뉴 열기
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>내 계정</DropdownMenu.Label>
            <DropdownMenu.Item>
              <User size={14} /> 프로필
              <DropdownMenu.Shortcut>⌘P</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Settings size={14} /> 설정
              <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Copy size={14} /> 복사
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>테마</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.CheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
              숨김 항목 표시
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.Item destructive>
              <LogOut size={14} /> 로그아웃
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      }
      code={`<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="secondary" rightIcon={<ChevronDown size={14} />}>메뉴</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>내 계정</DropdownMenu.Label>
    <DropdownMenu.Item><User size={14} /> 프로필<DropdownMenu.Shortcut>⌘P</DropdownMenu.Shortcut></DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>테마</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.CheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
      숨김 항목 표시
    </DropdownMenu.CheckboxItem>
    <DropdownMenu.Item destructive><LogOut size={14} /> 로그아웃</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>`}
    />
  );
}
