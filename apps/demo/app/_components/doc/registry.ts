/**
 * 컴포넌트 메타데이터 단일 소스.
 * 좌측 SideNav + 카탈로그 페이지가 이 데이터를 참조.
 */

export interface ComponentMeta {
  slug: string;
  name: string;
  /** 카탈로그/네비에 표시될 짧은 한 줄 설명 */
  tagline: string;
}

export interface CategoryGroup {
  category: string;
  items: ComponentMeta[];
}

export const COMPONENT_GROUPS: CategoryGroup[] = [
  {
    category: "Actions",
    items: [
      { slug: "button", name: "Button", tagline: "사용자의 액션을 트리거하는 가장 기본 요소." },
      { slug: "icon-button", name: "IconButton", tagline: "아이콘만 있는 버튼." },
    ],
  },
  {
    category: "Inputs",
    items: [
      {
        slug: "text-field",
        name: "TextField",
        tagline: "label + helper + error를 갖춘 텍스트 입력.",
      },
      { slug: "switch", name: "Switch", tagline: "on/off 토글." },
      { slug: "checkbox", name: "Checkbox", tagline: "다중 선택 + indeterminate 상태." },
      { slug: "radio-group", name: "RadioGroup", tagline: "단일 선택 라디오 그룹." },
      { slug: "select", name: "Select", tagline: "키보드 친화 단일 선택 드롭다운." },
    ],
  },
  {
    category: "Contents",
    items: [
      { slug: "card", name: "Card", tagline: "Compound API 카드 컨테이너." },
      { slug: "badge", name: "Badge", tagline: "메타 정보 표시 라벨." },
    ],
  },
  {
    category: "Feedback",
    items: [
      { slug: "alert", name: "Alert", tagline: "인라인 알림 배너." },
      { slug: "tooltip", name: "Tooltip", tagline: "호버/포커스 보조 정보." },
      { slug: "dialog", name: "Dialog", tagline: "모달 다이얼로그." },
      {
        slug: "dropdown-menu",
        name: "DropdownMenu",
        tagline: "컨텍스트 메뉴 + 서브메뉴/체크/라디오.",
      },
      { slug: "toast", name: "Toast", tagline: "일시적 알림 (Provider + hook)." },
    ],
  },
  {
    category: "Loading",
    items: [
      { slug: "spinner", name: "Spinner", tagline: "회전 로딩 인디케이터." },
      { slug: "skeleton", name: "Skeleton", tagline: "콘텐츠 placeholder." },
    ],
  },
  {
    category: "Navigation",
    items: [{ slug: "tabs", name: "Tabs", tagline: "언더라인 인디케이터 탭." }],
  },
  {
    category: "AI-Native",
    items: [
      { slug: "agent-avatar", name: "AgentAvatar", tagline: "그라디언트 보더 + 상태 표시 아바타." },
      {
        slug: "message-bubble",
        name: "MessageBubble",
        tagline: "user/assistant/system 채팅 말풍선.",
      },
      { slug: "streaming-text", name: "StreamingText", tagline: "토큰 단위 점진 출력 + 커서." },
      { slug: "thinking-indicator", name: "ThinkingIndicator", tagline: "그라디언트 점 3개 펄스." },
      { slug: "prompt-input", name: "PromptInput", tagline: "멀티라인 입력 + ⌘+Enter + 첨부." },
      { slug: "model-selector", name: "ModelSelector", tagline: "모델 선택 + tier 배지." },
      { slug: "token-usage-bar", name: "TokenUsageBar", tagline: "컨텍스트 사용량 시각화." },
      { slug: "tool-call-block", name: "ToolCallBlock", tagline: "도구 호출 표시 + JSON I/O." },
      { slug: "citation-link", name: "CitationLink", tagline: "RAG 출처 위첨자 링크." },
    ],
  },
];

export const ALL_COMPONENTS: ComponentMeta[] = COMPONENT_GROUPS.flatMap((g) => g.items);
