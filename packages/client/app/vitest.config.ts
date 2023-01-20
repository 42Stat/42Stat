// eslint-disable-next-line
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest-setup.ts',
    include: ['src/*/test.tsx'],
  },
});
