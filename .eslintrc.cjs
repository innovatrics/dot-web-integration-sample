/**
 * eslintrc for client packages, server uses eslintrc from 'packages/server/.eslintrc.js'
 */
module.exports = {
  parserOptions: {
    project: [
      './packages/web-demo-client/tsconfig.json',
      './packages/ocr-demo-client/tsconfig.json',
      './cypress/tsconfig.json',
      './packages/common-client/tsconfig.json',
      './tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  globals: {
    __PACKAGE_JSON_VERSION__: true,
  },
  root: true,
  // 'prettier' here disables formatting-only-rules that come from the innovatrics-side,
  // that might conflict with the prettier-settings
  extends: ['@dot/eslint-config-react'],
  ignorePatterns: ['graphqlTypes.ts'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/setupTests.ts',
          '**/testUtils.tsx',
          '**/vite.config.ts',
          '**/vitest.config.ts',
          '**/vitest-canvas.setup.ts',
        ],
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['off'],
      },
    },
    {
      files: ['*/analytics.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
