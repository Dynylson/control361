import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.{test,spec}.{js,ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/vitest.setup.ts',
    coverage: {
      provider: 'v8',
    },
  },
});