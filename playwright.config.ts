import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: false,
  },
});
