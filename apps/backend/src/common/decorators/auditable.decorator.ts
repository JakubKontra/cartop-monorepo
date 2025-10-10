import 'reflect-metadata';

export const AUDITABLE_METADATA = 'auditable';

/**
 * Decorator to mark entities as auditable
 * Entities marked with this decorator will automatically track changes
 */
export function Auditable() {
  return function (target: Function) {
    Reflect.defineMetadata(AUDITABLE_METADATA, true, target);
  };
}

/**
 * Check if an entity is auditable
 */
export function isAuditable(target: any): boolean {
  if (!target || !target.constructor) {
    return false;
  }
  return Reflect.getMetadata(AUDITABLE_METADATA, target.constructor) === true;
}
