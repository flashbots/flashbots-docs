/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'react-hooks',
    'header',
    'jest',
    '@typescript-eslint',
    'regexp',
    '@docusaurus',
  ],
  env: {
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@docusaurus/recommended',
    "plugin:react/jsx-runtime",
    'plugin:mdx/recommended',
    'prettier',
  ],
  rules: {
    'react/jsx-uses-react': OFF, // JSX runtime: automatic
    'react/react-in-jsx-scope': OFF, // JSX runtime: automatic
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
    'no-lonely-if': WARNING,
    'no-nested-ternary': WARNING,
    'prefer-destructuring': WARNING,
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
  },
  // optional, if you want to lint code blocks at the same time
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
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
