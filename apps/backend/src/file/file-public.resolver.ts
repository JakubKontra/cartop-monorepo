import { Resolver, Query, Args } from '@nestjs/graphql';
import { Public } from '../common/decorators/auth/public.decorator';
import { FileService } from './file.service';
import { File } from './file.entity';

/**
 * Public File Resolver
 * Provides read-only access to files
 * No authentication required
 */
@Resolver(() => File)
export class FilePublicResolver {
  constructor(private readonly fileService: FileService) {}

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
}
