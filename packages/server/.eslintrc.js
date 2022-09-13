module.exports = {
  rules: {
    "no-console": "off",
    "@typescript-eslint/naming-convention": ["error",
      {
        "selector": "property",
        "filter": "__typename",
        "format": null
      }
    ],
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
      },
    ],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  },
  ignorePatterns: ["api.ts", "graphqlTypes.ts"],
}
