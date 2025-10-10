'use strict'

const eslint = require('@eslint/js')
const importXPlugin = require('eslint-plugin-import-x')
const stylistic = require('@stylistic/eslint-plugin')
const unusedImportsPlugin = require('eslint-plugin-unused-imports')

const config = {
  plugins: {
    '@stylistic': stylistic,
    'import-x': importXPlugin,
    'unused-imports': unusedImportsPlugin,
  },

  settings: {
    'import-x/resolver': {
      node: {
        extensions: ['.mjs', '.cjs', '.js', '.json', '.node'],
      },
    },
  },

  rules: {
    /**
     * @see [array-callback-return](https://eslint.org/docs/rules/array-callback-return)
     */
    'array-callback-return': 'error',

    /**
     * @see [for-direction](https://eslint.org/docs/rules/for-direction)
     */
    'for-direction': 'error',

    /**
     * @see [getter-return](https://eslint.org/docs/rules/getter-return)
     */
    'getter-return': 'error',

    /**
     * @see [guard-for-in](https://eslint.org/docs/rules/guard-for-in)
     */
    'guard-for-in': 'error',

    /**
     * @see [max-classes-per-file](https://eslint.org/docs/rules/max-classes-per-file)
     */
    'max-classes-per-file': ['warn', 1],

    /**
     * @see [no-async-promise-executor](https://eslint.org/docs/rules/no-async-promise-executor)
     */
    'no-async-promise-executor': 'error',

    /**
     * @see [no-await-in-loop](https://eslint.org/docs/rules/no-await-in-loop)
     */
    'no-await-in-loop': 'warn',

    /**
     * @see [no-case-declarations](https://eslint.org/docs/rules/no-case-declarations)
     */
    'no-case-declarations': 'error',

    /**
     * @see [no-compare-neg-zero](https://eslint.org/docs/rules/no-compare-neg-zero)
     */
    'no-compare-neg-zero': 'error',

    /**
     * @see [no-cond-assign](https://eslint.org/docs/rules/no-cond-assign)
     */
    'no-cond-assign': ['error', 'except-parens'],

    /**
     * @see [no-constant-condition](https://eslint.org/docs/rules/no-constant-condition)
     */
    'no-constant-condition': 'error',

    /**
     * @see [no-debugger](https://eslint.org/docs/rules/no-debugger)
     */
    'no-debugger': 'error',

    /**
     * @see [no-dupe-args](https://eslint.org/docs/rules/no-dupe-args)
     */
    'no-dupe-args': 'error',

    /**
     * @see [no-dupe-else-if](https://eslint.org/docs/rules/no-dupe-else-if)
     */
    'no-dupe-else-if': 'error',

    /**
     * @see [no-dupe-keys](https://eslint.org/docs/rules/no-dupe-keys)
     */
    'no-dupe-keys': 'error',

    /**
     * @see [no-duplicate-case](https://eslint.org/docs/rules/no-duplicate-case)
     */
    'no-duplicate-case': 'error',

    /**
     * @see [no-empty-character-class](https://eslint.org/docs/rules/no-empty-character-class)
     */
    'no-empty-character-class': 'error',

    /**
     * @see [no-empty](https://eslint.org/docs/rules/no-empty)
     */
    'no-empty': 'error',

    /**
     * @see [no-empty-function](https://eslint.org/docs/rules/no-empty-function)
     */
    'no-empty-function': 'warn',

    /**
     * @see [no-eval](https://eslint.org/docs/rules/no-eval)
     */
    'no-eval': 'error',

    /**
     * @see [no-ex-assign](https://eslint.org/docs/rules/no-ex-assign)
     */
    'no-ex-assign': 'error',

    /**
     * @see [no-extend-native](https://eslint.org/docs/rules/no-ex-assign)
     */
    'no-extend-native': 'error',

    /**
     * @see [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind)
     */
    'no-extra-bind': 'error',

    /**
     * @see [no-extra-label](https://eslint.org/docs/rules/no-extra-label)
     */
    'no-extra-label': 'error',

    /**
     * @see [no-func-assign](https://eslint.org/docs/rules/no-func-assign)
     */
    'no-func-assign': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'warn',
    'no-inner-declarations': ['error', 'both'],
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'warn',
    'no-misleading-character-class': 'error',
    'no-undef-init': 'error',
    'no-unreachable-loop': 'warn',
    'no-unsafe-negation': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-useless-backreference': 'warn',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'warn',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-sequences': 'error',
    'no-sparse-arrays': 'error',
    'no-setter-return': 'error',
    'no-template-curly-in-string': 'warn',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'warn',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'warn',
    'no-var': 'error',
    'prefer-rest-params': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'constructor-super': 'error',
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-this-before-super': 'error',
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': [
      'error',
      {
        builtinGlobals: true,
        hoist: 'functions',
        allow: ['name'],
      },
    ],
    'no-undef': 0,
    'accessor-pairs': 'error',
    'default-case': 'error',
    eqeqeq: 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-labels': 'error',
    'no-loss-of-precision': 'warn',
    'no-empty-pattern': 'error',
    'no-fallthrough': 'error',
    'no-global-assign': [
      'error',
      {
        exceptions: ['Promise'],
      },
    ],
    'no-octal-escape': 'error',
    'no-octal': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-useless-rename': 'warn',
    'no-with': 'error',
    'prefer-named-capture-group': 'off',
    'prefer-promise-reject-errors': 'error',
    'prefer-spread': 'warn',
    'require-await': 'off',
    'require-unicode-regexp': 'off',
    'require-yield': 'error',
    strict: ['error', 'global'],
    'vars-on-top': 'warn',
    'import-x/named': 'error',
    'import-x/first': 'error',
    'import-x/namespace': 'error',
    'import-x/no-absolute-path': 'error',
    'import-x/export': 'error',
    'import-x/extensions': ['off', { json: 'always' }],
    'import-x/no-anonymous-default-export': [
      'warn',
      {
        allowObject: true,
        allowArray: true,
      },
    ],
    'import-x/no-extraneous-dependencies': 'error',
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-as-default': 'warn',
    'import-x/no-named-default': 'warn',
    'import-x/no-named-as-default-member': 'warn',
    'import-x/no-self-import': 'error',
    'import-x/no-cycle': [
      'error',
      {
        maxDepth: 8,
      },
    ],
  },
}

module.exports = {
  config,
  flatConfig: [eslint.configs.recommended, config],
}
