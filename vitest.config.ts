import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const srcDirectory = fileURLToPath(new URL("./src", import.meta.url));
const contractsDirectory = fileURLToPath(new URL("./contracts", import.meta.url));
const dataDirectory = fileURLToPath(new URL("./data", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcDirectory,
      "@contracts": contractsDirectory,
      "@data": dataDirectory,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/__tests__/**/*.test.ts", "src/**/__tests__/**/*.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
