# NxtGen Design System — Foundation

> 단일 진실 문서. 코드 토큰(`packages/tokens`)은 여기서 생성됨.

---

## 0. Brand

**Name**: NxtGen
**Voice**: Minimal, calm, technical, intelligent. Apple-grade restraint.
**Domain**: B2B SaaS for AI applications (chatbots, agents, admin dashboards).

### Logo
- 위치: `assets/logo/nxtgen-logo.svg`
- 변형: symbol-only / wordmark / lockup / mono(black|white) — 추후 추가 제작 필요
- 최소 크기: 24px (심볼), 80px (워드마크)
- Clear space: 심볼 높이의 25%

---

## 1. Color

### 1.1 Brand
| Token | HEX | RGB | 용도 |
|---|---|---|---|
| `brand.blue` | `#2560FF` | 37, 96, 255 | Primary — 액션, 링크, 포커스 |
| `brand.magenta` | `#E642CA` | 230, 66, 202 | Accent — AI 시그니처, 강조 |
| `brand.purple` | `#A855F7` | 168, 85, 247 | Gradient mid — 그라디언트 보간용 |

### 1.2 Signature Gradient
```
linear-gradient(135deg, #2560FF 0%, #A855F7 55%, #E642CA 100%)
```
사용처: 로고, AI 응답 표시, Hero 그라디언트 텍스트, 프리미엄 CTA, 에이전트 아바타 링.

### 1.3 Primitive Scale (50–900, 50씩 톤 보간)

#### Blue (Primary)
```
50: #EEF3FF   100: #D9E4FF   200: #B3C9FF   300: #8DAEFF
400: #5887FF  500: #2560FF   600: #1E4DCC   700: #173A99
800: #0F2666  900: #081333
```

#### Magenta (Accent)
```
50: #FDEEFA   100: #FBDDF5   200: #F6BAEB   300: #F198E0
400: #EC75D5  500: #E642CA   600: #B835A2   700: #8A2879
800: #5C1A51  900: #2E0D28
```

#### Neutral (Gray) — 차가운 블루 톤 베이스
```
0:   #FFFFFF
50:  #FAFBFC
100: #F4F5F7
200: #E8EAEE
300: #D5D9E0
400: #A8AFBC
500: #767E8C
600: #525964
700: #353A42
800: #1F2329
900: #0E1014
1000:#000000
```

#### Semantic Hues
- `success`: `#10B981` (green-500 base)
- `warning`: `#F59E0B` (amber-500 base)
- `danger`:  `#EF4444` (red-500 base)
- `info`:    `#3B82F6` (blue-500 base)

각각 50–900 스케일 자동 생성.

### 1.4 Semantic Tokens (컴포넌트는 이것만 참조)

#### Surface (배경)
| Token | Light | Dark |
|---|---|---|
| `bg.canvas` | `gray.0` | `gray.1000` |
| `bg.surface` | `gray.0` | `gray.900` |
| `bg.subtle` | `gray.50` | `gray.800` |
| `bg.muted` | `gray.100` | `gray.700` |
| `bg.inverse` | `gray.900` | `gray.0` |
| `bg.brand` | `blue.500` | `blue.500` |
| `bg.brand-hover` | `blue.600` | `blue.400` |
| `bg.accent` | `magenta.500` | `magenta.500` |

#### Text
| Token | Light | Dark |
|---|---|---|
| `text.primary` | `gray.900` | `gray.50` |
| `text.secondary` | `gray.700` | `gray.300` |
| `text.tertiary` | `gray.500` | `gray.400` |
| `text.disabled` | `gray.400` | `gray.600` |
| `text.inverse` | `gray.0` | `gray.900` |
| `text.brand` | `blue.500` | `blue.400` |
| `text.danger` | `danger.600` | `danger.400` |
| `text.on-brand` | `gray.0` | `gray.0` |

#### Border
| Token | Light | Dark |
|---|---|---|
| `border.default` | `gray.200` | `gray.700` |
| `border.subtle` | `gray.100` | `gray.800` |
| `border.strong` | `gray.300` | `gray.600` |
| `border.focus` | `blue.500` | `blue.400` |
| `border.danger` | `danger.500` | `danger.400` |

---

## 2. Typography

### 2.1 Font Families
```
font.sans:  "Pretendard Variable", "Geist", -apple-system, BlinkMacSystemFont, ...
font.mono:  "Geist Mono", "SF Mono", "JetBrains Mono", monospace
font.brand: "Geist", "Pretendard Variable", ...   /* 영문 우선 노출 */
```

- **Pretendard Variable**: KR 본문 + UI 표준
- **Geist Sans**: EN 헤딩, 브랜드 표현, 숫자 강조 (Vercel 제작, SF 계열 미니멀)
- **Geist Mono**: 코드, 토큰값, 모노스페이스 데이터

