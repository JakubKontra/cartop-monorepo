"use strict";

const tseslint = require("typescript-eslint");
const filePatterns = require("../file-patterns");
const base = require("../index");

const config = {
  settings: {
    // Correctly recognise .ts and .d.ts files when checking import paths against the filesystem
    "import-x/resolver": {
      node: {
        extensions: [
          ".ts",
          ".tsx",
          ".d.ts",
          ...base.config.settings["import-x/resolver"].node.extensions,
        ],
      },
      // Correctly recognise paths defined in tsconfig.json for package aliases
      typescript: {},
    },
  },

  rules: {
    "valid-jsdoc": "off",
    "no-undef": "off",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/await-thenable": "warn",

    // Ban `// @ts-<directive>` comments from being used
    "@typescript-eslint/ban-ts-comment": "warn",

    // Ban // tslint:<rule-flag> comments from being used
    "@typescript-eslint/ban-tslint-comment": "warn",

    "@typescript-eslint/class-literal-property-style": "warn",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
      },
    ],

    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      {
        accessibility: "no-public",
      },
    ],

    "@typescript-eslint/explicit-module-boundary-types": "off",

    "@typescript-eslint/member-ordering": "warn",

    "@typescript-eslint/no-array-constructor": "error",
    "no-array-constructor": "off",

    "@typescript-eslint/no-base-to-string": "warn",

    "@typescript-eslint/no-dupe-class-members": "error",
    "no-dupe-class-members": "off",

    "@typescript-eslint/no-duplicate-enum-values": "error",

    "@typescript-eslint/no-duplicate-type-constituents": "warn",

    "@typescript-eslint/no-dynamic-delete": "error",

    "@typescript-eslint/no-empty-interface": "warn",

    "@typescript-eslint/no-explicit-any": "error",

    "@stylistic/no-extra-semi": ["error"],

    "@typescript-eslint/no-extraneous-class": [
      "warn",
      {
        allowConstructorOnly: true,
        allowWithDecorator: true,
      },
    ],

    "@typescript-eslint/no-floating-promises": "error",

    "@typescript-eslint/no-for-in-array": "error",

    "@typescript-eslint/no-implied-eval": "error",
    "no-implied-eval": "off",

    "@typescript-eslint/no-inferrable-types": "error",

    "@typescript-eslint/no-invalid-this": "error",
    "no-invalid-this": "off",

    "@typescript-eslint/no-invalid-void-type": "warn",

    "@typescript-eslint/no-loop-func": "warn",
    "no-loop-func": "off",

    "@typescript-eslint/no-loss-of-precision": "warn",
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-mixed-enums": "warn",

    // @TODO To be discussed if we want to enable this rule or not
    // Disallow the use of custom TypeScript modules and namespaces
    // Custom TypeScript modules (module foo {}) and namespaces (namespace foo {}) are considered
    // outdated ways to organize TypeScript code. ES2015 module syntax is now preferred
    // (import-x/export).
    "@typescript-eslint/no-namespace": "error",

    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",

    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

    "@typescript-eslint/parameter-properties": [
      "warn",
      {
        prefer: "class-property",
      },
    ],

    "@typescript-eslint/no-redeclare": [
      "error",
      {
        ignoreDeclarationMerge: true,
      },
    ],
    "no-redeclare": "off",

    "@typescript-eslint/no-redundant-type-constituents": "warn",

    "@typescript-eslint/no-require-imports": "warn",

    "@typescript-eslint/no-shadow": "off",
    "no-shadow": "off",

    "@typescript-eslint/no-this-alias": [
      "error",
      {
        allowDestructuring: true,
      },
    ],

    "@typescript-eslint/only-throw-error": [
      "error",
      {
        allowThrowingAny: false,
        allowThrowingUnknown: false,
      },
    ],
    "no-throw-literal": "off",

    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",

    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",

    // Disallow member access on `any` typed variables
    "@typescript-eslint/no-unsafe-member-access": "off",

    // Disallow returning `any` from a function
    "@typescript-eslint/no-unsafe-return": "warn",

    // This rule aims to eliminate unused expressions
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "no-unused-expressions": "off",

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": "off",

    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
        typedefs: false,
      },
    ],
    "no-use-before-define": "off",

    "@typescript-eslint/no-var-requires": "error",

    "@typescript-eslint/no-useless-constructor": "error",
    "no-useless-constructor": "off",

    "@typescript-eslint/no-useless-empty-export": "warn",

    // Prefer usage of `as const` over literal type
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-literal-enum-member": "warn",

    "@typescript-eslint/prefer-nullish-coalescing": "off",

    "@typescript-eslint/prefer-namespace-keyword": "warn",

    // Prefer using type parameter when calling `Array#reduce` instead of casting
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",

    // Enforce that `this` is used when only `this` type is returned
    "@typescript-eslint/prefer-return-this-type": "warn",

    "@typescript-eslint/promise-function-async": "off",

    "@typescript-eslint/require-array-sort-compare": "error",

    // Disallow async functions which have no await expression
    "@typescript-eslint/require-await": "warn",
    "require-await": "off",

    // When adding two variables, operands must both be of type number or of type string
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        skipCompoundAssignments: false,
      },
    ],

    // Enforce template literal expressions to be of string type
    "@typescript-eslint/restrict-template-expressions": [
      "off",
      {
        allowNumber: true,
        allowBoolean: true,
        allowNullish: true,
        allowAny: false,
      },
    ],

    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-non-null-assertion": 0,

    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/unbound-method": "warn",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "consistent-return": "off",
    "@typescript-eslint/explicit-function-return-type": ["off", {}],

    "react/prop-types": "off",

    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "forbid",
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: [
          "is",
          "are",
          "should",
          "has",
          "can",
          "did",
          "will",
          "expected",
        ],
      },
      {
        selector: "typeParameter",
        format: ["PascalCase"],
        custom: {
          regex: "^T[A-Z][a-zA-Z]+",
          match: true,
        },
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^[A-Z]",
          match: true,
        },
      },
    ],

    // Must be off, otherwise @typescript-eslint/member-ordering is triggered
    "@typescript-eslint/method-signature-style": "off",

    "@typescript-eslint/prefer-ts-expect-error": "off",

    "import-x/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            // This should be added both to @linters and code-quality-tools
            pattern: "~/**",
            group: "internal",
          },
        ],
      },
    ],
    "import-x/no-duplicates": ["error", { "prefer-inline": true }],
    "import-x/newline-after-import": "error",
    "import-x/no-relative-packages": "error",
    "import-x/no-useless-path-segments": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["cartop-data/*", "!cartop-data/src"],
            message: "Please use import from 'cartop-data/src' folder only",
          },
        ],
      },
    ],
  },
};

module.exports = {
  config,
  flatConfig: [
    ...tseslint.configs.recommended,
    config,
    {
      files: ["*.d.ts", "scripts/**/*.{js,ts}", "*/scripts/**/*.{js,ts}"],
      rules: {
        "import-x/no-unused-modules": "off",
      },
    },
    // Storybook
    {
      files: filePatterns.storybook,
      rules: {
        "@typescript-eslint/consistent-type-assertions": "off",
        "import-x/group-exports": "off",
        "import-x/exports-last": "off",
        "import-x/no-default-export": "off",
      },
    },
    // Tests
    {
      files: filePatterns.tests,
      rules: {
        "import-x/no-unused-modules": "off",
        "jest/expect-expect": "off",
        "@typescript-eslint/unbound-method": "off",
      },
    },
    {
      files: ["env.d.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-vars": "off",
        "import-x/no-unused-modules": "off",
        "no-unused-vars": "off",
      },
    },
  ],
};
