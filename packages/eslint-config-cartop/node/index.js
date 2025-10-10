'use strict'

const base = require('../index')
const filePatterns = require('../file-patterns')

const flatConfig = [
  {
    languageOptions: {
      ecmaVersion: 2023,
    },
    settings: {
      'import-x/resolver': {
        node: {
          extensions: [
            ...base.config.settings['import-x/resolver'].node.extensions,
            '.node',
          ],
        },
      },
    },
    rules: {
      'no-buffer-constructor': 2,
    },
  },
  {
    files: filePatterns.javascripts,
    parserOptions: {
      sourceType: 'script',
    },
  },
  {
    files: [...filePatterns.esmodules, ...filePatterns.typescripts],
    parserOptions: {
      sourceType: 'module',
    },
    rules: {
      'import-x/no-unused-modules': [
        'warn',
        {
          missingExports: true,
          unusedExports: true,
        },
      ],
    },
  },
  {
    files: [...filePatterns.server],
    rules: {
      'import-x/no-unused-modules': 'off',
    },
  },
]

module.exports = { flatConfig }
