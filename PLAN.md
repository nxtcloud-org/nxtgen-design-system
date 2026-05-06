# NxtGen Design System — 구축 플랜

> 리서치 기반: Wanted Montage, Toss TDS, 카카오스타일 ZDS, 당근 SEED, shadcn/ui, Vercel Geist, W3C DTCG 표준

---

## 1. 핵심 원칙

| 원칙 | 출처 / 근거 |
|---|---|
| **토큰은 3계층** (Primitive → Semantic → Component) | W3C DTCG, Martin Fowler "Design Token-Based UI Architecture" |
| **컴포넌트는 하이브리드 API** (Flat + Compound, 내부는 동일 primitive) | Toss TDS — "통제보다 유연한 확장" |
| **테마는 CSS Variable 기반** (`data-theme` 속성 스왑) | 카카오스타일 ZDS — ThemeProvider 제거로 리렌더링/FOUC 해결 |
| **Headless 분리** (동작 ↔ 스타일) | shadcn/ui + Radix, SEED `react-headless` 패턴 |
| **모노레포 + 패키지 분리** (tokens / icons / css / react) | Turborepo, SEED 구조 |
| **디자인시스템도 제품** — 사용자(개발자)의 문제 해결이 우선 | Toss TDS 철학 |

---

## 2. 모노레포 구조 (Turborepo + Bun)

```
nxtgen-design-system/
├── apps/
│   └── docs/                    # Storybook 또는 Ladle 기반 문서 사이트
├── packages/
│   ├── tokens/                  # W3C DTCG JSON → Style Dictionary로 빌드
│   │   ├── src/
│   │   │   ├── primitive/       # color.json, spacing.json, radius.json...
│   │   │   ├── semantic/        # light.json, dark.json (primitive 참조)
│   │   │   └── component/       # button.json, card.json (옵션)
│   │   └── dist/                # CSS vars / TS const / Tailwind preset 산출
│   ├── icons/                   # SVGR로 React 컴포넌트 자동 생성
│   ├── css/                     # 글로벌 reset + 테마 CSS (data-theme)
│   ├── react-headless/          # 동작/접근성만 담당, 스타일 0 (Radix wrapping)
│   └── react/                   # headless + 토큰 결합한 완성 컴포넌트
├── tooling/
│   ├── tsconfig/                # 공유 ts config
│   ├── biome-config/            # lint + format (ESLint/Prettier 대체)
│   └── tsup-config/             # 빌드 프리셋
├── biome.json
├── turbo.json
├── bunfig.toml
└── package.json
```

**선택 근거**
- **Bun + Biome**: SEED 채택. 설치/빌드/린트가 PNPM+ESLint 대비 5–10배 빠름.
- **Turborepo**: 원격 캐시, 증분 빌드, 패키지간 의존 그래프 자동 처리.
- **tsup**: ESM/CJS/d.ts 동시 산출, 설정 5줄.

---

## 3. 토큰 시스템 (3계층 + W3C DTCG)

### 3.1 계층

```
Primitive               Semantic                    Component (옵션)
─────────────           ─────────────               ─────────────
blue-500: #3B82F6  →    color.bg.brand        →    button.primary.bg
gray-900: #111     →    color.text.primary    →    card.title.color
spacing-4: 16px    →    spacing.md            →    button.padding-x
```

- **Primitive**: 절대로 컴포넌트에서 직접 참조 금지. 내부 reference only.
- **Semantic**: 컴포넌트가 사용하는 유일한 계층. `bg.brand`, `text.subtle`, `border.danger` 등 의미 기반.
- **Component**: 너무 일찍 만들지 말 것. 같은 패턴이 3번 반복되면 그때 승격.

### 3.2 다크모드/멀티 브랜드

```css
:root[data-theme='light'] { --color-bg-brand: #3B82F6; ... }
:root[data-theme='dark']  { --color-bg-brand: #60A5FA; ... }
:root[data-brand='sub']   { --color-bg-brand: #F59E0B; ... }
```

→ JS 리렌더링 0회. SSR/RSC 안전. (ZDS와 동일 전략)

### 3.3 파이프라인

