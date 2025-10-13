/**
 * GraphQL queries for promotional offers
 * These queries will be validated by GraphQL Code Generator
 */

import { graphql } from '../gql';

/**
 * Get public promotional offers for homepage
 * Fetches operational leasing and direct purchase offers
 */
export const GET_PROMOTIONAL_OFFERS_QUERY = graphql(`
  query GetPromotionalOffers($filters: OfferFiltersInput) {
    publicOffers(filters: $filters) {
      id
      slug
      type
      description
      isActive
      isPublic
      totalPrice
      monthlyPayment
      annualMileageLimit
      leasingDurationMonths
      discountAmount
      discountPercentage
      financingAvailable
      includesWarranty
      warrantyYears
      hasServiceIncluded
      hasWinterTyresIncluded
      hasAssistanceServiceIncluded
      hasGapIncluded
      brand {
        id
        name
        slug
        logo {
          id
          url
          alt
          width
          height
        }
      }
      model {
        id
        name
        slug
      }
      modelGeneration {
        id
        name
        slug
        bodyType
        fuelType
        transmission
        drivetrain
        horsepower
        engineDisplacement
        year
        gallery {
          id
          name
          images {
            id
            url
            alt
            width
            height
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get operational leasing offers specifically
 */
export const GET_OPERATIONAL_LEASING_OFFERS_QUERY = graphql(`
  query GetOperationalLeasingOffers($filters: OfferFiltersInput) {
    operationalLeasingOffers(filters: $filters) {
      id
      slug
      type
      description
      isActive
      isPublic
      totalPrice
      monthlyPayment
      annualMileageLimit
      leasingDurationMonths
      hasServiceIncluded
      hasWinterTyresIncluded
      hasAssistanceServiceIncluded
      hasGapIncluded
      brand {
        id
        name
        slug
        logo {
          id
          url
          alt
          width
          height
        }
      }
      model {
        id
        name
        slug
      }
      modelGeneration {
        id
        name
        slug
        bodyType
        fuelType
        transmission
        drivetrain
        horsepower
        engineDisplacement
        year
        gallery {
          id
          name
          images {
            id
            url
            alt
            width
            height
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get direct purchase offers specifically
 */
export const GET_DIRECT_PURCHASE_OFFERS_QUERY = graphql(`
  query GetDirectPurchaseOffers($filters: OfferFiltersInput) {
    directPurchaseOffers(filters: $filters) {
      id
      slug
      type
      description
      isActive
      isPublic
      totalPrice
      discountAmount
      discountPercentage
      financingAvailable
      includesWarranty
      warrantyYears
      brand {
        id
        name
        slug
        logo {
          id
          url
          alt
          width
          height
        }
      }
      model {
        id
        name
        slug
      }
      modelGeneration {
        id
        name
        slug
        bodyType
        fuelType
        transmission
        drivetrain
        horsepower
        engineDisplacement
        year
        gallery {
          id
          name
          images {
            id
            url
            alt
            width
            height
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`);
