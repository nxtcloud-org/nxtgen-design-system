"use client";

import { ExternalLink } from "@nxtgen-org/icons";
import { type ReactNode, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Tooltip } from "../Tooltip/Tooltip";

export interface CitationLinkProps {
  /** 출처 번호 (예: 1, 2, 3...) */
  index: number;
  /** 출처 제목 (Tooltip header) */
  title: string;
  /** 출처 미리보기 (Tooltip body — 발췌문 등) */
  excerpt?: ReactNode;
  /** 클릭 시 이동할 URL */
  href?: string;
  /** 출처 도메인/sub-label */
  source?: string;
  className?: string;
}

export const CitationLink = forwardRef<HTMLAnchorElement, CitationLinkProps>(
  ({ index, title, excerpt, href, source, className }, ref) => {
    const content = (
      <div className="max-w-xs space-y-1">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <span className="inline-flex items-center justify-center size-5 rounded-sm bg-gradient-brand text-on-brand text-[10px]">
            {index}
          </span>
          {title}
        </div>
        {source && <div className="text-xs opacity-70">{source}</div>}
        {excerpt && <div className="text-xs opacity-90 leading-relaxed">{excerpt}</div>}
        {href && (
          <div className="flex items-center gap-1 text-xs opacity-70 pt-1">
            <ExternalLink size={10} /> 클릭하여 출처 열기
          </div>
        )}
      </div>
    );

    return (
      <Tooltip content={content} side="top">
        <a
          ref={ref}
          href={href ?? "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          aria-label={`출처 ${index}: ${title}`}
          className={cn(
            "inline-flex items-center justify-center align-super",
            "size-[1.1em] mx-0.5 rounded-sm",
            "bg-brand-subtle text-text-brand text-[0.65em] font-semibold",
            "no-underline hover:bg-brand hover:text-on-brand",
            "transition-colors duration-fast ease-standard",
            "focus-visible:outline-none focus-visible:shadow-focus",
            className,
          )}
        >
          {index}
        </a>
      </Tooltip>
    );
  },
);
CitationLink.displayName = "CitationLink";
