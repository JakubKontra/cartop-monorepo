import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // GraphQL schema from local backend (make sure backend is running on port 3000)
  schema: process.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
  // Scan all .tsx and .ts files for GraphQL queries/mutations (except generated files)
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        // Generate types for fragments
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true, // Don't error if no GraphQL operations are found
};

export default config;
