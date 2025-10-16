import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Public } from '../common/decorators/auth/public.decorator';
import { FileService } from './file.service';
import { File } from './file.entity';
import { CreateFileInput } from './dto/create-file.input';

/**
 * Public File Resolver
 * Provides read-only access to files and public upload operations
 * No authentication required
 */
@Resolver(() => File)
export class FilePublicResolver {
  constructor(private readonly fileService: FileService) {}

  // ==================== PUBLIC QUERIES ====================

  /**
   * Get a single file by ID (public access)
   * Can be used by frontend to fetch file details
   */
  @Public()
  @Query(() => File)
  async publicFile(@Args('id') id: string): Promise<File> {
    return this.fileService.findOne(id);
  }

  /**
   * Get file by legacy system ID (public access)
   * For backward compatibility with old system
   */
  @Public()
  @Query(() => File, { nullable: true })
  async publicFileByLegacyId(
    @Args('legacySystemId') legacySystemId: string,
  ): Promise<File | null> {
    return this.fileService.findByLegacySystemId(legacySystemId);
  }

  // ==================== PUBLIC MUTATIONS ====================

  /**
   * Generate a pre-signed URL for uploading a file (public)
   * Used by onboarding flow for document uploads
   * No authentication required
   */
  @Public()
  @Mutation(() => String)
  async generateUploadUrlPublic(
    @Args('filename') filename: string,
    @Args('contentType') contentType: string,
  ): Promise<string> {
    return this.fileService.generateUploadUrl(filename, contentType);
  }

  /**
   * Create a new file record (public)
   * Used by onboarding flow after uploading to storage
   * No authentication required
   */
  @Public()
  @Mutation(() => File)
  async createFilePublic(@Args('input') input: CreateFileInput): Promise<File> {
    return this.fileService.create(input);
  }
}
