const baseConfig = require('./eslint.base.config.js');
const nx = require('@nx/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const tsParser = require('@typescript-eslint/parser');

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
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },
  {
    ignores: ['src/app/**/*'],

    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'type:shared',
              onlyDependOnLibsWithTags: ['type:shared'],
            },
            {
              sourceTag: 'type:entities',
              onlyDependOnLibsWithTags: ['type:shared'],
            },
            {
              sourceTag: 'type:features',
              onlyDependOnLibsWithTags: ['type:shared', 'type:entities'],
            },
            {
              sourceTag: 'type:widgets',
              onlyDependOnLibsWithTags: [
                'type:shared',
                'type:entities',
                'type:features',
              ],
            },
            {
              sourceTag: 'type:pages',
              onlyDependOnLibsWithTags: [
                'type:shared',
                'type:entities',
                'type:features',
                'type:widgets',
              ],
            },
          ],
        },
      ],
    },
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
];
