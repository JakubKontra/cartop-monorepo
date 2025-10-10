import 'reflect-metadata';
import { WatchConfig } from '../../interfaces/watch.interface';

export const WATCH_METADATA = 'watch:config';

/**
 * Decorator to watch entity property changes and trigger webhooks
 *
 * @example
 * ```typescript
 * @Watch({
 *   name: 'cache_invalidation',
 *   watch: ['name', 'slug', 'isActive'],
 *   webhook: 'http://localhost:3000/api/cache/invalidate',
 *   selection: ['id', 'slug'],
 *   debounce: { delay: 1000 },
 *   retry: { attempts: 3, backoff: 'exponential' }
 * })
 * export class CatalogBrand { ... }
 * ```
 */
export function Watch(config: WatchConfig) {
  return function (target: Function) {
    // Validate configuration
    if (!config.name) {
      throw new Error('@Watch decorator requires a name');
    }
    if (!config.watch || config.watch.length === 0) {
      throw new Error('@Watch decorator requires at least one property to watch');
    }
    if (!config.webhook) {
      throw new Error('@Watch decorator requires a webhook URL');
    }

    // Get existing watch configs or initialize
    const existingConfigs = Reflect.getMetadata(WATCH_METADATA, target) || [];

    // Add new config
    const configs = [...existingConfigs, config];

    // Store watch configs on entity
    Reflect.defineMetadata(WATCH_METADATA, configs, target);
  };
}

/**
 * Get all watch configurations for an entity
 */
export function getWatchConfigs(target: any): WatchConfig[] {
  if (!target || !target.constructor) {
    return [];
  }
  return Reflect.getMetadata(WATCH_METADATA, target.constructor) || [];
}

/**
 * Check if entity has any watch configurations
 */
export function hasWatchConfig(target: any): boolean {
  const configs = getWatchConfigs(target);
  return configs.length > 0;
}

/**
 * Get watch configs that should trigger for specific property changes
 */
export function getTriggeredWatchConfigs(
  target: any,
  changedProperties: string[],
): WatchConfig[] {
  const allConfigs = getWatchConfigs(target);

  return allConfigs.filter(config => {
    // Check if any watched property was changed
    return config.watch.some(watchProp => changedProperties.includes(watchProp));
  });
}
