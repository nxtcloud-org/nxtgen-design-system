import { mkdir } from "node:fs/promises";
import StyleDictionary from "style-dictionary";

// clean 후 빌드 시 디렉토리 누락으로 실패 방지
for (const dir of ["dist/css", "dist/ts", "dist/json", "dist/tailwind"]) {
  await mkdir(dir, { recursive: true });
}

/**
 * NxtGen tokens build:
 *   - dist/css/primitive.css        (:root primitive vars)
 *   - dist/css/semantic-light.css   (:root[data-theme='light'])
 *   - dist/css/semantic-dark.css    (:root[data-theme='dark'])
 *   - dist/css/all.css              (위 3개 + 기본 light)
 *   - dist/ts/tokens.{js,cjs,d.ts}  (런타임 import용)
 *   - dist/tailwind/preset.cjs      (Tailwind v4 호환 preset)
 *   - dist/json/dtcg.json           (raw merged DTCG)
 */

const PRIMITIVE_GLOB = "src/primitive/**/*.json";
const SEMANTIC_LIGHT = "src/semantic/light.json";
const SEMANTIC_DARK = "src/semantic/dark.json";

const cssHeader = (selector) => ({
  format: "css/variables",
  options: {
    selector,
    outputReferences: false,
  },
});

// ---------- 1. Primitive only → :root ----------
const primitiveSd = new StyleDictionary({
  source: [PRIMITIVE_GLOB],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "primitive.css",
          ...cssHeader(":root"),
        },
      ],
    },
  },
});

// ---------- 2. Semantic Light → :root[data-theme='light'] ----------
const lightSd = new StyleDictionary({
  source: [PRIMITIVE_GLOB, SEMANTIC_LIGHT],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "semantic-light.css",
          ...cssHeader(":root, :root[data-theme='light']"),
          filter: (token) => !token.filePath.includes("primitive"),
        },
      ],
    },
  },
});

// ---------- 3. Semantic Dark → :root[data-theme='dark'] ----------
const darkSd = new StyleDictionary({
  source: [PRIMITIVE_GLOB, SEMANTIC_DARK],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "semantic-dark.css",
          ...cssHeader(":root[data-theme='dark']"),
          filter: (token) => !token.filePath.includes("primitive"),
        },
      ],
    },
  },
});

// ---------- 4. TS tokens (light 기준 raw values) ----------
const tsSd = new StyleDictionary({
  source: [PRIMITIVE_GLOB, SEMANTIC_LIGHT],
  platforms: {
    ts: {
      transformGroup: "js",
      buildPath: "dist/ts/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
        },
        {
          destination: "tokens.cjs",
          format: "javascript/module",
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/module-declarations",
        },
      ],
    },
    json: {
      transformGroup: "js",
      buildPath: "dist/json/",
      files: [
        {
          destination: "dtcg.json",
          format: "json",
        },
      ],
    },
  },
});

// ---------- 빌드 실행 ----------
console.log("🎨 Building NxtGen tokens...");
await primitiveSd.buildAllPlatforms();
await lightSd.buildAllPlatforms();
await darkSd.buildAllPlatforms();
await tsSd.buildAllPlatforms();

// ---------- 5. all.css (편의 번들) ----------
import { readFile, writeFile } from "node:fs/promises";

const [primitive, light, dark] = await Promise.all([
  readFile("dist/css/primitive.css", "utf8"),
  readFile("dist/css/semantic-light.css", "utf8"),
  readFile("dist/css/semantic-dark.css", "utf8"),
]);

await writeFile(
  "dist/css/all.css",
  `/**\n * NxtGen Design Tokens — bundled\n * Generated. Do not edit.\n */\n\n${primitive}\n${light}\n${dark}\n`,
);

// ---------- 6. Tailwind preset ----------
await writeFile(
  "dist/tailwind/preset.cjs",
  `/**
 * NxtGen Tailwind preset (v3/v4 호환).
 * 컴포넌트는 시맨틱 토큰 (bg-surface, text-primary 등) 사용 권장.
 * Tailwind v4는 @theme 디렉티브 + CSS 파일 import도 가능.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // semantic
        canvas:        "var(--bg-canvas)",
        surface:       "var(--bg-surface)",
        subtle:        "var(--bg-subtle)",
        muted:         "var(--bg-muted)",
        inverse:       "var(--bg-inverse)",
        brand: {
          DEFAULT: "var(--bg-brand)",
          hover:   "var(--bg-brand-hover)",
          subtle:  "var(--bg-brand-subtle)",
        },
        accent: {
          DEFAULT: "var(--bg-accent)",
          hover:   "var(--bg-accent-hover)",
        },
        success: "var(--bg-success)",
        warning: "var(--bg-warning)",
        danger:  "var(--bg-danger)",
        info:    "var(--bg-info)",
        // top-level shortcut: text-on-brand 같은 짧은 클래스 매칭용
        // (Tailwind는 colors.text.on-brand를 text-text-on-brand로만 만들기 때문)
        "on-brand": "var(--text-on-brand)",
        text: {
          primary:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary:  "var(--text-tertiary)",
          disabled:  "var(--text-disabled)",
          inverse:   "var(--text-inverse)",
          brand:     "var(--text-brand)",
          accent:    "var(--text-accent)",
          danger:    "var(--text-danger)",
          "on-brand": "var(--text-on-brand)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          subtle:  "var(--border-subtle)",
          strong:  "var(--border-strong)",
          focus:   "var(--border-focus)",
          danger:  "var(--border-danger)",
        },
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs:   "var(--radius-xs)",
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs:    "var(--shadow-xs)",
        sm:    "var(--shadow-sm)",
        md:    "var(--shadow-md)",
        lg:    "var(--shadow-lg)",
        xl:    "var(--shadow-xl)",
        focus: "var(--shadow-focus)",
        "glow-brand":  "var(--shadow-glow-brand)",
        "glow-accent": "var(--shadow-glow-accent)",
      },
      fontFamily: {
        sans:  ["Pretendard Variable", "Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono:  ["Geist Mono", "SF Mono", "JetBrains Mono", "monospace"],
        brand: ["Geist", "Pretendard Variable", "-apple-system", "sans-serif"],
      },
      transitionTimingFunction: {
        standard:   "cubic-bezier(0.4, 0.0, 0.2, 1)",
        emphasized: "cubic-bezier(0.2, 0.0, 0, 1)",
        entrance:   "cubic-bezier(0.0, 0.0, 0.2, 1)",
        exit:       "cubic-bezier(0.4, 0.0, 1, 1)",
      },
      transitionDuration: {
        fast:   "120ms",
        base:   "200ms",
        slow:   "320ms",
        slower: "480ms",
      },
      zIndex: {
        dropdown: "1000",
        sticky:   "1100",
        overlay:  "1200",
        modal:    "1300",
        popover:  "1400",
        toast:    "1500",
        tooltip:  "1600",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #2560FF 0%, #A855F7 55%, #E642CA 100%)",
      },
    },
  },
};
`,
);

console.log("✅ Done. dist/ written.");
