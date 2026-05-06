"use client";

import { ChevronDown, Gauge, Sparkles, Zap } from "@nxtgen-org/icons";
import { Fragment, type ReactNode } from "react";
import { Badge } from "../Badge/Badge";
import { Select } from "../Select/Select";

export interface ModelOption {
  value: string;
  label: string;
  /** 그룹 라벨 (예: "Anthropic", "OpenAI") */
  group?: string;
  /** 모델 티어 — 자동 배지 노출 */
  tier?: "frontier" | "balanced" | "fast";
  description?: string;
}

const TIER_BADGE: Record<
  NonNullable<ModelOption["tier"]>,
  { label: string; icon: ReactNode; variant: "gradient" | "brand" | "neutral" }
> = {
  frontier: { label: "Frontier", icon: <Sparkles size={10} />, variant: "gradient" },
  balanced: { label: "Balanced", icon: <Gauge size={10} />, variant: "brand" },
  fast: { label: "Fast", icon: <Zap size={10} />, variant: "neutral" },
};

export interface ModelSelectorProps {
  models: ModelOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ModelSelector({
  models,
  value,
  defaultValue,
  onChange,
  size = "sm",
  className,
}: ModelSelectorProps) {
  const groups = models.reduce<Record<string, ModelOption[]>>((acc, m) => {
    const key = m.group ?? "_";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});
  const groupKeys = Object.keys(groups);

  return (
    <Select value={value} defaultValue={defaultValue} onValueChange={onChange}>
      <Select.Trigger size={size} className={className}>
        <div className="flex items-center gap-2">
          <ChevronDown size={12} className="text-text-tertiary" />
          <Select.Value placeholder="모델 선택" />
        </div>
      </Select.Trigger>
      <Select.Content>
        {groupKeys.map((g, gi) => (
          <Fragment key={g}>
            <Select.Group>
              {g !== "_" && <Select.Label>{g}</Select.Label>}
              {groups[g]?.map((m) => (
                <Select.Item key={m.value} value={m.value}>
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span>{m.label}</span>
                      {m.description && (
                        <span className="text-xs text-text-tertiary">{m.description}</span>
                      )}
                    </div>
                    {m.tier && (
                      <Badge size="sm" variant={TIER_BADGE[m.tier].variant}>
                        {TIER_BADGE[m.tier].icon}
                        {TIER_BADGE[m.tier].label}
                      </Badge>
                    )}
                  </div>
                </Select.Item>
              ))}
            </Select.Group>
            {gi < groupKeys.length - 1 && <Select.Separator />}
          </Fragment>
        ))}
      </Select.Content>
    </Select>
  );
}