### 2.2 Type Scale (rem, 1rem = 16px)

| Token | Size | Line-height | Weight | 용도 |
|---|---|---|---|---|
| `display.2xl` | 4.5rem (72) | 1.05 | 700 | 마케팅 hero |
| `display.xl` | 3.75rem (60) | 1.05 | 700 | hero |
| `display.lg` | 3rem (48) | 1.1 | 600 | 페이지 진입 |
| `heading.xl` | 2.25rem (36) | 1.2 | 600 | h1 |
| `heading.lg` | 1.875rem (30) | 1.25 | 600 | h2 |
| `heading.md` | 1.5rem (24) | 1.3 | 600 | h3 |
| `heading.sm` | 1.25rem (20) | 1.35 | 600 | h4 |
| `heading.xs` | 1.125rem (18) | 1.4 | 600 | h5 |
| `body.lg` | 1.125rem (18) | 1.55 | 400 | 본문 강조 |
| `body.md` | 1rem (16) | 1.55 | 400 | 본문 기본 |
| `body.sm` | 0.875rem (14) | 1.5 | 400 | 보조 본문, UI 기본 |
| `body.xs` | 0.75rem (12) | 1.45 | 400 | 캡션, 메타 |
| `code.md` | 0.875rem (14) | 1.55 | 400 | mono |
| `code.sm` | 0.75rem (12) | 1.5 | 400 | mono |

### 2.3 Letter Spacing
- Display: `-0.02em` (타이트)
- Heading: `-0.01em`
- Body: `0`
- Caption (`body.xs`): `0.01em`

---

## 3. Spacing (4px base)

```
0   → 0
0.5 → 2px
1   → 4px
1.5 → 6px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
20  → 80px
24  → 96px
32  → 128px
```

**Semantic 별칭** (자주 쓰는 패턴):
- `gap.tight` = 4px
- `gap.snug` = 8px
- `gap.regular` = 12px
- `gap.relaxed` = 16px
- `gap.loose` = 24px

---

## 4. Radius

```
none: 0
xs:   2px    /* 인라인 코드, 작은 칩 */
sm:   4px    /* 인풋, 작은 버튼 */
md:   8px    /* 기본 버튼, 카드 */
lg:   12px   /* 큰 카드, 모달 */
xl:   16px   /* hero 카드, sheet */
2xl:  24px
full: 9999px /* pill, 아바타 */
```

Apple-grade restraint = 라운드는 **8/12 위주**, 과한 라운드 지양.

---

## 5. Shadow / Elevation

```
xs:  0 1px 2px rgba(14,16,20,0.06)
sm:  0 2px 4px rgba(14,16,20,0.06), 0 1px 2px rgba(14,16,20,0.04)
md:  0 4px 8px rgba(14,16,20,0.08), 0 2px 4px rgba(14,16,20,0.04)
lg:  0 12px 24px rgba(14,16,20,0.10), 0 4px 8px rgba(14,16,20,0.06)
xl:  0 24px 48px rgba(14,16,20,0.14), 0 8px 16px rgba(14,16,20,0.08)
focus: 0 0 0 3px rgba(37,96,255,0.30)
glow.brand: 0 0 32px rgba(37,96,255,0.35)
glow.accent: 0 0 32px rgba(230,66,202,0.35)
```

다크모드는 `rgba(0,0,0,*)` 비중 ↑ + `border` 보강으로 깊이 표현.

---

## 6. Motion

### 6.1 Duration
```
instant: 0ms
fast:    120ms     /* hover, 색 전환 */
base:    200ms     /* 기본 trans */
slow:    320ms     /* 모달, drawer */
slower:  480ms     /* 페이지 전환 */
```

### 6.2 Easing (Apple-style)
```
ease.standard: cubic-bezier(0.4, 0.0, 0.2, 1)   /* 기본 */
ease.emphasized: cubic-bezier(0.2, 0.0, 0, 1)   /* 진입 강조 */
ease.entrance: cubic-bezier(0.0, 0.0, 0.2, 1)   /* 들어옴 */
ease.exit: cubic-bezier(0.4, 0.0, 1, 1)         /* 나감 */
spring.gentle: spring(stiffness 180, damping 22)
spring.snappy: spring(stiffness 260, damping 24)
```

### 6.3 원칙
- 100ms 미만은 즉시 인지, 200ms는 자연, 400ms 초과는 답답함 → 대부분 `fast`/`base` 사용.
- 진입은 `entrance`, 퇴장은 `exit`. 둘 다 쓰는 토글은 `standard`.
- AI 응답/에이전트 액션 = `spring.gentle`로 살아있음 표현.

