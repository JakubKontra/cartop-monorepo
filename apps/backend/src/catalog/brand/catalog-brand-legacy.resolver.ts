import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CatalogBrand } from './catalog-brand.entity';
import { CatalogLegacyFieldResolver } from '../common/catalog-legacy-field.resolver';

/**
 * Legacy Field Resolver for CatalogBrand
 * Handles field-level authorization for legacy fields on CatalogBrand entity
 */
@Resolver(() => CatalogBrand)
export class CatalogBrandLegacyFieldResolver extends CatalogLegacyFieldResolver {
  @ResolveField('legacySystemId', () => String, { nullable: true })
  resolveLegacySystemId(
    @Parent() entity: CatalogBrand,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySystemId, context);
  }

  @ResolveField('legacySlug', () => String, { nullable: true })
  resolveLegacySlug(
    @Parent() entity: CatalogBrand,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySlug, context);
  }
}
