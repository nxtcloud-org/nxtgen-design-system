import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 머지 + 충돌 해결.
 * 모든 컴포넌트의 className 병합에 사용.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
