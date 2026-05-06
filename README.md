# NxtGen Design System

> Design system for AI applications. Internal.

**Stack**: Bun · Turborepo · Biome · TypeScript · Tailwind v4 · Radix · CVA · Storybook 8

## Packages

| Package | 역할 |
|---|---|
| `@nxtgen-org/tokens` | Design tokens (DTCG → CSS vars / TS / Tailwind preset) |
| `@nxtgen-org/css` | Global reset, fonts, theme CSS |
| `@nxtgen-org/icons` | Lucide + 자체 아이콘 |
| `@nxtgen-org/react-headless` | 동작/접근성 (Radix wrapping) |
| `@nxtgen-org/react` | 완성된 React 컴포넌트 |

## Apps

| App | 역할 |
|---|---|
| `docs` | Storybook 컴포넌트 문서 |

## Scripts

```bash
bun install          # 설치
bun dev              # 모든 dev 서버 (storybook 등)
bun run build        # 모든 패키지 빌드
bun run type-check   # 타입 체크
bun run lint         # Biome 검사
bun run lint:fix     # Biome 자동 수정
bun run tokens:build # 토큰만 재빌드
bun run storybook    # Storybook 단독 실행
```

## Docs
- [`PLAN.md`](./PLAN.md) — 구축 플랜 / 의사결정 근거
- [`DESIGN.md`](./DESIGN.md) — 디자인 토큰 단일 진실 문서
