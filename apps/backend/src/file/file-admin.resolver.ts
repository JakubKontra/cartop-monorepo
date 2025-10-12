import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { FileService } from './file.service';
import { File } from './file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { FileFiltersInput } from './dto/file-filters.input';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

/**
 * Storage Statistics ObjectType
 */
@ObjectType()
export class StorageStats {
  @Field(() => Int)
  totalSize: number;

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  imageSize: number;

  @Field(() => Int)
  imageCount: number;

  @Field(() => Int)
  documentSize: number;

  @Field(() => Int)
  documentCount: number;
}

/**
 * Admin File Resolver
 * Handles all administrative operations for files
 * Requires authentication and appropriate roles
 */
@Resolver(() => File)
export class FileAdminResolver {
  constructor(private readonly fileService: FileService) {}

  // ==================== ADMIN QUERIES ====================

  /**
   * Get all files with optional filters
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => [File])
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async files(
    @Args('filters', { nullable: true }) filters?: FileFiltersInput,
  ): Promise<File[]> {
    return this.fileService.findAll(filters);
  }

  /**
   * Get a single file by ID
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => File)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async file(@Args('id') id: string): Promise<File> {
    return this.fileService.findOne(id);
  }

  /**
   * Get file by checksum (for duplicate detection)
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => File, { nullable: true })
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async fileByChecksum(
    @Args('checksum') checksum: string,
  ): Promise<File | null> {
    return this.fileService.findByChecksum(checksum);
  }

  /**
   * Get all image files
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => [File])
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async images(): Promise<File[]> {
    return this.fileService.findImages();
  }

  /**
   * Get all document files (non-images)
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => [File])
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async documents(): Promise<File[]> {
    return this.fileService.findDocuments();
  }

  /**
   * Get storage statistics
   * Requires ADMIN role
   */
  @Query(() => StorageStats)
  @Roles(UserRole.ADMIN)
  async storageStats(): Promise<StorageStats> {
    return this.fileService.getStorageStats();
  }

  /**
   * Count files with optional filters
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Query(() => Int)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async filesCount(
    @Args('filters', { nullable: true }) filters?: FileFiltersInput,
  ): Promise<number> {
    return this.fileService.count(filters);
  }

  // ==================== ADMIN MUTATIONS ====================

  /**
   * Generate a pre-signed URL for uploading a file
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Mutation(() => String)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async generateUploadUrl(
    @Args('filename') filename: string,
    @Args('contentType') contentType: string,
  ): Promise<string> {
    return this.fileService.generateUploadUrl(filename, contentType);
  }

  /**
   * Create a new file record
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Mutation(() => File)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async createFile(@Args('input') input: CreateFileInput): Promise<File> {
    return this.fileService.create(input);
  }

  /**
   * Update an existing file
   * Requires ADMIN or CATALOG_MANAGER role
   */
  @Mutation(() => File)
  @Roles(UserRole.ADMIN, UserRole.CATALOG_MANAGER)
  async updateFile(
    @Args('id') id: string,
    @Args('input') input: UpdateFileInput,
  ): Promise<File> {
    return this.fileService.update(id, input);
  }

  /**
   * Delete a file (database only, keeps storage file)
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteFile(@Args('id') id: string): Promise<boolean> {
    return this.fileService.remove(id);
  }

  /**
   * Delete a file completely (both database and storage)
   * Requires ADMIN role only (more restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteFileCompletely(@Args('id') id: string): Promise<boolean> {
    return this.fileService.removeCompletely(id);
  }
}
