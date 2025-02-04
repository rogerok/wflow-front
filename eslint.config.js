const baseConfig = require('./eslint.base.config.js');
const nx = require('@nx/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const tsParser = require('@typescript-eslint/parser');

const importPlugin = require('eslint-plugin-import');

module.exports = [
  ...baseConfig,
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      import: importPlugin,
    },
  },
  {
    ignores: ['src/app/**/*'],
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@widgets/*'],
              message:
                'Do not use absolute imports from @widgets inside widgets. Use relative paths.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/pages/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@pages/*'],
              message:
                'Do not use absolute imports from @pages inside pages. Use relative paths.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@shared/*'],
              message:
                'Do not use absolute imports from @shared inside pages. Use relative paths.',
            },
          ],
        },
      ],
    },
  },
];
