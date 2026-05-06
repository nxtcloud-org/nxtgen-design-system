"use client";

import { Check, ChevronDown, ChevronUp, Copy } from "@nxtgen-org/icons";
import { IconButton } from "@nxtgen-org/react";
import { Highlight, themes } from "prism-react-renderer";
import { useMemo, useState } from "react";

const COLLAPSED_LINES = 10;

export function CodeBlock({
  code,
  language = "tsx",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const totalLines = useMemo(() => code.split("\n").length, [code]);
  const isLong = totalLines > COLLAPSED_LINES;
  const displayCode = useMemo(() => {
    if (!isLong || expanded) return code;
    return code.split("\n").slice(0, COLLAPSED_LINES).join("\n");
  }, [code, isLong, expanded]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative rounded-md border border-default bg-[#011627] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 text-xs">
        <span className="font-mono uppercase tracking-wider text-white/50">{language}</span>
        <IconButton
          aria-label="코드 복사"
          icon={
            copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} className="text-white/60" />
            )
          }
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          className="-mr-1 hover:bg-white/10"
        />
      </div>

      <div className={`relative ${!expanded && isLong ? "max-h-[256px] overflow-hidden" : ""}`}>
        <Highlight code={displayCode} language={language} theme={themes.nightOwl}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-sm leading-6 font-mono py-4 overflow-x-auto`}
              style={{ ...style, background: "transparent" }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: prism tokens are stable, no reordering
                  <div key={i} {...lineProps} className={`${lineProps.className ?? ""} flex`}>
                    <span
                      aria-hidden
                      className="select-none text-right pr-4 pl-4 text-white/30 tabular-nums w-12 shrink-0"
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 pr-4">
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({ token });
                        // biome-ignore lint/suspicious/noArrayIndexKey: prism tokens are stable, no reordering
                        return <span key={key} {...tokenProps} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>

        {/* fade overlay (collapsed) */}
        {isLong && !expanded && (
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-[#011627] to-transparent"
          />
        )}
      </div>

      {/* Expand/Collapse */}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 border-t border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-fast"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> 접기
            </>
          ) : (
            <>
              <ChevronDown size={14} /> 더 보기 ({totalLines - COLLAPSED_LINES}줄 더)
            </>
          )}
        </button>
      )}
    </div>
  );
}
