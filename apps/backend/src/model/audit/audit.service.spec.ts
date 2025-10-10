import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getQueueToken } from '@nestjs/bull';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { AuditService } from './audit.service';
import { AuditLog } from './audit-log.entity';
import { AuditAction } from '../../common/interfaces/audit.interface';

describe('AuditService', () => {
  let service: AuditService;
  let repository: jest.Mocked<Repository<AuditLog>>;
  let queue: jest.Mocked<Queue>;

  const mockRepository = {
    create: jest.fn(),
    insert: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getRepositoryToken(AuditLog, 'audit'),
          useValue: mockRepository,
        },
        {
          provide: getQueueToken('audit'),
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<AuditService>(AuditService);
    repository = module.get(getRepositoryToken(AuditLog, 'audit'));
    queue = module.get(getQueueToken('audit'));

    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Clean up intervals
    await service.onModuleDestroy();
  });

  describe('initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should start flush interval on module init', () => {
      jest.useFakeTimers();
      const setIntervalSpy = jest.spyOn(global, 'setInterval');
      service.onModuleInit();
      expect(setIntervalSpy).toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('should flush buffer on module destroy', async () => {
      const flushSpy = jest.spyOn(service as any, 'flushBuffer');
      await service.onModuleDestroy();
      expect(flushSpy).toHaveBeenCalled();
    });
  });

  describe('log', () => {
    it('should add audit data to buffer', async () => {
      const auditData = {
        entityName: 'catalog_brands',
        entityId: 'test-id',
        action: AuditAction.CREATE,
        userId: 'user-1',
      };

      await service.log(auditData);

      expect(queue.add).toHaveBeenCalledWith(
        'log-audit',
        auditData,
        expect.objectContaining({
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
        }),
      );
    });

    it('should add timestamp if not provided', async () => {
      const auditData = {
        entityName: 'catalog_brands',
        entityId: 'test-id',
        action: AuditAction.CREATE,
      };

      await service.log(auditData);
      expect(queue.add).toHaveBeenCalled();
    });

    it('should flush buffer when it reaches BATCH_SIZE', async () => {
      // Mock BATCH_SIZE to 2 for testing
      (service as any).BATCH_SIZE = 2;
      mockRepository.create.mockImplementation((data) => data as any);
      mockRepository.insert.mockResolvedValue({} as any);

      await service.log({
        entityName: 'test1',
        entityId: 'id1',
        action: AuditAction.CREATE,
      });
      expect(repository.insert).not.toHaveBeenCalled();

      await service.log({
        entityName: 'test2',
        entityId: 'id2',
        action: AuditAction.UPDATE,
      });

      // Should flush after reaching batch size
      expect(repository.insert).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      mockQueue.add.mockRejectedValueOnce(new Error('Queue error'));

      await expect(
        service.log({
          entityName: 'test',
          entityId: 'id',
          action: AuditAction.CREATE,
        }),
      ).resolves.not.toThrow();
    });
  });

  describe('logBulk', () => {
    it('should add multiple audit logs to buffer', async () => {
      const bulkData = [
        {
          entityName: 'test1',
          entityId: 'id1',
          action: AuditAction.CREATE,
        },
        {
          entityName: 'test2',
          entityId: 'id2',
          action: AuditAction.UPDATE,
        },
      ];

      await service.logBulk(bulkData);

      // Check internal buffer
      expect((service as any).auditBuffer.length).toBeGreaterThanOrEqual(2);
    });

    it('should add timestamps to all items', async () => {
      const bulkData = [
        {
          entityName: 'test1',
          entityId: 'id1',
          action: AuditAction.CREATE,
        },
      ];

      await service.logBulk(bulkData);

      const buffer = (service as any).auditBuffer;
      expect(buffer[0].timestamp).toBeInstanceOf(Date);
    });

    it('should flush when buffer exceeds BATCH_SIZE', async () => {
      (service as any).BATCH_SIZE = 2;
      mockRepository.create.mockImplementation((data) => data as any);
      mockRepository.insert.mockResolvedValue({} as any);

      await service.logBulk([
        { entityName: 'test1', entityId: 'id1', action: AuditAction.CREATE },
        { entityName: 'test2', entityId: 'id2', action: AuditAction.UPDATE },
        { entityName: 'test3', entityId: 'id3', action: AuditAction.DELETE },
      ]);

      expect(repository.insert).toHaveBeenCalled();
    });
  });

  describe('flushBuffer', () => {
    it('should do nothing if buffer is empty', async () => {
      await (service as any).flushBuffer();
      expect(repository.insert).not.toHaveBeenCalled();
    });

    it('should batch insert buffered items', async () => {
      mockRepository.create.mockImplementation((data) => data as any);
      mockRepository.insert.mockResolvedValue({} as any);

      // Add items to buffer
      (service as any).auditBuffer = [
        { entityName: 'test1', entityId: 'id1', action: AuditAction.CREATE },
        { entityName: 'test2', entityId: 'id2', action: AuditAction.UPDATE },
      ];

      await (service as any).flushBuffer();

      expect(repository.create).toHaveBeenCalledTimes(2);
      expect(repository.insert).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ entityName: 'test1' }),
          expect.objectContaining({ entityName: 'test2' }),
        ]),
      );
      expect((service as any).auditBuffer).toHaveLength(0);
    });

    it('should re-add items to buffer on flush failure', async () => {
      mockRepository.create.mockImplementation((data) => data as any);
      mockRepository.insert.mockRejectedValueOnce(new Error('Database error'));

      (service as any).auditBuffer = [
        { entityName: 'test1', entityId: 'id1', action: AuditAction.CREATE },
      ];

      await (service as any).flushBuffer();

      // Items should be re-added to buffer
      expect((service as any).auditBuffer.length).toBeGreaterThan(0);
    });
  });

  describe('query', () => {
    it('should build query with all filters', async () => {
      const mockQueryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const queryInput = {
        entityName: 'catalog_brands',
        entityId: 'test-id',
        action: AuditAction.UPDATE,
        userId: 'user-1',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        limit: 10,
        skip: 0,
      };

      await service.query(queryInput);

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'audit.entityName = :entityName',
        { entityName: 'catalog_brands' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'audit.entityId = :entityId',
        { entityId: 'test-id' },
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('audit.createdAt', 'DESC');
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
    });

    it('should enforce maximum limit of 1000', async () => {
      const mockQueryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.query({ limit: 5000 });

      expect(mockQueryBuilder.take).toHaveBeenCalledWith(1000);
    });
  });

  describe('getEntityHistory', () => {
    it('should retrieve audit history for entity', async () => {
      const mockAuditLogs = [
        { id: '1', entityName: 'catalog_brands', entityId: 'brand-1' },
        { id: '2', entityName: 'catalog_brands', entityId: 'brand-1' },
      ];

      mockRepository.find.mockResolvedValue(mockAuditLogs as any);

      const result = await service.getEntityHistory('catalog_brands', 'brand-1');

      expect(repository.find).toHaveBeenCalledWith({
        where: { entityName: 'catalog_brands', entityId: 'brand-1' },
        order: { createdAt: 'DESC' },
        take: 100,
      });
      expect(result).toEqual(mockAuditLogs);
    });
  });

  describe('getUserActivity', () => {
    it('should retrieve user activity logs', async () => {
      const mockActivityLogs = [
        { id: '1', userId: 'user-1', action: AuditAction.CREATE },
        { id: '2', userId: 'user-1', action: AuditAction.UPDATE },
      ];

      mockRepository.find.mockResolvedValue(mockActivityLogs as any);

      const result = await service.getUserActivity('user-1', 25);

      expect(repository.find).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        order: { createdAt: 'DESC' },
        take: 25,
      });
      expect(result).toEqual(mockActivityLogs);
    });

    it('should enforce maximum limit of 1000', async () => {
      mockRepository.find.mockResolvedValue([]);

      await service.getUserActivity('user-1', 5000);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 1000,
        }),
      );
    });
  });

  describe('calculateChanges', () => {
    it('should detect changed fields', () => {
      const oldValue = {
        name: 'BMW',
        slug: 'bmw',
        isActive: false,
      };

      const newValue = {
        name: 'BMW Group',
        slug: 'bmw',
        isActive: true,
      };

      const changes = service.calculateChanges(oldValue, newValue);

      expect(changes).toEqual({
        name: { old: 'BMW', new: 'BMW Group' },
        isActive: { old: false, new: true },
      });
    });

    it('should skip metadata fields', () => {
      const oldValue = {
        name: 'BMW',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };

      const newValue = {
        name: 'BMW',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-09'),
      };

      const changes = service.calculateChanges(oldValue, newValue);

      expect(changes).not.toHaveProperty('createdAt');
      expect(changes).not.toHaveProperty('updatedAt');
    });

    it('should handle null/undefined values', () => {
      const changes1 = service.calculateChanges(null, { name: 'BMW' });
      const changes2 = service.calculateChanges({ name: 'BMW' }, null);
      const changes3 = service.calculateChanges(undefined, undefined);

      expect(changes1).toEqual({});
      expect(changes2).toEqual({});
      expect(changes3).toEqual({});
    });

    it('should detect new fields', () => {
      const oldValue = {
        name: 'BMW',
      };

      const newValue = {
        name: 'BMW',
        description: 'German car manufacturer',
      };

      const changes = service.calculateChanges(oldValue, newValue);

      expect(changes).toHaveProperty('description');
      expect(changes.description.old).toBeUndefined();
      expect(changes.description.new).toBe('German car manufacturer');
    });

    it('should handle nested objects', () => {
      const oldValue = {
        metadata: { color: 'blue', size: 'large' },
      };

      const newValue = {
        metadata: { color: 'red', size: 'large' },
      };

      const changes = service.calculateChanges(oldValue, newValue);

      expect(changes).toHaveProperty('metadata');
      expect(changes.metadata.old).toEqual({ color: 'blue', size: 'large' });
      expect(changes.metadata.new).toEqual({ color: 'red', size: 'large' });
    });
  });
});
