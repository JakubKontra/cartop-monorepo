import 'reflect-metadata';
import {
  Watch,
  getWatchConfigs,
  hasWatchConfig,
  getTriggeredWatchConfigs,
  WATCH_METADATA,
} from './watch.decorator';
import { WatchConfig } from '../../interfaces/watch.interface';

describe('@Watch Decorator', () => {
  describe('Watch', () => {
    it('should store watch configuration on entity', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name', 'slug'],
        webhook: 'http://localhost:3000',
      };

      @Watch(config)
      class TestEntity {}

      const storedConfigs = Reflect.getMetadata(WATCH_METADATA, TestEntity);

      expect(storedConfigs).toEqual([config]);
    });

    it('should support multiple watch decorators on same entity', () => {
      const config1: WatchConfig = {
        name: 'cache_invalidation',
        watch: ['name'],
        webhook: 'http://localhost:3000/cache',
      };

      const config2: WatchConfig = {
        name: 'search_index',
        watch: ['description'],
        webhook: 'http://localhost:9200/index',
      };

      @Watch(config1)
      @Watch(config2)
      class TestEntity {}

      const storedConfigs = Reflect.getMetadata(WATCH_METADATA, TestEntity);

      expect(storedConfigs).toHaveLength(2);
      expect(storedConfigs).toContainEqual(config1);
      expect(storedConfigs).toContainEqual(config2);
    });

    it('should throw error when name is missing', () => {
      expect(() => {
        @Watch({
          watch: ['name'],
          webhook: 'http://localhost:3000',
        } as any)
        class TestEntity {}
      }).toThrow('@Watch decorator requires a name');
    });

    it('should throw error when watch array is empty', () => {
      expect(() => {
        @Watch({
          name: 'test',
          watch: [],
          webhook: 'http://localhost:3000',
        })
        class TestEntity {}
      }).toThrow('@Watch decorator requires at least one property to watch');
    });

    it('should throw error when watch is missing', () => {
      expect(() => {
        @Watch({
          name: 'test',
          webhook: 'http://localhost:3000',
        } as any)
        class TestEntity {}
      }).toThrow('@Watch decorator requires at least one property to watch');
    });

    it('should throw error when webhook URL is missing', () => {
      expect(() => {
        @Watch({
          name: 'test',
          watch: ['name'],
        } as any)
        class TestEntity {}
      }).toThrow('@Watch decorator requires a webhook URL');
    });

    it('should store optional configuration fields', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        selection: ['id', 'slug'],
        method: 'PUT',
        headers: { Authorization: 'Bearer token' },
        debounce: { delay: 1000, maxWait: 5000 },
        retry: { attempts: 3, delay: 2000, backoff: 'exponential' },
      };

      @Watch(config)
      class TestEntity {}

      const storedConfigs = Reflect.getMetadata(WATCH_METADATA, TestEntity);

      expect(storedConfigs[0]).toMatchObject({
        selection: ['id', 'slug'],
        method: 'PUT',
        headers: { Authorization: 'Bearer token' },
        debounce: { delay: 1000, maxWait: 5000 },
        retry: { attempts: 3, delay: 2000, backoff: 'exponential' },
      });
    });
  });

  describe('getWatchConfigs', () => {
    it('should retrieve watch configurations from entity instance', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      @Watch(config)
      class TestEntity {}

      const instance = new TestEntity();
      const configs = getWatchConfigs(instance);

      expect(configs).toEqual([config]);
    });

    it('should return empty array for entity without watch configs', () => {
      class TestEntity {}

      const instance = new TestEntity();
      const configs = getWatchConfigs(instance);

      expect(configs).toEqual([]);
    });

    it('should return empty array for null/undefined', () => {
      expect(getWatchConfigs(null)).toEqual([]);
      expect(getWatchConfigs(undefined)).toEqual([]);
    });

    it('should retrieve multiple watch configurations', () => {
      const config1: WatchConfig = {
        name: 'watch1',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      const config2: WatchConfig = {
        name: 'watch2',
        watch: ['slug'],
        webhook: 'http://localhost:4000',
      };

      @Watch(config1)
      @Watch(config2)
      class TestEntity {}

      const instance = new TestEntity();
      const configs = getWatchConfigs(instance);

      expect(configs).toHaveLength(2);
    });
  });

  describe('hasWatchConfig', () => {
    it('should return true for entity with watch config', () => {
      @Watch({
        name: 'test',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      })
      class TestEntity {}

      const instance = new TestEntity();
      const hasConfig = hasWatchConfig(instance);

      expect(hasConfig).toBe(true);
    });

    it('should return false for entity without watch config', () => {
      class TestEntity {}

      const instance = new TestEntity();
      const hasConfig = hasWatchConfig(instance);

      expect(hasConfig).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(hasWatchConfig(null)).toBe(false);
      expect(hasWatchConfig(undefined)).toBe(false);
    });
  });

  describe('getTriggeredWatchConfigs', () => {
    it('should return configs where watched properties changed', () => {
      const config1: WatchConfig = {
        name: 'watch_name',
        watch: ['name', 'slug'],
        webhook: 'http://localhost:3000',
      };

      const config2: WatchConfig = {
        name: 'watch_description',
        watch: ['description'],
        webhook: 'http://localhost:4000',
      };

      @Watch(config1)
      @Watch(config2)
      class TestEntity {}

      const instance = new TestEntity();
      const triggeredConfigs = getTriggeredWatchConfigs(instance, ['name']);

      expect(triggeredConfigs).toHaveLength(1);
      expect(triggeredConfigs[0].name).toBe('watch_name');
    });

    it('should return multiple configs when multiple match', () => {
      const config1: WatchConfig = {
        name: 'watch1',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      const config2: WatchConfig = {
        name: 'watch2',
        watch: ['name', 'slug'],
        webhook: 'http://localhost:4000',
      };

      @Watch(config1)
      @Watch(config2)
      class TestEntity {}

      const instance = new TestEntity();
      const triggeredConfigs = getTriggeredWatchConfigs(instance, ['name']);

      expect(triggeredConfigs).toHaveLength(2);
    });

    it('should return empty array when no configs match', () => {
      const config: WatchConfig = {
        name: 'watch_name',
        watch: ['name', 'slug'],
        webhook: 'http://localhost:3000',
      };

      @Watch(config)
      class TestEntity {}

      const instance = new TestEntity();
      const triggeredConfigs = getTriggeredWatchConfigs(instance, ['description']);

      expect(triggeredConfigs).toEqual([]);
    });

    it('should trigger when any watched property changes', () => {
      const config: WatchConfig = {
        name: 'multi_watch',
        watch: ['name', 'slug', 'description'],
        webhook: 'http://localhost:3000',
      };

      @Watch(config)
      class TestEntity {}

      const instance = new TestEntity();

      // Test each property individually
      expect(getTriggeredWatchConfigs(instance, ['name'])).toHaveLength(1);
      expect(getTriggeredWatchConfigs(instance, ['slug'])).toHaveLength(1);
      expect(getTriggeredWatchConfigs(instance, ['description'])).toHaveLength(1);

      // Test multiple properties
      expect(getTriggeredWatchConfigs(instance, ['name', 'slug'])).toHaveLength(1);
    });

    it('should not trigger for unwatched properties', () => {
      const config: WatchConfig = {
        name: 'selective_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      @Watch(config)
      class TestEntity {}

      const instance = new TestEntity();
      const triggeredConfigs = getTriggeredWatchConfigs(instance, [
        'createdAt',
        'updatedAt',
        'id',
      ]);

      expect(triggeredConfigs).toEqual([]);
    });

    it('should handle partial matches correctly', () => {
      const config: WatchConfig = {
        name: 'partial_watch',
        watch: ['name', 'slug'],
        webhook: 'http://localhost:3000',
      };

      @Watch(config)
      class TestEntity {}

      const instance = new TestEntity();

      // Should trigger even if only one watched property changed
      const triggeredConfigs = getTriggeredWatchConfigs(instance, [
        'name',
        'description',
        'updatedAt',
      ]);

      expect(triggeredConfigs).toHaveLength(1);
      expect(triggeredConfigs[0].name).toBe('partial_watch');
    });
  });
});
