"use client";

import { MoreHorizontal, Sparkles } from "@nxtgen-org/icons";
import {
  AgentAvatar,
  Badge,
  Button,
  Card,
  CitationLink,
  IconButton,
  MessageBubble,
  ModelSelector,
  PromptInput,
  StreamingText,
  ThinkingIndicator,
  TokenUsageBar,
  ToolCallBlock,
  TooltipProvider,
  useSnapToNewTurn,
} from "@nxtgen-org/react";
import { useState } from "react";
import { DemoNav } from "../_components/DemoNav";

const MODELS = [
  {
    value: "opus",
    label: "Claude Opus 4.7",
    group: "Anthropic",
    tier: "frontier" as const,
    description: "복잡한 태스크 · 추론",
  },
  {
    value: "sonnet",
    label: "Claude Sonnet 4.6",
    group: "Anthropic",
    tier: "balanced" as const,
    description: "균형잡힌 성능",
  },
  {
    value: "haiku",
    label: "Claude Haiku 4.5",
    group: "Anthropic",
    tier: "fast" as const,
    description: "초고속 · 저비용",
  },
  { value: "gpt-5", label: "GPT-5", group: "OpenAI", tier: "frontier" as const },
];

type Msg =
  | { id: number; role: "user" | "assistant"; content: string; streaming?: boolean }
  | { id: number; role: "system"; content: string };

