import { KnipConfig } from 'knip'

const config: KnipConfig = {
  // Scan apps and packages; ignore generated and storybook artifacts
  entry: [
    'apps/**/src/**/*.{ts,tsx}',
    'apps/**/scripts/**/*.{ts,js}',
  ],
  project: [
    'apps/**/src/**/*.{ts,tsx}',
  ],
  ignore: [
    'apps/**/src/_generated/**',
    'apps/**/.storybook/**',
    'apps/**/storybook-static/**',
    'apps/**/coverage*/**',
    'apps/document-generator/build/**',
    'apps/document-generator/.react-router/**',
  ],
  ignoreDependencies: [
    // Typical dev-only or framework-managed deps to ignore false positives
    'next',
    '@storybook/*',
  ],
}

export default config
