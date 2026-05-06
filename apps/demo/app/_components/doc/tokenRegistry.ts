/**
 * 토큰 페이지 메타데이터.
 * 좌측 TokenSideNav + /tokens 카탈로그가 참조.
 */

export interface TokenMeta {
  slug: string;
  name: string;
  tagline: string;
}

export const TOKEN_PAGES: TokenMeta[] = [
  { slug: "color",      name: "Color",      tagline: "Primitive scales 50–900 + signature gradient." },
  { slug: "semantic",   name: "Semantic",   tagline: "Light/Dark 자동 스왑 시맨틱 매핑." },
  { slug: "typography", name: "Typography", tagline: "Pretendard + Geist · 14단계 스케일." },
  { slug: "spacing",    name: "Spacing",    tagline: "4px base · 16단계." },
  { slug: "radius",     name: "Radius",     tagline: "8단계 borderRadius." },
  { slug: "shadow",     name: "Shadow",     tagline: "Elevation + focus + glow." },
  { slug: "motion",     name: "Motion",     tagline: "Duration + easing." },
  { slug: "z-index",    name: "Z-Index",    tagline: "레이어 우선순위." },
  { slug: "breakpoint", name: "Breakpoint", tagline: "Mobile-first 5단계." },
];
