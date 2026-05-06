"use client";

import { ArrowUp, Paperclip, Square } from "@nxtgen-org/icons";
import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";
import { IconButton } from "../IconButton/IconButton";

export interface PromptInputProps {
  /** controlled value */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  /** 스트리밍 중이면 stop 버튼 표시 */
  isStreaming?: boolean;
  onStop?: () => void;
  /** 파일 첨부 버튼 표시 */
  enableAttach?: boolean;
  onAttach?: (files: FileList) => void;
  placeholder?: string;
  disabled?: boolean;
  maxRows?: number;
  /** 좌측 슬롯 (예: ModelSelector) */
  leftSlot?: ReactNode;
  className?: string;
}

export const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onSubmit,
      isStreaming,
      onStop,
      enableAttach,
      onAttach,
      placeholder = "메시지를 입력하세요. ⌘+Enter로 전송.",
      disabled,
      maxRows = 8,
      leftSlot,
      className,
    },
    ref,
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const value = controlledValue ?? internal;
    const taRef = useRef<HTMLTextAreaElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    // auto-resize
    useEffect(() => {
      const el = taRef.current;
      if (!el) return;
      el.style.height = "0px";
      const lineHeight = Number.parseInt(getComputedStyle(el).lineHeight || "20", 10);
      const max = lineHeight * maxRows;
      el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    }, [value, maxRows]);

    const setRef = (el: HTMLTextAreaElement | null) => {
      taRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      if (controlledValue === undefined) setInternal(v);
      onChange?.(v);
    };

    const submit = () => {
      const trimmed = value.trim();
      if (!trimmed || disabled || isStreaming) return;
      onSubmit?.(trimmed);
      if (controlledValue === undefined) setInternal("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // ⌘+Enter or Ctrl+Enter
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        submit();
      }
    };

    const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
      submit();
    };

    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onAttach?.(e.target.files);
        e.target.value = "";
      }
    };

    return (
      <form
        onSubmit={handleFormSubmit}
        className={cn(
          "flex flex-col gap-2 p-3",
          "bg-surface border border-default rounded-xl",
          "focus-within:border-focus focus-within:shadow-focus",
          "transition-colors duration-fast ease-standard",
          disabled && "opacity-60 pointer-events-none",
          className,
        )}
      >
        <textarea
          ref={setRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full resize-none bg-transparent outline-none",
            "text-sm leading-6 placeholder:text-text-tertiary",
            "min-h-[1.5rem]",
          )}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {enableAttach && (
              <>
                <input ref={fileRef} type="file" multiple hidden onChange={handleFiles} />
                <IconButton
                  type="button"
                  aria-label="파일 첨부"
                  size="sm"
                  variant="ghost"
                  icon={<Paperclip size={16} />}
                  onClick={() => fileRef.current?.click()}
                />
              </>
            )}
            {leftSlot}
          </div>
          {isStreaming ? (
            <IconButton
              type="button"
              aria-label="중단"
              size="sm"
              variant="secondary"
              icon={<Square size={14} className="fill-current" />}
              onClick={onStop}
            />
          ) : (
            <IconButton
              type="submit"
              aria-label="전송"
              size="sm"
              variant="primary"
              icon={<ArrowUp size={16} />}
              disabled={!value.trim() || disabled}
            />
          )}
        </div>
      </form>
    );
  },
);
PromptInput.displayName = "PromptInput";
