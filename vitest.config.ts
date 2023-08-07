/// <reference types="vitest" />
/// <reference types="vite/client" />
import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [
      "node_modules/@testing-library/jest-dom/extend-expect",
      "./setupVitest.ts",
    ],
    testTransformMode: { web: ["tsx", "ts", "js", "jsx"] },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
});
