import { defineConfig } from "@playwright/test";

const PLAYWRIGHT_PORT = 3100;
const PLAYWRIGHT_BASE_URL = `http://127.0.0.1:${PLAYWRIGHT_PORT}`;

export default defineConfig({
  outputDir: "./e2e/result/artifacts",
  reporter: [["html", { open: "never", outputFolder: "./e2e/result/report" }]],
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: PLAYWRIGHT_BASE_URL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run dev -- --hostname 127.0.0.1 --port ${PLAYWRIGHT_PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
    url: PLAYWRIGHT_BASE_URL,
  },
});
