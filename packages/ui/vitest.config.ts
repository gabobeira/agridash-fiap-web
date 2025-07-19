import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: false, // Disable CSS processing for tests
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
