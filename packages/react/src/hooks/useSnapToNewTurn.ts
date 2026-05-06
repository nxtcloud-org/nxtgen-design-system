"use client";

import { useEffect, useMemo, useRef } from "react";

interface SnapTarget {
  id: string | number;
  role: string;
}

interface UseSnapToNewTurnOptions {
  /** 어느 role을 새 turn의 anchor로 잡을지. 기본 "user". */
  triggerRole?: string;
  /** 첫 마운트 시 자동 snap 여부. 기본 false. */
  snapOnMount?: boolean;
  /** behavior. 기본 "smooth". */
  behavior?: "auto" | "smooth" | "instant";
  /** 컨테이너 상단에서 추가 offset (sticky 헤더 등). 기본 0. */
  offset?: number;
}

/**
 * ChatGPT/Claude.ai 스타일 snap-to-new-turn.
 *
 * 새 user 메시지가 추가되면 그 메시지가 스크롤 컨테이너 상단에 오도록 스크롤.
 * scrollIntoView가 nested overflow 컨테이너에서 불안정하므로 컨테이너 scrollTop을 직접 계산.
 *
 * **사용 예**
 * ```tsx
 * const { containerRef, setRef, spacerProps } = useSnapToNewTurn(messages);
 *
 * return (
 *   <div ref={containerRef} className="overflow-y-auto">
 *     {messages.map(m => (
 *       <div key={m.id} ref={setRef(m.id)}>
 *         <MessageBubble role={m.role}>{m.content}</MessageBubble>
 *       </div>
 *     ))}
 *     <div {...spacerProps} />
 *   </div>
 * );
 * ```
 */
export function useSnapToNewTurn<T extends SnapTarget>(
  messages: T[],
  options: UseSnapToNewTurnOptions = {},
) {
  const { triggerRole = "user", snapOnMount = false, behavior = "smooth", offset = 0 } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<Map<T["id"], HTMLElement>>(new Map());
  const prevTriggerIdRef = useRef<T["id"] | null>(null);
  const mountedRef = useRef(false);

  const setRef = (id: T["id"]) => (el: HTMLElement | null) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };

  const lastTriggerId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m && m.role === triggerRole) return m.id;
    }
    return null;
  }, [messages, triggerRole]);

  useEffect(() => {
    if (lastTriggerId == null) return;

    if (!mountedRef.current) {
      mountedRef.current = true;
      prevTriggerIdRef.current = lastTriggerId;
      if (!snapOnMount) return;
    } else if (prevTriggerIdRef.current === lastTriggerId) {
      return;
    }
    prevTriggerIdRef.current = lastTriggerId;

    const container = containerRef.current;
    const target = refs.current.get(lastTriggerId);
    if (!container || !target) return;

    // DOM 그려진 다음 frame에 layout 측정
    requestAnimationFrame(() => {
      // 한 번 더 기다려서 spacer까지 layout 완료
      requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const top = targetRect.top - containerRect.top + container.scrollTop - offset;
        container.scrollTo({ top, behavior });
      });
    });
  }, [lastTriggerId, snapOnMount, behavior, offset]);

  /**
   * 스크롤 컨테이너 하단 spacer.
   * minHeight 100%면 마지막 메시지 + 컨테이너 viewport 만큼의 빈 공간 → 어떤 길이든 상단 정렬 가능.
   */
  const spacerProps = {
    "aria-hidden": true,
    style: {
      minHeight: "100%",
      pointerEvents: "none" as const,
    },
  };

  return { containerRef, setRef, lastTriggerId, spacerProps };
}
