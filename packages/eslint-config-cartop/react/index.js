'use strict'

const { fixupPluginRules } = require('@eslint/compat')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const globals = require('globals')
const base = require('../index.js')

const config = {
  plugins: {
    react,
    'react-hooks': fixupPluginRules(reactHooks),
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import-x/resolver': {
      node: {
        extensions: [
          '.jsx',
          ...base.config.settings['import-x/resolver'].node.extensions,
        ],
      },
    },
  },

  rules: {
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
    'react/boolean-prop-naming': [
      'warn',
      {
        rule: '^(can|is|has|should)[A-Z]([A-Za-z0-9]?)+',
        message:
          'Boolean prop: ({{ propName }}) should start with is/has - pattern: ({{ pattern }})',
      },
    ],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
    'react/button-has-type': ['warn', { reset: false }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
    'react/default-props-match-prop-types': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'warn',

    // @TODO: Enable this rule when fixed
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-dom-props.md
    /*
    'react/forbid-dom-props': [
      'warn',
      {
        forbid: ['style'],
      },
    ],
    */

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
    'react/forbid-foreign-prop-types': ['error', { allowInPropTypes: true }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
    'react/no-access-state-in-setstate': 'error',

    // @TODO: Enable this rule when fixed
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    // 'react/no-array-index-key': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
    'react/no-children-prop': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    'react/no-danger': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
    'react/no-danger-with-children': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
    'react/no-deprecated': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
    'react/no-direct-mutation-state': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
    'react/no-find-dom-node': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
    'react/no-is-mounted': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
    'react/no-redundant-should-component-update': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
    'react/no-render-return-value': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
    'react/no-typos': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    // Considered as legacy and will be deprecated in the future
    'react/no-string-refs': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
    'react/no-this-in-sfc': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    'react/no-unescaped-entities': ['error'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    'react/no-unknown-property': ['error'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
    'react/prefer-es6-class': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-read-only-props.md
    'react/prefer-read-only-props': 'off',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    'react/self-closing-comp': 'error',

    // @TODO: Brainstorm about this rule
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    // 'react/sort-comp': ['warn'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    'react/void-dom-elements-no-children': 'error',

    // Enforce boolean attributes notation in JSX
    'react/jsx-boolean-value': ['warn', 'never'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-child-element-spacing.md
    '@stylistic/jsx-child-element-spacing': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],

    // @TODO To be discussed with the team
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    'react/jsx-handler-names': ['warn'],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    'react/jsx-key': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
    'react/jsx-no-comment-textnodes': 'warn',

    // @TODO To be discussed with the team
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
    'react/jsx-no-constructed-context-values': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': ['warn', { enforceDynamicLinks: 'always' }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
    'react/jsx-fragments': 'warn',

    'react/jsx-no-useless-fragment': 'warn',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    '@stylistic/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
    'react/jsx-uses-vars': 'error',

    // Plugin enforces the Rules of Hooks (https://reactjs.org/docs/hooks-rules.html)
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    'absolute-import-x/no-relative-path': 'off',
    'arrow-body-style': 'off',

    'max-classes-per-file': 'off',
    'no-undefined': 'off',

    'import-x/group-exports': 'off',
    'import-x/exports-last': 'off',
    'import-x/no-default-export': 'off',
  },
}

module.exports = { config }
