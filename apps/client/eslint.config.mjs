// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import cartopCypress from "eslint-config-cartop/cypress/index.js";
import cartop from "eslint-config-cartop/index.js";
import cartopJest from "eslint-config-cartop/jest/index.js";
import cartopTypescript from "eslint-config-cartop/typescript/index.js";
import cartopReact from "eslint-config-cartop/react/index.js";

import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Use Cartop React rules/settings without re-declaring the React plugins,
// because Next.js config already provides them and flat config forbids duplicates.
const cartopReactWithoutPlugins = (({ plugins, ...rest }) => rest)(
  cartopReact.config,
);

const eslintConfig = [
  // Next.js base configs (typescript handled by cartopTypescript)
  ...compat.extends("next/core-web-vitals"),
  // Ignores
  {
    ignores: [
      "./src/_generated/cartop/openapi/*",
      "src/_generated/**",
      "src/api/customMutator.ts",
      ".next/**",
      // From requested config
      "next-env.d.ts",
      "next.config.js",
      "vite.config.ts",
      "tailwind.config.js",
      "postcss.config.js",
      "src/setup-tests.js",
      "node_modules",
      "scripts",
      "dist/*",
      "tailwind.config.js",
      "vite.config.ts",
    ],
  },
  // Storybook
  ...storybook.configs["flat/recommended"],

  // Cognetiq configs
  ...cartop.flatConfig,
  cartopReactWithoutPlugins,
  ...cartopTypescript.flatConfig,

  // Local overrides
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "eslint@typescript-eslint/no-var-requires": "off",
      "import-x/no-cycle": "off",
      "import-x/no-named-as-default": "off",
      "react/jsx-no-useless-fragment": "off",
    },
  },
  {
    files: ["**/*.spec.tsx", "**/*.stories.ts", "**/*.stories.tsx"],
    rules: {
      "no-empty-function": "off",
    },
  },
  {
    ...cartopCypress.config,
    files: ["cypress/**/*.ts", "cypress/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-useless-empty-export": "off",
    },
  },
  {
    ...cartopJest.config,
    files: ["test/**/*.ts", "test/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.test.json",
      },
    },
    rules: {
      ...cartopJest.config.rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    rules: {
      // keep ordering rule
      "import-x/order": "error",
      // disable other import-x rules
      "import-x/named": "off",
      "import-x/first": "off",
      "import-x/namespace": "off",
      "import-x/no-absolute-path": "off",
      "import-x/export": "off",
      "import-x/extensions": "off",
      "import-x/no-anonymous-default-export": "off",
      "import-x/no-extraneous-dependencies": "off",
      "import-x/no-mutable-exports": "off",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-self-import": "off",
      "import-x/no-cycle": "off",
      "import-x/no-duplicates": "off",
      "import-x/newline-after-import": "off",
      "import-x/no-relative-packages": "off",
      "import-x/no-useless-path-segments": "off",
      "import-x/no-unused-modules": "off",
      "import-x/group-exports": "off",
      "import-x/exports-last": "off",
      "import-x/no-default-export": "off",
    },
  },
];

export default eslintConfig;
