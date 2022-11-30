/**
 * eslintrc for client packages, server uses eslintrc from 'packages/server/.eslintrc.js'
 */
 module.exports = {
  parserOptions: {
    project: ['./packages/web-demo-client/tsconfig.json', './packages/ocr-demo-client/tsconfig.json', './cypress/tsconfig.json', './packages/common-client/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  globals: {
    __PACKAGE_JSON_VERSION__: true,
  },
  root: true,
  // 'prettier' here disables formatting-only-rules that come from the innovatrics-side,
  // that might conflict with the prettier-settings
  extends: [
    '@innovatrics/eslint-config-typescript-react',
    'prettier',
  ],
  plugins: ['graphql'],
  rules: {
    "no-warning-comments": 0,
    'react-hooks/rules-of-hooks': 'error',

    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": ["**/*.test.tsx", "**/*.test.ts", "**/setupTests.ts", "**/testUtils.tsx", "**/vite.config.ts", "**/vitest.config.ts", "**/vitest-canvas.setup.ts"] }],
    // "import/no-extraneous-dependencies": ["error", { "devDependencies": true, "packageDirs": [".", "./packages/ocr-demo-client/"]}],
    // sometimes the variable has the underscore at the beginning,
    // for example `__typename` in graphql.
    // also, prefixing a method-name with `_` is a simple way to
    // signalize that a method is private-ish, without having
    // to enforce it.
    'no-underscore-dangle': 'off',
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": true
      }
    ],    
  },
  ignorePatterns: ["graphqlTypes.ts"],
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['off'],
      },
    },
    {
      files: ['*/analytics/index.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off'
      }
    }
  ],
};