---

## 7. Iconography

- **베이스**: [Lucide](https://lucide.dev) (1500+, MIT, 24px 그리드, stroke 1.5)
- **자체 추가 아이콘**: NxtGen 도메인 전용 (agent, model, prompt, vector, embedding 등) → 동일 스펙(24px, stroke 1.5)으로 제작
- **사이즈 토큰**: `xs:12 / sm:16 / md:20 / lg:24 / xl:32`
- **컬러**: `currentColor` 강제, 외부에서 `text.*` 토큰으로 제어

---

## 8. Illustration

### 8.1 스타일 가이드라인
- **추상 + 그라디언트** (브랜드 시그니처 그라디언트 활용)
- **노이즈 + 블러 글로우** (AI 제품 트렌드)
- **3D 아이소메트릭은 지양** — 너무 무거움. Apple-grade restraint.
- **인물 일러스트 지양** — B2B 톤과 안 맞음
- **추천 패턴**: 추상 형상(구체, 토러스, 곡선), 그리드 라인, 글로우 오브, 데이터 시각화 메타포

### 8.2 제작 방식
1. **자체 제작**: Figma + 가이드라인 따라
2. **AI 생성**: Midjourney/Recraft → 가이드라인 prompt template 정의 (Phase 4)
3. **외주**: 큰 마케팅용 그래픽

`packages/illustrations`에 SVG/PNG로 보관, 시맨틱 이름 (`empty-state-search`, `error-network`, `onboarding-step-1` 등).

---

## 9. Dark Mode

### 9.1 전략
- `<html data-theme="light|dark">` 속성 토글
- 모든 시맨틱 토큰이 light/dark 값 동시 보유 (CSS var로 자동 스왑)
- 시스템 prefers-color-scheme 자동 감지 + 사용자 수동 토글
- **기본값 = light**, 첫 방문 시 시스템 설정 따라감

### 9.2 다크모드 디자인 원칙
- 순수 검정(#000) 표면 사용 안 함 → `gray.1000` 또는 `gray.900` 사용
- 그림자 약화 + border 강화로 깊이 표현
- 브랜드 컬러는 한 단계 밝게 (blue.500 → blue.400)
- 그라디언트는 채도 낮춤 (눈부심 방지)

---

## 10. Z-Index

```
base:        0
dropdown:    1000
sticky:      1100
overlay:     1200    /* dim background */
modal:       1300
popover:     1400
toast:       1500
tooltip:     1600
```

---

## 11. Breakpoints (Mobile-first)

```
sm:  640px   /* 모바일 가로 / 큰 모바일 */
md:  768px   /* 태블릿 */
lg:  1024px  /* 작은 데스크톱 */
xl:  1280px  /* 데스크톱 기본 */
2xl: 1536px  /* 와이드 */
```

타겟: 모바일 웹 + 데스크톱 → 컴포넌트는 모바일 디폴트, `md:` 이상에서 데스크톱 변형.

---

## 12. AI-Native Design Patterns (제품 도메인 특화)

NxtGen은 AI 제품이므로 다음 컴포넌트/패턴이 추가로 정의됨 (Phase 4 이후):

- **MessageBubble** — 사용자/AI/시스템 구분, 그라디언트 링으로 AI 식별
- **StreamingText** — 토큰 단위 점진 출력 (cursor blink + fade)
- **AgentAvatar** — 그라디언트 보더 + 상태 표시(idle/thinking/speaking)
- **PromptInput** — 멀티라인 + 파일첨부 + 슬래시 커맨드 + send 단축키
- **ModelSelector** — 모델 전환 드롭다운, 모델별 배지 컬러
- **TokenUsageBar** — 컨텍스트 사용량 시각화
- **ThinkingIndicator** — 점 3개 이상의 추상 모션 (그라디언트 펄스)
- **ToolCallBlock** — 에이전트의 도구 호출 표시 (접힘/펼침, JSON 하이라이트)
- **CitationLink** — RAG 출처 표시 (호버 시 미리보기)

---

## 13. Open Decisions (확인 필요)

| # | 항목 | 디폴트 가정 |
|---|---|---|
| 1 | 폰트 라이센스 | Pretendard(OFL) + Geist(SIL OFL) — 둘 다 무료/사내 OK |
| 2 | 아이콘 베이스 Lucide vs Phosphor vs Heroicons | **Lucide** |
| 3 | 모션 라이브러리 Framer vs Motion One vs CSS only | **Framer Motion** |
| 4 | 사내 npm registry 있음? | 없으면 Verdaccio 또는 GitHub Packages |
| 5 | Storybook vs Ladle vs 자체 docs (Next.js) | **Storybook 8** |

이의 없으면 위 디폴트로 진행.