const SEED: Msg[] = [
  { id: 1, role: "system", content: "에이전트가 활성화되었습니다." },
  { id: 2, role: "user", content: "NxtGen 디자인시스템에 대해 알려줘." },
  {
    id: 3,
    role: "assistant",
    content:
      "NxtGen은 AI 애플리케이션을 위한 B2B SaaS 디자인시스템입니다. Pretendard·Geist 폰트와 시그니처 그라디언트를 기반으로 하며, Tailwind v3 + Radix Primitives + CVA 조합을 사용합니다.",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [model, setModel] = useState("opus");
  const [thinking, setThinking] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const { containerRef, setRef, spacerProps } = useSnapToNewTurn(messages, {
    offset: 8,
  });

  const handleSubmit = (text: string) => {
    const userMsg: Msg = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      setStreaming(true);
      const reply: Msg = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "이해했습니다. NxtGen 디자인시스템의 컴포넌트는 토큰 기반으로 light/dark 자동 적응되며, AI-Native 컴포넌트 9종(MessageBubble, AgentAvatar, PromptInput, StreamingText, ThinkingIndicator, ModelSelector, TokenUsageBar, ToolCallBlock, CitationLink)을 포함합니다.",
        streaming: true,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <TooltipProvider>
      {/* viewport-fixed layout — page scroll 없이 메시지 영역만 스크롤 */}
      <main className="h-dvh bg-canvas text-text-primary flex flex-col overflow-hidden">
        <DemoNav subtitle="Chat" />

        {/* Status sub-header */}
        <div className="border-b border-default bg-canvas/80 backdrop-blur-md shrink-0">
          <div className="max-w-6xl mx-auto flex items-center gap-3 px-6 py-3">
            <AgentAvatar
              size="sm"
              status={thinking ? "thinking" : streaming ? "speaking" : "idle"}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">NxtGen Agent</span>
              <span className="text-xs text-text-tertiary">
                {thinking ? "생각 중…" : streaming ? "응답 중…" : "대기"}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="success">Online</Badge>
              <Badge variant="info">200K ctx</Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 max-w-6xl mx-auto px-6 py-6 w-full flex-1 min-h-0">
          {/* Chat column — 내부 스크롤 */}
          <div className="flex flex-col min-h-0">
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto scrollbar-none space-y-4 mb-4"
            >
              {messages.map((m) => (
                <div key={m.id} ref={setRef(m.id)} className="scroll-mt-24">
                  {m.role === "system" ? (
                    <MessageBubble role="system">{m.content}</MessageBubble>
                  ) : m.role === "user" ? (
                    <MessageBubble role="user" timestamp="방금">
                      {m.content}
                    </MessageBubble>
                  ) : (
                    <MessageBubble role="assistant" gradientBorder timestamp="방금">
                      {m.streaming ? (
                        <StreamingText
                          text={m.content}
                          speed={20}
                          onComplete={() => setStreaming(false)}
                        />
                      ) : (
                        <>
                          {m.content}
                          {m.id === 3 && (
                            <>
                              {" "}
                              <CitationLink
                                index={1}
                                title="DESIGN.md §0 — Brand"
                                source="nxtgen-design-system/DESIGN.md"
                                excerpt="Minimal, calm, technical, intelligent. Apple-grade restraint."
                                href="#"
                              />
                              <CitationLink
                                index={2}
                                title="PLAN.md §5 — 기술 스택"
                                source="nxtgen-design-system/PLAN.md"
                                excerpt="Tailwind v4 + Radix + CVA (shadcn/ui 스타일)"
                                href="#"
                              />
                            </>
                          )}
                        </>
                      )}
                    </MessageBubble>
                  )}
                </div>
              ))}

              {thinking && (
                <div className="flex items-center gap-2">
                  <AgentAvatar size="sm" status="thinking" />
                  <ThinkingIndicator />
                </div>
              )}

              <ToolCallBlock
                name="search_design_tokens"
                status="success"
                durationMs={42}
                input={{ query: "primary color", scope: "semantic" }}
                output={{
                  matches: 3,
                  tokens: ["bg.brand", "text.brand", "border.focus"],
                }}
                defaultOpen
              />

              {/* Snap-to-new-turn spacer — 짧은 응답도 새 turn을 상단 정렬 가능하게 */}
              <div {...spacerProps} />
            </div>

            <PromptInput
              isStreaming={streaming}
              onStop={() => setStreaming(false)}
              onSubmit={handleSubmit}
              enableAttach
              onAttach={(files) => alert(`${files.length}개 파일 선택됨`)}
              leftSlot={<ModelSelector models={MODELS} value={model} onChange={setModel} />}
            />
          </div>

          {/* Sidebar — 내부 스크롤 */}
          <aside className="space-y-4 overflow-y-auto scrollbar-none hidden lg:block">
            <Card variant="elevated">
              <Card.Header>
                <Card.Title>세션 정보</Card.Title>
                <IconButton aria-label="더보기" icon={<MoreHorizontal size={16} />} size="sm" />
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <TokenUsageBar used={48000} total={200000} />
                  <TokenUsageBar used={170000} total={200000} />
                  <TokenUsageBar used={195000} total={200000} compact />
                </div>
              </Card.Body>
            </Card>

            <Card variant="ghost" className="bg-gradient-brand text-on-brand">
              <Card.Header>
                <Card.Title className="text-white flex items-center gap-2">
                  <Sparkles size={16} /> Pro 업그레이드
                </Card.Title>
              </Card.Header>
              <Card.Body className="opacity-90 text-on-brand">
                Frontier 모델 무제한 · 더 큰 컨텍스트 · 우선 응답.
              </Card.Body>
              <Card.Actions>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/15 border-white/30 text-on-brand hover:bg-white/25"
                >
                  알아보기
                </Button>
              </Card.Actions>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>최근 도구 호출</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="space-y-2">
                  <ToolCallBlock
                    name="read_file"
                    status="success"
                    durationMs={12}
                    input={{ path: "DESIGN.md" }}
                  />
                  <ToolCallBlock
                    name="grep"
                    status="error"
                    durationMs={840}
                    input={{ pattern: "MISSING" }}
                    output={{ error: "no matches" }}
                  />
                  <ToolCallBlock
                    name="web_search"
                    status="running"
                    input={{ query: "Pretendard" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </aside>
        </div>
      </main>
    </TooltipProvider>
  );
}
