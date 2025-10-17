import { graphql } from '@/gql'

/**
 * Get All Engines Query
 * Fetches all engines with optional filtering
 */
export const GET_ALL_ENGINES = graphql(`
  query GetAllEngines(
    $limit: Float
    $offset: Float
    $generationId: String
    $fuelType: CatalogEngineFuelType
    $transmissionType: CatalogEngineTransmissionType
    $driveType: CatalogEngineDriveType
    $activeOnly: Boolean
    $recommendedOnly: Boolean
  ) {
    allEngines(
      limit: $limit
      offset: $offset
      generationId: $generationId
      fuelType: $fuelType
      transmissionType: $transmissionType
      driveType: $driveType
      activeOnly: $activeOnly
      recommendedOnly: $recommendedOnly
    ) {
      id
      name
      generationId
      generation {
        id
        name
        slug
        model {
          id
          name
          slug
          brand {
            id
            name
            slug
          }
        }
      }
      fuelType
      transmissionType
      driveType
      consumptionCombined
      consumptionCity
      consumptionOutOfCity
      performance
      torque
      volume
      emission
      rangeKm
      acceleration
      fuelTankVolume
      cylinderCount
      maxSpeed
      weight
      gearsCount
      productionStart
      productionStop
      active
      recommended
    }
  }
`)

/**
 * Get Single Engine Query
 * Fetches a single engine by ID
 */
export const GET_ENGINE = graphql(`
  query GetEngine($id: String!) {
    engine(id: $id) {
      id
      name
      generationId
      generation {
        id
        name
        slug
        model {
          id
          name
          slug
          brand {
            id
            name
            slug
          }
        }
      }
      fuelType
      transmissionType
      driveType
      consumptionCombined
      consumptionCity
      consumptionOutOfCity
      performance
      torque
      volume
      emission
      rangeKm
      acceleration
      fuelTankVolume
      cylinderCount
      maxSpeed
      weight
      gearsCount
      productionStart
      productionStop
      active
      recommended
    }
  }
`)

/**
 * Get Engines by Generation Query
 * Fetches engines for a specific generation
 */
export const GET_ENGINES_BY_GENERATION = graphql(`
  query GetEnginesByGeneration($generationId: String!) {
    allEngines(generationId: $generationId, limit: 1000) {
      id
      name
      fuelType
      transmissionType
      driveType
      performance
      torque
      acceleration
      active
      recommended
    }
  }
`)

/**
 * Get Engines Count Query
 * Gets the count of engines with optional filtering
 */
export const GET_ENGINES_COUNT = graphql(`
  query GetEnginesCount(
    $generationId: String
    $fuelType: CatalogEngineFuelType
  ) {
    enginesCount(generationId: $generationId, fuelType: $fuelType)
  }
`)

/**
 * Search Engines Query
 * Search engines by name
 */
export const SEARCH_ENGINES = graphql(`
  query SearchEngines($query: String!, $limit: Float) {
    searchEngines(query: $query, limit: $limit) {
      id
      name
      generation {
        id
        name
        model {
          id
          name
          brand {
            id
            name
          }
        }
      }
      fuelType
      transmissionType
      driveType
    }
  }
`)

/**
 * Create Engine Mutation
 * Creates a new engine
 */
export const CREATE_ENGINE = graphql(`
  mutation CreateEngine($input: CreateCatalogEngineInput!) {
    createEngine(input: $input) {
      id
      name
      generationId
      generation {
        id
        name
        slug
      }
      fuelType
      transmissionType
      driveType
      consumptionCombined
      consumptionCity
      consumptionOutOfCity
      performance
      torque
      volume
      emission
      rangeKm
      acceleration
      fuelTankVolume
      cylinderCount
      maxSpeed
      weight
      gearsCount
      productionStart
      productionStop
      active
      recommended
    }
  }
`)

/**
 * Update Engine Mutation
 * Updates an existing engine
 */
export const UPDATE_ENGINE = graphql(`
  mutation UpdateEngine($id: String!, $input: UpdateCatalogEngineInput!) {
    updateEngine(id: $id, input: $input) {
      id
      name
      generationId
      generation {
        id
        name
        slug
      }
      fuelType
      transmissionType
      driveType
      consumptionCombined
      consumptionCity
      consumptionOutOfCity
      performance
      torque
      volume
      emission
      rangeKm
      acceleration
      fuelTankVolume
      cylinderCount
      maxSpeed
      weight
      gearsCount
      productionStart
      productionStop
      active
      recommended
    }
  }
`)

/**
 * Delete Engine Mutation
 * Deletes an engine
 */
export const DELETE_ENGINE = graphql(`
  mutation DeleteEngine($id: String!) {
    deleteEngine(id: $id)
  }
`)