```
Figma Variables (Tokens Studio)
     ↓ DTCG JSON export
packages/tokens/src/*.json
     ↓ Style Dictionary + sd-transforms
dist/
  ├── css/variables.css        # 웹용 CSS vars
  ├── ts/tokens.ts             # 타입 안전 const
  ├── tailwind/preset.js       # Tailwind theme 매핑
  └── json/dtcg.json           # 다른 플랫폼용
```

W3C DTCG는 2025-10에 v1.0 stable이 되어 Figma 네이티브 지원이 들어옴. 지금 시작하면 표준 그대로 갈 수 있음.

---

## 4. 컴포넌트 분류 (Wanted Montage 차용 + 자체 조정)

| 카테고리 | 예시 컴포넌트 |
|---|---|
| **Actions** | Button, IconButton, Chip, FAB, Link |
| **Inputs** | TextField, Textarea, Select, Combobox, DatePicker, Checkbox, Radio, Switch, Slider, FileUpload |
| **Contents** | Card, Avatar, Badge, Tag, Table, List, Accordion, Tooltip, Divider, Code |
| **Feedback** | Alert, Toast, Snackbar, Dialog, Drawer, Popover, Banner |
| **Loading** | Spinner, Skeleton, Progress |
| **Navigation** | Tabs, Breadcrumb, Pagination, Stepper, Sidebar, Topbar, Menu |
| **Layout** | Stack, Grid, Container, Spacer, AspectRatio (Primitives) |

**Layout primitives는 별도 트랙**. Tailwind를 쓸 거면 굳이 만들 필요 없음. CSS-in-JS면 필수.

---

## 5. 기술 스택 결정 트리

> ⚠️ 이 부분은 프로젝트 컨텍스트 따라 결정해야 함. 두 가지 후보를 제시하고, **사용자 선택 필요**.

### 옵션 A — **Tailwind v4 + Radix + CVA** (shadcn/ui 스타일, 권장)
- ✅ 가장 빠른 개발 속도, 생태계 폭발적 성장
- ✅ Tailwind v4는 CSS-first 설정 → 토큰 → CSS var → Tailwind theme 직결
- ✅ shadcn 레지스트리 패턴으로 팀이 컴포넌트 fork & 수정 가능
- ❌ 클래스 길이로 가독성 호불호
- 적합: 팀이 신속한 기능 출시 우선, 제품이 다수

### 옵션 B — **Vanilla Extract + Radix** (당근 SEED, 카카오스타일 ZDS 채택)
- ✅ 진짜 zero-runtime, RSC 100% 호환, 718B GZIP
- ✅ `createThemeContract`로 타입 안전한 토큰
- ✅ 다크모드 + 멀티 브랜드 시 가장 깔끔
- ❌ Tailwind보다 학습 곡선 가파름, 생태계 작음
- 적합: 한국형 슈퍼앱, 멀티 브랜드, 장기 유지보수 우선

**공통 채택**:
- **Radix Primitives** (또는 Base UI) — 동작/접근성 (a11y는 직접 만들지 말 것)
- **CVA** (class-variance-authority) — variant 관리 (옵션 A 시)
- **tsup** — 빌드
- **Storybook 8** — 문서 (또는 Ladle — 더 빠르지만 기능 적음)

---

## 6. 컴포넌트 API 설계 규칙 (Toss 패턴)

```tsx
// Flat — 단순 케이스 90%
<Button variant="primary" size="md" leftIcon={<Plus />}>저장</Button>

// Compound — 커스터마이징 필요 케이스 10%
<Card>
  <Card.Header>
    <Card.Title>제목</Card.Title>
    <Card.Actions><IconButton ... /></Card.Actions>
  </Card.Header>
  <Card.Body>...</Card.Body>
</Card>
```

**규칙**
1. 둘 다 제공하되 **내부 구현은 동일한 primitive 재사용** (코드 중복 금지).
2. `asChild` 패턴 (Radix Slot) 으로 래핑 자유도 확보.
3. `forwardRef` 필수, `className` props 항상 머지 가능.
4. variant는 CVA로 정의 → 타입 자동 추론.

---

