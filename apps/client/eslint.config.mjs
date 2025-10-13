import cartopCypress from "eslint-config-cartop/cypress/index.js";
import cartop from "eslint-config-cartop/index.js";
import cartopJest from "eslint-config-cartop/jest/index.js";
import cartopTypescript from "eslint-config-cartop/typescript/index.js";
import cartopReact from "eslint-config-cartop/react/index.js";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import noSecrets from "eslint-plugin-no-secrets";
import unicorn from "eslint-plugin-unicorn";
import sonarjs from "eslint-plugin-sonarjs";
import regexp from "eslint-plugin-regexp";
import boundaries from "eslint-plugin-boundaries";
import prettierConfig from "eslint-config-prettier";

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

  // Cartop configs
  ...cartop.flatConfig,
  cartopReactWithoutPlugins,
  ...cartopTypescript.flatConfig,

  // Tailwind CSS plugin (better-tailwindcss supports v4)
  {
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: {
      "better-tailwindcss/sort-classes": [
        "warn",
        {
          entryPoint: "./src/app/globals.css",
        },
      ],
      "better-tailwindcss/no-arbitrary-value": "off",
      "better-tailwindcss/no-custom-classname": "off",
    },
    settings: {
      "better-tailwindcss": {
        callees: ["cn", "tv", "cva"],
      },
    },
  },

  // Security: no-secrets plugin - prevents committing API keys/tokens
  {
    plugins: {
      "no-secrets": noSecrets,
    },
    rules: {
      "no-secrets/no-secrets": ["error", { tolerance: 4.5 }],
    },
  },

  // Unicorn: Modern JS/TS best practices
  {
    plugins: {
      unicorn,
    },
    rules: {
      "unicorn/filename-case": [
        "warn",
        {
          cases: {
            kebabCase: true,
            pascalCase: true, // Allow PascalCase for React components
            camelCase: true,  // Allow camelCase for hooks (useXxx)
          },
          ignore: [
            "^[A-Z]+\\.tsx?$", // Allow all-caps files (e.g., README.md)
          ],
        },
      ],
      "unicorn/no-null": "off", // TypeScript often uses null
      "unicorn/prefer-top-level-await": "warn",
      "unicorn/no-array-push-push": "error",
      "unicorn/prevent-abbreviations": "off", // Too strict for existing code
    },
  },

  // SonarJS: Code quality and complexity
  {
    plugins: {
      sonarjs,
    },
    rules: {
      "sonarjs/cognitive-complexity": ["warn", 20],
      "sonarjs/no-duplicate-string": ["warn", { threshold: 5 }],
      "sonarjs/no-identical-functions": "warn",
    },
  },

  // Regexp: Regex optimization and correctness
  {
    plugins: {
      regexp,
    },
    rules: {
      "regexp/optimal-quantifier-concatenation": "warn",
      "regexp/no-dupe-characters-character-class": "error",
      "regexp/no-useless-escape": "warn",
      "regexp/no-useless-flag": "warn",
    },
  },

  // Boundaries: Architectural layer enforcement (Atomic Design + Next.js)
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "sections", pattern: "src/components/sections/**" },
        // Note: animations MUST be before organisms (more specific pattern first)
        { type: "animations", pattern: "src/components/organisms/animations/**" },
        { type: "organisms", pattern: "src/components/organisms/**" },
        { type: "molecules", pattern: "src/components/molecules/**" },
        { type: "atoms", pattern: "src/components/atoms/**" },
        { type: "features", pattern: "src/components/features/**" },
        { type: "branding", pattern: "src/components/branding/**" },
        { type: "icons", pattern: "src/components/icons/**" },
        { type: "providers", pattern: "src/components/providers/**" },
        { type: "hooks", pattern: "src/hooks/**" },
        { type: "lib", pattern: "src/lib/**" },
        { type: "queries", pattern: "src/queries/**" },
        { type: "utils", pattern: "src/utils/**" },
        { type: "gql", pattern: "src/gql/**" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            // App can import anything
            {
              from: ["app"],
              allow: [
                "sections",
                "organisms",
                "animations",
                "molecules",
                "atoms",
                "features",
                "branding",
                "icons",
                "providers",
                "hooks",
                "lib",
                "queries",
                "utils",
                "gql",
              ],
            },
            // Sections can import organisms, molecules, and lower layers
            {
              from: ["sections"],
              allow: ["organisms", "animations", "molecules", "atoms", "branding", "icons", "hooks", "utils", "gql"],
            },
            // Organisms can import animations, molecules, atoms, and utils
            {
              from: ["organisms"],
              allow: ["animations", "molecules", "atoms", "branding", "icons", "hooks", "utils", "gql"],
            },
            // Animations are utility wrappers, can be used by lower layers
            {
              from: ["animations"],
              allow: ["hooks", "utils"],
            },
            // Molecules can import animations, atoms, and utils
            { from: ["molecules"], allow: ["animations", "atoms", "branding", "icons", "hooks", "utils"] },
            // Atoms can only import utils and icons
            { from: ["atoms"], allow: ["icons", "utils"] },
            // Features are like organisms (can import lower layers)
            {
              from: ["features"],
              allow: ["organisms", "animations", "molecules", "atoms", "branding", "icons", "hooks", "lib", "queries", "utils", "gql"],
            },
            // Branding can import icons and utils
            { from: ["branding"], allow: ["icons", "utils"] },
            // Icons can import utils
            { from: ["icons"], allow: ["utils"] },
            // Providers can import hooks and utils
            { from: ["providers"], allow: ["hooks", "utils", "gql"] },
            // Hooks can import utils
            { from: ["hooks"], allow: ["utils"] },
            // Lib can import utils and gql
            { from: ["lib"], allow: ["utils", "gql"] },
            // Queries can import gql and lib
            { from: ["queries"], allow: ["lib", "gql"] },
            // Utils and GQL are leaf nodes
            { from: ["utils"], allow: [] },
            { from: ["gql"], allow: [] },
          ],
        },
      ],
    },
  },

  // Prettier config - disables conflicting stylistic rules
  prettierConfig,

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
    files: ["**/*.spec.tsx"],
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
