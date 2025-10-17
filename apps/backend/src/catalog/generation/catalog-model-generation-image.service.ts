import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogModelGenerationImage } from './catalog-model-generation-image.entity';
import { CreateCatalogModelGenerationImageInput } from './dto/create-catalog-model-generation-image.input';
import { UpdateCatalogModelGenerationImageInput } from './dto/update-catalog-model-generation-image.input';
import { CatalogImageType } from '../../common/enums/catalog/catalog-image-type.enum';

@Injectable()
export class CatalogModelGenerationImageService {
  constructor(
    @InjectRepository(CatalogModelGenerationImage)
    private readonly generationImageRepository: Repository<CatalogModelGenerationImage>,
  ) {}

  async create(input: CreateCatalogModelGenerationImageInput): Promise<CatalogModelGenerationImage> {
    const generationImage = this.generationImageRepository.create(input);
    const saved = await this.generationImageRepository.save(generationImage);

    // Reload with relations to ensure all fields are populated
    return this.findOne(saved.id);
  }

  async findAll(
    limit: number = 50,
    offset: number = 0,
    generationId?: string,
    imageId?: string,
    active?: boolean,
    imageType?: CatalogImageType,
    exteriorColorId?: string,
    interiorColorId?: string,
  ): Promise<CatalogModelGenerationImage[]> {
    const where: any = {};

    if (generationId) {
      where.generationId = generationId;
    }

    if (imageId) {
      where.imageId = imageId;
    }

    if (typeof active === 'boolean') {
      where.active = active;
    }

    if (imageType) {
      where.imageType = imageType;
    }

    if (exteriorColorId) {
      where.exteriorColorId = exteriorColorId;
    }

    if (interiorColorId) {
      where.interiorColorId = interiorColorId;
    }

    return this.generationImageRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { order: 'ASC', galleryPosition: 'ASC', generationId: 'ASC' },
      relations: ['generation', 'image', 'exteriorColor', 'interiorColor'],
    });
  }

  async findOne(id: string): Promise<CatalogModelGenerationImage> {
    const generationImage = await this.generationImageRepository.findOne({
      where: { id },
      relations: ['generation', 'image', 'exteriorColor', 'interiorColor'],
    });

    if (!generationImage) {
      throw new NotFoundException(`Generation image with ID ${id} not found`);
    }

    return generationImage;
  }

  async findByGenerationId(generationId: string): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageRepository.find({
      where: { generationId },
      order: { order: 'ASC', galleryPosition: 'ASC' },
      relations: ['generation', 'image', 'exteriorColor', 'interiorColor'],
    });
  }

  async findByImageId(imageId: string): Promise<CatalogModelGenerationImage[]> {
    return this.generationImageRepository.find({
      where: { imageId },
      order: { order: 'ASC' },
      relations: ['generation', 'image', 'exteriorColor', 'interiorColor'],
    });
  }

  async findByColorCombination(
    generationId: string,
    exteriorColorId?: string,
    interiorColorId?: string,
    imageType?: CatalogImageType,
  ): Promise<CatalogModelGenerationImage[]> {
    const where: any = { generationId };

    if (exteriorColorId) {
      where.exteriorColorId = exteriorColorId;
    }

    if (interiorColorId) {
      where.interiorColorId = interiorColorId;
    }

    if (imageType) {
      where.imageType = imageType;
    }

    return this.generationImageRepository.find({
      where,
      order: { order: 'ASC', galleryPosition: 'ASC' },
      relations: ['generation', 'image', 'exteriorColor', 'interiorColor'],
    });
  }

  async find360Gallery(
    generationId: string,
    exteriorColorId?: string,
  ): Promise<CatalogModelGenerationImage[]> {
    const where: any = {
      generationId,
      imageType: CatalogImageType.GALLERY_360,
    };

    if (exteriorColorId) {
      where.exteriorColorId = exteriorColorId;
    }

    return this.generationImageRepository.find({
      where,
      order: { galleryPosition: 'ASC' },
      relations: ['generation', 'image', 'exteriorColor', 'interiorColor'],
    });
  }

  async update(id: string, input: UpdateCatalogModelGenerationImageInput): Promise<CatalogModelGenerationImage> {
    const generationImage = await this.findOne(id);
    Object.assign(generationImage, input);
    return this.generationImageRepository.save(generationImage);
  }

  async remove(id: string): Promise<boolean> {
    const generationImage = await this.findOne(id);
    await this.generationImageRepository.remove(generationImage);
    return true;
  }
}
