"use client";

import { type HTMLAttributes, useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export interface StreamingTextProps extends HTMLAttributes<HTMLSpanElement> {
  /** 풀 텍스트. 토큰 단위로 점진 노출. */
  text: string;
  /** 토큰당 ms (기본 30) */
  speed?: number;
  /** 완료 콜백 */
  onComplete?: () => void;
  /** 커서 표시 (기본 true). false면 종료 후 사라지지 않음. */
  cursor?: boolean;
  /** 이미 완료된 상태로 시작 (replay 방지) */
  done?: boolean;
}

export function StreamingText({
  text,
  speed = 30,
  onComplete,
  cursor = true,
  done = false,
  className,
  ...props
}: StreamingTextProps) {
  const [shown, setShown] = useState(done ? text : "");
  const [finished, setFinished] = useState(done);

  useEffect(() => {
    if (done) {
      setShown(text);
      setFinished(true);
      return;
    }
    setShown("");
    setFinished(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= text.length) {
        setShown(text);
        setFinished(true);
        onComplete?.();
        clearInterval(id);
      } else {
        setShown(text.slice(0, i));
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, done, onComplete]);

  return (
    <span className={className} {...props}>
      {shown}
      {cursor && !finished && (
        <span
          aria-hidden
          className={cn(
            "inline-block w-[0.45em] h-[1em] align-text-bottom ml-0.5",
            "bg-text-primary animate-pulse",
          )}
        />
      )}
    </span>
  );
}
