import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/custom/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["react", "react-dom", "lucide-react"],
});
