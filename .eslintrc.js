module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  parserOptions: {
    project: ['./packages/server/tsconfig.json', './packages/client/tsconfig.json', './cypress/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    node: true,
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
  plugins: ['graphql', 'react-hooks'],
  rules: {
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

    // sometimes the variable has the underscore at the beginning,
    // for example `__typename` in graphql.
    // also, prefixing a method-name with `_` is a simple way to
    // signalize that a method is private-ish, without having
    // to enforce it.
    'no-underscore-dangle': 'off',
    "@typescript-eslint/no-non-null-assertion": "off"
  },
};
