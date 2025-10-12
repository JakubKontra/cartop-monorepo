import { graphql } from '@/gql';

/**
 * Get All Leasing Companies Query
 * Fetches all leasing companies (admin view)
 */
export const GET_ALL_LEASING_COMPANIES = graphql(`
  query GetAllLeasingCompanies {
    leasingCompanies {
      id
      name
      link
      logoId
      logo {
        id
        url
        alt
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get Single Leasing Company Query
 * Fetches a single leasing company by ID
 */
export const GET_LEASING_COMPANY = graphql(`
  query GetLeasingCompany($id: String!) {
    leasingCompany(id: $id) {
      id
      name
      link
      logoId
      logo {
        id
        url
        alt
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Create Leasing Company Mutation
 * Creates a new leasing company
 */
export const CREATE_LEASING_COMPANY = graphql(`
  mutation CreateLeasingCompany($input: CreateLeasingCompanyInput!) {
    createLeasingCompany(input: $input) {
      id
      name
      link
      logoId
      createdAt
      updatedAt
    }
  }
`);

/**
 * Update Leasing Company Mutation
 * Updates an existing leasing company
 */
export const UPDATE_LEASING_COMPANY = graphql(`
  mutation UpdateLeasingCompany($id: String!, $input: UpdateLeasingCompanyInput!) {
    updateLeasingCompany(id: $id, input: $input) {
      id
      name
      link
      logoId
      createdAt
      updatedAt
    }
  }
`);

/**
 * Delete Leasing Company Mutation
 * Deletes a leasing company
 */
export const DELETE_LEASING_COMPANY = graphql(`
  mutation DeleteLeasingCompany($id: String!) {
    deleteLeasingCompany(id: $id)
  }
`);

/**
 * Count Leasing Companies Query
 * Gets total count of leasing companies
 */
export const COUNT_LEASING_COMPANIES = graphql(`
  query CountLeasingCompanies {
    leasingCompaniesCount
  }
`);
