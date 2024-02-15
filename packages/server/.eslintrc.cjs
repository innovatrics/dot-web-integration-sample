module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
  },
  globals: {
    __PACKAGE_JSON_VERSION__: true,
  },
  root: true,
  extends: ['@dot/eslint-config-typescript'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        filter: '__typename',
        format: null,
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    // sometimes the variable has the underscore at the beginning,
    // for example `__typename` in graphql.
    // also, prefixing a method-name with `_` is a simple way to
    // signalize that a method is private-ish, without having
    // to enforce it.
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  ignorePatterns: ['api.ts', 'graphqlTypes.ts'],
};
