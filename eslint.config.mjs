import nx from '@nx/eslint-plugin';
import pluginRouter from '@tanstack/eslint-plugin-router';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import baseConfig from './eslint.base.config.js';

export default [
  ...pluginRouter.configs['flat/recommended'],
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
