import { useId } from "react";

interface NxtGenLogoProps {
  size?: number;
  className?: string;
  /** title for screen readers */
  title?: string;
}

/**
 * NxtGen 시그니처 로고 — 인라인 SVG.
 * 그라디언트: blue → purple → magenta (브랜드 시그니처).
 * useId로 gradient id 충돌 방지 (한 페이지에 여러 로고 OK).
 */
export function NxtGenLogo({ size = 28, className, title }: NxtGenLogoProps) {
  const uid = useId();
  const orbitId = `nxtgen-orbit-${uid}`;
  const sparkId = `nxtgen-spark-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={orbitId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A6BFF" />
          <stop offset="0.55" stopColor="#A855F7" />
          <stop offset="1" stopColor="#E94BD0" />
        </linearGradient>
        <linearGradient id={sparkId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A6BFF" />
          <stop offset="0.55" stopColor="#A855F7" />
          <stop offset="1" stopColor="#E94BD0" />
        </linearGradient>
      </defs>

      {/* Orbital arcs */}
      <path
        d="M 100 22 A 78 78 0 0 0 22 100"
        stroke={`url(#${orbitId})`}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 100 178 A 78 78 0 0 0 178 100"
        stroke={`url(#${orbitId})`}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />

      {/* Planets */}
      <circle cx="158" cy="56" r="13" fill="#E94BD0" />
      <circle cx="42" cy="144" r="11" fill="#2A6BFF" />

      {/* Center sparkle */}
      <path
        d="M100 50 C 102 78, 122 98, 150 100 C 122 102, 102 122, 100 150 C 98 122, 78 102, 50 100 C 78 98, 98 78, 100 50 Z"
        fill={`url(#${sparkId})`}
      />
    </svg>
  );
}
