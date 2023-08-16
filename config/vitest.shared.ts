import type { UserConfig } from 'vitest/config';

import { resolve } from 'path';

export const configShared: UserConfig = {
  test: {
    // absolute path from root directory
    setupFiles: [resolve(__dirname, './vitest-canvas.setup.ts'), resolve(__dirname, './global.ts')],
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    deps: {
      inline: ['@dot'],
    },
    globals: true,
  },
};
