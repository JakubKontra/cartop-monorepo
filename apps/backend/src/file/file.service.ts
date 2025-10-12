import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { STORAGE_ADAPTER } from '@/shared/tokens';
import { File } from './file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { FileFiltersInput } from './dto/file-filters.input';
import { StorageAdapter } from './adapters/storage-adapter.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @Inject(STORAGE_ADAPTER)
    private readonly storageAdapter: StorageAdapter,
  ) {}

  // === CREATE ===

  async create(input: CreateFileInput): Promise<File> {
    // Check if file with same checksum already exists
    const existing = await this.findByChecksum(input.checksum);
    if (existing) {
      // Return existing file instead of throwing error (deduplication)
      console.log(
        `File with checksum "${input.checksum}" already exists, returning existing file (ID: ${existing.id})`,
      );
      return existing;
    }

    // Check if legacySystemId already exists (if provided)
    if (input.legacySystemId) {
      const existingLegacy = await this.fileRepository.findOne({
        where: { legacySystemId: input.legacySystemId },
      });
      if (existingLegacy) {
        throw new ConflictException(
          `File with legacySystemId "${input.legacySystemId}" already exists`,
        );
      }
    }

    const file = this.fileRepository.create(input);
    return this.fileRepository.save(file);
  }

  // === READ ===

  async findAll(filters?: FileFiltersInput): Promise<File[]> {
    const query = this.fileRepository.createQueryBuilder('file');

    // Apply filters
    if (filters) {
      this.applyFilters(query, filters);
    }

    // Relations
    query.leftJoinAndSelect('file.uploadedBy', 'uploadedBy');

    // Order by creation date
    query.orderBy('file.createdAt', 'DESC');

    // Pagination
    if (filters?.limit) {
      query.take(filters.limit);
    }
    if (filters?.offset) {
      query.skip(filters.offset);
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: ['uploadedBy'],
    });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return file;
  }

  async findByChecksum(checksum: string): Promise<File | null> {
    return this.fileRepository.findOne({
      where: { checksum },
      relations: ['uploadedBy'],
    });
  }

  async findByLegacySystemId(legacySystemId: string): Promise<File | null> {
    return this.fileRepository.findOne({
      where: { legacySystemId },
      relations: ['uploadedBy'],
    });
  }

  async findImages(): Promise<File[]> {
    return this.fileRepository
      .createQueryBuilder('file')
      .where('file.mimeType LIKE :pattern', { pattern: 'image/%' })
      .leftJoinAndSelect('file.uploadedBy', 'uploadedBy')
      .orderBy('file.createdAt', 'DESC')
      .getMany();
  }

  async findDocuments(): Promise<File[]> {
    return this.fileRepository
      .createQueryBuilder('file')
      .where('file.mimeType NOT LIKE :pattern', { pattern: 'image/%' })
      .leftJoinAndSelect('file.uploadedBy', 'uploadedBy')
      .orderBy('file.createdAt', 'DESC')
      .getMany();
  }

  // === UPDATE ===

  async update(id: string, input: UpdateFileInput): Promise<File> {
    const file = await this.findOne(id);

    // Check checksum uniqueness if being updated
    if (input.checksum && input.checksum !== file.checksum) {
      const existing = await this.findByChecksum(input.checksum);
      if (existing) {
        throw new ConflictException(
          `File with checksum "${input.checksum}" already exists`,
        );
      }
    }

    // Check legacySystemId uniqueness if being updated
    if (
      input.legacySystemId &&
      input.legacySystemId !== file.legacySystemId
    ) {
      const existing = await this.fileRepository.findOne({
        where: { legacySystemId: input.legacySystemId },
      });
      if (existing) {
        throw new ConflictException(
          `File with legacySystemId "${input.legacySystemId}" already exists`,
        );
      }
    }

    Object.assign(file, input);
    return this.fileRepository.save(file);
  }

  // === DELETE ===

  async remove(id: string): Promise<boolean> {
    const file = await this.findOne(id);
    await this.fileRepository.remove(file);
    return true;
  }

  // === UTILITY METHODS ===

  async getStorageStats(): Promise<{
    totalSize: number;
    totalCount: number;
    imageSize: number;
    imageCount: number;
    documentSize: number;
    documentCount: number;
  }> {
    const allFiles = await this.fileRepository.find();

    const stats = {
      totalSize: 0,
      totalCount: allFiles.length,
      imageSize: 0,
      imageCount: 0,
      documentSize: 0,
      documentCount: 0,
    };

    for (const file of allFiles) {
      stats.totalSize += file.size;

      if (file.isImage) {
        stats.imageSize += file.size;
        stats.imageCount++;
      } else {
        stats.documentSize += file.size;
        stats.documentCount++;
      }
    }

    return stats;
  }

  async count(filters?: FileFiltersInput): Promise<number> {
    const query = this.fileRepository.createQueryBuilder('file');

    if (filters) {
      this.applyFilters(query, filters);
    }

    return query.getCount();
  }

  // === STORAGE METHODS ===

  /**
   * Generate a pre-signed URL for uploading a file directly to storage
   * @param filename - The filename to upload
   * @param contentType - The MIME type of the file
   * @returns Pre-signed upload URL
   */
  async generateUploadUrl(
    filename: string,
    contentType: string,
  ): Promise<string> {
    const bucket = process.env.S3_BUCKET!;
    const key = `uploads/${Date.now()}-${filename}`;
    return this.storageAdapter.getPresignedUploadUrl(bucket, key, contentType);
  }

  /**
   * Upload a file directly to storage (server-side)
   * @param bucket - Storage bucket name
   * @param key - Object key/path in storage
   * @param filePath - Local file path to upload
   * @param contentType - MIME type
   * @returns URL of uploaded file
   */
  async uploadToStorage(
    bucket: string,
    key: string,
    filePath: string,
    contentType?: string,
  ): Promise<string> {
    return this.storageAdapter.upload(bucket, key, filePath, contentType);
  }

  /**
   * Delete a file from storage
   * @param file - File entity to delete from storage
   */
  async deleteFromStorage(file: File): Promise<void> {
    const bucket = process.env.S3_BUCKET!;
    await this.storageAdapter.delete(bucket, file.relativePath);
  }

  /**
   * Delete file from both storage and database
   * @param id - File ID
   */
  async removeCompletely(id: string): Promise<boolean> {
    const file = await this.findOne(id);

    // Delete from storage first
    try {
      await this.deleteFromStorage(file);
    } catch (error) {
      console.error(
        `Failed to delete file ${id} from storage:`,
        error,
      );
      // Continue with database deletion even if storage deletion fails
    }

    // Delete from database
    await this.fileRepository.remove(file);
    return true;
  }

  // === PRIVATE HELPERS ===

  private applyFilters(query: any, filters: FileFiltersInput): void {
    if (filters.mimeType) {
      query.andWhere('file.mimeType = :mimeType', {
        mimeType: filters.mimeType,
      });
    }

    if (filters.extension) {
      query.andWhere('file.extension = :extension', {
        extension: filters.extension,
      });
    }

    if (filters.name) {
      query.andWhere('file.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.minSize !== undefined) {
      query.andWhere('file.size >= :minSize', { minSize: filters.minSize });
    }

    if (filters.maxSize !== undefined) {
      query.andWhere('file.size <= :maxSize', { maxSize: filters.maxSize });
    }

    if (filters.minWidth !== undefined) {
      query.andWhere('file.width >= :minWidth', {
        minWidth: filters.minWidth,
      });
    }

    if (filters.minHeight !== undefined) {
      query.andWhere('file.height >= :minHeight', {
        minHeight: filters.minHeight,
      });
    }

    if (filters.onlyImages) {
      query.andWhere('file.mimeType LIKE :imagePattern', {
        imagePattern: 'image/%',
      });
    }
  }
}
