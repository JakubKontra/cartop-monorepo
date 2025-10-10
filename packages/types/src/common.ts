/**
 * Common utility types
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ID = string | number;

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Environment = 'development' | 'staging' | 'production' | 'test';
