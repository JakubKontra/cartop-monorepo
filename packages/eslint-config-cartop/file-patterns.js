'use strict'

module.exports = {
  esmodules: ['*.mjs', '.*.mjs'],
  javascripts: ['*.js', '.*.js', '*.cjs', '.*.cjs'],
  server: [
    'server/**/*.{js,ts}',
    '*/server/**/*.{js,ts}',
    'scripts/**/*.{js,ts}',
    '*/scripts/**/*.{js,ts}',
  ],
  storybook: ['*.stories.{js,jsx,ts,tsx,mdx}'],
  tests: ['test/**', '**/*.test.*', '**/*.spec.*'],
  typescripts: ['*.ts', '.*.ts', '*.tsx', '.*.tsx'],
}
