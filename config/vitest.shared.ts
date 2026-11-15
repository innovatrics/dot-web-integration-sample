import { resolve } from 'node:path';
import type { UserConfig } from 'vitest/config';

export const configShared: UserConfig = {
  test: {
    deps: {
      inline: ['@dot'],
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    globals: true,
    // absolute path from root directory
    setupFiles: [resolve(__dirname, './vitest-canvas.setup.ts'), resolve(__dirname, './global.ts')],
  },
};
