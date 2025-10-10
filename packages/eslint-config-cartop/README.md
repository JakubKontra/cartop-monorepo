# eslint-config-cartop

Cartop's ESLint config for typescript projects

This package provides a comprehensive linting solution for TypeScript projects. It leverages ESLint along with a set of plugins and configurations to enforce code quality and style standards.

# Features

**ESLint**: The core linting tool.
**Plugin Support**: Includes various ESLint plugins for enhanced linting capabilities:
`eslint-plugin-import`: Linting of import/export syntax, and prevent file path and import name mistakes.
`eslint-plugin-node`: Additional ESLint rules for Node.js specific coding practices.
`eslint-plugin-react`: Linting rules for React applications.
`eslint-plugin-react-hooks`: Rules for React Hooks.
`@typescript-eslint/eslint-plugin`: TypeScript-specific linting rules.
**TypeScript Support:** Includes TypeScript ESLint parser and import resolver.
**Babel Integration:** Compatibility with Babel through @babel/core and @babel/eslint-parser.

# Configuration

add the following configuration to your ESLint configuration file and adjust it according to your needs:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },

  "extends": ["cartop", "cartop/react", "cartop/typescript"]
}
```
