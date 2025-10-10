import { Controller, Param, Patch, NotFoundException } from '@nestjs/common';
import { CatalogBrandService } from './catalog-brand.service';
import { CatalogBrand } from './catalog-brand.entity';
import { Public } from '../../common/decorators/auth/public.decorator';

/**
 * Test Controller for Catalog Brands (Development Only)
 * Provides simple REST endpoints for testing ISR cache invalidation
 * without requiring authentication
 *
 * IMPORTANT: This should only be enabled in development!
 * Remove or disable in production.
 */
@Controller('api/test/brands')
export class CatalogBrandTestController {
  constructor(private readonly brandService: CatalogBrandService) {}

  /**
   * Toggle isRecommended field and update name with timestamp
   * Simple endpoint to test ISR cache invalidation
   *
   * Usage: curl -X PATCH http://localhost:3000/api/test/brands/:slug/toggle
   */
  @Public()
  @Patch(':slug/toggle')
  async toggleBrand(@Param('slug') slug: string): Promise<CatalogBrand> {
    const brand = await this.brandService.findBySlug(slug);

    if (!brand) {
      throw new NotFoundException(`Brand with slug '${slug}' not found`);
    }

    // Toggle isRecommended and update name with timestamp
    const timestamp = new Date().toLocaleTimeString();
    const updates = {
      isRecommended: !brand.isRecommended,
      name: `${brand.name.split(' - Updated at')[0]} - Updated at ${timestamp}`,
    };

    return this.brandService.update(brand.id, updates);
  }
}
