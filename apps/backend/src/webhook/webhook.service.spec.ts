import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from './webhook.service';
import { WatchConfig } from '../common/interfaces/watch.interface';
import { IQueueService } from '../common/queue/queue.interface';

// Mock fetch globally
global.fetch = jest.fn();

describe('WebhookService', () => {
  let service: WebhookService;
  let queue: jest.Mocked<IQueueService>;

  const mockQueue = {
    add: jest.fn(),
    process: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: 'QUEUE_WEBHOOKS',
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    queue = module.get('QUEUE_WEBHOOKS');

    jest.clearAllMocks();
  });

  describe('trigger', () => {
    const mockEntity = {
      id: 'brand-1',
      slug: 'bmw',
      name: 'BMW',
      isActive: true,
    };

    const baseConfig: WatchConfig = {
      name: 'test_watch',
      watch: ['name', 'slug'],
      webhook: 'http://localhost:3000/api/cache/invalidate',
      selection: ['id', 'slug'],
    };

    it('should queue webhook without debouncing', async () => {
      await service.trigger(
        [baseConfig],
        'catalog_brands',
        'brand-1',
        'UPDATE',
        mockEntity,
        ['name'],
        { name: 'BMW Old' },
      );

      expect(queue.add).toHaveBeenCalledWith(
        'send-webhook',
        expect.objectContaining({
          config: baseConfig,
          payload: expect.objectContaining({
            watchName: 'test_watch',
            entityName: 'catalog_brands',
            action: 'UPDATE',
            data: { id: 'brand-1', slug: 'bmw' },
          }),
        }),
        expect.any(Object),
      );
    });

    it('should trigger webhook with debouncing', async () => {
      jest.useFakeTimers();

      const configWithDebounce: WatchConfig = {
        ...baseConfig,
        debounce: { delay: 1000 },
      };

      await service.trigger(
        [configWithDebounce],
        'catalog_brands',
        'brand-1',
        'UPDATE',
        mockEntity,
      );

      // Should not queue immediately
      expect(queue.add).not.toHaveBeenCalled();

      // Fast-forward time
      jest.advanceTimersByTime(1000);
      await Promise.resolve(); // Let promises settle

      // Should queue after debounce delay
      expect(queue.add).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should reset debounce timer on subsequent triggers', async () => {
      jest.useFakeTimers();

      const configWithDebounce: WatchConfig = {
        ...baseConfig,
        debounce: { delay: 1000 },
      };

      // First trigger
      await service.trigger(
        [configWithDebounce],
        'catalog_brands',
        'brand-1',
        'UPDATE',
        mockEntity,
      );

      // Advance time by 500ms
      jest.advanceTimersByTime(500);

      // Second trigger (should reset timer)
      await service.trigger(
        [configWithDebounce],
        'catalog_brands',
        'brand-1',
        'UPDATE',
        mockEntity,
      );

      // Advance by another 500ms (total 1000ms from second trigger)
      jest.advanceTimersByTime(500);

      // Should not have queued yet (timer was reset)
      expect(queue.add).not.toHaveBeenCalled();

      // Advance by remaining 500ms
      jest.advanceTimersByTime(500);
      await Promise.resolve();

      // Now should have queued
      expect(queue.add).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    it('should enforce maxWait for debouncing', async () => {
      jest.useFakeTimers();

      const configWithMaxWait: WatchConfig = {
        ...baseConfig,
        debounce: { delay: 1000, maxWait: 3000 },
      };

      // Trigger repeatedly every 500ms
      for (let i = 0; i < 10; i++) {
        await service.trigger(
          [configWithMaxWait],
          'catalog_brands',
          'brand-1',
          'UPDATE',
          mockEntity,
        );
        jest.advanceTimersByTime(500);
      }

      await Promise.resolve();

      // Should have queued at least once due to maxWait (3000ms / 500ms = 6 triggers)
      expect(queue.add).toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should handle multiple configs', async () => {
      const config1: WatchConfig = {
        name: 'cache_invalidation',
        watch: ['name'],
        webhook: 'http://localhost:3000/api/cache',
        selection: ['id'],
      };

      const config2: WatchConfig = {
        name: 'search_index',
        watch: ['name'],
        webhook: 'http://localhost:9200/api/index',
        selection: ['id', 'name'],
      };

      await service.trigger(
        [config1, config2],
        'catalog_brands',
        'brand-1',
        'UPDATE',
        mockEntity,
      );

      expect(queue.add).toHaveBeenCalledTimes(2);
    });

    it('should handle errors gracefully', async () => {
      queue.add.mockRejectedValueOnce(new Error('Queue error'));

      await expect(
        service.trigger([baseConfig], 'catalog_brands', 'brand-1', 'UPDATE', mockEntity),
      ).resolves.not.toThrow();
    });
  });

  describe('buildPayload', () => {
    it('should build payload with selected properties', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        selection: ['id', 'slug'],
      };

      const entity = {
        id: 'brand-1',
        slug: 'bmw',
        name: 'BMW',
        description: 'German car manufacturer',
      };

      const payload = (service as any).buildPayload(
        config,
        'catalog_brands',
        'INSERT',
        entity,
      );

      expect(payload.data).toEqual({
        id: 'brand-1',
        slug: 'bmw',
      });
      expect(payload.data).not.toHaveProperty('name');
      expect(payload.data).not.toHaveProperty('description');
    });

    it('should include all properties if selection is not specified', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      const entity = {
        id: 'brand-1',
        slug: 'bmw',
        name: 'BMW',
      };

      const payload = (service as any).buildPayload(
        config,
        'catalog_brands',
        'INSERT',
        entity,
      );

      expect(payload.data).toEqual(entity);
    });

    it('should include change information for UPDATE action', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name', 'slug'],
        webhook: 'http://localhost:3000',
        selection: ['id'],
      };

      const entity = {
        id: 'brand-1',
        name: 'BMW Group',
        slug: 'bmw-group',
      };

      const oldValues = {
        name: 'BMW',
        slug: 'bmw',
      };

      const payload = (service as any).buildPayload(
        config,
        'catalog_brands',
        'UPDATE',
        entity,
        ['name', 'slug'],
        oldValues,
      );

      expect(payload.changedProperties).toEqual(['name', 'slug']);
      expect(payload.oldValues).toEqual({
        name: 'BMW',
        slug: 'bmw',
      });
      expect(payload.newValues).toEqual({
        name: 'BMW Group',
        slug: 'bmw-group',
      });
    });

    it('should only include watched properties in change details', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        selection: ['id'],
      };

      const entity = {
        id: 'brand-1',
        name: 'BMW Group',
        description: 'Updated description',
      };

      const oldValues = {
        name: 'BMW',
        description: 'Old description',
      };

      const payload = (service as any).buildPayload(
        config,
        'catalog_brands',
        'UPDATE',
        entity,
        ['name', 'description'],
        oldValues,
      );

      expect(payload.oldValues).toHaveProperty('name');
      expect(payload.oldValues).not.toHaveProperty('description');
    });

    it('should set correct action and timestamp', () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        selection: ['id'],
      };

      const entity = { id: 'brand-1', name: 'BMW' };

      const payload = (service as any).buildPayload(
        config,
        'catalog_brands',
        'DELETE',
        entity,
      );

      expect(payload.action).toBe('DELETE');
      expect(payload.timestamp).toBeInstanceOf(Date);
      expect(payload.watchName).toBe('test_watch');
      expect(payload.entityName).toBe('catalog_brands');
    });
  });

  describe('sendWebhook', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockClear();
    });

    it('should send POST request with correct headers and payload', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      });

      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000/api/cache/invalidate',
        selection: ['id'],
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await service.sendWebhook(config, payload);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/cache/invalidate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'CartOp-Webhook/1.0',
          },
          body: JSON.stringify(payload),
        },
      );
    });

    it('should use custom HTTP method if specified', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      });

      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        method: 'PUT',
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await service.sendWebhook(config, payload);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PUT',
        }),
      );
    });

    it('should include custom headers', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      });

      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        headers: {
          Authorization: 'Bearer secret-token',
          'X-Custom-Header': 'custom-value',
        },
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await service.sendWebhook(config, payload);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer secret-token',
            'X-Custom-Header': 'custom-value',
          }),
        }),
      );
    });

    it('should throw error on failed request', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await expect(service.sendWebhook(config, payload)).rejects.toThrow(
        'Webhook request failed: 500 Internal Server Error',
      );
    });

    it('should throw error on network failure', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await expect(service.sendWebhook(config, payload)).rejects.toThrow('Network error');
    });
  });

  describe('queueWebhook', () => {
    it('should queue webhook with retry configuration', async () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
        retry: {
          attempts: 5,
          delay: 3000,
          backoff: 'fixed',
        },
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await (service as any).queueWebhook(config, payload);

      expect(queue.add).toHaveBeenCalledWith(
        'send-webhook',
        { config, payload },
        expect.objectContaining({
          attempts: 5,
          backoff: {
            type: 'fixed',
            delay: 3000,
          },
        }),
      );
    });

    it('should use default retry config if not specified', async () => {
      const config: WatchConfig = {
        name: 'test_watch',
        watch: ['name'],
        webhook: 'http://localhost:3000',
      };

      const payload = {
        watchName: 'test_watch',
        entityName: 'catalog_brands',
        action: 'UPDATE' as const,
        timestamp: new Date(),
        data: { id: 'brand-1' },
      };

      await (service as any).queueWebhook(config, payload);

      expect(queue.add).toHaveBeenCalledWith(
        'send-webhook',
        { config, payload },
        expect.objectContaining({
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        }),
      );
    });
  });
});
