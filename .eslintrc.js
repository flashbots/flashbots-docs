/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['header'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@docusaurus/recommended',
    'plugin:react/jsx-runtime',
    'plugin:mdx/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  rules: {
    camelcase: WARNING,
    'max-len': [
      WARNING,
      {
        code: Infinity, // Code width is already enforced by Prettier
        tabWidth: 2,
        comments: 80,
        ignoreUrls: true,
        ignorePattern: '(eslint-disable|@)',
      },
    ],
    'header/header': [
      ERROR,
      'block',
      [
        '*',
        ' * Copyright (c) Flashbots Ltd. and its affiliates.',
        ' *',
        ' * This source code is licensed under the MIT license found in the',
        ' * LICENSE file in the root directory of this source tree.',
        ' ',
      ],
    ],
    'import/no-unresolved': ERROR,
    'import/no-extraneous-dependencies': [ERROR, {includeTypes: true}],
    'react/require-default-props': [
      WARNING,
      {
        functions: 'defaultArguments',
      },
    ],
    'react/jsx-filename-extension': [
      WARNING,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    // optional, if you want to lint code blocks at the same time
    'mdx/code-blocks': true,
    // optional, if you want to disable language mapper, set it to `false`
    // if you want to override the default language mapper inside, you can
    // provide your own
    'mdx/language-mapper': {
      typescript: '@typescript-eslint/parser',
      ts: '@typescript-eslint/parser',
      javascript: 'espree',
      js: 'espree',
    },
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/overrides'],
    },
  ],
};
