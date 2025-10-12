import { GetAllCatalogModelGenerationsQuery } from '@/gql/graphql'

// Use generated type from GraphQL Codegen
export type Generation = GetAllCatalogModelGenerationsQuery['catalogModelGenerations'][0]
