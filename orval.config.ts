import { defineConfig } from 'orval';

export default defineConfig({
  'cartop-rest-api': {
    input: {
      // OpenAPI/Swagger spec URL from the backend
      // Make sure backend is running on port 3000 when generating
      target: 'http://localhost:3000/api/docs-json',
    },
    output: {
      // Output location for generated files
      target: './packages/api-client/src/generated/rest-api.ts',
      // Use axios as HTTP client
      client: 'react-query',
      // Additional options
      mode: 'tags-split',
      // Override settings
      override: {
        mutator: {
          path: './packages/api-client/src/config/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          // Signal support for request cancellation
          signal: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
