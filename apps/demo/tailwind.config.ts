import preset from "@nxtgen-org/tokens/tailwind";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  presets: [preset],
  content: ["./app/**/*.{ts,tsx}", "../../packages/react/src/**/*.{ts,tsx}"],
  // preflight 활성화 — Tailwind transform/keyframes vars 필요 (Switch translate, Spinner spin)
  // 우리 reset은 globals.css에서 제거.
  plugins: [animate],
} satisfies Config;
