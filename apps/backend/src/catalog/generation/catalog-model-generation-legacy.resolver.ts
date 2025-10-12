import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CatalogLegacyFieldResolver } from '../common/catalog-legacy-field.resolver';

/**
 * Legacy Field Resolver for CatalogModelGeneration
 * Handles field-level authorization for legacy fields on CatalogModelGeneration entity
 */
@Resolver(() => CatalogModelGeneration)
export class CatalogModelGenerationLegacyFieldResolver extends CatalogLegacyFieldResolver {
  @ResolveField('legacySystemId', () => String, { nullable: true })
  resolveLegacySystemId(
    @Parent() entity: CatalogModelGeneration,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySystemId, context);
  }

  @ResolveField('legacySlug', () => String, { nullable: true })
  resolveLegacySlug(
    @Parent() entity: CatalogModelGeneration,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySlug, context);
  }
}
