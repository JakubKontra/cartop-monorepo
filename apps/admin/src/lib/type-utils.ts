/**
 * Type Utilities for Compile-Time Type Testing
 *
 * These utilities help ensure type safety between different layers of the application.
 * They produce compile-time errors if types don't match expectations, with zero runtime cost.
 */

/**
 * Expect utility - Forces TypeScript to check if T is true
 * Usage: type Test = Expect<SomeCondition extends true ? true : false>
 */
export type Expect<T extends true> = T

/**
 * Equal utility - Checks if two types are exactly equal
 * Usage: type Test = Equal<TypeA, TypeB>
 */
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false

/**
 * RequiredKeys utility - Extracts only the required (non-optional) keys from a type
 * Usage: type Required = RequiredKeys<MyType>
 */
export type RequiredKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

/**
 * IsSubset utility - Checks if type A is a subset of type B
 * (All keys in A exist in B with compatible types)
 */
export type IsSubset<A, B> = A extends B ? true : false

/**
 * HasRequiredFields utility - Checks if return type has all required fields from input type
 * Usage: type Test = HasRequiredFields<ReturnType<typeof fn>, ExpectedType>
 */
export type HasRequiredFields<Actual, Expected> =
  RequiredKeys<Expected> extends RequiredKeys<Actual>
    ? true
    : false
