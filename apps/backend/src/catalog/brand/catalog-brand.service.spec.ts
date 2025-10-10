import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CatalogBrandService } from './catalog-brand.service';
import { CatalogBrand } from './catalog-brand.entity';
import { CreateCatalogBrandInput } from './dto/create-catalog-brand.input';
import { UpdateCatalogBrandInput } from './dto/update-catalog-brand.input';

describe('CatalogBrandService', () => {
  let service: CatalogBrandService;
  let repository: jest.Mocked<Repository<CatalogBrand>>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogBrandService,
        {
          provide: getRepositoryToken(CatalogBrand),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CatalogBrandService>(CatalogBrandService);
    repository = module.get(getRepositoryToken(CatalogBrand));

    jest.clearAllMocks();
  });

  describe('create', () => {
    const createInput: CreateCatalogBrandInput = {
      slug: 'bmw',
      name: 'BMW',
      description: 'German car manufacturer',
      isActive: true,
      isHighlighted: false,
      isRecommended: false,
    };

    it('should create a new brand', async () => {
      const mockBrand = { id: 'brand-1', ...createInput };

      mockRepository.findOne.mockResolvedValue(null); // No existing brand
      mockRepository.create.mockReturnValue(mockBrand as any);
      mockRepository.save.mockResolvedValue(mockBrand as any);

      const result = await service.create(createInput);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { slug: 'bmw' },
      });
      expect(repository.create).toHaveBeenCalledWith(createInput);
      expect(repository.save).toHaveBeenCalledWith(mockBrand);
      expect(result).toEqual(mockBrand);
    });

    it('should throw ConflictException if slug already exists', async () => {
      const existingBrand = { id: 'existing-id', slug: 'bmw', name: 'BMW' };

      mockRepository.findOne.mockResolvedValue(existingBrand as any);

      await expect(service.create(createInput)).rejects.toThrow(ConflictException);
      await expect(service.create(createInput)).rejects.toThrow(
        'Brand with this slug already exists',
      );
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all brands with default parameters', async () => {
      const mockBrands = [
        { id: '1', name: 'Audi', slug: 'audi', isActive: true },
        { id: '2', name: 'BMW', slug: 'bmw', isActive: false },
      ];

      mockRepository.find.mockResolvedValue(mockBrands as any);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({
        where: {},
        take: 50,
        skip: 0,
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockBrands);
    });

    it('should return only active brands when activeOnly is true', async () => {
      const mockBrands = [{ id: '1', name: 'Audi', slug: 'audi', isActive: true }];

      mockRepository.find.mockResolvedValue(mockBrands as any);

      const result = await service.findAll(50, 0, true);

      expect(repository.find).toHaveBeenCalledWith({
        where: { isActive: true },
        take: 50,
        skip: 0,
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockBrands);
    });

    it('should respect limit and offset parameters', async () => {
      mockRepository.find.mockResolvedValue([]);

      await service.findAll(10, 20);

      expect(repository.find).toHaveBeenCalledWith({
        where: {},
        take: 10,
        skip: 20,
        order: { name: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a brand by id', async () => {
      const mockBrand = { id: 'brand-1', name: 'BMW', slug: 'bmw' };

      mockRepository.findOne.mockResolvedValue(mockBrand as any);

      const result = await service.findOne('brand-1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'brand-1' },
      });
      expect(result).toEqual(mockBrand);
    });

    it('should throw NotFoundException if brand not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('non-existent')).rejects.toThrow(
        'Brand with ID non-existent not found',
      );
    });
  });

  describe('findBySlug', () => {
    it('should return a brand by slug', async () => {
      const mockBrand = { id: 'brand-1', name: 'BMW', slug: 'bmw' };

      mockRepository.findOne.mockResolvedValue(mockBrand as any);

      const result = await service.findBySlug('bmw');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { slug: 'bmw' },
      });
      expect(result).toEqual(mockBrand);
    });

    it('should throw NotFoundException if brand not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findBySlug('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findBySlug('non-existent')).rejects.toThrow(
        'Brand with slug non-existent not found',
      );
    });
  });

  describe('search', () => {
    it('should search brands by name and slug', async () => {
      const mockBrands = [
        { id: '1', name: 'BMW', slug: 'bmw' },
        { id: '2', name: 'BMW Group', slug: 'bmw-group' },
      ];

      mockRepository.find.mockResolvedValue(mockBrands as any);

      const result = await service.search('bmw');

      expect(repository.find).toHaveBeenCalledWith({
        where: [{ name: ILike('%bmw%') }, { slug: ILike('%bmw%') }],
        take: 20,
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockBrands);
    });

    it('should respect custom limit', async () => {
      mockRepository.find.mockResolvedValue([]);

      await service.search('test', 5);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 5,
        }),
      );
    });
  });

  describe('update', () => {
    const updateInput: UpdateCatalogBrandInput = {
      name: 'BMW Group',
      description: 'Updated description',
    };

    it('should update a brand', async () => {
      const existingBrand = {
        id: 'brand-1',
        name: 'BMW',
        slug: 'bmw',
        isActive: true,
      };

      const updatedBrand = { ...existingBrand, ...updateInput };

      mockRepository.findOne.mockResolvedValue(existingBrand as any);
      mockRepository.save.mockResolvedValue(updatedBrand as any);

      const result = await service.update('brand-1', updateInput);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'brand-1' },
      });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateInput),
      );
      expect(result).toEqual(updatedBrand);
    });

    it('should throw NotFoundException if brand not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('non-existent', updateInput)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should check slug uniqueness when updating slug', async () => {
      const existingBrand = {
        id: 'brand-1',
        name: 'BMW',
        slug: 'bmw',
      };

      const updateWithSlug: UpdateCatalogBrandInput = {
        slug: 'bmw-new',
      };

      mockRepository.findOne
        .mockResolvedValueOnce(existingBrand as any) // findOne in update
        .mockResolvedValueOnce(null); // slug uniqueness check

      mockRepository.save.mockResolvedValue({
        ...existingBrand,
        ...updateWithSlug,
      } as any);

      await service.update('brand-1', updateWithSlug);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { slug: 'bmw-new' },
      });
    });

    it('should throw ConflictException if new slug already exists', async () => {
      const existingBrand = {
        id: 'brand-1',
        name: 'BMW',
        slug: 'bmw',
      };

      const conflictingBrand = {
        id: 'brand-2',
        name: 'Audi',
        slug: 'audi',
      };

      const updateWithSlug: UpdateCatalogBrandInput = {
        slug: 'audi',
      };

      // Mock for first call
      mockRepository.findOne
        .mockResolvedValueOnce(existingBrand as any) // findOne in update (first call)
        .mockResolvedValueOnce(conflictingBrand as any); // slug uniqueness check (first call)

      await expect(service.update('brand-1', updateWithSlug)).rejects.toThrow(
        ConflictException,
      );

      // Mock for second call
      mockRepository.findOne
        .mockResolvedValueOnce(existingBrand as any) // findOne in update (second call)
        .mockResolvedValueOnce(conflictingBrand as any); // slug uniqueness check (second call)

      await expect(service.update('brand-1', updateWithSlug)).rejects.toThrow(
        'Brand with this slug already exists',
      );
    });

    it('should allow updating to same slug', async () => {
      const existingBrand = {
        id: 'brand-1',
        name: 'BMW',
        slug: 'bmw',
      };

      const updateWithSameSlug: UpdateCatalogBrandInput = {
        slug: 'bmw',
        name: 'BMW Group',
      };

      mockRepository.findOne.mockResolvedValueOnce(existingBrand as any);
      mockRepository.save.mockResolvedValue({
        ...existingBrand,
        ...updateWithSameSlug,
      } as any);

      await service.update('brand-1', updateWithSameSlug);

      // Should not check slug uniqueness since it's the same
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      const mockBrand = { id: 'brand-1', name: 'BMW', slug: 'bmw' };

      mockRepository.findOne.mockResolvedValue(mockBrand as any);
      mockRepository.remove.mockResolvedValue(mockBrand as any);

      const result = await service.remove('brand-1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'brand-1' },
      });
      expect(repository.remove).toHaveBeenCalledWith(mockBrand);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if brand not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getHighlighted', () => {
    it('should return highlighted and active brands', async () => {
      const mockBrands = [
        { id: '1', name: 'BMW', isHighlighted: true, isActive: true },
        { id: '2', name: 'Audi', isHighlighted: true, isActive: true },
      ];

      mockRepository.find.mockResolvedValue(mockBrands as any);

      const result = await service.getHighlighted();

      expect(repository.find).toHaveBeenCalledWith({
        where: { isHighlighted: true, isActive: true },
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockBrands);
    });
  });

  describe('getRecommended', () => {
    it('should return recommended and active brands', async () => {
      const mockBrands = [
        { id: '1', name: 'BMW', isRecommended: true, isActive: true },
        { id: '2', name: 'Mercedes', isRecommended: true, isActive: true },
      ];

      mockRepository.find.mockResolvedValue(mockBrands as any);

      const result = await service.getRecommended();

      expect(repository.find).toHaveBeenCalledWith({
        where: { isRecommended: true, isActive: true },
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockBrands);
    });
  });
});
