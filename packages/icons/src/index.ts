/**
 * NxtGen Icons — Lucide 전체 re-export + 자체 아이콘.
 *
 * 사용:
 *   import { Search, Bot } from "@nxtgen-org/icons";
 *   import { Agent, Prompt } from "@nxtgen-org/icons/custom";
 *
 * 사이즈 토큰 (DESIGN.md):
 *   xs: 12 / sm: 16 / md: 20 / lg: 24 / xl: 32
 *
 * 컬러: currentColor — 부모 text 토큰으로 제어
 */
export * from "lucide-react";
export type { LucideIcon, LucideProps } from "lucide-react";

export const ICON_SIZE = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof ICON_SIZE;