## 7. 단계별 로드맵

### Phase 0 — 기초 (1주)
- [ ] 모노레포 초기화 (Bun + Turbo + Biome)
- [ ] `tsconfig`, `tsup`, Storybook 셋업
- [ ] CI: Biome check, type check, build, test

### Phase 1 — 토큰 (1–2주)
- [ ] Figma Variables → Tokens Studio → DTCG JSON 파이프라인
- [ ] Style Dictionary 빌드 → CSS vars / TS const / Tailwind preset
- [ ] Light/Dark 테마 런타임 스위치 데모

### Phase 2 — Foundation (1주)
- [ ] Typography 스케일 + 폰트 로딩
- [ ] Color 팔레트 + 시맨틱 매핑
- [ ] Iconography (SVGR + 트리쉐이킹)
- [ ] Layout primitives (Stack/Grid)

### Phase 3 — Core Components (3–4주)
> 우선순위: 사용량 많은 것부터
1. Button, IconButton, Link
2. TextField, Select, Checkbox, Radio, Switch
3. Card, Badge, Tag, Avatar, Divider
4. Alert, Toast, Tooltip, Dialog
5. Tabs, Menu, Pagination
6. Spinner, Skeleton, Progress

각 컴포넌트마다:
- `react-headless` 동작 → `react` 스타일 → Storybook 스토리 → a11y 테스트 (axe) → 시각 회귀(Chromatic 옵션)

### Phase 4 — Advanced (2–3주)
- DatePicker, Combobox, Table, FileUpload, Drawer, Stepper

### Phase 5 — DX & 배포 (1주)
- Changesets로 패키지 버전 관리 + 릴리즈
- Docs 사이트 배포 (Vercel)
- Figma ↔ Code 동기화 자동화 (CI)

---

## 8. 추천 결정 사항 (확정 필요)

| 항목 | 추천 | 대안 |
|---|---|---|
| 패키지 매니저 | **Bun** | pnpm |
| 모노레포 | **Turborepo** | Nx |
| 린트/포맷 | **Biome** | ESLint + Prettier |
| 빌드 | **tsup** | Vite library mode |
| 스타일링 | **Tailwind v4 + CVA** (옵션 A) | Vanilla Extract (옵션 B) |
| 동작/a11y | **Radix Primitives** | Base UI, Ark UI |
| 문서 | **Storybook 8** | Ladle |
| 토큰 변환 | **Style Dictionary + sd-transforms** | Terrazzo |
| Figma 동기화 | **Tokens Studio plugin (DTCG)** | Figma 네이티브 export |
| 버전 관리 | **Changesets** | semantic-release |

---

## 9. 다음 액션 (사용자 결정 대기)

1. **스타일링 옵션 A vs B** 결정 — 팀 익숙도와 제품 특성으로 판단.
2. **타겟 플랫폼**: 웹만? React Native도? (RN 포함이면 Tamagui나 별도 설계 필요)
3. **공개 여부**: 사내용? OSS? (OSS면 라이선스, 기여 가이드 필요)
4. **Figma 디자인 파일 존재 여부** — 이미 있으면 토큰 추출부터, 없으면 코드 토큰 정의 후 Figma로 역동기화.

확정되면 Phase 0부터 바로 셋업 진행 가능.

---

## 부록 — 참고 자료

- Wanted Montage: https://montage.wanted.co.kr/docs/components
- Toss "디자인 시스템 다시 생각해보기": https://toss.tech/article/rethinking-design-system
- 카카오스타일 ZDS 재구축기: https://devblog.kakaostyle.com/ko/2024-12-13-1-rebuilding-frontend-design-system/
- 당근 SEED: https://seed-design.io / https://github.com/daangn/seed-design
- Vercel Geist: https://vercel.com/geist/introduction
- shadcn/ui: https://ui.shadcn.com
- W3C DTCG: https://www.w3.org/community/design-tokens/
- Martin Fowler — Design Token-Based UI Architecture: https://martinfowler.com/articles/design-token-based-ui-architecture.html
- Turborepo Design System 예제: https://github.com/vercel/turborepo/tree/main/examples/design-system
