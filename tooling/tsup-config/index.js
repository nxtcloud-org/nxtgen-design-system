import { defineConfig } from "tsup";

/**
 * 공통 라이브러리 빌드 프리셋. ESM + CJS + d.ts 산출.
 */
export const libraryPreset = (overrides = {}) =>
  defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    external: ["react", "react-dom"],
    ...overrides,
  });
