import { readFile, writeFile } from "node:fs/promises";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["react", "react-dom", "@nxtgen-org/icons", "@nxtgen-org/react-headless"],
  // 번들된 단일 entry에 client hooks(useState 등)가 포함되므로 Next.js RSC가
  // client boundary로 인식하도록 "use client" 디렉티브를 산출물 최상단에 강제.
  // (esbuild banner는 ESM에서 import 뒤로 밀려서 무효 → 빌드 후 후처리)
  async onSuccess() {
    for (const file of ["dist/index.js", "dist/index.cjs"]) {
      const content = await readFile(file, "utf8");
      if (!content.startsWith('"use client"')) {
        await writeFile(file, `"use client";\n${content}`);
      }
    }
  },
});
