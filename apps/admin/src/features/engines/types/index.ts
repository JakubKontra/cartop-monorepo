import type { GetAllEnginesQuery } from '@/gql/graphql'

export type Engine = NonNullable<GetAllEnginesQuery['allEngines']>[number]
