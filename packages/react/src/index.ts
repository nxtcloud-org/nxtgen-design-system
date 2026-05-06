/**
 * NxtGen React Components — public API.
 *
 * 카테고리(DESIGN.md):
 *   Actions / Inputs / Contents / Feedback / Loading / Navigation / Layout
 *   + AI-Native (MessageBubble, AgentAvatar, PromptInput, ...)
 *
 * 사용:
 *   import { Button } from "@nxtgen-org/react";
 *   import "@nxtgen-org/css";  // 한 번만, app entry에서.
 */

// utils
export { cn } from "./utils/cn";

// hooks
export { useSnapToNewTurn } from "./hooks/useSnapToNewTurn";

// Actions
export * from "./components/Button";
export * from "./components/IconButton";

// Inputs
export * from "./components/TextField";
export * from "./components/Switch";
export * from "./components/Checkbox";
export * from "./components/RadioGroup";
export * from "./components/Select";

// Contents
export * from "./components/Card";
export * from "./components/Badge";

// Feedback
export * from "./components/Alert";
export * from "./components/Tooltip";
export * from "./components/Dialog";
export * from "./components/DropdownMenu";
export * from "./components/Toast";

// Loading
export * from "./components/Spinner";
export * from "./components/Skeleton";

// Navigation
export * from "./components/Tabs";

// AI-Native
export * from "./components/ai";
