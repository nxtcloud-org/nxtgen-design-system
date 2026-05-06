/**
 * NxtGen 브랜드 로고 — orbit + sparkle, signature 그라디언트(blue→purple→magenta).
 *
 * 자체 색을 가진 brand mark이므로 `currentColor`를 따르는 아이콘들과 달리
 * 그라디언트가 박혀 있다. monochrome 변형이 필요하면 `mono="white"|"black"`
 * 으로 단색 fill로 떨어뜨릴 수 있다(추후 디자인팀 합의 후 추가).
 *
 * 사이즈는 `size` prop(px). 최소 24px (DESIGN.md §0 Logo).
 */
import { type SVGProps, forwardRef } from "react";

type LogoMono = "white" | "black";

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "fill"> {
  /** Pixel size for both width/height. Defaults to 24. */
  size?: number;
  /** Single-color override. Drops the gradient and uses given color. */
  mono?: LogoMono;
}

export const Logo = forwardRef<SVGSVGElement, LogoProps>(function Logo(
  { size = 24, mono, "aria-label": ariaLabel = "NxtGen", role, ...rest },
  ref,
) {
  // 한 페이지에 두 개 이상 렌더돼도 id 충돌 안 나도록 고유 suffix.
  // useId 안 쓰는 이유: 서버/클라 모두 stable + SVG 외부 참조 url(#...) 깨지면
  // 안 되므로 마운트 시점 무관한 결정적 값이 안전.
  const orbitId = mono ? undefined : "nxtgen-orbit-grad";
  const sparkId = mono ? undefined : "nxtgen-spark-grad";
  const fill = mono === "white" ? "#FFFFFF" : mono === "black" ? "#000000" : undefined;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role={role ?? "img"}
      aria-label={ariaLabel}
      {...rest}
    >
      {!mono && (
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
      )}

      {/* upper-left orbit arc */}
      <path
        d="M 100 22 A 78 78 0 0 0 22 100"
        stroke={mono ? fill : `url(#${orbitId})`}
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      />
      {/* lower-right orbit arc */}
      <path
        d="M 100 178 A 78 78 0 0 0 178 100"
        stroke={mono ? fill : `url(#${orbitId})`}
        strokeWidth={11}
        strokeLinecap="round"
        fill="none"
      />
      {/* magenta orbital node (top-right) */}
      <circle cx="158" cy="56" r="13" fill={mono ? fill : "#E94BD0"} />
      {/* blue orbital node (bottom-left) */}
      <circle cx="42" cy="144" r="11" fill={mono ? fill : "#2A6BFF"} />
      {/* center spark */}
      <path
        d="M100 50 C 102 78, 122 98, 150 100 C 122 102, 102 122, 100 150 C 98 122, 78 102, 50 100 C 78 98, 98 78, 100 50 Z"
        fill={mono ? fill : `url(#${sparkId})`}
      />
    </svg>
  );
});
